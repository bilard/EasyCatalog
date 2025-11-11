import { FunctionInfo } from './types';

export const FUNCTION_LIST: FunctionInfo[] = [
  {
    nom: 'ABS',
    description: "Retourne la valeur absolue d'un nombre.",
    parameters: ['Nombre'],
    example: "ABS(FIELDVAL('Marge'))"
  },
  {
    nom: 'AND',
    description: "Retourne VRAI si toutes les conditions fournies sont vraies.",
    parameters: ['Condition 1', 'Condition 2', '...'],
    example: "AND(IF(FIELDSTR('Prix'), '>', 10), IF(FIELDSTR('Disponibilité'), '=', 'TRUE'))"
  },
  {
    nom: 'AVG',
    description: "Calcule la moyenne numérique de ses arguments.",
    parameters: ['Nombre 1', 'Nombre 2', '...'],
    example: "AVG(FIELDVAL('Prix1'), FIELDVAL('Prix2'))"
  },
  {
    nom: 'CEILING',
    description: "Arrondit un nombre à l'entier supérieur le plus proche.",
    parameters: ['Nombre'],
    example: "CEILING(FIELDVAL('Poids'))"
  },
  {
    nom: 'COMPARESTR',
    description: "Compare le contenu d'un champ avec une valeur ou un autre champ.",
    parameters: ['Champ à évaluer', 'Valeur à comparer', 'Valeur si Vrai', 'Valeur si Faux'],
    example: "COMPARESTR('Description', 'abcdefg', 'Match', 'No Match')"
  },
  {
    nom: 'CONCAT',
    description: "Assemble (concatène) plusieurs chaînes de caractères.",
    parameters: ['Texte 1', 'Texte 2', '...'],
    example: "CONCAT(FIELDSTR('Prénom'), ' ', FIELDSTR('Nom'))"
  },
  {
    nom: 'COUNTOF',
    description: "Compte le nombre d'occurrences d'une chaîne dans une autre.",
    parameters: ['Chaîne de recherche', 'Chaîne à trouver'],
    example: "COUNTOF(FIELDSTR('Description'), 'et')"
  },
  {
    nom: 'DATEFORMAT',
    description: "Met en forme une date ou une heure selon un format spécifié.",
    parameters: ['Champ de date', 'Format de sortie'],
    example: "DATEFORMAT(FIELDSTR('DateCréation'), 'jj/mm/aaaa')"
  },
  {
    nom: 'DECTOFRAC',
    description: "Convertit une valeur décimale en fraction.",
    parameters: ['Valeur décimale', 'Format HTML (Boolean)'],
    example: "DECTOFRAC(0.5, FALSE)"
  },
  {
    nom: 'DIV',
    description: "Divise un nombre par un autre.",
    parameters: ['Numérateur', 'Dénominateur'],
    example: "DIV(FIELDVAL('Prix'), 2)"
  },
  {
    nom: 'FIELDSTR',
    description: "Retourne le contenu textuel (formaté) du champ spécifié.",
    parameters: ['Nom du champ'],
    example: "FIELDSTR('NomProduit')"
  },
  {
    nom: 'FIELDVAL',
    description: "Retourne la valeur numérique brute du champ spécifié.",
    parameters: ['Nom du champ'],
    example: "FIELDVAL('Prix')"
  },
  {
    nom: 'FLOOR',
    description: "Arrondit un nombre à l'entier inférieur le plus proche.",
    parameters: ['Nombre'],
    example: "FLOOR(FIELDVAL('PrixDeVente'))"
  },
  {
    nom: 'GROUPVAL',
    description: "Récupère la valeur d'un champ à partir du niveau d'en-tête de groupe spécifié.",
    parameters: ["Nom du champ", "Niveau de groupe"],
    example: "GROUPVAL('NomDeCatégorie', 1)"
  },
  {
    nom: 'IF',
    description: "Exécute une comparaison et retourne une valeur si c'est vrai, sinon une autre.",
    parameters: ['Opérande 1', 'Opérateur', 'Opérande 2', 'Valeur si Vrai', 'Valeur si Faux'],
    example: "IF(FIELDVAL('Prix'), '>', '100', 'Cher', 'Abordable')"
  },
  {
    nom: 'IFEMPTY',
    description: "Vérifie si un champ est vide et retourne une valeur spécifiée si c'est le cas, sinon retourne la valeur du champ.",
    parameters: ['Champ à vérifier', 'Valeur si vide'],
    example: "IFEMPTY(FIELDSTR('Image'), 'image_par_defaut.jpg')"
  },
  {
    nom: 'INDEXOF',
    description: "Trouve la position de la première occurrence d'une chaîne dans une autre.",
    parameters: ['Chaîne de recherche', 'Chaîne à trouver', 'Index de départ (Optionnel)'],
    example: "INDEXOF(FIELDSTR('Référence'), 'ABC')"
  },
  {
    nom: 'LEFTSTR',
    description: "Extrait un nombre de caractères depuis le début (gauche) d'une chaîne.",
    parameters: ['Nom du champ', 'Nombre de caractères'],
    example: "LEFTSTR('RéférenceProduit', 5)"
  },
  {
    nom: 'LENGTH',
    description: "Retourne la longueur d'une chaîne de caractères.",
    parameters: ['Chaîne'],
    example: "LENGTH(FIELDSTR('Description'))"
  },
  {
    nom: 'LOOKUP',
    description: "Recherche une valeur dans un champ d'une source de données et retourne la valeur d'un autre champ dans la ligne correspondante.",
    parameters: ["Source de données", "Champ de recherche", "Valeur à chercher", "Champ de retour"],
    example: "LOOKUP('Fournisseurs', 'ID_Produit', FIELDSTR('SKU'), 'Nom_Fournisseur')"
  },
  {
    nom: 'LOWER',
    description: "Convertit une chaîne de caractères en minuscules.",
    parameters: ['Nom du champ'],
    example: "LOWER('Titre')"
  },
  {
    nom: 'MAX',
    description: "Retourne la valeur la plus élevée parmi ses arguments.",
    parameters: ['Nombre 1', 'Nombre 2', '...'],
    example: "MAX(FIELDVAL('Score1'), FIELDVAL('Score2'))"
  },
  {
    nom: 'MIDSTR',
    description: "Extrait une sous-chaîne du milieu d'une chaîne, en spécifiant le début et la longueur.",
    parameters: ['Texte', 'Position de départ', 'Nombre de caractères'],
    example: "MIDSTR(FIELDSTR('CodeProduit'), 4, 3)"
  },
  {
    nom: 'MIN',
    description: "Retourne la valeur la plus basse parmi ses arguments.",
    parameters: ['Nombre 1', 'Nombre 2', '...'],
    example: "MIN(FIELDVAL('PrixMin'), FIELDVAL('PrixMax'))"
  },
  {
    nom: 'MOD',
    description: "Calcule le reste d'une division.",
    parameters: ['Dividende', 'Diviseur'],
    example: "MOD(10, 3)"
  },
  {
    nom: 'MUL',
    description: "Multiplie un nombre par un autre.",
    parameters: ['Facteur 1', 'Facteur 2'],
    example: "MUL(FIELDVAL('Quantité'), FIELDVAL('PrixUnitaire'))"
  },
  {
    nom: 'NOT',
    description: "Inverse une valeur logique (VRAI devient FAUX, et vice-versa).",
    parameters: ['Condition'],
    example: "NOT(FIELDSTR('EstActif'))"
  },
  {
    nom: 'NOW',
    description: "Retourne la date et l'heure actuelles.",
    parameters: [],
    example: "NOW()"
  },
  {
    nom: 'OR',
    description: "Retourne VRAI si au moins une des conditions est vraie.",
    parameters: ['Condition 1', 'Condition 2', '...'],
    example: "OR(IF(FIELDSTR('Statut'), '=', 'Urgent'), IF(FIELDSTR('Priorité'), '>', 5))"
  },
  {
    nom: 'PARTCOUNT',
    description: "Compte le nombre de parties dans une chaîne en utilisant un délimiteur spécifié.",
    parameters: ["Champ", "Délimiteur"],
    example: "PARTCOUNT(FIELDSTR('MotsClés'), ',')"
  },
  {
    nom: 'PARTSTR',
    description: "Extrait un élément spécifique d'une chaîne délimitée.",
    parameters: ['Nom du champ', 'Numéro de partie', 'Délimiteur'],
    example: "PARTSTR('Tailles', 2, ',')"
  },
  {
    nom: 'PROPER',
    description: "Met en majuscule la première lettre de chaque mot dans une chaîne de caractères.",
    parameters: ["Texte"],
    example: "PROPER(FIELDSTR('nom_client'))"
  },
  {
    nom: 'RAND',
    description: "Génère un nombre aléatoire entre 0 et 1.",
    parameters: [],
    example: "RAND()"
  },
  {
    nom: 'REGEX',
    description: "Effectue une recherche et un remplacement basés sur une expression régulière.",
    parameters: ['Chaîne à analyser', 'Expression régulière', 'Chaîne de remplacement'],
    example: "REGEX(FIELDSTR('Code'), '(\\d{3})-(\\d{3})', '$1 $2')"
  },
  {
    nom: 'REPLACE',
    description: "Remplace une partie d'une chaîne de caractères par une autre.",
    parameters: ['Texte original', 'Texte à chercher', 'Nouveau texte'],
    example: "REPLACE(FIELDSTR('SKU'), 'OLD-', 'NEW-')"
  },
  {
    nom: 'RIGHTSTR',
    description: "Extrait un nombre de caractères depuis la fin (droite) d'une chaîne.",
    parameters: ['Nom du champ', 'Nombre de caractères'],
    example: "RIGHTSTR('CodeProduit', 4)"
  },
  {
    nom: 'ROUND',
    description: "Arrondit un nombre à un nombre de décimales spécifié.",
    parameters: ['Nombre', 'Nombre de décimales'],
    example: "ROUND(FIELDVAL('Prix'), 2)"
  },
  {
    nom: 'SEARCH',
    description: "Trouve une chaîne de texte dans une autre (insensible à la casse) et retourne sa position de départ.",
    parameters: ['Texte à trouver', 'Texte où chercher'],
    example: "SEARCH('PRO', FIELDSTR('NomProduit'))"
  },
  {
    nom: 'SUB',
    description: "Soustrait des nombres du premier argument.",
    parameters: ['Valeur initiale', 'Nombre à soustraire 1', '...'],
    example: "SUB(FIELDVAL('Total'), FIELDVAL('Réduction'))"
  },
  {
    nom: 'SUBSTR',
    description: "Extrait des caractères spécifiques d'une chaîne à une position donnée.",
    parameters: ['Nom du champ', 'Index de début', 'Longueur'],
    example: "SUBSTR('NuméroDeSérie', 3, 8)"
  },
  {
    nom: 'SUM',
    description: "Calcule la somme de tous ses arguments.",
    parameters: ['Nombre 1', 'Nombre 2', '...'],
    example: "SUM(FIELDVAL('VentesT1'), FIELDVAL('VentesT2'))"
  },
  {
    nom: 'SWITCH',
    description: "Évalue une expression et la compare à une série de valeurs, retournant le résultat correspondant à la première correspondance trouvée.",
    parameters: ['Expression', 'Valeur 1', 'Résultat 1', 'Valeur 2', 'Résultat 2', '...', '[Résultat par défaut]'],
    example: "SWITCH(FIELDSTR('Catégorie'), 'A', 'Priorité Haute', 'B', 'Priorité Moyenne', 'Priorité Basse')"
  },
  {
    nom: 'TRIM',
    description: "Supprime les espaces superflus au début et à la fin d'une chaîne de caractères.",
    parameters: ['Texte'],
    example: "TRIM(FIELDSTR('Nom du produit'))"
  },
  {
    nom: 'UPPER',
    description: "Convertit une chaîne de caractères en majuscules.",
    parameters: ['Nom du champ'],
    example: "UPPER('CodePays')"
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