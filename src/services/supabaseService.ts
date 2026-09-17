import { supabase } from './supabaseClient';
import { PatientLead, ChatMessage, AttentionStatus, LabExam } from '../types/lab';

export const supabaseService = {
  async getLeads(): Promise<PatientLead[]> {
    try {
      const { data: leadsData, error: leadsError } = await supabase
        .from('pacientes_leads')
        .select('*')
        .order('updated_at', { ascending: false });

      if (leadsError || !leadsData) {
        console.error('Error fetching leads from Supabase:', leadsError);
        return [];
      }

      const { data: messagesData, error: msgError } = await supabase
        .from('mensajes_chat')
        .select('*')
        .order('created_at', { ascending: true });

      if (msgError) {
        console.error('Error fetching messages from Supabase:', msgError);
      }

      const messagesByLead: Record<string, ChatMessage[]> = {};
      (messagesData || []).forEach(msg => {
        const leadKey = msg.lead_id || msg.whatsapp_id;
        if (!messagesByLead[leadKey]) {
          messagesByLead[leadKey] = [];
        }
        messagesByLead[leadKey].push({
          id: msg.id,
          sender: (msg.emisor as 'PACIENTE' | 'BOT' | 'SECRETARIA') || 'PACIENTE',
          text: msg.contenido,
          timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      });

      return leadsData.map(lead => ({
        id: lead.id,
        whatsapp: lead.whatsapp_id,
        name: lead.nombre_completo || lead.whatsapp_id,
        documentId: lead.documento_identidad || '',
        lastMessage: lead.ultimo_mensaje || '',
        status: (lead.estado_atencion as AttentionStatus) || 'BOT_ACTIVO',
        timestamp: new Date(lead.updated_at || lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        examsRequested: lead.examenes_consultados || [],
        totalQuotedUsd: Number(lead.total_cotizado_usd) || 0,
        createdAt: lead.created_at,
        messages: messagesByLead[lead.id] || messagesByLead[lead.whatsapp_id] || []
      }));
    } catch (err) {
      console.error('Exception in supabaseService.getLeads:', err);
      return [];
    }
  },

  async updateLeadStatus(leadId: string, status: AttentionStatus): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('pacientes_leads')
        .update({ estado_atencion: status, updated_at: new Date().toISOString() })
        .eq('id', leadId);
      return !error;
    } catch (err) {
      console.error('Error updating lead status:', err);
      return false;
    }
  },

  async sendSecretaryMessage(lead: PatientLead, text: string): Promise<boolean> {
    try {
      // 1. Guardar mensaje en Supabase
      await supabase.from('mensajes_chat').insert({
        lead_id: lead.id,
        whatsapp_id: lead.whatsapp,
        emisor: 'SECRETARIA',
        contenido: text
      });

      await supabase.from('pacientes_leads').update({
        ultimo_mensaje: text,
        estado_atencion: 'ESCALADO_HUMANO',
        updated_at: new Date().toISOString()
      }).eq('id', lead.id);

      // 2. Enviar por Evolution API al WhatsApp del paciente
      const cleanPhone = lead.whatsapp.replace(/[^0-9]/g, '');
      fetch(`http://86.48.20.190:8080/message/sendText/gonzalez-prato`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'GonzalezPratoSecret2026'
        },
        body: JSON.stringify({
          number: cleanPhone,
          text: text
        })
      }).catch(e => console.warn('Evolution API dispatch non-blocking notice:', e));

      return true;
    } catch (err) {
      console.error('Error in sendSecretaryMessage:', err);
      return false;
    }
  },

  async getExams(): Promise<LabExam[]> {
    try {
      const { data, error } = await supabase
        .from('examenes')
        .select('*')
        .order('categoria', { ascending: true });

      if (error || !data || data.length === 0) {
        return [];
      }

      return data.map(item => ({
        id: item.id,
        category: item.categoria,
        name: item.nombre_examen,
        synonyms: item.sinonimos || [],
        priceUsd: Number(item.costo_usd) || 0,
        fastingHours: item.requisitos_preanaliticos || '',
        sampleType: item.tipo_muestra || '',
        turnaround: item.tiempo_entrega || '',
        active: item.activo !== false,
        notes: item.notas || undefined
      }));
    } catch (err) {
      console.error('Error fetching exams from Supabase:', err);
      return [];
    }
  },

  async saveExams(exams: LabExam[]): Promise<boolean> {
    try {
      for (const exam of exams) {
        if (exam.id && exam.id.includes('-') && exam.id.length > 20) {
          // UUID update
          await supabase.from('examenes').update({
            categoria: exam.category,
            nombre_examen: exam.name,
            sinonimos: exam.synonyms,
            costo_usd: exam.priceUsd,
            requisitos_preanaliticos: exam.fastingHours,
            tipo_muestra: exam.sampleType,
            activo: exam.active,
            updated_at: new Date().toISOString()
          }).eq('id', exam.id);
        } else {
          // Insert or upsert by name
          await supabase.from('examenes').upsert({
            categoria: exam.category,
            nombre_examen: exam.name,
            sinonimos: exam.synonyms,
            costo_usd: exam.priceUsd,
            requisitos_preanaliticos: exam.fastingHours,
            tipo_muestra: exam.sampleType,
            activo: exam.active,
            updated_at: new Date().toISOString()
          }, { onConflict: 'nombre_examen' });
        }
      }
      return true;
    } catch (err) {
      console.error('Error saving exams to Supabase:', err);
      return false;
    }
  },

  subscribeToLiveUpdates(onChange: () => void) {
    const channel = supabase
      .channel('gp_live_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pacientes_leads' }, () => {
        onChange();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mensajes_chat' }, () => {
        onChange();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'examenes' }, () => {
        onChange();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
};
