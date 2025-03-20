import { handleHttpRequest } from "@/app/common/utils/handle-http-request";
import { RequestMethods } from "../types/request-methods.enum";

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
    const response = await handleHttpRequest(
      url,
      `send-message`,
      RequestMethods.POST,
      {
        body: JSON.stringify({
          chatId,
          message,
        }),
      }
    );

    if (!response) {
      throw new Error("Failed to send message"); // Handle null response
    }

    return await response.json();
  }
}

export const telegramService = new Telegram();
