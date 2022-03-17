import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import { switchMap } from 'rxjs/operators';
import { Carrito } from '../../interfaces/ecommerce.interface';

@Component({
  selector: 'app-configuracion-producto',
  templateUrl: './configuracion-producto.component.html',
  styleUrls: ['./configuracion-producto.component.css'],
})
export class ConfiguracionProductoComponent implements OnInit {
  productocarro: boolean = false;

  constructor(
    private routeparams: ActivatedRoute,
    private CategoriasService: CategoriasService
  ) {
    this.routeparams.params
      .pipe(
        switchMap(({ slug }) => this.CategoriasService.getproductosxslug(slug))
      )
      .subscribe((resp) => {
        if (localStorage.getItem('carrito')) {
          let carro: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

          carro.forEach((element, i) => {
            if (element.producto.id_producto == resp.id_producto) {
              let index = i;
              localStorage.setItem('index', JSON.stringify(index));
              this.productocarro = true;
            }
          });
        } else {
          let carro: Carrito[] = [];

          let periodoselect = 0;

          this.CategoriasService.getperiodos(resp.id_producto).subscribe(
            (resp2) => {
              resp2.forEach((element) => {
                if (element.preseleccionado == 1) {
                  periodoselect = element.id_periodo;
                }
              });

              carro.push({
                producto: resp,
                periodo: periodoselect,
                dominio: '',
                sistemaoperativo: 0,
                versionsistema: 0,
                administrar: 0,
                ip: '',
                periodos: resp2,
                cantidad: 1,
                cupon_descuento: 0,
              });

              const cantidadcarro = carro.length;
              const index = cantidadcarro - 1;

              localStorage.setItem('index', JSON.stringify(index));
              localStorage.setItem('carrito', JSON.stringify(carro));

              this.productocarro = true;
            }
          );
        }
      });
  }

  ngOnInit(): void {}
}
