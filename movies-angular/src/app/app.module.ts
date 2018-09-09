import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//pages

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

// components

import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieDetailPageComponent } from './pages/movie-detail-page/movie-detail-page.component';
import { MovieCreatePageComponent } from './pages/movie-create-page/movie-create-page.component';
import { MovieEditPageComponent } from './pages/movie-edit-page/movie-edit-page.component';


//services

import { MovieService } from './services/movie.service';
import { AuthService } from './services/auth.service';

// guards


import { RequireAnonGuardService } from './guards/require-anon-guard.service';
import { RequireUserGuardService } from './guards/require-user-guard.service';
import { InitAuthGuardService } from './guards/init-auth-guard.service';

// routes

const routes: Routes = [
  { path: '',  component: HomePageComponent, canActivate: [ InitAuthGuardService ] }, // initAUth always returns true. Purpose is that if you refresh, there wouldn't be a guard.Otherwise the header won't know if there is a user logged in (As soon as the app loads).
  { path: 'login',  component: LoginPageComponent, canActivate: [ RequireAnonGuardService ] },
  { path: 'signup',  component: SignupPageComponent, canActivate: [ RequireAnonGuardService ] },
  { path: 'movies/create', component: MovieCreatePageComponent, canActivate: [RequireUserGuardService] },
  { path: 'movies/:id', component: MovieDetailPageComponent, canActivate: [ InitAuthGuardService] },
  { path: 'movies/:id/edit', component: MovieEditPageComponent, canActivate: [RequireUserGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MovieCardComponent,
    MovieDetailPageComponent,
    MovieCreatePageComponent,
    MovieFormComponent,
    MovieEditPageComponent,
    LoginPageComponent,
    SignupPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule 
  ],
  providers: [
    MovieService,
    AuthService,
    RequireAnonGuardService,
    RequireUserGuardService,
    InitAuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
