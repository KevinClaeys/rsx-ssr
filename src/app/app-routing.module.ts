import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/news', pathMatch: 'full'
  },
  {
    path: 'corporate', loadChildren: () => import('./corporate-info/corporate-info.module').then(m => m.CorporateInfoModule),
  },
  {
    path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
