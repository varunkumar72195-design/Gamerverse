const container =
document.getElementById(
"favorites"
);

const favorites =
JSON.parse(
localStorage.getItem(
"favorites"
)
) || [];

favorites.forEach(game=>{

container.innerHTML += `

<div class="card">

<img
src="${game.image}">

<h3>
${game.name}
</h3>

</div>

`;

});