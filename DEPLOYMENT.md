# Deploying to Vercel

## Order / Contact form in production

The order and contact forms call `/api/contact`. That API needs environment variables **in Vercel** (your `.env.local` is not deployed).

### 1. Add Environment Variables in Vercel

1. Open [vercel.com](https://vercel.com) → your **scakesnbakes** project.
2. Go to **Settings** → **Environment Variables**.
3. Add these for **Production** (and Preview if you want):

| Name            | Value                    | Notes                          |
|-----------------|--------------------------|--------------------------------|
| `CONTACT_EMAIL` | `koletiamar@gmail.com`   | Where order/contact emails go  |
| `SMTP_HOST`     | `smtp.resend.com`        | Resend SMTP                    |
| `SMTP_PORT`     | `465`                    |                                |
| `SMTP_SECURE`   | `true`                   | Use `true` for port 465        |
| `SMTP_USER`     | `resend`                 |                                |
| `SMTP_PASS`     | your Resend API key      | From [resend.com](https://resend.com) |

4. (Optional) To save submissions to Neon in production, add:
   - `DATABASE_URL` or `POSTGRES_URL` — same connection string you use in `.env.local`

5. Click **Save**.

### 2. Redeploy

After saving env vars, redeploy so they take effect:

- **Deployments** → ⋮ on latest → **Redeploy** (optionally enable “Clear build cache and redeploy”).

Or push a new commit to trigger a deploy.

---

Once these variables are set and the project is redeployed, “Order now” and the contact form will work in production.
