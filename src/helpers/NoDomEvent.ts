import EventHandler from '@/types/EventHandler';

/**
 * Indicates an object that should be treated as an event without relating to
 * the DOM.
 *
 * @template TArgs The type of args which need to be passed to the handler.
 * @template TSender The type of the host who triggered this event.
 * @class NoDomEvent
 */
class NoDomEvent<TArgs = any, TSender = any> {
  private _eventList: EventHandler<TArgs, TSender>[] = [];

  /**
   * Add an event handler to the event.
   *
   * @memberof NoDomEvent
   * @param {EventHandler<TArgs, TSender>} handler The event handler which
   *   should be added.
   */
  public add = (handler: EventHandler<TArgs, TSender>) =>
    this._eventList.push(handler);
  /**
   * Remove the specified event handler from the event.
   *
   * **It will removes all event handlers with same name**.
   *
   * @memberof NoDomEvent
   * @param {string} handler The name of event handler which should be removed.
   */
  public remove(handler: string): void;
  /**
   * Remove the specified event handler from the event.
   *
   * **It will removes all event handlers with same name**.
   *
   * @memberof NoDomEvent
   * @param {string} handler The event handler which should be removed.
   */
  public remove(handler: EventHandler<TArgs, TSender>): void;
  public remove(handler: string | EventHandler<TArgs, TSender>): void {
    let name = typeof handler === 'string' ? handler : handler.name;
    this._removeHandlersByName(name);
  }
  /**
   * Invoke event handlers by the order they were added.
   *
   * @memberof NoDomEvent
   * @param {TSender} sender The host who triggered this event.
   * @param {TArgs} args The arguments need to be passed to event handlers.
   */
  public invoke(sender: TSender, args: TArgs) {
    this._eventList.forEach(handler => handler(sender, args));
  }

  private _removeHandlersByName(name: string) {
    let index = this._eventList.findIndex(eh => eh.name === name);
    if (index > -1) {
      this._eventList.slice(index, 1);
      this._removeHandlersByName(name);
    }
  }
}

export default NoDomEvent;
