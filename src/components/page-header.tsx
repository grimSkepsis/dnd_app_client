"use client";

import { ModeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


import { MainNav } from "./main-nav";

export function PageHeader() {
  return (
    <div className="flex items-center justify-between p-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <MainNav />

      <ModeToggle />
    </div>
  );
}
