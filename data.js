/* =============================================
   PrepPro — data.js
   All static application data in one place.
   Never mutate these arrays/objects at runtime.
   ============================================= */
'use strict';

const DSA_DATA = {
  arrays: [
    { id:'a1', title:'Introduction to Arrays | Java',            videoId:'n60Dn0UsbEk', duration:'45:22', difficulty:'beginner',    channel:'Kunal Kushwaha' },
    { id:'a2', title:'Array Manipulation & 2D Arrays',           videoId:'hOmjCMVFBYs', duration:'38:10', difficulty:'beginner',    channel:'Kunal Kushwaha' },
    { id:'a3', title:'Sliding Window & Two Pointers',            videoId:'Si0_PLJLTls', duration:'52:48', difficulty:'intermediate',channel:'Kunal Kushwaha' },
    { id:'a4', title:'Prefix Sum & Difference Array',            videoId:'pVS3yhlzrlQ', duration:'41:15', difficulty:'intermediate',channel:'Kunal Kushwaha' },
    { id:'a5', title:"Kadane's Algorithm & Maximum Subarray",    videoId:'Xq1VqGTdCLE', duration:'35:30', difficulty:'intermediate',channel:'Kunal Kushwaha' },
    { id:'a6', title:'Dutch National Flag Algorithm',            videoId:'TPdJoKzlTHg', duration:'29:45', difficulty:'advanced',    channel:'Kunal Kushwaha' },
  ],
  strings: [
    { id:'s1', title:'String Basics & StringBuilder',           videoId:'Lhef_jxzqCg', duration:'40:11', difficulty:'beginner',    channel:'Kunal Kushwaha' },
    { id:'s2', title:'Pattern Matching — KMP Algorithm',        videoId:'GTJr8OvyEVQ', duration:'56:30', difficulty:'advanced',    channel:'Kunal Kushwaha' },
    { id:'s3', title:'Anagram Detection & Frequency Maps',      videoId:'UbyhOgBN834', duration:'38:20', difficulty:'intermediate',channel:'Kunal Kushwaha' },
    { id:'s4', title:'Palindrome Checking Techniques',          videoId:'_j5VNFPPBbE', duration:'33:15', difficulty:'beginner',    channel:'Kunal Kushwaha' },
    { id:'s5', title:'Longest Common Subsequence',              videoId:'sSno9rV8Rhg', duration:'48:50', difficulty:'advanced',    channel:'Kunal Kushwaha' },
  ],
  recursion: [
    { id:'r1', title:'Recursion Basics — How Stack Works',      videoId:'M2uO2nMT0Bk', duration:'44:20', difficulty:'beginner',    channel:'Kunal Kushwaha' },
    { id:'r2', title:'Backtracking — N Queens Problem',         videoId:'YAHagGpVoqQ', duration:'58:45', difficulty:'advanced',    channel:'Kunal Kushwaha' },
    { id:'r3', title:'Subsets & Permutations Generation',       videoId:'x2RNw9s9-RE', duration:'52:00', difficulty:'intermediate',channel:'Kunal Kushwaha' },
    { id:'r4', title:'Memoization & Dynamic Programming Intro', videoId:'f2xi3c1S95M', duration:'61:30', difficulty:'advanced',    channel:'Kunal Kushwaha' },
  ],
  trees: [
    { id:'t1', title:'Binary Trees — Intro & Traversal',        videoId:'kGZoEShMcSQ', duration:'55:40', difficulty:'beginner',    channel:'Kunal Kushwaha' },
    { id:'t2', title:'Binary Search Trees — Operations',        videoId:'sz1aPf08OjI', duration:'62:15', difficulty:'intermediate',channel:'Kunal Kushwaha' },
    { id:'t3', title:'AVL Trees & Rotations',                   videoId:'jDM6_TnYIqE', duration:'48:30', difficulty:'advanced',    channel:'Kunal Kushwaha' },
    { id:'t4', title:'Heaps & Priority Queues',                 videoId:'2DmK_H7IdTo', duration:'50:20', difficulty:'intermediate',channel:'Kunal Kushwaha' },
    { id:'t5', title:'Segment Trees & Fenwick Trees',           videoId:'ZBHKZF5w4YU', duration:'58:10', difficulty:'advanced',    channel:'Kunal Kushwaha' },
  ],
  graphs: [
    { id:'g1', title:'Graph Basics — BFS & DFS',                videoId:'tWVWeAqZ0WU', duration:'68:45', difficulty:'beginner',    channel:'Kunal Kushwaha' },
    { id:'g2', title:'Shortest Path — Dijkstra Algorithm',      videoId:'V6H1qAeB-l4', duration:'55:00', difficulty:'intermediate',channel:'Kunal Kushwaha' },
    { id:'g3', title:'Min Spanning Tree — Kruskal & Prim',      videoId:'DMnDM_sxVig', duration:'60:30', difficulty:'intermediate',channel:'Kunal Kushwaha' },
    { id:'g4', title:'Topological Sort & Cycle Detection',      videoId:'cIBFEhD77b4', duration:'45:50', difficulty:'advanced',    channel:'Kunal Kushwaha' },
    { id:'g5', title:'Bellman-Ford & Floyd-Warshall',           videoId:'8RVoJMHsLAA', duration:'52:40', difficulty:'advanced',    channel:'Kunal Kushwaha' },
  ],
  dp: [
    { id:'d1', title:'Dynamic Programming — 0/1 Knapsack',      videoId:'mGfK-j9gAQA', duration:'54:25', difficulty:'intermediate',channel:'Kunal Kushwaha' },
    { id:'d2', title:'Longest Increasing Subsequence',          videoId:'on2hvxBXJH4', duration:'48:15', difficulty:'advanced',    channel:'Kunal Kushwaha' },
    { id:'d3', title:'Matrix Chain Multiplication',             videoId:'GMzVeWpyTN0', duration:'58:00', difficulty:'advanced',    channel:'Kunal Kushwaha' },
  ],
  sorting: [
    { id:'so1', title:'Sorting — Merge & Quick Sort',           videoId:'fQRQKBkUiks', duration:'62:40', difficulty:'intermediate',channel:'Kunal Kushwaha' },
    { id:'so2', title:'Heap Sort & Counting Sort',              videoId:'p5Fh3NL0bYU', duration:'44:20', difficulty:'intermediate',channel:'Kunal Kushwaha' },
  ],
  linkedlist: [
    { id:'l1', title:'Linked Lists — Creation & Traversal',     videoId:'gS4TmVwZ6Y0', duration:'41:30', difficulty:'beginner',    channel:'Kunal Kushwaha' },
    { id:'l2', title:'Doubly & Circular Linked Lists',          videoId:'r8Y_A-MYf4U', duration:'38:45', difficulty:'intermediate',channel:'Kunal Kushwaha' },
    { id:'l3', title:"Floyd's Cycle Detection Algorithm",       videoId:'a3YUTtIh9QE', duration:'35:00', difficulty:'intermediate',channel:'Kunal Kushwaha' },
  ],
};

