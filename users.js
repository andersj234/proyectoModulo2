const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/usuarios", function (req, res) {
  req.app.locals.db
    .collection("users")
    .find()
    .toArray(function (err, data) {
      err
        ? res.send({ err: true, contenido: err })
        : res.send({ err: false, contenido: data });
    });
});

/*router.post("/anyadirUsuario", function (req, res) {
  req.app.locals.db
    .collection("users")
    .find({ mail: req.body.mail })
    .toArray(function (err, data) {
      // puede que asi no se pueda hacer
      if (err) {
        res.send({ err: true, contenido: err });
      } else {
        if (data.length === 0) {
          req.app.locals.db // si no existe cliente lo puede crear
            .collection("users")
            .insertOne(
              {
                mail: req.body.mail,
                password: bcrypt.hashSync(req.body.password, 10), //encriptar contraseñas
                user: req.body.user,
              },
              function (err, data) {
                err
                  ? res.send({ error: true, contenido: err })
                  : res.send({
                      error: false,
                      contenido: {
                        respuesta: data,
                        mensaje: "Usuario registrado correctamente", //si se registra correctamente se enviara un mensaje de feedback
                      },
                    });
              }
            );
        } else {
          res.send({
            error: false,
            contenido: { mensaje: "mail ya registrado" }, //tambien puedes haccer por separado un find y si encuentra por ejemplo el mail que compruebe si esta asociado a alguna cuenta o al contrario
          });
        }
      }
    });
});*/

//podriamos usar una ruta login para rescatar la contraseña del usuario y que la pueda leer como el la metio con bcrypt.compareSync(password, y arrayUsuario[0].password){habria que hacer mas cosas pero es para que se entienda}

router.post("/anyadirUsuario", function (req, res) {
  req.app.locals.db
    .collection("users")
    .find({ mail: req.body.mail })
    .toArray(function (err, data) {
      // puede que asi no se pueda hacer
      if (err) {
        res.send({ err: true, contenido: err });
      } else {
        if (data.length === 0) {
          req.app.locals.db
            .collection("users")
            .find({ user: req.body.user })
            .toArray(function (err, data) {
              if (data.length === 0) {
                req.app.locals.db
                  .collection("users")
                  .insertOne({
                    mail: req.body.mail,
                    user: req.body.user,
                    password: bcrypt.hashSync(req.body.password, 10),
                  }, function(err,data){
                    err
                    ? res.send({err: true, contenido: err})
                    : res.send({err: false, contenido:{mensaje: "Usuario registrado correctamente", respuesta: data}})
                  });
              } else {
                res.send({
                  err: false,
                  contenido: {
                    mensaje: "usuario ya registrado",
                    respuesta: data,
                  },
                });
              }
            });
        } else {
          res.send({
            error: false,
            contenido: { mensaje: "mail ya registrado", respuesta: data }, //tambien puedes haccer por separado un find y si encuentra por ejemplo el mail que compruebe si esta asociado a alguna cuenta o al contrario
          });
        }
      }
    });
});
module.exports = router;
