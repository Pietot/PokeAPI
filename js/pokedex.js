document.addEventListener("DOMContentLoaded", () => {
  const POKEMON_ID =
    parseInt(new URLSearchParams(window.location.search).get("id")) || 1;
  const TYRADEX_API = "https://tyradex.tech/api/v1/";
  const POKE_API = "https://pokeapi.co/api/v2/pokemon-species/";
  const POKE_IMG_API =
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
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
      const POKE_JSON = await getJson(TYRADEX_API + "pokemon");
      setTitle(POKE_JSON[pokemonId]);
      setLeftTrigger(pokemonId, POKE_JSON);
      setRightTrigger(pokemonId, POKE_JSON);
      setPokeName(pokemonId, POKE_JSON[pokemonId]);
      setPokeImage(pokemonId, POKE_JSON[pokemonId]);
      setStats(pokemonId, POKE_JSON);
      setDescription(pokemonId);
      setInfo(POKE_JSON[pokemonId]);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du pokémon :",
        error
      );
    }
  }

  function setTitle(pokeJson) {
    const NAME = pokeJson.name.fr;
    document.title = NAME;
  }

  function setLeftTrigger(pokemonId, POKE_JSON) {
    const LEFT_TRIGGER_A = document.getElementById("left-trigger-a");
    const LEFT_TRIGGER = document.getElementById("left-trigger");
    const LEFT_TD = document.getElementById("left-td");
    const LEFT_ICON = document.getElementById("left-td-icon");
    const LEFT_ID = document.getElementById("left-td-id");
    const LEFT_NAME = document.getElementById("left-td-name");
    const PREVIOUS_POKEMON_ID =
      pokemonId === 1 ? POKE_JSON.length - 1 : pokemonId - 1;
    const PREVIOUS_POKEMON_NAME = POKE_JSON[PREVIOUS_POKEMON_ID].name.fr;
    LEFT_TRIGGER_A.href = "pokedex.html?id=" + PREVIOUS_POKEMON_ID;
    LEFT_TRIGGER.style.transition =
      "transform 0.2s ease, background-color 0.5s ease";
    LEFT_TRIGGER.addEventListener("mouseenter", () => {
      LEFT_TRIGGER.style.backgroundColor =
        TYPE_TO_COLOR[POKE_JSON[PREVIOUS_POKEMON_ID].types[0].name];
    });
    LEFT_TRIGGER.addEventListener("mouseleave", () => {
      LEFT_TRIGGER.style.backgroundColor = "transparent";
      LEFT_TRIGGER.style.transform = "";
    });
    LEFT_TRIGGER.addEventListener("mousedown", () => {
      LEFT_TRIGGER.style.transform = "translateY(10px)";
    });
    const ARROW = document.createElement("img");
    ARROW.src = "img/arrow.png";
    ARROW.alt = "Left Arrow";
    LEFT_ICON.appendChild(ARROW);
    LEFT_ID.textContent =
      "N° " + PREVIOUS_POKEMON_ID.toString().padStart(4, "0");
    LEFT_NAME.textContent = PREVIOUS_POKEMON_NAME;
    LEFT_TD.appendChild(LEFT_ICON);
    LEFT_TD.appendChild(LEFT_ID);
    LEFT_TD.appendChild(LEFT_NAME);
  }

  function setRightTrigger(pokemonId, POKE_JSON) {
    const RIGHT_TRIGER_A = document.getElementById("right-trigger-a");
    const RIGHT_TRIGGER = document.getElementById("right-trigger");
    const RIGHT_TD = document.getElementById("right-td");
    const RIGHT_ICON = document.getElementById("right-td-icon");
    const RIGHT_ID = document.getElementById("right-td-id");
    const RIGHT_NAME = document.getElementById("right-td-name");
    const NEXT_POKEMON_ID =
      pokemonId === POKE_JSON.length - 1 ? 1 : pokemonId + 1;
    const NEXT_POKEMON_NAME = POKE_JSON[NEXT_POKEMON_ID].name.fr;
    RIGHT_TRIGER_A.href = "pokedex.html?id=" + NEXT_POKEMON_ID;
    RIGHT_TRIGGER.style.transition =
      "background-color 0.5s ease, transform 0.2s ease";
    RIGHT_TRIGGER.addEventListener("mouseenter", () => {
      RIGHT_TRIGGER.style.backgroundColor =
        TYPE_TO_COLOR[POKE_JSON[NEXT_POKEMON_ID].types[0].name];
    });
    RIGHT_TRIGGER.addEventListener("mouseleave", () => {
      RIGHT_TRIGGER.style.backgroundColor = "transparent";
      RIGHT_TRIGGER.style.transform = "";
    });
    RIGHT_TRIGGER.addEventListener("mousedown", () => {
      RIGHT_TRIGGER.style.transform = "translateY(10px)";
    });
    const ARROW = document.createElement("img");
    ARROW.src = "img/arrow.png";
    ARROW.alt = "Left Arrow";
    RIGHT_ICON.appendChild(ARROW);
    RIGHT_ID.textContent = "N° " + NEXT_POKEMON_ID.toString().padStart(4, "0");
    RIGHT_NAME.textContent = NEXT_POKEMON_NAME;
    RIGHT_TD.appendChild(RIGHT_ICON);
    RIGHT_TD.appendChild(RIGHT_ID);
    RIGHT_TD.appendChild(RIGHT_NAME);
  }

  function setPokeName(pokemonId, pokeJson) {
    const POKE_ID = document.getElementById("poke-id");
    POKE_ID.textContent = "N° " + pokemonId.toString().padStart(4, "0");
    const POKE_NAME = document.getElementById("poke-name");
    POKE_NAME.textContent = pokeJson.name.fr;
  }

  function setPokeImage(pokemonId, pokeJson) {
    const POKE_IMG = document.getElementById("poke-img");
    POKE_IMG.src =
      POKE_IMG_API + pokemonId.toString().padStart(3, "0") + ".png";
    POKE_IMG.alt = "Image de " + pokeJson.name.fr;
  }

  function setStats(pokemonId, POKE_JSON) {
    const COLOR = TYPE_TO_COLOR[POKE_JSON[pokemonId].types[0].name];
    const LIGHTEN_COLOR = lightenColor(COLOR, 20);
    ["hp", "atk", "def", "spe_atk", "spe_def", "vit"].forEach((stat) => {
      const POKE_STAT = POKE_JSON[pokemonId].stats[stat];
      const PERCENTAGE = Math.round((POKE_STAT / 255) * 100);
      const STAT = document.getElementById("stat-" + stat);
      STAT.style.background = `linear-gradient(to right, ${LIGHTEN_COLOR}, ${COLOR} ${PERCENTAGE}%, white 0%)`;
      const STAT_VALUE = document.getElementById("value-" + stat);
      STAT_VALUE.textContent = POKE_STAT;
    });
  }

  function lightenColor(color, percent) {
    // Convertir la couleur hexadécimale en valeurs RGB
    const NUM = parseInt(color.slice(1), 16);
    const AMOUNT = Math.round(2.55 * percent);
    let r = (NUM >> 16) + AMOUNT;
    let g = (NUM & 0x0000ff) + AMOUNT;
    let b = ((NUM >> 8) & 0x00ff) + AMOUNT;

    // Limiter les valeurs RGB entre 0 et 255
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    // Convertir les valeurs RGB modifiées en une nouvelle couleur hexadécimale
    return "#" + (g | (b << 8) | (r << 16)).toString(16);
  }

  async function setDescription(pokemonId) {
    const DESC_P = document.getElementById("description");
    const DESCRIPTION = (
      await getJson(POKE_API + pokemonId)
    ).flavor_text_entries.find(
      (entry) => entry.language.name === "fr"
    ).flavor_text;
    DESC_P.textContent = DESCRIPTION;
  }

  function setInfo(pokeJson) {
    const INFOS = document.getElementById("infos");
    if (pokeJson.types.length > 1) {
      const COLOR1 = TYPE_TO_COLOR[pokeJson.types[0].name];
      const COLOR2 = TYPE_TO_COLOR[pokeJson.types[1].name];
      INFOS.style.background = `linear-gradient(120deg, ${COLOR1}, ${COLOR2})`;
    } else {
      const COLOR = TYPE_TO_COLOR[pokeJson.types[0].name];
      INFOS.style.backgroundColor = COLOR;
    }
    const HEIGHT = document.getElementById("height");
    HEIGHT.textContent = pokeJson.height;
    const WEIGHT = document.getElementById("weight");
    WEIGHT.textContent = pokeJson.weight;
  }

  setPokedex(POKEMON_ID);
});
