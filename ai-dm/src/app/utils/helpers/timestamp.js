export function getCurrentUnixTimestamp() {
    const currentUnixTimestampSeconds = Math.floor(Date.now() / 1000);
    return currentUnixTimestampSeconds;
}

export function convertUnixToTime(unixTimestampMilliseconds) {
    const date = new Date(unixTimestampMilliseconds);

    // Extract and format date components
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    // Extract and format time components
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, "0");

    // Combine date and time components
    return `${month}/${day}/${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;
}

export function timeAgo(datetime) {
    const timestamp = new Date(datetime).getTime();
    const now = new Date().getTime();
    const difference = now - timestamp;

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;

    if (difference < minute) {
        return "Just now";
    } else if (difference < hour) {
        return "last seen - " + Math.round(difference / minute) + " mins ago";
    } else if (difference < day) {
        return "last seen - " + Math.round(difference / hour) + " hrs ago";
    } else if (difference < week) {
        return "last seen - " + Math.round(difference / day) + " days ago";
    } else {
        return new Date(timestamp).toLocaleDateString();
    }
}


export const formatShortDateAndTime = (firestoreTimestamp) => {
    if(!firestoreTimestamp) return "";
    const date = firestoreTimestamp?.toDate();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};
