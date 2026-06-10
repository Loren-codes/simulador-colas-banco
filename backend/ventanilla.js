class Ventanilla {
  constructor(numero) {
    this.numero = numero;
    this.ocupada = false;
    this.clienteActual = null;
    this.totalAtendidos = 0;
  }

  estaLibre() {
    return !this.ocupada;
  }

  asignarCliente(cliente) {
    if (this.ocupada) {
      return {
        exito: false,
        mensaje: `La ventanilla ${this.numero} está ocupada`
      };
    }

    cliente.estado = "atendiendo";
    cliente.ventanilla = this.numero;
    cliente.horaAtencion = new Date();

    this.clienteActual = cliente;
    this.ocupada = true;

    return {
      exito: true,
      mensaje: `Cliente ${cliente.ticket} está siendo atendido en ventanilla ${this.numero}`,
      cliente
    };
  }

  finalizarAtencion() {
    if (!this.ocupada || !this.clienteActual) {
      return {
        exito: false,
        mensaje: `La ventanilla ${this.numero} no tiene cliente`
      };
    }

    const clienteFinalizado = this.clienteActual;

    clienteFinalizado.estado = "atendido";
    clienteFinalizado.horaSalida = new Date();

    const llegada = new Date(clienteFinalizado.horaLlegada || clienteFinalizado.hora_llegada);
    const atencion = new Date(clienteFinalizado.horaAtencion);

    clienteFinalizado.tiempoEspera = Math.floor((atencion - llegada) / 1000);

    this.clienteActual = null;
    this.ocupada = false;
    this.totalAtendidos++;

    return {
      exito: true,
      mensaje: `Cliente ${clienteFinalizado.ticket} fue atendido y se retiró`,
      cliente: clienteFinalizado
    };
  }

  obtenerEstado() {
    return {
      numero: this.numero,
      ocupada: this.ocupada,
      clienteActual: this.clienteActual,
      totalAtendidos: this.totalAtendidos
    };
  }
}

module.exports = Ventanilla;