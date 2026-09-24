import React, { useState, useEffect, useRef } from 'react';
import { PatientLead, ChatMessage, AttentionStatus } from '../types/lab';
import { 
  Search, 
  Send, 
  UserCheck, 
  Bot, 
  AlertTriangle, 
  Phone, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Moon,
  PauseCircle,
  PlayCircle,
  Archive,
  Info,
  RefreshCw,
  Trash2
} from 'lucide-react';

interface LiveInboxProps {
  leads: PatientLead[];
  activeLeadId: string | null;
  setActiveLeadId: (id: string) => void;
  onSendMessage: (leadId: string, text: string, sender: 'SECRETARIA' | 'BOT') => void;
  onResolveHandover: (leadId: string) => void;
  onUpdateLeadStatus?: (leadId: string, status: AttentionStatus) => void;
  onDeleteLead?: (leadId: string, whatsappId?: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const LiveInbox: React.FC<LiveInboxProps> = ({ 
  leads, 
  activeLeadId, 
  setActiveLeadId, 
  onSendMessage, 
  onResolveHandover,
  onUpdateLeadStatus,
  onDeleteLead,
  onRefresh,
  isRefreshing
}) => {
  const [filterText, setFilterText] = useState('');
  const [operatorInput, setOperatorInput] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ESCALADO_HUMANO' | 'ESCALADO_FUERA_HORARIO' | 'BOT_ACTIVO' | 'FINALIZADO'>('ALL');
  const [leadToDelete, setLeadToDelete] = useState<PatientLead | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesQuery = lead.name.toLowerCase().includes(filterText.toLowerCase()) || 
                         lead.whatsapp.includes(filterText) || 
                         lead.lastMessage.toLowerCase().includes(filterText.toLowerCase());
    if (statusFilter === 'ALL') return matchesQuery;
    return matchesQuery && lead.status === statusFilter;
  });

  const activeLead = leads.find(l => l.id === activeLeadId) || leads[0];

