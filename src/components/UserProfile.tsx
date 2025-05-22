import React from 'react';
import Image from 'next/image';

export const UserProfile = () => {
  const user = { name: "Arman Habib", avatar: "/avatar-placeholder.svg" };

  return (
    <div className="flex items-center gap-2 cursor-pointer group">
      <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 transition-colors">
        <Image 
          src={user.avatar} 
          alt={user.name}
          width={36}
          height={36}
          className="object-cover"
        />
      </div>
      <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {user.name}
      </p>
    </div>
  );
};