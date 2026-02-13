export async function persistUserProfile(payload) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorText = (await response.text())?.trim();
        throw new Error(errorText || 'Unable to save your profile data right now.');
    }

    return response.json();
}
