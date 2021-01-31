import { createAssistant, getSession, sendMessage } from "../libs/watson-lib";
import { getSentiment } from "../libs/comprehend-lib";
import handler from "../libs/handler-lib";

export const main = handler(async (event, context) => {
  try {
    const { message, sessionId } = JSON.parse(event.body);
    const assistant = createAssistant();

    let session = sessionId;
    if (!sessionId) {
      session = await getSession(assistant);
    }
    const response = await sendMessage(assistant, session, message);
    const {
      result: {
        output: { generic },
      },
    } = response;
    const text = generic[0].text;
    const sentimentResponse = await getSentiment(message);

    const { Sentiment } = sentimentResponse;
    return {
      text,
      session,
      Sentiment,
    };
  } catch (e) {
    return e;
  }
});
