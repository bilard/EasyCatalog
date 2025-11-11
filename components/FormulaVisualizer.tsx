import React from 'react';
import { VisualizerNode } from '../types';

interface FormulaVisualizerProps {
  node: VisualizerNode | string | null;
}

const FormulaVisualizer: React.FC<FormulaVisualizerProps> = ({ node }) => {
  if (!node) {
    return <p className="text-slate-500 text-sm text-center py-4">Commencez à taper une formule pour voir sa structure et son résultat ici...</p>;
  }

  if (typeof node === 'string') {
    if(node.trim() === '') return null;
    return (
      <div className="flex items-center">
        <span className="text-amber-300 bg-slate-700/50 px-2 py-0.5 rounded-md text-sm font-mono">{node}</span>
      </div>
    );
  }

  const resultDisplay = node.result.error ? (
    <span className="text-red-400 bg-red-900/50 px-2 py-0.5 rounded-md text-xs font-semibold">ERREUR: {node.result.error}</span>
  ) : (
    <span className="text-lime-300 bg-lime-900/50 px-2 py-0.5 rounded-md text-sm font-semibold">
        {JSON.stringify(node.result.value)}
    </span>
  );

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="bg-cyan-500/20 text-cyan-300 font-bold text-base px-3 py-1 rounded-md self-start">
          {node.name}
        </div>
        <span className="text-slate-500 font-bold text-sm">➔</span>
        {resultDisplay}
      </div>
      {node.args.length > 0 && (
        <ul className="pl-6 mt-2 border-l-2 border-slate-600 space-y-3">
          {node.args.map((arg, index) => (
            <li key={index} className="relative before:content-[''] before:absolute before:-left-6 before:top-3 before:w-4 before:h-px before:bg-slate-600">
              <FormulaVisualizer node={arg} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormulaVisualizer;