import { BaseComponent } from "./BaseComponent";
import { ComponentData } from "@jovotech/framework";
import { UnknownObject } from "@jovotech/common";

export type ExtractDelegatedEventData<
  T extends BaseDelegateComponent<Record<string, any>>,
  KEY extends keyof T["__resolve"],
> = T extends BaseDelegateComponent<infer RESOLVE, any, any, any> ? RESOLVE[KEY] : never;

export abstract class BaseDelegateComponent<
  RESOLVE extends Record<string, any>,
  DATA extends ComponentData = ComponentData,
  CONFIG extends UnknownObject = UnknownObject,
  KEY extends keyof RESOLVE = keyof RESOLVE,
> extends BaseComponent<DATA, CONFIG> {

  // used to permit the ExtractDelegatedEventData work.
  // If you find a better way that not require "declare", be my guest! :D
  declare __resolve: RESOLVE;


  override async $resolve<ARGS extends RESOLVE[KEY]>(
    eventName: Extract<KEY, string>,
    ...eventArgs: ARGS extends Array<any> ? ARGS : Array<ARGS>
  ): Promise<void> {
    // because of the JovoProxy class, this implementation of the $resolve will not be called.
    // But it's ok, we need only types work.
    return super.$resolve(eventName as string, ...eventArgs);
  }
}
