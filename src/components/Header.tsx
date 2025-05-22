import Link from 'next/link';
import { UserProfile } from './UserProfile';

export const Header = () => {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-bold">
          WEPRESENT
        </Link>
        <nav className="flex gap-6">
          <Link href="/transfers">Transfers</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/branding">Branding</Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/upgrade" className="text-purple-600 font-medium">
          Upgrade
        </Link>
        <UserProfile />
      </div>
    </header>
  );
};