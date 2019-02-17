import React from 'react';
import { Tag00X, Tag008, MarcField } from '..';
import type { Props } from '../../../core';
import style from '../Style/style.css';
import { ActionTypes } from '../../../redux/actions/Actions';

class FixedFields extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      tag008: false,
      isPresent008: false,
      expand008: false,
      fixedFields: [],
    };
  }

  // eslint-disable-next-line react/no-unused-state
  checkTag008 = c => { if (c === '008') this.setState({ tag008: true }); };


  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    const { record } = this.props;
    const fixedField = [];
    record.fields
      .filter(f => f.fixedField !== undefined)
      .forEach(f => fixedField.push(f));
    this.setState({
      fixedFields: fixedField
    });

    fixedField.forEach(f => {
      this.checkTag008(f.fixedField.code);
    });
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
    const { record } = this.props;
    return (
      <div className={style.controlFieldContainer}>
        <MarcField
          {...this.props}
          readOnly
          withIcon
          label={tag.fixedField.code}
          name={tag.fixedField.code}
          value={tag.fixedField.displayValue}
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
    const { fixedFields } = this.state;
    const fixedFieldsxxx = fixedFields.filter(f => f.fixedField.code === '001' || f.fixedField.code === '003' || f.fixedField.code === '005');
    const fixedFields008 = fixedFields.filter(f => f.fixedField.code === '008')[0];
    return (
      <React.Fragment>
        {this.renderTag00X(fixedFieldsxxx)}
        {this.renderTag008(fixedFields008)}
      </React.Fragment>
    );
  }
}

export default FixedFields;
