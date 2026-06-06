import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, RotateCcw, HelpCircle, Trophy } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation?: string;
  courseId: string;
}

interface PracticeRoomProps {
  questions: Question[];
  courseName: string;
}

export default function PracticeRoom({ questions, courseName }: PracticeRoomProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedOption === currentQuestion?.correctOptionId;
  const hasAnswered = currentIndex in answers;

  const handleOptionSelect = (optionId: string) => {
    if (hasAnswered) return;
    
    setSelectedOption(optionId);
    setAnswers({ ...answers, [currentIndex]: optionId });
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(answers[currentIndex + 1] || null);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(answers[currentIndex - 1] || null);
      setShowExplanation(false);
    }
  };

  const resetPractice = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
  };

  const score = Object.entries(answers).reduce((acc, [idx, optId]) => {
    return acc + (questions[parseInt(idx)].correctOptionId === optId ? 1 : 0);
  }, 0);

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-6 text-center">
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/10">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-semibold text-ink mb-4">Practice Completed!</h2>
        <p className="text-body text-lg mb-8">
          You scored <span className="text-ink font-semibold">{score}</span> out of <span className="text-ink font-semibold">{questions.length}</span> questions correctly.
        </p>
        
        <div className="bg-canvas border border-hairline rounded-xl p-8 mb-12 shadow-sm">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <div className="text-sm font-mono uppercase tracking-wider text-mute mb-1">Accuracy</div>
                    <div className="text-3xl font-semibold text-ink">{Math.round((score / questions.length) * 100)}%</div>
                </div>
                <div>
                    <div className="text-sm font-mono uppercase tracking-wider text-mute mb-1">Total Time</div>
                    <div className="text-3xl font-semibold text-ink">--:--</div>
                </div>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={resetPractice}
            className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <a href="/mcq/" className="w-full sm:w-auto px-8 py-3 bg-canvas text-ink font-medium border border-hairline rounded-full hover:bg-canvas-soft-2 transition-all">
            Choose Another Course
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-ink mb-1">{courseName}</h1>
          <p className="text-sm text-mute font-mono uppercase tracking-wider">Question {currentIndex + 1} of {questions.length}</p>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={prevQuestion}
                disabled={currentIndex === 0}
                className="p-2 text-body hover:text-ink hover:bg-canvas-soft-2 rounded-full disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
                onClick={nextQuestion}
                className="p-2 text-body hover:text-ink hover:bg-canvas-soft-2 rounded-full transition-all"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-hairline rounded-full mb-12 overflow-hidden">
        <div 
            className="h-full bg-primary transition-all duration-300 ease-out" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-canvas border border-hairline rounded-2xl p-8 md:p-12 shadow-sm mb-8">
        <h2 className="text-xl md:text-2xl font-medium text-ink leading-snug mb-10">
          {currentQuestion?.text}
        </h2>

        <div className="space-y-3">
          {currentQuestion?.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrectOption = option.id === currentQuestion.correctOptionId;
            const showFeedback = hasAnswered;
            
            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={hasAnswered}
                className={cn(
                  "w-full text-left p-5 rounded-xl border transition-all flex items-start gap-4 group",
                  !showFeedback && "border-hairline hover:border-hairline-strong hover:bg-canvas-soft-2",
                  !showFeedback && isSelected && "border-primary bg-primary/5 shadow-sm",
                  showFeedback && isCorrectOption && "border-link bg-link/5 text-link-deep",
                  showFeedback && isSelected && !isCorrectOption && "border-error bg-error/5 text-error-deep",
                  showFeedback && !isSelected && !isCorrectOption && "border-hairline opacity-60"
                )}
              >
                <span className={cn(
                    "w-6 h-6 rounded-full border flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 transition-colors",
                    !showFeedback && "border-hairline text-mute group-hover:border-hairline-strong",
                    !showFeedback && isSelected && "border-primary bg-primary text-white",
                    showFeedback && isCorrectOption && "border-link bg-link text-white",
                    showFeedback && isSelected && !isCorrectOption && "border-error bg-error text-white"
                )}>
                  {option.id}
                </span>
                <span className="text-base leading-relaxed">{option.text}</span>
                
                {showFeedback && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 ml-auto text-link shrink-0 mt-0.5" />
                )}
                {showFeedback && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 ml-auto text-error shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button 
          onClick={() => setShowExplanation(!showExplanation)}
          disabled={!hasAnswered}
          className="flex items-center gap-2 text-sm font-medium text-body hover:text-ink disabled:opacity-30 transition-colors px-4 py-2 rounded-lg hover:bg-canvas-soft-2"
        >
          <HelpCircle className="w-4 h-4" />
          {showExplanation ? 'Hide Explanation' : 'Explain Answer'}
        </button>
        
        <button 
          onClick={nextQuestion}
          disabled={!hasAnswered}
          className="px-8 py-2.5 bg-primary text-white font-medium rounded-full hover:bg-primary/90 disabled:opacity-30 disabled:hover:bg-primary transition-all shadow-lg shadow-primary/10"
        >
          {currentIndex === questions.length - 1 ? 'Finish Practice' : 'Next Question'}
        </button>
      </div>

      {showExplanation && (
        <div className="mt-8 p-6 bg-canvas-soft-2 border border-hairline rounded-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <h4 className="text-sm font-mono uppercase tracking-wider text-ink mb-3">Explanation</h4>
          <p className="text-body text-sm leading-relaxed">
            {currentQuestion.explanation || "Correct Answer is option " + currentQuestion.correctOptionId + ". This question is frequently asked in the DG Shipping exit exam."}
          </p>
        </div>
      )}
    </div>
  );
}
