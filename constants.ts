import { FunctionInfo } from './types';

export const FUNCTION_LIST: FunctionInfo[] = [
  {
    nom: 'ABS',
    description: "Retourne la valeur absolue d'un nombre.",
    parameters: [ 'Nombre' ],
    example: "ABS(FIELDVAL('Marge'))",
    category: 'Mathématiques'
  },
  {
    nom: 'AND',
    description: 'Renvoie VRAI si tous les arguments sont VRAI.',
    parameters: [ 'argument1', '[argument2]', '...' ],
    example: "AND(IF(FIELDVAL('Price'), '>', 100), FIELDSTR('InStock'))",
    category: 'Logique'
  },
  {
    nom: 'APPLYXSLT',
    description: 'Applique une transformation XSLT à un fragment XML.',
    parameters: [ 'Field', 'XSL Filename' ],
    example: "APPLYXSLT('XMLField', 'transform.xsl')",
    category: 'XML & Scripts'
  },
  {
    nom: 'AVG',
    description: 'Renvoie la moyenne de ses arguments.',
    parameters: [ 'argument1', '[argument2]', '...' ],
    example: "AVG(FIELDVAL('Val1'), FIELDVAL('Val2'))",
    category: 'Mathématiques'
  },
  {
    nom: 'CALLSCRIPT',
    description: 'Exécute un ExtendScript (.jsx) et renvoie son résultat.',
    parameters: [ 'Filename' ],
    example: "CALLSCRIPT('myscript.jsx')",
    category: 'XML & Scripts'
  },
  {
    nom: 'CEILING',
    description: "Arrondit un nombre à l'entier supérieur le plus proche.",
    parameters: [ 'Nombre' ],
    example: "CEILING(FIELDVAL('Poids'))",
    category: 'Mathématiques'
  },
  {
    nom: 'CHAR',
    description: 'Insère un caractère basé sur sa valeur Unicode.',
    parameters: [ 'Character Code' ],
    example: 'CHAR(65)',
    category: 'Texte'
  },
  {
    nom: 'CODE128',
    description: 'Convertit une chaîne en code-barres Code 128.',
    parameters: [ 'Code' ],
    example: "CODE128(FIELDSTR('Code'))",
    category: 'Code-barres & Images'
  },
  {
    nom: 'COMPARESTR',
    description: "Compare le contenu d'un champ avec une valeur.",
    parameters: [ 'Field Name', 'Value', 'True Value', 'False Value' ],
    example: "COMPARESTR('Description', 'abcdefg', 'Match', 'No Match')",
    category: 'Logique'
  },
  {
    nom: 'CONCAT',
    description: 'Joint plusieurs chaînes de texte en une seule.',
    parameters: [ 'text1', '[text2]', '...' ],
    example: "CONCAT('Prix :', FIELDSTR('Price'))",
    category: 'Texte'
  },
  {
    nom: 'CONTAINSALL',
    description: 'Teste si une chaîne contient toutes les sous-chaînes spécifiées.',
    parameters: [ 'Search In', 'Search For', '...' ],
    example: "CONTAINSALL(FIELDSTR('Text'), 'Apple', 'Dell')",
    category: 'Logique'
  },
  {
    nom: 'CONTAINSANY',
    description: "Teste si une chaîne contient l'une des sous-chaînes spécifiées.",
    parameters: [ 'Search In', 'Search For', '...' ],
    example: "CONTAINSANY(FIELDSTR('Text'), 'A', 'iMac')",
    category: 'Logique'
  },
  {
    nom: 'COUNTOF',
    description: "Compte le nombre d'occurrences d'une chaîne dans une autre.",
    parameters: [ 'Search In', 'Search For' ],
    example: "COUNTOF(FIELDSTR('Text'), 'apple')",
    category: 'Texte'
  },
  {
    nom: 'DATEFORMAT',
    description: 'Met en forme une date ou une heure selon un format spécifié.',
    parameters: [ 'Champ de date', 'Format de sortie' ],
    example: "DATEFORMAT(FIELDSTR('DateCréation'), 'jj/mm/aaaa')",
    category: 'Date & Heure'
  },
  {
    nom: 'DECTOFRAC',
    description: 'Convertit une valeur décimale en fraction.',
    parameters: [ 'Value', '[Format]' ],
    example: 'DECTOFRAC(0.5, FALSE)',
    category: 'Mathématiques'
  },
  {
    nom: 'DISTINCTLIST',
    description: 'Crée une liste délimitée de valeurs uniques.',
    parameters: [ 'Separator', 'String', '...' ],
    example: "DISTINCTLIST(',', 'A', 'B', 'A', 'C')",
    category: 'Utilitaires'
  },
  {
    nom: 'DIV',
    description: 'Divise deux nombres.',
    parameters: [ 'LHS', 'Factor' ],
    example: "DIV(FIELDVAL('Price'), 2)",
    category: 'Mathématiques'
  },
  {
    nom: 'DOESIMAGEEXIST',
    description: 'Vérifie si un fichier image existe.',
    parameters: [ 'Field Name' ],
    example: "DOESIMAGEEXIST('ImageField')",
    category: 'Code-barres & Images'
  },
  {
    nom: 'EAN13',
    description: 'Traduit un code en glyphes pour une police de code-barres.',
    parameters: [ 'Field Name' ],
    example: "EAN13('Stock Code')",
    category: 'Code-barres & Images'
  },
  {
    nom: 'EAN8',
    description: 'Traduit un code en glyphes pour une police de code-barres.',
    parameters: [ 'Field Name' ],
    example: "EAN8('Stock Code')",
    category: 'Code-barres & Images'
  },
  {
    nom: 'EVALUATEXPATH',
    description: 'Évalue une expression XPath sur un fragment XML.',
    parameters: [ 'Field', 'XPath', '[Separator]' ],
    example: "EVALUATEXPATH('XMLField', '//item')",
    category: 'XML & Scripts'
  },
  {
    nom: 'FIELDSTR',
    description: "Renvoie le contenu formaté (texte) d'un champ.",
    parameters: [ 'Field Name' ],
    example: "FIELDSTR('Price')",
    category: 'Données & Champs'
  },
  {
    nom: 'FIELDVAL',
    description: "Renvoie la valeur numérique brute d'un champ.",
    parameters: [ 'Field Name' ],
    example: "FIELDVAL('Price')",
    category: 'Données & Champs'
  },
  {
    nom: 'FLOOR',
    description: "Arrondit un nombre à l'entier inférieur le plus proche.",
    parameters: [ 'Nombre' ],
    example: "FLOOR(FIELDVAL('PrixDeVente'))",
    category: 'Mathématiques'
  },
  {
    nom: 'GETNTHPOPULATEDPARAM',
    description: 'Renvoie le n-ième paramètre non vide.',
    parameters: [ 'Field Index', '...' ],
    example: "GETNTHPOPULATEDPARAM(1, 'a', '', 'c', 'd')",
    category: 'Utilitaires'
  },
  {
    nom: 'GOOGLEQRCODEURL',
    description: 'Génère une URL pour un QR Code via Google Charts.',
    parameters: [ 'Width', 'Height', 'Text' ],
    example: "GOOGLEQRCODEURL(150, 150, 'www.65bit.com')",
    category: 'Code-barres & Images'
  },
  {
    nom: 'GROUPAVG',
    description: "Calcule la moyenne d'un champ pour le groupe entier.",
    parameters: [ 'Group Path', 'Value Field' ],
    example: "GROUPAVG('Catégorie', 'Prix')",
    category: 'Groupes'
  },
  {
    nom: 'GROUPCOUNT',
    description: "Compte le nombre d'enregistrements dans le groupe.",
    parameters: [ 'Group Path' ],
    example: "GROUPCOUNT('Catégorie')",
    category: 'Groupes'
  },
  {
    nom: 'GROUPCOUNTUNIQUE',
    description: "Compte le nombre de valeurs uniques d'un champ dans le groupe.",
    parameters: [ 'Group Path', 'Field' ],
    example: "GROUPCOUNTUNIQUE('Catégorie', 'Prix')",
    category: 'Groupes'
  },
  {
    nom: 'GROUPFIRST',
    description: "Renvoie la première valeur d'un champ dans le groupe (après tri).",
    parameters: [ 'Group Path', 'Sort Field', 'Value Field' ],
    example: "GROUPFIRST('Catégorie', 'Prix', 'Prix')",
    category: 'Groupes'
  },
  {
    nom: 'GROUPISFIRST',
    description: "Renvoie VRAI pour les 'n' premiers enregistrements d'un groupe.",
    parameters: [ 'Group Path', 'Sort Field', 'Number of records' ],
    example: "GROUPISFIRST('Catégorie', 'Prix', 1)",
    category: 'Groupes'
  },
  {
    nom: 'GROUPISLAST',
    description: "Renvoie VRAI pour les 'n' derniers enregistrements d'un groupe.",
    parameters: [ 'Group Path', 'Sort Field', 'Number of records' ],
    example: "GROUPISLAST('Catégorie', 'Prix', 1)",
    category: 'Groupes'
  },
  {
    nom: 'GROUPLAST',
    description: "Renvoie la dernière valeur d'un champ dans le groupe (après tri).",
    parameters: [ 'Group Path', 'Sort Field', 'Value Field' ],
    example: "GROUPLAST('Catégorie', 'Prix', 'Prix')",
    category: 'Groupes'
  },
  {
    nom: 'GROUPLIST',
    description: "Crée une liste délimitée des valeurs d'un champ pour un groupe.",
    parameters: [ 'Group Path', 'Sort Field', 'Value Field', '...' ],
    example: "GROUPLIST('Catégorie', 'Prix', 'Prix', ', ')",
    category: 'Groupes'
  },
  {
    nom: 'GROUPMAX',
    description: "Trouve la valeur maximale d'un champ dans le groupe.",
    parameters: [ 'Group Path', 'Value Field' ],
    example: "GROUPMAX('Catégorie', 'Prix')",
    category: 'Groupes'
  },
  {
    nom: 'GROUPMIN',
    description: "Trouve la valeur minimale d'un champ dans le groupe.",
    parameters: [ 'Group Path', 'Value Field' ],
    example: "GROUPMIN('Catégorie', 'Prix')",
    category: 'Groupes'
  },
  {
    nom: 'GROUPNUMBERSEQUENCE',
    description: 'Compile une liste de nombres en une chaîne de type ""plage de pages"".',
    parameters: [ 'Group Path', 'Number Field' ],
    example: "GROUPNUMBERSEQUENCE('Catégorie', 'Prix')",
    category: 'Groupes'
  },
  {
    nom: 'GROUPONCHANGE',
    description: "Renvoie VRAI chaque fois que la valeur d'un champ change au sein du groupe.",
    parameters: [ 'Group Path', 'Sort Field', 'Field' ],
    example: "GROUPONCHANGE('Catégorie', 'Prix', 'Prix')",
    category: 'Groupes'
  },
  {
    nom: 'GROUPRTOTAL',
    description: 'Calcule une somme cumulative (running total) au sein du groupe.',
    parameters: [ 'Group Path', 'Sort Field', 'Value Field' ],
    example: "GROUPRTOTAL('Catégorie', 'Prix', 'Prix')",
    category: 'Groupes'
  },
  {
    nom: 'GROUPSERIES',
    description: 'Crée une série numérique au sein du groupe.',
    parameters: [ 'Group Path', 'Sort Field', 'Start', 'Increment' ],
    example: "GROUPSERIES('Catégorie', 'Prix', 1, 1)",
    category: 'Groupes'
  },
  {
    nom: 'GROUPSUM',
    description: "Calcule la somme totale d'un champ pour le groupe entier.",
    parameters: [ 'Group Path', 'Value Field' ],
    example: "GROUPSUM('Catégorie', 'Prix')",
    category: 'Groupes'
  },
  {
    nom: 'GROUPVAL',
    description: "Récupère la valeur d'un champ à partir du niveau d'en-tête de groupe spécifié.",
    parameters: [ 'Nom du champ', 'Niveau de groupe' ],
    example: "GROUPVAL('NomDeCatégorie', 1)",
    category: 'Groupes'
  },
  {
    nom: 'GROUPXREFFIELD',
    description: 'Effectue une recherche croisée (VLOOKUP) limitée au groupe actuel.',
    parameters: [ 'Group Path', 'Search Field', 'Search Value', 'Return Field' ],
    example: "GROUPXREFFIELD('Catégorie', 'Produit', 'T-shirt A', 'Prix')",
    category: 'Groupes'
  },
  {
    nom: 'I2OF5',
    description: 'Convertit un code numérique en code-barres 2 parmi 5.',
    parameters: [ 'Code' ],
    example: "I2OF5(FIELDSTR('Code'))",
    category: 'Code-barres & Images'
  },
  {
    nom: 'IF',
    description: 'Effectue un test logique et renvoie des valeurs différentes.',
    parameters: [ 'Operand', 'Operator', 'Operand', 'True Value', 'False Value' ],
    example: "IF(FIELDVAL('Price'), '>', 100, 'Cher', 'Abordable')",
    category: 'Logique'
  },
  {
    nom: 'IFEMPTY',
    description: "Vérifie si un champ est vide et retourne une valeur spécifiée si c'est le cas, sinon retourne la valeur du champ.",
    parameters: [ 'Champ à vérifier', 'Valeur si vide' ],
    example: "IFEMPTY(FIELDSTR('Image'), 'image_par_defaut.jpg')",
    category: 'Logique'
  },
  {
    nom: 'INDEXOF',
    description: "Renvoie la position de la première occurrence d'une chaîne.",
    parameters: [ 'Search In', 'Search For', '[Start Index]' ],
    example: "INDEXOF(FIELDSTR('Text'), 'Apple')",
    category: 'Texte'
  },
  {
    nom: 'LASTINDEXOF',
    description: "Renvoie la position de la dernière occurrence d'une chaîne.",
    parameters: [ 'Search In', 'Search For', '[Start Index]' ],
    example: "LASTINDEXOF(FIELDSTR('Text'), 'Apple')",
    category: 'Texte'
  },
  {
    nom: 'LEFTSTR',
    description: 'Extrait des caractères en partant de la gauche.',
    parameters: [ 'Field Name', 'Length' ],
    example: "LEFTSTR('Manufacturer', 5)",
    category: 'Texte'
  },
  {
    nom: 'LENGTH',
    description: "Renvoie la longueur d'une chaîne de texte.",
    parameters: [ 'String' ],
    example: "LENGTH(FIELDSTR('Manufacturer'))",
    category: 'Texte'
  },
  {
    nom: 'LITERAL',
    description: 'Traite une chaîne de caractères comme un nom de champ.',
    parameters: [ 'String' ],
    example: "LEFTSTR(LITERAL('abcdefg'), 2)",
    category: 'Texte'
  },
  {
    nom: 'LOOKUP',
    description: "Recherche une valeur dans un champ d'une source de données et retourne la valeur d'un autre champ dans la ligne correspondante.",
    parameters: [
      'Source de données',
      'Champ de recherche',
      'Valeur à chercher',
      'Champ de retour'
    ],
    example: "LOOKUP('Fournisseurs', 'ID_Produit', FIELDSTR('SKU'), 'Nom_Fournisseur')",
    category: 'Données & Champs'
  },
  {
    nom: 'LOWER',
    description: "Met tout le texte d'un champ en minuscules.",
    parameters: [ 'Field Name' ],
    example: "LOWER('Manufacturer')",
    category: 'Texte'
  },
  {
    nom: 'MAX',
    description: 'Renvoie la plus grande valeur parmi ses arguments.',
    parameters: [ 'argument1', '[argument2]', '...' ],
    example: "MAX(FIELDVAL('Val1'), FIELDVAL('Val2'))",
    category: 'Mathématiques'
  },
  {
    nom: 'MIDSTR',
    description: "Extrait une sous-chaîne du milieu d'une chaîne, en spécifiant le début et la longueur.",
    parameters: [ 'Texte', 'Position de départ', 'Nombre de caractères' ],
    example: "MIDSTR(FIELDSTR('CodeProduit'), 4, 3)",
    category: 'Texte'
  },
  {
    nom: 'MIN',
    description: 'Renvoie la plus petite valeur parmi ses arguments.',
    parameters: [ 'argument1', '[argument2]', '...' ],
    example: "MIN(FIELDVAL('Val1'), FIELDVAL('Val2'))",
    category: 'Mathématiques'
  },
  {
    nom: 'MOD',
    description: "Renvoie le reste d'une division.",
    parameters: [ 'LHS', 'Factor' ],
    example: "MOD(FIELDVAL('Number'), 3)",
    category: 'Mathématiques'
  },
  {
    nom: 'MUL',
    description: 'Multiplie deux nombres.',
    parameters: [ 'LHS', 'Factor' ],
    example: "MUL(FIELDVAL('Price'), 5)",
    category: 'Mathématiques'
  },
  {
    nom: 'NOT',
    description: 'Inverse la valeur logique de son argument.',
    parameters: [ 'Argument' ],
    example: "NOT(FIELDSTR('myflag'))",
    category: 'Logique'
  },
  {
    nom: 'NOW',
    description: "Retourne la date et l'heure actuelles.",
    parameters: [],
    example: 'NOW()',
    category: 'Date & Heure'
  },
  {
    nom: 'OR',
    description: 'Renvoie VRAI si au moins un argument est VRAI.',
    parameters: [ 'argument1', '[argument2]', '...' ],
    example: "OR(IF(FIELDVAL('Price'), '>', 100), FIELDSTR('InStock'))",
    category: 'Logique'
  },
  {
    nom: 'PARTCOUNT',
    description: 'Compte le nombre de parties dans une chaîne en utilisant un délimiteur spécifié.',
    parameters: [ 'Champ', 'Délimiteur' ],
    example: "PARTCOUNT(FIELDSTR('MotsClés'), ',')",
    category: 'Texte'
  },
  {
    nom: 'PARTSTR',
    description: "Extrait un élément spécifique d'un champ délimité.",
    parameters: [ 'Field Name', 'Part No.', 'Delimiter' ],
    example: "PARTSTR('Images', 1, ',')",
    category: 'Texte'
  },
  {
    nom: 'PROPER',
    description: 'Met en majuscule la première lettre de chaque mot dans une chaîne de caractères.',
    parameters: [ 'Texte' ],
    example: "PROPER(FIELDSTR('nom_client'))",
    category: 'Texte'
  },
  {
    nom: 'RAND',
    description: 'Génère un nombre aléatoire entre 0 et 1.',
    parameters: [],
    example: 'RAND()',
    category: 'Mathématiques'
  },
  {
    nom: 'REGEX',
    description: 'Recherche et remplace via une expression régulière.',
    parameters: [ 'String to Search', 'Regex', 'String to Replace' ],
    example: "REGEX(FIELDSTR('Code'), '^(....)(...)(..)', '\\1.\\2.\\3')",
    category: 'Texte'
  },
  {
    nom: 'REGEXESCAPE',
    description: "Échappe les caractères spéciaux d'une expression régulière.",
    parameters: [ 'Text' ],
    example: "REGEXESCAPE('test.jpg')",
    category: 'Texte'
  },
  {
    nom: 'REMOVEBLANKLINES',
    description: "Supprime les paragraphes vides d'un texte.",
    parameters: [ 'Text' ],
    example: "REMOVEBLANKLINES(FIELDSTR('Text'))",
    category: 'Texte'
  },
  {
    nom: 'REPLACE',
    description: "Remplace une partie d'une chaîne de caractères par une autre.",
    parameters: [ 'Texte original', 'Texte à chercher', 'Nouveau texte' ],
    example: "REPLACE(FIELDSTR('SKU'), 'OLD-', 'NEW-')",
    category: 'Texte'
  },
  {
    nom: 'RIGHTSTR',
    description: 'Extrait des caractères en partant de la droite.',
    parameters: [ 'Field Name', 'Length' ],
    example: "RIGHTSTR('Manufacturer', 8)",
    category: 'Texte'
  },
  {
    nom: 'ROUND',
    description: 'Arrondit un nombre à un nombre de décimales spécifié.',
    parameters: [ 'Nombre', 'Nombre de décimales' ],
    example: "ROUND(FIELDVAL('Prix'), 2)",
    category: 'Mathématiques'
  },
  {
    nom: 'SEARCH',
    description: 'Trouve une chaîne de texte dans une autre (insensible à la casse) et retourne sa position de départ.',
    parameters: [ 'Texte à trouver', 'Texte où chercher' ],
    example: "SEARCH('PRO', FIELDSTR('NomProduit'))",
    category: 'Texte'
  },
  {
    nom: 'SENTENCECASE',
    description: 'Met la première lettre de la phrase en majuscule.',
    parameters: [ 'String' ],
    example: "SENTENCECASE(FIELDSTR('Sentence'))",
    category: 'Texte'
  },
  {
    nom: 'SNIPPETDEPTH',
    description: "Renvoie la hauteur/largeur en points d'un snippet EasyCatalog.",
    parameters: [ 'Filename' ],
    example: "SNIPPETDEPTH('mon_snippet.idms')",
    category: 'Utilitaires'
  },
  {
    nom: 'SNIPPETWIDTH',
    description: "Renvoie la hauteur/largeur en points d'un snippet EasyCatalog.",
    parameters: [ 'Filename' ],
    example: "SNIPPETWIDTH('mon_snippet.idms')",
    category: 'Utilitaires'
  },
  {
    nom: 'STRIPWHITESPACE',
    description: "Supprime les espaces superflus d'une chaîne.",
    parameters: [ 'String', '[Strip All]' ],
    example: "STRIPWHITESPACE(FIELDSTR('Text'))",
    category: 'Texte'
  },
  {
    nom: 'SUB',
    description: 'Soustrait les arguments suivants du premier.',
    parameters: [ 'argument1', '[argument2]', '...' ],
    example: "SUB(FIELDVAL('Total'), 10, 5)",
    category: 'Mathématiques'
  },
  {
    nom: 'SUBSTR',
    description: "Extrait des caractères spécifiques d'un champ.",
    parameters: [ 'Field Name', 'Start Index', 'Length' ],
    example: "SUBSTR('Manufacturer', 3, 8)",
    category: 'Texte'
  },
  {
    nom: 'SUM',
    description: 'Renvoie la somme de ses arguments.',
    parameters: [ 'argument1', '[argument2]', '...' ],
    example: "SUM(FIELDVAL('Price'), 20)",
    category: 'Mathématiques'
  },
  {
    nom: 'SWITCH',
    description: "Évalue une expression et la compare à une série de valeurs, retournant le résultat correspondant à la première correspondance trouvée.",
    parameters: [
      'Expression',
      'Valeur 1',
      'Résultat 1',
      'Valeur 2',
      'Résultat 2',
      '...',
      '[Résultat par défaut]'
    ],
    example: "SWITCH(FIELDSTR('Catégorie'), 'A', 'Priorité Haute', 'B', 'Priorité Moyenne', 'Priorité Basse')",
    category: 'Logique'
  },
  {
    nom: 'TITLECASE',
    description: 'Met la première lettre de chaque mot en majuscule.',
    parameters: [ 'String' ],
    example: "TITLECASE(FIELDSTR('Title'))",
    category: 'Texte'
  },
  {
    nom: 'TRIM',
    description: "Supprime les espaces superflus au début et à la fin d'une chaîne de caractères.",
    parameters: [ 'Texte' ],
    example: "TRIM(FIELDSTR('Nom du produit'))",
    category: 'Texte'
  },
  {
    nom: 'UPPER',
    description: "Met tout le texte d'un champ en majuscules.",
    parameters: [ 'Field Name' ],
    example: "UPPER('Manufacturer')",
    category: 'Texte'
  },
  {
    nom: 'URLDECODE',
    description: 'Décode une chaîne encodée pour une URL.',
    parameters: [ 'String' ],
    example: "URLDECODE('This%20is%20a%20test')",
    category: 'Texte'
  },
  {
    nom: 'URLENCODE',
    description: "Encode une chaîne pour une utilisation dans une URL.",
    parameters: [ 'String' ],
    example: "URLENCODE('This is a test')",
    category: 'Texte'
  },
  {
    nom: 'XREFFIELD',
    description: 'Recherche une valeur dans une source de données et renvoie une autre valeur.',
    parameters: [
      'Search Field',
      'Search Value',
      'Return Field',
      '[Data Source]'
    ],
    example: "XREFFIELD('PartNo', FIELDSTR('XRefPartNo'), 'Page')",
    category: 'Données & Champs'
  }
].sort((a, b) => a.nom.localeCompare(b.nom));

