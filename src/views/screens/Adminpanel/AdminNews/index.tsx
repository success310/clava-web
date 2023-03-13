import { ConnectedProps } from 'react-redux';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router';
import { ClavaContext } from '../../../../config/contexts';
import { connector } from './redux';
import EditCreateNews from './EditCreate';
import { Blog, BlogCreate } from '../../../../client/api';

const AdminpanelNews: React.FC<ConnectedProps<typeof connector>> = ({
  news,
  newses,
  patchNews,
  getNews,
  aois,
  getAois,
  createNews,
  deleteNews,
  status,
  searching,
  searchNews,
}) => {
  const { l } = useContext(ClavaContext);
  const { adminMethod, adminElemId } = useParams();
  const [selectedNews, setSelectedNews] = useState<Blog>();
  const [method, setMethod] = useState<string>(adminMethod ?? 'search');
  useEffect(() => {
    if (aois.length === 0) getAois();
  }, [aois]);
  const submitted = useRef(false);
  const success = useRef(false);
  useEffect(() => {
    if (submitted.current && news) {
      success.current = true;
      setSelectedNews(news);
    }
  }, [news]);
  const createNewsCont = useCallback(
    (n: BlogCreate) => {
      submitted.current = true;
      createNews(n);
    },
    [createNews],
  );
  return (
    <div>
      <fieldset className={`form ${method === 'search' ? 'open' : 'close'}`}>
        {success.current && <span className="text-success">Success</span>}
        <EditCreateNews onSubmit={createNewsCont} selectedNews={selectedNews} />
      </fieldset>
    </div>
  );
};

export default connector(AdminpanelNews);
// rel
