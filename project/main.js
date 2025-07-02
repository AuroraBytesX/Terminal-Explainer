// Attach event listeners after DOM is loaded
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

  const prompt = generatePrompt(commandInput, mode);

  try {
    const response = await fetch("https://explain-api-proxy.onrender.com/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ OpenRouter API FULL Response:", JSON.stringify(data, null, 2));

    let reply = data.choices?.[0]?.message?.content;

    if (reply && reply.trim() && reply !== "🤯 No explanation received.") {
      output.textContent = reply;
    } else {
      throw new Error("Empty or mock API response - Switching to offline mode.");
    }

  } catch (error) {
    console.error("🚨 API ERROR:", error);

    const fallback = generateExplanation(commandInput, mode);
    output.innerHTML = `
      <div style="background-color: #fbbf24; color: #92400e; padding: 0.5rem; border-radius: 6px; margin-bottom: 1rem; font-family: 'Segoe UI', sans-serif;">
        ⚠️ API unavailable or response failed - Showing offline explanation
      </div>
      ${fallback}
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

function generateExplanation(command, mode) {
  const mainCommand = command.split(' ')[0];

  const baseExplanations = {
    'ls': 'lists files and directories in your current location',
    'ls -a': 'lists all files, including hidden ones',
    'cd': 'changes your current directory',
    'mkdir': 'creates a new directory (folder)',
    'rm': 'removes (deletes) files or directories',
    'pwd': 'shows your current directory path',
    'cp': 'copies files or directories',
    'mv': 'moves or renames files and directories',
    'cat': 'displays the contents of a file',
    'grep': 'searches for text patterns in files',
    'chmod': 'changes file permissions',
    'chown': 'changes file ownership',
    'sudo': 'runs commands with administrator privileges',
    'ps': 'shows running processes',
    'kill': 'terminates processes',
    'top': 'displays running processes and system resources',
    'df': 'shows disk space usage',
    'du': 'shows directory space usage',
    'find': 'searches for files and directories',
    'tar': 'archives and compresses files',
    'wget': 'downloads files from the internet',
    'curl': 'transfers data from servers',
    'ssh': 'connects to remote servers securely',
    'scp': 'copies files over SSH',
    'nano': 'opens a text editor',
    'vim': 'opens the Vim text editor',
    'history': 'shows command history',
    'man': 'displays manual pages for commands',
    'clear': 'clears the terminal screen',
    'touch': 'creates an empty file',
    'whoami': 'displays the current logged-in user',
    'echo': 'prints text to the terminal',
    'exit': 'closes the terminal session'
  };

  const baseExplanation = baseExplanations[command] || baseExplanations[mainCommand] || 'is a terminal command that performs system operations';

  switch (mode) {
    case "beginner":
      return `📚 The "${command}" command ${baseExplanation}. Think of it as a simple instruction you give to your computer to do something specific. Don't worry - it's perfectly safe to learn about!`;

    case "gpt":
      return `🤖 Command Analysis: "${command}" - This ${baseExplanation}. The command structure follows standard Unix/Linux conventions and can be executed in terminal environments with appropriate permissions and context.`;

    case "chaos":
      return `🔥 YOOO "${command}" ABSOLUTELY SENDS IT! This command is straight up FIRE 🚀 It ${baseExplanation} and it's giving me MAJOR terminal energy! No cap, this is some next-level command line wizardry! ✨💯`;

    case "grandma":
      return `👵 Oh my goodness, "${command}"? I don't understand all these computer things, dear. Back in my day, we didn't need fancy commands! But if you say it ${baseExplanation}, I suppose that's... nice? Just promise me you're being careful with that machine!`;

    case "pilot":
      return `✈️ Attention crew, we have "${command}" on approach. This command ${baseExplanation}. Please ensure all systems are secure before execution. We're cleared for terminal operations. Over and out.`;

    case "shakespeare":
      return `🎭 Hark! What noble command doth grace our terminal this day! "${command}" - a most wondrous incantation that ${baseExplanation}! Verily, 'tis a tool of great power that bendeth the very machine to thy will, as surely as the morning sun doth rise!`;

    default:
      return `The "${command}" command ${baseExplanation}.`;
  }
}
