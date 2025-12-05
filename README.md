# Alchemy Lab – Telegram Mini App Game Skeleton

This is a skeleton project for a Telegram Mini App game **"Alchemy Lab"**.

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express (TypeScript)
- In-memory mock store for player state
- Basic game systems scaffolding:
  - economy
  - mini-games (grind, brew, mix-order)
  - upgrades
  - quests
  - referrals

## Requirements

- Node.js >= 18
- npm or yarn

## Running the backend

```bash
cd backend
npm install
npm run dev
```

Backend will start on `http://localhost:4000` by default.

## Running the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend Vite dev server will start (usually on `http://localhost:5173`) and will call the backend at `http://localhost:4000`.

## Telegram Mini App

This project is prepared to be used as a Telegram WebApp (Mini App):

- Use the built frontend URL (e.g. from Netlify/Vercel) as the WebApp URL in your bot.
- `src/services/telegram.ts` contains a minimal helper for `window.Telegram.WebApp`.

> NOTE: Bot token, webhook setup, and payment/Stars logic are not included.

## How to extend

- Replace in-memory store with a real database.
- Implement real auth using Telegram initData.
- Add more recipes, ingredients, quests, and upgrades.
- Refine mini-games visuals and logic.
- Add monetization (Telegram Stars, premium currency).
- Add more languages to the i18n helper.
