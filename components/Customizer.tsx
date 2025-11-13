import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FUNCTION_LIST } from '../constants';
import { FunctionInfo } from '../types';
import FunctionList from './FunctionList';
import { explainFormula, generateFormulaFromRequest } from '../services/geminiService';
import { parseFormula } from '../formulaParser';
import { evaluateFormulaTree } from '../formulaEvaluator';
import LoadingSpinner from './LoadingSpinner';
import FormulaVisualizer from './FormulaVisualizer';
import { SparklesIcon, TrashIcon, CodeIcon } from './icons';

const Customizer: React.FC = () => {
    const functions = FUNCTION_LIST;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFunction, setSelectedFunction] = useState<FunctionInfo | null>(functions[0] || null);
    const [paramValues, setParamValues] = useState<Record<string, string>>({});
    const [formula, setFormula] = useState('');
    const [formulaExplanation, setFormulaExplanation] = useState('');
    const [isExplaining, setIsExplaining] = useState(false);
    const formulaTextareaRef = useRef<HTMLTextAreaElement>(null);
    const [naturalLanguageRequest, setNaturalLanguageRequest] = useState('');
    const [isGeneratingFormula, setIsGeneratingFormula] = useState(false);
    const [generationError, setGenerationError] = useState('');

    const resetAllState = useCallback(() => {
        setSearchTerm('');
        setSelectedFunction(functions[0] || null);
        setParamValues({});
        setFormula('');
        setFormulaExplanation('');
        setNaturalLanguageRequest('');
        setGenerationError('');
        setIsExplaining(false);
        setIsGeneratingFormula(false);
    }, [functions]);


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


    const handleSelectFunction = useCallback((func: FunctionInfo) => {
        setSelectedFunction(func);
        setParamValues({});
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
        
        // Surligne le texte inséré pour le rendre visible à l'utilisateur
        setTimeout(() => {
            textarea.setSelectionRange(start, start + template.length);
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
    
    const handleGenerateFormula = async () => {
        if (!naturalLanguageRequest.trim()) return;
        setIsGeneratingFormula(true);
        setGenerationError('');
        setFormulaExplanation('');

        try {
            const generatedFormula = await generateFormulaFromRequest(naturalLanguageRequest);
            if (generatedFormula.startsWith('ERREUR:')) {
                setGenerationError(generatedFormula.replace('ERREUR:', '').trim());
            } else {
                setFormula(generatedFormula);
            }
        } catch (error) {
            console.error("Erreur lors de la génération de formule", error);
            setGenerationError("Une erreur inattendue est survenue.");
        } finally {
            setIsGeneratingFormula(false);
        }
    };


    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-cyan-300 mb-4">1. Choisissez une fonction</h2>
                <FunctionList
                    functions={functions}
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
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-cyan-300">2. Atelier de Formule</h2>
                    <button 
                        onClick={resetAllState}
                        className="flex items-center gap-2 text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 py-2 px-3 rounded-lg transition-colors"
                        title="Vider tous les champs de l'atelier"
                    >
                        <TrashIcon className="w-4 h-4" />
                        <span>Tout effacer</span>
                    </button>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-4">
                    
                    <div>
                        <h3 className="text-lg font-semibold text-slate-300 mb-2">Visualisation de la Formule</h3>
                        <div className="min-h-[120px] bg-slate-900/70 p-4 rounded-md border border-slate-700 font-mono overflow-x-auto">
                           {formula.trim() ? <FormulaVisualizer node={evaluatedFormulaTree} /> : <p className="text-slate-600">La visualisation de votre formule apparaîtra ici.</p>}
                        </div>
                    </div>

                    <div className="relative">
                        <label htmlFor="formula-builder" className="block text-lg font-semibold text-slate-300 mb-2">Construisez votre formule</label>
                        <textarea
                            id="formula-builder"
                            name="formula-builder"
                            ref={formulaTextareaRef}
                            value={formula}
                            onChange={(e) => setFormula(e.target.value)}
                            placeholder="Votre formule personnalisée apparaîtra ici..."
                            autoComplete="off"
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

            <div>
                <h2 className="text-2xl font-bold text-cyan-300 mb-4">3. Assistant IA de Formule</h2>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-4">
                    <div>
                        <label htmlFor="natural-language-request" className="block text-lg font-semibold text-slate-300 mb-2">Décrivez votre besoin</label>
                        <textarea
                            id="natural-language-request"
                            name="natural-language-request"
                            value={naturalLanguageRequest}
                            onChange={(e) => setNaturalLanguageRequest(e.target.value)}
                            placeholder="Ex: Je veux prendre les 5 premiers caractères du champ 'CodeProduit' et les mettre en majuscules."
                            autoComplete="off"
                            className="w-full h-24 p-3 bg-slate-950 border border-slate-600 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-y"
                        />
                    </div>
                     <div className="pt-2">
                        <button
                            onClick={handleGenerateFormula}
                            disabled={!naturalLanguageRequest || isGeneratingFormula}
                            className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            <SparklesIcon className="w-5 h-5" />
                            <span>{isGeneratingFormula ? "Génération en cours..." : "Générer la formule"}</span>
                        </button>
                    </div>

                    {isGeneratingFormula && <LoadingSpinner />}
                    {generationError && !isGeneratingFormula && (
                        <div className="text-center text-red-400 bg-red-900/50 p-3 rounded-md text-sm">
                            {generationError}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Customizer;