const QUIZ_DATA = {
  quant: {
    name:'Quantitative Aptitude', icon:'🔢', color:'#00e5ff',
    questions:[
      { q:'A train 125 m long at 50 km/h — time to pass a person walking at 5 km/h in same direction?', opts:['9 sec','10 sec','11 sec','12 sec'], ans:1, exp:'Relative speed = 45 km/h = 12.5 m/s. Time = 125/12.5 = 10 s.' },
      { q:'What is 15% of 320?', opts:['42','44','46','48'], ans:3, exp:'15/100 × 320 = 48.' },
      { q:'If 8x + 6 = 30, find x.', opts:['2','3','4','5'], ans:1, exp:'8x = 24 → x = 3.' },
      { q:'A does job in 12 days, B in 15. Together, how many days?', opts:['5.5','6','6.67','7'], ans:2, exp:'Rate = 1/12+1/15 = 3/20 → 20/3 ≈ 6.67 days.' },
      { q:'CI on ₹10000 for 2 yrs at 10% p.a.?', opts:['₹2000','₹2100','₹2200','₹1900'], ans:1, exp:'10000×1.1² − 10000 = ₹2100.' },
      { q:'Perimeter of circle = 44 cm. Area? (π=22/7)', opts:['154 cm²','169 cm²','176 cm²','196 cm²'], ans:0, exp:'2πr=44 → r=7. Area = πr² = 154 cm².' },
      { q:'Sum triples in 20 years at SI. Rate?', opts:['8%','9%','10%','12%'], ans:2, exp:'SI=2P → 2P=P×R×20/100 → R=10%.' },
      { q:'Next: 2, 6, 12, 20, 30, ?', opts:['40','42','44','46'], ans:1, exp:'Diffs: 4,6,8,10,12 → 30+12=42.' },
    ],
  },
  logical: {
    name:'Logical Reasoning', icon:'🧠', color:'#7c3aed',
    questions:[
      { q:'All cats are animals. All animals are mortal. Conclusion?', opts:['All mortals are cats','All cats are mortal','No cats are mortal','Some animals not mortal'], ans:1, exp:'Cats→Animals→Mortal. Therefore all cats are mortal.' },
      { q:'Rita is 11th from left and 30th from right in a row of 40. Students between her and 30th from left?', opts:['18','19','20','21'], ans:1, exp:'11+30−40=1. Between: 19 students.' },
      { q:'"His mother is only daughter of my mother." How is she related?', opts:['Grandmother','Mother','Aunt','Sister'], ans:1, exp:'Only daughter of my mother = herself. So she is his mother.' },
      { q:'Clock shows 3:15. Angle between hands?', opts:['0°','7.5°','15°','22.5°'], ans:1, exp:'Min hand at 90°. Hour at 97.5°. Angle = 7.5°.' },
      { q:'ROSE=6821, CHAIR=73456. Code for SEARCH?', opts:['286473','214673','214732','214763'], ans:1, exp:'S=2,E=8,A=1,R=6,C=7,H=4 → 214673.' },
      { q:'In 2 yrs Ravi will be twice as old as he was 10 yrs ago. Age now?', opts:['18','20','22','24'], ans:2, exp:'x+2=2(x−10) → x=22.' },
    ],
  },
  verbal: {
    name:'Verbal Ability', icon:'📝', color:'#f472b6',
    questions:[
      { q:'Word most similar to EPHEMERAL?', opts:['Eternal','Transient','Permanent','Substantial'], ans:1, exp:'Ephemeral = lasting very briefly. Transient matches.' },
      { q:'Correctly spelled?', opts:['Accomodate','Accommodate','Acommodate','Acomodate'], ans:1, exp:'Accommodate: double C, double M.' },
      { q:'"The scientist made a ___ discovery." Best word?', opts:['mundane','trivial','monumental','insignificant'], ans:2, exp:'Monumental = of great significance.' },
      { q:'Correct subject-verb agreement?', opts:['The data shows…','The data show…','The datas shows…','The datas show…'], ans:0, exp:'"Data" used as uncountable noun → singular verb.' },
      { q:'Antonym of BENEVOLENT?', opts:['Kind','Generous','Malevolent','Charitable'], ans:2, exp:'Benevolent=kind; antonym=Malevolent.' },
    ],
  },
  technical: {
    name:'Technical MCQ', icon:'💻', color:'#10b981',
    questions:[
      { q:'Time complexity of Binary Search?', opts:['O(n)','O(log n)','O(n log n)','O(1)'], ans:1, exp:'Halves search space each step → O(log n).' },
      { q:'Which DS uses LIFO?', opts:['Queue','Stack','Tree','Graph'], ans:1, exp:'Stack = Last In First Out.' },
      { q:'Java keyword to prevent inheritance?', opts:['static','abstract','final','private'], ans:2, exp:'"final" on class prevents subclassing.' },
      { q:'What does SELECT DISTINCT do?', opts:['All rows','Unique rows only','Deletes duplicates','Sorts result'], ans:1, exp:'DISTINCT removes duplicate rows from result set.' },
      { q:'Which HTTP method is idempotent?', opts:['POST','PATCH','GET','None'], ans:2, exp:'GET: multiple calls = same result. Idempotent.' },
      { q:'Output of 5 & 3 in binary?', opts:['7','1','6','2'], ans:1, exp:'0101 & 0011 = 0001 = 1.' },
    ],
  },
};

