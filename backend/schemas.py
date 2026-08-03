from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class TechSpecBase(BaseModel):
    fabric_type: str = "220 GSM Organic Cotton Canvas"
    hardware: str = "YKK #5 Brass Antiqued Zipper"
    tolerance: str = "±0.1mm Double Stitching"
    hs_code: str = "5208.11.00"

class TechSpecCreate(TechSpecBase):
    project_id: int = 1

class TechSpecOut(TechSpecBase):
    id: int
    project_id: int
    created_at: datetime
    class Config:
        from_attributes = True


class TariffCalcBase(BaseModel):
    units: int = 2000
    fob_unit_usd: float = 4.25
    freight_mode: str = "sea"
    freight_total_usd: float = 1200.0
    cid_usd: float = 0.0
    pal_usd: float = 2620.0
    cess_usd: float = 3930.0
    vat_usd: float = 5895.0
    total_landed_usd: float = 38645.0
    total_landed_lkr: float = 11997340.25

class TariffCalcCreate(TariffCalcBase):
    project_id: int = 1

class TariffCalcOut(TariffCalcBase):
    id: int
    project_id: int
    created_at: datetime
    class Config:
        from_attributes = True


class NegotiationContractBase(BaseModel):
    supplier_name: str = "Zhejiang Apparel Tech Co."
    target_fob_usd: float = 3.85
    email_body: Optional[str] = None
    hitl_approved: bool = False
    user_signature: str = "Kavindu Perera"
    po_number: str = "PO-2026-LK-882"

class NegotiationApproveIn(BaseModel):
    project_id: int = 1
    approved: bool = Field(..., description="Explicit human authorization token")
    user_signature: Optional[str] = "Kavindu Perera"
    po_number: Optional[str] = "PO-2026-LK-882"
    email_body: Optional[str] = None

class NegotiationContractOut(NegotiationContractBase):
    id: int
    project_id: int
    created_at: datetime
    class Config:
        from_attributes = True


class ProjectCreate(BaseModel):
    name: str = "Cotton Tee V2"
    category: str = "Apparel / Essentials"

class ProjectOut(BaseModel):
    id: int
    name: str
    category: str
    status: str
    created_at: datetime
    specs: List[TechSpecOut] = []
    tariffs: List[TariffCalcOut] = []
    contracts: List[NegotiationContractOut] = []
    class Config:
        from_attributes = True
