import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import { Empresas } from '../../interfaces/ecommerce.interface';

@Component({
  selector: 'app-seleccionar-empresa',
  templateUrl: './seleccionar-empresa.component.html',
  styleUrls: ['./seleccionar-empresa.component.css']
})
export class SeleccionarEmpresaComponent implements OnInit {

  empresas:Empresas[] = [];

  constructor(private CategoriasService: CategoriasService,
    private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')!;

    if(!token){
      this.router.navigate(['/login']);
    }

    let usuario = JSON.parse(localStorage.getItem('usuario')!);

    this.CategoriasService.getempresascliente(usuario.email).subscribe(resp => {
      console.log(resp)
      this.empresas = resp.data;
    });

  }

  seleccionar(id_empresa:number){
    console.log(id_empresa)
    if(id_empresa){
      localStorage.setItem(
        'empresaselect',id_empresa.toString()
      );
      this.router.navigate(['/facturacion']);
    }
  }

}
