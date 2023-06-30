import { Component } from "@jovotech/framework";
import { BaseDelegateComponent } from "../classes/BaseDelegateComponent";

@Component()
export class TestingDelegateComponent extends BaseDelegateComponent<{
  completed: [boolean, boolean, string];
}> {
  async START() {
    await this.$send("START from TestingComponent");
    return this.$resolve("completed", true, false, "A");
  }
}


