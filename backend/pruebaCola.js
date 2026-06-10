const ColaCircular = require("./colacircular");

const cola = new ColaCircular(3);

console.log("Agregando clientes...");
console.log(cola.enqueue({ ticket: "B001", nombre: "Juan" }));
console.log(cola.enqueue({ ticket: "B002", nombre: "Maria" }));
console.log(cola.enqueue({ ticket: "B003", nombre: "Carlos" }));

console.log("Cola actual:");
console.log(cola.obtenerCola());

console.log("Intentando agregar otro cliente:");
console.log(cola.enqueue({ ticket: "B004", nombre: "Ana" }));

console.log("Atendiendo cliente:");
console.log(cola.dequeue());

console.log("Cola después de atender:");
console.log(cola.obtenerCola());

console.log("Agregando B004:");
console.log(cola.enqueue({ ticket: "B004", nombre: "Ana" }));

console.log("Cola final:");
console.log(cola.obtenerCola());