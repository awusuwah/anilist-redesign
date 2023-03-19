/**
 * An anime as returned from the anilist api.
 */
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

/**
 * A user as returned from the anilist api.
 */
export type User = {
  id: number;
  name: string;
  avatar: {
    large: string;
  };
  donatorBadge: string;
  statistics: {
    anime: {
      count: number;
      minutesWatched: number;
      genrePreview: [
        genre: {
          genre: string;
          count: number;
        }
      ];
    };
    manga: {
      count: number;
      minutesWatched: number;
    };
  };
};

/**
 * A character from an anime as returned from the anilist api.
 */
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

/**
 * The response from the anilist api when requesting an anime.
 */
export type ResponseAnime = {
  Media: Anime;
};

/**
 * The response from the anilist api when requesting a user.
 */
export type ResponseUser = {
  User: User;
};
