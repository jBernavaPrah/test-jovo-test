import { JovoDevice, JovoRequest, JovoUser, Platform } from "../../jovo-framework/framework";

declare module "@jovotech/framework/dist/types/Jovo" {
  export interface Jovo<
    REQUEST extends JovoRequest = JovoRequest,
    RESPONSE extends JovoResponse = JovoResponse,
    JOVO extends Jovo<REQUEST, RESPONSE, JOVO, USER, DEVICE, PLATFORM> = any,
    USER extends JovoUser<JOVO> = JovoUser<JOVO>,
    DEVICE extends JovoDevice<JOVO> = JovoDevice<JOVO>,
    PLATFORM extends Platform<REQUEST, RESPONSE, JOVO, USER, DEVICE, PLATFORM> = any,
  > {
    $resolve<ARGS extends any[]>(eventName: string, ...eventArgs: ARGS): Promise<void>;

  }
}
