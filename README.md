# Proyecto BACKEND para CoderHouse

## Entrega 29
* Argumentos para el modo fork o cluster
    ```
    src/index.ts
    ```
* Argumentos para el modo cluster
    ```
    "prod:pm2":         "pm2 start 02-server.js --watch -- 8012",
    "prod:pm2:stop":    "pm2 stop all",
    "prod:forever":     "forever start -w ./dist/index.js "
    ```

## Informacion:
* Las entregas se encuentran en sus respectivas branches.
* Si se cambia de rama hacer un npm clean-install
* Rutas :

        http://localhost:8080/
        
        http://localhost:8080/productos
        
        http://localhost:8080/carrito

    Agregar datos a las bases de datos:

        http://localhost:8080/mockdata

