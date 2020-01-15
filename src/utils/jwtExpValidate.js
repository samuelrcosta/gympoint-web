export default function(token) {
  try {
    const encodedPayload = token.split('.')[1];
    const base64 = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function(c) {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join('')
    );

    const payload = JSON.parse(jsonPayload);

    if (new Date(payload.exp * 1000) < new Date()) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}
