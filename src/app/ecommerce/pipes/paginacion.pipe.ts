import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'paginate'})
export class PaginationPipe implements PipeTransform {
    transform(value: any[], page:any): any {
      console.log(value, page, ...value.slice( 10*(page-1) , 10*(page) ));
        return [ ...value.slice( 10*(page) , 10*(page+1)  )]
        // return [...value]
    }
}
