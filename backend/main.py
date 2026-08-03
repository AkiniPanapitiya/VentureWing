import os
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from dotenv import load_dotenv

from agents.agent1_ingestion import parse_cad_technical_pack
from agents.agent2_tariff_rag import calculate_sri_lanka_tariff
from agents.agent3_negotiator import generate_negotiation_draft, verify_hitl_authorization

load_dotenv()

app = FastAPI(
  title="VentureWing Procurement AI Engine",
  description="FastAPI Backend for Autonomous Sourcing, Sri Lanka Customs Duty RAG & HITL Negotiator",
  version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# Pydantic Schemas
class VisionParseRequest(BaseModel):
  file_name: Optional[str] = "tech_pack_cotton_v2.dwg"

class TariffRequest(BaseModel):
  hs_code: Optional[str] = "5208.11.00"
  fob_total_usd: Optional[float] = 25000.0
  freight_usd: Optional[float] = 1200.0
  exchange_rate: Optional[float] = 310.45

class NegotiatorDraftRequest(BaseModel):
  supplier: Optional[str] = "Zhejiang Apparel Tech Co."
  target_fob: Optional[float] = 3.85
  volume_units: Optional[int] = 50000

class HITLApproveRequest(BaseModel):
  approved: bool = Field(..., description="Explicit human authorization token")
  email_subject: Optional[str] = None
  email_body: Optional[str] = None

@app.get("/")
def read_root():
  return {
    "system": "VentureWing Procurement AI Backend Server",
    "hackathon": "IDEALIZE 2026 Open Category - Team Aviate",
    "status": "ONLINE",
    "agents": [
      "Agent 01: Multimodal Vision Ingestion Engine",
      "Agent 02: Sri Lanka Customs Tariff Vector RAG Engine",
      "Agent 03: HITL Negotiator & Security Station"
    ]
  }

@app.post("/api/agent1/parse")
def api_agent1_parse(payload: VisionParseRequest):
  return parse_cad_technical_pack(payload.file_name or "tech_pack_cotton_v2.dwg")

@app.post("/api/agent2/tariff")
def api_agent2_tariff(payload: TariffRequest):
  return calculate_sri_lanka_tariff(
    hs_code=payload.hs_code or "5208.11.00",
    fob_total_usd=payload.fob_total_usd or 25000.0,
    freight_usd=payload.freight_usd or 1200.0,
    exchange_rate=payload.exchange_rate or 310.45
  )

@app.post("/api/agent3/draft")
def api_agent3_draft(payload: NegotiatorDraftRequest):
  return generate_negotiation_draft(
    supplier=payload.supplier or "Zhejiang Apparel Tech Co.",
    target_fob=payload.target_fob or 3.85,
    volume_units=payload.volume_units or 50000
  )

@app.post("/api/agent3/approve")
def api_agent3_approve(payload: HITLApproveRequest):
  result = verify_hitl_authorization(payload.approved)
  if not result["authorized"]:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail=result["message"]
    )
  return result

if __name__ == "__main__":
  import uvicorn
  port = int(os.getenv("PORT", 8000))
  uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
