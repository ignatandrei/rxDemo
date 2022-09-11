import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes, TitleStrategy } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OneObservableComponent } from './one-observable/one-observable.component';
import { TemplatePageTitleStrategy } from './classes/TitleStrategy';
import { CombineObserverComponent } from './combine-observer/combine-observer.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, title: 'All Examples', },
  { path: 'dashboard/oneobserver',component: OneObservableComponent, title:"OneObservable"},
  { path: 'dashboard/twoObservers',component: CombineObserverComponent, title:"MultiObservers"},
 
  { path: 'dashboard/example/oneobserver/:exampleSource/:exampleId',component: OneObservableComponent}
];

const extraOptions: ExtraOptions = {
  "enableTracing": true
 };

 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, extraOptions)
  ],
  providers: [
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
  ]
})
export class AppRoutingModule { }
