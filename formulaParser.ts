import { ParsedFormulaNode } from './types';

/**
 * Sépare une chaîne d'arguments en un tableau, en respectant les parenthèses imbriquées.
 * @param argsContent La chaîne de caractères contenant les arguments (sans les parenthèses extérieures).
 * @returns Un tableau de chaînes, chaque chaîne étant un argument.
 */
function splitArguments(argsContent: string): string[] {
    if (argsContent.trim() === '') return [];

    const args: string[] = [];
    let currentArg = '';
    let parenLevel = 0;
    let inQuote = false;

    for (const char of argsContent) {
        if (char === "'" && (currentArg.slice(-1) !== '\\')) {
            inQuote = !inQuote;
        }

        if (!inQuote) {
            if (char === '(') {
                parenLevel++;
            } else if (char === ')') {
                parenLevel--;
            }
        }

        if (char === ',' && parenLevel === 0 && !inQuote) {
            args.push(currentArg.trim());
            currentArg = '';
        } else {
            currentArg += char;
        }
    }
    args.push(currentArg.trim());
    return args;
}

/**
 * Analyse récursivement une chaîne de formule pour la convertir en un objet structuré.
 * @param formula La chaîne de formule à analyser.
 * @returns Un objet ParsedFormulaNode, une chaîne pour les littéraux, ou null si l'analyse échoue.
 */
export function parseFormula(formula: string): ParsedFormulaNode | string | null {
    formula = formula.trim();

    const openParenIndex = formula.indexOf('(');
    
    // Si pas de '(', ou si c'est juste une chaîne entre parenthèses comme ('texte'), le traiter comme un littéral.
    if (openParenIndex === -1 || !formula.endsWith(')')) {
        // C'est un littéral (ex: 'texte', FIELDVAL(...), 123)
        return formula;
    }

    const functionName = formula.substring(0, openParenIndex).trim();
    
    // Vérifier si le nom de la fonction est valide (pour éviter les cas comme `('test')`)
    // Un nom de fonction valide ne doit pas contenir d'espaces et doit être suivi d'une parenthèse.
    if (!functionName || functionName.includes(' ') || functionName.includes('(')) {
        return formula;
    }

    // Trouver la parenthèse fermante correspondante
    let parenLevel = 1;
    let closeParenIndex = -1;
    for (let i = openParenIndex + 1; i < formula.length; i++) {
        if (formula[i] === '(') parenLevel++;
        if (formula[i] === ')') parenLevel--;
        if (parenLevel === 0) {
            closeParenIndex = i;
            break;
        }
    }
    
    // Si la formule n'est pas bien formée (ex: CONCAT(.. ) ou du texte après)
    if (closeParenIndex !== formula.length - 1) {
       return formula;
    }


    const argsContent = formula.substring(openParenIndex + 1, closeParenIndex);
    const argStrings = splitArguments(argsContent);
    
    const parsedArgs = argStrings
        .map(argStr => parseFormula(argStr))
        .filter((arg): arg is ParsedFormulaNode | string => arg !== null);

    return {
        name: functionName,
        args: parsedArgs,
    };
}
