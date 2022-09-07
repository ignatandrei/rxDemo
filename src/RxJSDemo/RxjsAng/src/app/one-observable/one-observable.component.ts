import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent, share } from 'rxjs';
import { ObsDataSerializable } from '../classes/ObsDataSerializable';
import { ObservableData, SourceOfData } from '../classes/ObservableData';
import { OperatorsUnary } from '../classes/unaryOperators';
import { KeyValuePairNumber, ListsService } from '../lists.service';

@Component({
  selector: 'app-one-observable',
  templateUrl: './one-observable.component.html',
  styleUrls: ['./one-observable.component.css']
})
export class OneObservableComponent   {

  
  public sourceDatas= Object.values(SourceOfData);
  public operators = Object.values(OperatorsUnary);
  public obs: ObservableData = new ObservableData();
  public obsSer: ObsDataSerializable = new ObsDataSerializable();
  original: string = "original";
  operator: string = "operator";
    typeahead: Observable<KeyValuePairNumber>;
    searchBox: HTMLInputElement;
  
  
  constructor(public list: ListsService) {
    this.obs.list = list;
    this.obs.source= SourceOfData.netCoreGetNumbers;
    
  }
  title = 'RxjsAng';

  public start() {
    //this.searchBox = document.getElementById('search-box') as HTMLInputElement;
    //this.obs.fromTextBox = fromEvent(this.searchBox, 'input');
    //this.obs.source = SourceOfData.fromTextBox;
    //this.obs.start();
    //console.log(this.searchBox);
    //var x = fromEvent(this.searchBox, 'input');
    //this.typeahead=x.pipe(
    //  map(e => {
    //    var kvp = new KeyValuePairNumber();
    //    kvp.value = (e.target as HTMLInputElement).value;
    //    kvp.key = e.timeStamp;
    //    return kvp;
    //  }),
    //  //filter(text => text.length > 2),
    //  //debounceTime(10),
    //  //distinctUntilChanged(),
    //  //switchMap(searchTerm => ajax(`/api/endpoint?search=${searchTerm}`))
    //  tap(it => console.log(it))
    //);
    //this.typeahead.subscribe();
    //this.obs.source = SourceOfData.netCoreGetNumbers;
    console.log(this.obs.toJson());
    this.obs = new ObservableData(this.obs);
    
    this.constructAndStart();
  }
  public loadExampleNumbers(k: string) {
    this.obs = new ObservableData(this.obsSer.NumberData(k));
   this.constructAndStart();
    
  }
  public loadExampleTextBox(k: string) {
    this.obs = new ObservableData(this.obsSer.TextData(k));
   this.constructAndStart();
   setTimeout(() => {
    this.searchBox.focus(); 
   }, 1000);
   
    
  }
  private constructAndStart(){
    this.obs.list = this.list;
    this.searchBox = document.getElementById('search-box') as HTMLInputElement;
    this.obs.fromTextBox = fromEvent(this.searchBox, 'input')
      .pipe(share());
    ;
    this.obs.start();
  }
  
}
