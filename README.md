

# 🧠 Explain Like I’m Root

A web app that explains *any terminal command* in 6 hilarious and useful modes — **Beginner**, **GPT**, **Chaos**, **Grandma**, **Pilot**, and **Shake-a-Spear (Shakespeare)**. Just paste a command and get an instant, personalized explanation!

---

## 🚀 Live Demo

👉 [Try it here](https://regal-lokum-eb813e.netlify.app)
👉 Backend hosted on **Render**: [https://explain-api-proxy.onrender.com](https://explain-api-proxy.onrender.com)
🔗 Built with [Bolt.new](https://bolt.new) 💥

---

## ✨ Features

* Paste any terminal command
* Choose from 6 explanation styles
* Instant AI-generated responses using **OpenRouter API (via Render backend)**
* Built-in **local fallback** when API credits are low or unavailable
* Fully functional **offline explanation system** if API fails
* Tweetable output
* Responsive design
* Clean, simple UI
* Fun + educational

---

## 🔥 Recent Updates

* ✅ **Backend hosted on Render**
* ✅ Automatically switches to **offline fallback** if API is unavailable or credits are exhausted
* ✅ No API key setup required for users
* ✅ Frontend handles both API and local explanations smoothly
* ✅ Tweet button working perfectly
* ✅ Clean local explanations with instant response

---

## 💡 Why This?

Because sometimes, `chmod 777` sounds like a magic spell.
This app makes terminal learning **fun, beginner-friendly, and shareable.**

---

## 🛠️ Tech Stack

* HTML, CSS, JavaScript
* OpenRouter API (gpt-3.5-turbo or compatible model)
* Backend: Node.js server hosted on **Render**
* Frontend: Bolt.new
* Deployment: Netlify

Built With:

Frontend:
•HTML, CSS (style.css), JavaScript (main.js)
•Vite – for fast frontend bundling and development
•Netlify – for frontend hosting and deployment

Backend:
•Node.js (index.js)
•package.json – for managing dependencies
•Hosted on Render – to securely handle OpenRouter API requests

API Integration:
•OpenRouter API – for GPT-powered terminal command explanations (via backend)

Others:
•.gitignore, package-lock.json – for version control and dependency locking
•SVG & Public Folder – for static assets
•JSON Used: package.json and package-lock.json (for configuration, not data storage)
  

---

## 📦 How to Run Locally

```bash
npm install
npm run dev
```

---

## 🌟 Notes

* Backend is optional if you run out of API credits.
* Local explanations work directly from the frontend.
* You can add features like API key input or request limits later.

