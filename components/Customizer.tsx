import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FUNCTION_LIST } from '../constants';
import { FunctionInfo, ParsedFormulaNode } from '../types';
import FunctionList from './FunctionList';
import { explainFormula } from '../services/geminiService';
import { parseFormula } from '../formulaParser';
import { evaluateFormulaTree } from '../formulaEvaluator';
import LoadingSpinner from './LoadingSpinner';
import FormulaVisualizer from './FormulaVisualizer';
import { SparklesIcon } from './icons';

const Customizer: React.FC = () => {
    const functions = FUNCTION_LIST;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFunction, setSelectedFunction] = useState<FunctionInfo | null>(functions[0] || null);
    const [paramValues, setParamValues] = useState<Record<string, string>>({});
    const [formula, setFormula] = useState('');
    const [formulaExplanation, setFormulaExplanation] = useState('');
    const [isExplaining, setIsExplaining] = useState(false);
    const formulaTextareaRef = useRef<HTMLTextAreaElement>(null);

    const parsedFormula = useMemo(() => {
        if (!formula.trim()) return null;
        try {
            return parseFormula(formula);
        } catch (e) {
            console.error("Erreur d'analyse de la formule:", e);
            return null;
        }
    }, [formula]);

    const evaluatedFormulaTree = useMemo(() => {
        if (!parsedFormula || typeof parsedFormula === 'string') {
            return null;
        }
        return evaluateFormulaTree(parsedFormula);
    }, [parsedFormula]);


    const filteredFunctions = React.useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) {
            return functions;
        }
        return functions.filter(func =>
            func.nom.toLowerCase().includes(term)
        );
    }, [searchTerm, functions]);

    const handleSelectFunction = useCallback((func: FunctionInfo) => {
        setSelectedFunction(func);
        setParamValues({});
        setFormula('');
        setFormulaExplanation('');
    }, []);
    
    const handleParamChange = (paramName: string, value: string) => {
        setParamValues(prev => ({ ...prev, [paramName]: value }));
    };

    const handleInsertFunction = (func: FunctionInfo) => {
        const textarea = formulaTextareaRef.current;
        if (!textarea) return;

        const paramsString = func.parameters.map(p => {
            const value = paramValues[p]?.trim();
            if (value) {
                // Si la valeur est un nombre, une autre fonction, ou déjà entre guillemets, ne pas ajouter de guillemets.
                if (!isNaN(Number(value)) && value !== '' || /^\w+\(.*\)$/.test(value) || value.startsWith("'") && value.endsWith("'")) {
                    return value;
                }
                return `'${value.replace(/'/g, "\\'")}'`;
            }
            return `<${p.replace(/ /g, '_')}>`;
        }).join(', ');
        
        const template = `${func.nom}(${paramsString})`;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;

        const newText = text.substring(0, start) + template + text.substring(end);
        setFormula(newText);
        setParamValues({});

        textarea.focus();
        
        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + template.length;
        }, 0);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(formula);
    };

    const handleExplainFormula = async () => {
        if (!formula.trim()) return;
        setIsExplaining(true);
        setFormulaExplanation('');
        try {
            const explanation = await explainFormula(formula);
            setFormulaExplanation(explanation);
        } catch (error) {
            console.error(error);
            setFormulaExplanation("Désolé, une erreur est survenue lors de la génération de l'explication.");
        } finally {
            setIsExplaining(false);
        }
    };


    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-cyan-300 mb-4">1. Choisissez une fonction</h2>
                <FunctionList
                    functions={filteredFunctions}
                    selectedFunction={selectedFunction}
                    onSelectFunction={handleSelectFunction}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onInsertFunction={handleInsertFunction}
                    paramValues={paramValues}
                    onParamChange={handleParamChange}
                />
            </div>

            <div>
                <h2 className="text-2xl font-bold text-cyan-300 mb-4">2. Atelier de Formule</h2>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-4">
                    
                    <div>
                        <h3 className="text-lg font-semibold text-slate-300 mb-2">Visualisation de la Formule</h3>
                        <div className="min-h-[120px] bg-slate-900/70 p-4 rounded-md border border-slate-700 font-mono overflow-x-auto">
                            <FormulaVisualizer node={evaluatedFormulaTree} />
                        </div>
                    </div>

                    <div className="text-sm text-slate-400 p-3 bg-slate-900/50 rounded-md border border-slate-700">
                      <p className="font-semibold text-slate-300 mb-1">Comment ça marche ?</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Remplissez les champs de paramètres ci-dessus OU ignorez-les pour obtenir un modèle de fonction.</li>
                        <li>Cliquez sur "Insérer la fonction" pour l'ajouter à votre formule ci-dessous.</li>
                        <li>Pour imbriquer, placez votre curseur dans un <code>&lt;placeholder&gt;</code> avant d'insérer une autre fonction.</li>
                      </ul>
                    </div>

                    <div className="relative">
                        <label htmlFor="formula-builder" className="block text-lg font-semibold text-slate-300 mb-2">Construisez votre formule</label>
                        <textarea
                            id="formula-builder"
                            ref={formulaTextareaRef}
                            value={formula}
                            onChange={(e) => setFormula(e.target.value)}
                            placeholder="Votre formule personnalisée apparaîtra ici..."
                            className="w-full h-40 p-3 bg-slate-950 border border-slate-600 rounded-md text-amber-300 font-mono text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-y"
                        />
                        <button 
                            onClick={handleCopyToClipboard}
                            className="absolute top-10 right-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs py-1 px-2 rounded disabled:opacity-50"
                            disabled={!formula}
                        >
                            Copier
                        </button>
                    </div>
                     <div className="pt-2 border-t border-slate-700">
                        <button
                            onClick={handleExplainFormula}
                            disabled={!formula || isExplaining}
                            className="w-full bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-cyan-300 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            <SparklesIcon className="w-5 h-5" />
                            <span>{isExplaining ? "Analyse en cours..." : "Expliquer la formule"}</span>
                        </button>
                    </div>

                    {isExplaining && <LoadingSpinner />}

                    {formulaExplanation && !isExplaining && (
                        <div className="pt-4">
                             <h3 className="text-xl font-semibold text-slate-200 mb-3">Explication de la Formule</h3>
                             <article className="p-4 bg-slate-900/70 border border-slate-700 rounded-md text-slate-300 text-sm space-y-2 prose prose-sm prose-invert max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{formulaExplanation}</ReactMarkdown>
                            </article>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Customizer;