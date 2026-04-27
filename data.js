
const STATES = [
  { id:"UP", name:"Uttar Pradesh", capital:"Lucknow", cm:"Yogi Adityanath", gov:"Anandiben Patel", party:"BJP", seats:403, ls:80, founded:1950, desc:"Most populous state with 403 Vidhan Sabha seats.", color:"bjp" },
  { id:"MH", name:"Maharashtra", capital:"Mumbai", cm:"Devendra Fadnavis", gov:"C.P. Radhakrishnan", party:"BJP+Shiv Sena", seats:288, ls:48, founded:1960, desc:"Financial capital of India. Bicameral legislature.", color:"bjp" },
  { id:"WB", name:"West Bengal", capital:"Kolkata", cm:"Mamata Banerjee", gov:"C.V. Ananda Bose", party:"TMC", seats:294, ls:42, founded:1947, desc:"Known for culture, literature and political vibrancy.", color:"tmc" },
  { id:"RJ", name:"Rajasthan", capital:"Jaipur", cm:"Bhajanlal Sharma", gov:"Haribhau Bagade", party:"BJP", seats:200, ls:25, founded:1949, desc:"Largest state by area, rich heritage and culture.", color:"bjp" },
  { id:"MP", name:"Madhya Pradesh", capital:"Bhopal", cm:"Mohan Yadav", gov:"Mangubhai Patel", party:"BJP", seats:230, ls:29, founded:1956, desc:"Heart of India with vast forests and tribal culture.", color:"bjp" },
  { id:"GJ", name:"Gujarat", capital:"Gandhinagar", cm:"Bhupendra Patel", gov:"Acharya Dev Vrat", party:"BJP", seats:182, ls:26, founded:1960, desc:"Vibrant economy and home of the Statue of Unity.", color:"bjp" },
  { id:"TN", name:"Tamil Nadu", capital:"Chennai", cm:"M.K. Stalin", gov:"R.N. Ravi", party:"DMK", seats:234, ls:39, founded:1950, desc:"Land of Dravidian culture, IT and automobile hub.", color:"other" },
  { id:"KA", name:"Karnataka", capital:"Bengaluru", cm:"Siddaramaiah", gov:"Thaawarchand Gehlot", party:"INC", seats:224, ls:28, founded:1956, desc:"Silicon Valley of India, diverse culture and heritage.", color:"inc" },
  { id:"KL", name:"Kerala", capital:"Thiruvananthapuram", cm:"Pinarayi Vijayan", gov:"Arif Mohammad Khan", party:"LDF/CPI(M)", seats:140, ls:20, founded:1956, desc:"Highest literacy rate, known as God's Own Country.", color:"other" },
  { id:"AP", name:"Andhra Pradesh", capital:"Amaravati", cm:"N. Chandrababu Naidu", gov:"S. Abdul Nazeer", party:"TDP", seats:175, ls:25, founded:2014, desc:"Bifurcated from Telangana in 2014, coastal state.", color:"other" },
  { id:"TS", name:"Telangana", capital:"Hyderabad", cm:"Revanth Reddy", gov:"Jishnu Dev Varma", party:"INC", seats:119, ls:17, founded:2014, desc:"Newest state formed in 2014. IT and pharma hub.", color:"inc" },
  { id:"HR", name:"Haryana", capital:"Chandigarh", cm:"Nayab Singh Saini", gov:"Bandaru Dattatraya", party:"BJP", seats:90, ls:10, founded:1966, desc:"Agricultural powerhouse and sports champion state.", color:"bjp" },
  { id:"PB", name:"Punjab", capital:"Chandigarh", cm:"Bhagwant Mann", gov:"Gulab Chand Kataria", party:"AAP", seats:117, ls:13, founded:1966, desc:"Breadbasket of India. Land of five rivers.", color:"aap" },
  { id:"BR", name:"Bihar", capital:"Patna", cm:"Nitish Kumar", gov:"Rajendra Vishwanath Arlekar", party:"JD(U)+BJP", seats:243, ls:40, founded:1912, desc:"Ancient Magadha empire. Bodhgaya is here.", color:"other" },
  { id:"OD", name:"Odisha", capital:"Bhubaneswar", cm:"Mohan Charan Majhi", gov:"Raghubar Das", party:"BJP", seats:147, ls:21, founded:1936, desc:"Temple state, rich tribal culture and coastal beauty.", color:"bjp" },
  { id:"AS", name:"Assam", capital:"Dispur", cm:"Himanta Biswa Sarma", gov:"Lakshman Prasad Acharya", party:"BJP", seats:126, ls:14, founded:1950, desc:"Gateway to Northeast India, tea and oil rich.", color:"bjp" },
  { id:"JH", name:"Jharkhand", capital:"Ranchi", cm:"Hemant Soren", gov:"Santosh Kumar Gangwar", party:"JMM+INC", seats:81, ls:14, founded:2000, desc:"Mineral rich state formed from Bihar in 2000.", color:"other" },
  { id:"CG", name:"Chhattisgarh", capital:"Raipur", cm:"Vishnu Deo Sai", gov:"Ramen Deka", party:"BJP", seats:90, ls:11, founded:2000, desc:"Formed from MP in 2000. Rich in minerals and forests.", color:"bjp" },
  { id:"UK", name:"Uttarakhand", capital:"Dehradun", cm:"Pushkar Singh Dhami", gov:"Lt. Gen. Gurmit Singh", party:"BJP", seats:70, ls:5, founded:2000, desc:"Land of Gods, Haridwar and Rishikesh.", color:"bjp" },
  { id:"HP", name:"Himachal Pradesh", capital:"Shimla", cm:"Sukhvinder Singh Sukhu", gov:"Shiv Pratap Shukla", party:"INC", seats:68, ls:4, founded:1971, desc:"Mountain state known for apple orchards and tourism.", color:"inc" },
  { id:"DL", name:"Delhi (NCT)", capital:"New Delhi", cm:"Rekha Gupta", gov:"V.K. Saxena (LG)", party:"BJP", seats:70, ls:7, founded:1992, desc:"National Capital Territory. Seat of Union Government.", color:"bjp" },
  { id:"GA", name:"Goa", capital:"Panaji", cm:"Pramod Sawant", gov:"P.S. Sreedharan Pillai", party:"BJP", seats:40, ls:2, founded:1987, desc:"Smallest state, coastal paradise and tourism hub.", color:"bjp" },
  { id:"MN", name:"Manipur", capital:"Imphal", cm:"N. Biren Singh", gov:"Ajay Kumar Bhalla", party:"BJP", seats:60, ls:2, founded:1972, desc:"Jewel of Northeast India. Rich in culture and sports.", color:"bjp" },
  { id:"MG", name:"Meghalaya", capital:"Shillong", cm:"Conrad Sangma", gov:"C.H. Vijayashankar", party:"NPP", seats:60, ls:2, founded:1972, desc:"Abode of clouds. Highest rainfall region.", color:"other" },
  { id:"TR", name:"Tripura", capital:"Agartala", cm:"Manik Saha", gov:"Indra Sena Reddy Nallu", party:"BJP", seats:60, ls:2, founded:1972, desc:"Bamboo state with rich tribal heritage.", color:"bjp" },
  { id:"NL", name:"Nagaland", capital:"Kohima", cm:"Neiphiu Rio", gov:"La. Ganesan", party:"NDPP+BJP", seats:60, ls:1, founded:1963, desc:"Land of festivals and warrior heritage.", color:"other" },
  { id:"SK", name:"Sikkim", capital:"Gangtok", cm:"Prem Singh Tamang", gov:"Om Prakash Mathur", party:"SKM", seats:32, ls:1, founded:1975, desc:"Smallest state by area, Himalayan paradise.", color:"other" },
  { id:"AR", name:"Arunachal Pradesh", capital:"Itanagar", cm:"Pema Khandu", gov:"K.T. Parnaik", party:"BJP", seats:60, ls:2, founded:1987, desc:"Rising Sun state, 26 major tribes.", color:"bjp" }
];

