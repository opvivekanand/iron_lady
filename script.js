// AI Knowledge Base for Iron Lady
const knowledgeBase = {
    programs: {
        "strength_training": {
            name: "💪 Strength Training Program",
            description: "Build lean muscle and increase your strength with our progressive training program.",
            duration: "12 weeks",
            level: "Beginner to Advanced",
            price: "₹7,999/month",
            features: ["Personalized workout plans", "Form correction videos", "Weekly progress tracking", "Community support"]
        },
        "cardio_intensive": {
            name: "🏃 Cardio Intensive",
            description: "High-energy cardio program designed to boost endurance and burn calories effectively.",
            duration: "8 weeks",
            level: "Beginner to Intermediate",
            price: "₹5,999/month",
            features: ["HIIT workouts", "Heart rate monitoring", "Nutrition guidance", "Real-time coaching"]
        },
        "pilates_yoga": {
            name: "🧘 Pilates & Yoga Fusion",
            description: "Improve flexibility, core strength, and mental wellness through mindful movement.",
            duration: "10 weeks",
            level: "All Levels",
            price: "₹5,499/month",
            features: ["Live classes", "Flexibility training", "Stress relief techniques", "Meditation guides"]
        },
        "transformation": {
            name: "🔥 30-Day Transformation",
            description: "Complete body transformation program combining strength, cardio, and nutrition.",
            duration: "30 days",
            level: "Intermediate",
            price: "₹9,999/month",
            features: ["Meal plans", "Workout videos", "Daily coaching", "Results guarantee"]
        }
    },
    
    goals: {
        "weight_loss": "Weight Loss & Toning",
        "muscle_gain": "Muscle Building & Strength",
        "endurance": "Endurance & Stamina",
        "flexibility": "Flexibility & Mobility",
        "general_fitness": "General Fitness & Health",
        "confidence": "Build Confidence & Empowerment"
    },

    levels: {
        "beginner": "Just starting your fitness journey",
        "intermediate": "Have some workout experience",
        "advanced": "Regular exerciser looking to level up"
    }
};

// Conversation state
let conversationState = {
    userGoal: null,
    userLevel: null,
    userName: null,
    recommendedProgram: null
};

// Get DOM elements
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');

// Handle sending messages
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Display user message
    addMessage(message, 'user');
    userInput.value = '';

    // Simulate typing indicator
    showTypingIndicator();

    // Process message and get response
    setTimeout(() => {
        removeTypingIndicator();
        const response = processMessage(message);
        addMessage(response.text, 'bot', response.actions);
    }, 800 + Math.random() * 400);
}

// Add message to chat
function addMessage(text, sender, actions = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    if (sender === 'bot') {
        contentDiv.innerHTML = text;
    } else {
        contentDiv.textContent = text;
    }

    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);

    // Add action buttons if provided
    if (actions && actions.length > 0) {
        const actionsDiv = document.createElement('div');
        actionsDiv.style.marginTop = '10px';
        actionsDiv.style.display = 'flex';
        actionsDiv.style.gap = '10px';
        actionsDiv.style.flexWrap = 'wrap';

        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'quick-btn';
            btn.textContent = action.label;
            btn.onclick = action.callback;
            actionsDiv.appendChild(btn);
        });

        contentDiv.appendChild(actionsDiv);
    }

    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.id = 'typingIndicator';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = '<div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';

    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

