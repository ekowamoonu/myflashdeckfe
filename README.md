# 📚 Flashdeck

Flashdeck is a side project that turns **PDF course materials into interactive flashcards** using AI. The goal is to
make studying easier by breaking down dense text into quick, reviewable cards.

🔗 **Live Demo:** [https://stunning-syrniki-b95c8d.netlify.app/](https://stunning-syrniki-b95c8d.netlify.app/)

---

## 🚀 Features

- Upload PDF course materials
- Extract text automatically
- Generate flashcards via OpenAI in structured JSON format
- Store flashcards in MariaDB
- Study flashcards in a clean React interface

---

## 🛠️ Tech Stack

- **Frontend**: React + Tailwind CSS + shadcn/ui
- **Backend**: Laravel
- **Database**: MariaDB
- **AI Integration**: OpenAI (via `openai-php` package)
- **Deployment**: Ubuntu VPS
- **CI/CD**: GitHub Actions

⚠️ Note: The current version is **not optimized for mobile** (time constraints).

---

## ⚙️ How It Works

1. Upload a PDF file.
2. Backend extracts text from the file.
3. Text is sent to OpenAI with a JSON schema for structured flashcards.
4. Flashcards are stored in the database and displayed for studying.

---

## 📌 Roadmap

- [ ] Mobile responsiveness
- [ ] Spaced repetition algorithm
- [ ] Support for multiple PDFs
- [ ] Improved text chunking for large documents

---

## 🤝 Contributing

This is a learning side project, but suggestions and feedback are welcome!

---

## 📄 License

MIT  
