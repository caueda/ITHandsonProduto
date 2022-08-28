import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {DropdownModule} from 'primeng/dropdown';
import {ImageModule} from 'primeng/image';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CarouselModule} from 'primeng/carousel';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CalendarModule,
    InputMaskModule,
    BrowserAnimationsModule,
    PanelModule,
    TableModule,
    MessageModule,
    MessagesModule,
    DropdownModule,
    ImageModule,
    InputNumberModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextareaModule,
    CarouselModule,
    CardModule,
    InputTextModule
  ],
  providers: [ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  bootstrap: [AppComponent]  
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap(){    
    const element = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('micro-app-produto', element);
  }
 }
