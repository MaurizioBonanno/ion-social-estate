import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HomePopoverComponent } from './../home-popover/home-popover.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, HomePopoverComponent],
  entryComponents: [HomePopoverComponent]
})
export class HomePageModule {}
