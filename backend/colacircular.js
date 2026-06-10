class ColaCircular {
  constructor(capacidad = 10) {
    this.items = new Array(capacidad);
    this.capacidad = capacidad;
    this.frente = 0;
    this.final = -1;
    this.tamano = 0;
  }

  estaVacia() {
    return this.tamano === 0;
  }

  estaLlena() {
    return this.tamano === this.capacidad;
  }

  enqueue(cliente) {
    if (this.estaLlena()) {
      return {
        exito: false,
        mensaje: "La cola está llena"
      };
    }

    this.final = (this.final + 1) % this.capacidad;
    this.items[this.final] = cliente;
    this.tamano++;

    return {
      exito: true,
      mensaje: "Cliente agregado a la cola",
      cliente
    };
  }

  dequeue() {
    if (this.estaVacia()) {
      return {
        exito: false,
        mensaje: "La cola está vacía",
        cliente: null
      };
    }

    const cliente = this.items[this.frente];
    this.items[this.frente] = null;
    this.frente = (this.frente + 1) % this.capacidad;
    this.tamano--;

    return {
      exito: true,
      mensaje: "Cliente atendido",
      cliente
    };
  }

  verFrente() {
    if (this.estaVacia()) {
      return null;
    }

    return this.items[this.frente];
  }

  obtenerCola() {
    const cola = [];

    for (let i = 0; i < this.tamano; i++) {
      const posicion = (this.frente + i) % this.capacidad;
      cola.push(this.items[posicion]);
    }

    return cola;
  }

  obtenerTamano() {
    return this.tamano;
  }

  limpiar() {
    this.items = new Array(this.capacidad);
    this.frente = 0;
    this.final = -1;
    this.tamano = 0;
  }
}

module.exports = ColaCircular;