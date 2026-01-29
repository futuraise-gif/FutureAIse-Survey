import { useState } from 'react';
import { gradeGroups } from '../data/surveyData';
import { vendors } from '../data/vendorData';
import logo from '../assets/FuturAIse.png';

function GradeSelection({ onSelectGrade, onSelectVendor }) {
  const [selectedGrade, setSelectedGrade] = useState('');
  // Auto-select the only vendor
  const defaultVendor = vendors[0].id;

  const handleStartQuiz = () => {
    if (selectedGrade) {
      onSelectVendor(defaultVendor);
      onSelectGrade(selectedGrade);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
      {/* Logo and Header */}
      <div className="text-center mb-12 animate-float">
        <div className="flex flex-col items-center gap-2 -mb-28">
          <img
            src={logo}
            alt="FuturAIse Logo"
            className="w-[500px] h-auto max-w-full object-contain"
          />
        </div>
        <p className="text-violet-200 text-lg md:text-xl max-w-md mx-auto">
          Discover Your AI Superpower!
        </p>
        <p className="text-violet-300/70 text-sm mt-2">
          Take this fun quiz to find your AI learning path
        </p>
      </div>

      {/* Grade Selection Dropdown */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-violet-500/30 shadow-xl shadow-violet-500/20">
          <h2 className="text-center text-white text-xl font-semibold mb-6">
            Select Your Grade Level
          </h2>

          {/* Grade Dropdown */}
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="w-full px-4 py-4 bg-slate-900/90 border border-violet-500/40 rounded-xl text-white text-lg focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/50 transition-all mb-6 cursor-pointer"
          >
            <option value="" disabled>Choose your grade...</option>
            {gradeGroups.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.emoji} {grade.label} - {grade.title}
              </option>
            ))}
          </select>

          {/* Start Button */}
          <button
            onClick={handleStartQuiz}
            disabled={!selectedGrade}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              selectedGrade
                ? 'bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white shadow-lg shadow-violet-500/50 hover:shadow-xl hover:shadow-violet-500/60 hover:scale-105'
                : 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
            }`}
          >
            {selectedGrade ? 'Start Quiz 🚀' : 'Select a grade to start'}
          </button>
        </div>

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="text-violet-300/50 text-sm">
            5 questions • Fun learning profiles • Download your report
          </p>
        </div>
      </div>
    </div>
  );
}

export default GradeSelection;
