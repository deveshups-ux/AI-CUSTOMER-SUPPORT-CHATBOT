# 🤖 SupportAI — AI-Powered Customer Support Chatbot

> A multi-tenant SaaS platform that lets any business deploy an AI-powered customer support chatbot on their website in minutes — no coding required.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)

🔗 **Live Demo:** [ai-customer-support-chatbot-nu.vercel.app](https://ai-customer-support-chatbot-nu.vercel.app/)

---

## 📌 The Problem

Small and medium businesses can't always afford a 24/7 customer support team, but customers still expect instant answers to common questions — return policies, delivery timelines, product info, and more. Slow responses often mean lost sales.

## 💡 The Solution

**SupportAI** lets any business owner:

- ✅ Configure their own knowledge base (FAQs, policies, support contact) through a simple dashboard
- ✅ Get an AI chatbot that answers customer queries **strictly from their own data** — no hallucinated or made-up responses
- ✅ Embed the chatbot on their website with a **single script tag** — zero backend or frontend coding required
- ✅ Serve customers 24/7, with a consistent, controlled brand voice

---

## 🏗️ How It Works

```
Business Owner                          End Customer
     │                                        │
     ▼                                        ▼
 Configures knowledge base           Visits business website
 (FAQs, policies, etc.)              Opens embedded chat widget
     │                                        │
     ▼                                        ▼
 Data stored in MongoDB   ◄────────  Asks a question
     │                                        │
     ▼                                        ▼
 AI (Google Gemini) generates a response using ONLY
 the business's configured knowledge — grounded prompting
 prevents the AI from inventing policies or facts
     │
     ▼
 Response returned to the widget → shown to the customer
```

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🧠 **Grounded AI Responses** | The AI is instructed to answer strictly from business-provided data, with a fixed fallback for unrelated queries — minimizing hallucination |
| 🔌 **One-Line Embed** | A single `<script>` tag, framework-agnostic, works on any website |
| 🔐 **Secure Authentication** | OAuth 2.0 login flow (via ScaleKit) with httpOnly cookie-based sessions |
| 🏢 **Multi-Tenant Architecture** | One codebase serves multiple businesses, each with isolated data via `ownerId` |
| 🌐 **Cross-Origin Ready** | Proper CORS and preflight (OPTIONS) handling so the widget works from any domain |
| ⚡ **Serverless-Optimized** | MongoDB connection caching to avoid connection pool exhaustion on serverless deployments |

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **AI:** Google Gemini API (`@google/genai`)
- **Authentication:** OAuth 2.0 via ScaleKit
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB connection string
- A Google Gemini API key
- A ScaleKit account (for OAuth)

### Installation

```bash
git clone https://github.com/deveshups-ux/AI-CUSTOMER-SUPPORT-CHATBOT.git
cd AI-CUSTOMER-SUPPORT-CHATBOT
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
SCALEKIT_ENVIRONMENT_URL=your_scalekit_env_url
SCALEKIT_CLIENT_ID=your_scalekit_client_id
SCALEKIT_CLIENT_SECRET=your_scalekit_client_secret
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # OAuth login, callback, logout
│   │   ├── chat/          # AI chatbot endpoint (public, cross-origin)
│   │   └── settings/      # Business knowledge base CRUD (auth-protected)
│   ├── dashboard/         # Business owner dashboard
│   └── embed/             # Embed code generator page
├── components/             # Client-side React components
├── lib/                    # DB connection, session, ScaleKit config
├── models/                  # Mongoose schemas
└── proxy.ts                 # Middleware for route protection

public/
└── chatBot.js               # The embeddable widget script
```

---

## 🔐 Security Notes

While building this project, I conducted a self-audit and identified and fixed the following:

- **IDOR (Insecure Direct Object Reference):** API routes were trusting a client-supplied `ownerId` instead of validating it against the authenticated session. Fixed by deriving identity server-side from the session.
- **Cookie Configuration:** Corrected `maxAge` (was set in milliseconds instead of seconds) and made the `secure` flag environment-aware.
- **Route Protection:** Extended middleware coverage to protect the `/embed` route, which was previously accessible without authentication.

Note: The `/api/chat` endpoint intentionally accepts a client-supplied `ownerId` since it's called by anonymous website visitors with no login session — it is kept strictly read-only to limit exposure.

---

## 🗺️ Roadmap

- [ ] Rate limiting on the chat endpoint
- [ ] Dynamic widget origin detection (no hardcoded API URL)
- [ ] Analytics dashboard for businesses (query volume, common questions)
- [ ] Multi-language support

---

## 📄 License

This project is open for learning and reference purposes.

---

<p align="center">Built with ❤️ by <a href="https://github.com/deveshups-ux">Devesh Tiwari</a></p>
