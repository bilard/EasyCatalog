import { ParsedFormulaNode, VisualizerNode, EvaluationResult } from './types';
import { FUNCTION_LIST } from './constants';

const cleanString = (str: any): string => {
    const s = String(str);
    if (s.startsWith("'") && s.endsWith("'")) {
        return s.substring(1, s.length - 1).replace(/\\'/g, "'");
    }
    return s;
};

const toNum = (val: any): number => {
    if (val === null || val === undefined || val === '') return 0;
    const num = Number(val);
    return isNaN(num) ? 0 : num;
};

const functionImplementations: Record<string, (...args: any[]) => any> = {
    // Math
    ABS: (n) => Math.abs(toNum(n)),
    SUM: (...args) => args.reduce((acc, val) => acc + toNum(val), 0),
    SUB: (initial, ...rest) => rest.reduce((acc, val) => acc - toNum(val), toNum(initial)),
    MUL: (...args) => args.reduce((acc, val) => acc * toNum(val), 1),
    DIV: (a, b) => toNum(b) === 0 ? { error: "Division par zéro" } : toNum(a) / toNum(b),
    MOD: (a, b) => toNum(b) === 0 ? { error: "Division par zéro" } : toNum(a) % toNum(b),
    AVG: (...args) => args.length === 0 ? 0 : functionImplementations.SUM(...args) / args.length,
    MAX: (...args) => Math.max(...args.map(toNum)),
    MIN: (...args) => Math.min(...args.map(toNum)),
    ROUND: (n, decimals = 0) => Number(toNum(n).toFixed(toNum(decimals))),
    CEILING: (n) => Math.ceil(toNum(n)),
    FLOOR: (n) => Math.floor(toNum(n)),
    RAND: () => Math.random(),
    
    // String
    CONCAT: (...args) => args.map(cleanString).join(''),
    LOWER: (str) => cleanString(str).toLowerCase(),
    UPPER: (str) => cleanString(str).toUpperCase(),
    TRIM: (str) => cleanString(str).trim(),
    LENGTH: (str) => cleanString(str).length,
    REPLACE: (str, search, replace) => cleanString(str).replace(new RegExp(cleanString(search), 'g'), cleanString(replace)),
    LEFTSTR: (str, len) => cleanString(str).substring(0, toNum(len)),
    RIGHTSTR: (str, len) => cleanString(str).slice(-toNum(len)),
    SUBSTR: (str, start, len) => cleanString(str).substr(toNum(start) - 1, toNum(len)),
    MIDSTR: (str, start, len) => cleanString(str).substr(toNum(start) - 1, toNum(len)),
    COUNTOF: (str, search) => (cleanString(str).match(new RegExp(cleanString(search), 'g')) || []).length,
    INDEXOF: (str, search, start = 0) => cleanString(str).indexOf(cleanString(search), toNum(start)),
    SEARCH: (search, str) => (cleanString(str).toLowerCase().indexOf(cleanString(search).toLowerCase()) + 1),
    PROPER: (str) => cleanString(str).replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
    PARTSTR: (str, part, delim) => {
        const parts = cleanString(str).split(cleanString(delim));
        const index = toNum(part) - 1;
        return parts[index] || '';
    },
    PARTCOUNT: (str, delim) => cleanString(str).split(cleanString(delim)).length,
    LITERAL: (str) => str,

    // Logic
    IF: (op1, op, op2, trueVal, falseVal) => {
        const val1 = isNaN(Number(op1)) ? cleanString(op1) : toNum(op1);
        const val2 = isNaN(Number(op2)) ? cleanString(op2) : toNum(op2);
        const operator = cleanString(op);
        let result = false;
        switch (operator) {
            case '=': result = val1 == val2; break;
            case '!=': result = val1 != val2; break;
            case '>': result = val1 > val2; break;
            case '<': result = val1 < val2; break;
            case '>=': result = val1 >= val2; break;
            case '<=': result = val1 <= val2; break;
            default: return { error: `Opérateur inconnu: ${operator}` };
        }
        return result ? trueVal : falseVal;
    },
    AND: (...args) => args.every(val => !!val && val !== 'false' && val !== '0'),
    OR: (...args) => args.some(val => !!val && val !== 'false' && val !== '0'),
    NOT: (arg) => !arg || arg === 'false' || arg === '0',
    COMPARESTR: (str1, str2, trueVal, falseVal) => cleanString(str1) === cleanString(str2) ? trueVal : falseVal,
    IFEMPTY: (str, ifEmptyVal) => (cleanString(str) === '' ? ifEmptyVal : str),
    SWITCH: (expr, ...cases) => {
        const defaultCase = cases.length % 2 !== 0 ? cases[cases.length - 1] : '';
        for (let i = 0; i < cases.length - 1; i += 2) {
            if (expr === cases[i]) return cases[i+1];
        }
        return defaultCase;
    },
    
    // Utility / Simulated
    FIELDSTR: (fieldName) => `Contenu de ${cleanString(fieldName)}`,
    FIELDVAL: () => 123.45,
    GROUPVAL: (fieldName) => `Valeur de groupe pour ${cleanString(fieldName)}`,
    LOOKUP: () => `Résultat de LOOKUP`,
    NOW: () => new Date().toLocaleDateString('fr-FR'),
    DATEFORMAT: () => `Date formatée`,
    DECTOFRAC: (dec) => `${Math.round(toNum(dec)*100)}/100`,
    REGEX: (str, regex, replace) => functionImplementations.REPLACE(str, regex, replace)
};

function evaluateNode(node: ParsedFormulaNode | string): VisualizerNode | string {
    if (typeof node === 'string') {
        return node;
    }

    const evaluatedArgs: (VisualizerNode | string)[] = node.args.map(arg => evaluateNode(arg));

    const argValues = evaluatedArgs.map(arg => {
        if (typeof arg === 'string') {
            const cleaned = cleanString(arg);
            if (cleaned !== '' && !isNaN(Number(cleaned)) && !isNaN(parseFloat(cleaned))) {
                return Number(cleaned);
            }
            return cleaned;
        }
        if (arg.result.error) return { error: `Erreur d'argument: ${arg.result.error}` };
        return arg.result.value;
    });

    const result: EvaluationResult = { value: null };
    const func = functionImplementations[node.name.toUpperCase()];
    
    if (func) {
        if (argValues.some(arg => typeof arg === 'object' && arg?.error)) {
             result.error = 'Erreur dans un argument imbriqué.';
        } else {
            try {
                const funcResult = func(...argValues);
                if (typeof funcResult === 'object' && funcResult.error) {
                    result.error = funcResult.error;
                } else {
                    result.value = funcResult;
                }
            } catch (e) {
                result.error = e instanceof Error ? e.message : 'Erreur d\'exécution';
            }
        }
    } else {
        result.error = `Fonction '${node.name}' non reconnue.`;
    }

    if (result.value !== null && typeof result.value === 'number' && !Number.isInteger(result.value)) {
        result.value = parseFloat(result.value.toFixed(4));
    }
    
    return {
        name: node.name,
        args: evaluatedArgs,
        result: result,
    };
}

export function evaluateFormulaTree(node: ParsedFormulaNode | null): VisualizerNode | null {
    if (!node) return null;
    const result = evaluateNode(node);
    if (typeof result === 'string') {
        return null;
    }
    return result;
}