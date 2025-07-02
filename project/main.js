// Wait until DOM is ready, then attach events
document.addEventListener("DOMContentLoaded", () => {
  const explainButton = document.getElementById("explainButton");
  const tweetButton = document.getElementById("tweetButton");

  if (explainButton) {
    explainButton.addEventListener("click", explainCommand);
  }

  if (tweetButton) {
    tweetButton.addEventListener("click", tweetIt);
  }
});

async function explainCommand() {
  const commandInput = document.getElementById("commandInput").value.trim();
  const mode = document.getElementById("modeSelect").value;
  const output = document.getElementById("explanationText");
  const spinner = document.getElementById("loadingSpinner");

  if (!commandInput) {
    output.textContent = "🤖 Please type a terminal command.";
    return;
  }

  spinner.style.display = "block";
  output.textContent = "";

  try {
    const prompt = generatePrompt(commandInput, mode);

    const response = await fetch("https://explain-api-proxy.onrender.com/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
      signal: AbortSignal.timeout(7000) // Keep timeout short to avoid long waits
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ OpenRouter API FULL Response:", JSON.stringify(data, null, 2));

    let reply = null;

    if (data.choices?.[0]?.message?.content) {
      reply = data.choices[0].message.content;
    } else if (data.explanation) {
      reply = data.explanation;
    } else if (typeof data === 'string') {
      reply = data;
    } else if (data.message) {
      reply = data.message;
    }

    if (reply && reply.trim()) {
      output.textContent = reply;
    } else {
      throw new Error("Empty response received");
    }

  } catch (error) {
    console.error("🚨 API ERROR:", error);

    // Fallback to local explanation
    const explanation = generateExplanation(commandInput, mode);
    output.innerHTML = `
      <div style="background-color: #fbbf24; color: #92400e; padding: 0.5rem; border-radius: 6px; margin-bottom: 1rem; font-family: 'Segoe UI', sans-serif;">
        ⚠️ API not available - showing built-in explanation
      </div>
      ${explanation}
    `;
  } finally {
    spinner.style.display = "none";
  }
}

function tweetIt() {
  const text = document.getElementById("explanationText").textContent;
  const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}%0A🧠 Try it here: https://bolt.new`;
  window.open(tweet, "_blank");
}

function generateExplanation(command, mode) {
  const mainCommand = command.split(' ')[0];

  const baseExplanations = {
    'ls': 'lists files and directories in your current location',
    'cd': 'changes your current directory',
    'mkdir': 'creates a new directory (folder)',
    'rm': 'removes (deletes) files or directories',
    'pwd': 'shows your current directory path',
    'cp': 'copies files or directories',
    'mv': 'moves or renames files and directories',
    'cat': 'displays the contents of a file',
    'grep': 'searches for text patterns in files',
    'chmod': 'changes file permissions',
    'sudo': 'runs commands with administrator privileges',
    'history': 'shows command history'
  };

  const baseExplanation = baseExplanations[mainCommand] || 'is a terminal command that performs system operations';

  switch (mode) {
    case "beginner":
      return `📚 The "${command}" command ${baseExplanation}. It's like a simple instruction for your computer to do something.`;
    case "gpt":
      return `🤖 "${command}" is a system command that ${baseExplanation}. It follows Unix/Linux terminal standards.`;
    case "chaos":
      return `🔥 YO "${command}" is CRAZY! It ${baseExplanation} — BANG BANG BANG 💥 HACKERMODE!`;
    case "grandma":
      return `👵 Sweetie, "${command}" just ${baseExplanation}. Don't worry, I trust you to be careful with it!`;
    case "pilot":
      return `✈️ Attention crew: "${command}" ${baseExplanation}. Prepare for safe execution.`;
    case "shakespeare":
      return `🎭 Lo! The "${command}" command ${baseExplanation}, as noble knights would tend to their mighty steeds!`;
    default:
      return `The "${command}" command ${baseExplanation}.`;
  }
}

function generatePrompt(command, mode) {
  const base = `Explain the terminal command "${command}"`;

  switch (mode) {
    case "beginner":
      return `${base} like I am a complete beginner. Be gentle and simple.`;
    case "gpt":
      return `${base} in technical terms, as if you're an AI assistant.`;
    case "chaos":
      return `${base} like you're a chaotic internet meme lord with too much caffeine.`;
    case "grandma":
      return `${base} as if you're a worried grandmother who doesn't trust technology.`;
    case "pilot":
      return `${base} like you're an airplane captain briefing the crew.`;
    case "shakespeare":
      return `${base} in the voice of William Shakespeare, with full poetic flair.`;
    default:
      return base;
  }
}
