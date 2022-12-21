import React, { useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { faChevronRight, faPlay } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IDType } from '../../../../config/types';
import { File, TeamListElement } from '../../../../client/api';
import { showTranslated } from '../../../../config/translator';
import { ClavaContext } from '../../../../config/contexts';
import ClavaImage from '../../ClavaImage';

export declare type NewsListElementType = {
  type: 'news' | 'transfers' | 'videos' | 'bulletins';
  id: IDType;
  title: string;
  image: File | undefined;
  date: Date;
  teamFrom: TeamListElement | undefined;
  teamTo: TeamListElement | undefined;
  url: string | undefined;
};
const NewsListElement: React.FC<NewsListElementType> = ({
  type,
  id,
  title,
  image,
  teamFrom,
  teamTo,
  url,
  date,
}) => {
  const { l } = useContext(ClavaContext);
  const inner = useMemo(
    () => (
      <>
        {image && <ClavaImage image={image} width="100%" />}
        <div
          className={
            (type === 'transfers' && !!teamFrom && teamTo) ||
            type === 'bulletins'
              ? ''
              : 'backdrop'
          }>
          <h6>{title}</h6>
        </div>
        {type === 'videos' && (
          <FontAwesomeIcon icon={faPlay} className="video-play" />
        )}
        {type === 'transfers' && !!teamFrom && teamTo && (
          <div className="transfer">
            <div>
              <ClavaImage image={teamFrom.thumb} width="40px" />
              <span>{showTranslated(teamFrom.name, l)}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <div>
              <span>{showTranslated(teamTo.name, l)}</span>
              <ClavaImage image={teamTo.thumb} width="40px" />
            </div>
          </div>
        )}
      </>
    ),
    [image, l, teamFrom, teamTo, title, type],
  );
  if (url && url.indexOf('http') === -1)
    return (
      <NavLink to={url} className="news-list-elem">
        {inner}
      </NavLink>
    );
  if (url) {
    return (
      <a href={url} target="_blank" className="news-list-elem" rel="noreferrer">
        {inner}
      </a>
    );
  }
  return <div className="news-list-elem">{inner}</div>;
};
export default NewsListElement;
//  rel
