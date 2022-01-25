import { Component, OnInit } from '@angular/core';
import { DominiosService } from '../../../ecommerce/services/dominios.service';

@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styles: [
  ]
})
export class HostingComponent implements OnInit {

  constructor(private DominiosService:DominiosService) { }

  ngOnInit(): void {
  //   console.log(this.mostrar)
  //  this.DominiosService.gettoken().subscribe( resp => {
  //    console.log(resp)
  //  })

  }



}
