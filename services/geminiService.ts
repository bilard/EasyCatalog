import { GoogleGenAI, Type, Modality } from "@google/genai";
import { DOCUMENT_CONTENT, FUNCTION_LIST } from '../constants';
import { QCMResponse, QuizQuestion, QuizResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTutorial = async (query: string): Promise<string> => {
  try {
    const prompt = `
Tu es un rédacteur technique expert et un formateur professionnel spécialisé dans le logiciel EasyCatalog.
Ton objectif est de créer des tutoriels exceptionnellement clairs, structurés et esthétiques en français, en te basant exclusivement sur le guide utilisateur fourni.

Question de l'utilisateur: "${query}"

Instructions de formatage OBLIGATOIRES, suis-les à la lettre :
1.  **Structure de Documentation Technique :** Structure ta réponse comme une page de documentation. Utilise un seul titre de niveau 1 (#) pour le sujet principal. Utilise des titres de niveau 2 (##) pour les sections principales (ex: "Opérateurs de Comparaison"). Utilise des titres de niveau 3 (###) pour les sous-points si nécessaire.
2.  **Hiérarchie Stricte :** N'utilise pas de texte simple pour introduire une section. Chaque section doit commencer par un titre formaté (## ou ###).
3.  **FORMATAGE DE TABLEAU STRICT ET OBLIGATOIRE :** Pour toute donnée nécessitant un alignement en colonnes (options, paramètres, listes clé/valeur), tu dois **impérativement** et **exclusivement** utiliser la syntaxe de tableau Markdown. Ne simule **jamais** un tableau avec des espaces ou des tabulations. La réponse doit être une structure de tableau valide avec des en-têtes clairs.

    *Exemple de syntaxe à utiliser OBLIGATOIREMENT:*
    | En-tête 1     | En-tête 2                                 |
    |---------------|-------------------------------------------|
    | \`Valeur\`      | Description de la valeur.                 |
    | \`Autre Valeur\`| Autre description.                        |
4.  **Listes Ordonnées et Non Ordonnées :** Utilise des listes numérotées (1., 2.) pour les étapes séquentielles et des listes à puces (-) pour les énumérations.
5.  **Mise en Évidence :** Utilise le gras (**mot**) pour les termes importants, les noms d'interface, et les concepts clés. Utilise le style code (\`valeur\`) pour les noms de champs, les valeurs littérales, ou les extraits de code.

Ne fournis que le tutoriel en réponse, sans aucune introduction ou conclusion superflue. Ton contenu doit être immédiatement lisible et professionnel.

--- DEBUT DU GUIDE UTILISATEUR ---
${DOCUMENT_CONTENT}
--- FIN DU GUIDE UTILISATEUR ---
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Erreur lors de la génération du tutoriel:", error);
    return "Désolé, une erreur s'est produite lors de la génération du tutoriel. Veuillez réessayer.";
  }
};

export const generateQCM = async (query: string): Promise<string[]> => {
    if (!query.trim()) return [];
    try {
        const prompt = `
En te basant sur la question de l'utilisateur et le contenu du guide EasyCatalog, génère 3 questions pertinentes et concises en français qui pourraient aider l'utilisateur à affiner sa recherche ou à explorer des sujets connexes.

Question de l'utilisateur: "${query}"
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                                description: "Une question suggérée"
                            }
                        }
                    }
                }
            }
        });
        
        const jsonText = response.text;
        const parsed: QCMResponse = JSON.parse(jsonText);
        return parsed.questions || [];
    } catch (error) {
        console.error("Erreur lors de la génération du QCM:", error);
        return [];
    }
};

