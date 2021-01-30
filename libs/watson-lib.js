import AssistantV2 from "ibm-watson/assistant/v2";
import { IamAuthenticator } from "ibm-watson/auth";

export const createAssistant = () => {
  try {
    const assistant = new AssistantV2({
      version: process.env.watsonVersion,
      authenticator: new IamAuthenticator({
        apikey: process.env.watsonApiKey,
      }),
      serviceUrl: process.env.watsonUrl,
    });
    return assistant;
  } catch (e) {
    return e;
  }
};

export const getSession = async (assistant) => {
  try {
    const result = await assistant.createSession({
      assistantId: process.env.watsonAssistantId,
    });
    const {
      result: { session_id: sessionId },
    } = result;
    return sessionId;
  } catch (e) {
    return e;
  }
};

export const sendMessage = async (assistant, sessionId, message) => {
  try {
    const response = await assistant.message({
      assistantId: process.env.watsonAssistantId,
      sessionId,
      input: {
        message_type: "text",
        message,
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};
