import { BaseComponent, Component, Global, Jovo } from "@jovotech/framework";
import { LoveHatePizzaComponent } from './LoveHatePizzaComponent';
import { TestingDelegateComponent } from './TestingDelegateComponent';
import { ExtractDelegatedEventData } from '../classes/BaseDelegateComponent';

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
    return this.$delegate(TestingDelegateComponent, {
      resolve: {
        completed: this.onTestingCompleted,
      },
    });
  }

  async onTestingCompleted(
    ...data: ExtractDelegatedEventData<TestingDelegateComponent, 'completed'>
  ) {

    await this.$send(`Completed Returned: ${JSON.stringify(data)}`);
    await this.$redirect(GlobalComponent, 'END');
  }

  END() {
    return this.$send(`END`);
  }
}
