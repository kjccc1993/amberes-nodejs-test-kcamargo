# amberes-nodejs-test-kcamargo

## Ambiente de trabajo
NodeJs: v10.13.0

npm: v6.4.1

## Estructura del proyecto
src/app.js -> punto de partida del servicio

src/infrastructure -> Infraestructura separada de la lógica de negocio 

src/infrastructure/database -> base de datos (en este caso ficticia con una función autoejecutada, lo ideal sería generar un módulo que realice 
la conexión y exponga los métodos para su uso, nunca he usado PostgreSQL por lo que preferí no usarlo por el momento).

src/infraestructure/server -> archivos necesarios para levantar el servicio

src/infraestructure/server/routes -> rutas del api

src/infraestructure/server/middlewares -> middlewares

src/infraestructure/server/index -> expone la función para levantar el servicio

src/modules -> modulos del app, contiene la lógica del negocio

src/modules/coins -> controlador para las peticiones /coin

src/modules/common -> funciones de uso común entre controladores, ejemplo authenticate.js

## Uso del API

Se exponen 3 rutas

**Primera ruta**
```
GET /api/v1/coins
```
Obtiene los precios actuales de las monedas solicitadas BTC,ETH,DASH,EUR,PTR,BS en USD

Parámetros de la ruta: 

usedb: Boolean (opcional) // lo agregué para simular que falla encontrando PTR y BS y forzar la busqueda en BD.

response: 

```
{
    "message": "successful",
    "data": [
        {
            "coin": "BTC",
            "price": 7134.92212903
        },
        {
            "coin": "ETH",
            "price": 174.21025584
        },
        {
            "coin": "DASH",
            "price": 77.07879192
        },
        {
            "coin": "EUR",
            "price": 1.08243402
        },
        {
            "coin": "PTR",
            "price": 58.81
        },
        {
            "coin": "BS",
            "price": 0.00000301
        }
    ]
}

```
**Segunda ruta**
```
POST /api/v1/coins/set
```
Guarda un valor para una moneda específica (fuente de datos manual para el caso de no encontrarla en con una api pública)


body:
```
{
  "coin": "NOMBRE DE LA MONEDA", //String
  "price": "PRECIO DE LA MONEDA" //Number
}
```

response:
```
{
    "message": "successful"
}
```

**Tercera ruta**
```
POST /api/v1/coins/convert
```
Convierte los datos dados en las demás monedas

Parámetros de la ruta: 

usedb: Boolean (opcional) // lo agregué para simular que falla encontrando PTR y BS y forzar la busqueda en BD.

body:
```
{
  "coin": "NOMBRE DE LA MONEDA", //String
  "amount": "MONTO A CONVERTIR" //Number
}
```

response:
```
{
    "message": "successful",
    "data": [
        {
            "coin": "BTC",
            "price": 1
        },
        {
            "coin": "ETH",
            "price": 41.1531971193635
        },
        {
            "coin": "DASH",
            "price": 91.65972180884349
        },
        {
            "coin": "EUR",
            "price": 6533.470099365865
        },
        {
            "coin": "PTR",
            "price": 117.44100449766667
        },
        {
            "coin": "BS",
            "price": 704646026.986
        }
    ]
}
```

## Notas
* El enunciado decía que eran 2 servicios, pero integré los dos ejercicios en un solo servicio.

* No me fallaron las apis que usé por lo que tuve que simular el fallo con el parámetro usedb

* Implementé un authenticate simple, solo para mostrar cómo lo haría, no tengo token ni nada, pero por lo general he usado JWT en proyectos anteriores

* La base de datos que he usado es MongoDB, pero no tengo problema con las bases de datos relacionales, para efectos de la prueba no 
usé ninguna, hice una simulacón con una función autoejectuda para mantener los datos durante la sesión, cada vez que se reinicia el servicio 
se pierden los datos guardados.




                  
