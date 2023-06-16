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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { ProdutoFormComponent } from './produto/produto-form/produto-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoEditComponent } from './produto/produto-edit/produto-edit.component';
import { ProdutoComponent } from './produto/produto/produto.component';
import { ProdutoConsultaComponent } from './produto/produto-consulta/produto-consulta.component';

const appRoutes: Routes = [
  {path: 'produto', redirectTo: '/produto/cadastrar', pathMatch: 'full'},
  { path: 'produto/cadastrar', component: ProdutoComponent },
  { path: 'produto/consultar', component: ProdutoConsultaComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AlertMessageComponent,
    ProdutoFormComponent,
    ProdutoEditComponent,
    ProdutoComponent,
    ProdutoConsultaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
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
    InputTextModule,
    RouterModule.forRoot(appRoutes)
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
