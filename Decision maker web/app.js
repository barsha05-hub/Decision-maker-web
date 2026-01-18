class SmartDecisionHelper {
  constructor() {
    this.state = {
      page: "category",
      category: "",
      situation: "",
      option1: "",
      option2: "",
      answers1: {},
      answers2: {},
      instinct: "",
      score1: 0,
      score2: 0
    };

    this.questions = [
      { id: "q1", text: "How important is financial stability?", type: "rating" },
      { id: "q2", text: "How interested are you in this option?", type: "rating" },
      { id: "q3", text: "Does it support long-term growth?", type: "rating" },
      { id: "q4", text: "How stable is this option for coming years?", type: "rating" },
      { id: "q5", text: "How confident do you feel choosing this?", type: "rating" },
      { id: "q6", text: "How well does it align with your values?", type: "rating" },
      { id: "q7", text: "Will this option improve your mental peace?", type: "yesno" },
      { id: "q8", text: "Does it reduce long-term stress?", type: "yesno" },
      { id: "q9", text: "Does it open future opportunities?", type: "yesno" },
      { id: "q10", text: "Would you choose this again after 5 years?", type: "yesno" }
    ];

    this.render();
  }

  navigate(page) {
    this.state.page = page;
    this.render();
  }

  render() {
    const root = document.getElementById("root");
    root.innerHTML = this.getHTML();

    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) nextBtn.onclick = () => this.handleNext();

    const analyzeBtn = document.getElementById("analyzeBtn");
    if (analyzeBtn) analyzeBtn.onclick = () => this.analyze();
  }

  getHTML() {
    switch (this.state.page) {
      case "category": return this.categoryPage();
      case "situation": return this.situationPage();
      case "options": return this.optionsPage();
      case "q1": return this.questionsPage(1);
      case "q2": return this.questionsPage(2);
      case "instinct": return this.instinctPage();
      case "result": return this.resultPage();
      default: return "";
    }
  }

  categoryPage() {
    return `
      <div class="container">
        <h2>Select Category</h2>
        <select id="category">
          <option value="">-- Choose --</option>
          <option>Career</option>
          <option>Education</option>
          <option>Personal</option>
          <option>Finance</option>
          <option>Health</option>
        </select>
        <button class="btn btn-primary" id="nextBtn">Next →</button>
      </div>`;
  }

  situationPage() {
    return `
      <div class="container">
        <h2>Your Situation</h2>
        <textarea id="situation" placeholder="Explain your situation clearly..."></textarea>
        <button class="btn btn-primary" id="nextBtn">Next →</button>
        <button class="btn btn-secondary" onclick="app.navigate('category')">← Back</button>
      </div>`;
  }

  optionsPage() {
    return `
      <div class="container">
        <h2>Enter Your Options</h2>
        <input id="opt1" placeholder="Option 1"/>
        <input id="opt2" placeholder="Option 2" style="margin-top:12px"/>
        <button class="btn btn-primary" id="nextBtn">Next →</button>
        <button class="btn btn-secondary" onclick="app.navigate('situation')">← Back</button>
      </div>`;
  }

  questionsPage(which) {
    const title = which === 1 ? this.state.option1 : this.state.option2;
    return `
      <div class="container">
        <h2>Questions for: ${title}</h2>
        ${this.questions.map(q => `
          <div class="section">
            <label>${q.text}</label>
            ${
              q.type === "rating"
                ? `<div class="options">
                    ${[1,2,3,4,5].map(v =>
                      `<label><input type="radio" name="${q.id}"
                        onclick="app.save(${which}, '${q.id}', ${v})"> ${v}</label>`
                    ).join("")}
                  </div>`
                : `<div class="options">
                    <label><input type="radio" name="${q.id}"
                      onclick="app.save(${which}, '${q.id}', 5)"> Yes</label>
                    <label><input type="radio" name="${q.id}"
                      onclick="app.save(${which}, '${q.id}', 0)"> No</label>
                  </div>`
            }
          </div>
        `).join("")}
        <button class="btn btn-primary" id="nextBtn">Next →</button>
      </div>`;
  }

  instinctPage() {
    return `
      <div class="container">
        <h2>Your Instinct</h2>
        <label>Which option feels right to you?</label>
        <div class="options">
          <label><input type="radio" name="instinct" onclick="app.state.instinct='1'"> ${this.state.option1}</label>
          <label><input type="radio" name="instinct" onclick="app.state.instinct='2'"> ${this.state.option2}</label>
        </div>
        <button class="btn btn-primary" id="analyzeBtn">Analyze →</button>
      </div>`;
  }

  resultPage() {
    const winner = this.state.score1 > this.state.score2 ? this.state.option1 : this.state.option2;
    const strength =
      Math.max(this.state.score1, this.state.score2) >= 40 ? "strong" :
      Math.max(this.state.score1, this.state.score2) >= 25 ? "moderate" : "weak";

    return `
      <div class="container">
        <h2>Final Result</h2>
        <div class="result-box ${strength}">
          <div class="score">${this.state.score1} vs ${this.state.score2}</div>
          <p><b>Best Option:</b> ${winner}</p>
          <p>
            ${
              this.state.instinct === "1" && winner === this.state.option1 ||
              this.state.instinct === "2" && winner === this.state.option2
              ? "Your instinct and logic are aligned."
              : "Your instinct differs from logical result. Reflect once more."
            }
          </p>
        </div>
        <button class="btn btn-primary" onclick="app.reset()">Start New Decision</button>
      </div>`;
  }

  handleNext() {
    if (this.state.page === "category") {
      const c = document.getElementById("category").value;
      if (!c) return alert("Select category");
      this.state.category = c;
      this.navigate("situation");
    }
    else if (this.state.page === "situation") {
      const s = document.getElementById("situation").value;
      if (!s.trim()) return alert("Write situation");
      this.state.situation = s;
      this.navigate("options");
    }
    else if (this.state.page === "options") {
      const o1 = document.getElementById("opt1").value;
      const o2 = document.getElementById("opt2").value;
      if (!o1 || !o2) return alert("Enter both options");
      this.state.option1 = o1;
      this.state.option2 = o2;
      this.navigate("q1");
    }
    else if (this.state.page === "q1") {
      this.navigate("q2");
    }
    else if (this.state.page === "q2") {
      this.navigate("instinct");
    }
  }

  save(which, id, value) {
    if (which === 1) this.state.answers1[id] = value;
    else this.state.answers2[id] = value;
  }

  analyze() {
    this.state.score1 = Object.values(this.state.answers1).reduce((a,b)=>a+b,0);
    this.state.score2 = Object.values(this.state.answers2).reduce((a,b)=>a+b,0);
    this.navigate("result");
  }

  reset() {
    location.reload();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new SmartDecisionHelper();
});