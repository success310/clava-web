import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { fetchAois } from '../../../../store/actions/aoiActions';
import { performAction } from '../../../../store/actions/all';
import { fetchLanguages } from '../../../../store/actions/languageActions';
import { RootState } from '../../../../store';

const mapper = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getAois: () => {
    performAction({ f: fetchAois, p: [dispatch] });
  },
  getLangs: () => {
    performAction({ f: fetchLanguages, p: [dispatch] });
  },
});

const props = (state: RootState) => ({
  aois: state.aois.value,
  aoisError: state.aois.error,
  aoisStatus: state.aois.status,
  languages: state.languages.value,
  languagesError: state.languages.error,
  languagesStatus: state.languages.status,
});

export const connector = connect(props, mapper);
