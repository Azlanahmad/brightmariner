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
  nextSetUrl?: string | null;
}

export default function PracticeRoom({ questions, courseName, nextSetUrl }: PracticeRoomProps) {
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
          {nextSetUrl && (
            <a 
              href={nextSetUrl}
              className="w-full sm:w-auto px-8 py-3 bg-[#00A896] text-white font-medium rounded-full hover:bg-[#009685] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Next Set
            </a>
          )}
          <button 
            onClick={resetPractice}
            className="w-full sm:w-auto px-8 py-3 bg-[#171717] text-white font-medium rounded-full hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer"
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
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-hairline rounded-full mb-12 overflow-hidden">
        <div 
            className="h-full bg-[#00A896] transition-all duration-300 ease-out" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-canvas border border-hairline rounded-2xl p-8 md:p-12 shadow-sm mb-8">
        <div className="flex justify-end mb-4">
          <span className="text-sm text-mute font-medium">Question {currentIndex + 1} of {questions.length}</span>
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-ink leading-snug mb-4">
          {currentQuestion?.text}
        </h2>
        <div className="w-16 h-1 bg-[#00A896] mb-10 rounded-full" />

        <div className="space-y-3">
          {currentQuestion?.options.map((option, index) => {
            const isSelected = selectedOption === option.id;
            const isCorrectOption = option.id === currentQuestion.correctOptionId;
            const showFeedback = hasAnswered;
            const optionLetter = String.fromCharCode(65 + index);
            
            return (
              <div key={option.id} className="flex items-center gap-3 group">
                <span className={cn(
                  "w-8 h-8 rounded-full border flex items-center justify-center font-semibold text-sm shrink-0 transition-all duration-200",
                  !showFeedback && "border-[#EBEBEB] bg-[#F8F9FA] text-[#4D4D4D] group-hover:border-hairline-strong group-hover:bg-canvas-soft-2",
                  !showFeedback && isSelected && "border-primary bg-primary text-white",
                  showFeedback && isCorrectOption && "border-[#4CAF50] bg-[#4CAF50] text-white",
                  showFeedback && isSelected && !isCorrectOption && "border-[#EF4444] bg-[#EF4444] text-white",
                  showFeedback && !isSelected && !isCorrectOption && "border-[#EBEBEB] bg-[#F8F9FA] text-[#4D4D4D] opacity-75"
                )}>
                  {optionLetter}
                </span>
                <button
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={hasAnswered}
                  className={cn(
                    "flex-grow text-left p-5 rounded-xl border transition-all text-base leading-relaxed cursor-pointer",
                    !showFeedback && "border-[#EBEBEB] bg-[#F8F9FA] text-[#4D4D4D] group-hover:border-hairline-strong group-hover:bg-canvas-soft-2",
                    !showFeedback && isSelected && "border-primary bg-primary/5 shadow-sm",
                    showFeedback && isCorrectOption && "border-[#4CAF50] bg-[#E2F0D9] text-[#1B5E20] font-semibold",
                    showFeedback && isSelected && !isCorrectOption && "border-[#EF4444] bg-[#FDE8E8] text-[#9B1C1C] font-semibold",
                    showFeedback && !isSelected && !isCorrectOption && "border-[#EBEBEB] bg-[#F8F9FA] text-[#4D4D4D] opacity-75"
                  )}
                >
                  {option.text}
                </button>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <button 
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className="px-6 py-3 bg-[#1E297A] text-white text-center text-sm font-semibold rounded-lg hover:bg-[#1A237E] disabled:bg-[#1E297A]/25 disabled:text-white/50 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:cursor-not-allowed"
          >
            « Previous
          </button>
          
          <button 
            onClick={nextQuestion}
            disabled={!hasAnswered}
            className="px-6 py-3 bg-[#1E297A] text-white text-center text-sm font-semibold rounded-lg hover:bg-[#1A237E] disabled:bg-[#1E297A]/25 disabled:text-white/50 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:cursor-not-allowed"
          >
            {currentIndex === questions.length - 1 ? 'Finish »' : 'Next »'}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button 
          onClick={() => setShowExplanation(!showExplanation)}
          disabled={!hasAnswered}
          className="flex items-center gap-2 text-sm font-medium text-body hover:text-ink disabled:opacity-30 transition-colors px-4 py-2 rounded-lg hover:bg-canvas-soft-2 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
          {showExplanation ? 'Hide Explanation' : 'Explain Answer'}
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
