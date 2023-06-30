// import {
//   BaseComponent as RealBaseComponent,
//   ComponentConfig,
//   ComponentConstructor,
//   ComponentData,
//   ComponentOptions,
//   ComponentTreeNode,
//   DelegateOptions,
//   Jovo,
//   JovoProxy
// } from "@jovotech/framework";
// import { UnknownObject } from "@jovotech/common";
// import { BaseDelegateComponent } from "./BaseDelegateComponent";
// import { AnyObject } from "@jovotech/cli-core";
// import * as vm from "vm";
// import { GlobalComponent } from "../components/GlobalComponent";
// import util from "util";
//
// type ExtractDelegatedFunction<T> = T extends BaseDelegateComponent<infer U, any, any> ? U : never;
//
// // Needed to reset the method to permit to have my $delegate function as is indicated here.
// // This needs to be removed after the $delegate and $resolve will be moved to the jovo class.
// JovoProxy.prototype["overwritePropertiesToPropagateChangesToJovo"] = function(this) {
//   const keySet = new Set<string>();
//   Object.getOwnPropertyNames(Jovo.prototype).forEach((key) => keySet.add(key));
//   Object.keys(this.jovo).forEach((key) => keySet.add(key));
//   const keys = Array.from(keySet);
//   keys.forEach((key) => {
//     if (
//       key !== "jovo" &&
//       key !== "constructor" &&
//       key !== "$component" &&
//       // keys added
//       key !== "$delegate" &&
//       key !== "$resolve"
//     ) {
//       // if the value is a function just return it as a value and not as getter and setter
//       const propertyDescriptor: PropertyDescriptor =
//         typeof this.jovo[key as keyof Jovo] === "function"
//           ? { value: this.jovo[key as keyof Jovo].bind(this.jovo) }
//           : {
//             get: () => {
//               return this.jovo[key as keyof Jovo];
//             },
//             set: (val: unknown) => {
//               (this.jovo as AnyObject)[key] = val;
//             }
//           };
//       Object.defineProperty(this, key, propertyDescriptor);
//     }
//   });
// };
//
// export class BaseComponent<
//   DATA extends ComponentData = ComponentData,
//   CONFIG extends UnknownObject = UnknownObject,
// > extends RealBaseComponent<DATA, CONFIG> {
//   // needs to be on th baseComponent, and the component needs to extends from here!
//   async __executeFunction(func: string, ...args: any) {
//
//     const script = new vm.Script(func.replace("GlobalComponent_1", "GlobalComponent") + "\n testing(this, \"sdf\", 3)");
//
//     const context = vm.createContext({});
//
//     script.runInThisContext();
//
//     const myFunction = context.testing as (...args: any[]) => any;
//
//     const result = myFunction.call(this,"a", 3);
//
//     // const funcReg = / *\(([^()]*)\)[ \n\t]*{(.*)}/gim;
//     // const match = funcReg.exec(func.replace(/\n/g, ' '));
//     //
//     // if (!match) {
//     //   return;
//     // }
//     //
//     // await new Function(...match[1].split(','), match[2]).apply(this, args);
//
//     //await eval(func).apply(this.jovo, args);
//   }
//
//   override async $delegate<COMPONENT extends BaseDelegateComponent<any, any, any>>(
//     constructor: ComponentConstructor<COMPONENT> | string,
//     functionOrOptions:
//       | DelegateOptions<ComponentConfig<COMPONENT>>
//       | ExtractDelegatedFunction<COMPONENT>,
//     config?: ComponentConfig<COMPONENT>
//   ): Promise<void> {
//     if (typeof functionOrOptions === "function") {
//       return super.$delegate(constructor as string, {
//         config: config ?? {},
//         resolve: {
//           __function: functionOrOptions.toString()
//         }
//       });
//     }
//
//     return super.$delegate(constructor as string, functionOrOptions);
//   }
// }
