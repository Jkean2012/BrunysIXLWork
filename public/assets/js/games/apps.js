let gamesPromise = fetch("/assets/json/a.json")
    .then(response => response.json())
    .then(games => {
        window.allGames = games;
        return games;
    })
    .catch(error => {
        console.error("Error loading apps:", error);
        return [];
    });

document.addEventListener("DOMContentLoaded", async () => {
    const games = await gamesPromise;
    displayGames(games);
});

function displayGames(games) {
    const container = document.getElementById("game-container");
    if (!container) return;

    container.innerHTML = "";
    games.forEach(game => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <a href="iframe.html?url=${encodeURIComponent(game.link)}">
                <img src="${game.imgpath}" alt="${game.name}" loading="lazy">
            </a>
            <a href="iframe.html?url=${encodeURIComponent(game.link)}">${game.name}</a>
        `;
        container.appendChild(card);
    });
}

function filterGames() {
    const searchQuery = document.getElementById("search-bar").value.toLowerCase();

    if (!window.allGames) {
        console.error("Games not loaded yet.");
        return;
    }

    const filteredGames = window.allGames.filter(game => {
        const gameName = game.name.toLowerCase();
        const gameCategory = game.category ? game.category.toLowerCase() : "";
        return gameName.includes(searchQuery) || gameCategory.includes(searchQuery);
    });

    displayGames(filteredGames);
}