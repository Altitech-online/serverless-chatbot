import { createAssistant, getSession, sendMessage } from "../libs/watson-lib";
import { getSentiment } from "../libs/comprehend-lib";
import handler from "../libs/handler-lib";
import { putItem } from "../helpers/putItem";

export const main = handler(async (event, context) => {
  const { message, sessionId } = JSON.parse(event.body);
  const assistant = createAssistant();
  const userId = event.requestContext.identity.cognitoIdentityId;
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
  const sentimentResponse = await getSentiment(message);

  const { Sentiment } = sentimentResponse;
  await putItem(userId, message, Sentiment);
  return {
    generic,
    session,
    Sentiment,
  };
});
