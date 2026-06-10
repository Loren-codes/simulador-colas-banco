const ColaCircular = require("./colacircular");
const GestorVentanillas = require("./gestorVentanillas");

const cola = new ColaCircular(5);
const gestor = new GestorVentanillas(3);

console.log("Agregando clientes a la cola circular...");

cola.enqueue({
  ticket: "B001",
  nombre: "Juan",
  estado: "esperando",
  horaLlegada: new Date(Date.now() - 8000)
});

cola.enqueue({
  ticket: "B002",
  nombre: "María",
  estado: "esperando",
  horaLlegada: new Date(Date.now() - 5000)
});

cola.enqueue({
  ticket: "B003",
  nombre: "Carlos",
  estado: "esperando",
  horaLlegada: new Date(Date.now() - 3000)
});

console.log("\nCola inicial:");
console.log(cola.obtenerCola());

console.log("\nAtendiendo cliente FIFO en ventanilla libre...");
const resultadoCola1 = cola.dequeue();

if (resultadoCola1.exito) {
  console.log(gestor.asignarClienteAVentanilla(resultadoCola1.cliente));
}

console.log("\nAtendiendo siguiente cliente FIFO...");
const resultadoCola2 = cola.dequeue();

if (resultadoCola2.exito) {
  console.log(gestor.asignarClienteAVentanilla(resultadoCola2.cliente));
}

console.log("\nEstado de ventanillas:");
console.log(gestor.obtenerEstados());

console.log("\nFinalizando atención en ventanilla 1:");
console.log(gestor.finalizarAtencion(1));

console.log("\nEstado final de ventanillas:");
console.log(gestor.obtenerEstados());

console.log("\nClientes restantes en cola:");
console.log(cola.obtenerCola());

console.log("\nTotal atendidos:");
console.log(gestor.obtenerTotalAtendidos());