import { observable, Observable } from "rxjs";
import { ObservableData } from "./ObservableData";

export class ObsDataSerializable {

  public Data = new Map<string, ObservableData>();

  public get sortKeys(): string[]{
    return [...this.Data.keys()].sort((a,b)=>a.toLowerCase().localeCompare(b.toLowerCase()));
  }
  constructor() {
    this.setString("simpleMap", ('{"source":1,"numberOperators":1,"whatOperator":[{"operatorToApply":"map","valueToApply":"10","functionToApply":"multiply"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setString("startDistinct", ('{"source":1,"numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"distinct","valueToApply":"10"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'))
    this.setString("skipLast", ('{"source":1,"numberOperators":1,"whatOperator":[{"operatorToApply":"skipLast","valueToApply":"4","functionToApply":"numberToSkip"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setString("takeLast", ('{"source":1,"numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"takeLast","valueToApply":"2","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setString("delay", ('{"source":1,"numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"delay","valueToApply":"10000","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'))
    this.setString("debounceTime", ('{"source":1,"numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"debounceTime","valueToApply":"10000","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setString("tap",('{"source":1,"numberOperators":1,"whatOperator":[{"operatorToApply":"tap","valueToApply":"4","functionToApply":"log"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setString("elementAt",'{"source":1,"numberOperators":1,"whatOperator":[{"operatorToApply":"elementAt","valueToApply":"4","functionToApply":"position"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}');
    this.setString("mergeMap",'{"source":1,"numberOperators":1,"whatOperator":[{"operatorToApply":"mergeMap","valueToApply":"5","functionToApply":"throwErrorAfter"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}');
    this.setString("retry",'{"source":1,"numberOperators":2,"whatOperator":[{"operatorToApply":"mergeMap","valueToApply":"4","functionToApply":"throwErrorAfter"},{"operatorToApply":"retry","valueToApply":"2","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}')
    this.setString("startWith",'{"source":1,"numberOperators":1,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"10","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}')
    this.setString("skipWhile",'{"source":1,"numberOperators":1,"whatOperator":[{"operatorToApply":"skipWhile","valueToApply":"5","functionToApply":"lessThan"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}');
  }
  private setString(name:string, value:string){
    this.Data.set(name,ObservableData.fromJSON(value));
  }
}
