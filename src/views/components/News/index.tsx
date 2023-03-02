import { ConnectedProps } from 'react-redux/es/exports';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import { connector } from './redux';
import { ClavaContext } from '../../../config/contexts';
import NewsListElement, { NewsListElementType } from './NewsListElement';
import { showTranslated, translate } from '../../../config/translator';
import { parseParams } from '../../../config/routes';
import ClavaImage from '../ClavaImage';
import Loading from '../Loading';
import { Blog } from '../../../client/api';

const NEWS_LIMIT = 20;

const News: React.FC<ConnectedProps<typeof connector>> = ({
  getNews,
  news,
  loading,
  small,
  bulletins,
  transfers,
  videos,
}) => {
  const { user, l } = useContext(ClavaContext);
  const { feedType, feedId } = useParams();
  const pageNews = useRef(0);
  const onLoad = useCallback(
    (page: number) => {
      if (pageNews.current !== page) {
        pageNews.current = page;
        getNews(
          user.areaOfInterest.id,
          small
            ? 'mixed'
            : (feedType as 'news' | 'transfers' | 'videos' | 'bulletins') ??
                'news',
          page * NEWS_LIMIT,
          NEWS_LIMIT,
        );
      }
    },
    [user, pageNews, getNews, small, feedType],
  );
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
          teamTo: undefined,
          teamFrom: undefined,
          url: `/feed/news/${n.id}`,
        });
      });
      transfers.forEach((t) => {
        its.push({
          id: t.player.id + 100 * t.teamTo.id,
          date: new Date(t.date),
          image: undefined,
          title: `${t.player.givenName} ${t.player.familyName.slice(0, 1)}`,
          type: 'transfers',
          teamTo: t.teamTo,
          teamFrom: t.teamFrom,
          url: undefined,
        });
      });
      videos.forEach((v) => {
        its.push({
          id: v.id,
          image: v.thumbnail,
          date: new Date(v.date),
          title: showTranslated(v.name, l),
          type: 'videos',
          teamTo: undefined,
          teamFrom: undefined,
          url: v.url,
        });
      });
      return its
        .sort((b, a) => a.date.getTime() - b.date.getTime())
        .slice(0, 5);
    }
    return feedType === 'news'
      ? news.map<NewsListElementType>((n) => ({
          id: n.id,
          image: n.picture,
          type: 'news',
          title: showTranslated(n.title, l),
          date: new Date(n.date),
          teamTo: undefined,
          teamFrom: undefined,
          url: `/feed/news/${n.id}`,
        }))
      : feedType === 'videos'
      ? videos.map<NewsListElementType>((v) => ({
          id: v.id,
          image: v.thumbnail,
          type: 'videos',
          title: showTranslated(v.name, l),
          date: new Date(v.date),
          teamTo: undefined,
          teamFrom: undefined,
          url: v.url,
        }))
      : feedType === 'bulletins'
      ? bulletins.map<NewsListElementType>((b) => ({
          id: b.id,
          title: showTranslated(b.name, l),
          type: 'bulletins',
          date: new Date(b.date),
          image: undefined,
          teamTo: undefined,
          teamFrom: undefined,
          url: b.url,
        }))
      : transfers.map<NewsListElementType>((t, i) => ({
          id: i,
          image: undefined,
          date: new Date(t.date),
          title: `${t.player.familyName} ${t.player.givenName}`,
          type: 'transfers',
          teamTo: t.teamTo,
          teamFrom: t.teamFrom,
          url: undefined,
        }));
  }, [small, news, videos, transfers, feedType, bulletins, l]);
  useEffect(() => {
    if (items.length === 0 && !loading) {
      pageNews.current = 0;

      getNews(
        user.areaOfInterest.id,
        small
          ? 'mixed'
          : (feedType as 'news' | 'transfers' | 'videos' | 'bulletins') ??
              'news',
        0,
        NEWS_LIMIT,
      );
    }
  }, [user, items.length, pageNews, getNews, loading, small, feedType]);

  const openNews = useMemo<Blog | undefined>(() => {
    if (feedType === 'news' && feedId && !Number.isNaN(parseInt(feedId, 10))) {
      return news.find((n) => n.id === parseInt(feedId, 10));
    }
    return undefined;
  }, [feedType, news, feedId]);
  if (openNews) {
    return (
      <div className="news">
        <div className="news-header">
          <NavLink to={parseParams({ feedType: 'news' })}>
            <h5>{translate('back', l)}</h5>
          </NavLink>
          {openNews.link && (
            <a href={openNews.link} className="nav-link">
              <h5 className="text-primary">{translate('viewExtern', l)}</h5>
            </a>
          )}
        </div>
        <div className="news-list">
          <div className="news-list-elem">
            {openNews.picture && (
              <ClavaImage image={openNews.picture} width="100%" />
            )}
            {openNews.picture && openNews.picture.caption.indexOf('@') !== -1 && (
              <div className="backdrop">
                <span>{openNews.picture.caption}</span>
              </div>
            )}
            <h6 className="mt-1">{showTranslated(openNews.title, l)}</h6>
            {openNews.summary && <p>{showTranslated(openNews.summary, l)}</p>}
            <p>{showTranslated(openNews.body, l)}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`news ${small ? 'small' : ' '}`}>
      <div className="news-header">
        {small && (
          <NavLink to={parseParams({ feedType: 'news' })}>
            <h5>{translate('featuredNews', l)}</h5>
          </NavLink>
        )}
        {!small && (
          <>
            <NavLink to={parseParams({ feedType: 'news' })}>
              <h5 className={feedType === 'news' ? 'text-primary' : ''}>
                {translate('news', l)}
              </h5>
            </NavLink>
            <NavLink to={parseParams({ feedType: 'transfers' })}>
              <h5 className={feedType === 'transfers' ? 'text-primary' : ''}>
                {translate('Transfers', l)}
              </h5>
            </NavLink>
            <NavLink to={parseParams({ feedType: 'videos' })}>
              <h5 className={feedType === 'videos' ? 'text-primary' : ''}>
                {translate('videos', l)}
              </h5>
            </NavLink>
            <NavLink to={parseParams({ feedType: 'bulletins' })}>
              <h5 className={feedType === 'bulletins' ? 'text-primary' : ''}>
                {translate('bulletins', l)}
              </h5>
            </NavLink>
          </>
        )}
      </div>
      {small ? (
        <div className="news-list">
          {items.map((item) => (
            <NewsListElement
              {...item}
              key={`news-elem-${item.id}-${item.type}`}
            />
          ))}
        </div>
      ) : items.length === 0 ? null : (
        <InfiniteScroll
          pageStart={0}
          initialLoad={false}
          loadMore={onLoad}
          className="news-list"
          hasMore={!loading && items.length >= pageNews.current * NEWS_LIMIT}
          loader={<Loading small />}>
          {items.map((item) => (
            <NewsListElement
              {...item}
              key={`news-elem-${item.id}-${item.type}`}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};
export default connector(News);
// relo ad
