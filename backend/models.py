from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.database import Base

class User(Base):
    """
    SQL User Authentication Model
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    company_name = Column(String, default="Apparel Brand Co.")
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    projects = relationship("Project", back_populates="owner", cascade="all, delete-orphan")


class Supplier(Base):
    """
    SQL Dynamic Supplier / Seller Matrix Model
    """
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    country = Column(String, nullable=False)
    location = Column(String, nullable=False)
    match_score = Column(Integer, default=90)
    fob_price = Column(Float, nullable=False)
    landed_cost_usd = Column(Float, nullable=False)
    landed_cost_lkr = Column(Float, nullable=False)
    lead_time = Column(String, default="14 days")
    capacity = Column(String, default="50,000 units/mo")
    is_zero_duty = Column(Boolean, default=False)
    is_recommended = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Project(Base):
    """
    Core Procurement Project Model
    """
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    name = Column(String, index=True, nullable=False)
    category = Column(String, default="Apparel")
    status = Column(String, default="DRAFT")  # DRAFT, PARSED, CALCULATED, NEGOTIATED, ORDERED
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    owner = relationship("User", back_populates="projects")
    tech_specs = relationship("TechSpec", back_populates="project", cascade="all, delete-orphan")
    tariff_calculations = relationship("TariffCalculation", back_populates="project", cascade="all, delete-orphan")
    negotiation_contracts = relationship("NegotiationContract", back_populates="project", cascade="all, delete-orphan")


class TechSpec(Base):
    """
    Technical CAD Specification Model
    """
    __tablename__ = "tech_specs"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    fabric_type = Column(String, nullable=False)
    hardware = Column(String, nullable=False)
    tolerance = Column(String, nullable=False)
    hs_code = Column(String, nullable=False, default="5208.11.00")
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="tech_specs")


class TariffCalculation(Base):
    """
    Sri Lanka Customs Landed Cost Model
    """
    __tablename__ = "tariff_calculations"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    units = Column(Integer, default=2000)
    fob_unit_usd = Column(Float, default=4.25)
    freight_mode = Column(String, default="sea")  # sea or air
    freight_total_usd = Column(Float, default=1200.0)
    cid_usd = Column(Float, default=0.0)
    pal_usd = Column(Float, default=2620.0)
    cess_usd = Column(Float, default=3930.0)
    vat_usd = Column(Float, default=5895.0)
    total_landed_usd = Column(Float, default=38645.0)
    total_landed_lkr = Column(Float, default=11997340.25)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="tariff_calculations")


class NegotiationContract(Base):
    """
    Supplier B2B Negotiation Contract Model
    """
    __tablename__ = "negotiation_contracts"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    supplier_name = Column(String, default="Zhejiang Apparel Tech Co.")
    target_fob_usd = Column(Float, default=3.85)
    email_body = Column(Text, nullable=False)
    hitl_approved = Column(Boolean, default=False)
    user_signature = Column(String, nullable=True)
    po_number = Column(String, default="PO-2026-0882-LK")
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="negotiation_contracts")
