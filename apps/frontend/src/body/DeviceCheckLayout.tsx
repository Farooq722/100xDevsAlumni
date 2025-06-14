import { ReactNode, useEffect, useState } from "react";

interface DeviceCheckLayoutProps {
  children: ReactNode;
}

export const DeviceCheckLayout = ({ children }: DeviceCheckLayoutProps) => {
  const [showWarning, setShowWarning] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // Tailwind's md breakpoint
    if (isMobile) {
      setShowWarning(true);
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 3000); // Show warning for 3 seconds
      return () => clearTimeout(timer);
    } else {
      setIsReady(true); // immediately render
    }
  }, []);

  if (!isReady && showWarning) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4 bg-gradient-to-tl from-teal-200 via-purple-200 to-pink-200 text-black">
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-md mx-auto animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4">
            Better Experence on Laptop
          </h2>
          <p className="text-gray-600">
            This site is best viewed on a laptop or desktop.
          </p>
          <p className="text-sm text-gray-500 mt-4">Continuing shortly...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
