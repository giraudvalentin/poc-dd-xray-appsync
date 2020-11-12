import "babel-polyfill";
import { OAuth2 } from "oauth";
import { getTraceHeaders } from "datadog-lambda-js";

var AWSXRay = require("aws-xray-sdk-core");
AWSXRay.captureHTTPsGlobal(require("http"));
var http = require("http");

exports.graphqlHandler = async (event, context, callback) => {
  console.log("Received event {}", JSON.stringify(event, 3));

  const consumerKey = event.arguments.consumer_key;
  const consumerSecret = event.arguments.consumer_secret;

  const body = `query MyQuery {
    fluxMsnBfmtv {
      body
      body_nbchar
      chapo
      id
    }
  }`;

  await fetch(
    "https://iw2ocpdxobav7mrqcpthiu7vry.appsync-api.eu-west-1.amazonaws.com/graphql",
    {
      method: "POST",
      body,
      headers: {
        "x-api-key": "da2-yq2u6yqjvffsjmw4t6kjuy6sp4"
      },
      credentials: "same-origin"
    }
  ).then(
    function(response) {
      response.status; //=> number 100–599
      response.statusText; //=> String
      response.headers; //=> Headers
      response.url; //=> String

      console.log("response", response);

      return response.text();
    },
    function(error) {
      console.log("error", error);

      error.message; //=> String
    }
  );

  if (!options.headers) {
    options.headers = {};
  }

  options.headers = options.headers;
  // options.headers = // { ...options.headers, ...getTraceHeaders() };
  console.log("getTraceHeaders ", getTraceHeaders());

  // const awsConfig = config.get('provider.aws')
  // eslint-disable-next-line @typescript-eslint/no-var-requires

  console.log("FINISH ?");

  console.log("Got an Invoke Request.");
  switch (event.field) {
    default: {
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
    }
  }
};
