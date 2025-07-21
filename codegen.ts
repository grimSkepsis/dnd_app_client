import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ quiet: true });

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/gql/": {
      preset: "client",
      config: {
        maybeValue: "T | undefined",
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
