import {
  ComprehendClient,
  DetectSentimentCommand,
  DetectKeyPhrasesCommand,
  DetectEntitiesCommand,
} from "@aws-sdk/client-comprehend";

const client = new ComprehendClient({ region: "eu-west-2" });

export default {
  getKeyPhrases: async (message) => {
    const command = new DetectKeyPhrasesCommand({
      LanguageCode: "en",
      Text: message,
    });
    const result = await client.send(command);
    return result;
  },
  getSentiment: async (message) => {
    const command = new DetectSentimentCommand({
      LanguageCode: "en",
      Text: message,
    });
    const result = await client.send(command);
    return result;
  },
  getEntities: async (message) => {
    const command = new DetectEntitiesCommand({
      LanguageCode: "en",
      Text: message,
    });
    const result = await client.send(command);
    return result;
  },
};