const question = document.getElementById("question");
const subtitle = document.getElementById("subtitle");
const questionNumber = document.querySelector(".question-number");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonArea = document.getElementById("buttonArea");
const hint = document.getElementById("hint");

const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const nextBtn = document.getElementById("nextBtn");

const questions = [
  {
    q: "Do you miss your Loveth? 🥹",
    sub: "Be honest, Zaza. I won't judge. 👀",
    yes: "YES, I MISS YOU! ❤️",
    no: "NOT RIGHT NOW 🙈",
    yesTitle: "I MISS YOU TOO! 😭❤️",
    yesMessage:
      "Come here, baby! 🫂💕\n" +
      "If I could, I'd give you the longest hug right now " +
      "and steal a few kisses while I'm at it. 😚",
    noTitle: "THAT'S OKAY, BABY ❤️",
    noMessage:
      "No pressure, my love. 🥹💕\n" +
      "I'm still sending you a little virtual hug."
  },
  {
    q: "Do you want to see me? 🥺",
    sub: "Should your baby come and disturb your peace? 😂",
    yes: "YES, COME SEE ME! 😘",
    no: "NOT RIGHT NOW ❤️",
    yesTitle: "SAY LESS, BABY! 💋",
    yesMessage:
      "Okay, Zaza! 😭❤️\n" +
      "Let's find a time that works for both of us. " +
      "Your hug is waiting for you. 🫂",
    noTitle: "I UNDERSTAND, BABY 💗",
    noMessage:
      "Take your time, my love. ❤️\n" +
      "You don't have to see me until you feel ready. " +
      "I'll respect your space."
  },
  {
    q: "What would make you feel better? ❤️",
    sub: "Choose what you need most right now.",
    yes: "LET ME TALK 🫂",
    no: "I NEED SOME SPACE 🌷",
    yesTitle: "I'M LISTENING, BABY ❤️",
    yesMessage:
      "You can tell me what's on your mind. " +
      "I won't judge you or rush you to feel better. " +
      "I'm here to listen, not to pressure you. 🫂",
    noTitle: "TAKE YOUR TIME, ZAZA 🌷",
    noMessage:
      "I hear you, baby. ❤️\n" +
      "Take the time you need. You don't have to explain " +
      "anything before you're ready. I'll be here when " +
      "you feel like talking."
  },
  {
    q: "Can I give you a little love? 🥹",
    sub: "Even if I can't fix everything, I can still care.",
    yes: "YES, BABY! 💕",
    no: "JUST STAY CLOSE ❤️",
    yesTitle: "KISSES FOR MY BABY! 😘",
    yesMessage:
      "Mwah! Mwah! Mwah! 😚❤️\n" +
      "That's three kisses, one big hug, and unlimited " +
      "love from your Loveth. No refunds! 😂💕",
    noTitle: "I'M RIGHT HERE ❤️",
    noMessage:
      "No long speeches, baby. Just me reminding you " +
      "that you matter to me. Take things one moment " +
      "at a time. 🌷"
  }
];

let currentQuestion = -1;
let finalScreen = false;

// Make the first NO button run away.
function moveNoButton() {
  if (currentQuestion !== -1) return;

  const area = buttonArea;
  const maxX = Math.max(0, area.clientWidth - noBtn.offsetWidth);
  const maxY = Math.max(0, area.clientHeight - noBtn.offsetHeight);

  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";

  hint.textContent = "Hehehe! 😂 You can't escape the love!";
}

// Desktop: run away when the pointer approaches.
noBtn.addEventListener("pointerenter", moveNoButton);

// Phone: run away when he tries to touch it.
noBtn.addEventListener("pointerdown", function (event) {
  if (currentQuestion === -1) {
    event.preventDefault();
    moveNoButton();
  }
});

// Display a message after each answer.
function showResult(title, message) {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  resultTitle.textContent = title;
  resultMessage.textContent = message;
}

// The first YES answer.
yesBtn.addEventListener("click", function () {
  if (currentQuestion === -1) {
    showResult(
      "I KNEW IT! 😭❤️",
      "See ehn, Zaza! You have excellent taste. 😂💕\n\n" +
      "Unfortunately for you, Loveth loves you right back. 😚"
    );

    nextBtn.textContent = "CONTINUE, BABY 💌";
    return;
  }

  answerQuestion(true);
});

// The NO button becomes a normal answer after question one.
noBtn.addEventListener("click", function () {
  if (currentQuestion === -1) return;

  answerQuestion(false);
});

function answerQuestion(isYes) {
  const item = questions[currentQuestion];

  if (isYes) {
    showResult(item.yesTitle, item.yesMessage);
  } else {
    showResult(item.noTitle, item.noMessage);
  }

  nextBtn.textContent =
    currentQuestion === questions.length - 1
      ? "ONE LAST MESSAGE 💌"
      : "NEXT QUESTION 💗";
}

// Load each question.
function loadQuestion(index) {
  currentQuestion = index;
  finalScreen = false;

  const item = questions[index];

  result.classList.add("hidden");
  quiz.classList.remove("hidden");

  questionNumber.textContent =
    "QUESTION " + String(index + 2).padStart(2, "0");

  question.textContent = item.q;
  subtitle.textContent = item.sub;

  yesBtn.textContent = item.yes;
  noBtn.textContent = item.no;

  // Keep NO in the normal layout for later questions.
  noBtn.style.position = "relative";
  noBtn.style.left = "auto";
  noBtn.style.top = "auto";

  hint.textContent = "Choose what feels right, baby. ❤️";
}

// Continue to the next question or the final message.
nextBtn.addEventListener("click", function () {
  if (finalScreen) {
    restartQuiz();
    return;
  }

  if (currentQuestion === -1) {
    loadQuestion(0);
    return;
  }

  if (currentQuestion < questions.length - 1) {
    loadQuestion(currentQuestion + 1);
    return;
  }

  showFinalMessage();
});

function showFinalMessage() {
  finalScreen = true;

  showResult(
    "HELLO AGAIN, MY ZAZA 🌚❤️",
    "I know I can't make every problem disappear, baby.\n\n" +
    "But I hope this little corner of the internet " +
    "made you smile, even if it was just for a second. 🥹💕\n\n" +
    "You don't have to pretend to be okay with me. " +
    "You don't have to explain everything today either.\n\n" +
    "Whenever you need someone to listen, a hug, " +
    "a little laughter, or just some quiet company, " +
    "you can tell me. ❤️\n\n" +
    "I care about you, Zaza. On your good days and " +
    "your difficult ones, too.\n\n" +
    "Sending you one very big hug and plenty of kisses. 😚🫂\n\n" +
    "Forever your Loveth. 🌸❤️"
  );

  nextBtn.textContent = "START AGAIN, BABY 💗";
}

function restartQuiz() {
  currentQuestion = -1;
  finalScreen = false;

  result.classList.add("hidden");
  quiz.classList.remove("hidden");

  questionNumber.textContent = "QUESTION 01";
  question.textContent = "Do you like Loveth? 🥺";
  subtitle.textContent =
    "Please think carefully before you answer. 🌚";

  yesBtn.textContent = "YES, OF COURSE! 💗";
  noBtn.textContent = "NO 🙄";

  noBtn.style.position = "relative";
  noBtn.style.left = "auto";
  noBtn.style.top = "auto";

  hint.textContent = "Choose wisely, Zaza. 👀";
}