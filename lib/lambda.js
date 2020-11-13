import { Logger } from "pino";

import lambdaLogger from "./logger";

export async function handlerWrapper(
  handler,
  lambdaContext,
  lambdaValues,
  config
) {
  const [environment, application = "demo"] = config.env.split("-");

  const {
    path,
    queryStringParameters,
    pathParameters,
    headers,
    requestContext: { identity }
  } = lambdaValues;

  const {
    memoryLimitInMB,
    execution,
    functionName,
    functionVersion,
    awsRequestId
  } = lambdaContext;

  const logger: Logger = lambdaLogger.child({
    service: "lambda",
    source: "lambda",
    lambda: {
      environment,
      application: `cleo-${application}`,
      service: "poc-dd-xray",
      execution_id: execution && execution.id,
      request_id: awsRequestId,
      function_name: functionName,
      function_version: functionVersion,
      function_memory_size: memoryLimitInMB,
      path,
      pathParameters,
      host: headers && headers.host ? headers.host : null,
      params: queryStringParameters,
      ip: identity && identity.sourceIp ? identity.sourceIp : null,
      userAgent: identity && identity.userAgent ? identity.userAgent : null
    },
    xray: {
      TraceId:
        headers && headers["X-Amzn-Trace-Id"]
          ? headers["X-Amzn-Trace-Id"].replace("Root=", "")
          : null
    }
  });

  logger.debug(`Lambda '${functionName}' démarrée`);

  return handler(logger)
    .catch(e => {
      const { response } = e;
      logger.error(
        { err: e },
        response && response.body ? response.body.message : e.message
      );

      throw e;
    })
    .then(output => {
      const { ...rest } = output;
      logger.debug(
        { output: rest },
        `Lambda '${lambdaContext.functionName}' terminée`
      );

      return output;
    });
}
