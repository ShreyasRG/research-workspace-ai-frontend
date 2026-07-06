import { MOCK_LATENCY } from '../constants';

export function delay<T>(value: T, latencyMs?: number): Promise<T> {
  const latency =
    latencyMs ?? Math.random() * (MOCK_LATENCY.max - MOCK_LATENCY.min) + MOCK_LATENCY.min;
  return new Promise((resolve) => setTimeout(() => resolve(value), latency));
}

export function delayReject<T = never>(error: Error, latencyMs?: number): Promise<T> {
  const latency =
    latencyMs ?? Math.random() * (MOCK_LATENCY.max - MOCK_LATENCY.min) + MOCK_LATENCY.min;
  return new Promise((_, reject) => setTimeout(() => reject(error), latency));
}
