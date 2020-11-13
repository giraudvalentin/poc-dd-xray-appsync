const tracer = require("dd-trace").init();
const { datadog } = require("datadog-lambda-js");

import logger from "./logger";

const datadogKey = process.env.DATADOG_KEY;
const level = process.env.LOG_LEVEL || "debug";

const messageToObject = stringMessage => {
  const object = JSON.parse(stringMessage);

  const message = object.message;
  const metadata = object.metadata;

  return [metadata, message];
};

tracer.init({
  logInjection: true,
  debug: true,
  logger,
  logLevel: level === "debug" ? "debug" : "error",
  experimental: {
    exporter: env === "development" ? "agent" : "log"
  }
});

export default function datadogWrapper(handler) {
  return datadog(handler, {
    apiKey: datadogKey,
    injectLogContext: false,
    autoPatchHTTP: false,
    mergeDatadogXrayTraces: true,
    logger: {
      debug: message => logger.debug(...messageToObject(message)),
      error: message => logger.error(...messageToObject(message))
    },
    debugLogging: level === "debug"
  });
}
