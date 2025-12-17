let currentLang = "en";
let translations = {};

const langToggle = document.getElementById("langToggle");
const appName = document.getElementById("appName");
const tagline = document.getElementById("tagline");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const scopeEgypt = document.getElementById("scope-egypt");
const scopeSaudi = document.getElementById("scope-saudi");
const scopeInternational = document.getElementById("scope-international");

// تحميل ملف اللغات
fetch("assets/data/lang.json")
  .then(res => res.json())
  .then(data => {
    translations = data;
    applyLanguage();
  });

// تطبيق اللغة
function applyLanguage() {
  const langData = translations[currentLang];

  document.documentElement.dir = langData.direction;
  document.body.style.textAlign = langData.direction === "rtl" ? "right" : "left";

  appName.innerHTML = langData.app_name;
  tagline.innerText = langData.tagline;

  scopeEgypt.innerText = langData.scopes.egypt;
  scopeSaudi.innerText = langData.scopes.saudi;
  scopeInternational.innerText = langData.scopes.international;

  userInput.placeholder = langData.placeholder;
  sendBtn.innerText = langData.send;

  langToggle.innerText = currentLang === "en" ? "AR" : "EN";
}

// زر التبديل
langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  applyLanguage();
});
const chatBox = document.getElementById("chat");
const input = document.querySelector(".input-area input");
const sendBtn = document.querySelector(".input-area button");

// إضافة رسالة للشات
function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = `message ${type}`;
  msg.innerHTML = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// إرسال رسالة المستخدم
sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  // رد مبدئي من السيستم (placeholder)
  setTimeout(() => {
    addMessage(
      "I will answer based on fire system standards once knowledge base is connected.",
      "assistant"
    );
  }, 600);
});

// إرسال بالـ Enter
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});