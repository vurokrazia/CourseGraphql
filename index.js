"use stric";
const { graphql, buildSchema } = require("graphql");
const express = require("express");
const gqlMiddleware = require("express-graphql");
const { readFileSync } = require("fs");
const { join } = require("path");

const app = express();
const port = process.env.port || 3000;
// define schema
const schema = buildSchema(
  readFileSync(join(__dirname, "lib", "schema.graphql"), "utf-8")
);
const resolvers = {
  hello: () => {
    return "Hola Mundo";
  }
};
// graphql(schema, "{hello}", resolvers).then(data => console.log(data));
app.use(
  "/api",
  gqlMiddleware({ schema: schema, rootValue: resolvers, graphiql: true })
);
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`);
});
