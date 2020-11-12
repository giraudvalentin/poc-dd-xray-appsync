import "babel-polyfill";
import { OAuth2 } from "oauth";

exports.graphqlHandler = (event, context, callback) => {
  console.log("Received event {}", JSON.stringify(event, 3));

  const consumerKey = event.arguments.consumer_key;
  const consumerSecret = event.arguments.consumer_secret;

  console.log("Got an Invoke Request.");
  switch (event.field) {
    default: {
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
    }
  }
};
