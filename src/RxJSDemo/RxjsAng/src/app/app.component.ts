import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { debounceTime,distinctUntilChanged,switchMap, tap, pipe, mapTo, map, Observable, first, fromEvent, filter, shareReplay } from 'rxjs';
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
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

constructor(private breakpointObserver: BreakpointObserver) {}
}
