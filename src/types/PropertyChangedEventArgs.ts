/**
 * Indicates the arguments that should be passed to handlers when a
 * `propertyChanged` event has been triggered.
 */
type PropertyChangedEventArgs = {
  /**
   * The name of changed property.
   *
   * @type {string}
   */
  propertyName: string;
  /**
   * The previous value of changed property.
   *
   * @type {any}
   */
  oldValue: any;
  /**
   * The current value of changed property.
   *
   * @type {any}
   */
  newValue: any;
};

export default PropertyChangedEventArgs;
