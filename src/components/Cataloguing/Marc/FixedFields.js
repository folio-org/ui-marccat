import React from 'react';
import { Tag00X, Tag008, MarcField } from '..';
import type { Props } from '../../../core';
import style from '../Style/style.css';
import { ActionTypes } from '../../../redux/actions/Actions';

class FixedFields extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isPresent008: false,
      expand008: false,
    };
  }

  handleTags008 = (tag) => {
    const { expand008, isPresent008 } = this.state;
    const { dispatch, record } = this.props;
    if (!isPresent008) {
      dispatch({ type: ActionTypes.VALUES_FROM_TAG_008, leader: record.leader.value, code: tag.fixedField.code, typeCode: tag.fixedField.headerTypeCode });
    }
    this.setState({
      expand008: !expand008,
      isPresent008: true
    });
  };

  renderTag00X = (tags) => {
    return (
      <div>
        {tags.map(tag => <Tag00X
          {...this.props}
          readOnly
          tag={tag}
          label={tag.fixedField.code}
          name={tag.fixedField.code}
          value={tag.fixedField.displayValue}
        />)}
      </div>
    );
  }

  renderTag008 = (tag) => {
    const { expand008 } = this.state;
    const { record, data: { settings } } = this.props;
    return (
      <div className={style.controlFieldContainer}>
        <MarcField
          {...this.props}
          readOnly
          withIcon
          label={tag.fixedField.code}
          name={tag.fixedField.code}
          value={settings.currentTag008HeaderType || tag.fixedField.displayValue}
          onClick={() => this.handleTags008(tag)}
        />
        {
          <div className={(expand008) ? style.leaderResultsActive : style.leaderResults}>
            <Tag008
              {...this.props}
              leaderCode={record.leader.code}
              leaderValue={record.leader.value}
            />
          </div>
        }
      </div>
    );
  };

  render() {
    const { fidexFields } = this.props;
    let fixedFieldsxxx = fidexFields.filter(f => f.code === '001' || f.code === '003' || f.code === '005');
    fixedFieldsxxx = Object.values(fixedFieldsxxx.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}));
    const fixedFields008 = fidexFields.filter(f => f.code === '008');
    return (
      <React.Fragment>
        {this.renderTag00X(fixedFieldsxxx)}
        {this.renderTag008(fixedFields008[0])}
      </React.Fragment>
    );
  }
}

export default FixedFields;
