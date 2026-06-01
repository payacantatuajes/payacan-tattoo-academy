# Vincular la landing con Google Sheets

1. Crea una hoja nueva en Google Sheets llamada
   `Postulaciones — Payacán Tattoo Academy`.
2. Importa `output/postulaciones_payacan_tattoo_academy.xlsx` desde
   **Archivo → Importar → Subir → Reemplazar hoja de cálculo**.
3. En esa hoja abre **Extensiones → Apps Script**.
4. Reemplaza el contenido de `Code.gs` con el archivo `Code.gs` de esta carpeta.
5. Presiona **Implementar → Nueva implementación**.
6. Selecciona **Aplicación web**.
7. Configura:
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier usuario**.
8. Autoriza los permisos solicitados y copia la URL terminada en `/exec`.
9. En `script.js`, pega esa URL en `sheetsEndpoint`.

La landing guardará automáticamente cada postulación antes de mostrar el
resumen y mantendrá el botón de WhatsApp como respaldo.
