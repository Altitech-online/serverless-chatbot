"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watson = void 0;
var v2_1 = __importDefault(require("ibm-watson/assistant/v2"));
var auth_1 = require("ibm-watson/auth");
var Watson = /** @class */ (function () {
    function Watson() {
    }
    Watson.prototype.createAssistant = function () {
        this.assistant = new v2_1.default({
            version: process.env.watsonVersion,
            authenticator: new auth_1.IamAuthenticator({
                apikey: process.env.watsonApiKey || "",
            }),
            serviceUrl: process.env.watsonUrl,
        });
        return this;
    };
    Watson.prototype.createSession = function () {
        var _this = this;
        var params = {
            assistantId: process.env.watsonAssistantId || "",
        };
        this.assistant.createSession(params).then(function (result) {
            _this.sessionId = result.result.session_id;
        });
        return this.sessionId;
    };
    Watson.prototype.sendMessage = function (message, sessionId) {
        var _this = this;
        var params = {
            assistantId: process.env.watsonAssistantId || "",
            sessionId: sessionId,
            input: {
                message_type: "text",
                text: message,
            },
        };
        this.assistant.message(params).then(function (response) {
            _this.messageResponse = response.result;
        });
        return this.messageResponse;
    };
    return Watson;
}());
exports.Watson = Watson;
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
//# sourceMappingURL=watson-lib.js.map