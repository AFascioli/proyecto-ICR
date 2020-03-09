import { Injectable } from "@angular/core";
import { Estudiante } from "src/app/estudiantes/estudiante.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class SancionService {
  constructor(public http: HttpClient) {}

  public registrarSancion(tipoSancion, cantidad, idEstudiante) {
    const datosSancion = {
      tipoSancion: tipoSancion,
      cantidad: cantidad,
      idEstudiante: idEstudiante
    };
    return this.http.post<{ message: string; exito: boolean }>(
      environment.apiUrl + "/curso/registrarSancion",
      datosSancion
    );
  }
}
