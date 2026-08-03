from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False, default="Cotton Tee V2")
    category = Column(String, default="Apparel / Essentials")
    status = Column(String, default="PARSED")  # DRAFT, PARSED, CALCULATED, NEGOTIATED, ORDERED
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    specs = relationship("TechSpec", back_populates="project", cascade="all, delete-orphan")
    tariffs = relationship("TariffCalculation", back_populates="project", cascade="all, delete-orphan")
    contracts = relationship("NegotiationContract", back_populates="project", cascade="all, delete-orphan")


class TechSpec(Base):
    __tablename__ = "tech_specs"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    fabric_type = Column(String, default="220 GSM Organic Cotton Canvas")
    hardware = Column(String, default="YKK #5 Brass Antiqued Zipper")
    tolerance = Column(String, default="±0.1mm Double Stitching")
    hs_code = Column(String, default="5208.11.00")
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="specs")


class TariffCalculation(Base):
    __tablename__ = "tariff_calculations"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    units = Column(Integer, default=2000)
    fob_unit_usd = Column(Float, default=4.25)
    freight_mode = Column(String, default="sea")
    freight_total_usd = Column(Float, default=1200.0)
    cid_usd = Column(Float, default=0.0)
    pal_usd = Column(Float, default=2620.0)
    cess_usd = Column(Float, default=3930.0)
    vat_usd = Column(Float, default=5895.0)
    total_landed_usd = Column(Float, default=38645.0)
    total_landed_lkr = Column(Float, default=11997340.25)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="tariffs")


class NegotiationContract(Base):
    __tablename__ = "negotiation_contracts"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    supplier_name = Column(String, default="Zhejiang Apparel Tech Co.")
    target_fob_usd = Column(Float, default=3.85)
    email_body = Column(Text, nullable=True)
    hitl_approved = Column(Boolean, default=False)
    user_signature = Column(String, default="Kavindu Perera")
    po_number = Column(String, default="PO-2026-LK-882")
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="contracts")
