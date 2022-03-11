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

  seleccionar(empresa:Empresas){
    console.log(empresa)


    if(empresa){
      let datauser = JSON.parse(localStorage.getItem('usuario')!);

      let usuario = {
        nombre: datauser.nombre,
        email: datauser.email,
        razonsocial:empresa.razonsocial
      }

      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem(
        'empresaselect',empresa.toString()
      );
      let carrito = JSON.parse(localStorage.getItem('carrito')!);

      if(!carrito || carrito.length == 0){
        this.router.navigate(['/sucursal']);
      }else{
        this.router.navigate(['/facturacion']);
      }
    }
  }

}
