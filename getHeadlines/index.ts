export const handler = datadogWrapper((params, lambdaContext) =>
  handlerWrapper(
    async logger => {
      const {
        queryStringParameters,
        pathParameters: { application, token }
      } = params;

      return {
        statusCode: 200,
        body: JSON.stringify(articles)
      };
    },
    lambdaContext,
    params,
    coldStart.config
  )
);
