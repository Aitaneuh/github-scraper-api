export function getUptime(startTime) {
    let now = Date.now();
    let difference = Math.floor((now - startTime) / 1000)
    return toCleanTime(difference)
}

function toCleanTime(time) {
    let timeSeconds = time % 60
    let timeMinutes = Math.floor(time / 60)
    let timeHours = Math.floor(time / 3600)
    return `${formated(timeHours)}H ${formated(timeMinutes)}M ${formated(timeSeconds)}S`
}

function formated(num) {
    let str = num
    if (num < 10) { str = `0${num}` }
    return str
}