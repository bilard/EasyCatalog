import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { generateQuiz } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { SparklesIcon } from './icons';

const Quiz: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateQuiz = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) {
            setError('Veuillez entrer un sujet pour le quiz.');
            return;
        }
        setIsLoading(true);
        setError('');
        resetQuiz();
        try {
            const quizQuestions = await generateQuiz(topic);
            setQuestions(quizQuestions);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswerChange = (questionIndex: number, answer: string) => {
        setUserAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    };

    const handleSubmit = () => {
        let newScore = 0;
        questions.forEach((q, index) => {
            if (userAnswers[index] === q.correctAnswer) {
                newScore++;
            }
        });
        setScore(newScore);
        setIsSubmitted(true);
    };

    const resetQuiz = () => {
        setQuestions([]);
        setUserAnswers({});
        setIsSubmitted(false);
        setScore(0);
    };
    
    const handleReset = () => {
        resetQuiz();
        setTopic('');
        setError('');
    }

    const getOptionClass = (questionIndex: number, option: string) => {
        if (!isSubmitted) {
            return 'border-slate-600 hover:bg-slate-700';
        }
        const correctAnswer = questions[questionIndex].correctAnswer;
        const userAnswer = userAnswers[questionIndex];

        if (option === correctAnswer) {
            return 'bg-green-500/30 border-green-500 text-white';
        }
        if (option === userAnswer && option !== correctAnswer) {
            return 'bg-red-500/30 border-red-500 text-slate-400';
        }
        return 'border-slate-600';
    };

    const getScoreMessage = () => {
        if (questions.length === 0) return '';
        const percentage = (score / questions.length) * 100;
        if (percentage === 100) return "Excellent ! Vous maîtrisez parfaitement le sujet.";
        if (percentage >= 75) return "Très bon score ! Continuez comme ça.";
        if (percentage >= 50) return "Pas mal ! Un peu de révision et ce sera parfait.";
        return "Ne vous découragez pas. Relisez les explications ci-dessous pour progresser.";
    };

    return (
        <div className="space-y-8">
            {!questions.length && (
                 <form onSubmit={handleGenerateQuiz} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 md:p-8 space-y-4 text-center">
                    <label htmlFor="topic" className="block text-lg font-medium text-slate-300 mb-2">
                        Sur quel sujet souhaitez-vous être interrogé ?
                    </label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Ex: Pagination, Tableaux, Fonctions..."
                        className="w-full max-w-md mx-auto p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                     <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors text-lg mx-auto"
                        >
                            <SparklesIcon className="w-6 h-6"/>
                            <span>{isLoading ? 'Génération...' : 'Générer le Quiz'}</span>
                        </button>
                    </div>
                </form>
            )}

            {isLoading && <LoadingSpinner />}
            {error && <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}

            {questions.length > 0 && (
                <div className="space-y-8">
                    {isSubmitted && (
                         <div className="text-center bg-slate-800 rounded-xl p-6 border border-slate-700">
                            <h2 className="text-2xl font-bold text-cyan-300">Résultats du Quiz</h2>
                            <p className="text-4xl font-extrabold text-white my-3">{score} / {questions.length}</p>
                            <p className="text-slate-400 mt-2 mb-4">{getScoreMessage()}</p>
                            <button onClick={handleReset} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-full transition-colors">
                                Nouveau Quiz
                            </button>
                        </div>
                    )}
                    {questions.map((q, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <p className="font-semibold text-lg text-slate-200 mb-4">
                                Question {index + 1}: {q.question}
                            </p>
                            <div className="space-y-3">
                                {q.options.map((option, optionIndex) => (
                                    <label key={optionIndex} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${getOptionClass(index, option)}`}>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option}
                                            checked={userAnswers[index] === option}
                                            onChange={() => handleAnswerChange(index, option)}
                                            disabled={isSubmitted}
                                            className="w-4 h-4 text-cyan-500 bg-slate-600 border-slate-500 focus:ring-cyan-600 disabled:opacity-50"
                                        />
                                        <span className="ml-3 text-slate-300">{option}</span>
                                    </label>
                                ))}
                            </div>
                             {isSubmitted && (
                                <div className="mt-4 pt-4 border-t border-slate-700/80">
                                    <p className="font-semibold text-cyan-400 text-sm mb-1">Explication</p>
                                    <p className="text-slate-300 text-sm leading-relaxed">{q.explanation}</p>
                                </div>
                            )}
                        </div>
                    ))}
                    {!isSubmitted && (
                        <div className="text-center">
                            <button
                                onClick={handleSubmit}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-full text-lg"
                                disabled={Object.keys(userAnswers).length !== questions.length}
                            >
                                Vérifier mes réponses
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;