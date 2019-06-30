import { AddComponent } from './add/add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowComponent } from './show/show.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {path: 'add', component: AddComponent},
  {path: 'add/:code', component: AddComponent},
  {path: 'show', component: ShowComponent},
  {path: 'overview', component: OverviewComponent},
  {path: '', redirectTo: '/add', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
