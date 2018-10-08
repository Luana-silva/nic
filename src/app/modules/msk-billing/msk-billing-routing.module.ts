import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListBillingPageComponent} from './list-billing/list-billing-page.component';
import {ViewBillingPageComponent} from './view-billing/view-billing-page.component';


const routes: Routes = [
  {
    path: 'billing',
    children: [
      {
        path: 'list',
        component: ListBillingPageComponent
      },
      {
        path: 'listConfirm',
        component: ListBillingPageComponent
      },
      {
        path: 'view/:id',
        component: ViewBillingPageComponent
      },
      {
        path: 'viewConfirm/:id',
        component: ViewBillingPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MSKBillingRoutingModule { }