const UPCOMING_ELECTIONS = [
  { state:"Bihar", type:"Vidhan Sabha", date:"Late 2025", seats:243, status:"upcoming" },
  { state:"Delhi (NCT)", type:"Vidhan Sabha", date:"February 2025", seats:70, status:"announced" },
  { state:"West Bengal", type:"Vidhan Sabha", date:"2026", seats:294, status:"upcoming" },
  { state:"Assam", type:"Vidhan Sabha", date:"2026", seats:126, status:"upcoming" },
  { state:"Tamil Nadu", type:"Vidhan Sabha", date:"2026", seats:234, status:"upcoming" },
  { state:"Kerala", type:"Vidhan Sabha", date:"2026", seats:140, status:"upcoming" },
  { state:"Pondicherry", type:"Vidhan Sabha", date:"2026", seats:30, status:"upcoming" },
  { state:"Jharkhand By-polls", type:"By-elections", date:"2025", seats:3, status:"upcoming" }
];

const PROCESS_FAQS = [
  { q:"How does Voter Registration work?", a:"Any Indian citizen aged 18+ can register via Form 6 on NVSP portal (nvsp.in) or through the Voter Helpline App. You can also visit your local BLO (Booth Level Officer). After verification, your name is added to the electoral roll and you receive a Voter ID card (EPIC)." },
  { q:"What is EVM and VVPAT?", a:"EVM (Electronic Voting Machine) is a standalone device used since 1999 to record votes electronically. VVPAT (Voter Verifiable Paper Audit Trail) is attached to EVMs and shows a paper slip for 7 seconds so voters can verify their vote was recorded correctly before it drops into a sealed compartment." },
  { q:"What is the Model Code of Conduct?", a:"MCC is a set of guidelines issued by ECI the moment election dates are announced. It restricts use of government machinery for political purposes, bars announcement of new schemes by ruling party, ensures a level playing field for all parties, and guides candidate conduct during campaigning." },
  { q:"How are votes counted?", a:"Counting happens at designated counting centers on counting day. EVMs are opened round by round, constituency-wise. Each counting round is observed by agents of all candidates. Results are declared constituency-wise and uploaded to ECI website in real-time." },
  { q:"How is a government formed?", a:"The party or alliance winning majority (50%+1 seats) is invited by Governor/President to form government. The leader of that party/alliance is sworn in as CM/PM. If no majority, a coalition or minority government may be formed with confidence vote in legislature." },
  { q:"What is NOTA?", a:"NOTA (None Of The Above) is an option on EVMs introduced in 2013 by Supreme Court order. If a voter finds none of the candidates suitable, they can press NOTA. However, NOTA votes don't count toward any candidate—even if NOTA gets the most votes, the candidate with most actual votes wins." }
];

