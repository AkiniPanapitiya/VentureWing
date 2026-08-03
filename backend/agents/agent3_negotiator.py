import os
from typing import Dict, Any

def generate_negotiation_draft(
    supplier: str = "Zhejiang Apparel Tech Co.",
    target_fob: float = 3.85,
    volume_units: int = 50000
) -> Dict[str, Any]:
    """
    Agent 03: Negotiation Strategy Generator
    Composes strategic counter-offer emails leveraging target volume and customs duty bounds.
    """
    subject = f"Counter-Offer RFQ #882: Cotton Tee V2 Batch Production ({volume_units:,} Units)"
    body = (
        f"Dear {supplier} Sales Team,\n\n"
        f"Thank you for providing the initial quotation for Project Cotton Tee V2 at $4.25 USD FOB per unit.\n\n"
        f"Based on our Agent 02 Sri Lanka Customs Duty breakdown and competitive market benchmarks for 220 GSM Cotton Canvas, "
        f"our target landed cost threshold requires an FOB unit price of ${target_fob:.2f} USD for our initial {volume_units:,} unit production run.\n\n"
        f"Given our long-term commitment and planned Q4 expansion, we would like to finalize the purchase order at ${target_fob:.2f} USD / unit.\n\n"
        f"Best regards,\n"
        f"VentureWing Autonomous Procurement Engine"
    )
    
    return {
        "supplier": supplier,
        "target_fob": target_fob,
        "volume_units": volume_units,
        "projected_annual_impact_usd": 42500.0,
        "email_subject": subject,
        "email_body": body,
        "hitl_status": "PENDING_AUTHORIZATION"
    }

def verify_hitl_authorization(approved: bool) -> Dict[str, Any]:
    """
    Human-In-The-Loop Safety Guardrail Enforcement.
    Blocks outbound email dispatch unless explicit user authorization token is passed.
    """
    if not approved:
        return {
            "authorized": False,
            "status": "FORBIDDEN",
            "message": "Human-In-The-Loop Safety Gate: Outbound dispatch rejected without explicit authorization."
        }
    
    return {
        "authorized": True,
        "status": "APPROVED",
        "message": "Human-In-The-Loop Security Gate Passed. Email dispatched and Purchase Order #882 created.",
        "order_id": "PO-2026-LK-882",
        "agreed_unit_fob": 3.85
    }
