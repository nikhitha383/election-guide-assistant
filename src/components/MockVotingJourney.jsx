import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, UserCheck, Inbox, Award } from 'lucide-react';
import './MockVotingJourney.css';

const steps = [
  {
    id: 'verify',
    title: 'Identity Verification',
    icon: <UserCheck size={32} />,
    content: "You've arrived at the polling booth. The polling officer asks for your ID. Hand over your Voter ID or Aadhaar card.",
    action: "Show ID Card",
  },
  {
    id: 'ink',
    title: 'Inking the Finger',
    icon: <CheckCircle size={32} />,
    content: "The officer verifies your name on the electoral roll. They now apply a mark of indelible ink on your left forefinger to prevent double voting.",
    action: "Get Inked",
  },
  {
    id: 'vote',
    title: 'Casting the Vote',
    icon: <Inbox size={32} />,
    content: "You walk to the isolated polling compartment. The Electronic Voting Machine (EVM) is in front of you. Press the blue button next to the symbol of your chosen candidate.",
    action: "Press EVM Button",
  },
  {
    id: 'confirm',
    title: 'Verification (VVPAT)',
    icon: <Award size={32} />,
    content: "BEEP! A printed slip appears behind the VVPAT machine's glass for 7 seconds, showing the candidate you voted for. It drops into a sealed box. You have successfully voted!",
    action: "Finish Journey",
  }
];

export default function MockVotingJourney({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <motion.div 
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
      >
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep}
            className="step-container"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="icon-wrapper">
              {steps[currentStep].icon}
            </div>
            <h2>{steps[currentStep].title}</h2>
            <p className="step-content">{steps[currentStep].content}</p>
            
            <button className="primary-button push-button-effect" onClick={nextStep}>
              {steps[currentStep].action}
              <ArrowRight size={18} className="ml-2" />
            </button>
          </motion.div>
        </AnimatePresence>
        
        <button className="close-button" onClick={onClose}>Cancel Journey</button>
      </motion.div>
    </div>
  );
}
