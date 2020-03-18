import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AgendaService {
  constructor(public http: HttpClient) {}

  //Obtiene la agenda de un curso (materias, horario y día dictadas)
  //@params: idCurso
  public obtenerAgendaDeCurso(idCurso){
    let params = new HttpParams().set(
      "idCurso", idCurso
    );
    return this.http.get<{
      message: string;
      exito: boolean;
      agenda: any[];
    }>(environment.apiUrl + "/curso/agenda", {
      params: params
    });
  }

  //Obtiene la agenda de un curso (materias, horario y día dictadas)
  //@params: idCurso
  public obtenerAgendaDeCursoByIdEstudiante(idEstudiante){
    let params = new HttpParams().set(
      "idEstudiante", idEstudiante
    );
    return this.http.get<{
      message: string;
      exito: boolean;
      agenda: any[];
    }>(environment.apiUrl + "/estudiante/agenda", {
      params: params
    });
  }

  //Retorna todos los docentes de la institucion
  public obtenerDocentes() {
    return this.http.get<{ docentes: any[] }>(
      environment.apiUrl + "/empleado/docente"
    );
  }

  //Regista la agenda de un curso
  //@params: id del curso
  //@params: agenda del curso (dia, hora inicio y hora fin)
  public registrarAgenda(agenda: any[], curso: string) {
    return this.http.post<{ exito: boolean; mensaje: string }>(
      environment.apiUrl + "/curso/agenda",
      { agenda: agenda, idCurso: curso }
    );
  }

   //Retorna todas las materias de la institucion
   public obtenerMaterias() {
    return this.http.get<{ materias: any[] }>(environment.apiUrl + "/materia");
  }

  //Elimina ciertos horarios registrados para un curso y una materia
  //@params: id del curso
  //@params: id horario
  //@params: nombre de la materia
  public eliminarHorarios(idCurso, idHorario, nombreMateria) {
    return this.http.post<{ exito: boolean; message: string }>(
      environment.apiUrl + "/curso/eliminarHorarios",
      {
        idCurso: idCurso,
        idHorario: idHorario,
        nombreMateria: nombreMateria
      }
    );
  }


   // //Retorna todas las materias de la institucion
  // public obtenerMaterias() {
  //   //return this.http.get<{ materias: any[] }>(environment.apiUrl + "/materia");

  //   var materiaObj = {
  //     nombre: "Matemática",
  //     dia: "Miércoles",
  //     inicio: "10:30",
  //     fin: "11:15"
  //   };

  //   var materiaObj2 = {
  //     nombre: "Lengua",
  //     dia: "Miércoles",
  //     inicio: "11:15",
  //     fin: "12:00"
  //   };

  //   var materiaObj3 = {
  //     nombre: "Física",
  //     dia: "Lunes",
  //     inicio: "07:30",
  //     fin: "08:15"
  //   };

  //   var materiaObj4 = {
  //     nombre: "Historia",
  //     dia: "Lunes",
  //     inicio: "08:15",
  //     fin: "09:00"
  //   };

  //   var materiaObj5 = {
  //     nombre: "Biología",
  //     dia: "Jueves",
  //     inicio: "07:30",
  //     fin: "08:15"
  //   };

  //   var materiaObj7 = {
  //     nombre: "Biología",
  //     dia: "Jueves",
  //     inicio: "08:15",
  //     fin: "09:00"
  //   };

  //   var materiaObj6 = {
  //     nombre: "Matemática",
  //     dia: "Viernes",
  //     inicio: "12:00",
  //     fin: "12:45"
  //   };

  //   var materiaObj8 = {
  //     nombre: "Química",
  //     dia: "Martes",
  //     inicio: "07:30",
  //     fin: "08:15"
  //   };

  //   var materiaObj9 = {
  //     nombre: "Lengua",
  //     dia: "Martes",
  //     inicio: "08:15",
  //     fin: "09:00"
  //   };

  //   return [
  //     materiaObj,
  //     materiaObj2,
  //     materiaObj3,
  //     materiaObj4,
  //     materiaObj5,
  //     materiaObj6,
  //     materiaObj7,
  //     materiaObj8,
  //     materiaObj9
  //   ];
  // }
}