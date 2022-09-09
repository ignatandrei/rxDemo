import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, fromEvent, share, tap } from 'rxjs';
import { ObsDataSerializable } from '../classes/ObsDataSerializable';
import { ObservableData, SourceOfData } from '../classes/ObservableData';
import { OperatorsUnary } from '../classes/unaryOperators';
import { KeyValuePairNumber, ListsService } from '../lists.service';

@Component({
  selector: 'app-one-observable',
  templateUrl: './one-observable.component.html',
  styleUrls: ['./one-observable.component.css']
})
export class OneObservableComponent implements OnInit {

  public showVisualization:boolean=false;
  public sourceDatas= Object.values(SourceOfData);
  public operators = Object.values(OperatorsUnary);
  public obs: ObservableData = new ObservableData();
  public obsSer: ObsDataSerializable = new ObsDataSerializable();
  original: string = "original";
  operator: string = "operator";
    typeahead: Observable<KeyValuePairNumber>;
    searchBox: HTMLInputElement;
  
  public exampleID: string| null = null;
  public exampleSource: string| null = null;

  constructor(public list: ListsService, private route: ActivatedRoute) {
    this.obs.list = list;
    this.obs.source= SourceOfData.netCoreGetNumbers;
    this.route.paramMap.pipe(
      tap(params => {
        this.exampleID = params.get('exampleId');
        this.exampleSource = params.get('exampleSource');
        
      })
    ).subscribe();
    
  }
  ngOnInit(): void {
    if((this.exampleSource ||'').length == 0)
      return;
      this.obs.source = this.sourceDatas.find(it=> it.toLowerCase() == this.exampleSource.toLowerCase());
      switch(this.obs.source){
        case SourceOfData.fromTextBox:
          this.loadExampleTextBox(this.exampleID);
          return;
          case SourceOfData.netCoreGetNumbers:
            this.loadExampleNumbers(this.exampleID);
            return;
          default:
            window.alert("not such " + this.obs.source);
            return;
        }
  }


  private urlCountries:string|null=null;
  public get urlAPI(){
    switch(this.obs.source){
      case SourceOfData.netCoreGetNumbers:
        return this.list.urlNumbers(this.obs.startNumbers.fromNumber, this.obs.startNumbers.count, this.obs.startNumbers.repeat, this.obs.startNumbers.delaySec * 1000);
      case SourceOfData.fromTextBox:
          return "example:"+this.list.urlCountries("ro", 2000);
  
        default:
        window.alert(`please add ${this.obs.source}`);
    }

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
    this.exampleID = k;
    this.exampleSource= this.obs.source;
    this.obs = new ObservableData(this.obsSer.NumberData(k));
   this.constructAndStart();
    
  }
  public loadExampleTextBox(k: string) {
    this.exampleID = k;
    this.exampleSource= this.obs.source;
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
    this.showVisualization=true;
    this.obs.start();
  }
  
}
