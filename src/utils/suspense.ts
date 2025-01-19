type Status = "pending" | "fulfilled" | "rejected";

interface Resource<T> {
  read(): T;
}

/**
 * Promiseをラップして React Suspense で使用可能なリソースを作成します。
 * このユーティリティ関数は、データフェッチの結果を Suspense と組み合わせて使用することを想定しています。
 *
 * @template T - Promiseが解決されるデータの型
 * @param promise - ラップするPromiseオブジェクト
 * @returns Suspense互換のリソースオブジェクト
 *
 * @example
 * const photoResource = wrapPromise(getHeaderPhoto("nature"));
 *
 * function Photo() {
 *   const photo = photoResource.read(); // データ取得中は自動的にサスペンド
 *   return <img src={photo.url} />;
 * }
 *
 * @throws {Promise} - データ取得中（pending状態）の場合
 * @throws {Error} - Promiseがrejectされた場合
 */
export function wrapPromise<T>(promise: Promise<T>): Resource<T> {
  let state: {
    status: Status;
    result?: T;
    error?: Error;
  } = { status: "pending" };

  const suspender = promise.then(
    (res: T) => {
      state = { status: "fulfilled", result: res };
    },
    (err: Error) => {
      state = { status: "rejected", error: err };
    }
  );

  return {
    read() {
      if (state.status === "pending") {
        throw suspender;
      } else if (state.status === "rejected") {
        throw state.error;
      } else if (state.status === "fulfilled") {
        return state.result!;
      }
      throw new Error("Unreachable");
    },
  };
}
