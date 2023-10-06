import { useState, useCallback, useEffect } from 'react';
import NotificationManager from '../../utils/NotificationManager';
import { ToasterType } from '../../model/Types';

export function Notification() {
  const [toaster, setToaster] = useState<ToasterType | undefined>(undefined);

  const getToaster = async () => {
    const curToaster = await NotificationManager.get();
    setToaster(curToaster);
  };

  const clearToaster = useCallback(async () => {
    if (toaster === undefined) return;
    await NotificationManager.clear();
    setToaster(undefined);
  }, [toaster]);

  useEffect(() => {
    getToaster();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      clearToaster();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [clearToaster]);

  return {
    toaster,
    showToast: getToaster,
    clearToast: clearToaster,
  };
}
