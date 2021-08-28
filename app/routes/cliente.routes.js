module.exports = (app) => {
  import clientes from "../controllers/cliente.controller";

  //Crear un cliente
  app.post("/clientes", clientes.create);

  //Retorna todos los clientes
  app.get("/clientes", clientes.findAll);

  //Retorna un cliente con clienteId
  app.get("/clientes/:clienteId", clientes.findOne);

  //Modifica un cliente con el clienteId
  app.put("/clientes/:clienteId", clientes.update);

  //Elimina un cliente con el clientId
  app.delete("/clientes/:clienteId", clientes.delete);

  //Elimina todos los clientes
  app.delete("/clientes", clientes.deleteAll);
};
