import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateInfoComponent } from './corporate-info.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateInfoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateInfoRoutingModule { }
