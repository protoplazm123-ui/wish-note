export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.BOT_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "BOT_TOKEN is not configured" });
  }

  const { message } = req.body;

  if (!message || !message.chat) {
    return res.status(200).json({ ok: true });
  }

  const chatId = message.chat.id;

  const text = `💌 WISH NOTE

365 WISHES · 365 DAYS

У меня для тебя есть маленький подарок ♡

Каждый день ты можешь оставить одно желание — маленькое или совершенно безумное.

Выбери категорию, напиши желание и запечатай его. После этого оно отправится мне, а тебе останется только ждать его исполнения ✨`;

  const keyboard = {
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
  };

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      reply_markup: keyboard
    })
  });

  return res.status(200).json({ ok: true });
}
