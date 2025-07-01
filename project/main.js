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
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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" // Your API key
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.85,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    console.log("🪵 FULL RESPONSE:", JSON.stringify(data, null, 2));

    const reply = data.choices?.[0]?.message?.content || "🤯 GPT gave no answer.";
    output.textContent = reply;
  } catch (error) {
    output.textContent = "⚠️ Error reaching GPT. Check your API key or network.";
    console.error("🚨 ERROR:", error);
  } finally {
    spinner.style.display = "none";
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

function tweetIt() {
  const text = document.getElementById("explanationText").textContent;
  const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}%0A🧠 Try it here: https://bolt.new`;
  window.open(tweet, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("explainButton").addEventListener("click", explainCommand);
  document.getElementById("tweetButton").addEventListener("click", tweetIt);
});
