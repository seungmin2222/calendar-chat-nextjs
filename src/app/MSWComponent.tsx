'use client';

import { useEffect, useState } from 'react';

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const setupMock = async () => {
      if (typeof window === 'undefined') {
        return;
      }

      if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') {
        setMswReady(true);
        return;
      }

      try {
        const { initMsw } = await import('@/mocks/browser');
        await initMsw();
        setMswReady(true);
      } catch (error) {
        console.error('Failed to initialize MSW:', error);
        setMswReady(true);
      }
    };

    setupMock();
  }, []);

  if (!mswReady) {
    return null;
  }

  return <>{children}</>;
};
