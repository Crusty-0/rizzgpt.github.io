// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Grab elements
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const button = document.getElementById("send-button");

  // Safety check
  if (!input || !chatBox || !button) {
    console.error("Missing HTML elements:", { input, chatBox, button });
    return;
  }

  // Function to send messages
  async function sendMessage() {
    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Display user's message
    chatBox.innerHTML += `<div class="user">${userMessage}</div>`;
    input.value = "";

    try {
      // Send to your Render backend
      const response = await fetch("https://rizzbot-backend.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      // Display bot reply
      chatBox.innerHTML += `<div class="bot">${data.reply}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (err) {
      console.error(err);
      chatBox.innerHTML += `<div class="bot">Error connecting to AI.</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  // Attach click and Enter key events
  button.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});