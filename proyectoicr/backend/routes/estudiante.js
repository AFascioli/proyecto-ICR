const express = require("express");
const Estudiante = require("../models/estudiante");
const Inscripcion = require("../models/inscripcion");
const Division = require("../models/division");
const router = express.Router();

//Registra un nuevo estudiante en la base de datos
router.post("", (req, res, next) => {
  const estudiante = new Estudiante({
    apellido: req.body.apellido,
    nombre:req.body.nombre,
    tipoDocumento:req.body.tipoDocumento,
    numeroDocumento:req.body.numeroDocumento,
    cuil:req.body.cuil,
    sexo:req.body.sexo,
    calle:req.body.calle,
    numeroCalle:req.body.numeroCalle,
    piso:req.body.piso,
    departamento:req.body.departamento,
    provincia:req.body.provincia,
    localidad:req.body.localidad,
    codigoPostal:req.body.codigoPostal,
    nacionalidad:req.body.nacionalidad,
    fechaNacimiento:req.body.fechaNacimiento,
    estadoCivil:req.body.estadoCivil,
    telefonoFijo:req.body.telefonoFijo,
    adultoResponsable:"null",
    activo: true
  });
  estudiante.save().then(()=> {
    res.status(201).json({
      message: "Estudiante registrado correctamente!"
    });
  })
  .catch(err => console.log("Error al meter en la bd estudiante"+err));
});

router.get("/documento", (req, res, next) => {
  const tipo = req.query.tipo;
  const numero = req.query.numero;
  Estudiante.find({tipoDocumento: tipo, numeroDocumento: numero, activo: true}).then(documents => {
    res.status(200).json({
      estudiantes: documents
    });
  });
});

//Busqueda de un estudisante por nombre y apellido ignorando mayusculas
router.get("/nombreyapellido", (req, res, next) => {
  const nombre = req.query.nombre;
  const apellido = req.query.apellido;
  Estudiante.find({nombre: { $regex : new RegExp(nombre, "i") },
   apellido: { $regex : new RegExp(apellido, "i") }, activo: true}).
   then(documents => {
    res.status(200).json({
      estudiantes: documents
    });
  });
});

//Modifica un estudiante
router.patch("/modificar",(req, res, next) =>{
  Estudiante.findByIdAndUpdate(req.body._id,{
    apellido: req.body.apellido,
    nombre:req.body.nombre,
    tipoDocumento:req.body.tipoDocumento,
    numeroDocumento:req.body.numeroDocumento,
    cuil:req.body.cuil,
    sexo:req.body.sexo,
    calle:req.body.calle,
    numeroCalle:req.body.numeroCalle,
    piso:req.body.piso,
    departamento:req.body.departamento,
    provincia:req.body.provincia,
    localidad:req.body.localidad,
    codigoPostal:req.body.codigoPostal,
    nacionalidad:req.body.nacionalidad,
    fechaNacimiento:req.body.fechaNacimiento,
    estadoCivil:req.body.estadoCivil,
    telefonoFijo:req.body.telefonoFijo,
    adultoResponsable:"null",
  }).then(() => {
      res.status(200).json({
        message: "Estudiante exitosamente modificado"
      });
    });

});

router.delete("/borrar", (req, res, next)=>{
  Estudiante.findOneAndUpdate({_id: req.query._id},{activo: false}).then(() =>{
    res.status(202).json({
      message: "Estudiante exitosamente borrado"
    });
  });
});

//Retorna un vector que tiene objetos que a su vez tienen _id, nombre, apellido de un estudiante
//Retorna un vector que tiene objetos que tienen _id, nombre, apellido, presente y fecha.
router.get("/division", (req, res, next)=>{
  Inscripcion.find({}).select({IdDivision: 0, _id: 0, asistenciaDiaria: 0})
  .populate('IdEstudiante','nombre apellido').populate({
    path: 'IdDivision',
    match: {curso: "5A"}
  }).then(documents =>{
    const fechaActual= new Date();
    var estudiantesRedux= [];
    documents.forEach(objConIdEstudiante => {
      let estudianteRedux={
        _id: objConIdEstudiante.IdEstudiante._id,
        nombre: objConIdEstudiante.IdEstudiante.nombre,
        apellido: objConIdEstudiante.IdEstudiante.apellido,
        presente: false,
        fecha: fechaActual.toDateString()
      };
      estudiantesRedux.push(estudianteRedux);
    });
    console.dir(estudiantesRedux);
    res.status(200).json({
      estudiantesXDivision: estudiantesRedux
    });
  });
});

module.exports = router;
