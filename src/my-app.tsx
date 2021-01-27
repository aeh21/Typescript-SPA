import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import 'bulma/css/bulma.css';
import './index.css';

import * as mobilenet from '@tensorflow-models/mobilenet';
import * as React from 'react';

import { ImageList } from './components/image-list/image-list';
import { ImagePreview } from './components/image-preview/image-preview';
import { fetchURLS } from './fetch-data';

export const App: React.FC = (): React.ReactElement => {
  const [dogBreed, setDogBreed] = React.useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);
  const [dogList, setDogList] = React.useState<string[]>([]);
  const [modelLoading, setModelLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const handleLoad = async (
    event: React.ChangeEvent<HTMLImageElement>,
  ): Promise<void> => {
    const img = event.target;
    const alpha = 1;
    const version = 2;
    // Load the model with loading status
    setModelLoading(true);
    const model = await mobilenet.load({ alpha, version });

    // Classify the image.
    const predictions = await model.classify(img);
    const breed = predictions[0].className;
    setDogBreed(breed);

    setModelLoading(false);
  };

  React.useEffect((): void => {
    if (modelLoading) {
      setDogList([]);
    }

    fetchURLS(dogBreed, setDogList, setError);
    // Invoke useEffect if there's a change in dogBreedUrl
  }, [dogBreed]);

  return (
    <>
      <ImagePreview
        modelLoading={modelLoading}
        setImageUrl={setImageUrl}
        id="img"
        src={imageUrl}
        onLoad={handleLoad}
        error={error}
        dogBreed={dogBreed}
      />
      <ImageList urlList={dogList} isModelLoading={modelLoading} />
    </>
  );
};
