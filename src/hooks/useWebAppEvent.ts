import { useEffect } from "react";

const useWebAppEvent: typeof Telegram.WebApp.onEvent = (
  eventType,
  eventHandler
) => {
  useEffect(() => {
    Telegram.WebApp.onEvent(
      ...([eventType, eventHandler] as Parameters<
        typeof Telegram.WebApp.onEvent
      >)
    );

    return () => {
      Telegram.WebApp.offEvent(
        ...([eventType, eventHandler] as Parameters<
          typeof Telegram.WebApp.offEvent
        >)
      );
    };
  }, [eventType, eventHandler]);
};

export default useWebAppEvent;
