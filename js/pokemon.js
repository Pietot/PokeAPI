document.addEventListener("DOMContentLoaded", () => {
  var viewportHeight = window.innerHeight;
  container = document.getElementById("container");
  container.style.height = viewportHeight + "px";
  const POKEMON_ID =
    parseInt(new URLSearchParams(window.location.search).get("id")) || 1;
  const TYRADEX_API = "https://tyradex.tech/api/v1/";
  const POKE_IMG = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
  const TYPE_TO_COLOR = {
    Normal: "#abacac",
    Feu: "#ff662e",
    Eau: "#2b99ff",
    Plante: "#45c826",
    Électrik: "#ffdf00",
    Glace: "#44dfff",
    Combat: "#ffa702",
    Poison: "#9e4fd6",
    Sol: "#b17d3b",
    Vol: "#9cd3ff",
    Psy: "#ff6885",
    Insecte: "#a8ae26",
    Roche: "#c0bc8c",
    Spectre: "#734876",
    Dragon: "#5867e1",
    Ténèbres: "#534b4b",
    Acier: "#6fb7dd",
    Fée: "#ffb5ff",
  };

  async function getJson(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async function setPokedex(pokemonId) {
    try {
      const POKE_JSON = await getJson(TYRADEX_API + "pokemon/" + pokemonId);
      setTitle(POKE_JSON);
      setLeftTrigger(pokemonId);
      setRightTrigger(pokemonId);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du pokémon :",
        error
      );
    }
  }

  function setTitle(POKE_JSON) {
    const NAME = POKE_JSON.name.fr;
    document.title = NAME;
  }

  async function setLeftTrigger(pokemonId) {
    const LEFT_TG_DETAILS = document.getElementById("left-tg-details");
    const LEFT_ICON = document.getElementById("left-tg-icon");
    const LEFT_ID = document.getElementById("left-tg-id");
    const LEFT_NAME = document.getElementById("left-tg-name");
    const PREVIOUS_POKEMON_ID =
      pokemonId === 1
        ? (await getJson(TYRADEX_API + "pokemon")).length - 1
        : pokemonId - 1;
    const PREVIOUS_POKEMON_NAME = (
      await getJson(TYRADEX_API + "pokemon/" + PREVIOUS_POKEMON_ID)
    ).name.fr;
    const ARROW = document.createElement("img");
    ARROW.src = "img/arrow.png";
    ARROW.alt = "Left Arrow";
    LEFT_ICON.appendChild(ARROW);
    LEFT_ID.textContent =
      "N° " + PREVIOUS_POKEMON_ID.toString().padStart(3, "0");
    LEFT_NAME.textContent = PREVIOUS_POKEMON_NAME;
    LEFT_TG_DETAILS.appendChild(LEFT_ICON);
    LEFT_TG_DETAILS.appendChild(LEFT_ID);
    LEFT_TG_DETAILS.appendChild(LEFT_NAME);
  }
  function setRightTrigger(pokemonId) {}

  setPokedex(POKEMON_ID);
});
