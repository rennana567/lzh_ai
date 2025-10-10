type IsNerver<T> = [T] extends [never] ? true : false;

type A = IsNerver<never>; // true
type B = IsNerver<string>; // false
type C = IsNerver<number>; // false