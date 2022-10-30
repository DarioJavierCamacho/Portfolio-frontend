import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from '../../models/login-usuario'
import { TokenService } from '../../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario = new LoginUsuario("", "");
  nombreUsuario: string = "";
  password: string = "";
  roles: string[] = [];
  errMsj: string = "";

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onSubmit(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.username);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.toastr.success('Bienvenido ' + data.username, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error;
        if(this.errMsj==null)
          this.toastr.error("Usuario o contraseña incorrecta", 'Error', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        else
        this.toastr.error(this.errMsj, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}
