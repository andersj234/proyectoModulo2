const express = require("express")
const router = express.Router()

router.get("/mostrarProductos", function(req,res){
    req.app.locals.db.collection("compra").find().toArray(function(err,data){
        err
        ? res.send({err : true, contenido: err})
        : res.send({err : false, contenido: data})
    })
})
router.put("/mostrarProducto", function(req,res){ //esto es una ruta get pero la he puesto put para poder enviar el body
    console.log(req.body)
    req.app.locals.db.collection("compra").find({zapatillas: {$regex: `${req.body.zapatillas}`}}).toArray(function(err,data){
        console.log({contenido: data})
        err
        ? res.send({err : true, contenido: err})
        : res.send({err : false, contenido: data})
    })
})

router.post("/anyadirProducto", function(req,res){
    req.app.locals.db.collection("compra").insertOne({zapatillas: req.body.zapatillas, precio: parseFloat(req.body.precio)}, function(err, data){
        err 
        ? res.send({err : true, contenido: err})
        : res.send({err : false, contenido: data})
    })
})

router.put("/modificarProducto", function(req,res){
    req.app.locals.db.collection("compra").updateOne({zapatillas: req.body.zapatillas},{$set: {precio: parseFloat(req.body.precio)}}, function(err, data){
        err
        ? res.send({err : true, contenido: err})
        : res.send({err : false, contenido: data})
    })
})

router.delete("/eliminarProducto", function(req,res){
    req.app.locals.db.collection("compra").deleteOne({zapatillas: req.body.zapatillas}, function(err, data){
        err
        ? res.send({err : true, contenido: err})
        : res.send({err : false, contenido: data})
    })
})

module.exports = router