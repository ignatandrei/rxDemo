import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { combineLatest, endWith, forkJoin, map, merge, Observable, race, startWith, tap } from 'rxjs';
import { ObservableData } from '../classes/ObservableData';
import { unaryOperators } from '../classes/unaryOperators';
import { KeyValuePairNumber } from '../lists.service';
import { ExpandVisualization } from '../one-observable/ExpandVisualization';
import { OneObservableComponent } from '../one-observable/one-observable.component';

@Component({
  selector: 'app-combine-observer',
  templateUrl: './combine-observer.component.html',
  styleUrls: ['./combine-observer.component.css']
})
export class CombineObserverComponent implements OnInit, AfterViewInit {

  public combineName :string='';
  original: string = "original";
  @ViewChild('firstObs')
  private first: OneObservableComponent;
  @ViewChild('secondObs')
  public second: OneObservableComponent;
  public data1: KeyValuePairNumber[] = [];
  public data2: KeyValuePairNumber[] = [];
  public data3: KeyValuePairNumber[] = [];

  
  constructor() {
   }
   private obs: Observable<KeyValuePairNumber>;
  ngAfterViewInit(): void {

    this.first.expandVisualization= ExpandVisualization.None;
    this.second.expandVisualization= ExpandVisualization.None;
    
    this.first.showVisualization=false;
    this.second.showVisualization=false;

    var f=ObservableData.fromJSON('{"source":"fromArrayData","numberOperators":1,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"10","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2},"fromArrayData":{"StringToSplit":"Andrei,Ignat","delayBetweenMilliseconds":3000}}') ;
    var s=ObservableData.fromJSON('{"source":"fromArrayData","numberOperators":1,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"100","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2},"fromArrayData":{"StringToSplit":"1,2,3,4,5,6,7","delayBetweenMilliseconds":2000}}')    
    
    this.first.obs =new ObservableData(f);
    this.second.obs =new ObservableData(s);

  }
  private restart():[Observable<KeyValuePairNumber>,Observable<KeyValuePairNumber>]{
    this.first.obs.restartSubject();
    this.second.obs.restartSubject();
    this.data1=[];
    this.data2=[];
    this.data3=[];
    var firstObs= this.first.obs.subjectPiped.asObservable()
      .pipe(
        //startWith(unaryOperators.getNewKVP("StartFirst")),
        tap(it=>this.data1 = [...this.data1,it]),
        // endWith(unaryOperators.getNewKVP("StartFirst"))
      );
    var secondObs=this.second.obs.subjectPiped.asObservable()
    .pipe(
      //startWith(unaryOperators.getNewKVP("StartSecond")),
      tap(it=>this.data2= [...this.data2,it]),
      // endWith(unaryOperators.getNewKVP("StartFirst"))
    );

return [firstObs,secondObs];

  }
  public finishAndStart(){
    
    this.obs.subscribe({
      next: value => console.log('has coming'+value.value,value),
      error: ()=> window.alert('error from ' + this.combineName),
      complete: () => console.log('This is how it ends!'),
     });
    
    
    this.first.start();
    this.second.start();


  }

  public combineLatestOperation(){
    
    
    this.combineName="merge";
    var [firstObs,secondObs] = this.restart();
    
    this.obs = combineLatest([firstObs,secondObs]    )
    .pipe(
      //startWith(unaryOperators.getNewKVP("StartSecond")),
      map(([a,b])=> unaryOperators.getNewKVP(a.value + " "+ b.value)),
      tap(it=>this.data3= [...this.data3,it]),
      // endWith(unaryOperators.getNewKVP("StartFirst"))
    );

    this.finishAndStart();
  }

  
  public mergeOperation(){
    
    this.combineName="merge";
    var [firstObs,secondObs] = this.restart();
    

    this.obs = merge(
      firstObs,
      secondObs,
    ).pipe(
      tap(it=>this.data3= [...this.data3,it]),
    );

    this.finishAndStart();
    
  }
  public raceOperation(){
    
    this.combineName="race";
    var [firstObs,secondObs] = this.restart();
    

    this.obs = race(
      firstObs,
      secondObs,
    ).pipe(
      tap(it=>this.data3= [...this.data3,it]),
    );

    this.finishAndStart();
    
  }
  ngOnInit(): void {

  }

}
