import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [], // Ensure this is defined even if empty
      config: {
        maybeValue: "T | undefined",
      },
    },
  },
};

export default config;
