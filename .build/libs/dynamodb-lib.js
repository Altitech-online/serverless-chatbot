"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var client = new aws_sdk_1.default.DynamoDB.DocumentClient();
exports.default = {
    get: function (params) { return client.get(params).promise(); },
    put: function (params) { return client.put(params).promise(); },
    query: function (params) { return client.query(params).promise(); },
    update: function (params) { return client.update(params).promise(); },
    delete: function (params) { return client.delete(params).promise(); },
    scan: function (params) { return client.scan(params).promise(); },
};
//# sourceMappingURL=dynamodb-lib.js.map