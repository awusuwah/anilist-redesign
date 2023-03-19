import { fetchAnime, fetchUser } from "~/utils/fetchData";
import { useAnimeStore } from "~/store/anime";
import { useUserStore } from "~/store/user";

import { type Anime, type User } from "~/types/anilist";

/**
 * Process the entered search query and determine what needs to be done.
 *
 * @param { string } query - The search query as entered by the user.
 */
export const processQuery = (query: string) => {
  // If the query is empty, do nothing
  if (query === "") return;

  const [command, args] = query.split(":").map((part) => part.trim());

  // Determine what command to run
  switch (command) {
    case "add-anime":
      addAnime(Number(args));
      return;

    case "remove-anime":
      removeAnime(Number(args));
      return;

    case "add-user":
      addUser(args);
      return;

    case "remove-user":
      removeUser(args);
      return;

    default:
      console.log("Maybe try entering something...");
      return;
  }
};

/**
 * Adds the anime with the given ID to the local list of animes. If the anime is already present,
 * nothing will happen.
 *
 * @param { number } animeId - The ID of the anime to add.
 */
const addAnime = (animeId: number) => {
  if (!animeId) return;

  // fetchAnime(Number(animeId)).then(() => useAnimeStore().setViewing(Number(animeId)));

  fetchAnime(animeId).then((anime: Anime | null) => {
    if (!anime) return;
    useAnimeStore().setViewing(anime.id);
  });
};

/**
 * Removes the anime with the given ID from the local list of animes.
 *
 * @param { number } animeId - The ID of the anime to remove.
 */
const removeAnime = (animeId: number) => {
  if (!animeId) return;

  useAnimeStore().removeAnime(Number(animeId));
};

/**
 * Adds the user with the given username or ID to the local list of users. If the user is already present,
 * nothing will happen.
 *
 * @param { number | string } user - The ID or username of the user to add.
 */
const addUser = (user: number | string) => {
  if (!user) return;

  fetchUser(user).then((usr: User | null) => {
    console.log("usrr", usr);
    if (!usr) return;
    useUserStore().setViewing(usr.id);
  });
};

/**
 * Removes the user with the given name from the local list or users.
 *
 * @param { string } username - The username of the user to remove.
 */
const removeUser = (username: string) => {
  if (!username) return;

  useUserStore().removeUser(username);
};
