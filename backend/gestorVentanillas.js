const Ventanilla = require("./ventanilla");

class GestorVentanillas {
  constructor(cantidad = 4) {
    this.ventanillas = [];

    for (let i = 1; i <= cantidad; i++) {
      this.ventanillas.push(new Ventanilla(i));
    }
  }

  buscarVentanillaLibre() {
    return this.ventanillas.find((ventanilla) => ventanilla.estaLibre());
  }

  asignarClienteAVentanilla(cliente) {
    const ventanillaLibre = this.buscarVentanillaLibre();

    if (!ventanillaLibre) {
      return {
        exito: false,
        mensaje: "No hay ventanillas libres",
        cliente: null
      };
    }

    return ventanillaLibre.asignarCliente(cliente);
  }

  finalizarAtencion(numeroVentanilla) {
    const ventanilla = this.ventanillas.find(
      (v) => v.numero === Number(numeroVentanilla)
    );

    if (!ventanilla) {
      return {
        exito: false,
        mensaje: "La ventanilla no existe"
      };
    }

    return ventanilla.finalizarAtencion();
  }

  obtenerEstados() {
    return this.ventanillas.map((ventanilla) => ventanilla.obtenerEstado());
  }

  obtenerTotalAtendidos() {
    return this.ventanillas.reduce(
      (total, ventanilla) => total + ventanilla.totalAtendidos,
      0
    );
  }
}

module.exports = GestorVentanillas;