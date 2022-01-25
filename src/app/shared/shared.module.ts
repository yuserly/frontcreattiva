import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivecardDirective } from './directives/activecard.directive';



@NgModule({
  declarations: [
    ActivecardDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ActivecardDirective
  ]
})
export class SharedModule { }
