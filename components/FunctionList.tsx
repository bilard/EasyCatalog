import React, { useState, useMemo, useEffect } from 'react';
import { FunctionInfo } from '../types';
import { SearchIcon, SparklesIcon, ChevronDownIcon } from './icons';

interface FunctionListProps {
  functions: FunctionInfo[];
  selectedFunction: FunctionInfo | null;
  onSelectFunction: (func: FunctionInfo) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onInsertFunction: (func: FunctionInfo) => void;
  paramValues: Record<string, string>;
  onParamChange: (paramName: string, value: string) => void;
}

const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  const term = highlight.trim();
  if (!term) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-cyan-500/30 font-bold rounded-sm">
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};


const FunctionList: React.FC<FunctionListProps> = ({ functions, selectedFunction, onSelectFunction, searchTerm, onSearchChange, onInsertFunction, paramValues, onParamChange }) => {

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const groupedFunctions = useMemo(() => {
      return functions.reduce((acc, func) => {
          const category = func.category || 'Autres';
          if (!acc[category]) {
              acc[category] = [];
          }
          acc[category].push(func);
          return acc;
      }, {} as Record<string, FunctionInfo[]>);
  }, [functions]);
  
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (term) {
      const nextOpenState: Record<string, boolean> = {};
      Object.keys(groupedFunctions).forEach(category => {
        const hasMatch = groupedFunctions[category].some(func => func.nom.toLowerCase().includes(term));
        if (hasMatch) {
          nextOpenState[category] = true;
        }
      });
      setOpenCategories(nextOpenState);
    } else {
      setOpenCategories({}); // Collapse all when search is cleared
    }
  }, [searchTerm, groupedFunctions]);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };
  
  const isCategoryOpen = (category: string) => !!openCategories[category];


  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg backdrop-blur-sm flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-700 flex flex-col">
        <div className="p-2 border-b border-slate-700 bg-slate-800/80 z-10">
            <div className="relative">
                 <input
                    type="text"
                    placeholder="Rechercher une fonction..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 pl-9 pr-3 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-1">
            {Object.keys(groupedFunctions).sort().map(category => {
              const term = searchTerm.trim().toLowerCase();
              const matchingFunctions = groupedFunctions[category].filter(func => 
                func.nom.toLowerCase().includes(term)
              );

              if (matchingFunctions.length === 0) {
                return null; // Do not render category if no functions match the search
              }

              return (
                <div key={category}>
                  <button onClick={() => toggleCategory(category)} className="w-full flex justify-between items-center text-left px-3 py-2 rounded-md bg-slate-700/50 hover:bg-slate-700 transition-colors">
                    <span className="font-semibold text-slate-300 text-sm">{category}</span>
                    <ChevronDownIcon className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isCategoryOpen(category) ? 'rotate-180' : ''}`} />
                  </button>
                  {isCategoryOpen(category) && (
                    <ul className="pt-1 pl-2 border-l border-slate-600 ml-3 mt-1">
                      {matchingFunctions.map(func => (
                        <li key={func.nom}>
                          <button
                            onClick={() => onSelectFunction(func)}
                            className={`w-full text-left px-3 py-1.5 rounded-md transition-colors text-sm font-medium ${
                              selectedFunction?.nom === func.nom
                                ? 'bg-cyan-500/20 text-cyan-300'
                                : 'text-slate-400 hover:bg-slate-700/80 hover:text-slate-200'
                            }`}
                          >
                            <HighlightedText text={func.nom} highlight={searchTerm} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col">
        {selectedFunction ? (
          <>
            <div className="space-y-6 flex-grow">
              <div>
                <code className="text-cyan-400 font-bold text-2xl bg-slate-700/50 px-3 py-1 rounded">
                  <HighlightedText text={selectedFunction.nom} highlight={searchTerm} />
                </code>
                <p className="text-slate-300 mt-4 text-base leading-relaxed">
                  <HighlightedText text={selectedFunction.description} highlight={searchTerm} />
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Syntaxe</h4>
                <pre className="bg-slate-900 p-3 rounded-md text-sm whitespace-pre-wrap break-words">
                  <code className="text-amber-300">
                    {selectedFunction.nom}({selectedFunction.parameters.join(', ')})
                  </code>
                </pre>
              </div>

              <div>
                  <h4 className="font-semibold text-slate-200 mb-2">Exemple</h4>
                  <pre className="bg-slate-900 p-3 rounded-md text-sm whitespace-pre-wrap break-words">
                    <code className="text-amber-300">{selectedFunction.example}</code>
                  </pre>
              </div>

              {selectedFunction.parameters.length > 0 && (
                <div className="border-t border-slate-700 pt-6">
                    <h4 className="font-semibold text-slate-200 mb-3">Paramètres</h4>
                    <div className="space-y-3">
                        {selectedFunction.parameters.map((param) => (
                            <div key={param}>
                                <label className="block text-sm font-medium text-slate-400 mb-1">{param}</label>
                                <input
                                    type="text"
                                    value={paramValues[param] || ''}
                                    onChange={(e) => onParamChange(param, e.target.value)}
                                    placeholder={`Entrez une valeur ou un nom de champ...`}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
              )}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-700 flex-shrink-0">
              <button
                onClick={() => onInsertFunction(selectedFunction)}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <SparklesIcon className="w-5 h-5" />
                <span>Insérer la fonction</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-500">
                {functions.length > 0 ? 'Sélectionnez une fonction pour voir ses détails.' : 'Aucune fonction ne correspond à votre recherche.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FunctionList;