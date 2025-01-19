import { BasicPhoto, DetailePhoto, SearchPhoto } from "@/types/photo";

const BASE_URL = "https://api.unsplash.com";
const RANDOM_PHOTO_COUNT = 2; // プロダクションでは 4
const SEARCH_PHOTO_COUNT = 2; // プロダクションでは 10
const SEARCH_PHOTO_PAGE = 1;

function getHeaders(): HeadersInit {
  return {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
  };
}

export async function fetchHeroPhoto(category: string): Promise<BasicPhoto> {
  const response = await fetch(
    `${BASE_URL}/photos/random?auto=format&fit=crop&q=80&w=1920&query=${category}`,
    {
      headers: getHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch hero photo");
  }
  return await response.json();
}

export async function fetchRandomPhotos(category = ""): Promise<BasicPhoto[]> {
  const response = await fetch(
    `${BASE_URL}/photos/random?count=${RANDOM_PHOTO_COUNT}&auto=format&fit=crop&q=80&w=300&query=${category}`,
    {
      headers: getHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch random photos");
  }
  return response.json();
}

export async function fetchPhotoDetail(photoId: string): Promise<DetailePhoto> {
  const response = await fetch(
    `${BASE_URL}/photos/${photoId}?auto=format&fit=crop&q=80&w=1920`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch photo details");
  }

  return response.json();
}

// export async function searchPhotos(query: string): Promise<BasicPhoto[]> {
//   const params = new URLSearchParams({
//     query,
//     per_page: SEARCH_PHOTO_COUNT.toString(),
//     page: SEARCH_PHOTO_PAGE.toString(),
//   });

//   const response = await fetch(`${BASE_URL}/search/photos?${params}`, {
//     headers: getHeaders(),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to search photos");
//   }

//   const data: SearchPhoto = await response.json();
//   return data.results;
// }

const cache = new Map();

export function searchPhotos(url: string): Promise<BasicPhoto[]> {
  if (!cache.has(url)) {
    cache.set(url, fetchSearchPhotos(url));
  }
  return cache.get(url);
}

export async function fetchSearchPhotos(query: string): Promise<BasicPhoto[]> {
  const params = new URLSearchParams({
    query,
    per_page: SEARCH_PHOTO_COUNT.toString(),
    page: SEARCH_PHOTO_PAGE.toString(),
  });

  const response = await fetch(`${BASE_URL}/search/photos?${params}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to search photos");
  }

  const data: SearchPhoto = await response.json();
  return data.results;
}
