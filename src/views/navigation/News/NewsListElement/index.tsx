import React, { useContext } from 'react';
import { NavLink } from 'reactstrap';
import { IDType } from '../../../../config/types';
import ClavaImage from '../../../components/ClavaImage';
import { File } from '../../../../client/api';
import { formatDate } from '../../../../config/utils';
import { ClavaContext } from '../../../../config/contexts';

export declare type NewsListElementType = {
  type: 'news' | 'transfers' | 'videos';
  id: IDType;
  title: string;
  image: File | undefined;
  date: Date;
};
const NewsListElement: React.FC<NewsListElementType> = ({
  type,
  id,
  title,
  image,
  date,
}) => {
  const { l } = useContext(ClavaContext);
  return (
    <NavLink
      to={`/${type}/${id}/${encodeURI(title)}`}
      className="news-list-elem">
      {image && <ClavaImage image={image} width="100%" />}
      <h3>{title}</h3>
      <small>{formatDate(date, l, false, false, true)}</small>
    </NavLink>
  );
};
export default NewsListElement;
// rel
