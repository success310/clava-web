import React from 'react';
import { NavLink } from 'reactstrap';
import { IDType } from '../../../../config/types';
import ClavaImage from '../../../components/ClavaImage';
import { File } from '../../../../client/api';

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
}) => (
  <NavLink to={`/${type}/${id}/${encodeURI(title)}`} className="news-list-elem">
    {image && <ClavaImage image={image} width="100%" />}
    <div className="backdrop">
      <h6>{title}</h6>
    </div>
  </NavLink>
);
export default NewsListElement;
// r  el
