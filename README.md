# Formulario Payacan Tattoo Academy

Página web responsive para recibir consultas de admisión de personas interesadas
en estudiar tatuaje.

## Identidad visual

La landing integra el logo oficial y un detalle fotográfico editorial derivado
del dossier de Payacán Tattoo Academy:

- `assets/logo-payacan-oficial.png`: lockup oficial preparado sobre transparencia.
- `assets/isotipo-payacan-blanco.png`: isotipo oficial de respaldo.
- `assets/dossier-tattoo-detail.jpg`: recorte fotográfico utilizado en portada.

## Abrir el formulario

Abre `index.html` en un navegador. No requiere instalación ni conexión a
internet.

## Envío por WhatsApp

El envío por WhatsApp está configurado con el número oficial entregado para la
academia. Si en el futuro cambia, edita `script.js` usando formato internacional
y solo números:

```js
const academyConfig = {
  whatsappNumber: "56965428096",
};
```

Después de completar el formulario aparecerá el botón **Enviar por WhatsApp**,
que prepara el mensaje con la solicitud.

## Publicarlo

Los archivos `index.html`, `styles.css` y `script.js` pueden publicarse juntos
en cualquier alojamiento web estático. Si se necesita almacenar cada respuesta
en una planilla o base de datos, será necesario conectar un servicio de
formularios o un backend.
