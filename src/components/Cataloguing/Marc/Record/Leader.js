// @flow
import * as React from 'react';
import { isEmpty, last } from 'lodash';
import { connect } from 'react-redux';
import { Row, Col } from '@folio/stripes/components';
import type { Props } from '../../../../flow/types.js.flow';
import MarcField from '../Form/Components/Field';
import { EMPTY_SPACED_STRING, SEPARATOR } from '../../../../config/constants';
import { decamelizify } from '../../../../shared/utils/Function';
import style from '../../Style/index.css';
import { change008ByLeaderAction } from '../../Actions';
import HeaderTypeSelect from './components/HeaderTypeSelect';
import { ACTION } from '../../../../redux/actions/Actions';

type P = {
  readOnly: boolean,
  leaderData: Object,
  leaderCode: string,
  leaderValue: string,
} & Props;

type S = {
  leaderDataDispatched: boolean,
  leaderCss: boolean,
  leaderVal: string,
  leaderChangedFor008: boolean
};

class Leader extends React.PureComponent<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      leaderCss: false,
      leaderVal: props.leaderValue,
      firsAccess: true,
    };
  }

  /**
   *
   * @param {*} string - a current leader
   * @param {*} index - index to replace
   * @param {*} replace - a mutate leader
   */
  replaceAt(string, index, replaceValue) {
    const { dispatch, change, set008HeaderType } = this.props;
    const leaderVal = string.substring(0, index) + replaceValue + string.substring(index + 1);
    dispatch(change('leader', leaderVal));
    if (index === 6 || index === 7) {
      set008HeaderType(leaderVal);
    }
  }


  handleChange = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const { leaderVal } = this.state;
    const selectedValue = e.target.value;
    const selectedName = last((e.target.id).split(SEPARATOR));
    switch (selectedName) {
    case 'itemRecordStatusCode': this.replaceAt(leaderVal, 5, selectedValue); break;
    case 'itemRecordTypeCode': this.replaceAt(leaderVal, 6, selectedValue); break;
    case 'itemBibliographicLevelCode': this.replaceAt(leaderVal, 7, selectedValue); break;
    case 'itemControlTypeCode': this.replaceAt(leaderVal, 8, selectedValue); break;
    case 'characterCodingSchemeCode': this.replaceAt(leaderVal, 9, selectedValue); break;
    case 'encodingLevel': this.replaceAt(leaderVal, 17, selectedValue); break;
    case 'descriptiveCataloguingCode': this.replaceAt(leaderVal, 18, selectedValue); break;
    case 'linkedRecordCode': this.replaceAt(leaderVal, 19, selectedValue); break;
    default: break;
    }
  }

  getNormalizedLeader = ({ ...props }) => {
    const { leaderData } = props;
    if (isEmpty(leaderData)) {
      return false;
    }
    return Object.keys(leaderData.results).map((key) => leaderData.results[key]);
  }

  render() {
    const { leaderCss, firsAccess } = this.state;
    const { leaderValue, dispatch, change, leaderData, headerTypeCodeFromLeader } = this.props;
    dispatch(change('Tag008', headerTypeCodeFromLeader));
    if (firsAccess && !isEmpty(leaderData)) Object.values(leaderData.results).map(k => dispatch(change('Leader-'.concat(k.name), k.defaultValue)));

    return (
      <div className={style.fieldContainer} no-padding>
        <MarcField
          {...this.props}
          readOnly
          label="leader"
          name="leader"
          value={leaderValue}
          onClick={() => {
            this.setState({ leaderCss: !leaderCss, firsAccess: false });
          }}
        />
        {!isEmpty(leaderData) &&
          <div className={(leaderCss) ? style.leaderResultsActive : style.leaderResults}>
            <Row>
              {Object.values(leaderData.results).map((item, idx) => (
                <Col xs={4} key={idx}>
                  <HeaderTypeSelect
                    {...this.props}
                    name={'Leader-'.concat(item.name)}
                    label={decamelizify(item.name, EMPTY_SPACED_STRING)}
                    dataOptions={item.dropdownSelect}
                    onChange={this.handleChange}
                  />
                </Col>
              ))}
            </Row>
          </div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { headerTypeValues008 } = state.marccat.data;
  return {
    headerTypeCodeFromLeader: (headerTypeValues008) ? headerTypeValues008.results.headerTypeCode : undefined
  };
};

const mapDispatchToProps = dispatch => ({
  set008HeaderType: leader => dispatch(change008ByLeaderAction(leader)),
});

export default (connect(mapStateToProps, mapDispatchToProps)((Leader)));
