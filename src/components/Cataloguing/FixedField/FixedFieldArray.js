/* eslint-disable no-use-before-define */
// @flow
import React from 'react';
import { FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import { Row, Col } from '@folio/stripes-components';
import { first, isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { FormField } from '../Common/FormField';
import { TAGS, EMPTY_FIXED_FIELD, FIELD_NAME } from '../Utils/MarcConstant';
import AddTagButton from '../Button/AddTagButton';
import style from '../Style/index.css';
import { dropDownValuesAction, changeDisplayValueAction } from '../Actions';
import SelectField from '../Common/SelectField';
import { decamelizify } from '../../../shared';
import { EMPTY_SPACED_STRING, REDUX } from '../../../config/constants';
import { selectKey, formFieldValue } from '../../../redux/helpers/selector';


const withControlledCollapsible = compose(
  withState('isCollapsed', 'collapse', false),
  withState('headerTypeCode', 'setTypeCode', 16),
  withState('values', 'setValue', {}),
  withHandlers({
    collapse: ({ collapse }) => (_e) => collapse((current) => !current),
    setTypeCode: ({ setTypeCode }) => (e) => setTypeCode(e.target.value),
    setValue: ({ setValue }) => (i, d) => setValue({ i:d }),
  }),
);


const onHandleChange = (evt, code, tag, setValue, props) => {
  const { dispatch, store } = props;
  const headerTypeCode = evt.target.value;
  const payload = {
    value: formFieldValue(store, REDUX.FORM.FIXED_FIELD_FORM, 'Leader'),
    code,
    headerTypeCode,
    key:tag
  };
  dispatch(dropDownValuesAction(payload, null));
};


const RenderDropwDown = (data, tag, _element, props) => {
  const sortedData = Object.values(data).sort((x, y) => x.name > y.name);
  return (
    <Row>
      {sortedData.map((field, idx) => (
        <Col xs={4} key={idx}>
          <SelectField
            name={`${tag}.fixedField.${field.name}`}
            label={decamelizify(field.name, EMPTY_SPACED_STRING)}
            dataOptions={field.dropdownSelect}
          />
        </Col>
      ))}
    </Row>);
};

const CollapsibleElement = ({ element, tag, headertype, headerTypeCode, setValue, ...props }) => {
  const { store } = props;
  const selected = `headerTypeValues${element.code}_${tag}`;
  const value = selectKey(store, selected);
  return (
    <React.Fragment>
      <SelectField
        {...props}
        id={`${tag}.fixedField.headerTypeCode`}
        name={`${tag}.fixedField.headerTypeCode`}
        label={`Tag ${element.code}`}
        onChange={(e) => onHandleChange(e, element.code, tag, setValue, props)}
        placeholder={'Select Heading types for '.concat(element.code)}
        dataOptions={headertype.results.headingTypes}
      />
      {!isEmpty(value) && RenderDropwDown(value.results, tag, element, props)}
    </React.Fragment>
  );
};

const Collapsible = withControlledCollapsible(({ isCollapsed, collapse, tag, element, headertype, ...props }) => (
  <Col xs={10}>
    <div className={style.fieldContainer}>
      <FormField
        {...props}
        name={`${tag}.fixedField.displayValue`}
        prepend="true"
        type="text"
        readOnly="true"
        label={element.code || tag}
        onClick={collapse}
      />
      <div className={(isCollapsed) ? style.leaderResultsActive : style.leaderResults}>
        {headertype && <CollapsibleElement {...props} element={element} tag={tag} headertype={headertype} />}
      </div>
    </div>
  </Col>
));

/**
 *
 * @param {*} param0
 */
const RenderCollapsibleField = ({ fields, meta: { error }, headertype, ...props }) => {
  const emptyField = (fields.length === 0);
  const fielArrayName = (fields.name === FIELD_NAME.FIELDS006);
  if (emptyField) {
    if (fielArrayName) fields.push(EMPTY_FIXED_FIELD(TAGS._006));
    else fields.push(EMPTY_FIXED_FIELD(TAGS._007));
  }
  return (
    <React.Fragment>
      {fields.map((tag, index) => (
        <Row xs key={index}>
          <Collapsible
            {...props}
            name={`${tag}`}
            element={fields.get(index)}
            headertype={headertype}
            tag={tag}
          />
          <Col xs={1}>
            <AddTagButton tagCode={fields.get(index).code} onClick={() => fields.push(EMPTY_FIXED_FIELD(fields.get(index).code))} />
            {error && <span className="error">{error}</span>}
          </Col>
        </Row>
      ))}
    </React.Fragment>
  );
};

/**
 *
 * @param {*} props
 */
const FixedFieldArray = ({ headertype006, headertype007, headertype008, record, ...props }) => {
  return (
    <React.Fragment>
      <FieldArray name={FIELD_NAME.FIELDS006} component={RenderCollapsibleField} {...props} headertype={headertype006} />
      <FieldArray name={FIELD_NAME.FIELDS007} component={RenderCollapsibleField} {...props} headertype={headertype007} />
      <Row xs>
        <Collapsible
          {...props}
          name={`${TAGS._008}`}
          element={first(record.fields.filter(f => f.code === TAGS._008))}
          headertype={headertype008}
          tag={TAGS._008}
        />
      </Row>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({
  loadDropDownValues: (payload) => _ => {
    dispatch(dropDownValuesAction(payload));
  },
  changeDisplayValue: (payload) => _ => {
    dispatch(changeDisplayValueAction(payload));
  }
}, dispatch);

export default (
  connect(
    ({ marccat: { data: {
      headertype006,
      headertype007,
      headertype008,
      headerTypeValues008 } }
    }) => ({
      headertype006,
      headertype007,
      headertype008,

      values008: (headerTypeValues008) || {},
    }),
    mapDispatchToProps
  )
)(FixedFieldArray);
