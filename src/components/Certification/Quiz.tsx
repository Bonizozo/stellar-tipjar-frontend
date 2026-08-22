'use client';
import React, { useState } from 'react';
import { Question } from '@/lib/certification-data';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Award, ArrowRight, RotateCcw } from 'lucide-react';
import { useCertificationStore } from '@/store/useCertificationStore';
import { generateCertificate } from '@/utils/certificate';

interface QuizProps {
  questions: Question[];
  courseId: string;
  courseTitle: string;
  badgeId: string;
  onComplete: (score: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, courseId, courseTitle, badgeId, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const { completeCourse, earnBadge } = useCertificationStore();

  const handleNext = () => {
    if (selectedAnswer === questions[currentStep].correctAnswer) {
      setScore(s => s + 1);
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(s => s + 1);
      setSelectedAnswer(null);
    } else {
      const finalScore = score + (selectedAnswer === questions[currentStep].correctAnswer ? 1 : 0);
      setIsFinished(true);
      completeCourse(courseId, finalScore);
      if (finalScore === questions.length) {
        earnBadge(badgeId);
      }
      onComplete(finalScore);
    }
  };

  const handleDownload = () => {
    generateCertificate('Stellar Creator', courseTitle, new Date().toLocaleDateString());
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const passed = score >= questions.length * 0.7;
    return (
      <div className="quiz-container fade-in">
        <div style={{ textAlign: 'center' }}>
          {passed ? (
            <Award size={80} color="#00B2FF" style={{ marginBottom: '1.5rem' }} />
          ) : (
            <RotateCcw size={80} color="#FF00E5" style={{ marginBottom: '1.5rem' }} />
          )}
          <h2 className="quiz-question" style={{ marginBottom: '1rem' }}>
            {passed ? 'Congratulations!' : 'Almost there!'}
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--cert-text-muted)' }}>
            You scored {score} out of {questions.length}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn-start" onClick={resetQuiz}>
              {passed ? 'Retake to improve' : 'Try Again'}
            </button>
            {passed && (
              <button 
                className="btn-start" 
                style={{ background: 'linear-gradient(90deg, #8A2BE2, #FF00E5)' }}
                onClick={handleDownload}
              >
                Download Certificate
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-progress" style={{ width: `${progress}%` }} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <span style={{ color: 'var(--cert-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>
            QUESTION {currentStep + 1} OF {questions.length}
          </span>
          <h2 className="quiz-question">{currentQuestion.text}</h2>

          <div className="option-list">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`option-item ${selectedAnswer === index ? 'selected' : ''}`}
                onClick={() => setSelectedAnswer(index)}
              >
                <div className="option-circle">
                  {selectedAnswer === index && <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />}
                </div>
                <span>{option}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn-start"
              disabled={selectedAnswer === null}
              onClick={handleNext}
              style={{ opacity: selectedAnswer === null ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {currentStep === questions.length - 1 ? 'Finish' : 'Next Question'}
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