const CODING_PROBLEMS = [
  {
    id:'p1', title:'Two Sum', difficulty:'Easy', tags:['Array','Hash Map'],
    description:'Given an array of integers and a target, return indices of the two numbers that add up to target.\n\nEach input has exactly one solution. Same element cannot be used twice.',
    examples:[{ input:'nums=[2,7,11,15], target=9', output:'[0,1]', explain:'nums[0]+nums[1]=9' }],
    starter:'// Java\npublic int[] twoSum(int[] nums, int target) {\n    // Your code here\n    \n}',
    solution:'Use a HashMap (num→index). For each number check if (target−num) exists in map.',
    sampleOutput:'Input: [2,7,11,15], target=9\nOutput: [0, 1]\n✅ O(n) time | O(n) space',
  },
  {
    id:'p2', title:'Reverse Linked List', difficulty:'Easy', tags:['Linked List','Recursion'],
    description:'Given the head of a singly linked list, reverse it and return the new head.\n\nSolve both iteratively and recursively.',
    examples:[{ input:'head=[1,2,3,4,5]', output:'[5,4,3,2,1]', explain:'Each pointer reversed' }],
    starter:'// Java\npublic ListNode reverseList(ListNode head) {\n    // Your code here\n    \n}',
    solution:'Iterative: prev=null, cur=head. Swap pointers forward each step.',
    sampleOutput:'Input: 1→2→3→4→5\nOutput: 5→4→3→2→1\n✅ O(n) time | O(1) space',
  },
  {
    id:'p3', title:'Valid Parentheses', difficulty:'Easy', tags:['Stack','String'],
    description:'Given a string of brackets (), {}, [], determine if the string is valid.\n\nOpen brackets must close in the correct order.',
    examples:[{ input:'s="()[]{}"', output:'true', explain:'Each open has matching close' }],
    starter:'// Java\npublic boolean isValid(String s) {\n    // Your code here\n    \n}',
    solution:'Push open brackets onto stack. For each close, check stack top matches.',
    sampleOutput:'Input: "({[]})" → true\nInput: "(]" → false\n✅ O(n) time | O(n) space',
  },
  {
    id:'p4', title:'Binary Search', difficulty:'Easy', tags:['Array','Binary Search'],
    description:'Given a sorted array of integers and a target, return the index. Return -1 if not found.\n\nMust be O(log n) time complexity.',
    examples:[{ input:'nums=[-1,0,3,5,9,12], target=9', output:'4', explain:'nums[4]=9' }],
    starter:'// Java\npublic int search(int[] nums, int target) {\n    // Your code here\n    \n}',
    solution:'Maintain lo/hi pointers. Check mid each iteration and halve the range.',
    sampleOutput:'Input: [-1,0,3,5,9,12], target=9\nOutput: 4\n✅ O(log n) time | O(1) space',
  },
  {
    id:'p5', title:'Merge Two Sorted Lists', difficulty:'Easy', tags:['Linked List','Recursion'],
    description:'Merge two sorted linked lists and return a single sorted list by splicing the nodes.',
    examples:[{ input:'l1=[1,2,4], l2=[1,3,4]', output:'[1,1,2,3,4,4]', explain:'All elements sorted' }],
    starter:'// Java\npublic ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n    // Your code here\n    \n}',
    solution:'Use a dummy head. Compare heads of both lists; append smaller one.',
    sampleOutput:'Input: 1→2→4  1→3→4\nOutput: 1→1→2→3→4→4\n✅ O(n+m) time | O(1) space',
  },
  {
    id:'p6', title:'Maximum Depth of Binary Tree', difficulty:'Medium', tags:['Tree','DFS','BFS'],
    description:'Given root of a binary tree, return its maximum depth (number of nodes along longest root-to-leaf path).',
    examples:[{ input:'root=[3,9,20,null,null,15,7]', output:'3', explain:'Depth is 3 via 3→20→7' }],
    starter:'// Java\npublic int maxDepth(TreeNode root) {\n    // Your code here\n    \n}',
    solution:'Recursive: return 0 if null; else 1 + max(maxDepth(left), maxDepth(right)).',
    sampleOutput:'Input: Tree with depth 3\nOutput: 3\n✅ O(n) time | O(h) space',
  },
  {
    id:'p7', title:'Number of Islands', difficulty:'Medium', tags:['Graph','DFS','BFS'],
    description:'Given a 2D grid of "1"s (land) and "0"s (water), count the number of islands.\n\nAn island is surrounded by water and formed by connecting adjacent lands horizontally/vertically.',
    examples:[{ input:'grid=[["1","1","0"],["0","1","0"],["0","0","1"]]', output:'2', explain:'Two separate land masses' }],
    starter:'// Java\npublic int numIslands(char[][] grid) {\n    // Your code here\n    \n}',
    solution:'DFS/BFS from each unvisited "1". Mark visited cells. Count DFS calls.',
    sampleOutput:'Input: 4×5 grid\nOutput: 3\n✅ O(m×n) time | O(m×n) space',
  },
];

