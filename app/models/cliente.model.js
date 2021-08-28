import sql from "./db.js";

//Constructor
const Cliente = function (cliente) {
  this.email = cliente.email;
  this.nombre = cliente.nombre;
  this.activo = cliente.activo;
};

Cliente.create = (newCliente, result) => {
  sql.query("INSERT INTO clientes SET ?", newCliente, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }

    console.log("crear cliente: ", { id: res.insertId, ...newCliente });
    result(null, { id: res.insertId, ...newCliente });
  });
};

Cliente.findById = (clienteId, result) => {
  sql.query("SELECT * FROM clientes WHERE id = ${clienteId}", (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("hallar cliente", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "no_encontrado" }, null);
  });
};

Cliente.getAll = (result) => {
  sql.query("SELECT * FROM clientes", (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }

    console.log("clientes: ", res);
    result(null, res);
  });
};

Cliente.updateById = (id, cliente, result) => {
  sql.query(
    "UPDATE clientes SET email = ?, activo = ? WHERE id = ?",
    [cliente.email, cliente.nombre, cliente.activo, id],
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("modificar cliente: ", { id: id, ...cliente });
      result(null, { id: id, ...cliente });
    }
  );
};

Cliente.remove = (id, result) => {
  sql.query("DELETE FROM clientes WHRER id = ?", id, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("cliente borrado con el id: ", id);
    result(null, res);
  });
};

Cliente.removeAll = (result) => {
  sql.query("DELETE FROM clientes", (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }

    console.log(`borrados ${res.affectedRows} clientes`);
    result(null, res);
  });
};

export default Cliente;