import {
  ComponentConstructor,
  ComponentData,
  ComponentTreeNode,
  Data,
  DependencyInjector,
  Jovo
} from "@jovotech/framework";
import { UnknownObject } from "@jovotech/common";
import { BaseComponent } from "./BaseComponent";

type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;
type First<T extends any[]> = T extends [infer FirstElement, ...any[]] ? FirstElement : never;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ComponentTreeNode.prototype["executeFunction"] = async function(
  this,
  {
    jovo,
    func,
    callArgs
  }: {
    jovo: Jovo;
    func: string;
    callArgs: unknown[];
  }
) {
  const componentInstance = await (this as any).instantiateComponent(jovo);

  await componentInstance["__executeFunction"](func, ...(callArgs || []));
};

export abstract class BaseDelegateComponent<
  FUNCTION extends (...args: any) => any,
  DATA extends ComponentData = ComponentData,
  CONFIG extends UnknownObject = UnknownObject,
> extends BaseComponent<DATA, CONFIG> {
  private declare f: FUNCTION;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async $resolve<ARGS extends Parameters<FUNCTION>>(
    eventNameOrArg: string | First<ARGS>,
    ...eventArgs: Tail<ARGS>
  ): Promise<void> {
    if (!this.$state) {
      return;
    }

    const currentStateStackItem = this.$state[this.$state.length - 1];
    const previousStateStackItem = this.$state[this.$state.length - 2];
    // make sure the state-stack exists and it long enough
    if (!currentStateStackItem?.resolve || !previousStateStackItem) {
      return;
    }

    const previousComponentPath = previousStateStackItem.component.split(".");
    // get the previous node
    const previousComponentNode =
      this.$handleRequest.componentTree.getNodeAtOrFail(previousComponentPath);

    const resolvedHandler = currentStateStackItem.resolve["__function"];
    // const resolvedHandler = currentStateStackItem.resolve[eventNameOrArg as string];
    //
    // return super.$resolve(resolvedHandler ?? '__function', [...eventArgs, resolvedHandler ? [] : eventNameOrArg])

    // await previousComponentNode.executeHandler({
    //   jovo: this.getJovoReference(),
    //   handler: resolvedHandler ?? '__function',
    //   callArgs: [...eventArgs, resolvedHandler ? [] : eventNameOrArg],
    // });

    // if previous component is global, remove another item from the stack to remove the global component
    if (previousComponentNode.metadata.isGlobal) {
      this.$state.pop();
    }
    // remove the latest item from the state-stack
    this.$state.pop();

    // update the active component node in handleRequest to keep track of the state
    this.$handleRequest.activeComponentNode = previousComponentNode;

    //todo: dynamically create a new handler?

    // execute the component's handler
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await previousComponentNode.executeFunction({
      jovo: this.getJovoReference(),
      func: resolvedHandler,
      callArgs: [eventNameOrArg, ...eventArgs]
    });

    //
    // await this.$handleRequest.middlewareCollection.run(RESOLVE_MIDDLEWARE, this, {
    //   resolvedHandler,
    //   eventName: "anonymous",
    //   eventArgs,
    // });

    // const jovo = this.getJovoReference();
    //
    // const componentInstance = await DependencyInjector.instantiateClass(
    //   jovo,
    //   this.metadata.target as any,
    //   jovo,
    //   this.metadata.options,
    // );;
    //
    // try {
    //   await eval(resolvedHandler)(eventArgs); //(componentInstance as any)[handler](...(callArgs || []));
    // } catch (e) {
    //   const jovo = this.getJovoReference();
    //   return jovo.$app.handleError(e, jovo);
    // }

    // execute the component's handler
    // await previousComponentNode.executeHandler({
    //   jovo: this.getJovoReference(),
    //   handler: resolvedHandler,
    //   callArgs: eventArgs
    // });

    // needs to call
    //return;
  }
}
