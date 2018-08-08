/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from '@folio/stripes-connect';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import Button from '@folio/stripes-components/lib/Button';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import TextArea from '@folio/stripes-components/lib/TextArea';
import { FormattedMessage } from 'react-intl';
import { getLeader, findLabel, organize } from '../../Utils/TemplateUtils';
import SubfieldSection from '../form/SubfieldSection';
import css from '../styles/Template.css';
import * as C from '../../Utils';

type CreateTagProps = {
  currentTemplate: Object,
  stripes: Object,
  history: Object,
  resources: Object,
  headingTypeLoaded: Object,
  headingTypes: {
    records: Object
  },
  mutator: {
    marcCategories: {
      GET: Function,
      reset: Function
    },
    fixedFieldSelect: {
      GET: Function,
      reset: Function
    },
    leader: {
      replace: Function
    },
    tag: {
      replace: Function
    },
    ind1: {
      replace: Function
    },
    ind2: {
      replace: Function
    },
    marcCategory: {
      replace: Function
    },
    itemType: {
      replace: Function
    },
    headingType: {
      replace: Function
    },
    functionCode: {
      replace: Function
    },
    itemTypes: {
      GET: Function,
      reset: Function
    },
    headingTypes: {
      GET: Function,
      reset: Function
    },
    functionCodes: {
      GET: Function,
      reset: Function
    },
    marcAssociated: {
      GET: Function,
      reset: Function
    },
    fieldTemplate: {
      GET: Function,
      reset: Function
    },
    subfields: {
      GET: Function,
      reset: Function
    }
  }
};

type CreateTagState = {
};

