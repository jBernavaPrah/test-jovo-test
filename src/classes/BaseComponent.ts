import {
  BaseComponent as RealBaseComponent,
  ComponentConfig,
  ComponentConstructor,
  ComponentData,
  DelegateOptions,
} from '@jovotech/framework';
import { BaseDelegateComponent } from './BaseDelegateComponent';
import { UnknownObject } from '@jovotech/common';

type ExtractDelegatedFunction<T> = T extends BaseDelegateComponent<infer U, any, any> ? U : never;

export class BaseComponent<
  DATA extends ComponentData = ComponentData,
  CONFIG extends UnknownObject = UnknownObject,
> extends RealBaseComponent<DATA, CONFIG> {
  $delegate<COMPONENT extends RealBaseComponent | BaseDelegateComponent<any>>(
    constructor: ComponentConstructor<COMPONENT> | string,
    options: DelegateOptions<
      ComponentConfig<COMPONENT>,
      Extract<keyof ExtractDelegatedFunction<COMPONENT>, string>
    >,
  ): Promise<void> {
    return super.$delegate(constructor as string, options);
  }
}
