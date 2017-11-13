import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
import { TableRowComponent } from './table-row/table-row.component';

import { FsaApiService } from './fsa-api.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    TableComponent,
    TableRowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [FsaApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
