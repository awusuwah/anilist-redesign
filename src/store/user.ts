import { defineStore } from "pinia";
import { type User } from "~/types/anilist";

/**
 * The store which contains information about the users.
 */
export const useUserStore = defineStore("user", {
  state: (): State => ({
    users: [],
    viewing: null,
  }),
  getters: {
    /**
     * Get a specific user by either it's id or username from the store. If the user is not found, null is returned.
     *
     * @param { State } state - The current state of the store.
     */
    getUserByIdOrName: (state: State): ((userId: number | string) => User | null) => {
      return (userId: number | string) => {
        if (typeof userId === "number") {
          return state.users.find((user: User) => user.id === userId) || null;
        }

        return state.users.find((user: User) => user.name === userId) || null;
      };
    },

    /**
     * Get every user from the store.
     *
     * @param { State } state - The current state of the store.
     */
    getAllUsers: (state: State): (() => User[]) => {
      return () => state.users;
    },

    /**
     * Get the user that is currently being viewed.
     *
     * @param { State } state - The current state of the store.
     */
    getViewing: (state: State): (() => User | null) => {
      return () => state.users.find((user: User) => user.id === state.viewing) || null;
    },
  },
  actions: {
    /**
     * Set the users in the store. Any user that is already in the store will be overwritten.
     *
     * @param { User[] } users - The users to store in the store.
     */
    setUsers(users: User[]) {
      this.users = users;

      // Store the users in the localStorage
      localStorage.setItem("users", JSON.stringify(users));
    },

    /**
     * Store a user in the store.
     *
     * @param { User } user - The user to store.
     */
    storeUser(user: User) {
      const allUsers = [...this.users, user];
      this.users = allUsers;

      // Store the users in the localStorage
      localStorage.setItem("users", JSON.stringify(allUsers));
    },

    /**
     * Remove a user from the store.
     *
     * @param { number } userId - The id of the user to remove.
     */
    removeUser(userId: number) {
      const remainingUsers = this.users.filter((user: User) => user.id !== userId);
      this.users = remainingUsers;

      // If the `viewing` user is the user that is being removed, set the `viewing` user to the first user in the store.
      // If there are no users left in the store, set the `viewing` user to null.
      this.viewing = userId !== this.viewing ? this.viewing : remainingUsers.length > 0 ? remainingUsers[0].id : null;

      // Store the users in the localStorage
      localStorage.setItem("users", JSON.stringify(remainingUsers));
      localStorage.setItem("viewingUser", JSON.stringify(this.viewing));
    },

    /**
     * Set the user that is currently being viewed.
     *
     * @param { number } userId - The id of the user that is currently being viewed.
     */
    setViewing(userId: number) {
      this.viewing = this.users.find((user: User) => user.id === userId)?.id ? userId : null;

      // Store the viewing user in the localStorage
      localStorage.setItem("viewingUser", JSON.stringify(userId));
    },
  },
});

/** Represent the state of the store */
export type State = {
  users: User[];
  viewing: number | null;
};
