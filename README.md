# VentureWing — Autonomous Global Sourcing & Sri Lanka Customs Intelligence AI Platform

> **Submission for IDEALIZE 2026 Hackathon (Open Category)**  
> **Team Name**: Team Aviate (SLIIT & NIBM)  
> **Platform Version**: Production Release 1.0.0

---

## 🚀 Executive Summary

**VentureWing** is a production-grade, multi-agent full-stack B2B SaaS procurement application designed for boutique apparel brands and Sri Lankan apparel export ecosystems. By replacing manual tech pack parsing, spreadsheet customs calculations, and email negotiation back-and-forth, VentureWing automates end-to-end global sourcing while strictly keeping humans in the loop for financial security.

---

## 🏗️ System Architecture

```
                       +---------------------------------------+
                       |         VentureWing Next.js 14        |
                       |       App Router (TypeScript & UI)    |
                       +-------------------+-------------------+
                                           |
                                    REST / Axios API
                                           |
                       +-------------------+-------------------+
                       |      FastAPI Backend Engine (Python)  |
                       +---------+---------+---------+---------+
                                 |         |         |
          +----------------------+         |         +-----------------------+
          |                                |                                 |
 +--------v--------+             +---------v-------+              +----------v----------+
 |  Agent 01:      |             |  Agent 02:      |              |  Agent 03:          |
 |  Vision & Spec  |             |  Customs Tariff |              |  Negotiator Engine  |
 |  Extractor      |             |  & RAG Engine   |              |  & HITL Guardrail   |
 +-----------------+             +--------+--------+              +---------------------+
                                          |
                                 +--------v--------+
                                 | Vector Database |
                                 | sl_customs_     |
                                 | tariffs.json    |
                                 +-----------------+
```

---

## 🤖 Multi-Agent AI System Architecture

VentureWing coordinates three specialized AI agents to execute complex B2B sourcing workflows:

### 1. Agent 01: Vision Ingestion & Tech Pack CAD Parser (`backend/agents/agent1_ingestion.py`)
- **Capability**: Analyzes technical pack drawings (`.dwg` blueprints or `.pdf` spec sheets) using Google Gemini Multimodal Vision API.
- **Output**: Extracts fabric GSM (e.g., 220 GSM Cotton Canvas), hardware components (YKK Brass Zippers), stitching tolerances (±0.1mm), and automatically maps Sri Lanka Customs **HS Code 5208.11.00**.

### 2. Agent 02: Customs Tariff Calculation & Vector RAG Engine (`backend/agents/agent2_tariff_rag.py`)
- **Capability**: Retrieves exact Sri Lanka Customs tax rules from vector-indexed dataset (`backend/data/sl_customs_tariffs.json`).
- **Mathematical Formula**:
  $$\text{CIF} = \text{FOB} + \text{Sea Freight}$$
  $$\text{CID} = \text{CIF} \times 0\% \quad (\text{Raw Material Exemption})$$
  $$\text{PAL} = \text{CIF} \times 10\% \quad (\text{Port \& Airport Levy})$$
  $$\text{CESS} = \text{CIF} \times 15\% \quad (\text{Export Development Levy})$$
  $$\text{VAT Base} = \text{CIF} + \text{CID} + \text{PAL} + \text{CESS}$$
  $$\text{VAT} = \text{VAT Base} \times 18\%$$
  $$\text{Total Landed Cost (USD)} = \text{CIF} + \text{CID} + \text{PAL} + \text{CESS} + \text{VAT}$$
- **Anchor Exchange Rate**: $1 \text{ USD} = 310.45 \text{ LKR}$ (CBSL Live Rate Conversion).

### 3. Agent 03: Negotiation Strategy Generator & HITL Security Station (`backend/agents/agent3_negotiator.py`)
- **Capability**: Evaluates target unit margins and composes tailored RFQ counter-offers.
- **Human-In-The-Loop (HITL) Guardrail**: Outbound dispatches are strictly locked by FastAPI authorization middleware (`/api/agent3/approve`). Returns `403 Forbidden` if unauthorized.

