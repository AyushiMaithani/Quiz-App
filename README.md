# Quizify 🧠🎮  

**Quizify** is an interactive quiz web app that combines fun and learning. Built using modern web technologies, it features secure user authentication, dynamic API-driven questions, and robust scoring mechanisms.  

---

## 🚀 Features  

1. 🔐 **Secure Authentication**  
   - User login and registration with **Passport.js** to ensure secure access.  

2. ❓ **Dynamic Questions**  
   - Integrated with the **Open Trivia Database API** to provide diverse quiz questions.  

3. 🏆 **Leaderboards**  
   - Tracks and displays the highest and recent scores to encourage competition.  

4. 📊 **Efficient Data Management**  
   - User profiles, quiz data, and scores are stored using **MongoDB**.  

---

## 🛠️ Technology Stack  

- **Frontend:** HTML, CSS, JavaScript, EJS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** Passport.js  

---

## 📝 Usage 

- **Sign Up/Login:** Create an account or log in to access the quiz.  
- **Start Quiz:** Choose a category and difficulty level to begin.  
- **View Scores:** Check your latest score and compete on the leaderboard.  
- **Logout:** Log out securely when done.  
---

## 📦 Installation  

Follow these steps to set up and run the application locally:  

📥 **Clone the repository:**  
```bash
  git clone https://github.com/AyushiMaithani/Quiz-App.git 
  ```
 
 📂 Change the working directory:
 ```bash
  cd Quiz-App
  ```

🔧 Install dependencies:
```bash
  npm install
```

🛠️ Set up environment variables:

Create a .env file in the root directory and add the following:
```bash
MONGO_DB_URL=your-mongodb-uri
```

🚀 Start the application:
```bash
  npm run dev
```

Enjoy Quizify and happy quizzing! 🎉



