# INSUCLICK – Copia de trabajo para integración

Esta carpeta es una copia de trabajo del proyecto INSUCLICK recibido. Los ZIP originales `INSUCLICK.zip` y `kosas-studio.zip` no se modificaron.

## Decisiones confirmadas
- INSUCLICK es el proyecto principal y conserva su identidad visual.
- La portada pública tendrá únicamente accesos a Iniciar sesión y Registrarse (además de la marca/presentación acordada).
- El catálogo, ofertas, categorías, productos y demás módulos estarán disponibles después de autenticarse.
- KOSAS STUDIO es una referencia para reutilizar conceptos y lógica, no una plantilla visual ni un proyecto para copiar encima.

## Hallazgos técnicos iniciales
- INSUCLICK recibido es una aplicación estática HTML/CSS/JavaScript.
- Incluye `index.html`, `login.html`, `registro.html`, `productos.html`, `carrito.html`, `admin.html`, y módulos `js/auth.js`, `js/products.js`, `js/cart.js`, `js/ui.js`.
- `js/auth.js` guarda usuarios y contraseñas en `localStorage` en texto plano. Esto sirve como prototipo, pero no es autenticación segura para producción ni satisface una persistencia backend.
- KOSAS STUDIO también es HTML/CSS/JavaScript. Su controlador de autenticación consulta usuarios de prueba y persiste la sesión en `localStorage`; no es un backend real.
- No se encontró en estos dos ZIP una aplicación Java/Vaadin ni configuración de conexión PostgreSQL.

## Próximo trabajo
1. Revisar requisitos oficiales y repositorio/estructura Java-Vaadin exigida por los profesores.
2. Diseñar el flujo público/privado sin alterar los estilos ni la estructura interna del catálogo de INSUCLICK.
3. Implementar registro/login con backend y persistencia segura; no guardar contraseñas en el navegador.
4. Proteger rutas en el servidor, no solamente ocultar enlaces en JavaScript.
5. Integrar y probar por etapas, conservando esta copia como respaldo.
