import React, { useState, useCallback, useEffect } from 'react';
import { generateTutorial, generateQCM, correctQuery, elaborateOnTopic, generatePaletteImage } from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';
import TutorialDisplay from './components/TutorialDisplay';
import Customizer from './components/Customizer';
import Quiz from './components/QCM';
import { TarotApp } from './components/tarot/TarotApp';
import { SearchIcon, SparklesIcon, HomeIcon, CodeIcon, QuizIcon, TarotIcon } from './components/icons';

type View = 'search' | 'customizer' | 'quiz' | 'tarot';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('search');
  const [animationClass, setAnimationClass] = useState('opacity-100');
  const [query, setQuery] = useState('');
  const [suggestedQuery, setSuggestedQuery] = useState('');
  const [tutorial, setTutorial] = useState('');
  const [qcm, setQcm] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [elaboratedContent, setElaboratedContent] = useState('');
  const [isElaborating, setIsElaborating] = useState(false);
  const [paletteImage, setPaletteImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [customizerVersion, setCustomizerVersion] = useState(0);
  
  useEffect(() => {
    if (query.trim().length < 5) {
      setSuggestedQuery('');
      return;
    }

    const handler = setTimeout(async () => {
      const corrected = await correctQuery(query);
      if (corrected && corrected.toLowerCase() !== query.toLowerCase()) {
        setSuggestedQuery(corrected);
      } else {
        setSuggestedQuery('');
      }
    }, 500); // Debounce de 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [query]);
  
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Incrémente la version pour forcer la réinitialisation de l'atelier de formule
    setCustomizerVersion(v => v + 1);

    setIsLoading(true);
    setError('');
    setTutorial('');
    setQcm([]);
    setSuggestedQuery('');
    setElaboratedContent('');
    setPaletteImage(null);

    try {
      const [tutorialResult, qcmResult] = await Promise.all([
        generateTutorial(searchQuery),
        generateQCM(searchQuery)
      ]);
      
      if (tutorialResult.toLowerCase().includes("désolé, une erreur")) {
        setError(tutorialResult);
      } else {
        setTutorial(tutorialResult);
      }
      setQcm(qcmResult);

      if (tutorialResult && !tutorialResult.toLowerCase().includes("désolé, une erreur")) {
        setIsGeneratingImage(true);
        try {
            const titleMatch = tutorialResult.match(/^#\s*(.*)/m);
            const topic = titleMatch ? titleMatch[1] : searchQuery;
            if (topic) {
                const imageUrl = await generatePaletteImage(topic);
                setPaletteImage(imageUrl);
            }
        } catch (imgErr) {
            console.error("Erreur lors de la génération de l'image de la palette:", imgErr);
            setPaletteImage(null);
        } finally {
            setIsGeneratingImage(false);
        }
      }

    } catch (err) {
      setError("Une erreur critique est survenue. Vérifiez la console pour plus de détails.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleElaborate = useCallback(async () => {
    if (!tutorial) return;

    setIsElaborating(true);
    setElaboratedContent('');
    setError('');

    try {
        const result = await elaborateOnTopic(tutorial);
        if (result.toLowerCase().includes("désolé, une erreur")) {
            setError(result);
        } else {
            setElaboratedContent(result);
        }
    } catch (err) {
        setError("Une erreur est survenue lors de la génération des explications.");
        console.error(err);
    } finally {
        setIsElaborating(false);
    }
  }, [tutorial]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };
  
  const handleQcmClick = (question: string) => {
    setQuery(question);
    handleSearch(question);
  }
  
  const handleSuggestionClick = () => {
      setQuery(suggestedQuery);
      handleSearch(suggestedQuery);
  };

  const handleViewChange = (view: View) => {
    if (view === activeView) return;

    setCustomizerVersion(v => v + 1); // Reset on every view change

    setAnimationClass('opacity-0'); // Démarre le fondu sortant

    setTimeout(() => {
      setActiveView(view);
      setAnimationClass('opacity-100'); // Déclenche le fondu entrant
    }, 250); // Cette durée permet au fondu sortant de se terminer
  };

  const NavButton = ({ view, label, icon }: { view: View, label: string, icon: React.ReactElement<{ className?: string }> }) => (
    <button
      onClick={() => handleViewChange(view)}
      className={`flex items-center w-full text-left p-3 rounded-lg transition-colors ${
        activeView === view
          ? 'bg-cyan-500/20 text-cyan-300'
          : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
      }`}
    >
      {React.cloneElement(icon, { className: "w-6 h-6 mr-3 flex-shrink-0" })}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="h-screen bg-slate-900 text-slate-100 font-sans flex flex-col md:flex-row">
      <nav className="w-full md:w-64 bg-slate-800 p-4 border-b md:border-b-0 md:border-r border-slate-700 flex-shrink-0">
        <div className="mb-8 text-center hidden md:block">
           <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              EasyCatalog
           </h1>
           <span className="text-xs text-slate-500">Guide Interactif</span>
        </div>
        <ul className="space-y-2">
          <li>
            <NavButton view="search" label="Recherche" icon={<HomeIcon />} />
          </li>
          <li>
            <NavButton view="customizer" label="Personnalisation" icon={<CodeIcon />} />
          </li>
          <li>
            <NavButton view="quiz" label="Quiz" icon={<QuizIcon />} />
          </li>
          <li>
            <NavButton view="tarot" label="Tarot Mystique" icon={<TarotIcon />} />
          </li>
        </ul>
      </nav>

      <main className={`flex-1 ${activeView === 'tarot' ? 'p-0' : 'p-4 md:p-8'} overflow-y-auto`}>
        <div className={`mx-auto ${activeView === 'tarot' ? 'w-full h-full' : activeView === 'customizer' ? 'w-[95%] max-w-screen-xl' : 'max-w-4xl'}`}>
          <div className={`transition-opacity duration-200 ease-in-out ${animationClass}`}>
            {activeView === 'search' && (
              <>
                <header className="text-center mb-10">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Assistant de recherche
                  </h1>
                  <p className="mt-4 text-lg text-slate-400">
                    Votre assistant IA pour maîtriser EasyCatalog. Posez une question en langage naturel.
                  </p>
                </header>

                <form onSubmit={handleFormSubmit} className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Comment puis-je importer des données depuis un fichier Excel ?"
                    className="w-full p-4 pl-12 bg-slate-800 border-2 border-slate-700 rounded-full text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                  />
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500" />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2 transition-colors"
                  >
                    <SparklesIcon className="w-5 h-5"/>
                    <span>{isLoading ? 'Recherche...' : 'Rechercher'}</span>
                  </button>
                </form>

                {suggestedQuery && !isLoading && (
                  <div className="text-center mt-3 text-sm">
                    <span className="text-slate-400">Vouliez-vous dire : </span>
                    <button onClick={handleSuggestionClick} className="text-cyan-400 hover:text-cyan-300 underline font-semibold">
                      {suggestedQuery}
                    </button>
                  </div>
                )}
                
                {qcm.length > 0 && !isLoading && (
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {qcm.map((q, index) => (
                            <button 
                                key={index}
                                onClick={() => handleQcmClick(q)}
                                className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm py-1 px-3 rounded-full transition-colors"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                {isLoading && <LoadingSpinner />}
                {error && <div className="mt-8 text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
                
                <TutorialDisplay 
                  content={tutorial}
                  elaboratedContent={elaboratedContent}
                  onElaborate={handleElaborate}
                  isElaborating={isElaborating}
                  paletteImage={paletteImage}
                  isGeneratingImage={isGeneratingImage}
                />
              </>
            )}

            {activeView === 'customizer' && (
              <>
                <header className="mb-10">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Personnalisation de Script
                  </h1>
                  <p className="mt-4 text-lg text-slate-400">
                    Générez des formules de champs personnalisés pour vos besoins spécifiques à l'aide de l'IA.
                  </p>
                </header>
                <Customizer key={customizerVersion} />
              </>
            )}
            
             {activeView === 'quiz' && (
              <>
                <header className="mb-10">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Quiz Interactif
                  </h1>
                  <p className="mt-4 text-lg text-slate-400">
                    Testez vos connaissances sur un sujet spécifique d'EasyCatalog.
                  </p>
                </header>
                <Quiz />
              </>
            )}

            {activeView === 'tarot' && (
              <TarotApp />
            )}
          </div>

          {activeView !== 'tarot' && (
            <footer className="text-center mt-12 pb-8 text-slate-500 text-sm">
              <p>Développé avec React, Tailwind CSS, et l'API Gemini.</p>
            </footer>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;