import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { combineLatest, forkJoin, merge, Observable, tap } from 'rxjs';
import { ObservableData } from '../classes/ObservableData';
import { KeyValuePairNumber } from '../lists.service';
import { OneObservableComponent } from '../one-observable/one-observable.component';

@Component({
  selector: 'app-combine-observer',
  templateUrl: './combine-observer.component.html',
  styleUrls: ['./combine-observer.component.css']
})
export class CombineObserverComponent implements OnInit, AfterViewInit {

  original: string = "original";
  @ViewChild('firstObs')
  private first: OneObservableComponent;
  @ViewChild('secondObs')
  public second: OneObservableComponent;
  public dataFor: KeyValuePairNumber[] = [];
  public dataForOneOperator: KeyValuePairNumber[] = [];

  
  constructor() {
   }
   private obs: Observable<KeyValuePairNumber>;
  ngAfterViewInit(): void {
    this.first.showVisualization=false;
    this.second.showVisualization=false;
    
    var f=ObservableData.fromJSON('{"source":"fromArrayData","numberOperators":1,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"10","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2},"fromArrayData":{"StringToSplit":"Andrei,Ignat","delayBetweenMilliseconds":2000}}') ;
    var s=ObservableData.fromJSON('{"source":"fromArrayData","numberOperators":1,"whatOperator":[{"operatorToApply":"startWith","valueToApply":"10","functionToApply":"numberToTake"}],"startNumbers":{"fromNumber":2,"count":7,"repeat":1,"delaySec":2},"fromArrayData":{"StringToSplit":"1,2,3,4,5,6,7","delayBetweenMilliseconds":1000}}')    
    
    this.first.obs =new ObservableData(f);
    this.second.obs =new ObservableData(s);
    var firstObs= this.first.obs.subjectPiped.asObservable()
      .pipe(
        tap(it=>this.dataFor = [...this.dataFor,it])
      );
    var secondObs=this.second.obs.subjectPiped.asObservable()
    .pipe(
      tap(it=>this.dataForOneOperator = [...this.dataForOneOperator,it])
    );
    this.obs = merge(
      firstObs,
      secondObs,
    );
    // this.obs = combineLatest(
    //   this.first.obs.subjectPiped.asObservable(),
    //   this.second.obs.subjectPiped.asObservable(),
    // );

    this.obs.subscribe({
      next: value => console.log('has coming'+value.value,value),
      complete: () => console.log('This is how it ends!'),
     });
    
    
    this.first.start();
    this.second.start();
  }

  ngOnInit(): void {

  }

}
