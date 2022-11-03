import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArticleComponent } from './components/article/article.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistroComponent } from './components/registro/registro.component';
import { interceptorProvider } from './interceptors/interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ArticleComponent,
    LoginComponent,
    IndexComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    FormsModule,
    NgCircleProgressModule.forRoot({
      "backgroundGradient": true,
      "backgroundColor": "#ffffff",
      "backgroundGradientStopColor": "#c0c0c0",
      "backgroundStrokeWidth": 0,
      "backgroundPadding": -10,
      "radius": 60,
      "space": 3,
      "maxPercent": 100,
      "outerStrokeWidth": 3,
      "outerStrokeColor": "#61A9DC",
      "innerStrokeColor": "#e21818",
      "innerStrokeWidth": 2,
      "subtitleColor": "#444444",
      "startFromZero": false}),
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
