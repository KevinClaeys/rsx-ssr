import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { ContentfulService } from '../services/contentful.service';
import { FaketentfulService } from '../services/faketentful.service';
import { contentfulServiceProvider } from './context.service.provider';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule
  ],
  providers: [contentfulServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
