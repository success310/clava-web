import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Button, Col, FormGroup, Label, Row} from 'reactstrap';
import {ConnectedProps} from "react-redux";
import {faAdd, faTrash, faUndo} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LeagueCategoryEnum, LeagueRatingEnum, TeamListElement,} from '../../../../../client/api';
import {translate} from '../../../../../config/translator';
import ClavaPicker from '../../../../components/Form/ClavaPicker';
import CheckboxInput from '../../CheckboxInput';
import TextInput from '../../TextInput';
import {ClavaContext} from '../../../../../config/contexts';
import {IDType} from '../../../../../config/types';
import {connector} from "./redux";
import TeamName from "../../../../components/Team/TeamName";
import Loading from "../../../../components/Loading";
import SearchInput from "../../SearchInput";

type TeamRowProps = {
    team: TeamListElement;
    onClick: (id: IDType) => void;
    deleted: boolean;
};

const TeamRow: React.FC<TeamRowProps> = ({team, onClick, deleted}) => {
    const onClickDelete = useCallback(() => {
        onClick(team.id);
    }, [onClick, team]);
    return (
        <Col xs={12} sm={6} className={`even-even-odd ${deleted ? "text-live text-decoration-line-through" : ""}`}>
            <Row>
                <Col xs={8} className="d-flex justify-content-center flex-column">
                    <TeamName team={team} live={deleted}/>
                </Col>
                <Col xs={4}>
                    <Button color="transparent" onClick={onClickDelete}>
                        <FontAwesomeIcon
                            icon={deleted ? faUndo : faTrash}
                            className="text-danger"
                        />
                    </Button>
                </Col>
            </Row>
        </Col>
    );
}


