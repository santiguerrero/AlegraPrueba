# AlegraPrueba
Trabajo para Alegra, visualización de código.
                        ### Estructura de la aplicacion
1 Desarrollo con Zend Framework

  1.1 application - carpeta principal
  
    1.1.1 configs - contiene el archivo configurable de variables, variables de conexion al API
    
    1.1.2 controllers - controladores
    
      1.1.2.1 ApiController.php -> Comunicacion con el API, Interfaz. 
      
    1.1.3 layouts -diseño incial.
    
    1.1.4 models - carpeta para modelos
    
      1.1.4.1 Contact.php - contiene la clase para la tabla
      
      1.1.4.2 ContactMapper.php - comunica el backend de alegra
      
    1.1.5 views - carpeta contenedora de las vistas principales
    
  1.2 test - carpeta para tests, contiene configuracion con zend framework
  
2 Frontend en Ext.js 4.2

  2.1 public - acceso inicial, carpeta publica que contiene el index
  
    2.1.1 app - Estructura Modelo Vista Controlador
    
      2.1.1.1 controller - contiene el controlador de la vista
      
      2.1.1.2 model - modelo de tabla que se debe mostrar
      
      2.1.1.3 store - Comunica el frontend con el backend en ZendFramework
      
      2.1.1.4 view - contiene las vistas
      
    2.1.2 ext4 - contiene la libreria de ExtJS version 4.x
    
    2.1.3 resources - carpeta que contiene recursos como css y las imagenes.
    
  2.2 app.js - inicia el front end
  


                ###Inicializacion del proyecto zend framework configurado con composer. 
                

los archivos composer.json y composer.lock fueron creados para la generacion del framework solicitado via composer ubicado en vendor y e ahi el framework. composer facilita la instalacion de la version de cada framework o framework soportado por el de una manera muy agil.


Requisitos para la conexion de la API de Alegra.com

El archivo **application/configs/application.ini** es en el cual donde debe configurar las siguientes variables:
```
configAlegra.email = "correodealegra"
configAlegra.token = "tokendealegra"
```

