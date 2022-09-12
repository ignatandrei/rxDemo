import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AfterContentInit, Component } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  pipe,
  mapTo,
  map,
  Observable,
  first,
  fromEvent,
  filter,
  shareReplay,
} from 'rxjs';
import { AmsService } from './ams/ams.service';
import { AMSData } from './ams/AMSData';
import { ObsDataSerializable } from './classes/ObsDataSerializable';
import { ObservableData, SourceOfData } from './classes/ObservableData';
import { exportNumbers } from './classes/obsNumbers';
import { OperatorsUnary, unaryOperators } from './classes/unaryOperators';
import { KeyValuePairNumber, ListsService } from './lists.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterContentInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  ams: AMSData | undefined = undefined;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private amsService: AmsService
  ) {}
  showAmsVersion() {
    this.amsService.AmsDataValues().subscribe((it) => {
      console.log('amsService.AmsDataValues()', it);
      //console.log('amsService.AmsDataValues()',it.length);
      this.ams = it
        .sort((a, b) => b!.TheDate!.getDate() - a!.TheDate!.getDate())
        ?.pop();
    });
  }
  ngAfterContentInit(): void {
    this.showAmsVersion();
  }
}
