// TODO: detta ska inte behövas fixa responsen från backend
export const correctEncoding = (str) => {
    try {
        return str
            .replace(/Ã¶/g, "ö")
            .replace(/Ã¥/g, "å")
            .replace(/Ã¤/g, "ä")
            .replace(/Ã©/g, "é")
            .replace(/Ã–/g, "Ö")
            .replace(/Ã…/g, "Å")
            .replace(/â€™/g, "’")
            .replace(/Ã„/g, "Ä");
    } catch (error) {
        console.error('Error decoding URI component:', error);
        return str;
    }
};

export const formatLocation = (location) => {
    location = correctEncoding(location)
    const parts = location.split(',')
    const streetAndNumber = parts[0].trim()

    return streetAndNumber
}

export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString(undefined, options);
};

export const formatOpeningHoursForToday = (openingHours) => {
    if (openingHours === null)
        return ``;
    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const todayIndex = new Date().getDay();
    const today = daysOfWeek[todayIndex];

    if (openingHours[today].length > 0) {
        const startTime = formatTime(openingHours[today][0].startTime);
        const endTime = formatTime(openingHours[today][0].endTime);
        return `${startTime} - ${endTime}`;
    } else {
        return `Closed`;
    }
};

const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
};