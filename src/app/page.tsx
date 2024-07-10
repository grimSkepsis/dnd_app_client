import Image from "next/image";
import { getClient } from "@/lib/client";

export const revalidate = 5;

export default async function Home() {
  return <main>test text</main>;
}
