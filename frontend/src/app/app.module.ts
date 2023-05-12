import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AddJobItemComponent } from './components/add-jobitem/add-jobitem.component';
import { JobItemDetailComponent } from './components/jobitem-detail/jobitem-detail.component';
import { JobItemsListComponent } from './components/jobitems-list/jobitems-list.component';

import { ImportCSVComponent } from './components/import-csv/import-csv.component';
import { ExportCSVComponent } from './components/export-csv/export-csv.component';

@NgModule({
  declarations: [
    AppComponent,
    AddJobItemComponent,
    JobItemDetailComponent,
    JobItemsListComponent,
    ImportCSVComponent,
    ExportCSVComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
