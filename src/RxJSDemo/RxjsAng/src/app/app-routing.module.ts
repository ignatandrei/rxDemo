import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OneObservableComponent } from './one-observable/one-observable.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, title: 'All Examples', },
  { path: 'dashboard/oneobserver',component: OneObservableComponent, title:"OneObservable"},
  { path: 'dashboard/example/oneobserver/:exampleSource/:exampleId',component: OneObservableComponent, title:"Example OneObservable"}
];

const extraOptions: ExtraOptions = {
  "enableTracing": true
 };

 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, extraOptions)
  ]
})
export class AppRoutingModule { }
