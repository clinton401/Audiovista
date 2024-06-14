export function msToHMS(milliseconds) {
    // Convert milliseconds to seconds
    let totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const calculatedMinutes = Math.floor(totalSeconds / 60);
    const calculatedSeconds = totalSeconds % 60;
    const minutes =
        calculatedMinutes === 0 ? `0${calculatedMinutes}` : calculatedMinutes;
    const seconds =
        calculatedSeconds < 10 ? `0${calculatedSeconds}` : calculatedSeconds;

    return { hours, minutes, seconds };
}