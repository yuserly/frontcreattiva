import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  objEstilos:any = {}
  @Input() footerabsolute!:boolean;

  constructor() { }

  ngOnInit(): void {

    if(this.footerabsolute){
      this.objEstilos = {'position':'absolute','width':'100%','left.px':'0','bottom.px':'0'}
    }else{
      this.objEstilos = {}
    }
  }

}
