import { Component, Global, Jovo } from '@jovotech/framework';
import { LoveHatePizzaComponent } from './LoveHatePizzaComponent';
import { TestingDelegateComponent } from './TestingDelegateComponent';
import { BaseComponent } from '../classes/BaseComponent';
import { Testing2DelegateComponent } from './Testing2DelegateComponent';

/*
|--------------------------------------------------------------------------
| Global Component
|--------------------------------------------------------------------------
|
| The global component handlers can be reached from anywhere in the app
| Learn more here: www.jovo.tech/docs/components#global-components
|
*/
@Global()
@Component()
export class GlobalComponent extends BaseComponent {
  LAUNCH() {
    return this.$redirect(LoveHatePizzaComponent);
  }

  async TESTING() {
    return this.$delegate(Testing2DelegateComponent, {
      resolve: {
        completed: "",
      },
    });
  }

  //async onTestingCompleted(data: ExtractEventParameters<TestingDelegateComponent, 'eventName'>) {}

  END() {
    return this.$send(`END`);
  }
}
