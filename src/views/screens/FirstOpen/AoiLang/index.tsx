import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ConnectedProps } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons';
import {
  AreaOfInterest,
  Language,
  LanguageLocaleEnum,
  User,
} from '../../../../client/api';
import { showTranslated, translate } from '../../../../config/translator';
import Loading from '../../../components/Loading';
import { IDType, LanguageISO } from '../../../../config/types';
import { connector } from './redux';
import ClavaPicker from '../../../components/Form/ClavaPicker';
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
      <Row className="mb-3">
        <Col xs={12}>
          <h4 className="text-center">{translate('first_open', realLang)}</h4>
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          md={6}
          className="align-items-center justify-content-center">
          <div className="spacer" />

          <Row>
            <h5 className="text-center">
              {translate('chooseLanguage', realLang)}
            </h5>
          </Row>

          {languages.length === 0 ? (
            <Loading small />
          ) : (
            <Row className="align-items-center justify-content-center">
              <Col xs={12} md={4}>
                <ClavaPicker
                  itemsTranslatable={languages}
                  value={selectedLanguage?.id}
                  submit={setSelectedLanguage}
                />
              </Col>
            </Row>
          )}
        </Col>

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
                className="text-center"
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

      <div className="position-absolute bottom-0 end-0 m-5 text-center">
        <Button color="transparent" onClick={onContinue}>
          <strong className="text-primary text-center">
            {`${translate('continue', realLang)} `}
          </strong>
          <FontAwesomeIcon icon={faChevronRight} className="text-primary" />
        </Button>
      </div>
    </ClavaContext.Provider>
  );
};

export default connector(AoiLang);

// asf
