import { Observable } from "rxjs";
import { ObservableData } from "./ObservableData";

export class ObsDataSerializable {

  public Data = new Map<string, ObservableData>();
  constructor() {
    this.Data.set("simpleMap", ObservableData.fromJSON('{"source":1,"numberOperators":1,"whatOperator":[{"operatorToApply":"map","valueToApply":"10","functionToApply":"multiply"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.Data.set("startDistinct", ObservableData.fromJSON('{"source":1,"numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"distinct","valueToApply":"10"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'))
    this.Data.set("skipLast", ObservableData.fromJSON('{"source":1,"numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"distinct","valueToApply":"10"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.Data.set("takeLast", ObservableData.fromJSON('{"source":1,"numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"takeLast","valueToApply":"2","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.Data.set("delay", ObservableData.fromJSON('{"source":1,"numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"delay","valueToApply":"10000","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'))
    this.Data.set("debounceTime", ObservableData.fromJSON('{"source":1,"numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"debounceTime","valueToApply":"10000","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
  }
}
