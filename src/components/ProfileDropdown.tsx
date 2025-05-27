'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function ProfileDropdown() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
          A
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
