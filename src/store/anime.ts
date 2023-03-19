import { defineStore } from "pinia";
import { type Anime } from "~/types/anilist";

/**
 * The store which contains information about the animes.
 */
export const useAnimeStore = defineStore("anime", {
  state: (): State => ({
    anime: [],
    viewing: null,
  }),
  getters: {
    /**
     * Get a specific anime by it's id from the store. If the anime is not found, null is returned.
     *
     * @param { State } state - The current state of the store.
     */
    getAnimeById: (state: State): ((animeId: number) => Anime | null) => {
      return (animeId: number) => state.anime.find((anime: Anime) => anime.id === animeId) || null;
    },

    /**
     * Get every anime from the store.
     *
     * @param { State } state - The current state of the store.
     */
    getAllAnime: (state: State): (() => Anime[]) => {
      return () => state.anime;
    },

    /**
     * Get the anime that is currently being viewed.
     *
     * @param { State } state - The current state of the store.
     */
    getViewing: (state: State): (() => Anime | null) => {
      return () => state.anime.find((anime: Anime) => anime.id === state.viewing) || null;
    },
  },
  actions: {
    /**
     * Set the anime in store. Any anime that is already in the store will be overwritten.
     *
     * @param { Anime[] } anime - The list of anime to store.
     */
    setAnime(anime: Anime[]) {
      this.anime = anime;

      // Store the anime in the localStorage
      localStorage.setItem("anime", JSON.stringify(anime));
    },

    /**
     * Store an anime in the store.
     *
     * @param { Anime } anime - The anime to store.
     */
    storeAnime(anime: Anime) {
      const allAnime = [...this.anime, anime];
      this.anime = allAnime;

      // Store the anime in the localStorage
      localStorage.setItem("anime", JSON.stringify(allAnime));
    },

    /**
     * Remove an anime from the store.
     *
     * @param { number } animeId - The id of the anime to remove.
     */
    removeAnime(animeId: number) {
      const remainingAnime = this.anime.filter((anime: Anime) => anime.id !== animeId);
      this.anime = remainingAnime;

      // If the `viewing` anime is the anime that is being removed, set the `viewing` anime to the first anime in the store.
      // If there are no anime left in the store, set the `viewing` anime to null.
      this.viewing = animeId !== this.viewing ? this.viewing : remainingAnime.length > 0 ? remainingAnime[0].id : null;

      // Store the anime in the localStorage
      localStorage.setItem("anime", JSON.stringify(remainingAnime));
      localStorage.setItem("viewingAnime", JSON.stringify(this.viewing));
    },

    /**
     * Set the anime that is currently being viewed.
     *
     * @param { number } animeId - The id of the anime to mark as currently viewed.
     */
    setViewing(animeId: number) {
      this.viewing = this.anime.find((anime: Anime) => anime.id === animeId)?.id ? animeId : null;

      // Store the viewing anime in the localStorage
      localStorage.setItem("viewingAnime", JSON.stringify(animeId));
    },
  },
});

/** Represent the state of the store */
export type State = {
  anime: Anime[];
  viewing: number | null;
};
