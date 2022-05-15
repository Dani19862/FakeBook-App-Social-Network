import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  imports: [
    NgxGalleryModule,
    CommonModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgxSpinnerModule,
    FileUploadModule


  ],
  declarations: [],

  exports: [

    NgxGalleryModule,
    TabsModule,
    BsDropdownModule,
    NgxSpinnerModule,
    ToastrModule,
    FileUploadModule
  ]
})
export class SharedModule { }
