export interface IComponentStrings<T extends string = string> {
  /**
   * Strings that used in this component. User could change these properties to
   * localize this component.
   */
  strings?: {
    [key in T]: string;
  };
}
