

export function getCurrentUnixTimestamp() {
    const currentUnixTimestampSeconds = Math.floor(Date.now() / 1000);
    return currentUnixTimestampSeconds;
}

export function convertUnixToTime(unixTimestampMilliseconds) {
    const date = new Date(unixTimestampMilliseconds);

    // Extract and format date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    // Extract and format time components
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, '0');

    // Combine date and time components
    return `${month}/${day}/${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;
}


