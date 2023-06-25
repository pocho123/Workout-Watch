// Timer variables
let timerInterval;
let timerRunning = false;
let startTime;
let elapsedTime = 0;

// Speed tracking variables
let speed = 0;

// Calories tracking variables
let weight = 200; // Enter your weight in pounds
let calories = 0;

// Water intake recommendation variables
let recommendedWaterIntake = 0;

// Greeting
function setGreeting() {
  const date = new Date();
  const hour = date.getHours();
  let greeting = '';
  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  document.getElementById('greeting').textContent = greeting + ', Alex!';
}

// Timer functions
function startTimer() {
  if (!timerRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 1000);
    timerRunning = true;
  }
}

function pauseTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
  }
}

function stopTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
  }
  elapsedTime = 0;
  updateTimer();
}

function clearTimer() {
  if (!timerRunning) {
    elapsedTime = 0;
    startTime = Date.now(); // Update startTime to the current time
    updateTimer();
  }
}

function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.getElementById('timer').textContent = formattedTime;
}

function formatTime(time) {
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 1000 / 60) % 60;
  const hours = Math.floor(time / 1000 / 60 / 60);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

// Speed tracking function
function updateSpeed(newSpeed) {
  speed = newSpeed;
  document.getElementById('speed').textContent = `${speed} km/h`;
}

// Calories tracking function
function updateCalories() {
  // Implement your calorie calculation logic based on speed, weight, and duration
  // For simplicity, let's assume a basic calculation:
  calories = Math.round(speed * weight * 0.02);
  document.getElementById('calories').textContent = `${calories} calories`;
}

// Water intake recommendation function
function calculateWaterIntake() {
  // Implement your water intake calculation logic based on duration, intensity, and weather conditions
  // For simplicity, let's assume a basic recommendation of 500 ml per hour
  recommendedWaterIntake = Math.round((elapsedTime / (1000 * 60 * 60)) * 500);
  document.getElementById('water-intake').textContent = `Recommended Water Intake: ${recommendedWaterIntake} ml`;
}

// Call the function to play the speed up voice
function playSpeedUpVoice() {
  const voiceMessage = 'Speed up!';
  // Play the speed up voice message using Text-to-Speech or other audio playback techniques
  // Adjust the code based on the specific implementation and requirements of your project
  console.log(voiceMessage);
}

// Function to play cheer audio
function playCheerAudio() {
  // Create an <audio> element
  const audio = document.createElement('audio');
  // Set the source of the audio file
  audio.src = 'cheer-audio.mp3'; // Replace 'cheer-audio.mp3' with the actual path to your audio file
  // Play the audio
  audio.play();
}

// Update the updateDistance() function to include playing cheer audio at specific milestones
function updateDistance(newDistance) {
  distance = newDistance;
  document.getElementById('distance').textContent = `${distance} km`;

  // Check if distance milestone is reached and play cheer audio
  if (distance >= 1 && distance % 1 === 0) {
    playCheerAudio();
  }
}

// Rest of your code...

// Event listeners
document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('stop-btn').addEventListener('click', stopTimer);
document.getElementById('restart-btn').addEventListener('click', restartTimer);
document.getElementById('speed-input').addEventListener('input', function() {
  updateSpeed(this.value);
  updateCalories();
  calculateWaterIntake();
  
  // Check if speed is greater than a certain threshold and play the speed up voice
  if (speed > 10) {
    playSpeedUpVoice();
  }
});

// Restart button event listener
document.getElementById('restart-btn').addEventListener('click', restartTimer);

function restartTimer() {
  stopTimer(); // Stop the timer
  clearTimer(); // Clear the timer and reset the elapsed time
  updateDistance(0); // Reset the distance
  updateCalories(); // Reset the calories
  calculateWaterIntake(); // Recalculate water intake
}


// Distance tracking variables
let distance = 0;

// Distance tracking function
function updateDistance(newDistance) {
  distance = newDistance;
  document.getElementById('distance').textContent = `${distance} km`;
}

// Update the speed tracking function to include distance calculation
function updateSpeed(newSpeed) {
  speed = newSpeed;
  document.getElementById('speed').textContent = `${speed} km/h`;
  updateCalories();
  calculateWaterIntake();
  if (speed > 10) {
    playSpeedUpVoice();
  }

  // Calculate the distance based on speed and time
  const hours = elapsedTime / (1000 * 60 * 60);
  distance = speed * hours;
  updateDistance(distance.toFixed(2));
}

// Circular button styling
const buttons = document.getElementsByClassName('btn');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].classList.add('circular-btn');
}

// Assuming you have a variable called distanceGoal that holds the distance goal value (in miles)

function checkDistanceMilestone(distance) {
  // Convert distance to miles if needed
  const distanceMiles = distance / 1000 * 0.6213712; // Assuming the distance is initially in meters

  // Check if the distance is a milestone (1 mile, 2 miles, 3 miles, etc.)
  if (distanceMiles % 1 === 0) {
    const timerElement = document.getElementById('timer');
    timerElement.classList.add('pulse');
  } else {
    const timerElement = document.getElementById('timer');
    timerElement.classList.remove('pulse');
  }
}

// Example usage: Call this function whenever the distance updates
checkDistanceMilestone(distance);
