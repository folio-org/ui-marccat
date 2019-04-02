import React from 'react';
import { isEmpty, first } from 'lodash';
import { Tag00X, Tag006, Tag007, Tag008, MarcField } from '..';
import type { Props } from '../../../core';
import style from '../Style/style.css';
import { ActionTypes } from '../../../redux/actions/Actions';
import {
  TAGS,
  TAG007_DISPLAY_VALUE_DEFAULT,
  TAG006_DISPLAY_VALUE_DEFAULT
} from '../Utils/MarcUtils';
import { filterFixedFields } from '../Utils/MarcApiUtils';
import { tagValuesAction, typeCodeAction } from '../Actions/MarcActionCreator';

type P = Props & {};
class FixedFields extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
      tag006: false,
      tag007: false,
      expand006: false,
      expand007: false,
      expand008: false,
      fixedFields: [],
      tag006Fields:[{}],
      tag007Fields:[{}],
    };

    this.handleChage00X = this.handleChage00X.bind(this);
  }

  checkTag006 = c => { if (c === '006') this.setState({ tag006: true }); };
  checkTag007 = c => { if (c === '007') this.setState({ tag007: true }); };

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
    });
  }

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

  handleChage00X = (e) => {
    const { datastore: { emptyRecord } } = this.props;
    const fixedField = first(emptyRecord.results.fields.filter(f => f.code === e.target.name));
    if (fixedField) {
      fixedField.fixedField.displayValue = (e.target.value);
      fixedField.mandatory = true;
      fixedField.fixedField.headerTypeCode = (e.target.name === TAGS._006) ? 16 : 42;
      fixedField.fixedField.sequenceNumber = 0;
      fixedField.added = true;
    }
  };

  handleTag006 = (tag) => {
    const { expand006, tag006 } = this.state;
    const { dispatch, record, headerTypes006Result } = this.props;
    if (isEmpty(headerTypes006Result)) {
      if (!tag006) {
        dispatch(typeCodeAction(ActionTypes.HEADER_TYPES_006, TAGS._006));
      } else {
        dispatch(tagValuesAction(ActionTypes.VALUES_FROM_TAG_006, record.leader.value, tag));
      }
    }
    this.setState({
      expand006: !expand006
    });
  };

  handleTag007 = (tag) => {
    const { expand007, tag007 } = this.state;
    const { dispatch, record, headerTypes007Result } = this.props;
    if (isEmpty(headerTypes007Result)) {
      if (!tag007) {
        dispatch(typeCodeAction(ActionTypes.HEADER_TYPES_007, TAGS._007));
      } else {
        dispatch(tagValuesAction(ActionTypes.VALUES_FROM_TAG_007, record.leader.value, tag));
      }
    }
    this.setState({
      expand007: !expand007
    });
  };

  handleTag008 = (tag) => {
    const { expand008, isPresent008 } = this.state;
    const { dispatch, record } = this.props;
    if (!isPresent008) {
      dispatch(tagValuesAction(ActionTypes.VALUES_FROM_TAG_008, record.leader.value, tag));
    }
    this.setState({
      expand008: !expand008,
      isPresent008: true
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


  renderTag006 = (tag) => {
    const { expand006 } = this.state;
    const { record, headerTypes006IsLoading } = this.props;
    return (
      <div className={style.controlFieldContainer}>
        <MarcField
          {...this.props}
          readOnly={tag}
          onChange={this.handleChage00X}
          label={(tag) ? tag.fixedField.code : TAGS._006}
          name={(tag) ? tag.fixedField.code : TAGS._006}
          value={(tag) ? tag.fixedField.displayValue : TAG006_DISPLAY_VALUE_DEFAULT}
          onClick={() => this.handleTag006(tag)}
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

  renderTag007 = (tag) => {
    const { expand007 } = this.state;
    const { record, headerTypes007IsLoading } = this.props;
    return (
      <div className={style.controlFieldContainer}>
        <MarcField
          {...this.props}
          readOnly={tag}
          onChange={this.handleChage00X}
          label={(tag) ? tag.fixedField.code : TAGS._007}
          name={(tag) ? tag.fixedField.code : TAGS._007}
          value={(tag) ? tag.fixedField.displayValue : TAG007_DISPLAY_VALUE_DEFAULT}
          onClick={() => this.handleTag007(tag)}
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
    const { record } = this.props;
    return (
      <div className={style.controlFieldContainer}>
        <MarcField
          {...this.props}
          readOnly
          label={tag.fixedField.code}
          name={tag.fixedField.code}
          value={tag.fixedField.displayValue}
          onClick={() => this.handleTag008(tag)}
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
    const fixedFieldsxxx = filterFixedFields(fixedFields);
    const fixedFields006 = first(fixedFields.filter(f => f.fixedField.code === TAGS._006));
    const fixedFields007 = first(fixedFields.filter(f => f.fixedField.code === TAGS._007));
    const fixedFields008 = first(fixedFields.filter(f => f.fixedField.code === TAGS._008));
    return (
      <React.Fragment>
        {this.renderTagxxx(fixedFieldsxxx)}
        {this.renderTag006(fixedFields006)}
        {/* {this.renderTag007(fixedFields007)} */}
        {this.renderTag008(fixedFields008)}
      </React.Fragment>
    );
  }
}

export default FixedFields;
