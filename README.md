# Bosque Magenta · Portafolio

Sitio estático, sin dependencias de compilación.

## Archivos
- `index.html`: contenido y navegación por secciones.
- `styles.css`: diseño visual.
- `app.js`: navegación, ampliación de artes, filtros y visor de libros.
- `assets/`: imágenes, documentos, audio y video.

## Publicar
1. Descomprimir el ZIP. En GitHub Desktop, crear un repositorio local en esta carpeta o inicializarla con `git init -b main`, añadir y hacer commit. Publicar el repositorio como privado (recomendado).
2. En Render Dashboard, elegir New > Static Site, conectar el repositorio y la rama main. Build Command: `echo "Sitio estático listo"`. Publish Directory: `.`. Activar Auto-Deploy.
3. Render proporcionará la URL pública. Revisar permisos de publicación de los proyectos y recursos externos antes de difundirla.

## Actualizar
Agregar los nuevos archivos a assets, insertar las referencias y textos en index.html, hacer commit y push a main. Render actualizará el sitio automáticamente si Auto-Deploy está activo. El podcast supera el límite de 25 MiB de subida web de GitHub; usar GitHub Desktop o Git.
