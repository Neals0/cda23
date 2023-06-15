import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompteurComponent } from './compteur/compteur.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { Error404Component } from './pages/error404/error404.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditionUtilisateurComponent } from './pages/edition-utilisateur/edition-utilisateur.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './jwt.interceptor';
import { Error403Component } from './pages/error403/error403.component';
import { MatSelectModule } from '@angular/material/select';
import { FullNamePipe } from './pipes/fullname.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CompteurComponent,
    AccueilComponent,
    ConnexionComponent,
    Error404Component,
    EditionUtilisateurComponent,
    Error403Component,
    FullNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