const PORTALS = [
  { icon:"🗳️", name:"Election Commission of India", desc:"Official ECI portal for election schedules, results, voter services and guidelines.", url:"https://eci.gov.in" },
  { icon:"📝", name:"NVSP – Voter Portal", desc:"Register to vote, update voter ID, find polling station, download e-EPIC card.", url:"https://nvsp.in" },
  { icon:"🏛️", name:"Parliament of India", desc:"Lok Sabha and Rajya Sabha proceedings, bills, debates and member information.", url:"https://parliament.nic.in" },
  { icon:"🇮🇳", name:"India.gov.in", desc:"National portal of India – access all government services and information.", url:"https://india.gov.in" },
  { icon:"💬", name:"MyGov India", desc:"Citizen engagement platform for participating in government initiatives.", url:"https://mygov.in" },
  { icon:"📱", name:"Voter Helpline", desc:"Dial 1950 for voter helpline. Check voter ID status and election queries.", url:"https://voterportal.eci.gov.in" },
  { icon:"📊", name:"Results.eci.gov.in", desc:"Real-time and historical election results across all states and constituencies.", url:"https://results.eci.gov.in" },
  { icon:"🏢", name:"Rajya Sabha", desc:"Council of States – official portal for Rajya Sabha sessions and members.", url:"https://rajyasabha.nic.in" }
];

