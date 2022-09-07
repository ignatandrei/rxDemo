import { observable, Observable } from "rxjs";
import { ObservableData } from "./ObservableData";

export class ObsDataSerializable {

  private DataNumberExample = new Map<string, ObservableData>();
  private DataTextBoxExample = new Map<string, ObservableData>();

  public get sortKeysTextBox(): string[]{
    return [...this.DataTextBoxExample.keys()].sort((a,b)=>a.toLowerCase().localeCompare(b.toLowerCase()));
  }
  public TextData(key:string):ObservableData{
    return this.DataTextBoxExample.get(key);
  }

  public get sortKeysNumber(): string[]{
    return [...this.DataNumberExample.keys()].sort((a,b)=>a.toLowerCase().localeCompare(b.toLowerCase()));
  }
  public NumberData(key:string):ObservableData{
    return this.DataNumberExample.get(key);
  }
  constructor() {
    this.setStringNumbers("simpleMap", ('{"source":"netCoreGetNumbers","numberOperators":1,"whatOperator":[{"operatorToApply":"map","valueToApply":"10","functionToApply":"multiply"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setStringNumbers("startDistinct", ('{"source":"netCoreGetNumbers","numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"distinct","valueToApply":"10"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'))
    this.setStringNumbers("skipLast", ('{"source":"netCoreGetNumbers","numberOperators":1,"whatOperator":[{"operatorToApply":"skipLast","valueToApply":"4","functionToApply":"numberToSkip"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setStringNumbers("takeLast", ('{"source":"netCoreGetNumbers","numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"takeLast","valueToApply":"2","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setStringNumbers("delay", ('{"source":"netCoreGetNumbers","numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"delay","valueToApply":"10000","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'))
    this.setStringNumbers("debounceTime", ('{"source":"netCoreGetNumbers","numberOperators":2,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"4","functionToApply":"numberToTake"},{"operatorToApply":"debounceTime","valueToApply":"10000","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setStringNumbers("tap",('{"source":"netCoreGetNumbers","numberOperators":1,"whatOperator":[{"operatorToApply":"tap","valueToApply":"4","functionToApply":"log"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}'));
    this.setStringNumbers("elementAt",'{"source":"netCoreGetNumbers","numberOperators":1,"whatOperator":[{"operatorToApply":"elementAt","valueToApply":"4","functionToApply":"position"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}');
    this.setStringNumbers("mergeMap",'{"source":"netCoreGetNumbers","numberOperators":1,"whatOperator":[{"operatorToApply":"mergeMap","valueToApply":"5","functionToApply":"throwErrorAfter"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}');
    this.setStringNumbers("retry",'{"source":"netCoreGetNumbers","numberOperators":2,"whatOperator":[{"operatorToApply":"mergeMap","valueToApply":"4","functionToApply":"throwErrorAfter"},{"operatorToApply":"retry","valueToApply":"2","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}')
    this.setStringNumbers("startWith",'{"source":"netCoreGetNumbers","numberOperators":1,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"10","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}')
    this.setStringNumbers("skipWhile",'{"source":"netCoreGetNumbers","numberOperators":1,"whatOperator":[{"operatorToApply":"skipWhile","valueToApply":"5","functionToApply":"lessThan"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}');
    
    this.setStringTextBox("distinctTimer",'{"source":"fromTextBox","numberOperators":3,"whatOperator":[{"operatorToApply":"debounceTime","valueToApply":"3000","functionToApply":"numberToTake"},{"operatorToApply":"distinctUntilChanged","valueToApply":"10","functionToApply":"multiply"},{"operatorToApply":"map","valueToApply":"10","functionToApply":"multiply"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}');
    this.setStringTextBox("switchMap",'{"source":"fromTextBox","numberOperators":1,"whatOperator":[{"operatorToApply":"switchMap","valueToApply":"4000","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}');
    this.setStringTextBox('full','{"source":"fromTextBox","numberOperators":3,"whatOperator":[{"operatorToApply":"debounceTime","valueToApply":"5000","functionToApply":"numberToTake"},{"operatorToApply":"distinctUntilChanged","valueToApply":"10"},{"operatorToApply":"switchMap","valueToApply":"2000","functionToApply":"countriesWithDelay"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2}}');
  }
  private setStringNumbers(name:string, value:string){
    this.DataNumberExample.set(name,ObservableData.fromJSON(value));
  }

  private setStringTextBox(name:string, value:string){
    this.DataTextBoxExample.set(name,ObservableData.fromJSON(value));
  }
}
