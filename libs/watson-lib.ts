import AssistantV2, {
  CreateSessionParams,
  MessageParams,
  MessageResponse,
} from "ibm-watson/assistant/v2";
import { IamAuthenticator } from "ibm-watson/auth";

export class Watson {
  //This class is used to create a Watson assistant, generate a session and send a message.
  //These private variables are only accessible within the class but there are methods available that return them once they have been set.
  //The typings are imported directly from the ibm-watson assistant package
  private assistant: AssistantV2;
  private sessionId: string;
  private messageResponse: MessageResponse;
  //The createAssitant method creates a new watson assistant.
  public createAssistant(): Watson {
    this.assistant = new AssistantV2({
      version: process.env.watsonVersion,
      authenticator: new IamAuthenticator({
        apikey: process.env.watsonApiKey || "",
      }),
      serviceUrl: process.env.watsonUrl,
    });
    return this;
  }
  //The createSession method is only used to create the initial session, once created the sessionId is retained for future requests.
  public createSession(): string {
    const params: CreateSessionParams = {
      assistantId: process.env.watsonAssistantId || "",
    };
    this.assistant.createSession(params).then((result) => {
      this.sessionId = result.result.session_id;
    });
    return this.sessionId;
  }
  //The sendMessage method takes two parameters and returns a message response
  public sendMessage(message: string, sessionId: string): MessageResponse {
    const params: MessageParams = {
      assistantId: process.env.watsonAssistantId || "",
      sessionId,
      input: {
        message_type: "text",
        text: message,
      },
    };
    this.assistant.message(params).then((response) => {
      this.messageResponse = response.result;
    });
    return this.messageResponse;
  }
}

// export const createAssistant = () => {
//   const assistant = new AssistantV2({
//     version: process.env.watsonVersion,
//     authenticator: new IamAuthenticator({
//       apikey: process.env.watsonApiKey || "",
//     }),
//     serviceUrl: process.env.watsonUrl,
//   });
//   return assistant;
// };

// export const getSession = async (assistant) => {
//   const result = await assistant.createSession({
//     assistantId: process.env.watsonAssistantId || "",
//   });
//   const {
//     result: { session_id },
//   } = result;
//   return session_id;
// };

// export const sendMessage = async (
//   assistant,
//   sessionId,
//   message
// ) => {
//   const response = await assistant.message({
//     assistantId: process.env.watsonAssistantId || "",
//     sessionId,
//     input: {
//       message_type: "text",
//       text: message,
//     },
//   });
//   return response;
// };
