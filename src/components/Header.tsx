import Link from 'next/link';
import { UserProfile } from './UserProfile';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-bold">
          <Image
            src="https://assets.multilat.xyz/branding/logos/multilat-logo.svg" 
            alt="Logo"    
            width={200}
            height={200}
          />
        </Link>
        <nav className="flex gap-6">
          <Link href="/transfers" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Transfers</Link>
          <Link href="/pricing" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Pricing</Link>
          <Link href="/reviews" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Reviews</Link>
          <Link href="/branding" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Branding</Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link href="/upgrade" className="text-purple-600 font-medium dark:text-purple-400">
          Upgrade
        </Link>
        <UserProfile />
      </div>
    </header>
  );
};