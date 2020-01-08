const mongoose = require('mongoose');

const documentosSchema = mongoose.Schema({
  nombre: String,
  entregado: Boolean
});

const inscripcionSchema = mongoose.Schema({
  idEstudiante: {type: mongoose.Schema.Types.ObjectId, ref: 'estudiante'},
  idCurso: {type: mongoose.Schema.Types.ObjectId, ref: 'curso'},
  asistenciaDiaria: [{type: mongoose.Schema.Types.ObjectId, ref: 'asistenciaDiaria'}],
  activa: {type: Boolean, require: true},
  documentosEntregados: [documentosSchema],
  calificacionesXMateria: [{type: mongoose.Schema.Types.ObjectId, ref: 'calificacionesXMateria'}],
  contadorInasistenciasInjustificada: {type: Number},
  contadorInasistenciasJustificada: {type: Number},
  contadorLlegadasTarde: {type: Number},
  estado: {type: mongoose.Schema.Types.ObjectId, ref: "estado"},
  año: {type: Number},
  materiasPendientes: [{type: mongoose.Schema.Types.ObjectId, ref: 'calificacionesXMateria'}]
});

module.exports= mongoose.model('inscripcion', inscripcionSchema, 'inscripcion');