export const correctQuery = async (query: string): Promise<string> => {
    try {
        const prompt = `Corrige les fautes d'orthographe et de grammaire dans la requête utilisateur suivante concernant le logiciel EasyCatalog. Si la requête est déjà correcte, retourne-la telle quelle. Retourne uniquement la requête corrigée, sans aucune autre explication.

Requête: "${query}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Erreur lors de la correction de la requête:", error);
        return query; // En cas d'erreur, retourne la requête originale
    }
};

export const explainFormula = async (formula: string): Promise<string> => {
    try {
        const prompt = `
Tu es un expert du logiciel EasyCatalog et un excellent pédagogue.
En te basant **exclusivement** sur le guide utilisateur fourni, analyse la formule de champ personnalisé suivante et explique clairement ce qu'elle fait.

Formule à analyser : \`${formula}\`

Instructions :
1.  **Objectif Global :** Commence par décrire en une phrase simple l'objectif final de la formule.
2.  **Décomposition :** Décris le fonctionnement de chaque fonction, en partant de la plus imbriquée vers l'extérieur.
3.  **Clarté :** Utilise un langage simple et des listes à puces pour rendre l'explication facile à suivre.
4.  **Formatage :** Utilise le style code (\`) pour les noms de fonctions et les exemples de valeurs. Utilise le gras (**) pour les concepts importants.
5.  **Source unique :** Toutes tes explications doivent provenir du guide utilisateur.

Ne fournis que l'explication, sans introduction superflue.

--- DEBUT DU GUIDE UTILISATEUR ---
${DOCUMENT_CONTENT}
--- FIN DU GUIDE UTILISATEUR ---
`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Erreur lors de l'explication de la formule:", error);
        return "Erreur lors de la génération de l'explication.";
    }
};


