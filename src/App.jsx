import { useState, useCallback, useMemo, useEffect } from 'react';
import StarBackground from './components/StarBackground';
import GradeSelection from './components/GradeSelection';
import AIKnowledgeCheck from './components/AIKnowledgeCheck';
import QuestionCard from './components/QuestionCard';
import GiftPrompt from './components/GiftPrompt';
import ContactForm from './components/ContactForm';
import GiftCelebration from './components/GiftCelebration';
import AdminPanel from './components/AdminPanel';
import { gradeGroups, questions, beginnerQuestions } from './data/surveyData';
import { vendors } from './data/vendorData';

const SCREENS = {
  GRADE_SELECT: 'grade_select',
  AI_CHECK: 'ai_check',
  QUIZ: 'quiz',
  GIFT_PROMPT: 'gift_prompt',
  CONTACT_FORM: 'contact_form',
  CELEBRATION: 'celebration',
  ADMIN: 'admin'
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.GRADE_SELECT);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [knowsAI, setKnowsAI] = useState(null); // true = knows AI, false = beginner
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);

  // Check for admin access via URL
  useEffect(() => {
    const checkAdmin = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin')) {
        setCurrentScreen(SCREENS.ADMIN);
      }
    };
    checkAdmin();
    window.addEventListener('hashchange', checkAdmin);
    return () => window.removeEventListener('hashchange', checkAdmin);
  }, []);

  const gradeInfo = selectedGrade
    ? gradeGroups.find(g => g.id === selectedGrade)
    : null;

  // Get questions based on whether user knows AI or is a beginner
  const currentQuestions = useMemo(() => {
    if (!selectedGrade) return [];
    if (knowsAI === true) {
      return questions[selectedGrade] || [];
    } else if (knowsAI === false) {
      return beginnerQuestions[selectedGrade] || [];
    }
    return [];
  }, [selectedGrade, knowsAI]);

  const { score, profile } = useMemo(() => {
    if (!gradeInfo || answers.length === 0) return { score: 0, profile: null };

    let correctCount = 0;
    answers.forEach(answer => {
      if (answer?.correct) correctCount++;
    });

    // Use different profiles for beginners vs AI knowledgeable
    const profileList = knowsAI ? gradeInfo.profiles : gradeInfo.beginnerProfiles;
    const matchingProfile = profileList.find(
      p => correctCount >= p.minScore && correctCount <= p.maxScore
    ) || profileList[0];

    return { score: correctCount, profile: matchingProfile };
  }, [gradeInfo, answers, knowsAI]);

  const handleSelectVendor = useCallback((vendorId) => {
    setSelectedVendor(vendorId);
  }, []);

  const handleSelectGrade = useCallback((gradeId) => {
    setSelectedGrade(gradeId);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setKnowsAI(null);
    setCurrentScreen(SCREENS.AI_CHECK);
  }, []);

  const handleKnowsAI = useCallback(() => {
    setKnowsAI(true);
    setCurrentScreen(SCREENS.QUIZ);
  }, []);

  const handleNewToAI = useCallback(() => {
    setKnowsAI(false);
    setCurrentScreen(SCREENS.QUIZ);
  }, []);

  const handleAnswer = useCallback((option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz finished - go to gift prompt
      setCurrentScreen(SCREENS.GIFT_PROMPT);
    }
  }, [answers, currentQuestionIndex, currentQuestions.length]);

  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setAnswers(prev => prev.slice(0, -1));
    } else {
      // Go back to AI check
      setCurrentScreen(SCREENS.AI_CHECK);
      setKnowsAI(null);
    }
  }, [currentQuestionIndex]);

  const handleBackToGradeSelect = useCallback(() => {
    setCurrentScreen(SCREENS.GRADE_SELECT);
    setSelectedGrade(null);
    setSelectedVendor(null);
    setKnowsAI(null);
  }, []);

  const handleWantGift = useCallback(() => {
    setCurrentScreen(SCREENS.CONTACT_FORM);
  }, []);

  const handleNoThanks = useCallback(() => {
    setCurrentScreen(SCREENS.GRADE_SELECT);
    setSelectedGrade(null);
    setSelectedVendor(null);
    setKnowsAI(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
  }, []);

  const handleContactSubmit = useCallback((info) => {
    // Save submission to localStorage
    const vendorInfo = vendors.find(v => v.id === selectedVendor);
    const submission = {
      name: info.name,
      phone: info.phone,
      email: info.email,
      grade: gradeInfo?.label || 'Unknown',
      vendor: vendorInfo?.name || 'Unknown',
      vendorId: selectedVendor || 'unknown',
      quizType: knowsAI ? 'AI Knowledge' : 'Beginner',
      score: score,
      profile: profile?.name || 'Unknown',
      timestamp: new Date().toISOString()
    };

    const existingData = JSON.parse(localStorage.getItem('futuraise_submissions') || '[]');
    existingData.push(submission);
    localStorage.setItem('futuraise_submissions', JSON.stringify(existingData));

    setContactInfo(info);
    setCurrentScreen(SCREENS.CELEBRATION);
  }, [gradeInfo, knowsAI, score, profile, selectedVendor]);

  const handleBackToGiftPrompt = useCallback(() => {
    setCurrentScreen(SCREENS.GIFT_PROMPT);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentScreen(SCREENS.GRADE_SELECT);
    setSelectedGrade(null);
    setSelectedVendor(null);
    setKnowsAI(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setContactInfo(null);
  }, []);

  const handleCloseAdmin = useCallback(() => {
    window.location.hash = '';
    setCurrentScreen(SCREENS.GRADE_SELECT);
  }, []);

  // Admin panel
  if (currentScreen === SCREENS.ADMIN) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900">
        <AdminPanel onClose={handleCloseAdmin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 text-white overflow-x-hidden">
      <StarBackground />

      {currentScreen === SCREENS.GRADE_SELECT && (
        <GradeSelection
          onSelectGrade={handleSelectGrade}
          onSelectVendor={handleSelectVendor}
        />
      )}

      {currentScreen === SCREENS.AI_CHECK && gradeInfo && (
        <AIKnowledgeCheck
          gradeInfo={gradeInfo}
          onKnowsAI={handleKnowsAI}
          onNewToAI={handleNewToAI}
          onBack={handleBackToGradeSelect}
        />
      )}

      {currentScreen === SCREENS.QUIZ && gradeInfo && currentQuestions.length > 0 && (
        <QuestionCard
          question={currentQuestions[currentQuestionIndex]}
          currentIndex={currentQuestionIndex}
          totalQuestions={currentQuestions.length}
          gradeInfo={gradeInfo}
          onAnswer={handleAnswer}
          onBack={handleBack}
          selectedAnswer={answers[currentQuestionIndex]?.id}
          isYesNo={!knowsAI}
        />
      )}

      {currentScreen === SCREENS.GIFT_PROMPT && profile && (
        <GiftPrompt
          onWantGift={handleWantGift}
          onNoThanks={handleNoThanks}
          profile={profile.name}
        />
      )}

      {currentScreen === SCREENS.CONTACT_FORM && gradeInfo && (
        <ContactForm
          onSubmit={handleContactSubmit}
          onBack={handleBackToGiftPrompt}
          gradeLabel={gradeInfo.label}
        />
      )}

      {currentScreen === SCREENS.CELEBRATION && contactInfo && (
        <GiftCelebration
          contactInfo={contactInfo}
          vendorName={vendors.find(v => v.id === selectedVendor)?.name || 'FuturAIse Store'}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
