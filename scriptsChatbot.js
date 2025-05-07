document.addEventListener("DOMContentLoaded", function() {
    const chatbotButton = document.getElementById("chatbotButton");
    const chatbotContainer = document.getElementById("chatbotContainer");
    const closeChatbot = document.getElementById("closeChatbot");
    const chatbotMessages = document.getElementById("chatbotMessages");
    const chatbotInput = document.getElementById("chatbotInput");
    const sendMessageBtn = document.getElementById("sendMessage");
    
    // Preguntas frecuentes y respuestas
    const faqs = [
        {
            question: "compra entradas",
            answer: "Puedes comprar entradas seleccionando una película en cartelera, eligiendo día, horario y butacas, luego completando el pago."
        },
        {
            question: "metodos de pago",
            answer: "Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), Mercado Pago , PayPal , etc."
        },
        {
            question: "cancelar reserva",
            answer: "Las entradas pueden cancelarse hasta 2 horas antes de la función. Contacta con nuestro servicio al cliente."
        },
        {
            question: "descuentos",
            answer: "Ofrecemos descuentos los dias Lunes , Martes , Miercoles, 2x1 en Entradas."
        }
    ];
    
    // Abrir/cerrar chatbot
    chatbotButton.addEventListener("click", function() {
        chatbotContainer.style.display = "flex";
        addBotMessage("¡Hola! Soy el asistente virtual de Cine Belgrano. ¿En qué puedo ayudarte?");
    });
    
    closeChatbot.addEventListener("click", function() {
        chatbotContainer.style.display = "none";
    });
    
    // Enviar mensaje al presionar Enter
    chatbotInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
    
    // Enviar mensaje al hacer clic en el botón
    sendMessageBtn.addEventListener("click", sendMessage);
    
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message !== "") {
            addUserMessage(message);
            chatbotInput.value = "";
            setTimeout(() => respondToMessage(message), 1000);
        }
    }
    
    function addUserMessage(text) {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message user-message";
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    function addBotMessage(text) {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message bot-message";
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function respondToMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = "";
        
        // Buscar en FAQs
        const faqMatch = faqs.find(faq => 
            lowerMessage.includes(faq.question.toLowerCase().substring(0, 10)) || 
            faq.question.toLowerCase().includes(lowerMessage.substring(0, 10))
        );
        
        if (faqMatch) {
            response = faqMatch.answer;
        } else if (lowerMessage.includes("hola") || lowerMessage.includes("buenos días") || lowerMessage.includes("buenas tardes")) {
            response = "¡Hola! ¿En qué puedo ayudarte hoy?";
        } else if (lowerMessage.includes("gracias") || lowerMessage.includes("agradecido")) {
            response = "¡De nada! ¿Hay algo más en lo que pueda ayudarte?";
        } else if (lowerMessage.includes("horario") || lowerMessage.includes("funciones")) {
            response = "Los horarios de funciones varían por película. Por favor revisa la página de detalles de la película que te interesa.";
        } else if (lowerMessage.includes("precio") || lowerMessage.includes("cuesta")) {
            response = "El precio de las entradas es de $350 general, con descuentos para estudiantes y adultos mayores los días martes y jueves.";
        } else {
            response = "Lo siento, no entendí tu pregunta. Puedes preguntarme sobre: compra de entradas, métodos de pago, cancelaciones o descuentos.";
        }
        
        addBotMessage(response);
    }
});
