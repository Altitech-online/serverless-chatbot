import AssistantV2 from "ibm-watson/assistant/v2";
import { IamAuthenticator } from "ibm-watson/auth";

export const createAssistant = () => {
  const assistant = new AssistantV2({
    version: process.env.watsonVersion,
    authenticator: new IamAuthenticator({
      apikey: process.env.watsonApiKey,
    }),
    serviceUrl: process.env.watsonUrl,
  });
  return assistant;
};

export const getSession = async (assistant) => {
  const result = await assistant.createSession({
    assistantId: process.env.watsonAssistantId,
  });
  const {
    result: { session_id: sessionId },
  } = result;
  return sessionId;
};

export const sendMessage = async (assistant, sessionId, message) => {
  const response = await assistant.message({
    assistantId: process.env.watsonAssistantId,
    sessionId,
    input: {
      message_type: "text",
      text: message,
    },
  });
  return response;
};
