# Stitchly — AI-Powered Custom Fashion Marketplace

> **“An AI-assisted marketplace connecting customers with independent fashion designers and tailors.”**

Stitchly is an end-to-end full-stack bespoke fashion platform that bridges discerning clients with independent couture ateliers, master tailors, and bespoke designers worldwide.

---

## 🌟 Key Differentiators & Highlights

1. **The Reverse Marketplace Workflow**:
   - **Step 1**: Client conceptualizes a garment in the **AI Design Studio** or posts a custom clothing requirement with inspiration photos, fabric preferences, budget range, and event deadline.
   - **Step 2**: Verified ateliers browse open client briefs and submit bespoke quotations with turnaround days, proposed textiles, and cost breakdowns.
   - **Step 3**: Client compares quotes side-by-side, selects an atelier, and accepts the proposal.
   - **Step 4**: An active order is generated automatically and tracked across milestones (`PLACED` → `MEASUREMENTS_CONFIRMED` → `IN_PRODUCTION` → `FITTINGS_READY` → `SHIPPED` → `COMPLETED`).
   - **Step 5**: Client writes a verified review that recalibrates the atelier's public rating.

2. **Haute AI Fashion Assistant**:
   - Analyzes style silhouettes, drape structure, and corsetry needs.
   - Recommends luxury textiles and internal linings (e.g. Mulberry Habotai, Cupro, Silk Mikado, French Chantilly Lace).
   - Generates aesthetic color harmony palettes with instant hex code copying.
   - Suggests artisanal finishes (hidden horsehair hem braids, interior waist stays, modesty panels).
   - Computes non-binding estimated price ranges with prominent disclaimers.
   - **1-Click "Post as Custom Brief"**: Directly pre-fills client requirement forms with the AI design concept.

3. **Multi-Role Experience**:
   - **Customer**: Post briefs, browse designs & ateliers, compare incoming quotes, save lookbook items, track orders, rate ateliers.
   - **Designer**: Manage atelier profile, showcase portfolio, bid on open customer briefs, advance order fitting milestones, input shipping tracking numbers.
   - **Admin**: Review & verify new designer applications, toggle user accounts, moderate reported designs, view GMV and platform metrics.

---

## 🏗️ Architecture & Technology Stack

### Backend
- **Java 17 / 21 / 24**
- **Spring Boot 3.3.5** (REST APIs)
- **Spring Security + JJWT 0.12.5** (Stateless JWT, Role-Based Access Control)
- **Spring Data JPA & Hibernate**
- **MySQL & H2** (Configured for MySQL with zero-setup in-memory H2 default fallback)
- **Clean Architecture**:
  - `com.stitchly.controller` — REST Endpoints
  - `com.stitchly.service` — Business Logic & AI Stylist Engine
  - `com.stitchly.repository` — JPA Data Repositories
  - `com.stitchly.entity` — Relational Domain Entities
  - `com.stitchly.dto` — Request & Response Data Transfer Objects
  - `com.stitchly.exception` — Central `@RestControllerAdvice` Exception Handling
  - `com.stitchly.security` — JWT Provider, Token Filter, UserPrincipal
  - `com.stitchly.config` — Security, CORS, Uploads, Static Resources & DataInitializer

### Frontend
- **React 19 + Vite 8**
- **Tailwind CSS** (Custom haute couture luxury theme, typography tokens, glassmorphism)
- **Lucide React** (Haute fashion icons)
- **Axios** (API client with automatic JWT bearer authorization interceptor)
- **Context API** (`AuthContext` with role helpers, `ToastContext` with animated alerts)

---

## ⚡ Instant Demo Credentials

The application is pre-seeded with rich test accounts accessible with password `password123`:

| Role | Account Email | Name / Atelier | Purpose |
| :--- | :--- | :--- | :--- |
| **Customer** | `customer@stitchly.com` | Sophia Vance | Post briefs, compare quotes, active orders, saved lookbook |
| **Designer** | `designer@stitchly.com` | Julian Laurent (Maison Laurent Atelier) | View open briefs, submit quotes, advance production milestones |
| **Designer** | `aurora@stitchly.com` | Aurora Sterling (Aurora Bridal) | Modern bridal & French lace atelier |
| **Designer** | `marcus@stitchly.com` | Marcus Sterling-Hayes (Savile & Sartorial) | Bespoke British tailoring & tuxedos |
| **Designer** | `kai@stitchly.com` | Kai Tanaka (Atelier Tanaka Minimal) | Unverified designer awaiting Admin verification |
| **Admin** | `admin@stitchly.com` | Stitchly Platform Admin | Verify designers, oversee users & platform GMV |

