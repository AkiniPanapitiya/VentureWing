from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# --- User Auth Schemas ---
class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str
    company_name: Optional[str] = "Apparel Brand Co."

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    company_name: str
    created_at: datetime

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# --- Supplier Schemas ---
class SupplierResponse(BaseModel):
    id: int
    name: str
    country: str
    location: str
    match_score: int
    fob_price: float
    landed_cost_usd: float
    landed_cost_lkr: float
    lead_time: str
    capacity: str
    is_zero_duty: bool
    is_recommended: bool

    class Config:
        from_attributes = True

# --- Spec Schemas ---
class TechSpecCreate(BaseModel):
    project_id: int
    file_name: Optional[str] = "tech_pack_cotton_v2.dwg"

class TechSpecResponse(BaseModel):
    id: int
    project_id: int
    fabric_type: str
    hardware: str
    tolerance: str
    hs_code: str
    created_at: datetime

    class Config:
        from_attributes = True

# --- Tariff Schemas ---
class TariffCalculateRequest(BaseModel):
    project_id: int
    hs_code: Optional[str] = "5208.11.00"
    fob_unit_usd: Optional[float] = 4.25
    units: Optional[int] = 2000
    freight_mode: Optional[str] = "sea"
    freight_usd: Optional[float] = 1200.0

class TariffResponse(BaseModel):
    id: int
    project_id: int
    units: int
    fob_unit_usd: float
    freight_mode: str
    freight_total_usd: float
    cid_usd: float
    pal_usd: float
    cess_usd: float
    vat_usd: float
    total_landed_usd: float
    total_landed_lkr: float

    class Config:
        from_attributes = True

# --- Negotiation & Approval Schemas ---
class NegotiationDraftRequest(BaseModel):
    project_id: int
    supplier_name: Optional[str] = "Zhejiang Apparel Tech Co."
    target_fob_usd: Optional[float] = 3.85
    units: Optional[int] = 50000

class ApprovalRequest(BaseModel):
    project_id: int
    approved: bool
    user_signature: str
    po_number: Optional[str] = "PO-2026-0882-LK"

# --- Project Schemas ---
class ProjectResponse(BaseModel):
    id: int
    name: str
    category: str
    status: str
    created_at: datetime
    tech_specs: List[TechSpecResponse] = []
    tariff_calculations: List[TariffResponse] = []

    class Config:
        from_attributes = True
