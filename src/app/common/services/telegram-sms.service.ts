import { httpRequest } from "@/app/common/utils/http-request";

const url = process.env.NEXT_PUBLIC_TELEGRAM_API_URL;

class Telegram {
  async sendMessage({
    chatId,
    message,
  }: {
    chatId: string;
    message: string;
  }): Promise<{
    chatId: string;
    message: string;
  }> {
    const response = await httpRequest(url, `send-message`, {
      method: "POST",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId,
        message,
      }),
    });

    if (!response) {
      throw new Error("Failed to send message"); // Handle null response
    }

    return await response.json();
  }
}

export const telegramService = new Telegram();
