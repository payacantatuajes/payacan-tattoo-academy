const academyConfig = {
  // Ingresa el WhatsApp oficial en formato internacional, solo números. Ej: "56912345678".
  whatsappNumber: "56965428096",
};

const form = document.querySelector("#admission-form");
const result = document.querySelector("#result");
const summaryElement = document.querySelector("#request-summary");
const deliveryMessage = document.querySelector("#delivery-message");
const whatsappLink = document.querySelector("#whatsapp-link");
const downloadButton = document.querySelector("#download-button");
const newRequestButton = document.querySelector("#new-request");
const ageRange = document.querySelector("#age-range");
const guardianField = document.querySelector("#guardian-field");
const guardianInput = document.querySelector("#guardian");
const courseChecks = [...document.querySelectorAll('input[name="interes"]')];

let latestSummary = "";

function updateGuardianField() {
  const requiresGuardian = ageRange.value === "Menor de 18 años";
  guardianField.hidden = !requiresGuardian;
  guardianInput.required = requiresGuardian;

  if (!requiresGuardian) {
    guardianInput.value = "";
  }
}

function validateCourseSelection() {
  const hasSelection = courseChecks.some((input) => input.checked);
  const message = hasSelection ? "" : "Selecciona al menos un curso de interés.";
  courseChecks[0].setCustomValidity(message);
  return hasSelection;
}

function formatMonth(value) {
  if (!value) return "Por definir";

  const [year, month] = value.split("-");
  return new Intl.DateTimeFormat("es-CL", {
    month: "long",
    year: "numeric",
  }).format(new Date(Number(year), Number(month) - 1));
}

function createSummary(data) {
  const program = data.get("interes");
  const specialties = data.getAll("especializacion").join(", ") || "No informado";
  const submittedAt = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  return [
    "PAYACÁN TATTOO ACADEMY - POSTULACIÓN",
    `Fecha: ${submittedAt}`,
    "",
    "DATOS PERSONALES",
    `Nombre: ${data.get("nombre")}`,
    `WhatsApp: ${data.get("whatsapp")}`,
    `Correo: ${data.get("email")}`,
    `Ciudad o comuna: ${data.get("ciudad")}`,
    `Edad: ${data.get("edad")}`,
    data.get("tutor") ? `Tutor responsable: ${data.get("tutor")}` : null,
    "",
    "PROGRAMA DE INTERÉS",
    `Programa: ${program}`,
    `Especialización: ${specialties}`,
    `Experiencia: ${data.get("experiencia")}`,
    `Modalidad: ${data.get("modalidad")}`,
    `Horario: ${data.get("horario")}`,
    `Inicio preferido: ${formatMonth(data.get("inicio"))}`,
    "",
    "VISIÓN PERSONAL",
    `Qué busca construir: ${data.get("motivacion")}`,
    `Portafolio: ${data.get("portafolio") || "No informado"}`,
    `Comentarios: ${data.get("comentarios") || "Sin comentarios"}`,
    "",
    "La persona autoriza contacto para gestionar su postulación.",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function configureDelivery(summary) {
  if (academyConfig.whatsappNumber) {
    whatsappLink.hidden = false;
    whatsappLink.href = `https://wa.me/${academyConfig.whatsappNumber}?text=${encodeURIComponent(summary)}`;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener";
    deliveryMessage.textContent =
      "Tu postulación está lista. Presiona enviar para compartirla con nuestro equipo por WhatsApp.";
    return;
  }

  whatsappLink.hidden = true;
  deliveryMessage.textContent =
    "Tu postulación está lista para descargar. El envío directo por WhatsApp se habilitará con el número oficial de la academia.";
}

ageRange.addEventListener("change", updateGuardianField);
courseChecks.forEach((checkbox) => {
  checkbox.addEventListener("change", validateCourseSelection);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateCourseSelection()) {
    form.reportValidity();
    return;
  }

  if (!form.reportValidity()) return;

  latestSummary = createSummary(new FormData(form));
  summaryElement.textContent = latestSummary;
  configureDelivery(latestSummary);
  form.hidden = true;
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "start" });
});

downloadButton.addEventListener("click", () => {
  const file = new Blob([latestSummary], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = "postulacion-payacan-tattoo-academy.txt";
  link.click();
  URL.revokeObjectURL(link.href);
});

newRequestButton.addEventListener("click", () => {
  form.reset();
  updateGuardianField();
  validateCourseSelection();
  result.hidden = true;
  form.hidden = false;
  form.scrollIntoView({ behavior: "smooth", block: "start" });
});