*(You can also use the **Demo Logins** modal in the top navigation bar to switch personas with 1-click).*

---

## 🚀 Running the Project Locally

### 1. Backend

Navigate to the `backend` folder:
```bash
cd backend
```

#### Run with Zero-Config Default (H2 In-Memory DB):
```bash
mvn spring-boot:run
```
The backend starts on `http://localhost:8080`.
H2 Console is accessible at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:stitchly_db`, User: `sa`, Password: empty).

#### Run with MySQL:
Ensure MySQL is running on port 3306, then run:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```
Or set environment variables:
- `DB_URL`: `jdbc:mysql://localhost:3306/stitchly_db?createDatabaseIfNotExist=true`
- `DB_USERNAME`: `your_user`
- `DB_PASSWORD`: `your_password`

---

### 2. Frontend

Navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` (or `http://localhost:5174` if 5173 is occupied) in your browser.

---

## 📡 REST API Reference

### Auth
- `POST /api/auth/register` — Register customer or designer
- `POST /api/auth/login` — Login & receive JWT Bearer token
- `GET /api/auth/me` — Get authenticated user details

### AI Design Assistant
- `POST /api/ai/consult` — Generate silhouette cuts, fabric recommendations, color palette, estimated price range, and customization suggestions

### Designs Catalog
- `GET /api/designs` — Browse designs (filters: `category`, `minPrice`, `maxPrice`, `search`)
- `GET /api/designs/featured` — Featured designs
- `GET /api/designs/{id}` — Design details
- `POST /api/designs` — Create portfolio piece (Designer only)
- `POST /api/designs/{id}/like` — Toggle save to lookbook
- `GET /api/designs/my-likes` — Customer's saved designs
- `POST /api/designs/{id}/report` — Report design for moderation

### Ateliers & Designers
- `GET /api/designers` — Search designers (by `specialty`, `search`, verified status)
- `GET /api/designers/{id}` — Atelier profile, portfolio, and patron reviews
- `PUT /api/designer/profile` — Update atelier settings (Designer only)

### Custom Requirements (Client Briefs)
- `POST /api/requirements` — Post a custom clothing brief (Customer only)
- `GET /api/requirements/my` — Customer's posted requirements
- `GET /api/requirements/open` — Open requirements feed for designers to bid on
- `GET /api/requirements/{id}` — View requirement details
- `PUT /api/requirements/{id}/cancel` — Cancel brief

### Quotations (The Marketplace Engine)
- `POST /api/quotations` — Designer submits custom quote with price, turnaround, fabric notes, and cost breakdown
- `GET /api/quotations/requirement/{requirementId}` — Customer views all competing quotations for their brief
- `GET /api/quotations/my` — Designer views submitted quotes
- `POST /api/quotations/{id}/accept` — Customer accepts a quote → **Converts into an active Order!**

### Orders & Fittings
- `GET /api/orders/customer` — Client's active commissions & fitting tracker
- `GET /api/orders/designer` — Designer's orders in production
- `GET /api/orders/{id}` — Order details
- `PUT /api/orders/{id}/status` — Advance order milestone (`MEASUREMENTS_CONFIRMED`, `IN_PRODUCTION`, `FITTINGS_READY`, `SHIPPED`, `COMPLETED`)

### Ratings & Reviews
- `POST /api/reviews` — Client rates completed order (1-5 stars) and submits testimonial
- `GET /api/reviews/designer/{designerId}` — Public reviews for an atelier

### Admin Portal
- `GET /api/admin/stats` — Platform KPIs (GMV, total users, orders, open briefs)
- `GET /api/admin/designers/pending` — Designers awaiting verification
- `PUT /api/admin/designers/{id}/verify` — Verify/approve atelier credentials
- `GET /api/admin/users` — List platform users
- `PUT /api/admin/users/{id}/toggle-status` — Enable / disable accounts
- `GET /api/admin/designs/reported` — Moderation queue
- `PUT /api/admin/designs/{id}/dismiss-report` — Dismiss flagged report
- `GET /api/admin/orders` — Platform-wide orders monitor

### Uploads
- `POST /api/uploads` — Upload image file (served via `/uploads/{filename}`)
