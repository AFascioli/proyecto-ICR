import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatTableModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatSnackBarModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMenuModule } from "@angular/material/menu";
import { AppComponent } from "./app.component";
import {
  AltaEstudiantesComponent,
  AltaPopupComponent,
} from "./estudiantes/alta-estudiantes/alta-estudiantes.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { EstudiantesService } from "./estudiantes/estudiante.service";
import { BuscarEstudiantesComponent, BuscarPopupComponent } from "./estudiantes/buscar-estudiantes/buscar-estudiantes.component";
import { ListaEstudiantesComponent, AccionesEstudiantePopupComponent } from "./estudiantes/lista-estudiantes/lista-estudiantes.component";
import {
  MostrarEstudiantesComponent,
  MostrarPopupComponent
} from "./estudiantes/mostrar-estudiantes/mostrar-estudiantes.component";
import { AppRoutingModule } from "./app-routing.module";
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";
import { MenuLateralComponent } from "./menu-lateral/menu-lateral.component";
import { HomeComponent } from "./home/home.component";
import {
  RegistrarAsistenciaComponent,
  AsistenciaPopupComponent
} from "./asistencia/registrar-asistencia/registrar-asistencia.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { InscripcionEstudianteComponent, InscripcionPopupComponent } from './estudiantes/inscripcion-estudiantes/inscripcion-estudiantes.component';
import { RetiroAnticipadoComponent, RetiroPopupComponent } from './asistencia/retiro-anticipado/retiro-anticipado.component';
import { DocumentosInscripcionComponent, DocumentosInscripcionPopupComponent } from './estudiantes/documentos-inscripcion/documentos-inscripcion.component';
import { CalificacionesEstudiantesComponent } from './estudiantes/calificaciones-estudiantes/calificaciones-estudiantes.component';

@NgModule({
  declarations: [
    AppComponent,
    AltaEstudiantesComponent,
    BuscarEstudiantesComponent,
    ListaEstudiantesComponent,
    MostrarEstudiantesComponent,
    AltaPopupComponent,
    MostrarPopupComponent,
    MenuPrincipalComponent,
    MenuLateralComponent,
    HomeComponent,
    RegistrarAsistenciaComponent,
    AsistenciaPopupComponent,
    BuscarPopupComponent,
    InscripcionEstudianteComponent,
    InscripcionPopupComponent,
    AccionesEstudiantePopupComponent,
    RetiroAnticipadoComponent,
    RetiroPopupComponent,
    DocumentosInscripcionComponent,
    DocumentosInscripcionPopupComponent,
    CalificacionesEstudiantesComponent
  ],
  //entryComponents declara los componentes que se generan dinamicamente dentro de otros.
  entryComponents: [
    AltaPopupComponent,
    MostrarPopupComponent,
    AsistenciaPopupComponent,
    BuscarPopupComponent,
    InscripcionPopupComponent,
    AccionesEstudiantePopupComponent,
    RetiroPopupComponent,
    DocumentosInscripcionPopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSidenavModule,
    AppRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [EstudiantesService],
  bootstrap: [AppComponent]
})

export class AppModule {}