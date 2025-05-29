'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigation } from "@/context/NavigationContext";

export function ProfileDropdown() {
  const router = useRouter();
  const user = { name: "Arman Habib", avatar: "/avater-01.webp" };
  // Make useNavigation optional to handle cases when ProfileDropdown is used outside NavigationProvider
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = { activePage: '', setActivePage: (page: string) => {} };
    try {
      const nav = useNavigation();
      if (nav) {
        navigation.activePage = nav.activePage;
        navigation.setActivePage = nav.setActivePage;
      }
    } catch {
      // NavigationProvider not available, use default values
      console.log('Navigation context not available');
    }

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
        <DropdownMenuItem onClick={() => navigation.setActivePage('account')}>
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigation.setActivePage('pricing')}>
          Plans & Pricing
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigation.setActivePage('integrations')}>
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
