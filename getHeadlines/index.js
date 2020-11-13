import datadogWrapper from "../lib/tracer";
import { handlerWrapper } from "../lib/lambda";

const datadogKey = process.env.DATADOG_KEY;
const level = process.env.LOG_LEVEL || "debug";
const env = process.env.NODE_ENV || "sandbox";
const config = {
  fakeConfig: true,
  env
};

export const handler = datadogWrapper((params, lambdaContext) =>
  handlerWrapper(
    logger => {
      const {
        queryStringParameters,
        pathParameters: { application, token }
      } = params;

      const fakeData = {
        test: "it work ?"
      };

      return {
        statusCode: 200,
        body: JSON.stringify(fakeData)
      };
    },
    lambdaContext,
    params,
    config
  )
);
