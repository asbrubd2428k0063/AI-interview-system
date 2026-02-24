let questions = [];
let usedQuestions = [];
let score = 0;
let totalQuestions = 10;
let currentQuestions = [];

/* LOGIN */
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("mainPage").style.display = "block";
    } else {
        document.getElementById("loginError").innerText = "Invalid Login!";
    }
}

/* GENERATE 100 QUESTIONS */
function generateQuestions(skill) {

    questions = [];

    const baseQuestions = [
        "What is " + skill + "?",
        "Explain the importance of " + skill + ".",
        "What are the advantages of " + skill + "?",
        "What are the disadvantages of " + skill + "?",
        "How does " + skill + " work internally?",
        "Explain architecture of " + skill + ".",
        "What are real-time applications of " + skill + "?",
        "Explain security concepts in " + skill + ".",
        "What are best practices in " + skill + "?",
        "Explain performance optimization in " + skill + "."
    ];

    while (questions.length < 100) {
        baseQuestions.forEach(q => {
            if (questions.length < 100) {
                questions.push({
                    question: q,
                    keywords: [skill.toLowerCase(), "concept", "working"]
                });
            }
        });
    }
}

/* SHUFFLE */
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

/* START INTERVIEW */
function startInterview() {

    score = 0;

    const qualification = document.getElementById("qualification").value;
    const skill = document.getElementById("skill").value;

    if (!qualification || !skill) {
        alert("Please select qualification and skill");
        return;
    }

    generateQuestions(skill);

    let shuffled = shuffle(questions);

    let selected = shuffled
        .filter(q => !usedQuestions.includes(q.question))
        .slice(0, totalQuestions);

    selected.forEach(q => usedQuestions.push(q.question));

    currentQuestions = selected;

    displayQuestions(selected);
}

/* DISPLAY QUESTIONS */
function displayQuestions(qList) {

    const container = document.getElementById("questionsContainer");
    container.innerHTML = "";

    qList.forEach((q, index) => {

        container.innerHTML += `
        <div class="question-box">
            <h3>${q.question}</h3>

            <input type="text" id="textAnswer${index}" 
                   placeholder="Type your answer here" 
                   style="width:60%; padding:8px;">

            <br><br>

            <button onclick="checkTextAnswer(${index})">Submit Text</button>
            <button onclick="startVoice(${index})">🎤 Voice Answer</button>

            <p id="result${index}" style="margin-top:10px;"></p>
        </div>
        `;
    });

    container.innerHTML += `
        <button onclick="showFinalScore()" style="margin-top:20px;">Finish Interview</button>
        <div id="scoreContainer"></div>
    `;
}

/* CHECK TEXT ANSWER */
function checkTextAnswer(index) {

    let userText = document.getElementById("textAnswer" + index).value.toLowerCase();
    let keywords = currentQuestions[index].keywords;

    let matched = keywords.some(word => userText.includes(word));

    if (matched) {
        score += 10;
        document.getElementById("result" + index).innerHTML =
            "✅ Good Answer! +10 Marks";
    } else {
        document.getElementById("result" + index).innerHTML =
            "❌ Answer not sufficient.";
    }
}

/* VOICE ANSWER */
function startVoice(index) {

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();

    recognition.onresult = function (event) {

        let speech = event.results[0][0].transcript.toLowerCase();
        let keywords = currentQuestions[index].keywords;

        let matched = keywords.some(word => speech.includes(word));

        if (matched) {
            score += 10;
            document.getElementById("result" + index).innerHTML =
                "✅ Good Voice Answer! +10 Marks";
        } else {
            document.getElementById("result" + index).innerHTML =
                "❌ Voice answer not sufficient.";
        }
    };

    recognition.onerror = function () {
        alert("Voice recognition not supported in this browser.");
    };
}

