import Cliente from "../models/cliente.model";

//Crea y graba un nuevo cliente
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!",
    });
  }

  const cliente = new Cliente({
    email: req.body.email,
    nombre: req.body.nombre,
    activo: req.body.activo,
  });

  Cliente.create(cliente, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error en la creación del cliente",
      });
    } else {
      res.send(data);
    }
  });
};

//Retorna todos los clientes
exports.findAll = (req, res) => {
  Cliente.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error recuperando los clientes",
      });
    } else {
      res.send(data);
    }
  });
};

//Retorna un cliente con el clienteId
exports.findOne = (req, res) => {
  Cliente.findById(req.params.clienteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Cliente no encontrado con el id ${req.params.clienteId}",
        });
      } else {
        res.status(500).send({
          message: "Error recuperando cliente con id " + req.params.clienteId,
        });
      }
    } else {
      res.send(data);
    }
  });
};
