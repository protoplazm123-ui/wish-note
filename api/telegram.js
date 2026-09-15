api/telegram.js
module.exports = async (req, res) => {

  if (req.method !== "POST") {
    res.status(200).send("OK");
    return;
  }

  const BOT_TOKEN = "8670862634:AAEgUL82bpG7b6oY_xAKKlBpD0ubguZKyts";
  const WEBAPP_URL = "https://wish-note-seven.vercel.app/";

  const update = req.body;
  const message = update.message;

  if (message && message.text && message.text.startsWith("/start")) {

    const chatId = message.chat.id;

    const welcomeText =
      "У меня для тебя есть маленький подарок ♡\n\n" +
      "Каждый день ты можешь оставить одно желание — маленькое или совершенно безумное.\n\n" +
      "Выбери категорию, напиши желание и запечатай его. После этого оно отправится мне, а тебе останется только ждать его исполнения ✨";

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: welcomeText,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "♡ ОТКРЫТЬ WISH NOTE",
                web_app: { url: WEBAPP_URL }
              }
            ]
          ]
        }
      })
    });

  }

  res.status(200).send("OK");

};

