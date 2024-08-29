import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Kindergarten() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    generateQuestion();
    const ctx = chartRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Score Percentage',
          data: [],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
    setChart(newChart);
  }, []);

  const generateQuestion = () => {
    setNum1(Math.floor(Math.random() * 5));
    setNum2(Math.floor(Math.random() * 5));
    setAnswer('');
    setFeedback('');
  };

  const handleSubmit = () => {
    const correctAnswer = num1 + num2;
    if (parseInt(answer) === correctAnswer) {
      setFeedback('Correct!');
      setScore(score + 1);
    } else {
      setFeedback('Try again!');
    }
    setAttempts(attempts + 1);
    updateChart();
  };

  const updateChart = () => {
    const newScore = (score / attempts) * 100;
    chart.data.labels.push(`Q${attempts}`);
    chart.data.datasets[0].data.push(newScore);
    chart.update();
  };

  return (
    <div>
      <h1>Kindergarten Math Studio</h1>
      <p>What is {num1} + {num2}?</p>
      <input 
        type="text" 
        value={answer} 
        onChange={e => setAnswer(e.target.value)} 
        placeholder="Your answer" 
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>{feedback}</p>
      <button onClick={generateQuestion}>Next Question</button>
      <button onClick={() => window.location.href = '/'}>Return to Login</button>
      <p>Score: {score} out of {attempts}</p>
      <canvas ref={chartRef} id="score-chart"></canvas>
    </div>
  );
}

export default Kindergarten;
