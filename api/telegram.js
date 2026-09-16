export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({ ok: true });
    }

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const OWNER_CHAT_ID = "7771844979";

    if (!BOT_TOKEN) {
      console.error("BOT_TOKEN is missing");
      return res.status(500).json({
        ok: false,
        error: "BOT_TOKEN is missing"
      });
    }

    const body = req.body || {};

    // Получаем данные, которые отправляет Wish Note
    const wish =
      body.wish ||
      body.text ||
      body.message ||
      "";

    const category =
      body.category ||
      "Без категории";

    const username =
      body.username ||
      body.user?.username ||
      "не указан";

    const firstName =
      body.first_name ||
      body.user?.first_name ||
      "";

    if (!wish.trim()) {
      return res.status(400).json({
        ok: false,
        error: "Wish is empty"
      });
    }

    const message =
      `💌 НОВОЕ ЖЕЛАНИЕ\n\n` +
      `👤 От: ${firstName || "Пользователь"}\n` +
      `@${username.replace("@", "")}\n\n` +
      `📂 Категория: ${category}\n\n` +
      `✨ Желание:\n${wish}`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: OWNER_CHAT_ID,
          text: message
        })
      }
    );

    const result = await telegramResponse.json();

    console.log("Telegram response:", result);

    if (!result.ok) {
      return res.status(500).json({
        ok: false,
        error: result.description || "Telegram error"
      });
    }

    return res.status(200).json({
      ok: true
    });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}