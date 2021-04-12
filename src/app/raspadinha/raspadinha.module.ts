import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RaspadinhaPage } from './raspadinha.page';

const routes: Routes = [
  {
    path: '',
    component: RaspadinhaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RaspadinhaPage]
})
export class RaspadinhaPageModule {}
