import dynamoDb from "../libs/dynamodb-lib";

export const putItem = async (userId, message, sentiment) => {
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId,
            timestamp: new Date().toString(),
            message: message,
            sentiment: sentiment
        }
    };

    await dynamoDb.put(params);

    return params.Item;
};