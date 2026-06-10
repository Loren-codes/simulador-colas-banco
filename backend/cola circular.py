class ColaCircular:
    def __init__(self, capacidad=10):
        self.capacidad = capacidad
        self.datos = [None] * capacidad
        self.frente = 0
        self.final = 0
        self.tamano = 0

    def esta_llena(self):
        return self.tamano == self.capacidad

    def esta_vacia(self):
        return self.tamano == 0

    def enqueue(self, cliente):
        if self.esta_llena():
            return False
        self.datos[self.final] = cliente
        self.final = (self.final + 1) % self.capacidad
        self.tamano += 1
        return True

    def dequeue(self):
        if self.esta_vacia():
            return None
        cliente = self.datos[self.frente]
        self.datos[self.frente] = None
        self.frente = (self.frente + 1) % self.capacidad
        self.tamano -= 1
        return cliente

    def ver_cola(self):
        if self.esta_vacia():
            return []
        resultado = []
        i = self.frente
        for _ in range(self.tamano):
            resultado.append(self.datos[i])
            i = (i + 1) % self.capacidad
        return resultado
