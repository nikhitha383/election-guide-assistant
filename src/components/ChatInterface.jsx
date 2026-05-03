import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, HelpCircle, FileText, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { electionProcess, faqs, matchFAQ } from '../data/electionKnowledge';
import './ChatInterface.css';
import MockVotingJourney from './MockVotingJourney';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I am your Election Guide Assistant. I can help you understand the election process from registration to results. Are you looking for a Quick Guide, Detailed Information, or do you have a specific question?",
    }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('detailed'); // 'quick' or 'detailed'
  const [showMockVoting, setShowMockVoting] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Simple response bot logic
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let botResponse = "";

      // 1. Check for basic keywords
      if (lowerInput.includes('mock') || lowerInput.includes('simulate') || lowerInput.includes('journey')) {
        botResponse = "I can guide you through a simulated voting journey! Let's start.";
        setShowMockVoting(true);
      } else if (lowerInput.includes('process') || lowerInput.includes('steps')) {
        botResponse = "The election process has 5 main stages:\n1. Registration\n2. Campaigning\n3. Voting Day\n4. Vote Counting\n5. Results\n\nWhich stage do you want to know about?";
      } else if (lowerInput.includes('quick')) {
        setMode('quick');
        botResponse = "Switched to Quick Guide Mode. I will now give short summaries.";
      } else if (lowerInput.includes('detail')) {
        setMode('detailed');
        botResponse = "Switched to Detailed Mode. I will now give full explanations.";
      } else {
        // 2. Check for stage specific queries
        const stageMatch = electionProcess.find(stage => lowerInput.includes(stage.id) || lowerInput.includes(stage.title.toLowerCase()));
        if (stageMatch) {
          botResponse = mode === 'quick' 
            ? `**${stageMatch.title}**: ${stageMatch.shortSummary}`
            : `**${stageMatch.title}**\n\n${stageMatch.details}\n\n*Timeline*: ${stageMatch.timeline}\n*Checklist*: ${stageMatch.checklist.length > 0 ? stageMatch.checklist.join(', ') : 'None'}`;
        } else {
          // 3. Check FAQs
          const faqMatch = matchFAQ(lowerInput);
          if (faqMatch) {
            botResponse = faqMatch;
          } else {
            botResponse = "I'm not sure I understand. Could you try asking about 'registration', 'voting', 'documents needed', or ask to simulate the 'mock voting journey'?";
          }
        }
      }

      setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: botResponse }]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const renderMessageContent = (text) => {
    // Simple markdown bold parsing
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        // Handle newlines
        return <span key={index}>{part.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                {i < part.split('\n').length - 1 && <br />}
            </React.Fragment>
        ))}</span>;
    });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-title">
          <Bot size={28} className="header-icon" />
          <div>
            <h1>Election Guide Assistant</h1>
            <p>Your interactive guide to the voting process</p>
          </div>
        </div>
        <div className="mode-switcher">
          <button 
            className={`mode-btn ${mode === 'quick' ? 'active' : ''}`}
            onClick={() => setMode('quick')}
          >
            <Zap size={16} /> Quick View
          </button>
          <button 
            className={`mode-btn ${mode === 'detailed' ? 'active' : ''}`}
            onClick={() => setMode('detailed')}
          >
            <FileText size={16} /> Detailed View
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id} 
            className={`message-wrapper ${msg.sender}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="message-avatar">
              {msg.sender === 'bot' ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div className="message-bubble">
              {renderMessageContent(msg.text)}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-suggestions">
          <button onClick={() => setInput("How do I register to vote?")}>How to register?</button>
          <button onClick={() => setInput("What documents are required?")}>Documents needed?</button>
          <button onClick={() => setInput("Start mock voting journey")}>Start Mock Journey</button>
      </div>

      <div className="chat-input-area">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about elections..."
          className="chat-input"
        />
        <button onClick={handleSend} className="send-btn" disabled={!input.trim()}>
          <Send size={20} />
        </button>
      </div>

      {showMockVoting && <MockVotingJourney onClose={() => setShowMockVoting(false)} />}
    </div>
  );
}
