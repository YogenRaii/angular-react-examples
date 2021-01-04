import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import {TranslateModule} from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, MatPaginatorIntlCro } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    // TranslateModule.forRoot()
  ],
  providers: [{provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro}],
  bootstrap: [AppComponent]
})
export class AppModule { }
