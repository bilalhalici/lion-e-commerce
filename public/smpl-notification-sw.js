const publicVapidKey = 'BMHqXrsvpqIsJNDAGVcm41otSKyj1LdqYJ7HspYakZTEevKSLBYWtznxLqQl8qsL9vHP1oycvb5xMs7X_bXADiM';
const notificationAPI = 'https://e4fe-2a02-e0-b71d-4a00-892a-4f68-2d02-9c13.ngrok-free.app';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js')
        .then(async (registration) => {
            console.log('Service Worker registered', registration);
            const subscription = await subscribeUserToPush(registration);
            console.log('User is subscribed:', subscription);
            await sendSubscriptionToServer(subscription);
        })
        .catch(error => console.error('Service Worker registration failed:', error));
}

async function subscribeUserToPush(registration) {
    try {
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
        return subscription;
    } catch (error) {
        console.error('Failed to subscribe the user:', error);
    }
}

async function sendSubscriptionToServer(subscription) {
    try {
        const token = generateToken();
        const response = await fetch(`${notificationAPI}/api/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subscription,
                token: token,
                appId: 'app_id'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send subscription to server');
        }

        storeTokenToLocal(token);
    } catch (error) {
        console.error('Failed to send subscription to server:', error);
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}

function generateToken() {
    let token = localStorage.getItem('userToken');
    if (!token) {
        token = crypto.randomUUID();
        localStorage.setItem('userToken', token);
    }
    return token;
}

function storeTokenToLocal(token) {
    localStorage.setItem('userToken', token);
}

function requestPermission() {
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification permission granted.");
        } else {
            console.log("Unable to get permission to notify.");
        }
    });
}

requestPermission();
