"use client";
import { useEffect } from 'react';

export default function ClientHtmlClassManager({ dark }: { dark: boolean }) {
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);
  return null;
}
