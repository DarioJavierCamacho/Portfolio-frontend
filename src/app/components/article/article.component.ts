import { Component, OnInit } from '@angular/core';
import { ApiServicioService } from 'src/app/services/api-servicio.service';
import { info } from 'src/interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  
  public variable: info []= []/*{
    id: 0 ,
    titulo: "titulo falso",
    subtitulo: "",
    imgsrc: "",
    tipo: ""
  };*/
  public flag: boolean= false;

  constructor(private serv:ApiServicioService) { }

  ngOnInit(): void {
    this.serv.getMessage().subscribe((variable)=>{
      this.variable=variable
      this.flag=true
      console.log(this.flag)
      console.log(this.variable[0].titulo)
      }
      )
  }

}
