import { CalificacionesService } from "../../calificaciones/calificaciones.service";
//import { Estudiante } from "src/app/estudiantes/estudiante.model";
import { EstudiantesService } from "src/app/estudiantes/estudiante.service";
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { AutenticacionService } from "src/app/login/autenticacionService.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MediaMatcher } from "@angular/cdk/layout";

@Component({
  selector: "app-calificaciones-perfil-estudiante",
  templateUrl: "./calificaciones-perfil-estudiante.component.html",
  styleUrls: ["./calificaciones-perfil-estudiante.component.css"]
})
export class CalificacionesPerfilEstudianteComponent
  implements OnInit, OnDestroy {
  apellidoEstudiante: string;
  nombreEstudiante: string;
  curso: string;
  calificacionesXMateria: any[];
  displayedColumns: string[] = [
    "materia",
    "calif1",
    "calif2",
    "calif3",
    "calif4",
    "calif5",
    "calif6",
    "prom"
  ];
  trimestreActual: string;
  fechaActual: Date;
  promedio = 0;
  private unsubscribe: Subject<void> = new Subject();
  materiasPendientes = [{ nombre: "Biologia" }, { nombre: "Fisica" }];
  _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;

  constructor(
    public servicioEstudiante: EstudiantesService,
    public servicioCalificaciones: CalificacionesService,
    public router: Router,
    public servicioEstudianteAutenticacion: AutenticacionService,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 880px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit() {
    this.fechaActual = new Date();
    this.servicioEstudiante.obtenerCursoDeEstudiante().subscribe(response => {
      this.curso = response.curso;
    });
    this.apellidoEstudiante = this.servicioEstudiante.estudianteSeleccionado.apellido;
    this.nombreEstudiante = this.servicioEstudiante.estudianteSeleccionado.nombre;
    this.obtenerTrimestrePorDefecto();
    this.servicioCalificaciones
      .obtenerCalificacionesXMateriaXEstudiante(this.trimestreActual)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.calificacionesXMateria = res.vectorCalXMat;
      });
    this.servicioCalificaciones
      .obtenerMateriasDesaprobadasEstudiante()
      .subscribe(materias => {
        if (materias.materiasDesaprobadas != null) {
          this.materiasPendientes = materias.materiasDesaprobadas;
        }
      });
  }

  onChangeTrimestre() {
    this.servicioCalificaciones
      .obtenerCalificacionesXMateriaXEstudiante(this.trimestreActual)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.calificacionesXMateria = res.vectorCalXMat;
      });
  }

  calcularPromedio(index, cantidad) {
    var notas: number = 0;
    this.calificacionesXMateria[index].calificaciones.forEach(nota => {
      if (nota != 0 && nota != null) notas = notas + nota;
    });
    this.promedio = notas / cantidad;
    return this.promedio;
  }

  //Segun la fecha actual selecciona por defecto el trimestre
  obtenerTrimestrePorDefecto() {
    let fechas = this.servicioEstudianteAutenticacion.getFechasCicloLectivo();
    let fechaInicioPrimerTrimestre = new Date(
      fechas.fechaInicioPrimerTrimestre
    );
    let fechaFinPrimerTrimestre = new Date(fechas.fechaFinPrimerTrimestre);
    let fechaInicioSegundoTrimestre = new Date(
      fechas.fechaInicioSegundoTrimestre
    );
    let fechaFinSegundoTrimestre = new Date(fechas.fechaFinSegundoTrimestre);

    if (
      this.fechaActual.getTime() >= fechaInicioPrimerTrimestre.getTime() &&
      this.fechaActual.getTime() <= fechaFinPrimerTrimestre.getTime()
    ) {
      this.trimestreActual = "1";
    } else if (
      this.fechaActual.getTime() >= fechaInicioSegundoTrimestre.getTime() &&
      this.fechaActual.getTime() <= fechaFinSegundoTrimestre.getTime()
    ) {
      this.trimestreActual = "2";
    } else {
      this.trimestreActual = "3";
      return;
    }
  }

  //Dado el indice de la tabla que representa una materia, retorna cuantas
  //notas tienen valor distinto a cero
  contadorNotasValidas(index): number {
    var cont = 0;
    this.calificacionesXMateria[index].calificaciones.forEach(nota => {
      if (nota != 0 && nota != null) cont++;
    });
    return cont;
  }
}
