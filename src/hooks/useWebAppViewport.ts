import { useState } from "react";
import useWebAppEvent from "./useWebAppEvent";

const useWebAppViewport = () => {
  const [isExpanded, setIsExpanded] = useState(Telegram.WebApp.isExpanded);
  const [viewportHeight, setViewportHeight] = useState(
    Telegram.WebApp.viewportHeight
  );
  const [viewportStableHeight, setViewportStableHeight] = useState(
    Telegram.WebApp.viewportStableHeight
  );

  const expand = () => {
    Telegram.WebApp.expand();
  }

  useWebAppEvent('viewportChanged', ({isStateStable}) => {
    if (isStateStable) {
      setIsExpanded(Telegram.WebApp.isExpanded);
      setViewportHeight(Telegram.WebApp.viewportHeight);
      setViewportStableHeight(Telegram.WebApp.viewportStableHeight);
    }
})

  return {
    expand,
    isExpanded,
    viewportHeight,
    viewportStableHeight,
  };
};

export default useWebAppViewport;
