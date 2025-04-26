let timeLeft = 30

let element = document.getElementById("timer")

let timer = setInterval(countdown, 1000)

function countdown() {
    if (timeLeft < 0) {
        clearInterval(timer)
        selectedAnswer = ""
        checkAnswer()
    } else {
        element.innerHTML = timeLeft
        timeLeft--
    }
}