class CreateTag extends React.Component<CreateTagProps, CreateTagState> {
  static manifest = Object.freeze({
    marcCategory: {},
    headingType: {},
    itemType: {},
    functionCode: {},
    tag: {},
    ind1: {},
    ind2: {},
    leader: {},
    marcCategories: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `marc-categories?lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.MARC_CATEGORIES,
      fetch: false,
      accumulate: true
    },
    headingTypes: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `heading-types?marcCategory=%{marcCategory}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: 'headingTypes',
      fetch: false,
      accumulate: true
    },
    itemTypes: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `item-types?marcCategory=%{marcCategory}&code=%{headingType}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: 'itemTypes',
      fetch: false,
      accumulate: true
    },
    functionCodes: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `function-codes?marcCategory=%{marcCategory}&code1=%{headingType}&code2=%{itemType}&code3=''&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: 'functionCodes',
      fetch: false,
      accumulate: true
    },
    marcAssociated: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `validation-tag?categoryCode=%{marcCategory}&code1=%{headingType}&code2=%{itemType}&code3=%{functionCode}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      fetch: false,
      accumulate: true
    },
    fieldTemplate: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      headers: C.ENDPOINT.HEADERS,
      path: `field-template?categoryCode=%{marcCategory}&code=%{tag}&ind1=%{ind1}&ind2=%{ind2}&valueField=&leader=%{leader}&headerType=%{headingType}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      fetch: false,
      accumulate: true
    },
    subfields: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      headers: C.ENDPOINT.HEADERS,
      path: `subfield-tag?marcCategory=%{marcCategory}&code1=%{headingType}&code2=%{itemType}&code3=%{functionCode}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      fetch: false,
      accumulate: true
    },
    fixedFieldSelect: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      headers: C.ENDPOINT.HEADERS,
      path: `fixed-fields-code-groups?code=%{tag}&headerTypeCode=%{headingType}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      fetch: false,
      accumulate: true
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      marcCategorySel: '',
      headingTypeSel: Number,
      headingTypeLoaded: {},
      itemTypeSel: '', // eslint-disable-line react/no-unused-state
      functionCodeSel: '', // eslint-disable-line react/no-unused-state
      newTag: {},
      fixedFieldSel: []
    };

    this.fetchingMarcCategory = this.fetchingMarcCategory.bind(this);
    this.fetchHeadingTypes = this.fetchHeadingTypes.bind(this);
    this.fetchHeadingTypes = this.fetchHeadingTypes.bind(this);
    this.fetchItemTypes = this.fetchItemTypes.bind(this);
    this.fetchFunctionCodes = this.fetchFunctionCodes.bind(this);
    this.fetchMarcAssociated = this.fetchMarcAssociated.bind(this);
    this.fetchFieldTemplate = this.fetchFieldTemplate.bind(this);
    this.fetchSubfields = this.fetchSubfields.bind(this);
    this.fetchFixedFieldSelect = this.fetchFixedFieldSelect.bind(this);
    this.onChangeMarcCategory = this.onChangeMarcCategory.bind(this);
    this.onChangeHeadingType = this.onChangeHeadingType.bind(this);
    this.onChangeItemType = this.onChangeItemType.bind(this);
    this.onChangeFunctionCode = this.onChangeFunctionCode.bind(this);
    this.createNewTag = this.createNewTag.bind(this);
    this.createTagObjectFromJson = this.createTagObjectFromJson.bind(this);
    this.renderFixedFieldSelect = this.renderFixedFieldSelect.bind(this);
  }

  componentDidMount() {
    this.fetchingMarcCategory();
  }

  preparePaneMenu() {
    return (
      <PaneMenu {...this.props}>
        <IconButton
          key="icon-close"
          icon="closeX"
          onClick={this.props.history.goBack}
        />
      </PaneMenu>
    );
  }

  renderFixedFieldSelect(input, tag) {
    const toRender = [];
    // only for 008
    if (tag && tag.code === '008') {
      const currentDate = new Date();
      // TODO
      const date = currentDate.getFullYear() + '' + currentDate.getMonth() + '' + currentDate.getDay();
      toRender.push(
        <Row>
          <Col xs={4}>
            <FormattedMessage id="ui-marccat.template.catalogDate" />
          </Col>
          <Col xs={8}>
            <TextArea
              {...this.props}
              value={date}
            />
          </Col>
        </Row>
      );
    }
    input.map(current => {
      return toRender.push(
        <Row>
          <Col xs={4}>
            <FormattedMessage id={`ui-marccat.template.${current.label}`} />
          </Col>
          <Col xs={8}>
            <Select dataOptions={current.values} />
          </Col>
        </Row>
      );
    });
    return toRender;
  }

  createNewTag() {
    const textareas = Array.prototype.slice.call(document.getElementById('subfieldsData').querySelectorAll('.subfieldElement'));
    let displayValue = '';
    textareas.map((current) => {
      const code = current.querySelectorAll('select')[0].value;
      const data = current.querySelectorAll('textarea')[0].value;
      return displayValue = displayValue.concat(C.MARC_CHARACTER.SEPARATOR + code + data);
    });
    const currentTag = this.state.newTag;
    currentTag.displayValue = displayValue;
    this.setState({ newTag: currentTag });
  }

  fetchSubfields(marcCategoryValue, headingTypesValue, itemTypesValue, functionCodeValue) {
    this.props.mutator.subfields.reset();
    this.props.mutator.marcCategory.replace(marcCategoryValue);
    this.props.mutator.headingType.replace(headingTypesValue);
    this.props.mutator.itemType.replace(itemTypesValue);
    this.props.mutator.functionCode.replace(functionCodeValue);
    this.props.mutator.subfields.GET().then((fetchResult) => {
      if (!(fetchResult.subfields.length > 0)) {
        this.props.mutator.subfields.reset();
      }
    });
  }

  fetchFixedFieldSelect(tag, headingTypesValue) {
    this.props.mutator.fixedFieldSelect.reset();
    this.props.mutator.tag.replace(tag);
    this.props.mutator.headingType.replace(headingTypesValue);
    this.props.mutator.fixedFieldSelect.GET().then((fetchResult) => {
      if (fetchResult) {
        this.setState({ fixedFieldSel: organize(fetchResult) });
        return;
      }
      this.props.mutator.fixedFieldSelect.reset();
    });
  }

  fetchFieldTemplate(marcCategoryValue, headingTypesValue, itemTypesValue, functionCodeValue, tag, ind1, ind2) {
    this.props.mutator.fieldTemplate.reset();
    this.props.mutator.marcCategory.replace(marcCategoryValue);
    this.props.mutator.headingType.replace(headingTypesValue);
    this.props.mutator.tag.replace(tag);
    this.props.mutator.ind1.replace(ind1);
    this.props.mutator.ind2.replace(ind2);
    this.props.mutator.leader.replace(getLeader(this.props.currentTemplate));
    this.props.mutator.fieldTemplate.GET().then((fetchResult) => {
      if (fetchResult) {
        if (fetchResult['variable-field']) {
          const res = fetchResult['variable-field'];
          this.props.mutator.fixedFieldSelect.reset();
          this.fetchSubfields(marcCategoryValue, headingTypesValue, itemTypesValue, functionCodeValue);
          const tagFetch = this.createTagObjectFromJson(res, marcCategoryValue, headingTypesValue, itemTypesValue, functionCodeValue);
          tagFetch.type = 'variableField';
          this.setState({
            newTag: tagFetch
          });
          return;
        }
        if (fetchResult['fixed-field']) {
          const res = fetchResult['fixed-field'];
          this.props.mutator.subfields.reset();
          this.fetchFixedFieldSelect(tag, headingTypesValue);
          const tagFetch = this.createTagObjectFromJson(res, marcCategoryValue, headingTypesValue, itemTypesValue, functionCodeValue);
          tagFetch.type = 'fixedField';
          this.setState({
            newTag: tagFetch
          });
          return;
        }
      }
      this.props.mutator.subfields.reset();
    });
  }

  createTagObjectFromJson(res, marcCategoryValue, headingTypesValue, itemTypesValue, functionCodeValue) {
    return {
      code: res.code,
      ind1: res.ind1,
      ind2: res.ind2,
      categoryCode: marcCategoryValue,
      headingTypeCode: headingTypesValue,
      itemTypeCode: itemTypesValue,
      functionCode: functionCodeValue,
      description: findLabel(this.state.headingTypeLoaded, headingTypesValue)
    };
  }

  fetchingMarcCategory() {
    this.props.mutator.marcCategories.GET().then((fetchResult) => {
      if (fetchResult.length > 0) {
        this.setState({ marcCategorySel: fetchResult[0].value });
        this.fetchHeadingTypes(fetchResult[0].value);
        return;
      }
      this.props.mutator.headingTypes.reset();
      this.setState({ marcCategorySel: '' });
    });
  }

  fetchHeadingTypes(marcCategoryValue) {
    this.props.mutator.headingTypes.reset();
    this.props.mutator.marcCategory.replace(marcCategoryValue);
    this.props.mutator.headingTypes.GET().then((fetchResult) => {
      if (fetchResult.length > 0) {
        this.setState({ headingTypeSel: fetchResult[0].value });
        this.fetchItemTypes(marcCategoryValue, fetchResult[0].value);
        this.setState({ headingTypeLoaded: fetchResult });
        return;
      }
      this.fetchMarcAssociated(marcCategoryValue, C.EMPTY_PARAMETER, C.EMPTY_PARAMETER, C.EMPTY_PARAMETER);
      this.props.mutator.itemTypes.reset();
      this.setState({ headingTypeSel: '' });
      this.setState({ headingTypeLoaded: '' });
    });
  }

  fetchItemTypes(marcCategoryValue, headingTypesValue) {
    this.props.mutator.itemTypes.reset();
    this.props.mutator.marcCategory.replace(marcCategoryValue);
    this.props.mutator.headingType.replace(headingTypesValue);
    this.props.mutator.itemTypes.GET().then((fetchResult) => {
      if (fetchResult.length > 0) {
        this.setState({ itemTypeSel: fetchResult[0].value }); // eslint-disable-line react/no-unused-state
        this.fetchFunctionCodes(marcCategoryValue, headingTypesValue, fetchResult[0].value);
        return;
      }
      this.fetchMarcAssociated(marcCategoryValue, headingTypesValue, C.EMPTY_PARAMETER, C.EMPTY_PARAMETER);
      this.props.mutator.functionCodes.reset();
      this.setState({ itemTypeSel: '' }); // eslint-disable-line react/no-unused-state
    });
  }

  fetchFunctionCodes(marcCategoryValue, headingTypesValue, itemTypesValue) {
    this.props.mutator.functionCodes.reset();
    this.props.mutator.marcCategory.replace(marcCategoryValue);
    this.props.mutator.headingType.replace(headingTypesValue);
    this.props.mutator.itemType.replace(itemTypesValue);
    this.props.mutator.functionCodes.GET().then((fetchResult) => {
      if (fetchResult.length > 0) {
        this.setState({ functionCodeSel: fetchResult[0].value }); // eslint-disable-line react/no-unused-state
        this.fetchMarcAssociated(marcCategoryValue, headingTypesValue, itemTypesValue, fetchResult[0].value);
        return;
      }
      this.setState({ functionCodeSel: '' }); // eslint-disable-line react/no-unused-state
      this.fetchMarcAssociated(marcCategoryValue, headingTypesValue, itemTypesValue, C.EMPTY_PARAMETER);
    });
  }

  fetchMarcAssociated(marcCategoryValue, headingTypesValue, itemTypesValue, functionCodeValue) {
    this.props.mutator.marcAssociated.reset();
    this.props.mutator.marcCategory.replace(marcCategoryValue);
    this.props.mutator.headingType.replace(headingTypesValue);
    this.props.mutator.itemType.replace(itemTypesValue);
    this.props.mutator.functionCode.replace(functionCodeValue);
    this.props.mutator.marcAssociated.GET().then((fetchResult) => {
      if (fetchResult) {
        const { tagCode, ind1, ind2 } = fetchResult;
        this.fetchFieldTemplate(marcCategoryValue, headingTypesValue, itemTypesValue, functionCodeValue, tagCode, ind1, ind2);
      }
    });
  }

  onChangeMarcCategory = event => {
    this.fetchHeadingTypes(Number.parseInt(event.target.value, 10));
    this.setState({ marcCategorySel: Number.parseInt(event.target.value, 10) });
  }

  onChangeHeadingType = event => {
    this.setState({ headingTypeSel: Number.parseInt(event.target.value, 10) });
    this.fetchItemTypes(this.state.marcCategorySel, Number.parseInt(event.target.value, 10));
  }

  onChangeItemType = event => {
    this.setState({ itemTypeSel: Number.parseInt(event.target.value, 10) }); // eslint-disable-line react/no-unused-state
    this.fetchFunctionCodes(this.state.marcCategorySel, this.state.headingTypeSel, Number.parseInt(event.target.value, 10));
  }

  onChangeFunctionCode = event => {
    this.setState({ functionCodeSel: Number.parseInt(event.target.value, 10) }); // eslint-disable-line react/no-unused-state
    this.fetchMarcAssociated(this.state.marcCategorySel, this.state.headingTypeSel, this.state.itemTypeSel, Number.parseInt(event.target.value, 10));
  }

  render() {
    // const formatMsg = this.props.stripes.intl.formatMessage;
    const { resources } = this.props;
    const marcCatValues = (resources.marcCategories || {}).records || [];
    const headingTypesValues = (resources.headingTypes || {}).records || [];
    const itemTypesValues = (resources.itemTypes || {}).records || [];
    const functionCodesValues = (resources.functionCodes || {}).records || [];
    const subfields = (resources.subfields || {}).records || [];
    const columnMapping = {
      code: '',
      description: '',
      ind1: '',
      ind2: '',
      displayValue: ''
    };
    const currentTag = [];
    currentTag.push(this.state.newTag);
    /*
    if (marcCategories && marcCategories.hasLoaded && marcCategoriesSelect.value) {
      fetchHeadingTypes(marcCategoriesSelect.value);
    }
    */
    return (
      <form name="createTagForm" id="createTagForm" noValidate>
        <Row className={css.mandatoryList}>
          <Col xs={12}>
            <MultiColumnList
              contentData={currentTag}
              columnMapping={columnMapping}
              visibleColumns={[
                'code',
                'description',
                'ind1',
                'ind2',
                'displayValue',
              ]}
              columnWidths={{ code: '10%', description: '40%', ind1: '5%', ind2: '5%', displayValue: '40%' }}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            {marcCatValues &&
              <Select
                name="marcCategoriesSelect"
                id="marcCategoriesSelect"
                dataOptions={marcCatValues}
                onChange={this.onChangeMarcCategory}
              />
            }
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            {resources.headingTypes && resources.headingTypes.hasLoaded &&
              <Select
                name="headingTypesSelect"
                id="headingTypesSelect"
                dataOptions={headingTypesValues}
                onChange={this.onChangeHeadingType}
              />
            }
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            {resources.itemTypes &&
              resources.itemTypes.hasLoaded &&
              itemTypesValues.length > 0 &&
              <Select
                name="itemTypesSelect"
                id="itemTypesSelect"
                dataOptions={itemTypesValues}
                onChange={this.onChangeItemType}
              />
            }
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            {resources.functionCodes &&
              resources.functionCodes.hasLoaded &&
              functionCodesValues.length > 0 &&
              <Select
                name="functionCodesSelect"
                id="functionCodesSelect"
                dataOptions={functionCodesValues}
                onChange={this.onChangeFunctionCode}
              />
            }
          </Col>
        </Row>

        {resources.subfields &&
          resources.subfields.hasLoaded &&
          subfields[0].subfields.length > 0 &&
          <SubfieldSection {...this.props} subfields={subfields[0].subfields} />
        }

        {resources.fixedFieldSelect &&
          resources.fixedFieldSelect.hasLoaded &&
          <div>
            {this.renderFixedFieldSelect(this.state.fixedFieldSel, this.state.newTag)}
          </div>
        }

        <Row>
          <Button
            {...this.props}
            onClick={this.createNewTag}
            type="button"
            buttonStyle="primary"
          >
            <FormattedMessage id="ui-marccat.template.tag.add" />
          </Button>
        </Row>
      </form>

    );
  }
}

export default connect(CreateTag, C.META.MODULE_NAME);
