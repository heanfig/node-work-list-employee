```
  _  _         _                            
 | || |__ _ __| |_____ _ ___ __ ____ _ _  _ 
 | __ / _` / _| / / -_) '_\ V  V / _` | || |
 |_||_\__,_\__|_\_\___|_|  \_/\_/\__,_|\_, |
                                       |__/ 
```
Ambiente de pruebas: **npm install**

**ANOTACIONES** Para las dependencias adicionales yo use bower y gulp para hacerle merge a todos los componentes de angular excepto la logica de la aplicación pero las dependencias que se hicieron merge estan en trash/bower.json

**USUARIO Y CONTRASEÑA** 
**USUARIO Y CONTRASEÑA** 

usuario: heanfig@gmail.com
password: 123456

**USUARIO Y CONTRASEÑA** 
**USUARIO Y CONTRASEÑA** 


Archivos Importantes
app/routes.js

![Dashboard](http://i.imgur.com/L9OuT7p.png)

```
{
  "name": "yapp",
  "version": "0.0.0",
  "dependencies": {
    "angular": "^1.3.0",
    "json3": "^3.3.0",
    "es5-shim": "^4.0.0",
    "bootstrap": "^3.2.0",
    "angular-mocks": "~1.3.14",
    "ui-router": "~0.2.13",
    "bootstrap-btn-outline-rounded": "~0.0.3",
    "angular-animate": "~1.3.15",
    "components-font-awesome": "~4.3.0",
    "angular-snap": "~1.8.1"
  },
  "devDependencies": {
    "angular-mocks": "~1.3.0"
  },
  "resolutions": {
    "angular": "1.3.14"
  }
}
```

**Referencias (FrontEnd)** https://github.com/start-angular/versatile-dashboard-theme

### Tecnologías

Esta hecho en

* [AngularJS] - 
* [Twitter Bootstrap] - Crea apps modernas
* [node.js] - I/O para el backend
* [Express] - Rápido Framework para nodejs

* [Gulp] - the streaming build system
* [MongoDB] - Bases de datos no relacionales
* [jQuery] - duh

**Free Software, Hell Yeah!**

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>


### Fallos de seguridad

### Server Side JS Injection (SSJI)
### _____________________________

![Dashboard](http://i.imgur.com/VwunPoD.png)
![Dashboard](http://i.imgur.com/8F60w0p.png)




### Vulnerabilidades en gestión de sesiones (session timeout y cookies no protegidas,password guessing, etc.)
### _____________________________

![Dashboard](http://i.imgur.com/30Mf6vm.png)


### _____________________________
### Regex DDOS

![Dashboard](http://i.imgur.com/g7tFgNB.png)


### HTTP Parameter Pollution (HPP)(ASUMIENDO QUE ESTA RUTA ES VIA SERVER)
### _____________________________

![Dashboard](http://i.imgur.com/NQ8bJnJ.png)


### - Command Execution.
### _____________________________

![Dashboard](http://i.imgur.com/ZdEsrvS.png)


### - Content Spoofing
### _____________________________

![Dashboard](http://i.imgur.com/VB5cgFk.png)
