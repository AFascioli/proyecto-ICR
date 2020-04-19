import { ReadMoreComponent } from "./eventos/visualizar-evento/read-more.component";
import { AuthInterceptor } from "./login/auth-interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
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
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatChipsModule,
  MatInputModule,
  MatPaginatorIntl,
} from "@angular/material";
// import { MatIconRegistry } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMenuModule } from "@angular/material/menu";
import { AppComponent } from "./app.component";
import { AltaEstudiantesComponent } from "./estudiantes/alta-estudiantes/alta-estudiantes.component";
import { CancelPopupComponent } from "./popup-genericos/cancel-popup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { MatTableExporterModule } from 'mat-table-exporter';
import { EstudiantesService } from "./estudiantes/estudiante.service";
import {
  BuscarEstudiantesComponent,
  BuscarPopupComponent,
} from "./estudiantes/buscar-estudiantes/buscar-estudiantes.component";
import { ListaEstudiantesComponent } from "./estudiantes/lista-estudiantes/lista-estudiantes.component";
import {
  MostrarEstudiantesComponent,
  MostrarPopupComponent,
} from "./estudiantes/mostrar-estudiantes/mostrar-estudiantes.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./login/login.component";
import {
  MenuLateralComponent,
  CerrarSesionPopupComponent,
} from "./menu-lateral/menu-lateral.component";
import { HomeComponent } from "./home/home.component";
import {
  RegistrarAsistenciaComponent,
  AsistenciaPopupComponent,
} from "./asistencia/registrar-asistencia/registrar-asistencia.component";
import { MatExpansionModule } from "@angular/material/expansion";
import {
  InscripcionEstudianteComponent,
  InscripcionPopupComponent,
} from "./inscripcion/inscripcion-estudiantes/inscripcion-estudiantes.component";
import {
  RetiroAnticipadoComponent,
  RetiroPopupComponent,
} from "./asistencia/retiro-anticipado/retiro-anticipado.component";
import { DocumentosInscripcionComponent } from "./inscripcion/documentos-inscripcion/documentos-inscripcion.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { CalificacionesEstudiantesComponent } from "./calificaciones/calificaciones-estudiantes/calificaciones-estudiantes.component";
import { CalificacionesCicloLectivoComponent } from "./calificaciones/calificaciones-ciclo-lectivo/calificaciones-ciclo-lectivo.component";
import { LlegadaTardeComponent } from "./asistencia/llegada-tarde/llegada-tarde.component";
import {
  CambiarPassword,
  CambiarPasswordPopupComponent,
} from "./login/cambiar-password.component";
import {
  PerfilEstudianteComponent,
  PerfilEstudiantePopupComponent,
} from "./perfil-estudiante/perfil-estudiante.component";
import { CalificacionesPerfilEstudianteComponent } from "./perfil-estudiante/calificaciones-perfil-estudiante/calificaciones-perfil-estudiante.component";
import { AgendaCursoPerfilEstudianteComponent } from "./perfil-estudiante/agenda-curso-perfil-estudiante/agenda-curso-perfil-estudiante.component";
import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import { ChartsModule } from "ng2-charts";
registerLocaleData(localePy, "es");
import localePy from "@angular/common/locales/es";
import { JustificacionInasistenciaComponent } from "./asistencia/justificacion-inasistencia/justificacion-inasistencia.component";
import {
  AltaAdultoResponsableComponent,
  AltaAdultoResponsablePopupComponent,
} from "./adulto-responsable/alta-adulto-responsable/alta-adulto-responsable.component";
import {
  AltaEmpleadoComponent,
  AltaEmpleadoPopupComponent,
} from "./empleado/alta-empleado/alta-empleado.component";
import {
  PreferenciasComponent,
  PreferenciasPopupComponent,
} from "./menu-lateral/preferencias/preferencias.component";
import { BorrarPopupComponent } from "./home/home.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { InasistenciasEstudianteComponent } from "./perfil-estudiante/inasistencias-estudiante/inasistencias-estudiante.component";
import { TutoresEstudianteComponent } from "./perfil-estudiante/tutores-estudiante/tutores-estudiante.component";
import { DatosEstudianteComponent } from "./perfil-estudiante/datos-estudiante/datos-estudiante.component";
import { CuotasPerfilEstudianteComponent } from "./perfil-estudiante/cuotas-perfil-estudiante/cuotas-perfil-estudiante.component";
import { CalificacionesExamenesComponent } from "./calificaciones/calificaciones-examenes/calificaciones-examenes.component";
import { RegistrarEventoComponent } from "./eventos/registrar-evento/registrar-evento.component";
import { getDutchPaginatorIntl } from "./calificaciones/calificaciones-estudiantes/calificaciones-estudiantes.component";
import { ModificarEventoComponent } from "./eventos/modificar-evento/modificar-evento.component";
import { VisualizarEventoComponent } from "./eventos/visualizar-evento/visualizar-evento.component";
import { MatCarouselModule } from "@ngmodule/material-carousel";
import { VisualizarAgendaComponent } from "./agenda/visualizar-agenda/visualizar-agenda.component";
import { RegistrarCuotasComponent } from "./cuotas/registrar-cuotas/registrar-cuotas.component";
import {
  DefinirAgendaComponent,
  AgendaPopupComponent,
} from "./agenda/definir-agenda/definir-agenda.component";
import { RegistrarSancionesComponent } from "./sanciones/registrar-sanciones/registrar-sanciones.component";
import { SancionesEstudianteComponent } from "./perfil-estudiante/sanciones-estudiante/sanciones-estudiante.component";
import { ErrorInterceptor } from "./error-interceptor";
import { ErrorComponent } from "./error/error.component";
import { ImageUploadModule } from "ng2-imageupload";
import { MenuPrincipalAdultoResponsableComponent } from "./menu-principal-adulto-responsable/menu-principal-adulto-responsable.component";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    AltaEstudiantesComponent,
    BuscarEstudiantesComponent,
    ListaEstudiantesComponent,
    MostrarEstudiantesComponent,
    CancelPopupComponent,
    MostrarPopupComponent,
    BorrarPopupComponent,
    PreferenciasPopupComponent,
    MenuLateralComponent,
    HomeComponent,
    RegistrarAsistenciaComponent,
    AsistenciaPopupComponent,
    PerfilEstudiantePopupComponent,
    BuscarPopupComponent,
    InscripcionEstudianteComponent,
    InscripcionPopupComponent,
    RetiroAnticipadoComponent,
    RetiroPopupComponent,
    DocumentosInscripcionComponent,
    CalificacionesEstudiantesComponent,
    CalificacionesCicloLectivoComponent,
    LlegadaTardeComponent,
    CambiarPassword,
    CambiarPasswordPopupComponent,
    CerrarSesionPopupComponent,
    PerfilEstudianteComponent,
    CalificacionesPerfilEstudianteComponent,
    AgendaCursoPerfilEstudianteComponent,
    JustificacionInasistenciaComponent,
    AltaAdultoResponsableComponent,
    AltaEmpleadoComponent,
    AltaEmpleadoPopupComponent,
    AltaAdultoResponsablePopupComponent,
    PreferenciasComponent,
    LoginComponent,
    InasistenciasEstudianteComponent,
    TutoresEstudianteComponent,
    DatosEstudianteComponent,
    CuotasPerfilEstudianteComponent,
    CalificacionesExamenesComponent,
    RegistrarEventoComponent,
    ModificarEventoComponent,
    VisualizarEventoComponent,
    AgendaPopupComponent,
    ReadMoreComponent,
    VisualizarAgendaComponent,
    RegistrarCuotasComponent,
    DefinirAgendaComponent,
    RegistrarSancionesComponent,
    SancionesEstudianteComponent,
    MenuPrincipalAdultoResponsableComponent,
  ],
  //entryComponents declara los componentes que se generan dinamicamente dentro de otros.
  entryComponents: [
    CancelPopupComponent,
    MostrarPopupComponent,
    BorrarPopupComponent,
    AsistenciaPopupComponent,
    PerfilEstudiantePopupComponent,
    BuscarPopupComponent,
    InscripcionPopupComponent,
    RetiroPopupComponent,
    CambiarPasswordPopupComponent,
    CerrarSesionPopupComponent,
    PreferenciasPopupComponent,
    AltaEmpleadoPopupComponent,
    AltaAdultoResponsablePopupComponent,
    AgendaPopupComponent,
    ReadMoreComponent,
    ErrorComponent,
  ],
  imports: [
    MatChipsModule,
    BrowserModule,
    MatInputModule,
    ReactiveFormsModule,
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
    MatProgressSpinnerModule,
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
    MatSnackBarModule,
    MatGridListModule,
    ChartsModule,
    // MatIconRegistry,
    MatPaginatorModule,
    NgxMaterialTimepickerModule,
    ImageUploadModule,
    MatTooltipModule,
    MatTableExporterModule,
    MatCarouselModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      registrationStrategy: "registerImmediately",
    }),
  ],
  //le decimos a angular que vamos a tener un interceptor nuevo (provide), luego le indicamos que
  //interceptor usar (useClass) y finalmente aclaramos que no sobreescriba el interceptor que esta
  //ya que podemos utilizar más de uno (multi).
  providers: [
    EstudiantesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: "es" },
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
