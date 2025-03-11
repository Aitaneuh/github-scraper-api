export function getUptime(startTime) {
    // get the start time and generate an uptime message
    let now = Date.now();
    let difference = Math.floor((now - startTime) / 1000)
    return toCleanTime(difference)
}

function toCleanTime(time) {
    // convert a second amount into hours minutes and seconds
    let timeSeconds = time % 60
    let timeMinutes = Math.floor(time / 60 % 60)
    let timeHours = Math.floor(time / 3600)
    return `${formated(timeHours)}H ${formated(timeMinutes)}M ${formated(timeSeconds)}S`
}

function formated(num) {
    // add a zero infront of to small numbers
    let str = num
    if (num < 10) { str = `0${num}` }
    return str
}