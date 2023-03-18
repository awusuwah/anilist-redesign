import { useAnimeStore } from "~/store/anime";

/**
 * Move all the values stored in the localStorage to the store.
 */
export const syncLocalStorageWithStore = () => {
  const animes = JSON.parse(localStorage.getItem("animes") || "[]");

  // Store the data in the store
  useAnimeStore().setAnimes(animes);
};
