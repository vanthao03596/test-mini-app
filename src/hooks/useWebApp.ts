import { useState } from "react";

const useWebApp = () => {
  const [isReady, setIsReady] = useState(false);

  const ready: typeof Telegram.WebApp.ready = () => {
    Telegram.WebApp.ready();
    setTimeout(() => {
      setIsReady(true);
    }, 500)
  };

  const enableClosingConfirmation = () => {
    Telegram.WebApp.enableClosingConfirmation();
  }
  return {
    ready,
    isReady,
    enableClosingConfirmation
  };
};

export default useWebApp;
