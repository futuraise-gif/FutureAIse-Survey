import { useEffect, useState } from 'react';

function GiftCelebration({ contactInfo, vendorName, onRestart }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    // Generate confetti
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      color: ['#fbbf24', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 5)]
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10 overflow-hidden">
      {/* Confetti Animation */}
      {confetti.map(c => (
        <div
          key={c.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: `${c.left}%`,
            top: '-20px',
            backgroundColor: c.color,
            animation: `confettiFall ${c.duration}s ease-in ${c.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes celebrate {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>

      <div className="w-full max-w-md text-center relative">
        {/* Big Celebration */}
        <div className="mb-6">
          <div
            className="text-8xl md:text-9xl mb-4"
            style={{ animation: 'celebrate 1s ease-in-out infinite' }}
          >
            🎉
          </div>
          <div className="flex justify-center gap-4 text-5xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎁</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🌟</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎁</span>
          </div>
        </div>

        {/* Message Card */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 border border-amber-500/50 shadow-2xl shadow-amber-500/20">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-pink-400 to-violet-400 bg-clip-text text-transparent mb-4">
            HOORAY!
          </h1>

          <h2 className="text-2xl font-bold text-white mb-2">
            Hi {contactInfo.name}!
          </h2>

          <p className="text-xl text-violet-200 mb-6">
            You have a <span className="text-amber-400 font-bold">FREE GIFT</span> waiting for you!
          </p>

          {/* Gift Box */}
          <div className="bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-violet-500/20 rounded-2xl p-6 mb-6 border-2 border-dashed border-amber-400/50">
            <div className="text-5xl mb-3">🎁</div>
            <p className="text-2xl font-bold text-white mb-2">
              Your Special Gift
            </p>
            <p className="text-amber-200">
              is ready to be collected!
            </p>
          </div>

          {/* Store Info */}
          <div className="bg-violet-500/20 rounded-xl p-4 mb-6 border border-violet-400/30">
            <p className="text-violet-200 text-lg font-medium mb-2">
              📍 Visit Us At
            </p>
            <p className="text-white font-bold text-xl">
              {vendorName}
            </p>
            <p className="text-violet-300 text-sm mt-2">
              Show this screen to collect your gift!
            </p>
          </div>

          {/* Confirmation */}
          <div className="bg-emerald-500/20 rounded-xl p-4 mb-6 border border-emerald-400/30">
            <p className="text-emerald-300 text-sm mb-2">
              ✅ We will contact you at:
            </p>
            <div className="space-y-1">
              <p className="text-white font-medium text-sm">
                📱 {contactInfo.phone}
              </p>
              <p className="text-white font-medium text-sm">
                📧 {contactInfo.email}
              </p>
            </div>
          </div>

          {/* Thank You */}
          <p className="text-violet-200/70 text-sm mb-6">
            Thank you for taking the FuturAIse AI Quiz! 🚀
          </p>

          {/* Restart Button */}
          <button
            onClick={onRestart}
            className="w-full py-3 px-6 bg-slate-700/50 text-violet-200 font-medium rounded-xl border border-violet-500/30 hover:bg-slate-700/70 transition-all"
          >
            🔄 Take Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default GiftCelebration;
