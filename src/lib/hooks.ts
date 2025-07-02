import { useCallback, useRef } from 'react';

/**
 * 防抖 Hook - 防止函数被频繁调用
 * @param callback 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function useDebounce<T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  return useCallback(
    ((...args: Parameters<T>) => {
      // 清除之前的定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 设置新的定时器
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
}

/**
 * 节流 Hook - 限制函数在一定时间内的执行频率
 * @param callback 要节流的函数
 * @param delay 节流间隔时间（毫秒）
 * @returns 节流后的函数
 */
export function useThrottle<T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastRan = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = now;
      } else {
        // 清除之前的延迟执行
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // 设置延迟执行
        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRan.current = Date.now();
        }, delay - (now - lastRan.current));
      }
    }) as T,
    [callback, delay]
  );
}