import { Component, OnInit } from '@angular/core';
import { ApiServicioService } from 'src/app/services/api-servicio.service';
import { info } from 'src/interface';
import { TokenService } from '../../services/token.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  faPen = faPen;
  faXmark = faXmark;

  public experiencia: info[] = []
  public educacion: info[] = []
  public hys: info[] = []
  public proyectos: info[] = []
  roles: string[] = [];
  isAdmin = false;

  public flag: boolean = false;

  constructor(
    private serv: ApiServicioService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.obtenerTarjetas();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  obtenerTarjetas(): void {
    this.serv.getMessage().subscribe((tarjeta:info[]) => {
      this.experiencia = tarjeta.filter(tarj => tarj.tipo == 1)
      this.educacion = tarjeta.filter(tarj => tarj.tipo == 2)
      this.hys = tarjeta.filter(tarj => tarj.tipo == 3)
      this.proyectos= tarjeta.filter(tarj => tarj.tipo == 4)
      this.flag = true
    }
    )
  }

  onEliminar(id: number){
    console.log("onEliminar"+"?id="+id);
    this.serv.delete(id).subscribe(data =>{
      console.log(data);
    },
    err =>{
    console.log(err.error);
  });
  }
  onEditar(id: number){
    console.log("onEditar"+id);
  }
}
