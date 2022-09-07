import { observable, Observable } from "rxjs";
import { ObservableData } from "./ObservableData";

export class ObsDataSerializable {

  public DataNumberExample = new Map<string, ObservableData>();

  public get sortKeys(): string[]{
    return [...this.DataNumberExample.keys()].sort((a,b)=>a.toLowerCase().localeCompare(b.toLowerCase()));
  }
  public NumberData(key:string):ObservableData{
    return this.DataNumberExample.get(key);
  }
  constructor() {
    this.setString("simpleMap", ('{"source":"netCoreGetNumbers","numberOperators":1,"whatOperator":[{"operatorToApply":"map","valueToApply":"10","functionToApply":"multiply"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setString("startDistinct", ('{"source":"netCoreGetNumbers","numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"distinct","valueToApply":"10"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'))
    this.setString("skipLast", ('{"source":"netCoreGetNumbers","numberOperators":1,"whatOperator":[{"operatorToApply":"skipLast","valueToApply":"4","functionToApply":"numberToSkip"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setString("takeLast", ('{"source":"netCoreGetNumbers","numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"takeLast","valueToApply":"2","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setString("delay", ('{"source":"netCoreGetNumbers","numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"delay","valueToApply":"10000","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'))
    this.setString("debounceTime", ('{"source":"netCoreGetNumbers","numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"debounceTime","valueToApply":"10000","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setString("tap",('{"source":"netCoreGetNumbers","numberOperators":1,"whatOperator":[{"operatorToApply":"tap","valueToApply":"4","functionToApply":"log"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setString("elementAt",'{"source":"netCoreGetNumbers","numberOperators":1,"whatOperator":[{"operatorToApply":"elementAt","valueToApply":"4","functionToApply":"position"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}');
    this.setString("mergeMap",'{"source":"netCoreGetNumbers","numberOperators":1,"whatOperator":[{"operatorToApply":"mergeMap","valueToApply":"5","functionToApply":"throwErrorAfter"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}');
    this.setString("retry",'{"source":"netCoreGetNumbers","numberOperators":2,"whatOperator":[{"operatorToApply":"mergeMap","valueToApply":"4","functionToApply":"throwErrorAfter"},{"operatorToApply":"retry","valueToApply":"2","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}')
    this.setString("startWith",'{"source":"netCoreGetNumbers","numberOperators":1,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"10","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}')
    this.setString("skipWhile",'{"source":"netCoreGetNumbers","numberOperators":1,"whatOperator":[{"operatorToApply":"skipWhile","valueToApply":"5","functionToApply":"lessThan"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}');
  }
  private setString(name:string, value:string){
    this.DataNumberExample.set(name,ObservableData.fromJSON(value));
  }
}
