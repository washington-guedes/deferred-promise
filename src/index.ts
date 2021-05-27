export function deferredPromise<T>(timeout?: number, onTimeoutResolveValue?: T) {
  const deferred = {
    promise: null as Promise<T>,
    isResolved: false,
    resolve: null as (value: T | PromiseLike<T>) => void,
    reject: null as (reason?: any) => void,
  };

  deferred.promise = new Promise<T>((_resolve, _reject) => {
    deferred.resolve = (value) => {
      deferred.isResolved = true;
      _resolve(value);
    };
    deferred.reject = _reject;
  });

  if (typeof timeout === 'number') {
    window.setTimeout(() => {
      deferred.resolve(onTimeoutResolveValue);
    }, timeout);
  }

  return deferred;
}
