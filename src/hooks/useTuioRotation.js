import { useEffect, useRef, useState } from 'react';
import socket from '../services/largeScreenNav';

/**
 * Hook for continuous TUIO rotation tracking.
 *
 * Unlike `useTuio` (which ignores non-new events), this hook listens to
 * EVERY `tuio:object` event so it can track angle changes in real time.
 *
 * @param {object} options
 * @param {number|null} options.triggerTagId - Only track objects with this symbol ID (null = any)
 * @returns {{ isObjectPresent: boolean, angle: number, symbolId: number|null }}
 */
export default function useTuioRotation({ triggerTagId = null } = {}) {
  const [isObjectPresent, setIsObjectPresent] = useState(false);
  const [angle, setAngle] = useState(0);
  const [symbolId, setSymbolId] = useState(null);

  // Track session IDs for matching objects
  const sessionsRef = useRef(new Map()); // sessionId → { symbolId, angle }

  useEffect(() => {
    const handleObject = (data) => {
      const matches = triggerTagId === null || data.symbolId === triggerTagId;
      if (!matches) return;

      sessionsRef.current.set(data.sessionId, {
        symbolId: data.symbolId,
        angle: data.angle,
      });

      setIsObjectPresent(true);
      setAngle(data.angle);
      setSymbolId(data.symbolId);
    };

    const handleRemove = (data) => {
      const matches = triggerTagId === null || data.symbolId === triggerTagId;
      if (!matches) return;

      sessionsRef.current.delete(data.sessionId);

      const remaining = Array.from(sessionsRef.current.values()).filter(
        (o) => triggerTagId === null || o.symbolId === triggerTagId
      );

      if (remaining.length === 0) {
        setIsObjectPresent(false);
        setAngle(0);
        setSymbolId(null);
      } else {
        // Still have a matching object — use the latest one's angle
        const last = remaining[remaining.length - 1];
        setAngle(last.angle);
        setSymbolId(last.symbolId);
      }
    };

    const handleAlive = (aliveIds) => {
      let changed = false;
      for (const sid of sessionsRef.current.keys()) {
        if (!aliveIds.includes(Number(sid))) {
          sessionsRef.current.delete(sid);
          changed = true;
        }
      }

      if (changed) {
        const remaining = Array.from(sessionsRef.current.values()).filter(
          (o) => triggerTagId === null || o.symbolId === triggerTagId
        );

        if (remaining.length === 0) {
          setIsObjectPresent(false);
          setAngle(0);
          setSymbolId(null);
        }
      }
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

  return { isObjectPresent, angle, symbolId };
}
