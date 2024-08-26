store.setItem("smpl_notification_api", "https://e37zu5n931.execute-api.eu-north-1.amazonaws.com");
store.setItem("smpl_notification_apiKey", "ShrxkVSuF06G28tXWdGxBawowEbQyXHS81eTRYln");



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import {
    getMessaging,
    getToken,
    isSupported,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging.js";
import "https://cdn.jsdelivr.net/npm/localforage/dist/localforage.js";
console.log("OK-smpl script ok");

function isTest() {
    let isTest = false;
    try {
        smpl_notification_stage;
        isTest = true;
    } catch (e) {
        isTest = false;
    }
    return isTest;
}

initializeApp(smpl_notification_config);
const store = localforage.createInstance({
    name: "smpl-notification-db",
});
function initSmplNotification() {
    const smpl_notification_api = "https://e37zu5n931.execute-api.eu-north-1.amazonaws.com";
    const smpl_notification_apiKey = "ShrxkVSuF06G28tXWdGxBawowEbQyXHS81eTRYln";
    store.setItem("smpl_notification_api", smpl_notification_api);
    store.setItem("smpl_notification_apiKey", smpl_notification_apiKey);
    store.setItem("smpl_notification_appId", smpl_notification_appId);

    if (isTest()) {
        store.setItem("smpl_notification_stage", smpl_notification_stage);
    }
    if (navigator.serviceWorker) {
        console.log("navigator.serviceWorker");
        isSupported()
            .then((supported) => {
                if (supported) {
                    const messaging = getMessaging();
                    navigator.serviceWorker
                        .register("/smpl-notification-sw.js")
                        .then((registration) => {
                            console.log("register serviceWorker", registration);
                            getToken(messaging, { serviceWorkerRegistration: registration })
                                .then((currentToken) => {
                                    if (currentToken) {
                                        // console.log("token: ", currentToken);
                                        sendTokenToServer(currentToken);
                                    } else {
                                        console.log(
                                            "No registration token available. Request permission to generate one."
                                        );
                                        setTokenSentToServer(false);
                                    }
                                })
                                .catch((err) => {
                                    console.log(
                                        "An error occurred while retrieving token. ",
                                        err
                                    );
                                    setTokenSentToServer(false);
                                });
                        });
                } else {
                    console.log("not supported browser")
                }
            })
            .catch((err) => console.log("err - not supported browser"));
    }
}
function sendTokenToServer(currentToken) {
    const old_token = getTokenFromLocalStorage()
    // console.log('old_token', old_token)
    if (!isTokenSentToServer()) {
        console.log("Sending token to server...");
        const data = {
            appId: smpl_notification_appId,
            topicName: smpl_initialTopicName,
            token: currentToken,
        };
        const serverResponse = fetch(`${smpl_notification_api}/dev/topics`, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": smpl_notification_apiKey,
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setTokenSentToServer(true);
                setTokenToLocalStorage(currentToken);
            })
            .catch((error) => {
                console.error("Error:", error);
                setTokenSentToServer(false);
                removeTokenFromLocalStorage();
            });
    } else if (!isTokenSentToServer() || currentToken !== old_token) {
        console.log("Sending token to server...");
        const data = {
            appId: smpl_notification_appId,
            topicName: smpl_initialTopicName,
            token: currentToken,
        };
        const serverResponse = fetch(`${smpl_notification_api}/dev/topics`, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": smpl_notification_apiKey,
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setTokenSentToServer(true);
                setTokenToLocalStorage(currentToken);
            })
            .catch((error) => {
                console.error("Error:", error);
                setTokenSentToServer(false);
                removeTokenFromLocalStorage();
            });
    } else {
        console.log(
            "Token already sent to server so won't send it again " +
            "unless it changes"
        );
    }
}

function isTokenSentToServer() {
    return window.localStorage.getItem("smpl_sentToServer") === "1";
}

function setTokenSentToServer(sent) {
    window.localStorage.setItem("smpl_sentToServer", sent ? "1" : "0");
}

function getTokenFromLocalStorage() {
    return window.localStorage.getItem("smpl_notification_token");
}

function removeTokenFromLocalStorage() {
    window.localStorage.removeItem("smpl_notification_token");
    store.removeItem("smpl_notification_token");
}

function setTokenToLocalStorage(token) {
    window.localStorage.setItem("smpl_notification_token", token);
    const storeToken = store.getItem("smpl_notification_token");
    if (token && storeToken && token !== storeToken) {
        store
            .removeItem("smpl_notification_token")
            .then(function () {
                store.setItem("smpl_notification_token", token);
                console.log("Key is cleared and set again!");
            })
            .catch(function (err) {
                console.log(err);
            });
    } else {
        store.setItem("smpl_notification_token", token);
    }
}

function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification permission granted.");
            initSmplNotification();
        } else {
            console.log("Unable to get permission to notify.");
        }
    });
}

initSmplNotification();
