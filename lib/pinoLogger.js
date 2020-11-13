function createPinoLogger(environment, level = "info", options = {}) {
  const isDebugEnv = ["development", "test"].includes(environment);
  const { datadogKey, ignorePretty = [], serializers = {} } = options;
  const pino = require("pino");
  const loggerBaseOptions = {
    level,
    useLevelLabels: true,
    timestamp: isDebugEnv,
    messageKey: "message",
    serializers
  };
  if (datadogKey) {
    const stream = require("pino-datadog").createWriteStreamSync({
      apiKey: datadogKey
    });

    const obj = loggerBaseOptions;
    obj.messageKey = "msg";
    obj.useLevelLabels = false;

    return pino(obj, stream);
  }
  if (isDebugEnv) {
    const obj = loggerBaseOptions;
    obj.base = null;
    obj.prettyPrint = {
      levelFirst: true,
      colorize: true,
      translateTime: true,
      ignore: ignorePretty.join(",")
    };

    const logger = pino(obj);
    return require("pino-caller")(logger);
  }

  const obj = loggerBaseOptions;
  obj.base = null;
  return pino(obj);
}
exports.createPinoLogger = createPinoLogger;
