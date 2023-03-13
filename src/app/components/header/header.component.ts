import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { ImageService } from 'src/app/services/image.service';
import { ApiServicioService } from 'src/app/services/api-servicio.service';
import { info } from 'src/interface';

import { faCamera } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  faCamera = faCamera;
  public imgSrc: string = "/assets/img/default.jpg";

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

  constructor(
    private router: Router,
    private serv: ApiServicioService,
    private tokenService: TokenService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.serv.getById(1).subscribe((tarjeta: info) => { //obtiene foto perfil y acerca de
      this.imgSrc = tarjeta.imgsrc;
      this.editing = tarjeta;
      console.log("imgSrc " + this.imgSrc)
    })
  }

  onClick() {
    this.router.navigate(['/app-login'])
  }

  subirFoto(evento: any) {
    this.imageService.uploadImage(evento, "perfil");
    this.imageService.getDownloadURLById("perfil");
    console.log("imgSrc " + this.imageService.imgUrl)
    this.imageService.obtenido$.subscribe(data => { //se obtuvo la url de descarga con exito
      console.log("Se emitio evento")
      this.imgSrc = this.imageService.imgUrl;
      this.editing.imgsrc = this.imgSrc;
      this.serv.edit(1, this.editing).subscribe((tarjeta: info) => { // guardo con la nueva url en la base de datos
        console.log("editing subscibe: " + this.editing.id);
      })
    });
    /*this.imgSrc =  this.imageService.imgUrl;
    this.editing.imgsrc=this.imgSrc;
    this.serv.edit(1, this.editing).subscribe((tarjeta: info) => {
       console.log("editing subscibe: " + this.editing.id);
     })  */
  }
  onLogout() {
    this.tokenService.logOut();
    this.isLogged = false;
    window.location.reload();
  }
}
