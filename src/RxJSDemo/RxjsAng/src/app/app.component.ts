import { Component } from '@angular/core';
import { debounceTime,distinctUntilChanged,switchMap, tap, pipe, mapTo, map, Observable, first, fromEvent, filter } from 'rxjs';
import { ObsDataSerializable } from './classes/ObsDataSerializable';
import { ObservableData, SourceOfData } from './classes/ObservableData';
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
  public obs: ObservableData = new ObservableData();
  public obsSer: ObsDataSerializable = new ObsDataSerializable();
  original: string = "original";
  operator: string = "operator";
    typeahead: Observable<KeyValuePairNumber>;
    searchBox: HTMLInputElement;
  
  
  constructor(public list: ListsService) {
    this.obs.list = list;
    
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
    this.obs.source = SourceOfData.netCoreGetNumbers;
    console.log(this.obs.toJson());
    this.obs.start();
  }
  public loadExample(k: string) {
    this.obs = new ObservableData(this.obsSer.Data.get(k));
    this.obs.list = this.list;
    this.searchBox = document.getElementById('search-box') as HTMLInputElement;
    this.obs.fromTextBox = fromEvent(this.searchBox, 'input');

    this.obs.start();
  }
  
}

