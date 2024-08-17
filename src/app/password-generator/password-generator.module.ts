import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordGeneratorPageRoutingModule } from './password-generator-routing.module';

import { PasswordGeneratorPage } from './password-generator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordGeneratorPageRoutingModule
  ],
  declarations: [PasswordGeneratorPage]
})
export class PasswordGeneratorPageModule {}
