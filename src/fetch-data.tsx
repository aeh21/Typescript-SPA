import { Dispatch, SetStateAction } from 'react';

const getUrlsFromBreed = (dogBreed: string): string[] => {
  const breedList = dogBreed.match(/[^,\s][^,]*[^,\s]*/gu) ?? [];

  const add = [];

  const { filtered, toAdd } = breedList.reduce(
    (
      accumulator: { filtered: string[]; toAdd: string[] },
      current: string,
    ): { filtered: string[]; toAdd: string[] } => {
      const index = accumulator.toAdd.findIndex((string: string): boolean => string === current);
      const concatenatedString = current
        .split(' ')
        .join('')
        .toLowerCase();
      const slashConcatString = current
        .split(' ')
        .join('/')
        .toLowerCase();
      const dashConcatString = current
        .split(' ')
        .join('-')
        .toLowerCase();
      const reversedConcatenatedString = current
        .split(' ')
        .reverse()
        .join('')
        .toLowerCase();
      const reversedSlashJoinedString = current
        .split(' ')
        .reverse()
        .join('/')
        .toLowerCase();
      const reverseDashJoinedString = current
        .split(' ')
        .reverse()
        .join('-')
        .toLowerCase();

      if (index === -1) {
        accumulator.filtered.push(
          `https://dog.ceo/api/breed/${concatenatedString}/images`,
          `https://dog.ceo/api/breed/${slashConcatString}/images`,
          `https://dog.ceo/api/breed/${dashConcatString}/images`,
          `https://dog.ceo/api/breed/${reversedConcatenatedString}/images`,
          `https://dog.ceo/api/breed/${reversedSlashJoinedString}/images`,
          `https://dog.ceo/api/breed/${reverseDashJoinedString}/images`,
        );
      } else {
        accumulator.toAdd.splice(index, 1);
      }

      return accumulator;
    },
    { filtered: [], toAdd: Array.from(add) },
  );

  const urls = Array.from(new Set([...filtered, ...toAdd]));

  return urls;
};

export const fetchURLS = (
  dogBreed: string | undefined,
  setDogList: Dispatch<SetStateAction<string[]>>,
  setError: Dispatch<SetStateAction<string | undefined>>,
): void => {
  if (dogBreed === undefined) {
    return;
  }

  const urls = getUrlsFromBreed(dogBreed);

  const promises = urls.map(
    async (url: string): Promise<string> =>
      fetch(url)
        .then(
          async (resp: Response): Promise<unknown> => {
            if (!resp.ok) {
              throw new Error(
                'Could not identify a dog in this image. Try a different image.',
              );
            }

            return resp.json();
          },
        )
        .catch((error: unknown): void => {
          setError(error.message);
        }),
  );

  const dogImages: string[] = [];

  Promise.all(promises)
    .then((data: unknown[]): void => {
      const filteredData = data.filter(
        (object: { message: string[]; status: string }): unknown =>
          object !== undefined && object.status === 'success',
      );
      filteredData.map((breed: { message: object }): number[] =>
        Object.values(breed.message).map((url: string): number =>
          dogImages.push(url),
        ),
      );

      if (dogImages.length > 0) {
        setError(undefined);
      }

      return setDogList(dogImages);
    })
    .catch(
      (error: unknown): Error => {
        return error;
      },
    );
};
