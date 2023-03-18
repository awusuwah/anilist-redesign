import { defineStore } from "pinia";

/**
 * The store which contains information about the animes.
 */
export const useAnimeStore = defineStore("anime", {
  state: () => ({
    animes: [] as Anime[],
    currentlyViewing: null as number | null,
  }),
  getters: {
    /**
     * Get a specific anime by it's id.
     */
    getAnimeById: (state) => {
      return (animeId: number) => state.animes.find((anime: Anime) => anime.id === animeId);
    },

    /**
     * Get every single anime in the store.
     */
    getAllAnimes: (state) => {
      return () => state.animes;
    },

    /**
     * Get the anime that is currently being viewed.
     */
    getCurrentlyViewing: (state) => {
      return () => state.animes.find((anime: Anime) => anime.id === state.currentlyViewing);
    },
  },
  actions: {
    /**
     * Store an anime in the store.
     *
     * @param { Anime } anime - The anime to store.
     */
    storeAnime(anime: Anime) {
      const allAnimes = [...this.animes, anime];
      this.animes = allAnimes;

      // Store the anime in localStorage
      localStorage.setItem("animes", JSON.stringify(allAnimes));
    },

    /**
     * Delete an anime from the store.
     *
     * @param { number } animeId - The id of the anime to delete.
     */
    deleteAnime(animeId: number) {
      const allAnimes = this.animes.filter((anime: Anime) => anime.id !== animeId);
      this.animes = allAnimes;

      // Store the anime in localStorage
      localStorage.setItem("animes", JSON.stringify(allAnimes));
    },

    /**
     * Set the animes in the store to the provided list.
     *
     * @param { Anime[] } animes - The list of animes to set.
     */
    setAnimes(animes: Anime[]) {
      this.animes = animes;
      localStorage.setItem("animes", JSON.stringify(animes));
    },

    /**
     * Set what anime is currently being viewed.
     *
     * @param { number } animeId - The id of the anime to set as currently viewing.
     */
    setCurrentlyViewing(animeId: number) {
      this.currentlyViewing = animeId;
      localStorage.setItem("currentlyViewing", JSON.stringify(animeId));
    },
  },
});

export type Anime = {
  id: number;
  title: {
    english: string;
    romaji: string;
  };
  description: string;
  coverImage: {
    extraLarge: string;
  };
  averageScore: number;
  characters: {
    nodes: Character[];
  };
  rankings: [
    rank: {
      id: number;
      rank: number;
      context: string;
    }
  ];
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  studios: {
    nodes: [
      studio: {
        id: number;
        name: string;
      }
    ];
  };
  genres: string[];
};

export type Character = {
  id: number;
  name: {
    full: string;
  };
  image: {
    large: string;
  };
  siteUrl: string;
};
