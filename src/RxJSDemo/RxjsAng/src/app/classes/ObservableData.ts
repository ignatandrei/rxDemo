import { map, Observable, TimeInterval, timeInterval } from "rxjs";
import { KeyValuePairNumber, ListsService } from "../lists.service";
import { fromArray } from "./fromArray";
import { exportNumbers } from "./obsNumbers";
import { unaryOperators } from "./unaryOperators";
export enum SourceOfData {
  none= '',
  netCoreGetNumbers = 'netCoreGetNumbers',
  fromTextBox='fromTextBox',
  fromArrayData = 'fromArrayData'
}
export class ObservableData {

  
  //region operators
  public source = SourceOfData.none;
    fromTextBox: Observable<Event>;
  public IncrementOperators(): void {
    this.numberOperators++;
  }
  public DeleteOperator(i: number) {
    this._numberOperators--;
    this.whatOperator.splice(i, 1);
  }
  _numberOperators: number = 0;
  public get numberOperators(): number {
    return this._numberOperators;
  }
  public set numberOperators(value: number) {
    value = value || 1;
    if (value < 1)
      value = 1;
    while (this.whatOperator.length > value)
      this.whatOperator.pop();

    while (this.whatOperator.length < value) {
      this.whatOperator.push(new unaryOperators());
    }
    this._numberOperators = value;
  }
  //endregion
  constructor(o: ObservableData = null) {
    if (o == null) {
      this.numberOperators = 1;
      return;
    }
    this.numberOperators = o.numberOperators;
    Object.keys(o).forEach(v => (this as any)[v] = o[v]);
    for (var i = 0; i < this.whatOperator.length; i++) {
      this.whatOperator[i] = new unaryOperators(this.whatOperator[i]);
    }
    
  }

  public whatOperator: unaryOperators[] = [];
  public startNumbers: exportNumbers = new exportNumbers();
  public fromArrayData: fromArray=new fromArray();
  public dataFor: KeyValuePairNumber[] = [];
  public dataForOneOperator: KeyValuePairNumber[] = [];
  public list: ListsService;
  private startFromArrayData() {
    console.log(this.fromArrayData);
    this.startWithObs(
      this.fromArrayData.obs(),
      this.fromArrayData.obs()
    );
  }
  private startNetCoreNumbers() {
    this.startWithObs(
      this.list.GetNumbersObservable(this.startNumbers.fromNumber, this.startNumbers.count, this.startNumbers.repeat, this.startNumbers.delaySec * 1000),
      this.list.GetNumbersObservable(this.startNumbers.fromNumber, this.startNumbers.count, this.startNumbers.repeat, this.startNumbers.delaySec * 1000)
    );
  }
  private startFromTextBoxWithFullText() {
    this.startWithObs(this.fromTextBox.pipe(
      map(e => {
        var kvp = new KeyValuePairNumber();
        kvp.value = (e.target as HTMLInputElement).value;
        kvp.key = e.timeStamp;
        return kvp;
      }),
    ),

      this.fromTextBox.pipe(
        map(e => {
          var kvp = new KeyValuePairNumber();
          kvp.value = (e.target as HTMLInputElement).value;
          kvp.key = e.timeStamp;
          return kvp;
        }),
      )
    );
  }
  private startWithObs(obs:Observable<KeyValuePairNumber>, obs2: Observable<KeyValuePairNumber>) {
    var start = new KeyValuePairNumber();
    start.key = 0;
    start.finish = false;
    start.value = "Start original";
    this.dataFor = [ start ];
    var startP = new KeyValuePairNumber();
    startP.key = 0;
    startP.finish = false;
    startP.value = "Start piped";
    this.dataForOneOperator = [startP];
    obs
      .pipe(
        //timeInterval()
      )
      .subscribe({
        next: (it: KeyValuePairNumber) => {
          this.dataFor = [...this.dataFor, it];
        }
        ,
        complete: () => {
          // console.log("done");
          var c = new KeyValuePairNumber();
          c.key = this.dataFor[this.dataFor.length - 1].key + 1;
          c.finish = true;
          c.value = "Stop original";
          this.dataFor = [...this.dataFor, c];
        },
        error: () => {
          window.alert('error');
        }
      })

    //var obs2 = this.list.GetNumbersObservable(this.startNumbers.fromNumber, this.startNumbers.count, this.startNumbers.repeat, this.startNumbers.delaySec * 1000);
    // console.log("nr operators" + this.numberOperators);
    
    for (var operatorNr = 0; operatorNr < this.numberOperators; operatorNr++) {
      var op = this.whatOperator[operatorNr];
      obs2 = unaryOperators.applyPipe(obs2, op.operatorToApply, op.functionToApply, op.valueToApply, this.list);
      // console.log("applied " + op.operatorToApply);
    }

    
    obs2.pipe(
      //timeInterval()
      map(it=> new KeyValuePairNumber(it))
    ).subscribe(
      {
        next: (it: KeyValuePairNumber) => {
          this.dataForOneOperator = [...this.dataForOneOperator, it];
        }
        ,
        complete: () => {

          var c = new KeyValuePairNumber();
          c.key = this.dataForOneOperator.length + 1;
          c.finish = true;
          c.value = "Stop piped";
          this.dataForOneOperator = [...this.dataForOneOperator, c ];
        },
        error: () => {
          window.alert('error');
        }
      }
    );

  }
  public start(): void {
    // console.log("start");

    // this.list.GetNumbers(1, 10, 5000).subscribe(
    //   it => {
    //     console.log("all", it);
    //   }
    // );
    switch (this.source) {
      case SourceOfData.none:
        return;
      case SourceOfData.netCoreGetNumbers:
        this.startNetCoreNumbers();
        return;
      case SourceOfData.fromTextBox:
        this.startFromTextBoxWithFullText();
        return;
      case SourceOfData.fromArrayData:
        this.startFromArrayData();
        return;
      default:
        window.alert("not existing "+ this.source);
    }
    
    ;

  }

  public toJson(): string {
    var json = {};
    json["source"] = this.source;
    json["numberOperators"] = this.numberOperators;
    json["whatOperator"] = this.whatOperator;
    json["startNumbers"] = this.startNumbers;
    return JSON.stringify(json);
  }

  public static fromJSON(json: string): ObservableData {
    return JSON.parse(json) as ObservableData;
  }
}
