import {NgModule, LOCALE_ID} from '@angular/core';
import {DateFormatPipe} from '../../pipes/billing-date-format/date-format.pipe';

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ng2-img-cropper';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FileUploadModule} from 'ng2-file-upload/ng2-file-upload';
import {ListBillingPageComponent} from './list-billing/list-billing-page.component';
import {MSKBillingRoutingModule} from './msk-billing-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {BillingService} from './billing/billing-service';
import {ViewBillingPageComponent} from './view-billing/view-billing-page.component';

import {NgxMaskModule} from 'ngx-mask'

@NgModule({
  imports: [
    FileUploadModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,   
    MSKBillingRoutingModule,
    NgbModule,
    NgxDatatableModule,
    TranslateModule,
    ImageCropperModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    ListBillingPageComponent,
    ViewBillingPageComponent,
    DateFormatPipe
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ]
})
export class MSKBillingModule {
}
