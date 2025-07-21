"use client";
import { Textarea } from "@/components/ui/textarea";
import { Log } from "./actions";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

export default function TerminalChat() {
  const [state, formAction, isPending] = useActionState(Log, null);
  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 w-1/2 mx-auto mt-10"
    >
      <h1 className="text-4xl font-bold">Log to the terminal</h1>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      <Textarea name="message" />

      {state?.chunks &&
        state.chunks.map((chunk: any, idx: number) => (
          <p key={chunk + idx}>{chunk}</p>
        ))}
      <Button disabled={isPending}>{isPending ? "Sending..." : "Send"}</Button>
    </form>
  );
}