const COMPANIES_DATA = [
  { name:'Google',     role:'SDE / L3-L5',     package:'₹20–45 LPA', difficulty:'Hard',   sector:'Tech',       color:'#4285F4', tags:['System Design','DSA Heavy','Behavioral'] },
  { name:'Microsoft',  role:'SDE 1 / SDE 2',   package:'₹18–40 LPA', difficulty:'Hard',   sector:'Tech',       color:'#00A4EF', tags:['OOP','DSA','LLD','Communication'] },
  { name:'Amazon',     role:'SDE 1',            package:'₹15–30 LPA', difficulty:'Hard',   sector:'Tech',       color:'#FF9900', tags:['Leadership Principles','DSA','System Design'] },
  { name:'Flipkart',   role:'SDE 1 / SDE 2',   package:'₹15–28 LPA', difficulty:'Hard',   sector:'Tech',       color:'#2874F0', tags:['Data Structures','Behavioral','Product Sense'] },
  { name:'Infosys',    role:'Systems Engineer', package:'₹3.6–4.5 LPA',difficulty:'Easy',  sector:'IT Services',color:'#007CC3', tags:['Aptitude','Verbal','Basic CS'] },
  { name:'TCS',        role:'Ninja / Digital',  package:'₹3.36–7 LPA', difficulty:'Easy',  sector:'IT Services',color:'#0072C6', tags:['Aptitude','Coding','English'] },
  { name:'Wipro',      role:'GET',              package:'₹3.5–6.5 LPA',difficulty:'Easy',  sector:'IT Services',color:'#341C7F', tags:['Aptitude','Technical MCQ','Group Discussion'] },
  { name:'Cognizant',  role:'Programmer Analyst',package:'₹4–6.5 LPA', difficulty:'Medium',sector:'IT Services',color:'#1A6DB1', tags:['GenC Next','DSA Basics','Communication'] },
  { name:'Paytm',      role:'SDE',              package:'₹12–20 LPA', difficulty:'Medium', sector:'Fintech',    color:'#002970', tags:['DSA','System Design','Product Understanding'] },
  { name:'Razorpay',   role:'SDE 1',            package:'₹15–25 LPA', difficulty:'Hard',   sector:'Fintech',    color:'#072654', tags:['DSA Heavy','System Design','Problem Solving'] },
  { name:'Zoho',       role:'Software Engineer',package:'₹6–12 LPA',  difficulty:'Medium', sector:'Tech',       color:'#E42527', tags:['Aptitude','Coding','Technical MCQ'] },
  { name:'Accenture',  role:'ASE',              package:'₹4–8 LPA',   difficulty:'Easy',   sector:'IT Services',color:'#A100FF', tags:['Aptitude','Verbal','Pseudocode'] },
];