/* FINAL SCORE WITH ANIMATION */
function showFinalScore() {

    let percentage = (score / (totalQuestions * 10)) * 100;

    const container = document.getElementById("scoreContainer");

    container.innerHTML = `
        <div class="score-circle">
            <div class="score-number" id="scoreNumber">0%</div>
        </div>
    `;

    let count = 0;
    let interval = setInterval(() => {
        if (count >= percentage) {
            clearInterval(interval);
        } else {
            count++;
            document.getElementById("scoreNumber").innerText = count + "%";
        }
    }, 20);
}
function generateQuestions(skill) {

    questions = [

        // ---- 100 REAL QUESTIONS ----

        { question: "What is " + skill + "?", keywords: [skill.toLowerCase(), "definition"] },
        { question: "Explain the importance of " + skill + ".", keywords: [skill.toLowerCase(), "importance"] },
        { question: "What are the advantages of " + skill + "?", keywords: ["advantages", skill.toLowerCase()] },
        { question: "What are the disadvantages of " + skill + "?", keywords: ["disadvantages"] },
        { question: "How does " + skill + " work internally?", keywords: ["working", skill.toLowerCase()] },
        { question: "What are real-time applications of " + skill + "?", keywords: ["application"] },
        { question: "Explain the architecture of " + skill + ".", keywords: ["architecture"] },
        { question: "What are key features of " + skill + "?", keywords: ["features"] },
        { question: "Compare " + skill + " with other technologies.", keywords: ["compare"] },
        { question: "What are common errors in " + skill + "?", keywords: ["errors"] },

        { question: "Explain the lifecycle in " + skill + ".", keywords: ["lifecycle"] },
        { question: "What tools are used in " + skill + "?", keywords: ["tools"] },
        { question: "What are best practices in " + skill + "?", keywords: ["practices"] },
        { question: "Explain scalability in " + skill + ".", keywords: ["scalability"] },
        { question: "What is performance optimization in " + skill + "?", keywords: ["performance"] },
        { question: "Explain security concepts in " + skill + ".", keywords: ["security"] },
        { question: "What are the latest trends in " + skill + "?", keywords: ["trends"] },
        { question: "Explain debugging in " + skill + ".", keywords: ["debugging"] },
        { question: "What are the design principles of " + skill + "?", keywords: ["design"] },
        { question: "What are the limitations of " + skill + "?", keywords: ["limitations"] },

        { question: "Explain data handling in " + skill + ".", keywords: ["data"] },
        { question: "How to improve efficiency in " + skill + "?", keywords: ["efficiency"] },
        { question: "Explain memory management in " + skill + ".", keywords: ["memory"] },
        { question: "What is modular programming in " + skill + "?", keywords: ["modular"] },
        { question: "Explain abstraction in " + skill + ".", keywords: ["abstraction"] },
        { question: "Explain encapsulation in " + skill + ".", keywords: ["encapsulation"] },
        { question: "Explain inheritance in " + skill + ".", keywords: ["inheritance"] },
        { question: "Explain polymorphism in " + skill + ".", keywords: ["polymorphism"] },
        { question: "Explain exception handling in " + skill + ".", keywords: ["exception"] },
        { question: "What are APIs in " + skill + "?", keywords: ["api"] },

        { question: "Explain client-server architecture in " + skill + ".", keywords: ["client"] },
        { question: "What is multithreading in " + skill + "?", keywords: ["thread"] },
        { question: "Explain synchronization in " + skill + ".", keywords: ["synchronization"] },
        { question: "What is cloud integration in " + skill + "?", keywords: ["cloud"] },
        { question: "Explain database connectivity in " + skill + ".", keywords: ["database"] },
        { question: "What is MVC architecture in " + skill + "?", keywords: ["mvc"] },
        { question: "Explain REST architecture in " + skill + ".", keywords: ["rest"] },
        { question: "Explain microservices in " + skill + ".", keywords: ["microservices"] },
        { question: "What is deployment process in " + skill + "?", keywords: ["deployment"] },
        { question: "Explain version control in " + skill + ".", keywords: ["version"] },

        { question: "What is testing in " + skill + "?", keywords: ["testing"] },
        { question: "Explain unit testing in " + skill + ".", keywords: ["unit"] },
        { question: "Explain integration testing in " + skill + ".", keywords: ["integration"] },
        { question: "What is CI/CD in " + skill + "?", keywords: ["ci", "cd"] },
        { question: "Explain load balancing in " + skill + ".", keywords: ["load"] },
        { question: "Explain caching in " + skill + ".", keywords: ["caching"] },
        { question: "Explain indexing in " + skill + ".", keywords: ["index"] },
        { question: "What is normalization in " + skill + "?", keywords: ["normalization"] },
        { question: "Explain authentication in " + skill + ".", keywords: ["authentication"] },
        { question: "Explain authorization in " + skill + ".", keywords: ["authorization"] },

        // Duplicate patterns to reach 100 (varied phrasing)

        { question: "Describe the workflow of " + skill + ".", keywords: ["workflow"] },
        { question: "Explain core components of " + skill + ".", keywords: ["components"] },
        { question: "How is scalability achieved in " + skill + "?", keywords: ["scalable"] },
        { question: "Explain real-time processing in " + skill + ".", keywords: ["real"] },
        { question: "What is automation in " + skill + "?", keywords: ["automation"] },
        { question: "Explain event-driven architecture in " + skill + ".", keywords: ["event"] },
        { question: "What is logging in " + skill + "?", keywords: ["logging"] },
        { question: "Explain monitoring in " + skill + ".", keywords: ["monitoring"] },
        { question: "What are frameworks in " + skill + "?", keywords: ["framework"] },
        { question: "Explain libraries used in " + skill + ".", keywords: ["library"] }

    ];

    // Repeat pattern to reach 100
    while (questions.length < 100) {
        questions.push({
            question: "Explain advanced concept of " + skill + ".",
            keywords: [skill.toLowerCase(), "advanced"]
        });
    }

    // Add simple answers
    questions = questions.map(q => ({
        ...q,
        simpleAnswer: "This is a simple explanation about " + skill + ". It covers the basic idea clearly."
    }));
}