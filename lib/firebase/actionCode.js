const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const buildVerificationActionCodeSettings = ({ email, source = 'verify' } = {}) => {
    const url = new URL(`${APP_URL.replace(/\/$/, '')}/verify`);
    url.searchParams.set('from', source);
    if (email) {
        url.searchParams.set('email', email);
    }

    return {
        url: url.toString(),
        handleCodeInApp: true,
    };
};
