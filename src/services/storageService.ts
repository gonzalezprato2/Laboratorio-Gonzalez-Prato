import { LabExam, PatientLead, SystemConfig } from '../types/lab';
import { INITIAL_EXAMS } from '../data/initialExams';
import { INITIAL_LEADS } from '../data/mockLeads';

const EXAMS_KEY = 'gp_lab_exams_v3';
const LEADS_KEY = 'gp_lab_leads_v3'; // v3: catálogo maestro actualizado 187 pruebas
const CONFIG_KEY = 'gp_lab_config_v3';

// Purga automática de versiones anteriores de caché en el navegador del cliente
try {
  const legacyKeys = ['gp_lab_exams', 'gp_lab_exams_v1', 'gp_lab_exams_v2', 'gp_lab_leads', 'gp_lab_leads_v1', 'gp_lab_leads_v2', 'gp_lab_config', 'gp_lab_config_v1', 'gp_lab_config_v2'];
  legacyKeys.forEach(k => localStorage.removeItem(k));
} catch (e) {}

export const DEFAULT_CONFIG: SystemConfig = {
  soundAlarmEnabled: true,
  laboratoryName: 'GONZALEZ-PRATO Laboratorio',
  directorName: 'Luisa Carolina González Ramírez',
  receptionPhone: '0412-0798069',
  workingHours: 'Lunes a Viernes: 7:00 AM - 3:00 PM | Sábados: 8:00 AM - 1:00 PM',
  address: 'PISO SOTANO, EDIF, Clinica del Nino, AV 2 LORA CON, LOCAL 2-2 CALLE 42, Mérida 5101, Mérida',
  welcomeMessage: '¡Hola! Bienvenido a *GONZALEZ-PRATO Laboratorio* 🧪 (Dirección Técnica: Luisa Carolina González Ramírez).\n\nSoy su Asistente Clínico Virtual disponible 24/7 para brindarle:\n• 💰 Cotizaciones instantáneas de más de 180 exámenes en USD ($).\n• ⏱️ Requisitos de ayuno y preparación de muestras.\n• 🔬 Protocolos de Microbiología, Coproanálisis, Uroanálisis y Estudios Micológicos.\n• 🏛️ Información del Convenio Torre Caracas (pruebas especiales remitidas a Caracas).\n• 📋 Formas de pago (Divisas en efectivo, Bolívares a tasa oficial BCV, Transferencia y Punto de Venta).\n\n¿Qué prueba médica o perfil desea consultar hoy?\n*(En cualquier momento puede escribir "secretaria" para hablar con nuestro equipo).*',
  scheduleConfig: {
    weekdaysOpen: '07:00',
    weekdaysClose: '15:00',
    saturdayEnabled: true,
    saturdayOpen: '08:00',
    saturdayClose: '13:00',
    sundayEnabled: false,
    sundayOpen: '08:00',
    sundayClose: '12:00',
    silenceAlarmsOutOfHours: true,
    outOfHoursCustomMessage: 'Estimado paciente, nuestra sede física se encuentra en receso fuera de horario laboral. He registrado su solicitud con prioridad alta para que nuestra secretaría le atienda a primera hora del siguiente día hábil.'
  }
};

export const storageService = {
  getExams(): LabExam[] {
    const saved = localStorage.getItem(EXAMS_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    localStorage.setItem(EXAMS_KEY, JSON.stringify(INITIAL_EXAMS));
    return INITIAL_EXAMS;
  },
  saveExams(exams: LabExam[]) {
    localStorage.setItem(EXAMS_KEY, JSON.stringify(exams));
  },
  getLeads(): PatientLead[] {
    const saved = localStorage.getItem(LEADS_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    localStorage.setItem(LEADS_KEY, JSON.stringify(INITIAL_LEADS));
    return INITIAL_LEADS;
  },
  saveLeads(leads: PatientLead[]) {
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  },
  getConfig(): SystemConfig {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) {
      try { return { ...DEFAULT_CONFIG, ...JSON.parse(saved) }; } catch (e) {}
    }
    return DEFAULT_CONFIG;
  },
  saveConfig(cfg: SystemConfig) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  },
  resetDefaults() {
    localStorage.setItem(EXAMS_KEY, JSON.stringify(INITIAL_EXAMS));
    localStorage.setItem(LEADS_KEY, JSON.stringify(INITIAL_LEADS));
    localStorage.setItem(CONFIG_KEY, JSON.stringify(DEFAULT_CONFIG));
  }
};