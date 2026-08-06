# Hardware Price Tracker (Frontend)

A multi-page interface for tracking the price history of computer hardware components across online retailers. Built with React 19, TypeScript, and Recharts, it interfaces with a Spring Boot REST API backend via a Docker network in production.

> This repository covers the **frontend only**. The backend (Spring Boot + PostgreSQL) has its own README.

---

## Overview

This application allows users to browse time-series pricing data on computer hardware across several categories — Consumer GPUs, CPUs, RAM, Workstation GPUs, SSDs, HDDs, and NVMe drives — and view interactive charts for each product, broken down by vendor. The goal is to give users a clear picture of how prices move over time across the Australian market, with the intention to extend coverage to US vendors in the future. The application was created in response to the considerable pricing volatility within the PC market.

---

## Key Features

- **Category browsing** — Landing page with seven hardware categories, each linking to a list of products
- **Dual view modes** — Products can be browsed in grid or list layout
- **Chip & brand filters for GPUs** — Filter consumer GPUs by chip model and board manufacturer
- **Product detail pages** — Per-product specification tables with full price history
- **Multi-vendor price charts** — Interactive line charts showing price over time, one line per vendor, powered by Recharts
- **Smart price deduplication** — Where multiple price points exist for the same vendor on the same day, only the latest is plotted
- **Active/inactive status** — Products are flagged as active or discontinued; active products sort to the top
- **Breadcrumb navigation** — Context-aware navbar that reflects the current category and product
- **Responsive layout** — Mobile-friendly using Tailwind CSS utility classes
- **High-contrast dark theme** — Fixed black background with bright green accent via CSS custom properties

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.9 (strict mode) |
| Build tool | Vite 8 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Data visualisation | Recharts 3 |
| Linting | ESLint 9 + typescript-eslint (strict) |

---

## Project Structure

```
src/
├── components/               # Reusable UI components
│   ├── Navbar.tsx            # Sticky header with breadcrumb navigation
│   └── PriceChart.tsx        # Multi-vendor line chart (Recharts)
├── pages/                    # Route-level page components
│   ├── LandingPage.tsx       # Category selection home page
│   ├── ProductListPage.tsx   # Browsable product grid / list
│   └── ProductDetailPage.tsx # Product specs + price history
├── services/                 # API integration layer
│   ├── product_services/     # Fetch product catalogues (GPU, CPU, RAM, Workstation GPU, SSD, HDD, NVMe)
│   └── price_point_services/ # Fetch price history per product
├── types/                    # TypeScript interfaces
│   ├── product_types/        # Product data models
│   ├── price_point_types/    # Price point data models
│   └── hybrid_types/         # Combined product + price responses
├── App.tsx                   # Route definitions
└── main.tsx                  # Application entry point
```

The service layer mirrors the backend's REST structure. Each hardware category has a dedicated product service and a price point service, keeping data-fetching logic isolated from UI components.

---

## Backend Integration

The frontend proxies all API calls through a Caddy reverse proxy in production. Communication with the backend is mediated through a local Docker network on the deployed instance(s).

**Endpoints consumed:**

| Method | Endpoint                                            | Description |
|---|-----------------------------------------------------|---|
| `GET` | `/api/v1/gpus`                                      | All consumer GPU products |
| `GET` | `/api/v1/cpus`                                      | All CPU products |
| `GET` | `/api/v1/ram`                                       | All RAM products |
| `GET` | `/api/v1/workstation_gpus`                          | All workstation GPU products |
| `GET` | `/api/v1/ssds`                                      | All SSD products |
| `GET` | `/api/v1/hdds`                                      | All HDD products |
| `GET` | `/api/v1/nvmes`                                     | All NVMe drive products |
| `GET` | `/api/v1/gpu-pricepoints/{modelNumber}`             | GPU specs + full price history |
| `GET` | `/api/v1/cpu-pricepoints/{modelNumber}`             | CPU specs + full price history |
| `GET` | `/api/v1/ram-pricepoints/{modelNumber}`             | RAM specs + full price history |
| `GET` | `/api/v1/workstation-gpu-pricepoints/{modelNumber}` | Workstation GPU specs + price history |
| `GET` | `/api/v1/ssd-pricepoints/{modelNumber}`             | SSD specs + full price history |
| `GET` | `/api/v1/hdd-pricepoints/{modelNumber}`             | HDD specs + full price history |
| `GET` | `/api/v1/nvme-pricepoints/{modelNumber}`            | NVMe drive specs + full price history |

Price data is collected by a **JSoup web scraper** running on a **daily CRON schedule** on a separate backend microservice, sourcing prices from Australian online retailers including Umart Online & Scorptec.