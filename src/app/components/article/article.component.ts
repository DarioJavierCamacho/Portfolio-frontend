import { Component, OnInit } from '@angular/core';
import { ApiServicioService } from 'src/app/services/api-servicio.service';
import { info } from 'src/interface';
import { TokenService } from '../../services/token.service';
import { faInfo, faPen } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  faPen = faPen;
  faXmark = faXmark;
  faPlus = faPlus;

  imageDefault: string = "/assets/img/default.jpg"
  public experiencia: info[] = []
  public educacion: info[] = []
  public hys: info[] = []
  public proyectos: info[] = []
  roles: string[] = [];
  isAdmin = false;

  editingTitulo: string = "";
  editingSubtitulo: string = "";
  editingImagen: string = "";
  editingPercent: number = 0;
  editingFInicio: string = "";
  editingFFinal: string = "";
  editingTipo = 0;

  campo: string = "";
  titulo: string = "";
  subtitulo: string = "";

  isAdding = false;
  isEditing = false;
  public editing: info = {
    id: 0,
    titulo: '',
    subtitulo: '',
    imgsrc: '',
    tipo: 0,
    percent: 0,
    fInicio: "",
    fFin: ""
  };

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
    this.serv.getMessage().subscribe((tarjeta: info[]) => {
      this.experiencia = tarjeta.filter(tarj => tarj.tipo == 1)
      this.educacion = tarjeta.filter(tarj => tarj.tipo == 2)
      this.hys = tarjeta.filter(tarj => tarj.tipo == 3)
      this.proyectos = tarjeta.filter(tarj => tarj.tipo == 4)
      this.flag = true
    }
    )
  }

  onEliminar(id: number) {
    console.log("onEliminar" + "?id=" + id);
    this.serv.delete(id).subscribe(data => {
      console.log(data);
      window.location.reload();
    },
      err => {
        console.log(err.error);
      });
  }
  onEditar(id: number) {
    console.log("onEditar" + id);
    this.serv.getById(id).subscribe((tarjeta: info) => {
      this.isEditing = true;
      this.editingTitulo = tarjeta.titulo;
      this.editingSubtitulo = tarjeta.subtitulo;
      this.editingTipo = tarjeta.tipo;
      this.editingImagen = this.imageDefault;
      this.editingPercent = tarjeta.percent;
      this.editingFInicio = tarjeta.fInicio;
      this.editingFFinal = tarjeta.fFin;
      this.editing = tarjeta;
      switch (this.editingTipo) {
        case 1: {// experiencia
          this.campo = "experiencia"
          this.titulo = "Puesto"
          this.subtitulo = "Establecimiento"
          break;
        }
        case 2: {//Educacion
          this.campo = "Educacion"
          this.titulo = "Titulo"
          this.subtitulo = "Establecimiento"
          break
        }
        case 3: { //Hard y soft skills
          this.campo = "Habilidad"
          this.titulo = "Habilidad"
          break
        }
        case 4: { //proyectos
            this.campo= "Proyecto"
            this.titulo= "Nombre del proyecto"
            this.subtitulo = "Enlace al proyecto"
            break
        }
        default:{
          break
        }
      }
      
      // console.log("editing: " + this.editingTitulo);

    });


  }

  onAgregar(tipo: number) {
    // console.log("onEditar"+id);
    switch (tipo) {
      case 1: {// experiencia
        this.campo = "experiencia"
        this.titulo = "Puesto"
        this.subtitulo = "Establecimiento"
        break;
      }
      case 2: {//Educacion
        this.campo = "Educacion"
        this.titulo = "Titulo"
        this.subtitulo = "Establecimiento"
        break
      }
      case 3: { //Hard y soft skills
        this.campo = "Habilidad"
        break
      }
      case 4: { //proyectos
          this.campo= "Proyecto"
          this.titulo= "Nombre del proyecto"
          this.subtitulo = "Enlace al proyecto"
          break
      }
      default:{
        break
      }
    }
    this.isAdding = true;
    this.editing.tipo = tipo;
    this.editingTipo = tipo;
    console.log("onagreg")

  }

  onAddingOk() {
    this.editing.subtitulo = this.editingSubtitulo;
    this.editing.titulo = this.editingTitulo;
    this.editing.imgsrc = this.imageDefault;
    this.editing.fInicio = this.editingFInicio;
    this.editing.fFin = this.editingFFinal;
    this.editing.percent = this.editingPercent;
    this.serv.add(this.editing).subscribe((data: any) => {
      window.location.reload();
    });
  }

  onEditOk() {

    this.editing.subtitulo = this.editingSubtitulo;
    this.editing.titulo = this.editingTitulo;
    this.editing.tipo = this.editingTipo;
    this.editing.imgsrc = this.editingImagen;
    this.editing.fInicio = this.editingFInicio;
    this.editing.fFin = this.editingFFinal;
    this.editing.percent = this.editingPercent;
    console.log("oneditok" + this.editing.id + this.editing.titulo)
    this.serv.edit(this.editing.id, this.editing).subscribe((tarjeta: info) => {
      console.log("editing subscibe: " + this.editing.fFin + this.editing.fInicio);
      window.location.reload();
    });

  }

  onCancelar() {
    //console.log("oncancelar")
    window.location.reload();
  }
}