const AI_KB = {
  "pm":"The Prime Minister of India is Narendra Modi (BJP), who has been in office since May 2014 and re-elected in 2019 and 2024. He leads the National Democratic Alliance (NDA) government.",
  "president":"The President of India is Droupadi Murmu, who assumed office on July 25, 2022. She is the first tribal woman to hold this constitutional position.",
  "evm":"EVM stands for Electronic Voting Machine. It has been used in Indian elections since 1999. It consists of a Ballot Unit and Control Unit. VVPAT (Voter Verifiable Paper Audit Trail) is attached to show a paper slip for 7 seconds to verify the vote.",
  "voter registration":"To register as a voter: 1) Visit nvsp.in or download Voter Helpline App. 2) Fill Form 6 with documents (Aadhaar, photo, address proof). 3) Your local BLO verifies and adds your name. 4) You receive your EPIC (Voter ID card). You must be 18+ Indian citizen.",
  "lok sabha":"Lok Sabha is the lower house of Indian Parliament with 543 elected seats. Members (MPs) are directly elected by citizens every 5 years. The party with majority forms the government and its leader becomes Prime Minister.",
  "rajya sabha":"Rajya Sabha is the upper house with 245 seats. Members are elected by state legislative assemblies, not directly by people. 1/3rd retire every 2 years. It is a permanent house and never fully dissolved.",
  "vidhan sabha":"Vidhan Sabha is the state legislative assembly. MLAs are directly elected by citizens. The party with majority forms state government, and its leader becomes Chief Minister. Terms are 5 years.",
  "mcc":"Model Code of Conduct (MCC) kicks in as soon as Election Commission announces election dates. It prohibits: new government schemes, use of public funds for political campaigns, hate speech, and ensures free & fair elections.",
  "nota":"NOTA means None Of The Above. It was introduced in 2013 after Supreme Court order. Voters unhappy with all candidates can press NOTA. But even if NOTA gets maximum votes, the candidate with most real votes wins.",
  "how elections":"Indian elections work in 6 steps: 1) Announcement by ECI and MCC begins. 2) Nomination of candidates. 3) Scrutiny & withdrawal. 4) Campaigning. 5) Voting on EVM. 6) Counting and result declaration.",
  "counting":"Vote counting happens at designated centers. EVMs are opened round by round under observation of all party agents, ECI officials, and security forces. Results are declared constituency-wise and updated live on ECI website.",
  "west bengal":"West Bengal Chief Minister is Mamata Banerjee (TMC – Trinamool Congress). Capital is Kolkata. The state has 294 Vidhan Sabha seats and 42 Lok Sabha seats. Next election is in 2026.",
  "uttar pradesh":"Uttar Pradesh CM is Yogi Adityanath (BJP). Capital is Lucknow. It is India's most populous state with 403 Vidhan Sabha seats and 80 Lok Sabha seats (highest in India).",
  "bihar":"Bihar CM is Nitish Kumar (JD-U + BJP alliance). Capital is Patna. Bihar has 243 Vidhan Sabha seats and 40 Lok Sabha seats. Bihar elections are expected in late 2025.",
  "governor":"Every Indian state has a Governor appointed by the President. The Governor is the constitutional head of the state, while the Chief Minister heads the elected government.",
  "election commission":"Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India. It was established in 1950. It is headed by the Chief Election Commissioner.",
  "constituency":"A constituency is a geographical area from which one representative is elected to Lok Sabha or Vidhan Sabha. India has 543 Lok Sabha constituencies and 4120+ Vidhan Sabha constituencies across states.",
  "mla":"MLA stands for Member of Legislative Assembly. MLAs are elected by citizens to state Vidhan Sabhas. They represent a constituency and participate in state law-making and budget approval.",
  "mp":"MP stands for Member of Parliament. MPs are elected to Lok Sabha from parliamentary constituencies. They participate in national law-making, budget debates and can ask questions to ministers.",
  "delhi":"Delhi NCT CM is Rekha Gupta (BJP) after 2025 elections. LG is V.K. Saxena. Delhi has 70 Vidhan Sabha seats and 7 Lok Sabha seats.",
  "karnataka":"Karnataka CM is Siddaramaiah (INC/Congress). Capital is Bengaluru. Karnataka has 224 Vidhan Sabha seats. Known as the Silicon Valley of India.",
  "maharashtra":"Maharashtra CM is Devendra Fadnavis (BJP + Shiv Sena alliance). Capital is Mumbai. Maharashtra has 288 Vidhan Sabha seats and 48 Lok Sabha seats.",
  "default":"I am SahyogBaba, your civic AI guide! I can help you with: Indian elections process, voter registration, EVM/VVPAT info, state CMs and ministers, Vidhan Sabha data, upcoming elections, Parliament structure, and government portals. Try asking: 'Who is the PM?' or 'How to vote?' or 'What is Lok Sabha?'"
};
