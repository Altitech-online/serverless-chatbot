import { createAssistant, getSession, sendMessage } from "../libs/watson-lib";
import { getSentiment } from "../libs/comprehend-lib";

export const main = async (request) => {
  const {
    body: { message, sessionId },
  } = request;
  const assistant = await createAssistant();

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
};
