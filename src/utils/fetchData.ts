import { useAnimeStore, type Anime } from "~/store/anime";

/**
 * Fetch all the information about an anime. To reduce the amount of requests made to the api, the anime is cached in the store and localStorage. If they are present there,
 * the data will be fetched from there instead of the api.
 *
 * @param { number } id - The id of the anime to fetch.
 */
export const fetchAnime = async (id: number) => {
  if (!id) return;

  // Check if the anime is stored in the store
  const animeData = useAnimeStore().getAnimeById(id);
  if (animeData) return;

  // Fetch the anime from the api
  const data = (await useGql()("anime", { id: id })) as Response;
  if (!data) return;

  // Store the anime in the store if it's not already present
  useAnimeStore().storeAnime(data.Media);
};

type Response = {
  Media: Anime;
};