  const lastMessageKey = activeLead?.messages?.length 
    ? `${activeLead.messages.length}-${activeLead.messages[activeLead.messages.length - 1].id}` 
    : 'none';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeLead?.id, lastMessageKey]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!operatorInput.trim() || !activeLead) return;
    onSendMessage(activeLead.id, operatorInput.trim(), 'SECRETARIA');
    setOperatorInput('');
  };

  const handleStatusChange = (newStatus: AttentionStatus) => {
    if (!activeLead) return;
    if (onUpdateLeadStatus) {
      onUpdateLeadStatus(activeLead.id, newStatus);
    } else if (newStatus === 'BOT_ACTIVO') {
      onResolveHandover(activeLead.id);
    }
  };

  const isHumanHandling = activeLead?.status === 'ESCALADO_HUMANO' || activeLead?.status === 'ESCALADO_FUERA_HORARIO';
  const isFinalized = activeLead?.status === 'FINALIZADO';
  const isBotActive = activeLead?.status === 'BOT_ACTIVO';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[calc(100vh-140px)] min-h-[640px]">
      {/* Columna Izquierda: Directorio de Conversaciones */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/80 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xs text-slate-700 tracking-wider uppercase flex items-center gap-2">
              <span>Bandeja de Entrada en Vivo</span>
              <span className="bg-teal-100 text-[#0E4D58] text-[10px] font-extrabold px-2 py-0.5 rounded-full">{leads.length} Pacientes</span>
            </h2>
            <div className="flex items-center gap-3">
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  title="Actualizar mensajes ahora"
                  className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#0E4D58] bg-white px-2 py-1 rounded-lg border border-slate-200 hover:border-slate-300 shadow-2xs transition-all disabled:opacity-50"
                >
                  <RefreshCw className={"w-3 h-3 " + (isRefreshing ? 'animate-spin text-[#00A8B5]' : '')} />
                  <span>{isRefreshing ? 'Actualizando...' : 'Actualizar'}</span>
                </button>
              )}
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>Live Sync
              </span>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar paciente, teléfono o mensaje..." 
              value={filterText} 
              onChange={(e) => setFilterText(e.target.value)} 
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A8B5] bg-white" 
            />
          </div>

          <div className="flex flex-wrap gap-1.5 text-[11px]">
            <button 
              onClick={() => setStatusFilter('ALL')} 
              className={"px-2.5 py-1 rounded-lg font-semibold transition-all " + (statusFilter === 'ALL' ? 'bg-[#0E4D58] text-white' : 'bg-slate-200/70 text-slate-600 hover:bg-slate-200')}
            >
              Todos ({leads.length})
            </button>
            <button 
              onClick={() => setStatusFilter('ESCALADO_HUMANO')} 
              className={"px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all " + (statusFilter === 'ESCALADO_HUMANO' ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-700 hover:bg-rose-200')}
            >
              <AlertTriangle className="w-3 h-3" />
              Atención Humana ({leads.filter(l => l.status === 'ESCALADO_HUMANO').length})
            </button>
            <button 
              onClick={() => setStatusFilter('ESCALADO_FUERA_HORARIO')} 
              className={"px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all " + (statusFilter === 'ESCALADO_FUERA_HORARIO' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200')}
            >
              <Moon className="w-3 h-3" />
              Guardia ({leads.filter(l => l.status === 'ESCALADO_FUERA_HORARIO').length})
            </button>
            <button 
              onClick={() => setStatusFilter('BOT_ACTIVO')} 
              className={"px-2.5 py-1 rounded-lg font-semibold transition-all " + (statusFilter === 'BOT_ACTIVO' ? 'bg-teal-700 text-white' : 'bg-teal-50 text-teal-700 hover:bg-teal-100')}
            >
              Bot ({leads.filter(l => l.status === 'BOT_ACTIVO').length})
            </button>
            <button 
              onClick={() => setStatusFilter('FINALIZADO')} 
              className={"px-2.5 py-1 rounded-lg font-semibold transition-all " + (statusFilter === 'FINALIZADO' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}
            >
              Finalizados ({leads.filter(l => l.status === 'FINALIZADO').length})
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
          {filteredLeads.map(lead => {
            const isSelected = activeLead?.id === lead.id;
            const isUrgent = lead.status === 'ESCALADO_HUMANO';
            const isOutOfHours = lead.status === 'ESCALADO_FUERA_HORARIO';
            const isLeadFinalized = lead.status === 'FINALIZADO';

            let baseBg = 'hover:bg-slate-50 border-transparent';
            if (isUrgent) {
              baseBg = isSelected ? 'bg-rose-100/90 border-rose-600 ring-2 ring-rose-500/40' : 'bg-rose-50/70 border-rose-500 hover:bg-rose-100/60';
            } else if (isOutOfHours) {
              baseBg = isSelected ? 'bg-indigo-100/90 border-indigo-600 ring-2 ring-indigo-500/40' : 'bg-indigo-50/60 border-indigo-500 hover:bg-indigo-100/60';
            } else if (isLeadFinalized) {
              baseBg = isSelected ? 'bg-slate-200 border-slate-500 opacity-90' : 'bg-slate-50/70 border-slate-300 opacity-75 hover:bg-slate-100';
            } else {
              baseBg = isSelected ? 'bg-teal-50/90 border-[#00A8B5] ring-2 ring-[#00A8B5]/30' : 'border-transparent hover:bg-slate-50';
            }

            return (
              <div 
                key={lead.id} 
                onClick={() => setActiveLeadId(lead.id)} 
                className={`group p-3.5 cursor-pointer transition-all border-l-4 relative rounded-r-lg ${baseBg}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                    {lead.name}
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A8B5]" title="Chat activo en visor"></span>
                    )}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1"><Clock className="w-3 h-3" /> {lead.timestamp}</span>
                    {onDeleteLead && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLeadToDelete(lead);
                        }}
                        title="Eliminar conversación"
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-xs text-slate-600 line-clamp-1 mb-2">{lead.lastMessage}</p>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-slate-500 text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">{lead.whatsapp}</span>
                  
                  {isUrgent && (
                    <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded animate-pulse shadow-sm">
                      🚨 ATENCIÓN HUMANA
                    </span>
                  )}
                  {isOutOfHours && (
                    <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <Moon className="w-3 h-3 text-indigo-600" /> Pendiente Guardia
                    </span>
                  )}
                  {lead.status === 'BOT_ACTIVO' && (
                    <span className="bg-teal-100 text-[#0E4D58] text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <Bot className="w-3 h-3 text-[#00A8B5]" /> Bot Activo
                    </span>
                  )}
                  {isLeadFinalized && (
                    <span className="bg-slate-200 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      <Archive className="w-3 h-3 text-slate-500" /> Finalizado
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Columna Derecha: Panel de Chat y Controles del Operador */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        {activeLead ? (
          <>
            {/* Header del Chat con Controles de Desactivación y Reactivación del Bot */}
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0E4D58] to-[#00A8B5] text-white font-bold flex items-center justify-center text-sm shadow">
                  {activeLead.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    {activeLead.name}
                    {activeLead.documentId && (
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-mono px-1.5 py-0.2 rounded font-normal">
                        {activeLead.documentId}
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <Phone className="w-3 h-3 text-teal-600" />
                    <span>{activeLead.whatsapp}</span>
                  </div>
                </div>
              </div>

              {/* Controles de Estado de la Conversación */}
              <div className="flex items-center gap-2 flex-wrap">
                {isHumanHandling ? (
                  <>
                    <button 
                      onClick={() => handleStatusChange('BOT_ACTIVO')} 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow flex items-center gap-1.5"
                      title="Reactivar el Asistente IA para que responda automáticamente al paciente"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Resolver y Devolver al Bot</span>
                    </button>
                    <button 
                      onClick={() => handleStatusChange('FINALIZADO')} 
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
                      title="Finalizar la conversación manteniendo el bot inactivo"
                    >
                      <Archive className="w-3.5 h-3.5" />
                      <span>Finalizar</span>
                    </button>
                  </>
                ) : isFinalized ? (
                  <>
                    <span className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl border border-slate-300 flex items-center gap-1.5">
                      <Archive className="w-3.5 h-3.5 text-slate-500" />
                      Chat Finalizado (Bot Inactivo)
                    </span>
                    <button 
                      onClick={() => handleStatusChange('BOT_ACTIVO')} 
                      className="bg-[#00A8B5] hover:bg-[#008f9a] text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow flex items-center gap-1.5"
                    >
                      <Bot className="w-4 h-4" />
                      <span>Reactivar Bot</span>
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-xs bg-teal-50 text-teal-800 font-bold px-3 py-1.5 rounded-xl border border-teal-200 flex items-center gap-1">
                      <Bot className="w-3.5 h-3.5 text-[#00A8B5]" />Modo Autónomo IA
                    </span>
                    <button 
                      onClick={() => handleStatusChange('ESCALADO_HUMANO')} 
                      className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow flex items-center gap-1.5"
                      title="Desactiva el bot para este paciente y permite atender manualmente sin interferencias"
                    >
                      <PauseCircle className="w-4 h-4" />
                      <span>Pausar Bot / Atender</span>
                    </button>
                  </>
                )}

                {onDeleteLead && (
                  <button
                    onClick={() => setLeadToDelete(activeLead)}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-2 rounded-xl transition-all border border-rose-200 flex items-center gap-1 shadow-2xs"
                    title="Eliminar permanentemente este chat y su historial"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span className="hidden sm:inline">Eliminar Chat</span>
                  </button>
                )}
              </div>
            </div>

            {/* Banner Informativo cuando el Bot está Desactivado para este Paciente */}
            {isHumanHandling && (
              <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between gap-2 text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <PauseCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>
                    <strong>Bot desactivado para este chat:</strong> Puede responder como secretaría con tranquilidad. El bot no intervendrá hasta que pulse <em>'Resolver y Devolver al Bot'</em>.
                  </span>
                </div>
              </div>
            )}

            {activeLead.examsRequested.length > 0 && (
              <div className="bg-teal-50/70 border-b border-teal-100 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-bold text-[#0E4D58]">Exámenes en consulta:</span>
                  {activeLead.examsRequested.map((ex, i) => (
                    <span key={i} className="bg-white border border-teal-200 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">{ex}</span>
                  ))}
                </div>
                {activeLead.totalQuotedUsd > 0 && (
                  <span className="font-bold text-slate-900 font-mono text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    Total: USD ${activeLead.totalQuotedUsd.toFixed(2)}
                  </span>
                )}
              </div>
            )}

            {/* Mensajes del Chat */}
            <div className="flex-1 p-4 bg-slate-50/40 overflow-y-auto space-y-3">
              {activeLead.messages && activeLead.messages.length > 0 ? (
                activeLead.messages.map(msg => {
                  const isPatient = msg.sender === 'PACIENTE';
                  const isBot = msg.sender === 'BOT';
                  const isSecretary = msg.sender === 'SECRETARIA';

                  return (
                    <div key={msg.id} className={"flex " + (isPatient ? 'justify-start' : 'justify-end')}>
                      <div className={"max-w-[82%] rounded-2xl p-3.5 shadow-sm text-xs space-y-1.5 " + (
                        isPatient 
                          ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-none' 
                          : isSecretary 
                            ? 'bg-[#0E4D58] text-white rounded-tr-none' 
                            : 'bg-teal-50 border border-teal-200 text-teal-950 rounded-tr-none'
                      )}>
                        <div className="flex items-center justify-between gap-2 text-[10px] opacity-75 font-semibold">
                          <span>{isPatient && '👤 Paciente'}{isBot && '🤖 Asistente Clínico IA'}{isSecretary && '👩‍💼 Secretaría / Recepción Oficial'}</span>
                          <span className="font-mono">{msg.timestamp}</span>
                        </div>
                        <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs p-6 text-center">
                  <Clock className="w-8 h-8 mb-2 text-slate-300" />
                  <p className="font-semibold text-slate-600">No hay mensajes previos en este historial</p>
                  {activeLead.lastMessage && (
                    <div className="mt-2 bg-white border border-slate-200 p-3 rounded-xl max-w-sm text-left">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Último mensaje registrado</span>
                      <p className="text-xs text-slate-700">{activeLead.lastMessage}</p>
                    </div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input para Respuesta de Secretaría */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex gap-2">
              <input 
                type="text" 
                placeholder="Escriba un mensaje oficial como recepción o secretaría (pausa el bot automáticamente)..." 
                value={operatorInput} 
                onChange={(e) => setOperatorInput(e.target.value)} 
                className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#00A8B5]" 
              />
              <button 
                type="submit" 
                className="bg-[#0E4D58] hover:bg-[#165A65] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5" /><span>Enviar</span>
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs p-6 text-center">
            <Bot className="w-12 h-12 mb-3 text-slate-300" /><p className="font-semibold text-slate-600">No hay conversación seleccionada</p>
          </div>
        )}
      </div>

      {/* Modal de Confirmación de Eliminación de Chat */}
      {leadToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">¿Eliminar conversación?</h3>
                <p className="text-xs text-slate-500">Esta acción no se puede deshacer.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-800">{leadToDelete.name}</div>
              <div className="text-slate-500 font-mono text-[11px]">{leadToDelete.whatsapp}</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Se eliminarán permanentemente todos los mensajes del chat y el registro del paciente en el sistema.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLeadToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onDeleteLead && leadToDelete) {
                    onDeleteLead(leadToDelete.id, leadToDelete.whatsapp);
                  }
                  setLeadToDelete(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Sí, eliminar permanentemente</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};