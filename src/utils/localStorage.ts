import { useAnimeStore } from "~/store/anime";

/**
 * Move all the values stored in the localStorage to the store.
 */
export const syncLocalStorageWithStore = () => {
  const animes = JSON.parse(localStorage.getItem("animes") || "[]");
  const currentlyViewing = JSON.parse(localStorage.getItem("currentlyViewing") || "null");

  // Store the data in the store
  const animeStore = useAnimeStore();
  animeStore.setAnimes(animes);
  animeStore.setCurrentlyViewing(currentlyViewing);
};
