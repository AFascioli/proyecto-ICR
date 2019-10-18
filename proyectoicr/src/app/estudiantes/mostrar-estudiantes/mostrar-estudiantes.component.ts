import { AutenticacionService } from "./../../login/autenticacionService.service";
import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { EstudiantesService } from "../estudiante.service";
import { Subscription } from "rxjs";
import { Provincia } from "../provincias.model";
import { NgForm } from "@angular/forms";
import { Estudiante } from "../estudiante.model";
import { Nacionalidad } from "../nacionalidades.model";
import { Localidad } from "../localidades.model";
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { MediaMatcher } from "@angular/cdk/layout";

@Component({
  selector: "app-mostrar-estudiantes",
  templateUrl: "./mostrar-estudiantes.component.html",
  styleUrls: ["./mostrar-estudiantes.component.css"]
})
export class MostrarEstudiantesComponent implements OnInit {
  nacionalidades: Nacionalidad[] = [];
  provincias: Provincia[] = [];
  localidades: Localidad[] = [];
  localidadesFiltradas: Localidad[] = [];
  suscripcion: Subscription;
  estudiante: Estudiante;
  maxDate = new Date();
  primeraVez = true;
  modoEditar = false;

  //Atributos Estudiantes del HTML
  apellidoEstudiante: string;
  nombreEstudiante: string;
  tipoDocEstudiante: string;
  nroDocEstudiante: number;
  cuilEstudiante: number;
  sexoEstudiante: string;
  calleEstudiante: string;
  nroCalleEstudiante: number;
  pisoEstudiante: string;
  departamentoEstudiante: string;
  provinciaEstudiante: string;
  localidadEstudiante: string;
  CPEstudiante: number;
  fechaNacEstudiante: string;
  nacionalidadEstudiante: string;
  estadoCivilEstudiante: string;
  telefonoEstudiante: number;
  permisos = {
    notas: 0,
    asistencia: 0,
    eventos: 0,
    sanciones: 0,
    agendaCursos: 0,
    inscribirEstudiante: 0,
    registrarEmpleado: 0,
    cuotas: 0
  };
  _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;

