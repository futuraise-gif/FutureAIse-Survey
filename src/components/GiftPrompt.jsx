function GiftPrompt({ onWantGift, onNoThanks, profile }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
      <div className="w-full max-w-md text-center">
        {/* Animated Gift Box */}
        <div className="mb-8 animate-float">
          <div className="text-8xl mb-4">🎁</div>
          <div className="flex justify-center gap-2">
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0s' }}>✨</span>
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌟</span>
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
          </div>
        </div>

        {/* Message */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 border border-violet-500/30 shadow-xl shadow-violet-500/10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Great Job, {profile}!
          </h1>

          <p className="text-xl text-violet-200 mb-2">
            You finished the quiz!
          </p>

          <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 via-pink-400 to-violet-400 bg-clip-text text-transparent mb-8">
            Want a FREE Gift?
          </p>

          {/* Gift Description */}
          <div className="bg-gradient-to-r from-amber-500/20 to-pink-500/20 rounded-xl p-4 mb-8 border border-amber-500/30">
            <p className="text-amber-200 text-sm">
              🎉 Collect your special surprise at our store! 🎉
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              onClick={onWantGift}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-pink-500 to-violet-500 text-white text-xl font-bold rounded-2xl hover:from-amber-600 hover:via-pink-600 hover:to-violet-600 transition-all shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 transform"
            >
              🎁 Yes! I Want My Gift!
            </button>

            <button
              onClick={onNoThanks}
              className="w-full py-3 px-6 bg-slate-700/50 text-violet-300 font-medium rounded-xl border border-violet-500/30 hover:bg-slate-700/70 transition-all"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftPrompt;
