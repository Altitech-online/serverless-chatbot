To run mocks use command 


serverless invoke local --function sendMessage --path mocks/sendMessage-event.json
serverless invoke local --function fetchMood --path mocks/fetchMood-event.json
serverless deploy

--aws-profile p4fAccount
 