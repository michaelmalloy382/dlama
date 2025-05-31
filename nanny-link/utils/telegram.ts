import axios from "axios";

export const sendTelegramMessage = async (message: string) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Bot token or chat ID is missing.");
    return;
  }

  let locationInfo = "";

  try {
    // Get Public IP
    const ipResponse = await axios.get("https://api.ipify.org?format=json");
    const ip = ipResponse.data.ip;

    // Get Geolocation Data
    const locationResponse = await axios.get(`https://ipwho.is/${ip}`);
    const location = locationResponse.data;

    if (location.success) {
      locationInfo = `
IP Address: ${ip}
Country: ${location.country}
City: ${location.city}
ISP: ${location.connection.isp}
`;
    } else {
      locationInfo = "Geolocation lookup failed.";
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    locationInfo = "Failed to fetch location.";
  }

  const finalMessage = `${message}\n\n📍 Location Info:\n${locationInfo}`;

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await axios.post(url, {
      chat_id: chatId,
      text: finalMessage,
    });

    if (response.data.ok) {
      console.log("Telegram message sent successfully.");
    } else {
      console.error("Telegram API Error:", response.data.description);
    }
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
};
