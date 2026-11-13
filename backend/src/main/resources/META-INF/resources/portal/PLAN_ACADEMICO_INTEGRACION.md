# INSUCLICK — Diagnóstico académico y plan de integración

## 1. Objetivo acordado

Construir una sola plataforma INSUCLICK que reúna los aprendizajes de Web 1, Backend 1 y SQL. La demostración de cada materia debe poder explicarse por separado, con ejemplos reales dentro de la misma aplicación. Se conserva el diseño visual de INSUCLICK; KOSAS STUDIO se consulta como referencia de organización y lógica, no como plantilla visual.

## 2. Lo confirmado en los ZIP

### INSUCLICK
- Es un proyecto web estático con HTML, CSS y JavaScript.
- Contiene páginas para inicio, login, registro, productos, carrito, administración, contacto y fundadores.
- Tiene módulos JavaScript separados para autenticación, productos, carrito e interfaz.
- El catálogo de ejemplo está definido en JavaScript y la persistencia se realiza en `localStorage`.
- La autenticación actual también utiliza `localStorage`. La contraseña se guarda como texto legible y la protección de páginas depende del navegador; esto sirve como demostración académica, pero no es autenticación segura para producción.

### KOSAS STUDIO
- También es una aplicación estática HTML/CSS/JavaScript.
- Tiene páginas de catálogo, detalle, registro, publicación de productos y páginas informativas.
- Su JavaScript separa datos, almacenamiento local, alertas, generación de identificadores y controladores de autenticación y catálogo.
- Puede servir como referencia para organizar módulos y flujos; no se copiará su diseño ni se reemplazará la identidad de INSUCLICK.

### Límite técnico de los ZIP
- Ninguno de los dos ZIP contiene código Java, proyecto Maven, aplicación Vaadin ni configuración de PostgreSQL.
- Por tanto, no se puede afirmar que ya exista un backend Java conectado. Esa capa debe integrarse o entregarse como proyecto separado conectado a la interfaz, según los requisitos definitivos de Backend 1.

## 3. Evidencia de los contenidos académicos encontrados

### Web 1
Se encontró una evaluación práctica de JavaScript que exige:
- estructura HTML básica conectada a un archivo JavaScript;
- funciones y variables;
- condicionales y ciclos anidados;
- probar el resultado en el navegador y revisar la consola;
- uso de Git y GitHub, rama `develop`, commits y Pull Request.

El ejercicio asignado identificado es el sistema de taquilla de “Aventura Park”, con tres niveles de menús, validación de cantidades, cálculos, descuentos, acumuladores y estadísticas. La guía prohíbe arreglos y objetos para ese ejercicio concreto.

**Cómo se puede demostrar en INSUCLICK:** formularios HTML, estilos CSS, eventos y validaciones de interfaz, navegación, funciones JavaScript, filtros y acciones del catálogo. El ejercicio Aventura Park se explica como evidencia de lógica JavaScript aprendida, pero no se fuerza dentro de la tienda si no tiene sentido comercial.

### SQL
Se encontró el script `InsuClick_BaseDatos_SQLServer_Estudiante.sql`, que crea las tablas:
- Usuario
- Tienda
- Categoria
- Producto
- Pedido
- DetallePedido
- Fundacion
- Donacion
- DetalleDonacion

Incluye llaves primarias, llaves foráneas, datos de prueba e instrucciones `SELECT` para revisar registros. También se encontró una guía de SQL Server con consultas sencillas de `SELECT`, `WHERE` y `ORDER BY`.

**Cómo se puede demostrar en INSUCLICK:** consultar productos y categorías, registrar usuarios, tiendas y pedidos, y explicar las relaciones entre las tablas. Se deben respetar los contenidos que el profesor haya cubierto; no se presentarán `JOIN`, procedimientos u otros temas como vistos si no están en el material de clase.

### Backend 1
En los materiales localizados aparece documentación de Java sobre estructuras condicionales (`if`, `if/else`, `else if`, `switch`) y, por el contexto académico previo, se debe confirmar el alcance exacto de la entrega de Backend 1. Los ZIP de INSUCLICK y KOSAS no incluyen la implementación Java.

**Cómo se puede demostrar en INSUCLICK:** la lógica de validación, roles, registro, inicio de sesión, gestión de productos y pedidos debe corresponder al lenguaje y herramientas exigidos por el profesor. No se inventará una arquitectura ni se mezclará Java con JavaScript como si fueran lo mismo.

## 4. Propuesta de arquitectura para la exposición

- **Interfaz (Web 1):** la experiencia visual existente de INSUCLICK, conservando HTML/CSS y las interacciones que correspondan.
- **Lógica de servidor (Backend 1):** pendiente de confirmar el marco exigido y el alcance del curso. Debe encargarse de validar y procesar operaciones importantes.
- **Base de datos (SQL):** modelo relacional de INSUCLICK con usuarios, tiendas, categorías, productos, pedidos y donaciones.
- **Modo de exposición:** una sección académica o una guía externa con tres rutas: Web 1, Backend 1 y SQL. Cada ruta muestra objetivo, archivos, conceptos, demostración y explicación en lenguaje de segundo semestre.

## 5. Orden de trabajo

1. Confirmar el lenguaje, framework y requisitos exactos de Backend 1.
2. Revisar los ejercicios y entregables completos de Web 1, Backend 1 y SQL para no omitir temas ni agregar temas no vistos.
3. Comparar el modelo SQL con las pantallas y operaciones actuales de INSUCLICK.
4. Definir contratos de datos entre interfaz, backend y base de datos.
5. Integrar por etapas, conservando la interfaz y manteniendo copias de seguridad.
6. Probar cada flujo: registro/login, consulta de catálogo, administración de productos, carrito/pedido y consultas SQL.
7. Preparar guiones de exposición separados y preguntas probables de cada profesor.

## 6. Regla de seguridad

La autenticación actual basada en `localStorage` es únicamente demostrativa. Para una versión con backend real, las contraseñas deben procesarse de forma segura en el servidor, y la autorización debe verificarse en el servidor; ocultar páginas o botones en JavaScript no protege datos ni operaciones.

## 7. Estado

- Copia de trabajo creada: sí.
- Diagnóstico inicial de ambos ZIP: sí.
- Cambios en el código fuente de la aplicación: todavía no.
- Arquitectura definitiva: pendiente de confirmar Backend 1.