export const DOCUMENT_CONTENT = `
EASYCATALOG USER GUIDE
© Copyright 65bit Software Limited. All Rights reserved. Reproduction or copying prohibited.
Adobe and InDesign are either trademarks or registered trademarks of Adobe Systems Incorporated in the United States and/or other countries.
All other trademarks and copyrights are the property of their respective owners.
GETTING STARTED 
Welcome! ...............................................................................................................................8
What Is EasyCatalog? ...........................................................................................................8
30 Day Trial Version ...............................................................................................................9
Purchasing EasyCatalog ........................................................................................................9
Activating EasyCatalog ........................................................................................................10
Activating without an Internet Connection .....................................................................10
Common Activation Errors..............................................................................................10
Transferring An Activation ....................................................................................................11
Keeping Up To Date .............................................................................................................11
Support Questions ...............................................................................................................12
Integration Opportunities .....................................................................................................12
Resellers...............................................................................................................................12
IMPORTING YOUR DATA 
Introduction .........................................................................................................................13
Supported Data Sources .....................................................................................................13
Data Concepts .....................................................................................................................14
Importing From a CSV/Delimited File ..................................................................................16
Importing From an Excel Spreadsheet.................................................................................18
Importing From a Google Docs Spreadsheet.......................................................................19
Common Errors and Warnings ............................................................................................21
Data Caching And The Workspace Folder ..........................................................................22
Specifying a Workspace Folder......................................................................................22
FIELD OPTIONS 
Introduction .........................................................................................................................23
Opening The Field Options Dialog .......................................................................................23
Available Field Options.........................................................................................................23
The Format Pane..................................................................................................................24
The General Pane.................................................................................................................29
InDesign Metacharacters/Special Characters ................................................................31
Picture Content Pane ...........................................................................................................31
Downloading Images ......................................................................................................33
Database Update Pane ........................................................................................................33
Advanced Pane ....................................................................................................................34
Custom Field Pane...............................................................................................................35
EASYCATALOG DATA PANELS 
Introduction .........................................................................................................................36
Opening a new EasyCatalog Data Panel .............................................................................36
Panel Overview.....................................................................................................................37
Finding Fields In The Document...........................................................................................38
Editing Data In The Panel.....................................................................................................38
Reordering Rows and Columns ...........................................................................................39
Sorting Columns.............................................................................................................39
Sub-Sorting Columns .....................................................................................................39
Manually Reordering Rows.............................................................................................39
Reordering Column Positions.........................................................................................39
Reordering Columns Alphabetically..........................................................................39
Preventing Columns From Scrolling ...............................................................................39
Grouping Your Data..............................................................................................................40
Grouping Configuration Dialog.......................................................................................40
Adding a Group Level.....................................................................................................40
Removing a Group Level ................................................................................................40
Sorting Groups In The Panel...........................................................................................40
Display alternative field as header .................................................................................41
Locking a Panel....................................................................................................................41
Panel Configurations ............................................................................................................41
Saving a panel configuration ..........................................................................................41
Loading a Panel Configuration .......................................................................................42
Exporting and Importing a Panel Configuration .............................................................43
Defining a Default Configurations...................................................................................43
Closing Panels......................................................................................................................44
Hiding a panel.................................................................................................................44
Closing a Panel...............................................................................................................44
INSERTING DATA 
Introduction .........................................................................................................................45
Single Field Insertion............................................................................................................45
Showing and Hiding Field Markers.................................................................................47
Relinking Fields To New Data Sources.................................................................................48
Replacing Fields...................................................................................................................49
Removing Field Markers.......................................................................................................49
Tagging Existing Content .....................................................................................................50
Manually .........................................................................................................................50
Automatically, from Table Content..................................................................................51
Horizontal Table Example..........................................................................................53
Vertical Table Example .............................................................................................53
FILTERING DATA 
Introduction .........................................................................................................................55
Filtering Based On Field Content .........................................................................................55
Filtering Based on Status .....................................................................................................56
Saving Filters........................................................................................................................57
Removing a Filter from a Panel ............................................................................................57
Automatically Creating Subsets ...........................................................................................57
Removing a Filter From a Panel ...........................................................................................57
SYNCHRONIZING 
Introduction .........................................................................................................................58
Getting the Latest Data ........................................................................................................58
Synchronizing With a Different File.......................................................................................58
Updating The Document......................................................................................................59
Updating a single column...............................................................................................59
Updating an InDesign Book............................................................................................59
Checking For Errors .............................................................................................................59
Text Content ...................................................................................................................60
Picture Content...............................................................................................................61
Quickly Finding Errors in the Panel ......................................................................................61
Updating the Panel FRom the Document ............................................................................61
Updating a single column...............................................................................................62
Updating The Panel With Page Numbers.............................................................................62
Updating Page Numbers From Multiple Documents......................................................63
Updating the Panel With Page Position Data.......................................................................63
Updating Your Source Data..................................................................................................65
File-based data...............................................................................................................65
Database (ODBC) data ...................................................................................................65
Updating Page Numbers From Multiple Documents......................................................63
Updating the Panel With Page Position Data.......................................................................63
Updating Your Source Data..................................................................................................65
File-based data...............................................................................................................65
Database (ODBC) data ...................................................................................................65
DYNAMIC CONTENT
Introduction .........................................................................................................................66
Data Placeholders (Field Specifiers).....................................................................................66
Inserting Field Specifiers ......................................................................................................66
Text Field Specifiers........................................................................................................67
Picture Field Specifiers...................................................................................................68
Removing Field Specifiers ..............................................................................................68
Converting Field Markers To Field Specifiers .................................................................68
Populating Field Specifiers...................................................................................................69
Tabular Data....................................................................................................................69
EasyCatalog Libraries...........................................................................................................70
Creating an EasyCatalog Library ....................................................................................70
Populating an EasyCatalog Library With Data................................................................70
Editing a Library Item......................................................................................................71
CONDITIONAL PROCESSING 
Introduction .........................................................................................................................72
Commands...........................................................................................................................72
Nesting 'IF' Commands .......................................................................................................73
Error Messages ....................................................................................................................74
AUTOMATIC PAGINATION
Introduction .........................................................................................................................75
Preparing for Pagination.......................................................................................................75
Configure The Panel.........................................................................................................76
Acquire or import source data........................................................................................76
Filter your data................................................................................................................76
Group your Data .............................................................................................................76
Sort your Data.................................................................................................................77
Create Your Product Styles ..............................................................................................77
Using The Pagination Rules Panel..................................................................................77
Paginating one Product Style Per Record......................................................................77
Paginating one Product Style Per Group........................................................................77
Paginate ...........................................................................................................................78
’Into Text Flow’ ...............................................................................................................78
‘At Positions Specified in the Data’ ................................................................................78
‘At Page Guide Positions’...............................................................................................78
‘Using Master Pages’ .....................................................................................................78
‘Template Document’......................................................................................................78
'Into Text Flow' Pagination .............................................................................................79
Requirements............................................................................................................79
Pagination Settings...................................................................................................79
"Asset Name"............................................................................................................79
"Break on Field Change" / "Break Type" ..................................................................79
"Restrict Vertical Cell Merging to Page Bounds"......................................................80
"Update Furniture After Pagination" .........................................................................80
'At Positions Specified in the Data' Pagination ..............................................................80
"X Position"/"Y Position" ..........................................................................................80
"Width"/"Height" .......................................................................................................80
"Asset Name"............................................................................................................80
"Apply Master Named In" .........................................................................................81
'At Page Guide Positions' Pagination.............................................................................81
"Direction of Flow" ....................................................................................................81
"Asset Name"............................................................................................................83
"Apply Master Named In" .........................................................................................83
"Break on Field Change"/"Break Type" ....................................................................83
"Use next Position if item doesn't fit" .......................................................................83
"Ignore Page Bounds" ..............................................................................................83
"Restrict Vertical Cell Merging to Page Bounds"......................................................83
"Collision Detection"/"Gutter"...................................................................................83
"Using Master Pages" Pagination ..................................................................................84
Paginate ....................................................................................................................85
Page No. ...................................................................................................................86
Page Field Contains..................................................................................................86
Layer .........................................................................................................................86
Break On Field Change.............................................................................................86
Apply Master Named In ............................................................................................86
Positions Are .............................................................................................................86
Quantity.....................................................................................................................86
Rule...........................................................................................................................86
Unused Positions......................................................................................................86
Template Document........................................................................................................86
Positions Are .............................................................................................................87
Template Document..................................................................................................87
Output Folder............................................................................................................87
Filename....................................................................................................................87
Output Document .....................................................................................................87
Output PDF ...............................................................................................................87
Print using Preset......................................................................................................87
Choosing Product Styles based on Field Content...............................................................88
Using the Asset Name field on the Pagination Dialog....................................................88
Using the ‘Ignore’ Pagination Rule .................................................................................88
PAGE HEADERS
Introduction .........................................................................................................................89
Defining Furniture .................................................................................................................89
Populating Furniture.............................................................................................................90
FORMATTING RULES
Introduction .........................................................................................................................91
Advantages of Using Formatting Rules................................................................................91
What Are Rules?...................................................................................................................91
What Are Rule Sets? ............................................................................................................92
The Formatting Rules Panel .................................................................................................92
Creating Formatting Rules....................................................................................................92
Editing Formatting Rules Properties.....................................................................................94
General ...........................................................................................................................94
Filters ..............................................................................................................................94
Attributes ........................................................................................................................96
Deleting Rules ......................................................................................................................97
Duplicating Rules .................................................................................................................97
Modifying a Rule's Product Style .........................................................................................97
Populating a Rule With Data ................................................................................................98
Updating The Document ................................................................................................99
Creating Rule Sets..............................................................................................................100
Adding Rules to Rule Sets............................................................................................100
Removing Rules From Rule Sets..................................................................................100
Populating a Rule Set.........................................................................................................101
Updating The Document ..............................................................................................102
Importing Rules ..................................................................................................................103
Importing From a Library ..............................................................................................103
Importing From a Document.........................................................................................103
Using Rule Sets with Pagination ........................................................................................103
'Into Text Flow' Pagination ...........................................................................................103
'At Page Guide Positions' and 'At Positions Specified In The Data' Pagination..........103
'Template Document' Pagination..................................................................................104
TABULAR DATA 
Introduction .......................................................................................................................105
Simple Tables .....................................................................................................................105
Inserting a new table.....................................................................................................105
Inserting into an existing table......................................................................................105
Designed Tables .................................................................................................................106
Designing the table.......................................................................................................106
Populating the table......................................................................................................106
Adjusting to your data ..................................................................................................106
Row Options.................................................................................................................106
Column Options............................................................................................................107
Table Options................................................................................................................108
POPULATING TABLES WITH COMPLEX DATA............................................................108
Populating Tables Horizontally .....................................................................................109
Populating Tables with XML Data.................................................................................109
Source Data: ...........................................................................................................110
XSL Transformation for XML Data...........................................................................111
Tabular Fields .....................................................................................................................113
Inserting Single Tabular Fields......................................................................................116
Inserting Tabular Fields Tables......................................................................................117
Populating Table Prototypes.........................................................................................117
PAGINATION RULES REFERENCE
Introduction .......................................................................................................................119
Using the Pagination Rules Panel ......................................................................................119
Editing Attributes................................................................................................................120
Filtering the Pagination Rules Panel...................................................................................120
Pagination Rules Reference ...............................................................................................120
CUSTOM FIELDS REFERENCE
Introduction .......................................................................................................................129
Creating a New Custom Field ............................................................................................129
Types of Functions .............................................................................................................130
Combining Functions ........................................................................................................130
Parameter Types ................................................................................................................130
What is the difference between FIELDSTR and FIELDVAL? .............................................131
String Functions .................................................................................................................131
Math Functions...................................................................................................................137
Logic Functions..................................................................................................................139
Utility Functions..................................................................................................................147
CHAPTER 1
GETTING STARTED 
WELCOME! 
Thank you for evaluating EasyCatalog for Adobe InDesign. 
65bit Software are committed to providing high quality software for Adobe InDesign, 
and appreciate the time you have taken to evaluate our product. All feedback is 
welcome, good or bad. Please email any comments to support@65bit.com or use our 
support form on the website. We promise to respond to every one!
WHAT IS EASYCATALOG? 
EasyCatalog is a complete database publishing solution, and provides a bi-drectional 
link between data from a variety of sources to content in an InDesign document. Any 
changes made in the document may be reflected back to the original source of the 
data.
Document content is constantly tracked, enabling you to determine which records and 
fields are placed. Document tracking offers a number of benefits:
Increased productivity:
Data can be acquired from a variety of data sources quickly and efficiently. Time is 
not spent re-keying or importing data.
• Errors are reduced, as data on the page is coming directly from the data 
source without being re-keyed.
• Errors are detected. EasyCatalog can highlight all fields that differ to the 
original data, and either automatically correct them or highlight them for manual 
correction in the document.
• Data can be filtered and grouped to only show data relevant to a particular 
section of the publication, for instance. Filtering your data reduces the amount of 
time spent searching through data that is not relevant to the task you’re currently 
performing.
• Data that has been changed on the database can be updated in the document 
instantly – ideal for deadline-critical publications.
• Records can be dragged and dropped to the page using pre-defined templates 
stored in libraries. Placeholders in the templates show EasyCatalog where and 
how each field should appear, and complex page layouts containing live linked 
data can be constructed in seconds.
Powerful pagination facilities
EasyCatalog contains of wealth of facilities for both data driven and design driven 
publications.
• Formatting may be applied to fields, ensuring that all prices, for instance, 
appear in a consistent format throughout the publication. Any prices that do 
not obey these formatting rules will be highlighted as part of the error-checking 
procedure.
• Library styles may be defined for records, ensuring records appear in a 
consistent manner. See ‘Templates and Libraries’
• EasyCatalog offers powerful tabular data functionality, allowing tables to be 
created from your data at the click of a button.
• Using the optional pagination module, EasyCatalog can automatically create 
a flow of several hundred pages.
• EasyCatalog leverages the typographical and layout features of InDesign, so 
the layout and style of your publication doesn’t have to suffer.
Reduced cost of ownership
• EasyCatalog is a front-end for existing databases – you purchase the plug in and we, or a systems integrator, provide Data Provider plug-ins to access 
your data. Data can be imported from a delimited file (such as a comma or tab delimited file), ODBC database or an XML file.
• As there is no new ‘production’ database to integrate with, there will be no 
integration issues, or unwanted database licenses. 
• As EasyCatalog is tightly integrated with Adobe InDesign, there is no new 
application environment to learn. 
CUSTOM FIELDS REFERENCE
Creating a New Custom Field ............................................................................................129
Types of Functions .............................................................................................................130
Combining Functions ........................................................................................................130
Parameter Types ................................................................................................................130
What is the difference between FIELDSTR and FIELDVAL? .............................................131
String Functions .................................................................................................................131
Math Functions...................................................................................................................137
Logic Functions..................................................................................................................139
Utility Functions..................................................................................................................147
`;