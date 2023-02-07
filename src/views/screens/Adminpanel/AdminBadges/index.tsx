import { ConnectedProps } from 'react-redux';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { ClavaContext } from '../../../../config/contexts';
import { translate } from '../../../../config/translator';
import { connector } from './redux';
import SearchInput from '../SearchInput';
import { Badge, BadgeCreate, BadgePatch, User } from '../../../../client/api';
import EditCreateBadge from './EditCreate';
import BadgeSmall from './BadgeSmall';

const AdminpanelBadges: React.FC<ConnectedProps<typeof connector>> = ({
  status,
  badges,
  getBadges,
  patchBadge,
  createBadge,
  searching,
  users,
  removeBadge,
  doSearch,
  giveBadge,
}) => {
  const { l } = useContext(ClavaContext);
  const { adminMethod, adminElemId } = useParams();
  const [method, setMethod] = useState<string>(adminMethod ?? 'search');
  const [query, setQuery] = useState('');
  const [selectedBadge, setSelectedBadge] = useState<Badge>();
  const [selectedUser, setSelectedUser] = useState<User>();
  const isCreating = useRef(false);
  const first = useRef(true);
  const isDownloading = useRef(false);
  const timeout = useRef<number>(-1);

  useEffect(() => {
    if (badges.length === 0 && status === 'idle' && first.current) {
      first.current = false;
      getBadges();
    }
    if (badges.length && !!adminElemId) {
      setSelectedBadge(badges.find((b) => b.badgeType === adminElemId));
    }
    if (
      badges.length &&
      isDownloading.current &&
      method === 'create' &&
      status === 'idle'
    ) {
      isDownloading.current = false;
      setMethod('search');
    }
  }, [adminElemId, badges, getBadges, method, status]);
  const reset = useCallback(() => {
    setSelectedBadge(undefined);
  }, []);
  const toggleCreate = useCallback(() => {
    reset();
    setMethod((m) => (m === 'create' ? 'search' : 'create'));
  }, [reset]);
  const toggleSearch = useCallback(() => {
    setMethod('search');
  }, []);
  const toggleEdit = useCallback(() => {
    if (selectedBadge) {
      setMethod((m) => (m === 'edit' ? 'search' : 'edit'));
    } else {
      reset();
      setMethod('search');
    }
  }, [reset, selectedBadge]);

  const onEdit = useCallback(
    (badgePatch: BadgePatch) => {
      if (selectedBadge) {
        isDownloading.current = true;
        patchBadge(selectedBadge.badgeType, badgePatch);
      }
    },
    [patchBadge, selectedBadge],
  );
  const onCreate = useCallback(
    (badgeCreate: BadgeCreate) => {
      isCreating.current = true;
      createBadge(badgeCreate);
    },
    [createBadge],
  );
  const onSearch = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQuery(q);
      timeout.current = window.setTimeout(() => {
        doSearch(q);
      }, 500);
    },
    [doSearch],
  );
  const selectedUserHasBadge = useMemo(() => {
    if (!selectedUser || !selectedBadge) return false;
    return !!selectedUser.badges.find(
      (b) => b.badge.badgeType === selectedBadge.badgeType,
    );
  }, [selectedUser, selectedBadge]);
  const onGiveBadge = useCallback(() => {
    if (selectedBadge && selectedUser) {
      if (selectedUserHasBadge) {
        removeBadge({
          badgeType: selectedBadge.badgeType,
          userId: selectedUser.id,
        });
      } else {
        giveBadge({
          badgeType: selectedBadge.badgeType,
          userId: selectedUser.id,
        });
      }
    }
  }, [
    selectedBadge,
    selectedUser,
    selectedUserHasBadge,
    removeBadge,
    giveBadge,
  ]);
  return (
    <div>
      <fieldset className={`form ${method === 'search' ? 'open' : 'close'}`}>
        <button className="form-toggler" onClick={toggleSearch} type="button">
          <h6>{`${translate('availableBadges', l)} ${badges.length}`}</h6>
          <FontAwesomeIcon
            icon={method === 'search' ? faChevronUp : faChevronDown}
          />
        </button>
        <div className="badges">
          {badges.map((b) => (
            <BadgeSmall
              badge={b}
              key={`badge-${b.badgeType}`}
              onPress={setSelectedBadge}
              selected={b.badgeType === selectedBadge?.badgeType}
            />
          ))}
        </div>
        <SearchInput
          value={query}
          onChange={onSearch}
          label="searchUsers"
          isFocused={method === 'search'}
          selectedItem={selectedUser}
          name="searchUsers"
          onSelect={setSelectedUser}
          items={users}
          searching={searching}
        />
        {selectedBadge && (
          <div className="options">
            <Button color="primary" onClick={toggleEdit}>
              {translate('editBadge', l)}
            </Button>
            {selectedUser && (
              <Button
                color={selectedUserHasBadge ? 'danger' : 'primary'}
                onClick={onGiveBadge}>
                {translate(
                  selectedUserHasBadge ? 'giveBadge' : 'removeBadge',
                  l,
                )}
              </Button>
            )}
          </div>
        )}
      </fieldset>
      <fieldset className={`form ${method === 'create' ? 'open' : 'close'}`}>
        <button className="form-toggler" onClick={toggleCreate} type="button">
          <h6>{translate('createBadge', l)}</h6>
          <FontAwesomeIcon
            icon={method === 'create' ? faChevronUp : faChevronDown}
          />
        </button>
        {method === 'create' && (
          <EditCreateBadge
            onSubmit={onCreate}
            selectedBadge={undefined}
            notAvailableTypes={badges.map((b) => b.badgeType)}
          />
        )}
      </fieldset>
      <fieldset
        className={`form ${selectedBadge ? '' : 'disabled'} ${
          method === 'edit' ? 'open' : 'close'
        }`}>
        <button className="form-toggler" onClick={toggleEdit} type="button">
          <h6>
            {translate('editBadge', l) +
              (selectedBadge ? ` [${selectedBadge.badgeType}]` : '')}
          </h6>
          <FontAwesomeIcon
            icon={method === 'edit' ? faChevronUp : faChevronDown}
          />
        </button>
        {!!selectedBadge && (
          <EditCreateBadge
            onSubmit={onEdit}
            selectedBadge={selectedBadge}
            notAvailableTypes={badges.map((b) => b.badgeType)}
          />
        )}
      </fieldset>
    </div>
  );
};

export default connector(AdminpanelBadges);
// rel oa
