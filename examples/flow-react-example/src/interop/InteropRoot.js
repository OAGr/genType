/* @flow strict */

const ReactDOM = require("react-dom");
const React = require("react");

const GreetingRe = require("./Greeting.gen");

// Import a ReasonReact component!
const Greeting = require("./Greeting.gen").default;

const InnerComponent = require("../components/ManyComponents.gen")
  .InnerComponent;

const consoleLog = console.log;

const helloWorldList = GreetingRe.cons({
  x: "Hello",
  l: GreetingRe.cons2({ x: "World", l: GreetingRe.empty })
});

const helloWorld = GreetingRe.concat("++", helloWorldList);

const someNumber: number = GreetingRe.testDefaultArgs({ y: 10 });

const WrapJsValue = require("./ImportJsValue.gen");

consoleLog("interopRoot.js roundedNumber:", WrapJsValue.roundedNumber);
consoleLog("interopRoot.js areaValue:", WrapJsValue.areaValue);

// type error: can't call that directly
//const callAreaDirectly = WrapJsValue.area({x:3,y:4});

const callMyAreaDirectly = WrapJsValue.myArea({ x: 3, y: 4 });

consoleLog("interopRoot.js callMyAreaDirectly:", callMyAreaDirectly);

consoleLog("anInterestingFlowType ", require("../SomeFlowTypes").c);

const Enums = require("../Enums.gen");

consoleLog("Enums: swap(sunday) =", Enums.swap("sunday"));
consoleLog("Enums: fortytwoOK is", Enums.fortytwoOK);
consoleLog("Enums: fortytwoBAD is", Enums.fortytwoBAD);
consoleLog(
  "Enums: testConvert3to2('module') =",
  Enums.testConvert2to3("module")
);
consoleLog("Enums: testConvert3to2('42') =", Enums.testConvert2to3("42"));

const App = () => (
  <div>
    <Greeting
      message={helloWorld}
      someNumber={someNumber}
      polymorphicProp={[1, 2, 3]}
    />
    <InnerComponent />
  </div>
);
App.displayName = "ExampleInteropRoot";

// $FlowExpectedError: Reason checked type sufficiently
ReactDOM.render(React.createElement(App), document.getElementById("index"));
