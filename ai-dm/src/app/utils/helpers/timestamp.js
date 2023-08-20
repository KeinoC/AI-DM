

export function getCurrentUnixTimestamp() {
    const currentUnixTimestampSeconds = Math.floor(Date.now() / 1000);
    return currentUnixTimestampSeconds;
}

export function convertUnixToTime(unixTimestampSeconds) {
    const date = new Date(unixTimestampSeconds * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}