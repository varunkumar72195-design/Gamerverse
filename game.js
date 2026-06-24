const API_KEY = "42385f42449045d79c8b9bd5d62a82da";

const id =
new URLSearchParams(
window.location.search
).get("id");

const container =
document.getElementById("gameDetails");

loadGame();

async function loadGame() {

    try {

        const res =
        await fetch(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );

        const game =
        await res.json();

        container.innerHTML = `

        <img
        class="game-banner"
        src="${game.background_image}"
        alt="${game.name}">

        <h1 class="game-title">
        ${game.name}
        </h1>

        <div class="game-info">

            <div class="info-card">
                ⭐ Rating: ${game.rating}
            </div>

            <div class="info-card">
                📅 Released: ${game.released}
            </div>

            <div class="info-card">
                🎮 Metacritic:
                ${game.metacritic || "N/A"}
            </div>

            <div class="info-card">
                ⏱️ Playtime:
                ${game.playtime || 0} hrs
            </div>

            <div class="info-card">
                🎯 Genres:
                ${
                    game.genres
                    ?.map(g => g.name)
                    .join(", ")
                    || "N/A"
                }
            </div>

            <div class="info-card">
                🕹️ Platforms:
                ${
                    game.platforms
                    ?.map(p => p.platform.name)
                    .join(", ")
                    || "N/A"
                }
            </div>

        </div>

        <div class="description">

            <h2>📖 Description</h2>

            <p>
                ${game.description_raw || "No Description Available"}
            </p>

        </div>

        <h2 style="margin-top:40px;">
            📸 Screenshots
        </h2>

        <div
        id="shots"
        class="screenshots">
        </div>

        `;

        loadScreenshots();

    }

    catch(error){

        console.log(error);

        container.innerHTML = `
        <h2>
            Failed To Load Game Details ❌
        </h2>
        `;
    }

}

async function loadScreenshots() {

    try {

        const res =
        await fetch(
        `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`
        );

        const data =
        await res.json();

        const shots =
        document.getElementById("shots");

        if(!data.results ||
           data.results.length === 0){

            shots.innerHTML =
            "<p>No screenshots available.</p>";

            return;
        }

        data.results.forEach(img => {

            shots.innerHTML += `

            <img
            src="${img.image}"
            alt="Screenshot">

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}