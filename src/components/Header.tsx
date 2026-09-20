import React from 'react';
import { 
  FlaskConical, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  Users, 
  DollarSign, 
  Activity, 
  Smartphone, 
  Database, 
  Settings
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'inbox' | 'pricing' | 'patients' | 'metrics' | 'settings' | 'simulator';
  onSelectTab: (tab: 'inbox' | 'pricing' | 'patients' | 'metrics' | 'settings' | 'simulator') => void;
  hasEscalated: boolean;
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  hasEscalated,
  soundEnabled,
  toggleSound
}) => {
  const tabs = [
    { id: "inbox", label: "Bandeja en Vivo", icon: MessageSquare },
    { id: "pricing", label: "Tarifario & Ayunos", icon: DollarSign },
    { id: "patients", label: "Pacientes & CRM", icon: Users },
    { id: "metrics", label: "Analítica", icon: Activity },
    { id: "settings", label: "Configuración", icon: Settings },
    { id: "simulator", label: "Simulador WhatsApp", icon: Smartphone },
  ];

  return (
    <header className="bg-[#0E4D58] text-white px-4 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between shadow-lg border-b-2 border-[#00A8B5] gap-4 sticky top-0 z-50">
      <div className="flex items-center gap-3.5">
        <div className="bg-gradient-to-br from-[#00A8B5] to-[#0E4D58] p-2.5 rounded-xl border border-teal-300/30 shadow-inner flex items-center justify-center">
          <FlaskConical className="w-6 h-6 text-cyan-200" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-base sm:text-lg tracking-wider uppercase text-white drop-shadow-sm">
              GONZALEZ - PRATO
            </h1>
            <span className="bg-[#00A8B5] text-[10px] font-black px-2 py-0.5 rounded tracking-widest text-white shadow-sm">
              LABORATORIO
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-teal-100/90 font-medium">
            <span>Centro de Mando Clínico</span>
            <span className="text-teal-400">•</span>
            <span className="bg-emerald-950/60 text-emerald-300 px-2 py-0.5 rounded-lg border border-emerald-500/30 text-[10px] font-semibold">
              Precios Oficiales en USD ($)
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {hasEscalated && (
          <div className="flex items-center gap-2 bg-rose-600/95 border border-rose-400/50 text-white text-xs font-black px-3.5 py-1.5 rounded-full animate-bounce shadow-xl">
            <AlertTriangle className="w-4 h-4 text-amber-200 animate-pulse" />
            <span className="tracking-wide">¡SECRETARÍA REQUERIDA!</span>
          </div>
        )}

        <button onClick={toggleSound} title={soundEnabled ? "Silenciar alarma" : "Activar sonido de alarma"} className={"flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all " + (soundEnabled ? "bg-[#165A65] border-teal-300/30 text-teal-100 hover:bg-[#1D6B77]" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700")}>
          {soundEnabled ? (<><Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" /><span className="hidden sm:inline font-medium">Alarma Activa</span></>) : (<><VolumeX className="w-4 h-4 text-rose-400" /><span className="hidden sm:inline font-medium">Silenciado</span></>)}
        </button>

        <nav className="flex items-center gap-1 bg-[#09353D] p-1 rounded-xl border border-teal-800/40 shadow-inner">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button 
                key={tab.id} 
                onClick={() => onSelectTab(tab.id as any)} 
                className={"flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative " + (
                  isActive 
                    ? "bg-[#00A8B5] text-white shadow-md font-bold" 
                    : "text-teal-100/90 hover:text-white hover:bg-white/5"
                )}
                title={tab.label}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};