// Main message processing with AI logic
function processMessage(message) {
    const lowerMessage = message.toLowerCase();

    // Greeting patterns
    if (matchPattern(lowerMessage, ['hello', 'hi', 'hey', 'greetings'])) {
        return {
            text: `<p>👋 <strong>Hey there!</strong></p><p>Welcome to Iron Lady! I'm thrilled to meet you. I'm here to help you find the perfect program for your fitness journey. </p><p><strong>To get started, tell me:</strong> What's your main fitness goal?</p>`,
            actions: createGoalActions()
        };
    }

    // Program inquiry
    if (matchPattern(lowerMessage, ['program', 'programs', 'courses', 'training', 'what do you offer'])) {
        return {
            text: `<p>🎯 <strong>Great question!</strong> We offer four amazing programs:</p>${formatPrograms()}`,
            actions: []
        };
    }

    // Pricing inquiry
    if (matchPattern(lowerMessage, ['price', 'pricing', 'cost', 'how much', 'money', 'expensive'])) {
        return {
            text: `<p>💰 <strong>Our Pricing:</strong></p>
            <ul style="margin-left: 20px; margin-top: 10px;">
            <li><strong>Cardio Intensive:</strong> ₹5,999/month - Perfect for beginners</li>
            <li><strong>Pilates & Yoga:</strong> ₹5,499/month - Great for flexibility</li>
            <li><strong>Strength Training:</strong> ₹7,999/month - Build muscle fast</li>
            <li><strong>30-Day Transformation:</strong> ₹9,999/month - Ultimate results</li>
            </ul>
            <p style="margin-top: 15px;">✨ <strong>Special offer:</strong> First month 30% off!</p>`,
            actions: []
        };
    }

    // Beginner-friendly
    if (matchPattern(lowerMessage, ['beginner', 'start', 'new', 'first time', 'easy'])) {
        return {
            text: `<p>🌟 <strong>Perfect for beginners!</strong></p>
            <p>I'd recommend starting with:</p>
            <p><strong>Pilates & Yoga Fusion (₹5,499/month)</strong> - Gentle, builds foundation, great for confidence</p>
            <p style="margin-top: 10px;">Or if you want more intensity:</p>
            <p><strong>Cardio Intensive (₹5,999/month)</strong> - Fun, energetic, sees quick results</p>
            <p style="margin-top: 15px;">Both include personalized guidance and community support. Which interests you more?</p>`,
            actions: [
                { label: 'Tell me about Pilates & Yoga', callback: () => setInput('Tell me more about Pilates & Yoga') },
                { label: 'Tell me about Cardio', callback: () => setInput('Tell me more about Cardio Intensive') }
            ]
        };
    }

    // Weight loss focus
    if (matchPattern(lowerMessage, ['weight loss', 'lose weight', 'fat', 'slim', 'thin'])) {
        conversationState.userGoal = 'weight_loss';
        return {
            text: `<p>🔥 <strong>Weight Loss Goal - Excellent Choice!</strong></p>
            <p>For weight loss, I recommend:</p>
            <p><strong>30-Day Transformation</strong> - Combines cardio, strength, and nutrition for maximum results</p>
            <p>Or <strong>Cardio Intensive</strong> - High-energy workouts that torch calories fast</p>
            <p style="margin-top: 15px;">What's your current fitness level?</p>`,
            actions: createLevelActions()
        };
    }

    // Muscle gain focus
    if (matchPattern(lowerMessage, ['muscle', 'strength', 'build', 'strong', 'tone'])) {
        conversationState.userGoal = 'muscle_gain';
        return {
            text: `<p>💪 <strong>Muscle Building - I Love Your Energy!</strong></p>
            <p>For building strength and muscle, our <strong>Strength Training Program</strong> is perfect:</p>
            <p>✓ Progressive resistance training<br>✓ Form correction videos<br>✓ Weekly progress tracking<br>✓ 12-week transformation</p>
            <p style="margin-top: 15px;"><strong>₹7,999/month</strong> - First month 30% off!</p>
            <p>Ready to join?</p>`,
            actions: [
                { label: 'Enroll Now', callback: () => setInput('I want to enroll') },
                { label: 'Ask More Questions', callback: () => setInput('Tell me more about the training') }
            ]
        };
    }

    // Flexibility/wellness
    if (matchPattern(lowerMessage, ['flexible', 'yoga', 'stress', 'relax', 'peace', 'mindful'])) {
        return {
            text: `<p>🧘 <strong>Wellness & Mindfulness - Beautiful Choice!</strong></p>
            <p>Our <strong>Pilates & Yoga Fusion</strong> is exactly what you need:</p>
            <p>✓ Improve flexibility and core strength<br>✓ Reduce stress and anxiety<br>✓ Meditation and breathing techniques<br>✓ Live community classes</p>
            <p style="margin-top: 15px;"><strong>₹5,499/month</strong> - All levels welcome!</p>
            <p>Would you like to start?</p>`,
            actions: [
                { label: 'Start Pilates & Yoga', callback: () => setInput('I want to join Pilates & Yoga') },
                { label: 'Compare with other programs', callback: () => setInput('Show me all programs') }
            ]
        };
    }

    // Enrollment/commitment
    if (matchPattern(lowerMessage, ['enroll', 'join', 'sign up', 'start', 'purchase', 'buy'])) {
        return {
            text: `<p>🎉 <strong>Welcome to the Iron Lady Family!</strong></p>
            <p>That's awesome! Here's what's next:</p>
            <p style="margin-top: 10px;">1️⃣ <strong>Create Your Account</strong> - Takes just 2 minutes<br>
            2️⃣ <strong>Choose Your Program</strong> - Pick your favorite<br>
            3️⃣ <strong>Get Started</strong> - Your first workout is today!<br>
            4️⃣ <strong>Join Our Community</strong> - Connect with other Iron Ladies</p>
            <p style="margin-top: 15px;">✨ Your first month is <strong>30% off!</strong></p>
            <p>I'm so excited for your journey! Do you have any questions before we start?</p>`,
            actions: [
                { label: 'I have questions', callback: () => setInput('I have some questions') },
                { label: 'Ready to go!', callback: () => setInput('Let me create an account') }
            ]
        };
    }

    // Motivation/encouragement
    if (matchPattern(lowerMessage, ['motivation', 'inspire', 'encourage', 'support', 'help', 'scared', 'nervous'])) {
        return {
            text: `<p>💖 <strong>Listen, you've got this!</strong></p>
            <p>The fact that you're here means you're ready for change. That takes courage!</p>
            <p style="margin-top: 10px;"><strong>Here's what makes Iron Lady different:</strong></p>
            <p>👥 <strong>Community</strong> - You'll never be alone. Connect with thousands of inspiring women<br>
            🎯 <strong>Personalization</strong> - Every program adapts to YOUR goals<br>
            💪 <strong>Expert Guidance</strong> - Our coaches are with you every step<br>
            ⚡ <strong>Results</strong> - Our members see real transformation in 30 days</p>
            <p style="margin-top: 15px;">You're stronger than you think. Let's prove it together! 💪</p>`,
            actions: [
                { label: 'Show me programs', callback: () => setInput('What programs are available?') },
                { label: 'I want to start', callback: () => setInput('I want to join') }
            ]
        };
    }

    // Contact/support
    if (matchPattern(lowerMessage, ['contact', 'support', 'help', 'email', 'call'])) {
        return {
            text: `<p>📞 <strong>We're Here for You!</strong></p>
            <p><strong>Contact Iron Lady Support:</strong></p>
            <p>📧 Email: support@ironlady.com<br>
            📱 WhatsApp: +1 (555) 123-4567<br>
            💬 Live Chat: Available 24/7 in the app<br>
            📍 Headquarters: Fitness District, Metro City</p>
            <p style="margin-top: 15px;">Average response time: <strong>5 minutes</strong></p>
            <p>How can I help you today?</p>`,
            actions: []
        };
    }

    // Default response with suggestions
    return {
        text: `<p>💭 <strong>Interesting question!</strong></p>
        <p>I'm still learning, but I'd love to help you in these areas:</p>
        <p style="margin-top: 10px;">• Our fitness programs and courses<br>
        • Choosing the right program for your goals<br>
        • Pricing and membership details<br>
        • Success stories from our community<br>
        • How to get started</p>
        <p style="margin-top: 15px;">What would you like to know?</p>`,
        actions: []
    };
}

