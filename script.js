document.addEventListener("DOMContentLoaded", () => {
  async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    if (!input || !chatBox) {
      console.error("Missing HTML elements.");
      return;
    }

    const userMessage = input.value.trim();
    if (!userMessage) return;

    chatBox.innerHTML += `<div class="user">${userMessage}</div>`;
    input.value = "";

    try {
      const response = await fetch("https://rizzgpt-backend.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      chatBox.innerHTML += `<div class="bot">${data.reply}</div>`;
    } catch (err) {
      console.error(err);
      chatBox.innerHTML += `<div class="bot">Error connecting to AI.</div>`;
    }
  }

  // Attach to the button after DOM is ready
  const button = document.querySelector("button");
  button.addEventListener("click", sendMessage);
});
