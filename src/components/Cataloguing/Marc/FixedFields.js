/* eslint-disable react/no-unused-state */
import React from 'react';
import { isEmpty } from 'lodash';
import { Tag00X, Tag006, Tag007, Tag008, MarcField } from '..';
import type { Props } from '../../../core';
import style from '../Style/style.css';
import { ActionTypes } from '../../../redux/actions/Actions';
import { TAGS, EMPTY_MESSAGE } from '../../../utils/Constant';

type P = Props & {

};
class FixedFields extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
      tag006: false,
      tag007: false,
      tag008: false,
      isPresent008: false,
      expand006: false,
      expand007: false,
      expand008: false,
      fixedFields: [],
      tag006Fields: [{}],
      tag007Fields: [{}],
    };
  }

  checkTag006 = c => { if (c === '006') this.setState({ tag006: true }); };
  checkTag007 = c => { if (c === '007') this.setState({ tag007: true }); };
  checkTag008 = c => { if (c === '008') this.setState({ tag008: true }); };

  onAdd = (tag) => {
    const { tag006Fields, tag007Fields } = this.state;
    switch (tag) {
    case TAGS._006: this.setState({ tag006Fields: tag006Fields.concat({}) }); break;
    case TAGS._007: this.setState({ tag007Fields: tag007Fields.concat({}) }); break;
    default: break;
    }
  }

  onDelete = (tag, index) => {
    const { tag006Fields, tag007Fields } = this.state;
    switch (tag) {
    case TAGS._006: this.setState({ tag006Fields: tag006Fields.splice(index, 1) }); break;
    case TAGS._007: this.setState({ tag007Fields: tag007Fields.splice(index, 1) }); break;
    default: break;
    }
  }

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
      this.checkTag006(f.fixedField.code);
      this.checkTag007(f.fixedField.code);
      this.checkTag008(f.fixedField.code);
    });
  }

  handleTags006 = (tag) => {
    const { expand006, tag006 } = this.state;
    const { dispatch, record, headerTypes006Result } = this.props;
    if (isEmpty(headerTypes006Result)) {
      if (!tag006) {
        dispatch({
          type: ActionTypes.HEADER_TYPES_006,
          code: TAGS._006
        });
      } else {
        dispatch({
          type: ActionTypes.VALUES_FROM_TAG_006,
          leader: record.leader.value,
          code: tag.fixedField.code,
          typeCode: tag.fixedField.headerTypeCode
        });
      }
    }
    this.setState({
      expand006: !expand006
    });
  };

  handleTags007 = (tag) => {
    const { expand007, tag007 } = this.state;
    const { dispatch, record, headerTypes007Result } = this.props;
    if (isEmpty(headerTypes007Result)) {
      if (!tag007) {
        dispatch({
          type: ActionTypes.HEADER_TYPES_007,
          code: TAGS._007
        });
      } else {
        dispatch({
          type: ActionTypes.VALUES_FROM_TAG_007,
          leader: record.leader.value,
          code: tag.fixedField.code,
          typeCode: tag.fixedField.headerTypeCode
        });
      }
    }
    this.setState({
      expand007: !expand007
    });
  };

  handleTags008 = (tag) => {
    const { expand008 } = this.state;
    const { dispatch, record, headerTypes008Result } = this.props;
    if (isEmpty(headerTypes008Result)) {
      dispatch({ type: ActionTypes.HEADER_TYPES_008, code: TAGS._008 });
    } else {
      dispatch({ type: ActionTypes.VALUES_FROM_TAG_008, leader: record.leader.value, code: tag.fixedField.code, typeCode: tag.fixedField.headerTypeCode });
      dispatch({ type: ActionTypes.HEADER_TYPES_008, code: TAGS._008, valueHeaderTypeCode: tag.fixedField.headerTypeCode });
    }
    this.setState({
      expand008: !expand008
    });
  };


  renderTagxxx = (tags) => {
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

  renderTag006 = (tag, field, index) => {
    const { expand006 } = this.state;
    const { record, headerTypes006IsLoading } = this.props;
    return (
      <div className={style.controlFieldContainer}>
        <MarcField
          {...this.props}
          readOnly={tag}
          display="block"
          withIcon
          onAdd={() => this.onAdd(TAGS._006)}
          onDelete={() => this.onDelete(TAGS._006, index)}
          label={(tag) ? tag.fixedField.code : TAGS._006}
          name={(tag) ? tag.fixedField.code : TAGS._006}
          value={(tag) ? tag.fixedField.displayValue : EMPTY_MESSAGE}
          onClick={() => this.handleTags006(tag)}
        />
        {
          (headerTypes006IsLoading) ?
            <div /> :
            <div className={(expand006) ? style.leaderResultsActive : style.leaderResults}>
              <Tag006
                {...this.props}
                leaderCode={record.leader.code}
                leaderValue={record.leader.value}
              />
            </div>
        }
      </div>);
  };

  renderTag007 = (tag, field, index) => {
    const { expand007 } = this.state;
    const { record, headerTypes007IsLoading } = this.props;
    return (
      <div className={style.controlFieldContainer}>
        <MarcField
          {...this.props}
          readOnly={tag}
          display="block"
          withIcon
          onAdd={() => this.onAdd(TAGS._007)}
          onDelete={() => this.onDelete(TAGS._007, index)}
          label={(tag) ? tag.fixedField.code : TAGS._007}
          name={(tag) ? tag.fixedField.code : TAGS._007}
          value={(tag) ? tag.fixedField.displayValue : EMPTY_MESSAGE}
          onClick={() => this.handleTags007(tag)}
        />
        {
          (headerTypes007IsLoading) ?
            <div /> :
            <div className={(expand007) ? style.leaderResultsActive : style.leaderResults}>
              <Tag007
                {...this.props}
                leaderCode={record.leader.code}
                leaderValue={record.leader.value}
              />
            </div>
        }
      </div>);
  };

  renderTag008 = (tag) => {
    const { expand008 } = this.state;
    const { record, headerTypes008IsLoading } = this.props;
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
          (headerTypes008IsLoading) ?
            <div /> :
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

  /* eslint-disable no-unused-vars */
  render() {
    const { fixedFields, tag006Fields, tag007Fields } = this.state;
    const { recordDetail } = this.props;
    const fixedFieldsxxx = fixedFields.filter(f => f.fixedField.code === '001' || f.fixedField.code === '003' || f.fixedField.code === '005');
    const fixedFields006 = fixedFields.filter(f => f.fixedField.code === '006')[0];
    const fixedFields007 = fixedFields.filter(f => f.fixedField.code === '007')[0];
    const fixedFields008 = fixedFields.filter(f => f.fixedField.code === '008')[0];
    return (
      <React.Fragment>
        {this.renderTagxxx(fixedFieldsxxx)}
        {/* {tag006Fields.map((f, i) => (
          this.renderTag006(fixedFields006, f, i)
        ))}
        {tag007Fields.map((f, i) => (
          this.renderTag007(fixedFields007, f, i)
        ))} */}
        {this.renderTag008(fixedFields008)}
      </React.Fragment>
    );
  }
}

export default FixedFields;
