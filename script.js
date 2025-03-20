const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    appendMessage("You", message);
    userInput.value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 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`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a charming AI that helps with flirting." },
                    { role: "user", content: message }
                ]
            })
        });

        if (!response.ok) throw new Error(`API Error: ${response.status} - ${response.statusText}`);

        const data = await response.json();
        console.log("API Response:", data);
        const reply = data.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";
        appendMessage("RizzBot", reply);
    } catch (error) {
        console.error("Error:", error);
        appendMessage("RizzBot", "sorry dude no rizz for you right now");
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender === "You" ? "user-message" : "bot-message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
