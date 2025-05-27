'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ProfileDropdown() {
  const router = useRouter();
  const user = { name: "Arman Habib", avatar: "/avatar-placeholder.svg" };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
          <Avatar className="">
            <AvatarImage
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/account')}>
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/plans')}>
          Plans & Pricing
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/integrations')}>
          Integrations
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/cookie-preferences')}>
          Cookie Preferences
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/help')}>
          Help & Support
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/legal')}>
          Legal & Privacy
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/login')}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
