import AssistantV2, {
  CreateSessionParams,
  MessageParams,
  MessageResponse,
} from "ibm-watson/assistant/v2";
import { IamAuthenticator } from "ibm-watson/auth";

export class Watson {
  private assistant: AssistantV2;
  public sessionId: string;
  public messageResponse: MessageResponse;
  
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

  public createSession(): string {
    const params: CreateSessionParams = {
      assistantId: process.env.watsonAssistantId || "",
    };
    this.assistant.createSession(params).then((result) => {
      this.sessionId = result.result.session_id;
    });
    return this.sessionId;
  }

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

// export const createAssistant = (): AssistantV2 => {
//   const assistant: AssistantV2 = new AssistantV2({
//     version: process.env.watsonVersion,
//     authenticator: new IamAuthenticator({
//       apikey: process.env.watsonApiKey || "",
//     }),
//     serviceUrl: process.env.watsonUrl,
//   });
//   return assistant;
// };

// export const getSession = async (assistant: AssistantV2): Promise<string> => {
//   const result = await assistant.createSession({
//     assistantId: process.env.watsonAssistantId || "",
//   });
//   const {
//     result: { session_id },
//   } = result;
//   return session_id;
// };

// export const sendMessage = async (
//   assistant: AssistantV2,
//   sessionId: string,
//   message: string
// ): Promise<MessageResponse> => {
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
