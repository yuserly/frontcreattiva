import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaOperativo } from '../../../ecommerce/interfaces/ecommerce.interface';

@Component({
  selector: 'app-vps',
  templateUrl: './vps.component.html',
  styles: [
  ]
})
export class VpsComponent implements OnInit {

  select:number = 1;

  form:FormGroup = this.fb.group({
    os:['',Validators.required],
    version:['',Validators.required]
  })

  @Input() sistemaOperativo!:SistemaOperativo[];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  sistemaopactive(item:SistemaOperativo){
    this.select = this.form.value.os;
    console.log(this.select)
    this.sistemaOperativo.map((p,i) => {
      if(p.id_os == item.id_os){
        p["active"] = this.form.value.os;
      }else{
        p["active"] = 0;
      }
    })

  }

  guardar(){

    console.log(this.form.value)
  }

}
