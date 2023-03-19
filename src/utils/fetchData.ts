import { useAnimeStore } from "~/store/anime";
import { useUserStore } from "~/store/user";
import { type ResponseAnime, type ResponseUser } from "~/types/anilist";

/**
 * Fetch all the information about an anime. To reduce the amount of requests made to the api, the anime is cached in the store and localStorage. If they are present there,
 * the data will be fetched from there instead of the api.
 *
 * @param { number } id - The id of the anime to fetch.
 */
export const fetchAnime = async (id: number) => {
  if (!id) return null;

  // Check if the anime is stored in the store
  const animeData = useAnimeStore().getAnimeById(id);
  if (animeData) return null;

  // Fetch the anime from the api
  const data = (await useGql()("anime", { id: id })) as ResponseAnime;
  if (!data) return null;

  // Store the anime in the store
  useAnimeStore().storeAnime(data.Media);
  return data.Media;
};

/**
 * Fetch all the information about a user. To reduce the amount of requests made to the api, the user is cached in the store and localStorage. If they are present there,
 * the data will be fetched from there instead of the api.
 *
 * @param { number | string } user - The username or id of the user to fetch.
 */
export const fetchUser = async (user: number | string) => {
  if (!user) return null;

  // Check if the user is already stored locally
  const foundUser = useUserStore().getUserByIdOrName(user);
  if (foundUser) return null;

  // Fetch the user from the api since it's not stored locally
  const data = (await useGql()("user", {
    name: typeof user === "string" ? user : null,
  })) as ResponseUser;
  if (!data) return null;

  // Store the user in the store
  useUserStore().storeUser(data.User);
  return data.User;
};
