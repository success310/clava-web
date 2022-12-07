import { ConnectedProps } from 'react-redux/es/exports';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { connector } from './redux';
import { ClavaContext } from '../../../config/contexts';
import NewsListElement, { NewsListElementType } from './NewsListElement';
import { showTranslated, translate } from '../../../config/translator';

const NEWS_LIMIT = 20;

const News: React.FC<ConnectedProps<typeof connector>> = ({
  getNews,
  news,
  loading,
  small,
  transfers,
  videos,
}) => {
  const { user, l } = useContext(ClavaContext);
  const first = useRef(true);
  const pageNews = useRef(0);
  useEffect(() => {
    if (news.length === 0 && !loading) {
      if (pageNews.current !== 0) {
        first.current = true;
        pageNews.current = 0;
      }
      if (first.current) {
        first.current = false;
        getNews(user.areaOfInterest.id, small, 0, NEWS_LIMIT);
      }
    }
  }, [user, news, pageNews, getNews, loading, small]);
  const items = useMemo<NewsListElementType[]>(() => {
    if (small) {
      const its: NewsListElementType[] = [];
      news.forEach((n) => {
        its.push({
          id: n.id,
          image: n.picture,
          type: 'news',
          title: showTranslated(n.title, l),
          date: new Date(n.date),
        });
      });
      transfers.forEach((t) => {
        its.push({
          id: -1,
          date: new Date(t.date),
          image: undefined,
          title: `${t.player.givenName} ${t.player.familyName.slice(
            0,
            1,
          )} -> ${showTranslated(t.teamTo.name, l)}`,
          type: 'transfers',
        });
      });
      videos.forEach((v) => {
        its.push({
          id: v.id,
          image: v.thumbnail,
          date: new Date(v.date),
          title: showTranslated(v.name, l),
          type: 'videos',
        });
      });
      return its
        .sort((b, a) => a.date.getTime() - b.date.getTime())
        .slice(0, 5);
    }
    return news.map<NewsListElementType>((n) => ({
      id: n.id,
      image: n.picture,
      type: 'news',
      title: showTranslated(n.title, l),
      date: new Date(n.date),
    }));
  }, [small, news, videos, transfers, l]);
  return (
    <div className={`news ${small ? 'news-small' : ' '}`}>
      <div className="news-header">
        {small && <h5>{translate('featuredNews', l)}</h5>}
      </div>
      <div className="news-list">
        {items.map((item) => (
          <NewsListElement
            {...item}
            key={`news-elem-${item.id}-${item.type}`}
          />
        ))}
      </div>
    </div>
  );
};
export default connector(News);
