import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit {

  @Input() page!: number;

  active = 0;

  pages: any[] = [];

  constructor() {
    this.pages = Array(5).fill(0).map((x, i) => i);
    this.pages.pop()

  }

  ngOnInit(): void {}

  get currentPage (){
    return this.active;
  }
}
