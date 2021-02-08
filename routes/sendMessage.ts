import { Watson } from "../libs/watson-lib";
import { getSentiment } from "../libs/comprehend-lib";
import handler from "../libs/handler-lib";
import { putItem } from "../helpers/putItem";

export const main = handler(async (event, context) => {
  const watson = new Watson();
  const { message, sessionId } = JSON.parse(event.body);
  const assistant = watson.createAssistant();
  const userId = event.requestContext.identity.cognitoIdentityId;
  let session = sessionId;
  if (!sessionId) {
    session = assistant.createSession();
  }
  const response = assistant.sendMessage(message, session);
  const {
    output: { generic },
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
