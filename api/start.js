export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({ ok: true });
    }

    const token = process.env.BOT_TOKEN;

    if (!token) {
      console.error("BOT_TOKEN is missing");
      return res.status(500).json({ error: "BOT_TOKEN is missing" });
    }

    const update = req.body;

    if (!update || !update.message) {
      return res.status(200).json({ ok: true });
    }

    const chatId = update.message.chat.id;

    const text = `💌 WISH NOTE

365 WISHES · 365 DAYS

У меня для тебя есть маленький подарок ♡

Каждый день ты можешь оставить одно желание — маленькое или совершенно безумное.

Выбери категорию, напиши желание и запечатай его. После этого оно отправится мне, а тебе останется только ждать его исполнения ✨`;

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "♡ ОТКРЫТЬ WISH NOTE",
                  web_app: {
                    url: "https://wish-note-seven.vercel.app"
                  }
                }
              ]
            ]
          }
        })
      }
    );

    const result = await response.json();

    console.log("Telegram response:", result);

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
