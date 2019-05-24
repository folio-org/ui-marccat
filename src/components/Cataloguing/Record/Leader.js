// @flow
import * as React from 'react';
import { isEmpty, last } from 'lodash';
import { connect } from 'react-redux';
import { Row, Col } from '@folio/stripes/components';
import HeaderTypeSelect from '../Common/SelectField';
import { EMPTY_SPACED_STRING, SEPARATOR } from '../../../config/constants';
import style from '../Style/index.css';
import { FormField } from '../Common/FormField';
import { decamelizify } from '../../../shared';
import { change008ByLeaderAction } from '../Actions';
import { FIELD_NAME, TAGS_NAME } from '../Utils/MarcConstant';

/**
 *
 *
 * @class Leader
 * @extends {React.PureComponent<P, S>}
 */
function Leader({
  leaderValue,
  leaderData,
  dispatch,
  change,
  set008HeaderType,
  headerTypeCodeFromLeader,
  record,
  ...props
}) {

  /**
  |--------------------------------------------------
  | USES TATE REACT PREFER SETSTATE AND CLASS COMPONENT
  |--------------------------------------------------
  */

  const initialState = {
    leaderCss: false,
    leaderValue: leaderValue || record.leader.value,
    firsAccess: true
  };
  const [state, setState] = React.useState(initialState);


  /**
   *
   * @param {*} string - a current leader
   * @param {*} index - index to replace
   * @param {*} replace - a mutate leader
   */
  const replaceAt = (string, index, replaceValue) => {
    const value = string.substring(0, index) + replaceValue + string.substring(index + 1);
    dispatch(change(TAGS_NAME._008, headerTypeCodeFromLeader || 0));
    dispatch(change(FIELD_NAME.LEADER, value));
    if (index === 6 || index === 7) {
      set008HeaderType(leaderValue);
    }
  };

  const handleOnClick = () => {
    const { leaderCss } = state;
    setState({ leaderCss: !leaderCss, firsAccess: false });
  };

  const handleChange = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const selectedValue = e.target.value;
    const selectedName = last((e.target.id).split(SEPARATOR));
    switch (selectedName) {
    case 'itemRecordStatusCode': replaceAt(leaderValue, 5, selectedValue); break;
    case 'itemRecordTypeCode': replaceAt(leaderValue, 6, selectedValue); break;
    case 'itemBibliographicLevelCode': replaceAt(leaderValue, 7, selectedValue); break;
    case 'itemControlTypeCode': replaceAt(leaderValue, 8, selectedValue); break;
    case 'characterCodingSchemeCode': replaceAt(leaderValue, 9, selectedValue); break;
    case 'encodingLevel': replaceAt(leaderValue, 17, selectedValue); break;
    case 'descriptiveCataloguingCode': replaceAt(leaderValue, 18, selectedValue); break;
    case 'linkedRecordCode': replaceAt(leaderValue, 19, selectedValue); break;
    default: break;
    }
  };

  const { leaderCss, firsAccess } = state;
  const leader = (leaderData && leaderData.results) ? leaderData.results : leaderData;
  if (firsAccess && !isEmpty(leader)) Object.values(leader).map(k => dispatch(change(`${FIELD_NAME.LEADER}-${k.name}`, k.defaultValue)));

  return (
    <div className={style.fieldContainer} no-padding>
      <FormField
        {...props}
        readOnly
        label={FIELD_NAME.LEADER}
        name={FIELD_NAME.LEADER}
        onClick={handleOnClick}
      />
      {!isEmpty(leader) &&
      <div className={(leaderCss) ? style.leaderResultsActive : style.leaderResults}>
        <Row>
          {Object.values(leader).map((item, idx) => (
            <Col xs={4} key={idx}>
              <HeaderTypeSelect
                {...props}
                name={`${FIELD_NAME.LEADER}-${item.name}`}
                label={decamelizify(`${item.name}`, EMPTY_SPACED_STRING)}
                dataOptions={item.dropdownSelect}
                onChange={handleChange}
              />
            </Col>
          ))}
        </Row>
      </div>}
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  set008HeaderType: l => dispatch(change008ByLeaderAction(l)),
});

export default (connect(
  ({ marccat: { data: { headerTypeValues008 } } }) => ({
    headerTypeCodeFromLeader: (headerTypeValues008) ? headerTypeValues008.results.headerTypeCode : undefined,
  }), mapDispatchToProps
)((Leader)));
