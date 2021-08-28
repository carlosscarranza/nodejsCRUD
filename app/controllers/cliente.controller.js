import Cliente from "../models/cliente.model.js";

//Crea y graba un nuevo cliente
const create = (req, res) => {
  console.log(req.body);
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
const findAll = (req, res) => {
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
const findOne = (req, res) => {
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

//Modifica un cliente identificado por el clienteId
const update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacio!",
    });
  }
console.log(req.params.clienteId);
  Cliente.updateById(
    req.params.clienteId,
    new Cliente(req.body),
    (err, data) => {
      console.log(err);
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Cliente no encontrado con el id ${req.params.clienteId}.",
          });
        } else {
          res.status(500).send({
            message: "Error modificando cliente con id " + req.params.clienteId,
          });
        }
      } else {
        res.send(data);
      }
    }
  );
};

//Eliminar un cliente con un clienteId en la peticion
const deleteOne = (req, res) => {
  Cliente.remove(req.params.clienteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Cliente no encontrado con el id ${req.params.clienteId}.",
        });
      } else {
        res.status(500).send({
          message:
            "No se puede eliminar el cliente con id " + req.params.clienteId,
        });
      }
    } else {
      res.send({ message: "Cliente eliminado con éxito!" });
    }
  });
};

//Eliminar todos los clientes
const deleteAll = (req, res) => {
  Cliente.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error al eliminar los clientes.",
      });
    } else {
      res.send({ message: "Todos los clientes fueron borrados con éxito!" });
    }
  });
};

export default { create, findAll, findOne, update, deleteOne, deleteAll}
