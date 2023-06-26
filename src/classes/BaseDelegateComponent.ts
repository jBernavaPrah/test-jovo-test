import { BaseComponent } from './BaseComponent';
import { ComponentData } from '@jovotech/framework';
import { UnknownObject } from '@jovotech/common';

export abstract class BaseDelegateComponent<
  RESOLVE extends Record<string, Array<unknown>>,
  DATA extends ComponentData = ComponentData,
  CONFIG extends UnknownObject = UnknownObject,
  KEY extends keyof RESOLVE = keyof RESOLVE,
> extends BaseComponent<DATA, CONFIG> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async $resolve(eventName: Extract<KEY, string>, ...eventArgs: RESOLVE[KEY]): Promise<void> {
    // because of the JovoProxy class, this implementation of the $resolve will not be called.
    // But it's ok, we need only types work.
    return await super.$resolve(eventName as string, ...eventArgs);
  }
}
