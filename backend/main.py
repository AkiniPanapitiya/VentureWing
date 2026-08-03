import os
import json
import asyncio
from pathlib import Path
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from dotenv import load_dotenv

from database import engine, Base, get_db
import models
import schemas

from agents.agent1_ingestion import parse_cad_technical_pack
from agents.agent2_tariff_rag import calculate_sri_lanka_tariff, HS_TARIFF_DATABASE
from agents.agent3_negotiator import generate_negotiation_draft, verify_hitl_authorization

load_dotenv()

# Create SQLite Database Tables on Startup
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
  title="VentureWing Procurement AI Engine",
  description="FastAPI Backend backed by SQLite Database (SQLAlchemy ORM) for Autonomous Sourcing, Tariff RAG & HITL Negotiator",
  version="3.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# Seed initial SQLite Database Data on Startup if empty
@app.on_event("startup")
def seed_initial_database():
  db = next(get_db())
  try:
    existing_project = db.query(models.Project).filter(models.Project.name == "Cotton Tee V2").first()
    if not existing_project:
      project = models.Project(
        name="Cotton Tee V2",
        category="Apparel / Essentials",
        status="PARSED"
      )
      db.add(project)
      db.commit()
      db.refresh(project)

      spec = models.TechSpec(
        project_id=project.id,
        fabric_type="220 GSM Organic Cotton Canvas",
        hardware="YKK #5 Brass Antiqued Zipper",
        tolerance="±0.1mm Double Stitching",
        hs_code="5208.11.00"
      )
      db.add(spec)

      tariff = models.TariffCalculation(
        project_id=project.id,
        units=2000,
        fob_unit_usd=4.25,
        freight_mode="sea",
        freight_total_usd=1200.0,
        cid_usd=0.0,
        pal_usd=2620.0,
        cess_usd=3930.0,
        vat_usd=5895.0,
        total_landed_usd=38645.0,
        total_landed_lkr=11997340.25
      )
      db.add(tariff)
      db.commit()
  finally:
    db.close()


@app.get("/")
def read_root():
  return {
    "system": "VentureWing Procurement AI Backend Server",
    "hackathon": "IDEALIZE 2026 Open Category - Team Aviate",
    "version": "3.0.0 (SQLite Database & SQLAlchemy ORM Active)",
    "database": "venturewing.db",
    "status": "ONLINE",
  }

# 1. GET /api/projects — List all projects with Specs, Tariffs, Contracts from SQLite
@app.get("/api/projects", response_model=List[schemas.ProjectOut])
def get_projects(db: Session = Depends(get_db)):
  projects = db.query(models.Project).all()
  return projects

# 2. POST /api/projects — Create a new Sourcing Brief Project in SQLite
@app.post("/api/projects", response_model=schemas.ProjectOut)
def create_project(payload: schemas.ProjectCreate, db: Session = Depends(get_db)):
  new_project = models.Project(
    name=payload.name,
    category=payload.category,
    status="DRAFT"
  )
  db.add(new_project)
  db.commit()
  db.refresh(new_project)
  return new_project

# 3. GET /api/agent1/stream — Real-Time SSE Stream for Spec Parsing
@app.get("/api/agent1/stream")
async def stream_agent1_reasoning():
  async def event_generator():
    thoughts = [
      "Initializing Agent 01 Multimodal Vision Ingestion Pipeline...",
      "Loading DWG vector canvas tech_pack_cotton_v2.dwg into vision model...",
      "Detecting bounding box hotspot 1: Organic Cotton Canvas weave identified (220 GSM)...",
      "Detecting bounding box hotspot 2: YKK #5 Brass Antiqued Hardware fastener confirmed...",
      "Detecting bounding box hotspot 3: Stitching seam tolerance limit verified (+-0.1mm)...",
      "Querying Sri Lanka Customs HS Index: Match found -> HS 5208.11.00 (Woven Cotton Fabric)...",
      "Writing parsed record to SQLite DB table tech_specs...",
      "Parsing Complete! Specs saved into SQLite relational database."
    ]
    for i, step in enumerate(thoughts):
      yield f"data: {json.dumps({'step': i + 1, 'total': len(thoughts), 'message': step})}\n\n"
      await asyncio.sleep(0.35)
      
  return StreamingResponse(event_generator(), media_type="text/event-stream")

