type Falsy = 0 | '' | false | null | undefined;

// eslint-disable-next-line unicorn/prefer-native-coercion-functions
export const isTruthy = <T>(x: Falsy | T): x is T => Boolean(x);
