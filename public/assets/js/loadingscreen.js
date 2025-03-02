document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const toggleButton = document.getElementById("toggle-loading");

    function getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const [key, value] = cookie.split("=");
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
        document.cookie = `${name}=${value}${expires}; path=/`;
    }

    function updateToggleButtonText() {
        if (toggleButton) {
            toggleButton.textContent = getCookie("loadingScreen") === "enabled" 
                ? "Disable Loading Screen" 
                : "Enable Loading Screen";
        }
    }

    if (getCookie("loadingScreen") === "enabled") {
        loadingScreen.style.display = "flex";

        window.addEventListener("load", () => {
            loadingScreen.style.opacity = "0";
            loadingScreen.style.transition = "opacity 0.5s ease-out";

            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 500);
        });
    } else {
        loadingScreen.style.display = "none";
    }

    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            if (getCookie("loadingScreen") === "enabled") {
                setCookie("loadingScreen", "disabled", 365);
            } else {
                setCookie("loadingScreen", "enabled", 365);
            }
            location.reload();
        });

        updateToggleButtonText();
    }
});