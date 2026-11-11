<p align="center"><img src="https://raw.githubusercontent.com/MalikUsmanAbid/MalikUsmanAbid/main/assets/usman-dev-logo.png" alt="Usman Dev — Full-Stack Developer" width="120" /></p>

# SKV Construction


## Visual project guide

A construction company website built with React, Vite, Vercel Functions and Supabase, with shared site content, authenticated administration and quote-request storage.

These five original illustrations summarize the documented project. They are **documentation graphics, not application screenshots or evidence of production readiness**.

![SKV Construction project overview](docs/portfolio/01-cover.svg)

| Features | Architecture |
| --- | --- |
| ![Feature overview](docs/portfolio/02-features.svg) | ![Architecture overview](docs/portfolio/03-architecture.svg) |

| Workflow | Technology |
| --- | --- |
| ![Workflow overview](docs/portfolio/04-workflow.svg) | ![Technology overview](docs/portfolio/05-stack.svg) |

**Scope and verification:** Requires configured Supabase and server environment variables. No client results or certifications are claimed.

[Developer portfolio](https://developer-folio-nov04-ab.glovedlark8.chatgpt.site) (ChatGPT sign-in required) · [Usman Dev](https://github.com/MalikUsmanAbid)

---


Production website for SKV Construction, built with React, Vite, Vercel Functions, and Supabase.

## Local setup

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and set all four values.
3. In Supabase SQL Editor, run `supabase/schema.sql`.
4. Run `npm run dev`.

## Deploy to Vercel

1. Create a Supabase project and run `supabase/schema.sql`.
2. In Vercel, import this repository and add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` as encrypted environment variables.
3. Deploy. The public site reads shared content from Supabase; authenticated admin changes and quote requests are stored there.

Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code or commit `.env.local`.
## Developer contact

[Email](mailto:usmandev234@gmail.com) · [WhatsApp](https://wa.me/923157543808) · [Facebook](https://www.facebook.com/profile.php?id=61594398140960) · [GitHub](https://github.com/MalikUsmanAbid)
