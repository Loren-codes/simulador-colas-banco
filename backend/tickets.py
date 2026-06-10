tickets_emitidos = set()
contador_ticket = [0]

def generar_ticket():
    while True:
        contador_ticket[0] += 1
        codigo = f"B{contador_ticket[0]:03d}"
        if codigo not in tickets_emitidos:
            tickets_emitidos.add(codigo)
            return codigo

def mensaje_llegada(ticket):
    linea = "=" * 36
    print(linea)
    print(f"  NUEVO CLIENTE EN COLA")
    print(f"  Ticket asignado : {ticket}")
    print(f"  Estado          : En espera")
    print(linea)

def mensaje_ventanilla(ticket, ventanilla):
    linea = "-" * 36
    print(linea)
    print(f"  LLAMANDO A VENTANILLA")
    print(f"  Ticket          : {ticket}")
    print(f"  Ventanilla      : {ventanilla}")
    print(f"  Estado          : Siendo atendido")
    print(linea)

def mensaje_salida(ticket, ventanilla):
    linea = "*" * 36
    print(linea)
    print(f"  CLIENTE ATENDIDO")
    print(f"  Ticket          : {ticket}")
    print(f"  Ventanilla      : {ventanilla}")
    print(f"  Estado          : Finalizado")
    print(linea)

def animacion_entrada():
    import time
    frames = [
        "  [ >                ]",
        "  [ -->              ]",
        "  [ ---->            ]",
        "  [ ------>          ]",
        "  [ -------->        ]",
        "  [ ---------->      ]",
        "  [ CLIENTE INGRESO  ]",
    ]
    for frame in frames:
        print(f"\r{frame}", end="", flush=True)
        time.sleep(0.08)
    print()

def animacion_salida():
    import time
    frames = [
        "  [      <---------- ]",
        "  [        <-------- ]",
        "  [          <------ ]",
        "  [            <---- ]",
        "  [              <-- ]",
        "  [  CLIENTE SALIO   ]",
    ]
    for frame in frames:
        print(f"\r{frame}", end="", flush=True)
        time.sleep(0.08)
    print()

def liberar_ticket(ticket):
    tickets_emitidos.discard(ticket)
