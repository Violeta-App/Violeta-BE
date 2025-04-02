function isTimeInRange(time, range) {
    const [start, end] = range.split("-").map(toMinutes);
    const target = toMinutes(time);
    if (start <= end) {
        return target >= start && target <= end;
    } else {
        return target >= start || target <= end;
    }
}

function toMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

export default isTimeInRange