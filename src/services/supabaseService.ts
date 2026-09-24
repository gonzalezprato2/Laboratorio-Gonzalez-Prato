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

      // Optimizacion Free Tier: Cargar unicamente mensajes de los ultimos 7 dias para el mapa inicial
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data: messagesData, error: msgError } = await supabase
        .from('mensajes_chat')
        .select('id, lead_id, whatsapp_id, emisor, contenido, created_at')
        .gte('created_at', sevenDaysAgo)
        .order('created_at', { ascending: true })
        .limit(2000);

      if (msgError) {
        console.error('Error fetching messages from Supabase:', msgError);
      }

      const messagesByLead: Record<string, ChatMessage[]> = {};
      (messagesData || []).forEach(msg => {
        const leadKey = msg.lead_id || msg.whatsapp_id;
        if (!leadKey) return;
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

  async getMessagesForLead(leadId: string, whatsappId?: string): Promise<ChatMessage[]> {
    try {
      let query = supabase
        .from('mensajes_chat')
        .select('id, lead_id, whatsapp_id, emisor, contenido, created_at')
        .order('created_at', { ascending: true })
        .limit(500);

      if (leadId && whatsappId) {
        query = query.or(`lead_id.eq.${leadId},whatsapp_id.eq.${whatsappId}`);
      } else if (leadId) {
        query = query.eq('lead_id', leadId);
      } else if (whatsappId) {
        query = query.eq('whatsapp_id', whatsappId);
      } else {
        return [];
      }

      const { data, error } = await query;
      if (error || !data) {
        console.error('Error fetching messages for lead:', error);
        return [];
      }

      return data.map(msg => ({
        id: msg.id,
        sender: (msg.emisor as 'PACIENTE' | 'BOT' | 'SECRETARIA') || 'PACIENTE',
        text: msg.contenido,
        timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
    } catch (err) {
      console.error('Exception in getMessagesForLead:', err);
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

  async deleteLead(leadId: string, whatsappId?: string): Promise<boolean> {
    try {
      // 1. Eliminar mensajes asociados
      if (whatsappId) {
        await supabase
          .from('mensajes_chat')
          .delete()
          .or(`lead_id.eq.${leadId},whatsapp_id.eq.${whatsappId}`);
      } else {
        await supabase
          .from('mensajes_chat')
          .delete()
          .eq('lead_id', leadId);
      }

      // 2. Eliminar el lead del paciente
      const { error } = await supabase
        .from('pacientes_leads')
        .delete()
        .eq('id', leadId);

      if (error && whatsappId) {
        await supabase
          .from('pacientes_leads')
          .delete()
          .eq('whatsapp_id', whatsappId);
      }

      return true;
    } catch (err) {
      console.error('Error in deleteLead:', err);
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
      const records = exams.map(exam => ({
        categoria: exam.category,
        nombre_examen: exam.name,
        sinonimos: exam.synonyms,
        costo_usd: exam.priceUsd,
        requisitos_preanaliticos: exam.fastingHours,
        tipo_muestra: exam.sampleType,
        tiempo_entrega: exam.turnaround,
        activo: exam.active,
        notas: exam.notes || null,
        updated_at: new Date().toISOString()
      }));

      // Upsert por lotes de 50 para máxima velocidad
      const CHUNK_SIZE = 50;
      for (let i = 0; i < records.length; i += CHUNK_SIZE) {
        const chunk = records.slice(i, i + CHUNK_SIZE);
        const { error } = await supabase
          .from('examenes')
          .upsert(chunk, { onConflict: 'nombre_examen' });

        if (error) {
          console.warn('Batch upsert warning:', error);
        }
      }
      return true;
    } catch (err) {
      console.error('Error saving exams to Supabase:', err);
      return false;
    }
  },

  subscribeToLiveUpdates(
    onLeadsOrMessagesChange: () => void,
    onExamsChange?: () => void
  ) {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const debouncedNotify = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        onLeadsOrMessagesChange();
      }, 200);
    };

    const channel = supabase
      .channel('gp_live_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pacientes_leads' }, () => {
        debouncedNotify();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mensajes_chat' }, () => {
        debouncedNotify();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'examenes' }, () => {
        if (onExamsChange) onExamsChange();
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('[Supabase Realtime] Canal WebSockets activo');
        }
      });

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      supabase.removeChannel(channel);
    };
  }
};