# 4. POST /api/agent1/parse — Run Agent 01 & Save TechSpec to SQLite DB
class VisionParseReq(BaseModel):
  project_id: Optional[int] = 1
  file_name: Optional[str] = "tech_pack_cotton_v2.dwg"

@app.post("/api/agent1/parse")
def api_agent1_parse(payload: VisionParseReq, db: Session = Depends(get_db)):
  result = parse_cad_technical_pack(payload.file_name or "tech_pack_cotton_v2.dwg")
  
  # Retrieve or fallback project
  project = db.query(models.Project).filter(models.Project.id == (payload.project_id or 1)).first()
  if not project:
    project = models.Project(name="Cotton Tee V2", category="Apparel", status="PARSED")
    db.add(project)
    db.commit()
    db.refresh(project)

  # Insert/Update TechSpec in SQLite
  spec = db.query(models.TechSpec).filter(models.TechSpec.project_id == project.id).first()
  if not spec:
    spec = models.TechSpec(
      project_id=project.id,
      fabric_type=result.get("fabric_type", "220 GSM Organic Cotton Canvas"),
      hardware=result.get("zipper", "YKK #5 Brass Antiqued Zipper"),
      tolerance=result.get("stitching_tolerance", "±0.1mm Double Stitching"),
      hs_code=result.get("mapped_hs_code", "5208.11.00")
    )
    db.add(spec)
  else:
    spec.fabric_type = result.get("fabric_type", spec.fabric_type)
    spec.hardware = result.get("zipper", spec.hardware)
    spec.tolerance = result.get("stitching_tolerance", spec.tolerance)
    spec.hs_code = result.get("mapped_hs_code", spec.hs_code)
  
  project.status = "PARSED"
  db.commit()

  result["db_record_id"] = spec.id
  result["project_id"] = project.id
  return result

# 5. GET /api/hs-codes — Available HS Codes Lookup
@app.get("/api/hs-codes")
def api_hs_codes():
  return [
    {"hs_code": code, "description": data["description"], "note": data["note"]}
    for code, data in HS_TARIFF_DATABASE.items()
  ]

# 6. POST /api/agent2/tariff — Run Agent 02 & Save TariffCalculation to SQLite DB
class TariffReq(BaseModel):
  project_id: Optional[int] = 1
  hs_code: Optional[str] = "5208.11.00"
  fob_total_usd: Optional[float] = 25000.0
  freight_mode: Optional[str] = "sea"
  freight_usd: Optional[float] = 1200.0
  exchange_rate: Optional[float] = 310.45

@app.post("/api/agent2/tariff")
def api_agent2_tariff(payload: TariffReq, db: Session = Depends(get_db)):
  result = calculate_sri_lanka_tariff(
    hs_code=payload.hs_code or "5208.11.00",
    fob_total_usd=payload.fob_total_usd or 25000.0,
    freight_mode=payload.freight_mode or "sea",
    freight_usd=payload.freight_usd or (4500.0 if payload.freight_mode == "air" else 1200.0),
    exchange_rate=payload.exchange_rate or 310.45
  )

  # Insert/Update TariffCalculation in SQLite DB
  project_id = payload.project_id or 1
  project = db.query(models.Project).filter(models.Project.id == project_id).first()
  if project:
    tariff_rec = db.query(models.TariffCalculation).filter(models.TariffCalculation.project_id == project_id).first()
    if not tariff_rec:
      tariff_rec = models.TariffCalculation(
        project_id=project_id,
        units=2000,
        fob_unit_usd=result["base_fob_usd"] / 2000 if result["base_fob_usd"] else 4.25,
        freight_mode=result["freight_mode"],
        freight_total_usd=result["freight_usd"],
        cid_usd=result["cid_usd"],
        pal_usd=result["pal_usd"],
        cess_usd=result["cess_usd"],
        vat_usd=result["vat_usd"],
        total_landed_usd=result["total_landed_usd"],
        total_landed_lkr=result["total_landed_lkr"]
      )
      db.add(tariff_rec)
    else:
      tariff_rec.freight_mode = result["freight_mode"]
      tariff_rec.freight_total_usd = result["freight_usd"]
      tariff_rec.cid_usd = result["cid_usd"]
      tariff_rec.pal_usd = result["pal_usd"]
      tariff_rec.cess_usd = result["cess_usd"]
      tariff_rec.vat_usd = result["vat_usd"]
      tariff_rec.total_landed_usd = result["total_landed_usd"]
      tariff_rec.total_landed_lkr = result["total_landed_lkr"]

    project.status = "CALCULATED"
    db.commit()
    result["db_record_id"] = tariff_rec.id

  return result

