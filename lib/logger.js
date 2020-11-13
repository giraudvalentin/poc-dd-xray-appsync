const createPinoLogger = require("./pinoLogger");

const removeEmpty = obj => {
  return Object.keys(obj)
    .filter(k => obj[k] !== "") // Remove undef. and null.
    .reduce(
      (newObj, k) => {
        if (typeof obj[k] === "object") {
          const obj = newObj;
          obj[k] = removeEmpty(obj[k]);

          return obj;
        } else {
          const obj = newObj;
          obj[k] = obj[k];

          return obj;
        }
      }, // Copy value.
      {}
    );
};

const serializers = {
  err: function asErrValue(error) {
    let body, statusCode, url;
    const { response, message, stack, name, options } = error;

    const method = options && options.method;

    if (response) {
      url = response.url;
      body = response.body;
      statusCode = response.statusCode;
    }

    return {
      name,
      message,
      method,
      stack,
      response: {
        url,
        body,
        status_code: statusCode
      }
    };
  }
};

const datadogKey = process.env.DATADOG_KEY;
const level = process.env.LOG_LEVEL || "debug";
const env = process.env.NODE_ENV || "sandbox";
const config = {
  fakeConfig: true,
  env
};

const options = {
  ignorePretty: ["lambda", "config"],
  datadogKey,
  serializers
};

const logger = createPinoLogger(env, level, options);

const loggerWithConfig = logger.child({ config: removeEmpty(config) });

export default loggerWithConfig;
