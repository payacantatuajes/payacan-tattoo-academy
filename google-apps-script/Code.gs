const SPREADSHEET_ID = "17DAWhg5rd6fZ_QK2n8cWUbrrx4HnsBnfhqejv1YcEbc";
const APPLICATIONS_SHEET = "Postulaciones";

const HEADERS = [
  "Fecha de postulación",
  "Nombre completo",
  "WhatsApp",
  "Correo",
  "Ciudad o comuna",
  "Edad",
  "Tutor responsable",
  "Programa",
  "Especializaciones",
  "Experiencia",
  "Modalidad",
  "Horario",
  "Inicio preferido",
  "Visión personal",
  "Instagram o portafolio",
  "Comentarios",
  "Consentimiento",
  "Origen",
  "ID postulación",
  "Fecha actualización",
  "Estado",
  "Último contacto",
  "Próximo seguimiento",
  "Reserva",
  "Monto pagado",
  "Saldo pendiente",
  "Fecha de inicio",
  "Responsable",
  "Observaciones internas",
];

function doGet() {
  setupSheet();
  return jsonResponse({ ok: true, service: "Payacán Tattoo Academy" });
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents);
    validatePayload(payload);

    const sheet = setupSheet();
    const now = new Date();
    const applicationId = Utilities.getUuid();

    sheet.appendRow([
      now,
      payload.nombre,
      payload.whatsapp,
      payload.email,
      payload.ciudad,
      payload.edad,
      payload.tutor || "",
      payload.interes,
      (payload.especializacion || []).join(", "),
      payload.experiencia,
      payload.modalidad,
      payload.horario,
      payload.inicio || "",
      payload.motivacion,
      payload.portafolio || "",
      payload.comentarios || "",
      payload.consentimiento ? "Sí" : "No",
      "Landing web",
      applicationId,
      now,
      "Nuevo interesado",
      "",
      "",
      "Sin reserva",
      "",
      "",
      "",
      "",
      "",
    ]);

    return jsonResponse({ ok: true, applicationId });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message });
  }
}

function setupSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(APPLICATIONS_SHEET);

  if (!sheet) {
    const sheets = spreadsheet.getSheets();
    const firstSheet = sheets[0];
    const isBlankDefaultSheet =
      sheets.length === 1 &&
      firstSheet.getLastRow() === 0 &&
      firstSheet.getLastColumn() === 0;

    sheet = isBlankDefaultSheet
      ? firstSheet.setName(APPLICATIONS_SHEET)
      : spreadsheet.insertSheet(APPLICATIONS_SHEET);
  }

  ensureHeaders(sheet);
  sheet.setFrozenRows(1);
  return sheet;
}

function ensureHeaders(sheet) {
  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const needsHeaders = HEADERS.some((header, index) => currentHeaders[index] !== header);

  if (needsHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function validatePayload(payload) {
  const required = [
    "nombre",
    "whatsapp",
    "email",
    "ciudad",
    "edad",
    "interes",
    "experiencia",
    "modalidad",
    "horario",
    "motivacion",
  ];
  const missing = required.filter((key) => !payload[key]);

  if (missing.length) {
    throw new Error(`Faltan campos requeridos: ${missing.join(", ")}`);
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
