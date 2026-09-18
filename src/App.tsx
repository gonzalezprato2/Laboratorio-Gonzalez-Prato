import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LiveInbox } from './components/LiveInbox';
import { PricingManager } from './components/PricingManager';
import { KnowledgeBase } from './components/KnowledgeBase';
import { PatientsCRM } from './components/PatientsCRM';
import { MetricsDashboard } from './components/MetricsDashboard';
import { SettingsView } from './components/SettingsView';
import { WhatsAppSimulator } from './components/WhatsAppSimulator';
import { storageService } from './services/storageService';
import { supabaseService } from './services/supabaseService';
import { audioAlarm } from './services/audioAlarmService';
import { processPatientMessage } from './services/clinicalAiEngine';
import { LabExam, PatientLead, SystemConfig, AttentionStatus } from './types/lab';

export default function App() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'pricing' | 'knowledge' | 'patients' | 'metrics' | 'settings' | 'simulator'>('inbox');
  const [exams, setExams] = useState<LabExam[]>([]);
  const [leads, setLeads] = useState<PatientLead[]>([]);
  const [config, setConfig] = useState<SystemConfig>(storageService.getConfig());
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadExams = async () => {
    const realExams = await supabaseService.getExams();
    if (realExams && realExams.length > 0) {
      setExams(realExams);
    } else {
      setExams(storageService.getExams());
    }
  };

  const loadLeads = async () => {
    const realLeads = await supabaseService.getLeads();
    if (realLeads && realLeads.length > 0) {
      setLeads(realLeads);
      setActiveLeadId(prev => prev || realLeads[0].id);
    } else {
      const local = storageService.getLeads();
      setLeads(local);
      if (local.length > 0) setActiveLeadId(prev => prev || local[0].id);
    }
  };

  const handleRefreshLeads = async () => {
    setIsRefreshing(true);
    await loadLeads();
    await loadExams();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Carga inicial, polling de respaldo y suscripción Realtime a Supabase
  useEffect(() => {
    loadExams();
    loadLeads();

    // Polling de respaldo cada 10 segundos para garantizar actualización constante
    const pollInterval = setInterval(() => {
      loadLeads();
    }, 10000);

    // Suscripción Realtime por WebSockets a Supabase
    const unsubscribe = supabaseService.subscribeToLiveUpdates(() => {
      loadLeads();
      loadExams();
    });

    return () => {
      clearInterval(pollInterval);
      unsubscribe();
    };
  }, []);

  const hasUrgentEscalated = leads.some(l => l.status === 'ESCALADO_HUMANO');

  useEffect(() => {
    if (hasUrgentEscalated && config.soundAlarmEnabled) {
      audioAlarm.startContinuousAlarm(3500);
    } else {
      audioAlarm.stopAlarm();
    }
    return () => {
      audioAlarm.stopAlarm();
    };
  }, [hasUrgentEscalated, config.soundAlarmEnabled]);

  const handleToggleSound = () => {
    const updated = !config.soundAlarmEnabled;
    const newCfg = { ...config, soundAlarmEnabled: updated };
    setConfig(newCfg);
    storageService.saveConfig(newCfg);
    audioAlarm.setMuted(!updated);
  };

  const handleUpdateExams = async (updated: LabExam[]) => {
    setExams(updated);
    storageService.saveExams(updated);
    await supabaseService.saveExams(updated);
  };

  const handleSaveConfig = (newConfig: SystemConfig) => {
    setConfig(newConfig);
    storageService.saveConfig(newConfig);
  };

  const handleSelectTab = (tab: 'inbox' | 'pricing' | 'knowledge' | 'patients' | 'metrics' | 'settings' | 'simulator') => {
    setActiveTab(tab);
  };

  const handleSendMessage = async (leadId: string, text: string, sender: 'SECRETARIA' | 'BOT') => {
    const targetLead = leads.find(l => l.id === leadId);
    if (targetLead && sender === 'SECRETARIA') {
      await supabaseService.sendSecretaryMessage(targetLead, text);
    }

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updatedLeads = leads.map(lead => {
      if (lead.id === leadId) {
        const newMsg = {
          id: 'msg-' + Date.now(),
          sender,
          text,
          timestamp: timeNow
        };
        return {
          ...lead,
          status: sender === 'SECRETARIA' ? ('ESCALADO_HUMANO' as const) : lead.status,
          lastMessage: text,
          timestamp: timeNow,
          messages: [...lead.messages, newMsg]
        };
      }
      return lead;
    });
    setLeads(updatedLeads);
    storageService.saveLeads(updatedLeads);
  };

  const handleUpdateLeadStatus = async (leadId: string, status: AttentionStatus) => {
    await supabaseService.updateLeadStatus(leadId, status);
    const updatedLeads = leads.map(l => l.id === leadId ? { ...l, status } : l);
    setLeads(updatedLeads);
    storageService.saveLeads(updatedLeads);
  };

  const handleResolveHandover = async (leadId: string) => {
    await handleUpdateLeadStatus(leadId, 'BOT_ACTIVO');
  };

  const handleNewPatientMessage = (messageText: string, isWeekendSimulated?: boolean) => {
    const analysis = processPatientMessage(messageText, exams, undefined, config.scheduleConfig, isWeekendSimulated, config);
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const targetLeadId = activeLeadId || 'lead-1';

    const updatedLeads = leads.map(lead => {
      if (lead.id === targetLeadId) {
        const userMsg = {
          id: 'msg-user-' + Date.now(),
          sender: 'PACIENTE' as const,
          text: messageText,
          timestamp: timeNow
        };
        const botMsg = {
          id: 'msg-bot-' + Date.now(),
          sender: 'BOT' as const,
          text: analysis.replyText,
          timestamp: timeNow,
          quotedExams: analysis.matchedExams.map(e => e.name),
          totalUsd: analysis.totalUsd,
          isOutOfHours: analysis.isOutOfHours
        };

        const newExams = Array.from(new Set([...lead.examsRequested, ...analysis.matchedExams.map(e => e.name)]));

        return {
          ...lead,
          lastMessage: messageText,
          status: analysis.shouldEscalate ? analysis.escalationStatus : lead.status,
          timestamp: timeNow,
          examsRequested: newExams,
          totalQuotedUsd: (lead.totalQuotedUsd || 0) + analysis.totalUsd,
          messages: [...lead.messages, userMsg, botMsg],
          isWeekendLead: isWeekendSimulated
        };
      }
      return lead;
    });

    setLeads(updatedLeads);
    storageService.saveLeads(updatedLeads);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Header 
        activeTab={activeTab} 
        onSelectTab={handleSelectTab} 
        hasEscalated={hasUrgentEscalated} 
        soundEnabled={config.soundAlarmEnabled} 
        toggleSound={handleToggleSound} 
      />
      <main className="flex-1 p-4 lg:p-6 max-w-7xl w-full mx-auto">
        {activeTab === "inbox" && (
          <LiveInbox 
            leads={leads} 
            activeLeadId={activeLeadId} 
            setActiveLeadId={setActiveLeadId} 
            onSendMessage={handleSendMessage} 
            onResolveHandover={handleResolveHandover} 
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onRefresh={handleRefreshLeads}
            isRefreshing={isRefreshing}
          />
        )}
        {activeTab === "pricing" && (
          <PricingManager 
            exams={exams} 
            onUpdateExams={handleUpdateExams} 
          />
        )}
        {activeTab === "knowledge" && (
          <KnowledgeBase />
        )}
        {activeTab === "patients" && (
          <PatientsCRM 
            leads={leads} 
            onSelectLead={(id) => { setActiveLeadId(id); setActiveTab("inbox"); }} 
          />
        )}
        {activeTab === "metrics" && (
          <MetricsDashboard 
            leads={leads} 
            exams={exams} 
          />
        )}
        {activeTab === "settings" && (
          <SettingsView 
            config={config} 
            onSaveConfig={handleSaveConfig} 
          />
        )}
        {activeTab === "simulator" && (
          <WhatsAppSimulator 
            catalog={exams} 
            config={config}
            scheduleConfig={config.scheduleConfig} 
            onNewPatientMessage={handleNewPatientMessage} 
          />
        )}
      </main>
    </div>
  );
}