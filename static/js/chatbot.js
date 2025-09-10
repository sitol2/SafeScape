// BFP Assistance Chatbot Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Updated selectors to match the HTML structure
    const chatInput = document.querySelector('#chatbot-window input[type="text"]');
    const sendButton = document.querySelector('#chatbot-window button:last-child'); // Select the send button specifically
    const chatMessages = document.querySelector('#chatbot-window .flex-1'); // This is correct now
    const chatbotWindow = document.getElementById('chatbot-window'); // Get the outer container
    
    // Chatbot toggle button elements
    const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    
    // Function to add a message to the chat
    function addMessage(text, isUser = false, insertAtBeginning = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = `p-3 rounded-lg max-w-xs md:max-w-md ${isUser ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`;
        messageContent.textContent = text;
        
        messageDiv.appendChild(messageContent);
        
        // Always insert messages before the quick questions container if it exists
        // Find the quick questions container in the chat messages area
        const quickQuestionsContainer = chatMessages.querySelector('.quick-questions-container');
        if (quickQuestionsContainer) {
            // Insert before the quick questions container
            chatMessages.insertBefore(messageDiv, quickQuestionsContainer);
        } else {
            // If no quick questions container, append to the end
            chatMessages.appendChild(messageDiv);
        }
        
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to handle quick question clicks
    function handleQuickQuestionClick(questionText, responseText, category) {
        // Add user question to chat
        addMessage(questionText, true);
        
        // Check if this is a navigation question
        if (category === 'navigation') {
            handleNavigationQuestion(questionText, responseText);
        } else {
            // Add bot response to chat
            setTimeout(() => {
                addMessage(responseText);
            }, 300);
        }
    }
    
    // Function to handle navigation questions
    function handleNavigationQuestion(questionText, responseText) {
        // Add bot response to chat
        setTimeout(() => {
            addMessage(responseText);
        }, 300);
        
        // Handle specific navigation actions
        if (questionText.includes('Kids Zone')) {
            // Scroll to the Kids section
            const kidsButton = document.getElementById('btn-kids');
            if (kidsButton) {
                kidsButton.click();
                // Scroll to top to show the section
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else if (questionText.includes('Fire Safety Resources')) {
            // Scroll to the Professionals section
            const professionalsButton = document.getElementById('btn-professionals');
            if (professionalsButton) {
                professionalsButton.click();
                // Scroll to top to show the section
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }
    
    // Function to create quick question buttons
    function createQuickQuestionButtons(questions) {
        // Create a container for quick questions with a specific class for identification
        const quickQuestionsContainer = document.createElement('div');
        quickQuestionsContainer.className = 'p-4 border-b border-gray-200 max-h-60 overflow-y-auto quick-questions-container';
        // Add title
        const title = document.createElement('h3');
        title.className = 'font-bold text-gray-900 mb-3';
        title.textContent = 'Quick Questions:';
        quickQuestionsContainer.appendChild(title);
        
        // Create buttons for each category
        for (const [category, questionsList] of Object.entries(questions)) {
            // Create category title
            const categoryTitle = document.createElement('h4');
            categoryTitle.className = 'font-semibold text-gray-700 mt-2 mb-1';
            categoryTitle.textContent = category;
            quickQuestionsContainer.appendChild(categoryTitle);
            
            // Create buttons for each question in the category
            questionsList.forEach(question => {
                const button = document.createElement('button');
                button.className = 'block w-full text-left p-2 mb-1 text-sm rounded hover:bg-gray-100 transition';
                button.textContent = question.question_text;
                button.addEventListener('click', () => {
                    handleQuickQuestionClick(question.question_text, question.response_text, question.category);
                });
                quickQuestionsContainer.appendChild(button);
            });
        }
        
        // Append the quick questions container at the end of the chat messages area
        // This ensures quick questions don't get overshadowed by chat messages
        chatMessages.appendChild(quickQuestionsContainer);
    }
    
    // Function to fetch quick questions from the API
    async function fetchQuickQuestions() {
        try {
            const response = await fetch('/api/quick-questions/');
            const questions = await response.json();
            createQuickQuestionButtons(questions);
        } catch (error) {
            console.error('Error fetching quick questions:', error);
            // Add a simple error message if we can't fetch questions
            const errorMessage = document.createElement('div');
            errorMessage.className = 'p-4 text-center text-gray-500';
            errorMessage.textContent = 'Having trouble loading quick questions. Type your question below.';
            // Insert the error message before any existing quick questions container if it exists
            const quickQuestionsContainer = chatMessages.querySelector('.quick-questions-container');
            if (quickQuestionsContainer) {
                chatMessages.insertBefore(errorMessage, quickQuestionsContainer);
            } else {
                // If no quick questions container, append to the end
                chatMessages.appendChild(errorMessage);
            }
        }
    }
    
    // Event listener for send button
    sendButton.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            
            // Check if the message is a greeting
            if (message.toLowerCase() === 'hi' || message.toLowerCase() === 'hello') {
                // Add personalized introduction for Berong
                setTimeout(() => {
                    addMessage("Hi there! I'm Berong, your friendly online BFP Assistant. I'm here to help answer your fire safety questions. How can I assist you today?");
                }, 300);
            } else {
                // Add standard bot response to chat
                setTimeout(() => {
                    addMessage("Thanks for your question! For more specific information, please try one of the quick questions above or contact our support team.");
                }, 300);
            }
        }
    });
    
    // Event listener for Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent any default form submission behavior
            
            const message = chatInput.value.trim();
            if (message) {
                // Check if the message is a greeting when Enter is pressed
                if (message.toLowerCase() === 'hi' || message.toLowerCase() === 'hello') {
                    addMessage(message, true);
                    chatInput.value = '';
                    // Add personalized introduction for Berong
                    setTimeout(() => {
                        addMessage("Hi there! I'm Berong, your friendly online BFP Assistant. I'm here to help answer your fire safety questions. How can I assist you today?");
                    }, 300);
                } else {
                    // For non-greeting messages, just trigger the send button
                    sendButton.click();
                }
            }
        }
    });
    
    // Fetch quick questions when the chatbot loads
    fetchQuickQuestions();
    
    // Add initial welcome message at the beginning
    addMessage("Hello! I'm your BFP Assistant. I can help answer common fire safety questions. Try clicking one of the quick questions above or type your own question below.", false, true);

    // Simplified event listener for chatbot toggle button
    if (chatbotToggleBtn && chatbotWindow) {
        chatbotToggleBtn.addEventListener('click', function() {
            chatbotWindow.classList.toggle('open');
        });
    }

    // Simplified event listener for chat close button
    if (chatCloseBtn && chatbotWindow) {
        chatCloseBtn.addEventListener('click', function() {
            chatbotWindow.classList.remove('open');
        });
    }
});