// Helper function to match patterns
function matchPattern(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
}

// Format programs for display
function formatPrograms() {
    let html = '<div style="margin-top: 10px;">';
    for (const [key, program] of Object.entries(knowledgeBase.programs)) {
        html += `<p><strong>${program.name}</strong><br>
        ${program.description}<br>
        Duration: ${program.duration} | Level: ${program.level} | ${program.price}</p>`;
    }
    html += '</div>';
    return html;
}

// Create goal action buttons
function createGoalActions() {
    return [
        { label: '⚖️ Weight Loss', callback: () => setInput('I want to lose weight') },
        { label: '💪 Build Muscle', callback: () => setInput('I want to build muscle') },
        { label: '🧘 Flexibility', callback: () => setInput('I want to be more flexible') },
        { label: '⚡ General Fitness', callback: () => setInput('I want to get fit') }
    ];
}

// Create level action buttons
function createLevelActions() {
    return [
        { label: 'Beginner', callback: () => setInput('I am a beginner') },
        { label: 'Intermediate', callback: () => setInput('I have some experience') },
        { label: 'Advanced', callback: () => setInput('I am advanced') }
    ];
}

// Handle quick actions from the initial message
function handleQuickAction(action) {
    const actions = {
        'explore_programs': 'What programs do you offer?',
        'fitness_goals': 'How do I choose the right program for my goals?',
        'services_pricing': 'What are your prices?',
        'success_stories': 'Show me success stories'
    };
    setInput(actions[action]);
}

// Set input and send
function setInput(text) {
    userInput.value = text;
    userInput.focus();
    setTimeout(sendMessage, 100);
}

// Allow Enter key to send
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Auto-focus input on load
window.addEventListener('load', () => {
    userInput.focus();
});
