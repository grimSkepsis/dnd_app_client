"use server";
import { ChatToAgent } from "./lib";

export async function Log(prevState: any, formData: FormData) {
  const message = formData.get("message");
  if (typeof message !== "string")
    return { messages: [], error: "Message is not a string" };

  const chunks = await ChatToAgent(message);
  const lastChunk = chunks.slice(-1)[0];
  return {
    // chunks: chunks.map((chunk: any) => JSON.stringify(chunk)),
    chunks: lastChunk.data.messages.map((m: any) => m.content),
  };
}
