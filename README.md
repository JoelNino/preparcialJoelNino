EJECUCIÓN DE PRUEBAS

Para ejecutar las pruebas, primero hay que asegurarse de estar dentro de la carpeta del proyecto ejecutando cd preparcial, luego se instalan las dependencias con npm install y se corren las pruebas con npm test.

CAMBIOS PRE-PARCIAL Y PARCIAL

La persistencia de datos entre rutas se logró mediante el uso de un Contexto de React (AuthorsContext) que actúa como un estado global dentro de la aplicación. Este contexto se encarga de almacenar la lista de autores y proveer funciones para agregarlos, actualizarlos y eliminarlos, permitiendo que cualquier componente que utilice el hook `useAuthors` acceda a la misma información sin perderla al navegar entre páginas. Al inicializarse, el contexto realiza una petición a la API para cargar los autores y guardarlos en el estado, lo que garantiza que los datos estén disponibles en todas las rutas que estén dentro del AuthorsProvider. Por otro lado, la lógica de filtrado se hizo directamente en el componente de listado mediante un estado local que guarda el texto de búsqueda. cada vez que el usuario escribe en el campo de búsqueda, se aplica el método filter sobre el arreglo de autores comparando el nombre de cada autor con el texto ingresado, lo que permite mostrar dinámicamente solo los resultados que coinciden.