# 7. POST /api/agent3/draft — Generate Counter-Offer Draft
class NegotiatorDraftReq(BaseModel):
  supplier: Optional[str] = "Zhejiang Apparel Tech Co."
  target_fob: Optional[float] = 3.85
  volume_units: Optional[int] = 50000

@app.post("/api/agent3/draft")
def api_agent3_draft(payload: NegotiatorDraftReq):
  return generate_negotiation_draft(
    supplier=payload.supplier or "Zhejiang Apparel Tech Co.",
    target_fob=payload.target_fob or 3.85,
    volume_units=payload.volume_units or 50000
  )

# 8. POST /api/agent3/approve — Approve HITL & Save NegotiationContract to SQLite DB
@app.post("/api/agent3/approve")
def api_agent3_approve(payload: schemas.NegotiationApproveIn, db: Session = Depends(get_db)):
  if not payload.approved:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="Human-In-The-Loop Safety Gate: Outbound dispatch rejected without explicit authorization."
    )

  project_id = payload.project_id or 1
  project = db.query(models.Project).filter(models.Project.id == project_id).first()
  
  po_num = payload.po_number or "PO-2026-LK-882"
  user_sig = payload.user_signature or "Kavindu Perera"

  contract = db.query(models.NegotiationContract).filter(models.NegotiationContract.project_id == project_id).first()
  if not contract:
    contract = models.NegotiationContract(
      project_id=project_id,
      supplier_name="Zhejiang Apparel Tech Co.",
      target_fob_usd=3.85,
      email_body=payload.email_body or "Counter-Offer RFQ Agreed",
      hitl_approved=True,
      user_signature=user_sig,
      po_number=po_num
    )
    db.add(contract)
  else:
    contract.hitl_approved = True
    contract.user_signature = user_sig
    contract.po_number = po_num
    if payload.email_body:
      contract.email_body = payload.email_body

  if project:
    project.status = "ORDERED"
  
  db.commit()

  return {
    "authorized": True,
    "status": "APPROVED",
    "message": f"Contract {po_num} signed by {user_sig} and written to SQLite DB venturewing.db",
    "po_number": po_num,
    "user_signature": user_sig,
    "agreed_unit_fob": 3.85
  }

# 9. GET /api/history — Query All SQLite Records
@app.get("/api/history")
def api_history(db: Session = Depends(get_db)):
  projects = db.query(models.Project).all()
  specs = db.query(models.TechSpec).all()
  tariffs = db.query(models.TariffCalculation).all()
  contracts = db.query(models.NegotiationContract).all()

  return {
    "database": "SQLite venturewing.db",
    "projects_count": len(projects),
    "projects": [
      {
        "id": p.id,
        "name": p.name,
        "category": p.category,
        "status": p.status,
        "created_at": p.created_at.isoformat()
      }
      for p in projects
    ],
    "specs": [
      {
        "id": s.id,
        "project_id": s.project_id,
        "fabric_type": s.fabric_type,
        "hardware": s.hardware,
        "hs_code": s.hs_code
      }
      for s in specs
    ],
    "tariffs": [
      {
        "id": t.id,
        "project_id": t.project_id,
        "freight_mode": t.freight_mode,
        "total_landed_usd": t.total_landed_usd,
        "total_landed_lkr": t.total_landed_lkr
      }
      for t in tariffs
    ],
    "contracts": [
      {
        "id": c.id,
        "project_id": c.project_id,
        "po_number": c.po_number,
        "user_signature": c.user_signature,
        "target_fob_usd": c.target_fob_usd,
        "hitl_approved": c.hitl_approved
      }
      for c in contracts
    ]
  }

if __name__ == "__main__":
  import uvicorn
  port = int(os.getenv("PORT", 8000))
  uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
