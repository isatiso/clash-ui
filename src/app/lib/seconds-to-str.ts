export function seconds_to_str(seconds: number) {
    seconds = Math.floor(seconds / 1000)

    function numberEnding(n: number) {
        return (n > 1) ? 's' : ''
    }

    const days = Math.floor(seconds / 86400)
    if (days) {
        return days + ' day'
    }
    const hours = Math.floor(seconds / 3600)
    if (hours) {
        return hours + ' hour' + numberEnding(hours)
    }
    const minutes = Math.floor(seconds / 60)
    if (minutes) {
        return minutes + ' minute' + numberEnding(minutes)
    }
    return 'less than a minute'
}
