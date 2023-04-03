import NoDomEvent from '@/helpers/NoDomEvent';
import PropertyChangedEventArgs from './PropertyChangedEventArgs';

/**
 * Enable the ability of notifying the properties has been changed on the
 * objects who implemented this interface.
 *
 * @template T The type of who implemented this interface.
 * @interface INotifyPropertyChanged
 */
interface INotifyPropertyChanged<T> {
  /**
   * A event that will be triggered when a property has been changed.
   *
   * @memberof INotifyPropertyChanged
   * @type {NoDomEvent<PropertyChangedEventArgs, T>}
   */
  propertyChanged: NoDomEvent<PropertyChangedEventArgs, T>;
}

export default INotifyPropertyChanged;
