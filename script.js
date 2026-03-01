// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Function to send the user message to the backend and display replies
  async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    // Safety check
    if (!input || !chatBox) {
      console.error("Missing HTML elements.");
      return;
    }

    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Show user's message in chat
    chatBox.innerHTML += `<div class="user">${userMessage}</div>`;
    input.value = "";

    try {
      // Send message to Render backend
      const response = await fetch("https://rizzgpt-backend.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      // Show bot reply in chat
      chatBox.innerHTML += `<div class="bot">${data.reply}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    } catch (err) {
      console.error(err);
      chatBox.innerHTML += `<div class="bot">Error connecting to AI.</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  // Attach click handler to the Send button
  const button = document.querySelector("button");
  button.addEventListener("click", sendMessage);

  // Optional: allow pressing Enter to send
  const inputField = document.getElementById("user-input");
  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
