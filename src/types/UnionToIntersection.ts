/**
 * Magical type that convert a ts union type (A|B) to intersection type (A&B).
 *
 * @see https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types
 * @see https://stackoverflow.com/a/50375286
 */
type UnionToIntersection<T> = (
  T extends any ? (param: T) => void : never
) extends (param: infer TOthers) => void
  ? TOthers
  : never;

export default UnionToIntersection;
