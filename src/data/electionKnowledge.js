export const electionProcess = [
  {
    id: 'registration',
    title: 'Voter Registration',
    shortSummary: "Register to vote and get your Voter ID card.",
    details: "First, you must be 18 years old and a citizen. In India, you submit Form 6 to the Election Commission. This can be done online via the NVSP portal or at a local Voter Registration Centre. You need age proof (like birth certificate) and address proof (like Aadhar or Passport).",
    timeline: "Usually closes a few weeks before the election date.",
    checklist: ["Check eligibility (18+ year old citizen)", "Gather age and address proof", "Submit Form 6 online or offline", "Track application status"]
  },
  {
    id: 'campaigning',
    title: 'Campaigning',
    shortSummary: "Candidates share their ideas and ask for your vote.",
    details: "Political parties and candidates hold rallies, distribute manifestos, and debate issues to convince voters. The Election Commission sets a Model Code of Conduct to ensure fair play. Campaigning must stop 48 hours before voting begins.",
    timeline: "Starts after nominations are finalized, ends 48 hours before polling.",
    checklist: ["Read party manifestos", "Attend local town halls", "Research candidate backgrounds"]
  },
  {
    id: 'voting',
    title: 'Voting Day',
    shortSummary: "Go to the polling booth and cast your vote safely.",
    details: "You visit your designated polling booth. Officials will check your name on the voter list and your ID. Your finger is marked with indelible ink. You then go to the voting compartment and press the button on the Electronic Voting Machine (EVM) for your chosen candidate.",
    timeline: "A specific day, usually from 7:00 AM to 6:00 PM.",
    checklist: ["Find your designated polling booth via the Voter Helpline app", "Carry an approved photo ID (e.g., Voter ID, Aadhar)", "Wait in line", "Cast your vote on the EVM"]
  },
  {
    id: 'counting',
    title: 'Vote Counting',
    shortSummary: "Votes are counted under strict security.",
    details: "The EVMs are opened in the presence of candidate representatives and observers. The votes are counted electronically, ensuring accuracy and speed.",
    timeline: "Usually a few days to weeks after all phases of voting are complete.",
    checklist: []
  },
  {
    id: 'results',
    title: 'Result Declaration',
    shortSummary: "The candidate with the most votes wins.",
    details: "The Election Commission officially declares the winners based on the count. In India's first-past-the-post system, the candidate with the highest number of votes in a constituency wins the seat.",
    timeline: "Announced immediately after counting is finalized.",
    checklist: []
  }
];

export const faqs = [
  {
    keywords: ['register', 'how', 'form', 'apply'],
    answer: "To register, fill out Form 6. You can do it online at voters.eci.gov.in or offline at your local Electoral Registration Office. You'll need proof of age and address."
  },
  {
    keywords: ['documents', 'id', 'proof', 'what to bring'],
    answer: "You strictly need an approved photo ID to vote. Your Voter ID (EPIC) is best, but Aadhaar, Driving License, Pan Card, or Passport are also accepted."
  },
  {
    keywords: ['where', 'booth', 'polling', 'location'],
    answer: "You can find your polling booth on the Election Commission website or by using the Voter Helpline App. Enter your EPIC number to get the details."
  },
  {
    keywords: ['eligible', 'age', 'who'],
    answer: "Any Indian citizen who is 18 years of age or older on January 1st of the year and is a resident of the polling area is eligible to vote."
  }
];

// Simple mock intent matching based on keywords
export const matchFAQ = (input) => {
  const lowerInput = input.toLowerCase();
  for (const faq of faqs) {
    // If the input contains any of the keywords associated with this FAQ
    if (faq.keywords.some(kw => lowerInput.includes(kw))) {
      return faq.answer;
    }
  }
  return null;
};
