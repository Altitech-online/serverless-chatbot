import {
  ComprehendClient,
  DetectSentimentCommand,
  DetectSentimentCommandOutput,
  DetectSentimentRequest,
} from "@aws-sdk/client-comprehend";

export const getSentiment = async (
  message: string
): Promise<DetectSentimentCommandOutput> => {
  //This function provides only a single functionality. It takes a message and returns a sentiment reponse
  const client: ComprehendClient = new ComprehendClient({
    region: "eu-west-2",
  });
  const params: DetectSentimentRequest = {
    LanguageCode: "en",
    Text: message,
  };
  const command = new DetectSentimentCommand(params);
  const result: DetectSentimentCommandOutput = await client.send(command);
  return result;
};
