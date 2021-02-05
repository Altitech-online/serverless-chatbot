import dynamoDb from "../libs/dynamodb-lib";

export const fetchItems = async (event) => {
    const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": event.requestContext.identity.cognitoIdentityId,
        },
    };

    const result = await dynamoDb.query(params);
    return result;
};