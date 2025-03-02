const params = new URLSearchParams(window.location.search);
        const gameUrl = params.get("url");

        if (gameUrl) {
            document.getElementById("game-frame").src = gameUrl;
        } else {
            document.getElementById("game-frame").innerHTML = "No game selected.";
        }