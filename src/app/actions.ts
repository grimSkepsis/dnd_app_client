"use server";
export async function Log(prevState: any, formData: FormData) {
  const message = formData.get("message");
  console.log(message);
  const prevMessages = prevState?.messages ? [...prevState.messages] : [];
  return { messages: [...prevMessages, message] };
}
