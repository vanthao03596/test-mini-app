import { useState } from "react";

const useWebAppViewport = () => {
  const [isExpanded, setIsExpanded] = useState(Telegram.WebApp.isExpanded);
  const [viewportHeight, setViewportHeight] = useState(
    Telegram.WebApp.viewportHeight
  );
  const [viewportStableHeight, setViewportStableHeight] = useState(
    Telegram.WebApp.viewportStableHeight
  );

  const [isCompleted, setIsCompleted] = useState(false)

  const expand = () => {
    Telegram.WebApp.expand();
    setIsExpanded(Telegram.WebApp.isExpanded);
    setViewportHeight(Telegram.WebApp.viewportHeight);
    setViewportStableHeight(Telegram.WebApp.viewportStableHeight);
    setTimeout(() => {
      setIsCompleted(true)
    }, 1500)
  }

  return {
    expand,
    isExpanded,
    viewportHeight,
    viewportStableHeight,
    isCompleted
  };
};

export default useWebAppViewport;
