import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent   {
  @Input() enfavoritos:boolean = false;
  @Input() noticias: Article[] = [];

  constructor() { }


}
