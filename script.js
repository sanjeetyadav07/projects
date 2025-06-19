// Travel Website JavaScript Functionality

document.addEventListener("DOMContentLoaded", function () {
  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar.offsetHeight;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - navbarHeight;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Back to Top Button
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Interactive Hover Effects for Cards
  const cards = document.querySelectorAll(
    ".destination-card, .service-card, .testimonial-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Button Hover Effects
  const buttons = document.querySelectorAll(".cta-button, .btn-primary");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Basic validation
    if (!name || !email || !message) {
      showAlert("Please fill in all fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showAlert("Please enter a valid email address.", "error");
      return;
    }

    // Simulate form submission
    showAlert(
      "Thank you for your message! We will get back to you soon.",
      "success"
    );
    this.reset();
  });

  // Newsletter Subscription
  const subscriptionForm = document.getElementById("subscriptionForm");

  subscriptionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value;

    if (!email) {
      showAlert("Please enter your email address.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showAlert("Please enter a valid email address.", "error");
      return;
    }

    // Simulate subscription
    showAlert("Thank you for subscribing to our newsletter!", "success");
    this.reset();
  });

  // Chatbot Functionality
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotSend = document.getElementById("chatbotSend");
  const chatbotMessages = document.getElementById("chatbotMessages");

  // Chatbot responses database
  const chatbotResponses = {
    greetings: [
      "Hello! Welcome to WanderLust Tours! How can I help you plan your next adventure?",
      "Hi there! I'm here to assist you with tour packages and travel information. What would you like to know?",
      "Greetings! Ready to explore the world? I can help you with bookings and travel advice.",
    ],
    destinations: [
      "We offer amazing tours to Paris, Tokyo, Bali, New York, Dubai, and many more destinations! Which location interests you?",
      "Our popular destinations include romantic Paris, cultural Tokyo, tropical Bali, vibrant New York, and luxurious Dubai. What type of experience are you looking for?",
      "We have tours to over 50+ destinations worldwide! From beach paradises to mountain adventures, city breaks to cultural experiences. Tell me your preferences!",
    ],
    booking: [
      "To book a tour, you can contact us at info@wanderlust.com or call +1-234-567-8900. We also offer online booking for most packages!",
      "Booking is easy! You can reach out via our contact form, email, or phone. Our travel experts will help you customize the perfect trip!",
      "For bookings and reservations, please contact our team. We offer flexible booking options and payment plans to make your dream trip affordable!",
    ],
    services: [
      "We provide comprehensive travel services including hotel bookings, guided tours, adventure activities, flight reservations, and travel insurance!",
      "Our services include personalized itineraries, accommodation booking, transportation, guided tours, adventure sports, and 24/7 travel support!",
      "We offer end-to-end travel solutions: custom tour packages, hotel reservations, flight bookings, adventure activities, and local guides!",
    ],
    prices: [
      "Our tour packages start from $299 per person and vary based on destination, duration, and accommodation type. Contact us for detailed pricing!",
      "Prices depend on your chosen destination and package type. We offer budget-friendly to luxury options. Shall I connect you with our pricing team?",
      "We have tours for every budget! From economic packages starting at $299 to luxury experiences. What's your preferred budget range?",
    ],
    default: [
      "I'm here to help with tour packages, destinations, bookings, and travel advice. What specific information do you need?",
      "I can assist you with travel planning, tour bookings, destination information, and general travel queries. How can I help?",
      "Feel free to ask me about our tours, destinations, booking process, or any travel-related questions!",
    ],
  };

  // Toggle chatbot window
  chatbotToggle.addEventListener("click", function () {
    chatbotWindow.classList.toggle("active");
    if (chatbotWindow.classList.contains("active")) {
      addBotMessage(
        "Hello! I'm your travel assistant. How can I help you today?"
      );
    }
  });

  // Close chatbot
  chatbotClose.addEventListener("click", function () {
    chatbotWindow.classList.remove("active");
  });

  // Send message on button click
  chatbotSend.addEventListener("click", sendChatMessage);

  // Send message on Enter key
  chatbotInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendChatMessage();
    }
  });

  function sendChatMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
      addUserMessage(message);
      chatbotInput.value = "";

      // Simulate thinking delay
      setTimeout(() => {
        const response = generateChatbotResponse(message);
        addBotMessage(response);
      }, 1000);
    }
  }

  function addUserMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message user";
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    scrollChatToBottom();
  }

  function addBotMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message bot";
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    scrollChatToBottom();
  }

  function scrollChatToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function generateChatbotResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Check for greetings
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      return getRandomResponse("greetings");
    }

    // Check for destinations
    if (
      message.includes("destination") ||
      message.includes("place") ||
      message.includes("where") ||
      message.includes("country") ||
      message.includes("city")
    ) {
      return getRandomResponse("destinations");
    }

    // Check for booking
    if (
      message.includes("book") ||
      message.includes("reserve") ||
      message.includes("booking") ||
      message.includes("reservation")
    ) {
      return getRandomResponse("booking");
    }

    // Check for services
    if (
      message.includes("service") ||
      message.includes("offer") ||
      message.includes("provide") ||
      message.includes("what do you") ||
      message.includes("activities")
    ) {
      return getRandomResponse("services");
    }

    // Check for prices
    if (
      message.includes("price") ||
      message.includes("cost") ||
      message.includes("expensive") ||
      message.includes("cheap") ||
      message.includes("budget")
    ) {
      return getRandomResponse("prices");
    }

    // Default response
    return getRandomResponse("default");
  }

  function getRandomResponse(category) {
    const responses = chatbotResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Utility Functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showAlert(message, type = "info") {
    // Create alert element
    const alert = document.createElement("div");
    alert.className = `alert alert-${
      type === "error" ? "danger" : "success"
    } alert-dismissible fade show`;
    alert.style.position = "fixed";
    alert.style.top = "20px";
    alert.style.right = "20px";
    alert.style.zIndex = "9999";
    alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (alert.parentNode) {
        alert.parentNode.removeChild(alert);
      }
    }, 5000);
  }

  // Intersection Observer for Animation on Scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease forwards";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll(
    ".destination-card, .service-card, .testimonial-card, .about-content"
  );
  elementsToAnimate.forEach((el) => observer.observe(el));

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 50;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});
