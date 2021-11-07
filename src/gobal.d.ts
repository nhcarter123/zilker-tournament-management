declare type Nullable<T> = T | null;
declare type Maybe<T> = T | undefined;

declare type ArgumentTypes<F extends Function> = F extends (
  args: infer A
) => any
  ? A
  : never;
