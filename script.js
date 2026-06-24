const API_KEY = "42385f42449045d79c8b9bd5d62a82da";

const gamesContainer =
    document.getElementById("games");
const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const suggestions =
    document.getElementById("suggestions");

const loader =
    document.getElementById("loader");

const themeBtn =
    document.getElementById("themeBtn");
async function searchGames() {

    const query =
        searchInput.value.trim();

    if (!query) return;

    loader.style.display = "block";

    try {

        const res =
            await fetch(
                `https://api.rawg.io/api/games?search=${query}&key=${API_KEY}`
            );

        const data =
            await res.json();

        displayGames(data.results);

    }

    catch (error) {

        console.log(error);

    }

    loader.style.display = "none";

}
searchInput.addEventListener(
    "input",
    async () => {

        const query =
            searchInput.value.trim();

        if (query.length < 2) {

            suggestions.innerHTML = "";

            return;

        }

        const res =
            await fetch(
                `https://api.rawg.io/api/games?search=${query}&page_size=5&key=${API_KEY}`
            );

        const data =
            await res.json();

        suggestions.innerHTML = "";

        data.results.forEach(game => {

            suggestions.innerHTML += `
<div
class="suggestion-item"
onclick="selectGame('${game.name}')">

🎮 ${game.name}

</div>
`;

        });

    });
function selectGame(name) {

    searchInput.value = name;

    suggestions.innerHTML = "";

    searchGames();

}
searchInput.addEventListener(
    "keypress",
    function (e) {

        if (e.key === "Enter") {

            searchGames();

        }

    });
themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );

        localStorage.setItem(
            "theme",
            document.body.classList.contains("light")
                ? "light"
                : "dark"
        );

    });
if (
    localStorage.getItem("theme")
    === "light"
) {

    document.body.classList.add(
        "light"
    );

}
async function loadGames() {

    try {

        const res =
            await fetch(
                `https://api.rawg.io/api/games?key=${API_KEY}`
            );

        const data =
            await res.json();

        displayGames(data.results);

    }

    catch (error) {

        console.log(error);

    }

}
function viewGame(id){

window.location.href =
`game.html?id=${id}`;

}

function displayGames(games) {

    gamesContainer.innerHTML = "";

    games.forEach(game => {

        gamesContainer.innerHTML += `

<div class="card">

    <img src="${game.background_image}">

    <div class="card-content">

        <h3>${game.name}</h3>

        <p>⭐ ${game.rating}</p>

        <p>📅 ${game.released}</p>

        <br>

        <button
        onclick="viewGame(${game.id})">
        View Details
        </button>

        <button
        onclick="addFavorite(${game.id},
        '${game.name}',
        '${game.background_image}')">
        ❤️ Favorite
        </button>

    </div>

  </div>

`;
        

    });

}
    
async function loadGenre(
genre
){

const res =
await fetch(
`https://api.rawg.io/api/games?genres=${genre}&key=${API_KEY}`
);

const data =
await res.json();

displayGames(
data.results
);

}

loadGames();