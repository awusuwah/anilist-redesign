import { useAnimeStore } from "~/store/anime";
import { useUserStore } from "~/store/user";

/**
 * Move all the values stored in the localStorage to the store.
 */
export const syncLocalStorageWithStore = () => {
  const anime = JSON.parse(localStorage.getItem("anime") || "[]");
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const viewingAnime = JSON.parse(localStorage.getItem("viewingAnime") || "null");
  const viewingUser = JSON.parse(localStorage.getItem("viewingUser") || "null");

  // Store the information in the store
  const animeStore = useAnimeStore();
  animeStore.setAnime(anime);
  animeStore.setViewing(viewingAnime);

  const userStore = useUserStore();
  userStore.setUsers(users);
  userStore.setViewing(viewingUser);
};
