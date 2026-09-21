import React, { useState } from 'react';
import { LabExam } from '../types/lab';
import { INITIAL_EXAMS } from '../data/initialExams';
import { 
  Search, 
  Save, 
  Check, 
  DollarSign, 
  Clock, 
  Sparkles, 
  Filter, 
  Edit3, 
  X, 
  AlertCircle,
  RotateCcw
} from 'lucide-react';

interface PricingManagerProps {
  exams: LabExam[];
  onUpdateExams: (updated: LabExam[]) => void;
}

export const PricingManager: React.FC<PricingManagerProps> = ({
  exams,
  onUpdateExams
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [savedNotification, setSavedNotification] = useState(false);
  const [editingExam, setEditingExam] = useState<LabExam | null>(null);

  const categories = ['ALL', ...Array.from(new Set(exams.map(e => e.category)))];

  const handlePriceChange = (id: string, newPrice: number) => {
    const updated = exams.map(e => e.id === id ? { ...e, priceUsd: newPrice } : e);
    onUpdateExams(updated);
    showSavedFlash();
  };

  const handleToggleActive = (id: string) => {
    const updated = exams.map(e => e.id === id ? { ...e, active: !e.active } : e);
    onUpdateExams(updated);
    showSavedFlash();
  };

  const showSavedFlash = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  const handleSaveModalEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExam) return;

    const updated = exams.map(e => e.id === editingExam.id ? editingExam : e);
    onUpdateExams(updated);
    setEditingExam(null);
    showSavedFlash();
  };

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          exam.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          exam.synonyms.some(s => s.toLowerCase().includes(searchFilter.toLowerCase()));
    if (selectedCategory === 'ALL') return matchesSearch;
    return matchesSearch && exam.category === selectedCategory;
  });

  return (
    <div className="space-y-5">
      {/* TOP CONFIG BAR */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Tarifario Oficial & Requisitos Preanalíticos</h2>
          <p className="text-xs text-slate-500">
            Sincronización directa con el Agente Clínico. Todas las cotizaciones y tarifas se manejan en Dólares ($ USD).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={async () => {
              if (window.confirm('¿Deseas restaurar todo el tarifario exactamente a los 187 exámenes oficiales de la Lista de Precios Septiembre 2026?')) {
                onUpdateExams(INITIAL_EXAMS);
                showSavedFlash();
              }
            }}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition-all border border-slate-300 shadow-xs"
            title="Restaura los 187 exámenes del catálogo oficial de la institución"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" /> Restaurar 187 Oficiales
          </button>

          <button
            onClick={async () => {
              showSavedFlash();
              await onUpdateExams(exams);
            }}
            className="flex items-center gap-1.5 bg-[#00A8B5] hover:bg-[#0E4D58] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" /> Sincronizar con Supabase
          </button>

          <button
            onClick={() => {
              const newBlankExam: LabExam = {
                id: 'exam-' + Date.now(),
                name: '',
                category: selectedCategory === 'ALL' ? 'Química Sanguínea' : selectedCategory,
                priceUsd: 0,
                fastingHours: 'Ayuno de 8 a 12 horas.',
                sampleType: 'Sangre venosa (Tubo Tapa Roja)',
                turnaround: 'Mismo día',
                synonyms: [],
                active: true
              };
              setEditingExam(newBlankExam);
            }}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            + Agregar Examen
          </button>

          <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 px-3.5 py-2 rounded-xl text-xs">
            <div>
              <span className="text-[10px] text-teal-800 font-bold uppercase block tracking-wide">
                Moneda Base
              </span>
              <span className="text-sm font-black text-[#0E4D58] font-mono flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> USD ($)
              </span>
            </div>
          </div>

          {savedNotification && (
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 animate-pulse">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Sincronizado con Supabase
            </span>
          )}
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={"px-3 py-1 rounded-xl text-xs font-semibold transition-all " + (
                  selectedCategory === cat
                    ? "bg-[#0E4D58] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {cat === 'ALL' ? 'Todos los Exámenes' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar examen, ayuno o sinónimo..." 
              value={searchFilter} 
              onChange={(e) => setSearchFilter(e.target.value)} 
              className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A8B5] w-full sm:w-64" 
            />
          </div>
        </div>

        {/* EXAMS TABLE WITH MODAL EDIT BUTTON */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 bg-slate-50/80 font-bold">
                <th className="py-3 px-3">ESTADO</th>
                <th className="py-3 px-3">EXAMEN / PRUEBA</th>
                <th className="py-3 px-3">CATEGORÍA</th>
                <th className="py-3 px-3">PRECIO ($ USD)</th>
                <th className="py-3 px-3">REQUISITOS / AYUNO</th>
                <th className="py-3 px-3">MUESTRA & TIEMPO</th>
                <th className="py-3 px-3 text-right">EDICIÓN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExams.map(exam => {
                return (
                  <tr key={exam.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Active Toggle */}
                    <td className="py-3 px-3">
                      <button 
                        onClick={() => handleToggleActive(exam.id)}
                        className={"px-2 py-0.5 rounded text-[10px] font-bold transition-all " + (
                          exam.active 
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                            : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                        )}
                      >
                        {exam.active ? 'ACTIVO' : 'PAUSADO'}
                      </button>
                    </td>

                    {/* Name & Synonyms */}
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{exam.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal line-clamp-1">
                        Sinónimos: {exam.synonyms.join(', ')}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 font-medium text-slate-600">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {exam.category}
                      </span>
                    </td>

                    {/* Price USD Input */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400 font-bold">$</span>
                        <input 
                          type="number"
                          step="0.5"
                          value={exam.priceUsd}
                          onChange={(e) => handlePriceChange(exam.id, parseFloat(e.target.value) || 0)}
                          className="w-20 border border-slate-200 rounded-lg px-2 py-1 font-bold text-[#0E4D58] focus:border-[#00A8B5] focus:outline-none bg-white"
                        />
                      </div>
                    </td>

                    {/* Fasting & Requirements */}
                    <td className="py-3 px-3 max-w-xs text-slate-700">
                      <span className="line-clamp-2">{exam.fastingHours}</span>
                    </td>

                    {/* Sample & Turnaround */}
                    <td className="py-3 px-3 text-slate-500 font-mono text-[10px]">
                      <div>{exam.sampleType}</div>
                      <div className="text-teal-700 font-semibold">{exam.turnaround}</div>
                    </td>

                    {/* Action Button */}
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setEditingExam(exam)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-[#00A8B5] text-[#0E4D58] hover:text-white font-bold text-xs transition-all shadow-sm"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE EDICIÓN COMPLETA DE PARÁMETROS PREANALÍTICOS */}
      {editingExam && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#00A8B5]" />
                  Editar Parámetros Clínicos & Tarifario
                </h3>
                <p className="text-xs text-slate-500">{editingExam.name} ({editingExam.category})</p>
              </div>
              <button 
                onClick={() => setEditingExam(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModalEdit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Precio en USD ($):</label>
                  <input 
                    type="number" 
                    step="0.5"
                    required
                    value={editingExam.priceUsd}
                    onChange={(e) => setEditingExam({ ...editingExam, priceUsd: parseFloat(e.target.value) || 0 })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#0E4D58] focus:outline-none focus:border-[#00A8B5]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tiempo de Entrega:</label>
                  <input 
                    type="text" 
                    required
                    value={editingExam.turnaround}
                    onChange={(e) => setEditingExam({ ...editingExam, turnaround: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#00A8B5]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tipo de Muestra / Tubo Requerido:</label>
                <input 
                  type="text" 
                  required
                  value={editingExam.sampleType}
                  onChange={(e) => setEditingExam({ ...editingExam, sampleType: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#00A8B5]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Requisitos Preanalíticos & Horas de Ayuno:
                </label>
                <textarea 
                  required
                  rows={3}
                  value={editingExam.fastingHours}
                  onChange={(e) => setEditingExam({ ...editingExam, fastingHours: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#00A8B5]"
                ></textarea>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Sinónimos de Búsqueda para el Agente IA (separados por coma):
                </label>
                <input 
                  type="text" 
                  value={editingExam.synonyms.join(', ')}
                  onChange={(e) => setEditingExam({ 
                    ...editingExam, 
                    synonyms: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                  })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#00A8B5]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingExam(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#00A8B5] hover:bg-[#0E4D58] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow"
                >
                  Guardar y Sincronizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};