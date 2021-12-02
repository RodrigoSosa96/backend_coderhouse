# Proyecto BACKEND para CoderHouse

## Entrega 30
* ### Instancias PM2 :

    ```bash
    pm2 start ./src/index.ts --name="backend-01" --watch -- 8081
    pm2 start ./src/index.ts --name="backend-02" --watch -- 8082 CLUSTER
    ```
* ### Configuración de nginx:
    ```
    upstream node_app {
        server 127.0.0.1:8081;
        server 127.0.0.1:8082 weight=4;
    }

    server {
        listen       80;
        server_name  nginx_node;

        location /info/ {
            proxy_pass http://node_app;
        }

        location /randoms/ {
            proxy_pass http://node_app;
        }
    }
    ```

* \[[`app.ts 106-129`][1]] - Rutas de random e información

[1]: ./src/app.ts#L106-L129


## Informacion :
* Las entregas se encuentran en sus respectivas branches.
* Si se cambia de rama hacer un npm clean-install
* Rutas :

        https://localhost:8080/
        
        http://localhost:8080/productos
        
        http://localhost:8080/carrito

    Agregar datos a las bases de datos:

        https://localhost:8080/mockdata

