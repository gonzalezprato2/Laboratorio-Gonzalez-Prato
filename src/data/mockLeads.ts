import { PatientLead } from '../types/lab';

// Bandeja vacía — los leads reales llegan desde el bot de WhatsApp (Evolution API + n8n)
// No hay datos de demostración en producción
export const INITIAL_LEADS: PatientLead[] = [];