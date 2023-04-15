const ABORT_REQUEST_CONTROLLERS = new Map<string, AbortController>();

export const customFetch = async (
  input: RequestInfo | URL,
  { signalKey, ...rest }: RequestInit & { signalKey: string }
): Promise<Response> => {
  return await fetch(input, {
    ...(signalKey && { signal: abortAndGetSignalSafe(signalKey) }),
    ...rest,
  });
};

export const abortRequestSafe = (key: string, reason = 'ABORTED') => {
  ABORT_REQUEST_CONTROLLERS.get(key)?.abort?.(reason);
};

const abortAndGetSignalSafe = (key: string): AbortSignal => {
  abortRequestSafe(key);
  const newController = new AbortController();
  ABORT_REQUEST_CONTROLLERS.set(key, newController);
  return newController.signal;
};
