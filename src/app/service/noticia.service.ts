import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private http = inject(HttpClient)
  paginado:number = 0;
  categoriaActual:string = '';
  categoriaPage:number=0


  constructor() { }

  getNoticia():Observable <any>{
    this.paginado ++;
    return this.http.get('https://newsapi.org/v2/top-headlines?country=us&page='+ this.paginado + '&apiKey=f17fffb49fd54d689be32c67698915e2');
  }

  getGeneral(categoria:string):Observable<any>{
    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.http.get('https://newsapi.org/v2/top-headlines?country=us&category=' + categoria + '&page='+ this.categoriaPage +'&apiKey=f17fffb49fd54d689be32c67698915e2');
  }

}
