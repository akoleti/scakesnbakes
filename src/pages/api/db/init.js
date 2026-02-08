/**
 * GET /api/db/init – create the submissions table if it doesn't exist.
 * Call this once (e.g. open in browser) to ensure the table exists before submitting forms.
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { initDb } = require("../../../lib/db");
    const result = await initDb();
    if (result.ok) {
      return res.status(200).json({ ok: true, message: "Table 'submissions' is ready." });
    }
    return res.status(500).json({ ok: false, error: result.error });
  } catch (err) {
    console.error("DB init error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
