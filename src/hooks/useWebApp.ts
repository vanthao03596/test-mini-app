import { useState } from "react";

const useWebApp = () => {
  const [isReady, setIsReady] = useState(false);

  const ready: typeof Telegram.WebApp.ready = () => {
    Telegram.WebApp.ready();
    setIsReady(true);
  };

  return {
    ready,
    isReady,
  };
};

export default useWebApp;
