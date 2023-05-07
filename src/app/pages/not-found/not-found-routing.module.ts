import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [{ path: '', component: NotFoundComponent }]; //azért van path:'', mert mar az osben megadtunk egy path-ot és megint már újat nem akarunk

@NgModule({
  imports: [RouterModule.forChild(routes)], //forchild- gyermeke az app routingnak
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }
