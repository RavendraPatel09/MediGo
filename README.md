# MediGo 💊

**MediGo** is a multi-role online medicine delivery platform built as a modern pnpm monorepo. It brings together three dedicated apps — **Buyer**, **Seller**, and **Admin** — on a shared design system and state layer, enabling end-to-end medicine ordering, pharmacy inventory management, and platform administration.

---

## ✨ Features

### 🛒 Buyer App
- Browse the medicine **Marketplace** and view detailed product pages
- **Nearby** pharmacy discovery with interactive map (Leaflet)
- Cart, **Checkout**, and **Order** tracking
- Role selection, login & registration flows
- Rich, animated UI with Framer Motion and Three.js visuals

### 🏪 Seller App
- Seller **Dashboard** with sales/analytics charts
- **Inventory** management and **Add Medicine** listing flow
- **Order** fulfillment and buyer **Messages**
- Dedicated seller authentication

### 🛠️ Admin App
- Centralized **Dashboard** for platform oversight
- **User** management across buyers and sellers
- Seller/listing **Approvals** workflow
- **Reports** and analytics

### 📦 Shared Packages
- `ui` — shared React component library
- `theme` — shared design tokens/styling
- `store` — global state (Zustand) for auth, cart, orders, medicines, users, and approvals
- `types` — shared TypeScript types
- `utils` — shared utility functions
- `config` — shared configuration (ESLint/TS/etc.)

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18/19 + Vite |
| Language | TypeScript |
| State Management | Zustand |
| Routing | React Router |
| Styling/Animation | Framer Motion |
| Maps | Leaflet / React-Leaflet |
| 3D Graphics | Three.js / React Three Fiber |
| Charts | Recharts |
| Icons | Lucide React |
| Monorepo Tooling | pnpm workspaces |
| Linting | ESLint / oxlint |

---

## 📁 Project Structure

```
MediGo/
├── apps/
│   ├── buyer/     # Customer-facing marketplace & ordering app
│   ├── seller/     # Pharmacy/seller inventory & order management app
│   └── admin/     # Platform administration dashboard
├── packages/
│   ├── ui/         # Shared component library
│   ├── theme/       # Shared design tokens
│   ├── store/       # Shared Zustand stores
│   ├── types/        # Shared TypeScript types
│   ├── utils/        # Shared utilities
│   └── config/       # Shared configs
├── pnpm-workspace.yaml
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/) `>=11`

### Installation

```bash
git clone https://github.com/RavendraPatel09/MediGo.git
cd MediGo
pnpm install
```

### Development

Run all apps in parallel:

```bash
pnpm dev
```

Or run a single app from its directory, e.g.:

```bash
cd apps/buyer
pnpm dev
```

| App | Default Port |
|---|---|
| Buyer | `5173` (Vite default) |
| Seller | `5173` (Vite default) |
| Admin | `3002` |

### Build

```bash
pnpm build
```

### Lint & Type Check

```bash
pnpm lint
pnpm typecheck
```

---

## 🗺️ Roadmap
- [ ] Backend/API integration
- [ ] Authentication with persistent sessions
- [ ] Payment gateway integration
- [ ] Real-time order tracking
- [ ] Push notifications

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the ISC License.

---

## 🏷️ Suggested GitHub Topics

`react` `typescript` `vite` `monorepo` `pnpm` `pnpm-workspace` `zustand` `medicine-delivery` `pharmacy` `healthcare` `ecommerce` `marketplace` `leaflet` `three-js` `framer-motion` `admin-dashboard`

## 📝 Suggested GitHub "About" Description

> Multi-role medicine delivery platform (Buyer, Seller, Admin) built as a pnpm monorepo with React, TypeScript, and Vite.
