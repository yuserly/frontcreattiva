import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appActivecard]'
})
export class ActivecardDirective implements OnInit {

  htmlElement: ElementRef<HTMLElement>
  private _seleccionado:number = 0;
  id:any = 0;

  @Input() set seleccionado(valor:number){
    this._seleccionado = valor;
    this.id = this.htmlElement.nativeElement.getAttribute('id');


    if(this._seleccionado == this.id){

      console.log(this.htmlElement.nativeElement.classList.remove('plan-active'))

      this.htmlElement.nativeElement.classList.add('plan-active')

    }else{

    }
  }


  constructor(private el:ElementRef<HTMLElement>) {
    this.htmlElement = el;
   }

  ngOnInit(): void {
  }



}
