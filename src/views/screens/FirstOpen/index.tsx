import React, { useCallback, useMemo, useState } from 'react';
import { ConnectedProps } from 'react-redux';
import Favorites from './Favorites';
import AoiLang from './AoiLang';
import { AreaOfInterest, Language } from '../../../client/api';
import { LanguageISO } from '../../../config/types';
import { connector } from './redux';
import Logo from '../../components/Logo';

type FirstOpenProps = ConnectedProps<typeof connector> & {
  language: LanguageISO;
  finalCallback: () => void;
};

const FirstOpen: React.FC<FirstOpenProps> = ({
  language,
  finalCallback,
  setAreaOfInterest,
  aoi,
  setLanguageObject,
  languageObject,
  setFavorites,
}) => {
  const [step, setStep] = useState<'aoi' | 'favorites'>('aoi');

  const realLang: LanguageISO = useMemo(
    () => (languageObject ? languageObject.locale : language),
    [language, languageObject],
  );
  const callbackAoi = useCallback(
    (area: AreaOfInterest, lang: Language) => {
      setAreaOfInterest(area);
      setLanguageObject(lang);
      setStep('favorites');
    },
    [setAreaOfInterest, setLanguageObject],
  );
  const callbackFavs = useCallback(
    (favs: number[]) => {
      setFavorites(favs);
      finalCallback();
    },
    [finalCallback, setFavorites],
  );
  return (
    <div className="main first-open align-content-center justify-content-center ">
      <Logo vertical />
      {step === 'aoi' ? (
        <AoiLang callback={callbackAoi} language={realLang} />
      ) : (
        <Favorites
          callback={callbackFavs}
          aoi={aoi?.id ?? -1}
          language={realLang}
        />
      )}
    </div>
  );
};

export default connector(FirstOpen);
