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
export const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

export const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}
export const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}



