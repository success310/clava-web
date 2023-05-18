import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ConnectedProps } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import {
  AreaOfInterest,
  Language,
  LanguageLocaleEnum,
  User,
} from '../../../../client/api';
import { showTranslated, Translatable, translate } from '../../../../config/translator';
import Loading from '../../../components/Loading';
import { IDType, LanguageISO } from '../../../../config/types';
import { connector } from './redux';
import { ClavaContext } from '../../../../config/contexts';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const trentDark = require('../../../../assets/images/trentino-white.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const southDark = require('../../../../assets/images/south-tyrol-white.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const trent = require('../../../../assets/images/trentino.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const south = require('../../../../assets/images/south-tyrol.png');

export declare type FirstOpenAoiLangViewProps = ConnectedProps<
  typeof connector
>;

type FirstOpenAoiLangProps = FirstOpenAoiLangViewProps & {
  language: LanguageISO;
  callback: (aoi: AreaOfInterest, lang: Language) => void;
};

type MySelectorProps<T extends Translatable> = {
  items: T[];
  onChange: (value: T | undefined) => void;
  l: LanguageLocaleEnum;
  value: number | undefined;
};

function ClavaSelector<T extends Translatable>({
  items,
  onChange,
  value,
  l
}: MySelectorProps<T>) {
  return (
  <Row>
    {
      items.map(item => (
        <Col key={item.id}>
          <Button
            color={value === item.id ? 'primary' : 'secondary'}
            onClick={() => onChange(item)}
          >
            <span>{'name' in item && showTranslated(item.name, l)}</span>
          </Button>
        </Col>
      ))
    }
  </Row>
  );
};

const AoiButton: React.FC<{
  aoi: AreaOfInterest;
  onSelect: (id: IDType) => void;
  l: LanguageLocaleEnum;
  selected: IDType;
}> = ({ aoi, selected, onSelect, l }) => {
  const onPress = useCallback(() => {
    onSelect(aoi.id);
  }, [aoi.id, onSelect]);
  return (
    <Button
      color={selected === aoi.id ? 'primary' : 'secondary'}
      onClick={onPress}
      size="lg"
      className="py-2 px-5">
      <img
        src={aoi.key === 'south-tyrol' ? southDark : trentDark}
        width={100}
        alt={showTranslated(aoi.name, l)}
      />
      <br />
      <span>{showTranslated(aoi.name, l)}</span>
    </Button>
  );
};

const AoiLang: React.FC<FirstOpenAoiLangProps> = ({
  callback,
  language,
  getLangs,
  getAois,
  aois,
  languages,
}) => {
  const [selected, setSelected] = useState<number>(-1);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>();
  useEffect(() => {
    if (aois.length === 0) {
      getAois();
    }
    if (languages.length === 0) {
      getLangs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (languages.length) {
      setSelectedLanguage(languages.find((l) => l.locale === language));
    }
  }, [languages, language]);
  const realLang: LanguageLocaleEnum = useMemo(
    () => (selectedLanguage ? selectedLanguage.locale : language),
    [language, selectedLanguage],
  );
  const onContinue = useCallback(() => {
    if (selected !== -1) {
      callback(
        aois.filter((aoi) => aoi.id === selected)[0],
        selectedLanguage ||
        (languages.find((l) => l.locale === language) as Language),
      );
    }
  }, [aois, callback, language, languages, selected, selectedLanguage]);
  const onSelectAoi = useCallback((id: IDType) => {
    setSelected(id);
  }, []);
  const contextValue = useMemo(
    () => ({ l: realLang, aoi: -1, user: {} as User }),
    [realLang],
  );
  return (
    <ClavaContext.Provider value={contextValue}>
      {/* title */}
      <Row className="mb-3">
        <Col xs="12">
          <p className="text-secondary">{translate('first_open_title', realLang)}</p>
          <h5 className="mb-5">{translate('first_open_settings_title', realLang)}</h5>
        </Col>
      </Row>

      {/* selecting language */}
      <Row className="mb-3">
        <Col xs="12">
          <p className="mb-5">
            {translate('first_open_settings_description', realLang)}
          </p>
          <p>{translate('first_open_settings_language_label', realLang)}</p>
          {
            languages.length === 0 ?
              (<Loading small />) :
              (
                <ClavaSelector
                  items={languages}
                  value={selectedLanguage?.id}
                  onChange={setSelectedLanguage}
                  l={realLang}
                />
              )
          }
        </Col>
      </Row>

      {/* selecting province */}
      <Row className="mb-5">
        <Col
          xs={12}
          md={6}
          className="align-items-center justify-content-center mt-3 mt-sm-0 aoi-buttons">
          <Row>
            <h5 className="text-center">
              {translate('chooseProvince', realLang)}
            </h5>
          </Row>
          <Row>
            {aois.map((aoi) => (
              <Col
                xs={12}
                md={6}
                className="text-center w-50"
                key={`aoi-${aoi.key}`}>
                <AoiButton
                  aoi={aoi}
                  selected={selected}
                  onSelect={onSelectAoi}
                  l={realLang}
                />
              </Col>
            ))}
          </Row>
          {aois.length === 0 && <Loading small />}
        </Col>
      </Row>

      {/* button */}
      <Row>
        <Button color=" bg-primary w-100 mb-3" onClick={onContinue}>
          <strong className="text-center">
            {`${translate('continue', realLang)} `}
          </strong>
        </Button>
        <Button color=" w-100 bg-white" onClick={onContinue}>
          <strong className="text-primary text-center">
            {`${translate('back', realLang)} `}
          </strong>
        </Button>
      </Row>
    </ClavaContext.Provider>
  );
};

export default connector(AoiLang);

// asf
