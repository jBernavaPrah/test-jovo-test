import { BaseDelegateComponent } from '../classes_test_1/BaseDelegateComponent';
import { Component } from '@jovotech/framework';

@Component()
export class TestingDelegateComponent extends BaseDelegateComponent<
  (a: string, b: number) => void
> {
  async START() {
    return this.$resolve('sdf', 0);
  }
}