---

## 🌍 UN Sustainable Development Goals (SDGs) Alignment

- **SDG 8 (Decent Work & Economic Growth)**: Empowers Sri Lankan garment manufacturers by providing transparent cost breakdown matching and direct access to global boutique buyers.
- **SDG 9 (Industry, Innovation & Infrastructure)**: Modernizes traditional cross-border trade through AI-native computer vision and real-time vector RAG customs automation.

---

## 📂 Repository Workspace Structure

```
f:\venture/
├── app/
│   ├── layout.tsx                       # Root Layout & Fonts
│   ├── page.tsx                         # Page 1: Landing Page (Hero, SDGs 8 & 9, SaaS Tiers)
│   ├── dashboard/page.tsx               # Page 2: Workspace Command Center & Bento Metrics
│   ├── ingestion/page.tsx               # Page 3: Agent 01 Vision Ingestion & CAD Specs Parser
│   ├── suppliers/page.tsx               # Page 4: Supplier Discovery & Matching Matrix
│   ├── tariff/page.tsx                  # Page 5: Agent 02 Customs Tariff & Landed Cost Engine
│   ├── outbox/page.tsx                  # Page 6: Agent 03 Negotiator & HITL Guardrail Station
│   ├── orders/page.tsx                  # Page 7: Purchase Order Confirmed & Shipping Tracker
│   └── team/page.tsx                    # Page 8: Technical Architecture & Team Aviate
├── components/
│   ├── sidebar.tsx                      # Fixed 280px Left Navigation Bar
│   ├── header.tsx                       # Top Navigation Header & Live API Key Toggle
│   ├── bento-stats.tsx                  # Dashboard Metric Cards Component
│   ├── cad-viewer.tsx                   # Tech Pack CAD Canvas & Hotspot Bounding Boxes
│   ├── supplier-card.tsx                # Supplier Comparison Card Component
│   ├── tariff-table.tsx                 # Itemized Sri Lanka Duty Breakdown Table
│   ├── hitl-banner.tsx                  # Amber Security Guardrail Banner Component
│   └── agent-log-panel.tsx              # On-Screen Visual Agent Execution & RAG Inspector Panel
├── backend/
│   ├── main.py                          # FastAPI Application Server & CORS Setup
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── agent1_ingestion.py          # Agent 01 Vision Parser
│   │   ├── agent2_tariff_rag.py          # Agent 02 Customs Tariff RAG
│   │   └── agent3_negotiator.py          # Agent 03 HITL Negotiator
│   ├── data/
│   │   └── sl_customs_tariffs.json      # Vector Index Records for HS 5208.11.00
│   └── requirements.txt                 # FastAPI, Uvicorn, Google-GenerativeAI, Pydantic
├── .env.example                         # Environment Variables Template
├── package.json                         # Next.js 14, Tailwind CSS, Lucide React, Axios
└── README.md                            # Hackathon Judge Documentation
```

---

## 🛠️ Local Setup & Quickstart Guide

### Prerequisites
- Node.js 18.x or 20.x
- Python 3.10 or higher

### 1. Frontend Setup (Next.js 14)
```bash
# Navigate to project root
npm install

# Run Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Backend Setup (FastAPI Python)
```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Start FastAPI server on port 8000
uvicorn backend.main:app --reload --port 8000
```
Open [http://localhost:8000/docs](http://localhost:8000/docs) to view interactive Swagger API documentation.

---

## 👥 Team Aviate — IDEALIZE 2026 Submission

- **Panapitiya P.D.A.S.** (SLIIT) — *System Architect*
- **Sammandapperuma S.M.A.D.V.** (NIBM) — *Full-Stack Engineer*
- **Obeysekara R.A.T.P.** (SLIIT) — *AI Lead*
- **Silva K.D.R.** (NIBM) — *UI/UX Specialist*

---

*Powered by Google Gemini 1.5 Pro, Next.js 14, and Python FastAPI. Developed for IDEALIZE 2026 Open Category.*
