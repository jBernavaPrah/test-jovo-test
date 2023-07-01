import { JovoDevice, JovoRequest, JovoUser, Platform } from '@jovo-framework/framework';
import { BaseComponent as RealBaseComponent } from '@jovotech/framework/dist/types/BaseComponent';
import { BaseDelegateComponent } from './BaseDelegateComponent';
import { ComponentConfig, ComponentConstructor, DelegateOptions } from '@jovotech/framework';

declare module '@jovotech/framework/dist/types/Jovo' {
  export interface Jovo<
    REQUEST extends JovoRequest = JovoRequest,
    RESPONSE extends JovoResponse = JovoResponse,
    JOVO extends Jovo<REQUEST, RESPONSE, JOVO, USER, DEVICE, PLATFORM> = any,
    USER extends JovoUser<JOVO> = JovoUser<JOVO>,
    DEVICE extends JovoDevice<JOVO> = JovoDevice<JOVO>,
    PLATFORM extends Platform<REQUEST, RESPONSE, JOVO, USER, DEVICE, PLATFORM> = any,
  > {
    $resolve<ARGS extends any[]>(eventName: string, ...eventArgs: ARGS): Promise<void>;

    $delegate<COMPONENT extends RealBaseComponent | BaseDelegateComponent<any>>(
      constructor: ComponentConstructor<COMPONENT> | string,
      options: DelegateOptions<
        ComponentConfig<COMPONENT>,
        Extract<keyof ExtractDelegatedFunction<COMPONENT>, string>
      >,
    ): Promise<void>;
  }
}
