const iframe = document.getElementById('gameframe');
const urlParam = getQueryParam('url');

if (urlParam) {
    const decodedUrl = decodeURIComponent(urlParam);
    iframe.src = decodedUrl;
    setCookie('iframeSrc', decodedUrl, 365); 
    history.replaceState(null, '', window.location.pathname);
    console.log('Iframe URL set from query param:', decodedUrl);
} else {
    const storedUrl = getCookie('iframeSrc');
    iframe.src = storedUrl || 'https://example.com';
    console.log(storedUrl ? 'Iframe URL set from cookies:' : 'Iframe URL set to default:', iframe.src);
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return value;
    }
    return null;
}

function toggleFullscreen() {
    const iframe = document.getElementById('gameframe');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

function refreshIframe() {
    const iframe = document.getElementById('gameframe');
    iframe.src = iframe.src;
    console.log('Iframe refreshed');
}

function goBack() {
    if (document.referrer) {
        window.location.href = document.referrer;
    } else {
        window.location.href = '/';
    }
}

function activateChat() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    new Crate({
        server: '1271606448878780478',
        channel: '1272275936389103637'
    });
}