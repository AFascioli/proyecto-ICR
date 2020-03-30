import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { FormControl, NgForm } from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable, Subject } from "rxjs";
import { map, startWith, takeUntil } from "rxjs/operators";
import { EventosService } from "../eventos.service";
import { MatSnackBar, MatDialog } from "@angular/material";
import Rolldate from "../../../assets/rolldate.min.js";
import { CancelPopupComponent } from "src/app/popup-genericos/cancel-popup.component";
import { Router } from "@angular/router";
import { Ng2ImgMaxService } from "ng2-img-max";

@Component({
  selector: "app-registrar-evento",
  templateUrl: "./registrar-evento.component.html",
  styleUrls: ["./registrar-evento.component.css"]
})
export class RegistrarEventoComponent implements OnInit, OnDestroy {
  @ViewChild("chipsInput", { static: false }) chipsInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("auto", { static: false }) matAutocomplete: MatAutocomplete;
  fechaActual: Date;
  imageFile: File;
  imgURL: any[] = [];
  message: string;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipsCtrl = new FormControl();
  filteredChips: Observable<string[]>;
  chips: string[] = [];
  allChips: string[] = ["1A", "2A", "3A", "4A", "5A", "6A", "Todos los cursos"];
  horaInicio = "";
  horaFin = "";
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    public eventoService: EventosService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    private ng2ImgMax: Ng2ImgMaxService
  ) {
    //Hace que funcione el autocomplete, filtra

    this.filteredChips = this.chipsCtrl.valueChanges.pipe(
      startWith(null),
      map((chip: string | null) =>
        chip ? this._filter(chip) : this.allChips.slice()
      )
    );
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit() {
    this.fechaActual = new Date();
    this.inicializarPickers();
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || "").trim()) {
        if (this.allChips.includes(value)) this.chips.push(value.trim());
      }

      if (input) {
        input.value = "";
      }

      this.chipsCtrl.setValue(null);
    }
  }

  inicializarPickers() {
    new Rolldate({
      el: "#pickerInicio",
      format: "hh:mm",
      minStep: 15,
      lang: {
        title: "Seleccione hora de inicio del evento",
        hour: "",
        min: ""
      },
      confirm: date => {
        this.horaInicio = date;
      }
    });
    new Rolldate({
      el: "#pickerFin",
      format: "hh:mm",
      minStep: 15,
      lang: { title: "Seleccione hora de fin del evento", hour: "", min: "" },
      confirm: date => {
        this.horaFin = date;
      }
    });
  }

  remove(chip: string): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (event.option.viewValue == "Todos los cursos") {
      this.chips = [];
      this.chips.push(event.option.viewValue);
    } else if (
      !this.chips.includes(event.option.viewValue) &&
      !this.chips.includes("Todos los cursos")
    )
      this.chips.push(event.option.viewValue);
    if (this.chips.length == this.allChips.length - 1) {
      this.chips = [];
      this.chips.push("Todos los cursos");
    }
    this.chipsInput.nativeElement.value = "";
    this.chipsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allChips.filter(
      chip => chip.toLowerCase().indexOf(filterValue) === 0
    );
  }

  aplicarResize = file => {
    return new Promise((resolve, reject) => {
      this.ng2ImgMax.resizeImage(file, 20000, 375).subscribe(result => {
        resolve(new File([result], result.name));
      });
      if (file == null) {
        reject("No se pudo realizar el resize");
      }
    });
  };

  obtenerImagen = (file, reader) => {
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file);
      reader.onload = _event => {
        resolve(reader.result);
      };
      if (file == null) {
        reject("No se pudo obtener la imagen");
      }
    });
  };

  async preview(files) {
    let fileResize: any = [];
    let incorrectType = false;
    if (files.length === 0) return;

    for (let index = 0; index < files.length; index++) {
      fileResize.push(files[index]);
      var mimeType = files[index].type;
      if (mimeType.match(/image\/*/) == null) {
        incorrectType = true;
        files.splice(index, 1);
      }
    }

    //ver de aplicar resize individual
    incorrectType && (this.message = "Solo se admiten archivos de imagen");
    console.log(fileResize);
    this.imageFile = fileResize;

    for (let index = 0; index < fileResize.length; index++) {
      var reader = new FileReader();
      this.imgURL[index] = await this.obtenerImagen(fileResize[index], reader);
    }
  }

  onGuardarEvento(form: NgForm) {
    if (form.valid && this.chips.length != 0) {
      const fechaEvento = form.value.fechaEvento.toString();
      if (this.horaInicio == "" && this.horaFin == "") {
        this.eventoService
          .registrarEvento(
            form.value.titulo,
            form.value.descripcion,
            fechaEvento,
            this.horaInicio,
            this.horaFin,
            this.chips,
            this.imageFile
          )
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(rtdo => {
            if (rtdo.exito) {
              this.snackBar.open(rtdo.message, "", {
                panelClass: ["snack-bar-exito"],
                duration: 4500
              });
            } else {
              this.snackBar.open(rtdo.message, "", {
                duration: 4500,
                panelClass: ["snack-bar-fracaso"]
              });
            }
          });
      } else if (this.horaEventoEsValido(this.horaInicio, this.horaFin)) {
        this.eventoService
          .registrarEvento(
            form.value.titulo,
            form.value.descripcion,
            fechaEvento,
            this.horaInicio,
            this.horaFin,
            this.chips,
            this.imageFile
          )
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(rtdo => {
            if (rtdo.exito) {
              this.snackBar.open(rtdo.message, "", {
                panelClass: ["snack-bar-exito"],
                duration: 4500
              });
              this.router.navigate(["./home"]);
              form.resetForm();
            } else {
              this.snackBar.open(rtdo.message, "", {
                duration: 4500,
                panelClass: ["snack-bar-fracaso"]
              });
            }
          });
      } else {
        this.snackBar.open(
          "La hora de finalización del evento no es mayor a la hora de inicio",
          "",
          {
            duration: 4500,
            panelClass: ["snack-bar-fracaso"]
          }
        );
      }
    } else {
      this.snackBar.open("Faltan campos por completar", "", {
        duration: 4500,
        panelClass: ["snack-bar-fracaso"]
      });
    }
  }

  //Valida que la hora inicio sea menor que la hora fin.
  horaEventoEsValido(horaInicio: string, horaFin: string) {
    var variableDateInicio = new Date("01/01/2020 " + horaInicio);
    var variableDateFin = new Date("01/01/2020 " + horaFin);
    return variableDateInicio < variableDateFin;
  }

  popUpCancelar() {
    this.dialog.open(CancelPopupComponent, {
      width: "250px"
    });
  }
}
