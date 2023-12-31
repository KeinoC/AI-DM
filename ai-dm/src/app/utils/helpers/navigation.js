import React from 'react';

export function navToMyProfile() {
    window.location.href = "/routes/my-profile";
}

export function navToHome() {
    window.location.href = "/";
}

export function navToLogin() {
    window.location.href = "/routes/login";
}

export function navToDashboard() {
    window.location.href = "/routes/dashboard"
}

export function navToMapNamed(mapName) {
    window.location.href = `/routes/maps/${mapName}`
}

export function navToFullRoute(route) {
    window.location.href = `/${route}`
}