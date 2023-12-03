document.addEventListener("DOMContentLoaded", function () {
    const activeTimers = [];

    const startTimerButton = document.getElementById('startTimerButton');
    startTimerButton.addEventListener('click', function () {
        const hoursInput = parseInt(document.getElementById('hours').value) || 0;
        const minutesInput = parseInt(document.getElementById('minutes').value) || 0;
        const secondsInput = parseInt(document.getElementById('seconds').value) || 0;

        if (validateInput(hoursInput, minutesInput, secondsInput)) {
            startNewTimer(hoursInput, minutesInput, secondsInput);
        } else {
            alert('Invalid input. Please enter valid numbers.');
        }
      
    });


    function validateInput(hours, minutes, seconds) {
        return hours >= 0 && minutes >= 0 && seconds >= 0;
    }

    function startNewTimer(hours, minutes, seconds) {
        const some = document.getElementById("some");
        some.style.display = "none";
        const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
        const timerObject = {
            id: Date.now(),
            totalTime: totalTimeInSeconds,
            timeRemaining: totalTimeInSeconds,
        };

        activeTimers.push(timerObject);

        
        if(hours || minutes || seconds){
            renderTimer(timerObject);

        timerObject.intervalId = setInterval(function () {
            timerObject.timeRemaining--;

            updateTimerUI(timerObject);

            if (timerObject.timeRemaining <= 0) {
                clearInterval(timerObject.intervalId);
                handleTimerEnd(timerObject);
            }
        }, 1000);
    }
    else{
        alert("please enter a number");
    }
    }

    function renderTimer(timerObject) {
        const timerContainer = document.getElementById('activeTimersContainer');
        const timerElement = document.createElement('div');
        timerElement.classList.add('timer');
        timerElement.dataset.timerId = timerObject.id;
        timerElement.innerHTML = `
            <h5>Time Left:</h5>
            <div class="travelTime">${formatTime(timerObject.timeRemaining)}</div>
            <button class="stop-button" onclick="stopTimer(${timerObject.id})">Delete</button>
        `;
        timerContainer.appendChild(timerElement);
    }

    function updateTimerUI(timerObject) {
        const timerElement = document.querySelector(`.timer[data-timer-id="${timerObject.id}"] .travelTime`);
        timerElement.textContent = formatTime(timerObject.timeRemaining);
    }
    

    function handleTimerEnd(timerObject) {
        const timerElement = document.querySelector(`.timer[data-timer-id="${timerObject.id}"]`);
        timerElement.classList.add('timer-ended');
        timerElement.innerHTML=`
        <div class="timeUp">Timer Is Up !</div>
        <button onclick="hide()" class="stop">Stop</button>
        `

        playAudioAlert();
        // Add additional actions according to your Figma design
    }
    


    function stopTimer(timerId) {
        const timerObject = activeTimers.find(timer => timer.id === timerId);

        clearInterval(timerObject.intervalId);
        const timerElement = document.querySelector(`.timer[data-timer-id="${timerObject.id}"]`);
        timerElement.remove();

        const index = activeTimers.indexOf(timerObject);
        activeTimers.splice(index, 1);
    }

    document.getElementById('activeTimersContainer').addEventListener('click', function (event) {
        if (event.target.classList.contains('stop-button')) {
            const timerId = event.target.closest('.timer').dataset.timerId;
            stopTimer(parseInt(timerId));
        }
    });

    function formatTime(timeInSeconds) {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
    }

    function playAudioAlert() {
        const audio = new Audio("audio/a.mp3");
        audio.play();
    }
});
