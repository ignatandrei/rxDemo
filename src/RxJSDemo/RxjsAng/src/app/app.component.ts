import { Component } from '@angular/core';
import { tap, pipe, mapTo, map, Observable, first } from 'rxjs';
import { exportNumbers } from './classes/obsNumbers';
import { OperatorsUnary, unaryOperators } from './classes/unaryOperators';
import { KeyValuePairNumber, ListsService } from './lists.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  public operators = Object.values(OperatorsUnary);
  public whatOperator : unaryOperators[]=[];
  public startNumbers: exportNumbers=new exportNumbers();
  dataFor: KeyValuePairNumber[] = [];
  dataForOneOperator: KeyValuePairNumber[] = [];
  original: string = "original";
  operator: string = "operator";
  
  _numberOperators:number=0;
  public get numberOperators():number{
    return this._numberOperators;
  }
  public set numberOperators(value:number){
    value = value ||1;
    if(value<1)
      value=1;
    while(this.whatOperator.length>value)
      this.whatOperator.pop();

    while(this.whatOperator.length <value){
      this.whatOperator.push(new unaryOperators());
    }
    this._numberOperators=value;
  }
  public IncrementOperators() : void{
    this.numberOperators++;
  }
  public DeleteOperator(i: number) {
    this._numberOperators--;
    this.whatOperator.splice(i, 1);
  }
  constructor(public list: ListsService) {
    this.numberOperators=1;
  }
  title = 'RxjsAng';
    public start(): void {
    // console.log("start");
    var start = new KeyValuePairNumber();
    start.key = 0;
    start.finish = true;
    start.value = "Start";
    this.dataFor = [start];
    this.dataForOneOperator = [start];

    // this.list.GetNumbers(1, 10, 5000).subscribe(
    //   it => {
    //     console.log("all", it);
    //   }
    // );

    var obs= this.list.GetNumbersObservable(this.startNumbers.fromNumber, this.startNumbers.count,this.startNumbers.repeat, this.startNumbers.delaySec*1000)    
    .subscribe({
      next: (it: KeyValuePairNumber) => {
        this.dataFor = [...this.dataFor, it];
      }
      ,
      complete: () => {
        // console.log("done");
        var c = new KeyValuePairNumber();
        c.key = this.dataFor[this.dataFor.length-1].key+1;
        c.finish = true;
        c.value = "Stop";
        this.dataFor = [...this.dataFor, c];
      },
      error: () => {
        window.alert('error');
      }
    })

      var obs2 = this.list.GetNumbersObservable(this.startNumbers.fromNumber, this.startNumbers.count, this.startNumbers.repeat, this.startNumbers.delaySec*1000);
    
    for(var operatorNr =0;operatorNr<this.numberOperators;operatorNr++){
      var op = this.whatOperator[operatorNr];
      obs2=unaryOperators.applyPipe(obs2,op.operatorToApply, op.functionToApply,op.valueToApply);    

    }
      
      
    obs2.subscribe(

      {
        next: (it:KeyValuePairNumber) => {
          this.dataForOneOperator= [...this.dataForOneOperator, it];
        }
        ,
        complete: () => {
          
          var c = new KeyValuePairNumber();
          c.key = this.dataForOneOperator.length+1;
          c.finish = true;
          c.value = "Stop";
          this.dataForOneOperator = [...this.dataForOneOperator, c];
        },
        error: () => {
          window.alert('error');
        }
      } 
    );
    
    ;
    
  }
}