const INTERVIEW_DATA = {
  hr: [
    { q:'Tell me about yourself.',               a:'Structure: Present (current role/degree) → Past (key experience) → Future (why this company). Keep it to 90 seconds. End with "I\'m excited about this opportunity because…"' },
    { q:'Why do you want to join our company?',   a:'Research their products, mission, culture. Mention specific recent news. Connect it to your goals. Avoid generic answers like "great brand".' },
    { q:'What are your greatest strengths?',      a:'Pick 2-3 that are relevant to the role. Support each with a specific, brief STAR story. End by linking the strength to the job.' },
    { q:'Where do you see yourself in 5 years?', a:'Show ambition but within the company\'s context. e.g. "I see myself leading a team building impactful products, ideally within [Company]."' },
    { q:'Why should we hire you?',               a:'Summarize your value in 3 points: technical fit, cultural fit, growth potential. Make it specific to their JD.' },
    { q:'Tell me about a challenge you faced.',  a:'Use STAR: Situation, Task, Action, Result. Pick a real one where you showed leadership or problem-solving. Quantify the outcome.' },
    { q:'Do you have any questions for us?',     a:'Always ask! Good ones: "What does success look like in 90 days?", "What\'s the team\'s biggest challenge right now?", "How is code reviewed here?"' },
  ],
  technical: [
    { q:'What is OOP? Explain all four pillars.',a:'Encapsulation (hiding state), Abstraction (hiding implementation), Inheritance (extending classes), Polymorphism (same interface, multiple behaviors). Give Java code examples.' },
    { q:'What is the difference between process and thread?', a:'Process: independent execution with its own memory. Thread: lightweight process sharing the same memory space. Threads within a process communicate faster but need synchronization.' },
    { q:'Explain DBMS ACID properties.',         a:'Atomicity (all-or-nothing), Consistency (valid state always), Isolation (concurrent txns don\'t interfere), Durability (committed data persists). Critical for relational DBs.' },
    { q:'What is a REST API? Principles?',       a:'Stateless, Client-Server, Uniform Interface (nouns+verbs), Layered System, Cacheable, Code on Demand (optional). HTTP methods map to CRUD: GET=Read, POST=Create, PUT=Update, DELETE=Delete.' },
    { q:'Difference between SQL and NoSQL?',     a:'SQL: structured, ACID, vertical scaling (MySQL, Postgres). NoSQL: flexible schema, eventual consistency, horizontal scaling (MongoDB, Cassandra, Redis). Choose based on data shape and scale.' },
    { q:'What is time and space complexity?',    a:'Time: how runtime grows with input size. Space: how memory grows. Use Big-O notation. Common: O(1)<O(log n)<O(n)<O(n log n)<O(n²)<O(2ⁿ).' },
    { q:'Explain MVC architecture.',             a:'Model (data+logic), View (UI), Controller (bridges M&V). Separates concerns. Used in Spring Boot, Django, Rails, Express. Each layer is independently testable.' },
  ],
  system: [
    { q:'Design a URL Shortener (like Bit.ly)',  a:'Requirements: shorten URL, redirect, analytics. Key components: API Gateway → Shortener Service → DB (mapping short→long) + Cache (Redis for hot URLs) + Analytics Service. Use base62 encoding for short code. Handle collisions with retry logic.' },
    { q:'Design a Notification System',          a:'Components: Notification API → Message Queue (Kafka/RabbitMQ) → Notification Workers → Push/Email/SMS services → User Preference DB. Decouple producers from consumers for scale. Handle retries and dead-letter queues.' },
    { q:'How would you design Twitter\'s feed?', a:'Fanout on Write vs Fanout on Read. For celebrities (many followers) use Pull; for regular users use Push (precompute timelines). Cache hot timelines in Redis. Eventual consistency is acceptable.' },
    { q:'What is a CDN and when do you use it?', a:'Content Delivery Network: geographically distributed servers caching static assets (images, JS, CSS). Use when you have global users, heavy static content, or need to reduce origin server load. e.g. Cloudflare, AWS CloudFront.' },
  ],
};