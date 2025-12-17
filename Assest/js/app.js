let currentScope = "egypt";

document.querySelectorAll(".scope button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".scope button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentScope = btn.dataset.scope;
  };
});

document.getElementById("sendBtn").onclick = async () => {
  const input = document.getElementById("userInput");
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  const data = await fetch("assets/data/knowledge.json").then(r => r.json());
  const result = data.find(
    d => d.scope === currentScope && d.text.toLowerCase().includes(question.toLowerCase())
  );

  if (result) {
    addMessage(
      `${result.text}<br><small>Source: ${result.source} – Page ${result.page}</small>`,
      "assistant"
    );
  } else {
    addMessage("No reference found in current scope.", "assistant");
  }
};

function addMessage(text, type) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerHTML = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