  constructor(
    public servicio: EstudiantesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public authService: AutenticacionService,
    public changeDetectorRef: ChangeDetectorRef,
    public router: Router,
    public media: MediaMatcher
  ) {
    this.apellidoEstudiante = this.servicio.estudianteSeleccionado.apellido;
    this.nombreEstudiante = this.servicio.estudianteSeleccionado.nombre;
    this.tipoDocEstudiante = this.servicio.estudianteSeleccionado.tipoDocumento;
    this.nroDocEstudiante = this.servicio.estudianteSeleccionado.numeroDocumento;
    this.cuilEstudiante = this.servicio.estudianteSeleccionado.cuil;
    this.sexoEstudiante = this.servicio.estudianteSeleccionado.sexo;
    this.calleEstudiante = this.servicio.estudianteSeleccionado.calle;
    this.nroCalleEstudiante = this.servicio.estudianteSeleccionado.numeroCalle;
    this.pisoEstudiante = this.servicio.estudianteSeleccionado.piso;
    this.departamentoEstudiante = this.servicio.estudianteSeleccionado.departamento;
    this.provinciaEstudiante = this.servicio.estudianteSeleccionado.provincia;
    this.localidadEstudiante = this.servicio.estudianteSeleccionado.localidad;
    this.CPEstudiante = this.servicio.estudianteSeleccionado.codigoPostal;
    this.fechaNacEstudiante = this.servicio.estudianteSeleccionado.fechaNacimiento;
    this.nacionalidadEstudiante = this.servicio.estudianteSeleccionado.nacionalidad;
    this.estadoCivilEstudiante = this.servicio.estudianteSeleccionado.estadoCivil;
    this.telefonoEstudiante = this.servicio.estudianteSeleccionado.telefonoFijo;
    this.mobileQuery = media.matchMedia("(max-width: 1000px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.servicio.formInvalidoEstudiante = true;
    this.servicio.formEstudianteModificada = false;
    this.servicio.getProvincias();
    this.suscripcion = this.servicio
      .getProvinciasListener()
      .subscribe(provinciasActualizadas => {
        this.provincias = provinciasActualizadas;
      });
    this.servicio.getLocalidades();
    this.suscripcion = this.servicio
      .getLocalidadesListener()
      .subscribe(localidadesActualizadas => {
        this.localidades = localidadesActualizadas;
        this.FiltrarLocalidades();
      });
    this.servicio.getNacionalidades();
    this.suscripcion = this.servicio
      .getNacionalidadesListener()
      .subscribe(nacionalidadesActualizadas => {
        this.nacionalidades = nacionalidadesActualizadas;
      });
    this.authService.obtenerPermisosDeRol().subscribe(response => {
      this.permisos = response.permisos;
    });
  }

  FiltrarLocalidades() {
    const idProvinciaSeleccionada = this.provincias.find(
      provincia => provincia.nombre === this.provinciaEstudiante
    ).id;
    this.localidadesFiltradas = [...this.localidades];
    this.localidadesFiltradas = this.localidadesFiltradas.filter(
      localidad => localidad.id_provincia == idProvinciaSeleccionada
    );
  }

  // Cuando se destruye el componente se eliminan las suscripciones.
  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  onEditar() {
    this.modoEditar = true;
  }

  onGuardar(form: NgForm) {
    if (!form.invalid && form.dirty) {
      this.servicio
        .modificarEstudiante(
          this.servicio.estudianteSeleccionado._id,
          this.apellidoEstudiante,
          this.nombreEstudiante,
          this.tipoDocEstudiante,
          this.nroDocEstudiante,
          this.cuilEstudiante,
          this.sexoEstudiante,
          this.calleEstudiante,
          this.nroCalleEstudiante,
          this.pisoEstudiante,
          this.departamentoEstudiante,
          this.provinciaEstudiante,
          this.localidadEstudiante,
          this.CPEstudiante,
          this.nacionalidadEstudiante,
          this.fechaNacEstudiante,
          this.estadoCivilEstudiante,
          this.telefonoEstudiante
        )
        .subscribe(resultado => {
          if (resultado.exito) {
            this.modoEditar = false;
            this.snackBar.open(resultado.message, "", {
              panelClass: ["snack-bar-exito"],
              duration: 4000
            });
          } else {
            this.snackBar.open(resultado.message, "", {
              panelClass: ["snack-bar-fracaso"],
              duration: 4000
            });
          }
        });
    } else{
      if (form.invalid){
        this.snackBar.open("Faltan campos por completar", "", {
          panelClass: ["snack-bar-fracaso"],
          duration: 4000
        });
      }
      else{
        this.snackBar.open("No se han realizado cambios en el formulario", "", {
          panelClass: ["snack-bar-fracaso"],
          duration: 4000
        });
      }
    }
  }

  onBorrarVolver(tipo: string, form: NgForm): void {
    if (tipo == "volver" && !this.modoEditar) {
      this.router.navigate(["./buscar/lista"]);
    } else {
      this.servicio.tipoPopUp = tipo;
      if (form.invalid) {
        this.servicio.formInvalidoEstudiante = true;
      } else {
        this.servicio.formInvalidoEstudiante = false;
        this.servicio.formEstudianteModificada = form.dirty;
      }
      this.dialog.open(MostrarPopupComponent, {
        width: "250px"
      });
    }
  }

}

@Component({
  selector: "app-mostrar-popup",
  templateUrl: "./mostrar-popup.component.html",
  styleUrls: ["./mostrar-estudiantes.component.css"]
})
export class MostrarPopupComponent {
  tipoPopup: string;
  formInvalido: Boolean;
  borrar: string;
  formModificada: boolean;

  constructor(
    public dialogRef: MatDialogRef<MostrarPopupComponent>,
    public router: Router,
    public servicio: EstudiantesService
  ) {
    this.tipoPopup = this.servicio.tipoPopUp;
    this.formInvalido = servicio.formInvalidoEstudiante;
    this.borrar = "¿Está seguro que desea borrar el estudiante?";
    this.formModificada = this.servicio.formEstudianteModificada;
  }

  onYesClick(): void {
    this.router.navigate(["./buscar/lista"]);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close();
    this.servicio.formInvalidoEstudiante = true;
  }

  onOkClickBorrar(): void {
    this.dialogRef.close();
    this.router.navigate(["./buscar/lista"]);
  }

  onYesDeleteClick() {
    this.borrar = "El estudiante fue borrado exitosamente";
    this.servicio.borrarEstudiante(this.servicio.estudianteSeleccionado._id);
  }
}
