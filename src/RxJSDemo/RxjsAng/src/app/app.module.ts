import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RxVisualizerComponent } from './rx-visualizer/rx-visualizer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { OneObservableComponent } from './one-observable/one-observable.component';
import { RouterModule } from '@angular/router';
import {   MatStepperModule,} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import { CombineObserverComponent } from './combine-observer/combine-observer.component';

@NgModule({
  declarations: [
    AppComponent,
    RxVisualizerComponent,
    DashboardComponent,
    OneObservableComponent,
    CombineObserverComponent,
    
  ],
  imports: [
     MatExpansionModule,
    CdkStepperModule,
    MatFormFieldModule,
    MatStepperModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,    
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
