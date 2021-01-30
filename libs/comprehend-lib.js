import {
  ComprehendClient,
  DetectSentimentCommand,
} from "@aws-sdk/client-comprehend";

export const getSentiment = async (message) => {
  try {
    const client = new ComprehendClient({ region: "eu-west-2" });
    let params = {
      LanguageCode: "en",
      Text: message,
    };
    const command = new DetectSentimentCommand(params);
    const result = await client.send(command);
    return result;
  } catch (e) {
    return e;
  }
};
