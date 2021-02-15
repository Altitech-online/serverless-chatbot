import {
  ComprehendClient,
  DetectSentimentCommand,
  DetectKeyPhrasesCommand,
  DetectEntitiesCommand,
} from "@aws-sdk/client-comprehend";

const client = new ComprehendClient({ region: "eu-west-2" });

export const getSentiment = async (message) => {
  const params = {
    LanguageCode: "en",
    Text: message,
  };
  const command = new DetectSentimentCommand(params);
  const result = await client.send(command);
  return result;
};

export const getKeyPhrases = async (message) => {
  const params = {
    LanguageCode: "en",
    Text: message,
  };
  const command = new DetectKeyPhrasesCommand(params);
  const result = await client.send(command);
  return result;
};

export const getEntities = async (message) => {
  const params = {
    LanguageCode: "en",
    Text: message,
  };
  const command = new DetectEntitiesCommand(params);
  const result = await client.send(command);
  return result;
};