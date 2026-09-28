# ScrapSaathi (स्क्रैप साथी) ♻️
> **Kabadiwala Connect: Bringing the Informal Scrap Collector into the Formal Recycling Chain**

ScrapSaathi is a full-stack digital platform that bridges informal scrap collectors (*kabadiwalas*) and certified recycling businesses. It helps informal collectors create verified scrap lots, receive competitive quotes, complete documented handovers, and generate a tamper-proof digital **Lot Passport** with QR traceability.

---

## 🌟 Key Features

### 🛵 For Collectors
- **Guided 6-Step Lot Creation**: Material selection, image upload, weight input, origin locality, AI-assisted classification, and instant regional value estimation.
- **AI Material Identification Provider**: Modular abstraction detecting recyclability classification, confidence score, and scrap grade.
- **Fair Pricing & Competitive Offers**: Receive and compare bids from verified local recyclers.
- **Dual Confirmation Handover**: Coordinated handover with cryptographic confirmation from both collector and recycler.
- **Digital Lot Passport**: Immutable lifecycle tracking with public-safe QR code verification.

### 🏭 For Recyclers
- **Discover Scrap Lots**: Multi-parameter search & filtering (Material, Distance, Weight, Estimated Value).
- **Smart Matching Engine**: Algorithm assessing material compatibility, active service radius, and processing capacity.
- **Procurement & Quoting**: Direct digital bidding with pickup/drop-off logistics terms.
- **Digital Inventory Ledger**: Documented custody trail with acquired material metrics.

### 🛡️ For Administrators
- **Recycler Licensing Verification**: Gujarat Pollution Control Board (GPCB) compliance review (Pending / Verified / Suspended / Rejected).
- **Immutable Audit Trail**: Append-only event logging for security-sensitive operations.
- **Dispute Resolution**: Resolution dashboard for weight discrepancies or logistics issues.

---

## 🎨 Visual Design Language
Crafted with an editorial aesthetic:
- **Canvas**: Pale Mint Wash (`#f2ffe3`)
- **Primary Accent**: Vivid Lime (`#a3fda7`)
- **Structure**: Forest Depth (`#0d5b3b`) & Pine Shadow (`#083a26`)
- **Surfaces**: Elevated Cream Cards (`24px` radius, `0 0 28px rgba(0,0,0,0.09)` shadow)
- **Typography**: Editorial Serif Display (*Cormorant Garamond*) + Clean Sans-serif UI (*Plus Jakarta Sans*)

---

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend**: Node.js, Express, TypeScript, tsx, JWT Auth, Bcrypt
- **Architecture**: REST API with modular service boundaries (`MatchingService`, `PriceEstimationService`, `MaterialIdentificationProvider`)
- **Data Layer**: In-Memory Seed Database with Append-Only `LotEvent` ledger (Mongoose/MongoDB ready)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/scrap-sathi.git
   cd scrap-sathi
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```

4. **Start the Express API Server** (Port `5000`):
   ```bash
   npm run server
   ```

5. **Start the Frontend Development Server** (Port `5173`):
   ```bash
   npm run dev
   ```

6. Open your browser at [http://localhost:5173](http://localhost:5173).

---

## 👥 Demo Personas & Credentials

The platform features an instant **Persona Switcher** in the top navigation bar, or you can log in with:

| Persona | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| **Ramesh Kumar** | `collector@demo.scrapsaathi.local` | `Saathi@2026` | Collector |
| **EcoGujarat Recyclers** | `recycler@demo.scrapsaathi.local` | `Recycle@2026` | Recycler |
| **Admin Officer** | `admin@demo.scrapsaathi.local` | `Admin@2026` | Platform Admin |
| **OTP Code** | `123456` | *(Any 6 digits)* | Verification Code |

---

## 📜 Public-Safe Lot Passport
Every completed scrap transaction generates a public-safe Lot Passport (e.g. `/passport/LOT-2026-000184`) with:
- Redacted personal details (public-safe data only)
- GPCB authorization status
- Calculated CO₂ offset and water savings
- Cryptographic event chain QR code

---

## 📄 License
MIT License. Built for Smart India Hackathon (SIH) — Kabadiwala Connect.
