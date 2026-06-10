import threading
import time

from cola_circular import ColaCircular
from tickets import (
    generar_ticket,
    mensaje_llegada,
    mensaje_ventanilla,
    mensaje_salida,
    animacion_entrada,
    animacion_salida,
    liberar_ticket,
)

VENTANILLAS = ["V1", "V2", "V3", "V4"]
ventanilla_libre = {v: True for v in VENTANILLAS}
lock = threading.Lock()
cola = ColaCircular(capacidad=10)


def agregar_cliente():
    ticket = generar_ticket()
    with lock:
        if not cola.enqueue({"ticket": ticket}):
            print(f"  Cola llena. No se pudo agregar {ticket}.")
            liberar_ticket(ticket)
            return
    animacion_entrada()
    mensaje_llegada(ticket)


def atender_cliente(ventanilla):
    with lock:
        cliente = cola.dequeue()
        if cliente is None:
            print(f"  [{ventanilla}] Cola vacia. Sin clientes.")
            return
        ventanilla_libre[ventanilla] = False

    ticket = cliente["ticket"]
    mensaje_ventanilla(ticket, ventanilla)
    time.sleep(1.5)
    animacion_salida()
    mensaje_salida(ticket, ventanilla)
    liberar_ticket(ticket)

    with lock:
        ventanilla_libre[ventanilla] = True


def mostrar_cola():
    with lock:
        estado = cola.ver_cola()
    if not estado:
        print("  Cola vacia.")
    else:
        print(f"  Cola actual ({len(estado)} cliente/s):")
        for i, c in enumerate(estado, 1):
            print(f"    {i}. {c['ticket']}")


def menu():
    print("\n" + "=" * 36)
    print("  SIMULADOR BANCO - COLAS CIRCULARES")
    print("=" * 36)
    print("  1. Agregar cliente")
    print("  2. Atender siguiente cliente")
    print("  3. Ver cola actual")
    print("  4. Salir")
    print("=" * 36)
    return input("  Opcion: ").strip()


def elegir_ventanilla():
    disponibles = [v for v, libre in ventanilla_libre.items() if libre]
    if not disponibles:
        print("  Todas las ventanillas ocupadas.")
        return None
    print(f"  Ventanillas disponibles: {', '.join(disponibles)}")
    v = input("  Elegir ventanilla: ").strip().upper()
    if v not in disponibles:
        print(f"  Ventanilla {v} no disponible.")
        return None
    return v


if __name__ == "__main__":
    while True:
        opcion = menu()

        if opcion == "1":
            t = threading.Thread(target=agregar_cliente)
            t.start()
            t.join()

        elif opcion == "2":
            ventanilla = elegir_ventanilla()
            if ventanilla:
                t = threading.Thread(target=atender_cliente, args=(ventanilla,))
                t.start()
                t.join()

        elif opcion == "3":
            mostrar_cola()

        elif opcion == "4":
            print("  Cerrando simulador.")
            break

        else:
            print("  Opcion invalida.")
