/**
 * Indicates a handler to be called when a event has been triggered.
 *
 * @template TArgs The type of args which need to be passed to the handler.
 * @template TSender The type of the host who triggered this event.
 */
type EventHandler<TArgs = any, TSender = any> = {
  /**
   * The handler to be called when the event has been triggered.
   *
   * @param {TSender} sender The host who triggered this event.
   * @param {TArgs} eventArgs The arguments which need to be passed to the
   *   handler.
   */
  (sender: TSender, eventArgs: TArgs): void | Promise<void>;
  /**
   * The name of this event handler.
   *
   * Multiple handlers with same name will be triggered by the order of them got
   * added to the event. Remove a handler with specified name will remove all
   * handlers with same name. That's to say, **users should avoid using same
   * name with different handlers, unless it's necessary**.
   *
   * @type {string}
   */
  name: string;
};

export default EventHandler;
