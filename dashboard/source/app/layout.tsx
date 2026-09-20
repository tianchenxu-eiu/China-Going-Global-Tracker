import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'China Going Global · ODI Intelligence',
  description: 'Interactive monthly trends and global project map based on ODI Tracker v5.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
