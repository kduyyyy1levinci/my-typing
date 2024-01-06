import { useEffect, useState, useRef, useCallback } from 'react';

export const useCountdown = (initialValue: number, interval = 1000) => {
    const intervalRef = useRef<NodeJS.Timer | null>(null);
    const [countdown, setCountdown] = useState(initialValue);

    const startCountdown = useCallback(() => {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev > 0) {
                    return prev - interval;
                }
                if (prev === 0) clearInterval(intervalRef.current as NodeJS.Timeout);

                return prev;
            });
        }, interval);
    }, [interval]);

    const resetCountdown = useCallback(() => {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        intervalRef.current = null;
        setCountdown(initialValue);
    }, [initialValue]);

    useEffect(() => {
        return () => clearInterval(intervalRef.current as NodeJS.Timeout);
    }, [interval]);

    return { countdown, startCountdown, resetCountdown };
};
