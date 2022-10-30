import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

import { faCamera } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  faCamera=faCamera;
  constructor(
    private router: Router,
    private tokenService: TokenService
    ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  onClick(){
    this.router.navigate(['/app-login'])
  }
  subirFoto(){
    console.log("subir foto")
  }
  onLogout(){
    this.tokenService.logOut();
    this.isLogged=false;
    window.location.reload();
  }
}
