import { Component, OnInit } from '@angular/core';
import { DataLocalService } from 'src/app/service/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(public _storage:DataLocalService) { 
  }


  ngOnInit(){
    this.cargarF();
  }

  cargarF(){
    this._storage.cargarFavorito();
  }
}
