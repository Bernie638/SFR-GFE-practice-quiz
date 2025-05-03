let currentQuestion = 0;
let questions = [];

fetch('questions/questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('topic').textContent = `Topic: ${q.topic}`;
  document.getElementById('question').textContent = q.question;

  const img = document.getElementById('question-image');
  if (q.image) {
    img.src = `images/${q.image}`;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }

  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  q.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.onclick = () => handleAnswer(choice.charAt(0));
    choicesDiv.appendChild(btn);
  });

  document.getElementById('feedback').textContent = '';
  document.getElementById('next-btn').style.display = 'none';
}

function handleAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  const feedback = document.getElementById('feedback');
  if (selected === correct) {
    feedback.textContent = '✅ Correct!';
    feedback.style.color = 'green';
  } else {
    feedback.textContent = `❌ Incorrect. Correct answer: ${correct}`;
    feedback.style.color = 'red';
  }

  document.querySelectorAll('#choices button').forEach(btn => {
    btn.disabled = true;
  });

  document.getElementById('next-btn').style.display = 'inline-block';
}

document.getElementById('next-btn').addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    document.getElementById('quiz-container').innerHTML = '<h2>🎉 You’ve completed the quiz!</h2>';
  }
});
