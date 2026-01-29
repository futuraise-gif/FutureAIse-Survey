function AIKnowledgeCheck({ gradeInfo, onKnowsAI, onNewToAI, onBack }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
      {/* Back Button */}
      <div className="w-full max-w-md mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-violet-300 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Change Grade</span>
        </button>
      </div>

      <div className="w-full max-w-md text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-float">🤖</div>
          <div className="inline-block px-4 py-1 rounded-full bg-violet-500/20 border border-violet-400/30 mb-4">
            <span className="text-violet-300 text-sm">{gradeInfo.emoji} {gradeInfo.label}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Quick Question!
          </h1>
          <p className="text-violet-200">
            Before we start...
          </p>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 border border-violet-500/30 shadow-xl shadow-violet-500/10">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Do you know what AI (Artificial Intelligence) is?
          </h2>

          <p className="text-violet-200/70 text-sm mb-8">
            Have you heard about robots, smart assistants, or computers that can think?
          </p>

          <div className="space-y-4">
            {/* Yes Button */}
            <button
              onClick={onKnowsAI}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-lg font-bold rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 flex items-center justify-center gap-3"
            >
              <span className="text-2xl">👍</span>
              <span>Yes! I know about AI</span>
            </button>

            {/* No Button */}
            <button
              onClick={onNewToAI}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-pink-500 text-white text-lg font-bold rounded-xl hover:from-amber-600 hover:to-pink-600 transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 flex items-center justify-center gap-3"
            >
              <span className="text-2xl">🤔</span>
              <span>No, I am new to this!</span>
            </button>
          </div>

          <p className="text-violet-300/50 text-xs mt-6">
            No worries! Both options lead to fun questions!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIKnowledgeCheck;
