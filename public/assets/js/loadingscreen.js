document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");

    
    function getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            let [key, value] = cookie.split("=");
            if (key === name) return value;
        }
        return null;
    }

    
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + "; path=/";
    }

    
    if (getCookie("loadingScreen") === "disabled") {
        loadingScreen.style.display = "none";
    } else {
        loadingScreen.style.display = "flex";

        window.addEventListener("load", () => {
            loadingScreen.style.opacity = "0";
            loadingScreen.style.transition = "opacity 0.5s ease-out";

            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 500);
        });
    }

    
    const toggleButton = document.getElementById("toggle-loading");
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            if (getCookie("loadingScreen") === "disabled") {
                setCookie("loadingScreen", "enabled", 365);
            } else {
                setCookie("loadingScreen", "disabled", 365);
            }
            location.reload(); 
        });
    }
});
