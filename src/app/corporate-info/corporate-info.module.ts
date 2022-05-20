import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateInfoComponent } from './corporate-info.component';
import { CorporateInfoRoutingModule } from './corporate-info-routing.module';



@NgModule({
  declarations: [
    CorporateInfoComponent
  ],
  imports: [
    CommonModule,
    CorporateInfoRoutingModule
  ]
})
export class CorporateInfoModule { }
