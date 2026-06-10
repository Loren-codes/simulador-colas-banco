from tickets import (
    generar_ticket,
    mensaje_llegada,
    mensaje_ventanilla,
    mensaje_salida,
    animacion_entrada,
    animacion_salida,
    liberar_ticket,
)

print("=== PRUEBA PARTE 4 - TICKETS Y MENSAJES ===\n")

tickets = []
for _ in range(3):
    t = generar_ticket()
    tickets.append(t)
    animacion_entrada()
    mensaje_llegada(t)

print("\n--- Pasando clientes a ventanillas ---\n")

ventanillas = ["V1", "V2", "V3"]
for ticket, ventanilla in zip(tickets, ventanillas):
    mensaje_ventanilla(ticket, ventanilla)
    animacion_salida()
    mensaje_salida(ticket, ventanilla)
    liberar_ticket(ticket)

print("\n--- Verificando que no se repiten tickets ---")
nuevos = [generar_ticket() for _ in range(3)]
print(f"Tickets nuevos generados: {nuevos}")
assert len(nuevos) == len(set(nuevos)), "ERROR: tickets repetidos"
print("OK - Todos los tickets son unicos.")
