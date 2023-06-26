import { Component } from "@jovotech/framework";
import { BaseDelegateComponent } from "../classes/BaseDelegateComponent";

@Component()
export class Testing2DelegateComponent extends BaseDelegateComponent<{
  completed: [string];
}> {
  async START() {
    return this.$resolve("completed", "a");
  }
}
