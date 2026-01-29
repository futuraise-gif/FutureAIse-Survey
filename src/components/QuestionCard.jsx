import { useState } from 'react';

function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  gradeInfo,
  onAnswer,
  onBack,
  selectedAnswer,
  isYesNo = false
}) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [localSelected, setLocalSelected] = useState(selectedAnswer);
  const progress = ((currentIndex) / totalQuestions) * 100;

  const handleOptionClick = (option) => {
    if (showFeedback) return;
    setLocalSelected(option.id);
    setShowFeedback(true);

    setTimeout(() => {
      onAnswer(option);
      setShowFeedback(false);
      setLocalSelected(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 relative z-10">
      {/* Header */}
      <div className="w-full max-w-2xl mx-auto mb-6">
        {/* Top bar with back button and grade info */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-violet-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-2xl">{gradeInfo.emoji}</span>
            <span className="text-violet-300 text-sm font-medium">{gradeInfo.label}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative">
          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 progress-shine" />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-violet-300/60 text-xs">Question {currentIndex + 1} of {totalQuestions}</span>
            <span className="text-violet-300/60 text-xs">{Math.round(progress)}% complete</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-violet-500/30 shadow-xl shadow-violet-500/10">
            {/* Question number badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
                {currentIndex + 1}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-transparent" />
              {isYesNo && (
                <span className="text-xs text-amber-400 bg-amber-500/20 px-2 py-1 rounded-full">
                  Yes / No
                </span>
              )}
            </div>

            {/* Question text */}
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-8 leading-relaxed">
              {question.question}
            </h2>

            {/* Options - Different layout for Yes/No */}
            {isYesNo ? (
              // Yes/No Big Buttons
              <div className="grid grid-cols-2 gap-4">
                {question.options.map((option) => {
                  const isSelected = localSelected === option.id;
                  const isYes = option.id === 'yes';

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      disabled={showFeedback}
                      className={`py-6 px-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2
                        ${isSelected
                          ? isYes
                            ? 'border-emerald-400 bg-emerald-500/30 scale-105'
                            : 'border-amber-400 bg-amber-500/30 scale-105'
                          : isYes
                            ? 'border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-400/60 hover:bg-emerald-500/20'
                            : 'border-amber-500/30 bg-amber-500/10 hover:border-amber-400/60 hover:bg-amber-500/20'
                        }
                        ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                      `}
                    >
                      <span className="text-4xl">
                        {isYes ? '👍' : '👎'}
                      </span>
                      <span className={`text-xl font-bold ${isYes ? 'text-emerald-300' : 'text-amber-300'}`}>
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              // Multiple Choice Options
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = localSelected === option.id;
                  const isCorrect = option.correct;
                  const showCorrect = showFeedback && isCorrect;
                  const showWrong = showFeedback && isSelected && !isCorrect;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      disabled={showFeedback}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-4 group
                        ${showCorrect
                          ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                          : showWrong
                            ? 'border-red-400 bg-red-500/20 text-red-100'
                            : isSelected
                              ? 'border-violet-400 bg-violet-500/20 text-white'
                              : 'border-slate-600/50 bg-slate-800/50 text-violet-100 hover:border-violet-400/60 hover:bg-violet-500/10'
                        }
                        ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      {/* Option letter */}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm shrink-0 transition-colors
                        ${showCorrect
                          ? 'bg-emerald-500 text-white'
                          : showWrong
                            ? 'bg-red-500 text-white'
                            : 'bg-slate-700/50 text-violet-300 group-hover:bg-violet-500/30'
                        }
                      `}>
                        {String.fromCharCode(65 + index)}
                      </div>

                      {/* Option text */}
                      <span className="flex-1 text-base md:text-lg">{option.text}</span>

                      {/* Feedback icon */}
                      {showCorrect && (
                        <svg className="w-6 h-6 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {showWrong && (
                        <svg className="w-6 h-6 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Fun fact feedback */}
            {showFeedback && (
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 animate-pulse">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="text-cyan-300 font-medium text-sm mb-1">Fun Fact!</p>
                    <p className="text-cyan-100/80 text-sm">{question.funFact}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
