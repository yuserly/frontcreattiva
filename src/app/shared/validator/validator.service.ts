import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
 public nombrePattern : string = '([a-zA-Z]+) ([a-zA-Z]+)';
 //public nombreUsuarioPattern : string = '([a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]+) ([a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]+)';
 public nombreUsuarioPattern : string = '([a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]+)';
 public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
 public telefonoPattern: string = '([0-9]{8})';
 public rutPattern: string = '^[0-9]+-[0-9kK]{1}$';

 public ipPattern: string = '((1[0-9]{2}|2[0-4][0-9]|25[0-5]|[1-9][0-9]|[0-9])\.){3}(1[0-9]{2}|2[0-4][0-9]|25[0-5]|[1-9][0-9]|[0-9])';
  constructor() { }

  validarRegionComuna(control: FormControl): ValidationErrors | null{
    if(control.value == 0){
      return{
        escero: true
      }
    }
    return null
  }

  validarRut(control: FormControl): ValidationErrors | null{

    let rutc:any = control.value?.trim();

    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutc )){
			return {
        errorrut: true
      };

    }

    rutc = rutc.replace('-','');// Quita Guión
    let cuerpo = rutc.slice(0,-1);// Aislar Cuerpo y Dígito Verificador
    let dv = rutc.slice(-1).toUpperCase();


      let suma = 0; // Calcular Dígito Verificador
      let multiplo = 2;

      for(let i=1;i<=cuerpo.length;i++) // Para cada dígito del Cuerpo
      {
          let index = multiplo * rutc.charAt(cuerpo.length - i); // Obtener su Producto con el Múltiplo Correspondiente
          suma = suma + index; // Sumar al Contador General
          if(multiplo < 7) {
              multiplo = multiplo + 1;
          }else{
              multiplo = 2;
          } // Consolidar Múltiplo dentro del rango [2,7]
      }

      var dvEsperado = 11 - (suma % 11); // Calcular Dígito Verificador en base al Módulo 11
      dv = (dv == 'K')?10:dv; // Casos Especiales (0 y K)
      dv = (dv == 0)?11:dv;

      if(dvEsperado != dv) {

        return {
          errorrut: true
        };

      }

    return null;

  }


}
