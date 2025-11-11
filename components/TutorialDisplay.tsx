

import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SparklesIcon } from './icons';
import LoadingSpinner from './LoadingSpinner';

interface TutorialDisplayProps {
  content: string;
  elaboratedContent: string;
  onElaborate: () => void;
  isElaborating: boolean;
  paletteImage: string | null;
  isGeneratingImage: boolean;
}

const TutorialDisplay: React.FC<TutorialDisplayProps> = ({ content, elaboratedContent, onElaborate, isElaborating, paletteImage, isGeneratingImage }) => {

  const markdownComponents: Components = {
    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-cyan-300 mb-6 border-b border-slate-600 pb-4" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-cyan-400 mt-10 mb-4 border-b border-slate-700 pb-2" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-slate-200 mt-8 mb-3" {...props} />,
    p: ({ node, ...props }) => <p className="leading-relaxed my-4" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
    li: ({ node, ...props }) => <li className="pl-2" {...props} />,
    strong: ({ node, ...props }) => <strong className="font-semibold text-slate-100" {...props} />,
    code: ({ node, ...props }) => <code className="text-amber-300 bg-slate-700/50 px-1.5 py-1 rounded-md" {...props} />,
    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-slate-400 my-4" {...props} />,
    a: ({ node, ...props }) => <a className="text-cyan-400 hover:text-cyan-300 underline" {...props} />,
    
    table: ({ node, ...props }) => <div className="overflow-x-auto my-6 border border-slate-700 rounded-lg"><table className="w-full text-sm border-collapse" {...props} /></div>,
    thead: ({ node, ...props }) => <thead className="border-b-2 border-slate-600" {...props} />,
    th: ({ node, ...props }) => <th className="px-4 py-3 text-left font-semibold text-cyan-300 bg-slate-700" {...props} />,
    tbody: ({ node, ...props }) => <tbody className="divide-y divide-slate-700" {...props} />,
    tr: ({ node, ...props }) => <tr className="transition-colors duration-150 hover:bg-slate-700/50 even:bg-slate-800/50" {...props} />,
    td: ({ node, ...props }) => <td className="px-4 py-3 align-top" {...props} />,
  };
  
  if (!content) return null;

  return (
    <>
      <header className="mt-8 mb-4">
        <h2 className="text-2xl font-bold text-cyan-300">Votre Tutoriel Personnalisé</h2>
      </header>
      <div className="bg-slate-800 rounded-xl shadow-lg p-6 md:p-8 border border-slate-700">
        {isGeneratingImage && (
          <div className="flex flex-col items-center mb-6 p-4 bg-slate-700/50 rounded-lg">
            <LoadingSpinner />
            <p className="text-slate-400 mt-2 text-sm">Génération de l'illustration...</p>
          </div>
        )}
        
        {paletteImage && (
          <div className="mb-8">
            <img src={paletteImage} alt="Illustration de la palette générée par IA" className="rounded-lg shadow-lg border border-slate-700 w-full" />
            <p className="text-xs text-slate-500 text-center mt-2 italic">
              Note : Cette image est une illustration générée par IA pour représenter le concept et peut différer de l'interface réelle d'EasyCatalog.
            </p>
          </div>
        )}

        <article className="max-w-none text-slate-300">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {content}
          </ReactMarkdown>
        </article>

        {content && !elaboratedContent && (
          <div className="mt-8 pt-6 border-t border-slate-700 text-center">
            {isElaborating ? (
              <LoadingSpinner />
            ) : (
              <button
                onClick={onElaborate}
                disabled={isElaborating}
                className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-cyan-300 font-bold py-2 px-6 rounded-full flex items-center gap-2 transition-colors mx-auto"
              >
                <SparklesIcon className="w-5 h-5" />
                <span>En savoir plus</span>
              </button>
            )}
          </div>
        )}

        {elaboratedContent && (
          <div className="mt-10 pt-8 border-t border-slate-700">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Approfondissement des Concepts</h2>
            <article className="max-w-none text-slate-300">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {elaboratedContent}
              </ReactMarkdown>
            </article>
          </div>
        )}
      </div>
    </>
  );
};

export default TutorialDisplay;