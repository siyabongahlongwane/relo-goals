import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from './modules/material/material.module';
import { ListTrackerComponent } from './list-tracker/list-tracker.component';
import { GenericDialogComponent } from './generic-dialog/generic-dialog.component';
import { AngularFireModule } from '@angular/fire/compat';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from "../environments/environment";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, CounterComponent, BucketListComponent, ToolbarComponent, ListTrackerComponent, GenericDialogComponent, ConfirmDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
