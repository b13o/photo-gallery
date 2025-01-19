import { fetchPhotoDetail, fetchRandomPhotos } from "@/utils/api";
import { wrapPromise } from "@/utils/suspense";
import { useMemo } from "react";

// カテゴリー用のカスタムフック
export const useCategoryPhotoResource = (category: string) => {
  return useMemo(() => {
    return wrapPromise(fetchRandomPhotos(category));
  }, [category]);
};

// 詳細用のカスタムフック
export const usePhotoDetailResource = (photoId: string) => {
  return useMemo(() => {
    return wrapPromise(fetchPhotoDetail(photoId));
  }, [photoId]);
};
