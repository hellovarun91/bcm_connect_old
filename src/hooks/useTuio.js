import { useEffect, useRef, useState } from 'react';
import socket from '../services/largeScreenNav';

/**
 * Hook for receiving TUIO object recognition events via Socket.IO.
 *
 * @param {object} options
 * @param {number|null} options.triggerTagId - Only fire onObjectPlaced for this tag ID (null = any)
 * @param {function} options.onObjectPlaced - Called when a matching tag is first placed on the table
 * @param {function} options.onObjectRemoved - Called when a matching tag is removed
 * @returns {{ objects: object, isObjectPresent: boolean }}
 */
export default function useTuio({ triggerTagId = null, onObjectPlaced, onObjectRemoved } = {}) {
  const [objects, setObjects] = useState({});
  const [isObjectPresent, setIsObjectPresent] = useState(false);
  const onPlacedRef = useRef(onObjectPlaced);
  const onRemovedRef = useRef(onObjectRemoved);

  // Keep callback refs current without re-subscribing
  useEffect(() => { onPlacedRef.current = onObjectPlaced; }, [onObjectPlaced]);
  useEffect(() => { onRemovedRef.current = onObjectRemoved; }, [onObjectRemoved]);

  useEffect(() => {
    const handleObject = (data) => {
      if (!data.isNew) return; // Only react to first detection

      const matches = triggerTagId === null || data.symbolId === triggerTagId;
      if (matches) {
        setIsObjectPresent(true);
        setObjects((prev) => ({ ...prev, [data.sessionId]: data }));
        onPlacedRef.current?.(data);
      }
    };

    const handleRemove = (data) => {
      const matches = triggerTagId === null || data.symbolId === triggerTagId;
      if (matches) {
        setObjects((prev) => {
          const next = { ...prev };
          delete next[data.sessionId];
          const stillPresent = Object.values(next).some(
            (o) => triggerTagId === null || o.symbolId === triggerTagId
          );
          setIsObjectPresent(stillPresent);
          return next;
        });
        onRemovedRef.current?.(data);
      }
    };

    const handleAlive = (aliveIds) => {
      setObjects((prev) => {
        const next = {};
        for (const sid of Object.keys(prev)) {
          if (aliveIds.includes(Number(sid))) {
            next[sid] = prev[sid];
          }
        }
        const stillPresent = Object.values(next).some(
          (o) => triggerTagId === null || o.symbolId === triggerTagId
        );
        setIsObjectPresent(stillPresent);
        return next;
      });
    };

    socket.on('tuio:object', handleObject);
    socket.on('tuio:remove', handleRemove);
    socket.on('tuio:alive', handleAlive);

    return () => {
      socket.off('tuio:object', handleObject);
      socket.off('tuio:remove', handleRemove);
      socket.off('tuio:alive', handleAlive);
    };
  }, [triggerTagId]);

  return { objects, isObjectPresent };
}
