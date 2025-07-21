"use server";
import { Client } from "@langchain/langgraph-sdk";

export async function ChatToAgent(message: string) {
  // The LangGraph SDK automatically points to http://localhost:8123 for local development
  // Make sure you have a LangGraph server running locally with langgraph-cli
  const client = new Client({
    apiUrl: "http://localhost:2024",
  });

  try {
    // List all assistants
    const assistants = await client.assistants.search({
      metadata: null,
      offset: 0,
      limit: 10,
    });

    if (!assistants || assistants.length === 0) {
      console.error(
        "No assistants found. Make sure your LangGraph server is running and has registered assistants."
      );
      throw new Error("No assistants found");
    }

    // We auto-create an assistant for each graph you register in config.
    const agent = assistants[0];
    console.log("Using assistant:", agent);

    // Start a new thread
    const thread = await client.threads.create();
    console.log("Created thread:", thread);

    // Start a streaming run
    const messages = [{ role: "human", content: message }];

    const streamResponse = client.runs.stream(
      thread["thread_id"],
      agent["assistant_id"],
      {
        input: { messages },
      }
    );
    const chunks: any[] = [];

    for await (const chunk of streamResponse) {
      chunks.push(chunk);
    }
    return chunks;
  } catch (error) {
    console.error("Error connecting to LangGraph server:", error);

    if (error instanceof Error && error.message.includes("ECONNREFUSED")) {
      throw new Error(
        "Cannot connect to LangGraph server. " +
          "Make sure your local LangGraph server is running at http://localhost:8123 " +
          "or use LangGraph Cloud for testing."
      );
    }

    throw error;
  }
}