const EditCreateLeague: React.FC<ConnectedProps<typeof connector>> = ({
                                                                          teamsResult, searchTeam,
                                                                          selectedLeague,
                                                                          onSubmit,
                                                                          aois,
                                                                          statusSearch,
                                                                          teams,
                                                                          statusTeams, getTeams,
                                                                          status,
                                                                          addTeamsToLeague, removeTeamFromLeague,
                                                                      }) => {
    const {l} = useContext(ClavaContext);
    const [textDE, setTextDE] = useState(selectedLeague?.name.textDE ?? '');
    const [textIT, setTextIT] = useState(selectedLeague?.name.textIT ?? '');
    const [textEN, setTextEN] = useState(selectedLeague?.name.textEN ?? '');
    const [category, setCategory] = useState<LeagueCategoryEnum>(
        selectedLeague?.category ?? LeagueCategoryEnum.LEAGUE,
    );
    const [deletedTeams, setDeletedTeams] = useState<IDType[]>([]);
    const [teamQuery, setTeamQuery] = useState('');
    const [foundTeam, onFoundTeam] = useState<TeamListElement>();
    const [addedTeams, setAddedTeams] = useState<TeamListElement[]>([]);
    const addTeam = useCallback(() => {
        if (foundTeam) {
            setAddedTeams(at => at.concat([foundTeam]));
        }
    }, [foundTeam]);
    const searchTimeout = useRef(0);
    const onSearchTeam = useCallback((t: string) => {
        window.clearTimeout(searchTimeout.current);
        setTeamQuery(t);
        searchTimeout.current = window.setTimeout(() => {
            searchTeam(t);
        }, 300);
    }, [searchTeam]);

    const teamsOfLeague = useMemo(() => {
        if (!teams)
            return undefined;
        return teams.response;
    }, [teams]);
    const selectedTeams = useMemo(() => {
        if (teamsOfLeague)
            return teamsOfLeague.concat(addedTeams);
        return addedTeams;
    }, [teamsOfLeague, addedTeams]);
    const message = useRef<string>();
    useEffect(() => {
        if (selectedLeague) {
            if (!teamsOfLeague && statusTeams !== 'loading') {
                getTeams(selectedLeague.id);
            }
        }
    }, [statusTeams, selectedLeague, getTeams, teamsOfLeague]);
    const [tableRating, setTableRating] = useState<LeagueRatingEnum>(
        selectedLeague?.tableRating ?? LeagueRatingEnum.SOUTHTYROL,
    );
    const [matchDays, setMatchDays] = useState(selectedLeague?.matchDays ?? 1);
    const [main, setMain] = useState<boolean>(selectedLeague?.main ?? true);
    const [areaOfInterestIds, setAreaOfInterestIds] = useState<IDType[]>(
        selectedLeague?.areasOfInterest?.map((a) => a.id) ?? [],
    );
    const [year, setYear] = useState(selectedLeague?.year ?? 2023);
    const pickerItems = useMemo(() => [
        {
            key: LeagueCategoryEnum.LEAGUE,
            label: translate(LeagueCategoryEnum.LEAGUE, l),
            value: LeagueCategoryEnum.LEAGUE,
        },
        {
            key: LeagueCategoryEnum.CUP,
            label: translate(LeagueCategoryEnum.CUP, l),
            value: LeagueCategoryEnum.CUP,
        },
        {
            key: LeagueCategoryEnum.YOUTH,
            label: translate(LeagueCategoryEnum.YOUTH, l),
            value: LeagueCategoryEnum.YOUTH,
        },
        {
            key: LeagueCategoryEnum.VSS_YOUTH,
            label: translate(LeagueCategoryEnum.VSS_YOUTH, l),
            value: LeagueCategoryEnum.VSS_YOUTH,
        },
        {
            key: LeagueCategoryEnum.VSS_FREE_TIME,
            label: translate(LeagueCategoryEnum.VSS_FREE_TIME, l),
            value: LeagueCategoryEnum.VSS_FREE_TIME,
        },
        {
            key: LeagueCategoryEnum.VIENNA,
            label: translate(LeagueCategoryEnum.VIENNA, l),
            value: LeagueCategoryEnum.VIENNA,
        },
        {
            key: LeagueCategoryEnum.WOMEN,
            label: translate(LeagueCategoryEnum.WOMEN, l),
            value: LeagueCategoryEnum.WOMEN,
        },
    ], [l]);
    const onSubmitCont = useCallback(() => {
        if (areaOfInterestIds.length !== 0) {
            if (selectedLeague) {
                const reallyAdded = addedTeams.filter(aT => deletedTeams.indexOf(aT.id) === -1);
                if (reallyAdded.length !== 0) {
                    addTeamsToLeague(selectedLeague.id, reallyAdded.map(aT => aT.id));
                }
                if (deletedTeams.length !== 0) {
                    removeTeamFromLeague(selectedLeague.id, deletedTeams);
                }
            }
            onSubmit({
                name: {
                    textEN,
                    textIT,
                    textDE,
                },
                year,
                category,
                main,
                tableRating,
                areaOfInterestIds,
                matchDays,
            });
            setTimeout(() => {
                setAddedTeams([]);
                setDeletedTeams([]);
                message.current = "success";
                if (selectedLeague)
                    getTeams(selectedLeague.id);
            }, 1000);
        }
    }, [addTeamsToLeague, addedTeams, areaOfInterestIds, category, deletedTeams, main, matchDays, onSubmit, removeTeamFromLeague, selectedLeague, tableRating, textDE, textEN, textIT, year]);
    const setTableRatingCont = useCallback((val: string) => {
        setTableRating(val as LeagueRatingEnum);
    }, []);
    const setLeagueCategoryCont = useCallback((val: string) => {
        setCategory(val as LeagueCategoryEnum);
    }, []);
    const onDeleteTeam = useCallback((id: IDType) => {
        setDeletedTeams(del => del.indexOf(id) === -1 ? del.concat([id]) : del.filter(d => d !== id));
    }, []);
    return (
        <>
            <TextInput
                value={textDE}
                onChange={setTextDE}
                name="nameDE"
                label="nameDE"
            />
            <TextInput
                value={textIT}
                onChange={setTextIT}
                name="nameIT"
                label="nameIT"
            />
            <TextInput
                value={textEN}
                onChange={setTextEN}
                name="nameEN"
                label="nameEN"
            />
            <FormGroup>
                <Label>{translate('leagueCategory', l)}</Label>
                <ClavaPicker
                    items={pickerItems}
                    value={category}
                    onValueChange={setLeagueCategoryCont}
                />
            </FormGroup>
            <FormGroup>
                <Label>{translate('leagueRating', l)}</Label>
                <ClavaPicker
                    items={[
                        {
                            key: LeagueRatingEnum.SOUTHTYROL,
                            label: translate('southtyrol', l),
                            value: LeagueRatingEnum.SOUTHTYROL,
                        },
                        {
                            key: LeagueRatingEnum.TRENTINO,
                            label: translate('trentino', l),
                            value: LeagueRatingEnum.TRENTINO,
                        },
                    ]}
                    value={tableRating}
                    onValueChange={setTableRatingCont}
                />
            </FormGroup>
            <TextInput
                label="matchDay"
                onChange={setMatchDays}
                value={matchDays}
                name="matchDays"
            />
            <TextInput label="year" onChange={setYear} value={year} name="year"/>
            <CheckboxInput
                label="mainLeague"
                onChange={setMain}
                value={main}
                name="mainLeague"
            />
            {aois.map((aoi) => (
                <CheckboxInput
                    key={`aoi-checkbox-${aoi.id}`}
                    label={aoi}
                    onChange={(checked) => {
                        setAreaOfInterestIds((aoiIds) =>
                            aoiIds
                                .filter((aoiID) => aoiID !== aoi.id)
                                .concat(checked ? [aoi.id] : []),
                        );
                    }}
                    name={`aoi${aoi.id}`}
                    value={areaOfInterestIds.indexOf(aoi.id) !== -1}
                />
            ))}
            {selectedLeague && (
                <Row>
                    <Col xs={12}>{translate('teams', l)}</Col>
                    {statusTeams === 'loading' ? (<Loading small/>) :
                        selectedTeams.map(team => <TeamRow deleted={deletedTeams.indexOf(team.id) !== -1}
                                                           onClick={onDeleteTeam} key={`team-${team.id}`}
                                                           team={team}/>)}
                </Row>
            )}
            <Row>
                <Col xs={8} className="pt-3">
                    <SearchInput
                        onChange={onSearchTeam}
                        searching={statusSearch === 'loading'}
                        onSelect={onFoundTeam}
                        isFocused={!foundTeam && teamQuery.length > 2}
                        selectedItem={foundTeam}
                        name="searchTeam"
                        value={teamQuery}
                        items={teamsResult}/>
                </Col>
                <Col xs={4} className="pt-2">
                    <Button onClick={addTeam} disabled={!foundTeam}>
                        {translate("addTeam", l)}
                        <FontAwesomeIcon icon={faAdd} className="ms-2"/>
                    </Button>
                </Col>
            </Row>
            {message.current && (
                <Row>
                    <Col xs={12}>
                        <span
                            className={message.current === 'success' ? 'text-success' : 'text-danger'}>{translate(message.current === 'success' ? 'saveSuccess' : 'saveFailed', l)}</span>
                    </Col>
                </Row>
            )}
            <Button color="primary" onClick={onSubmitCont}>
                {translate('submit', l)}
            </Button>
        </>
    );
};

export default connector(EditCreateLeague);
// reload