export const generateQuiz = async (topic: string): Promise<QuizQuestion[]> => {
    try {
        const prompt = `
Tu es un expert en création de contenu pédagogique pour le logiciel EasyCatalog.
En te basant **exclusivement** sur le guide utilisateur fourni, crée un quiz à choix multiples de 5 questions sur le sujet suivant : "${topic}".

Instructions strictes :
1.  **Pertinence :** Les questions doivent être directement liées au sujet et au contenu du guide.
2.  **Format :** Chaque question doit avoir exactement 4 options de réponse.
3.  **Clarté :** Une seule réponse doit être correcte. Les autres options (distracteurs) doivent être plausibles mais incorrectes.
4.  **Précision :** La \`correctAnswer\` doit correspondre EXACTEMENT à l'une des chaînes de caractères dans le tableau \`options\`.
5.  **Explication :** Pour chaque question, fournis une explication claire et pédagogique (1-3 phrases) qui justifie la bonne réponse. **Ne te contente pas de citer un numéro de page.** L'explication doit reformuler le concept clé du guide pour aider l'utilisateur à comprendre son erreur ou à confirmer sa connaissance.
6.  **Langue :** Toutes les questions, réponses et explications doivent être en français.

--- DEBUT DU GUIDE UTILISATEUR ---
${DOCUMENT_CONTENT}
--- FIN DU GUIDE UTILISATEUR ---
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        questions: {
                            type: Type.ARRAY,
                            description: "Un tableau de 5 questions pour le quiz.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: {
                                        type: Type.STRING,
                                        description: "L'intitulé de la question."
                                    },
                                    options: {
                                        type: Type.ARRAY,
                                        description: "Un tableau contenant 4 options de réponse possibles.",
                                        items: { type: Type.STRING }
                                    },
                                    correctAnswer: {
                                        type: Type.STRING,
                                        description: "La bonne réponse, qui doit correspondre exactement à l'une des options."
                                    },
                                    explanation: {
                                        type: Type.STRING,
                                        description: "Une explication claire et pédagogique justifiant la bonne réponse, sans citer de numéro de page."
                                    }
                                },
                                required: ["question", "options", "correctAnswer", "explanation"]
                            }
                        }
                    },
                    required: ["questions"]
                }
            }
        });

        const jsonText = response.text;
        const parsed: QuizResponse = JSON.parse(jsonText);
        // Validation simple pour s'assurer que nous avons bien des questions
        if (parsed.questions && parsed.questions.length > 0) {
            return parsed.questions;
        } else {
            throw new Error("La réponse de l'API ne contient pas de questions valides.");
        }
    } catch (error) {
        console.error("Erreur lors de la génération du quiz:", error);
        throw new Error("Impossible de générer le quiz. Veuillez réessayer avec un autre sujet.");
    }
};

export const elaborateOnTopic = async (tutorialContent: string): Promise<string> => {
  try {
    const prompt = `
Tu es un formateur expert spécialisé dans le logiciel EasyCatalog, et ta mission est de rendre les concepts complexes accessibles aux débutants.
En te basant **exclusivement** sur le guide utilisateur fourni, analyse le tutoriel suivant et génère des explications approfondies pour les termes techniques et les concepts clés qui y sont mentionnés.

Tutoriel à analyser :
"""
${tutorialContent}
"""

Instructions :
1.  **Identification :** Identifie 2 à 4 concepts ou termes techniques essentiels du tutoriel qui mériteraient une explication plus détaillée pour un novice.
2.  **Explication Approfondie :** Pour chaque concept identifié, fournis une explication claire, simple et pédagogique. Utilise des analogies si cela aide à la compréhension.
3.  **Source unique :** Ta connaissance doit provenir **uniquement** du document "GUIDE UTILISATEUR" fourni ci-dessous. Ne fais aucune supposition et n'ajoute pas d'informations externes.
4.  **Formatage :** Structure ta réponse en Markdown. Utilise un titre de niveau 3 (###) pour chaque terme ou concept expliqué. Utilise le gras et le style code (\`) pour mettre en évidence les points importants.
5.  **Langue :** Rédige toute la réponse en français.

Ne fournis que les explications, sans introduction ni conclusion.

--- DEBUT DU GUIDE UTILISATEUR ---
${DOCUMENT_CONTENT}
--- FIN DU GUIDE UTILISATEUR ---
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Erreur lors de l'approfondissement du sujet:", error);
    return "Désolé, une erreur s'est produite lors de la génération des explications complémentaires.";
  }
};

export const generatePaletteImage = async (topic: string): Promise<string | null> => {
  try {
    const prompt = `Crée une image claire et professionnelle d'une palette d'interface utilisateur pour un logiciel de publication assistée par ordinateur appelé 'EasyCatalog'. La palette doit illustrer le concept de "${topic}". Le style doit être similaire à celui des logiciels Adobe des années 2010-2020, avec des icônes claires et un agencement fonctionnel. Ne pas inclure de texte ou de logos illisibles. L'image doit être une représentation visuelle du concept, pas seulement du texte.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Erreur lors de la génération de l'image de la palette:", error);
    return null;
  }
};


export const generateFormulaFromRequest = async (request: string): Promise<string> => {
    try {
        const functionSignatures = FUNCTION_LIST.map(f => `${f.nom}(${f.parameters.join(', ')})`).join('\n');
        
        const prompt = `
Tu es un expert absolu des champs personnalisés du logiciel EasyCatalog.
Ta mission est de traduire la demande de l'utilisateur en une formule EasyCatalog valide et fonctionnelle.

**Règles strictes :**
1.  Utilise **uniquement et exclusivement** les fonctions de la liste fournie ci-dessous. N'invente aucune fonction.
2.  Ta réponse doit contenir **uniquement la formule brute**, sans aucune phrase d'introduction, explication ou formatage supplémentaire.
3.  Respecte scrupuleusement la syntaxe (majuscules pour les noms de fonctions, parenthèses, guillemets simples pour les chaînes de caractères).
4.  Si la demande de l'utilisateur est ambiguë, trop complexe, ou irréalisable avec les fonctions disponibles, ta réponse doit commencer **uniquement** par "ERREUR:" suivi d'une brève explication (ex: "ERREUR: Impossible de déterminer le nom du champ à utiliser.").

**Demande de l'utilisateur :**
"${request}"

**Liste des fonctions disponibles :**
---
${functionSignatures}
---
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Erreur lors de la génération de la formule:", error);
        return "ERREUR: Une erreur inattendue est survenue lors de la communication avec l'IA.";
    }
};
