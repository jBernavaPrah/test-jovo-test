import { TestSuite, InputType } from "@jovotech/framework";
import { GlobalComponent } from "../src/components/GlobalComponent";
import { TestingDelegateComponent } from "../src/components/TestingDelegateComponent";

/*
|--------------------------------------------------------------------------
| UNIT TESTING
|--------------------------------------------------------------------------
|
| Run `npm test` to execute this sample test.
| Learn more here: www.jovo.tech/docs/unit-testing
|
*/

const testSuite = new TestSuite();

test("new test", async () => {
  // Cause the HandlerNotFoundError: Could not find handler mockConstructor in component GlobalComponent.
  //const spyInstance = jest.spyOn(GlobalComponent.prototype, 'onTestingCompleted');

  const spyTestingInstance = jest.spyOn(TestingDelegateComponent.prototype, "START");

  const result = await testSuite.run({
    intent: "TESTING"
  });

  expect(result).toEqual({
    "output": [
      {
        "message": "START from TestingComponent"
      },
      {
        "message": "Completed Returned: [true,false,\"A\"]"
      },
      {
        "message": "END"
      }
    ],
    "response": {
      "isTestResponse": true,
      "shouldEndSession": true
    }
  });

  expect(spyTestingInstance).toBeCalledTimes(1);
  //expect(spyInstance).toBeCalledTimes(1);
});
