import { fetchAnime } from "~/utils/fetchData";
import { useAnimeStore } from "~/store/anime";

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
  // If no arguments are passed, do nothing
  if (!animeId) return;

  fetchAnime(Number(animeId)).then(() => useAnimeStore().setCurrentlyViewing(Number(animeId)));
};

/**
 * Removes the anime with the given ID from the local list of animes.
 *
 * @param { number } animeId - The ID of the anime to remove.
 */
const removeAnime = (animeId: number) => {
  // If no arguments are passed, do nothing
  if (!animeId) return;

  useAnimeStore().deleteAnime(Number(animeId));
};
