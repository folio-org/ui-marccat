/**
 * @format
 */
import * as React from 'react';
import { connect } from '@folio/stripes-connect';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { getLeader, findLabel } from '../../Utils/TemplateUtils';
import SubfieldSection from '../form/SubfieldSection';
import * as C from '../../Utils';
import FixedFieldForm from './FixedFieldForm';
import CreateTagButton from './button/CreateTagButton';
import {
  MarcCategorySelect,
  HeadingTypesSelect,
  ItemTypesSelect,
  FunctionCodeSelect
} from './select/';

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


class CreateTag extends React.Component<CreateTagProps, {}> {
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
      headingTypeSel: 0,
      headingTypeLoaded: {},
      itemTypeSel: '', // eslint-disable-line react/no-unused-state
      functionCodeSel: '', // eslint-disable-line react/no-unused-state
      newTag: {},
      fixedFieldSel: {},
      fieldTemplateResponse: {}
    };

    this.onChangeMarcCategory = this.onChangeMarcCategory.bind(this);
    this.onChangeHeadingType = this.onChangeHeadingType.bind(this);
    this.onChangeItemType = this.onChangeItemType.bind(this);
    this.onChangeFunctionCode = this.onChangeFunctionCode.bind(this);
    this.createTagObjectFromJson = this.createTagObjectFromJson.bind(this);
  }

  componentDidMount() {
    this.fetchingMarcCategory();
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
        this.setState({ fixedFieldSel: fetchResult });
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
            newTag: tagFetch,
            fieldTemplateResponse: res
          });
          return;
        }
        if (fetchResult['fixed-field']) {
          const res = fetchResult['fixed-field'];
          this.props.mutator.subfields.reset();
          this.fetchFixedFieldSelect(tag, headingTypesValue);
          const tagFetch = this.createTagObjectFromJson(res, marcCategoryValue, headingTypesValue, itemTypesValue, functionCodeValue);
          tagFetch.displayValue = res.displayValue;
          tagFetch.type = 'fixedField';
          this.setState({
            newTag: tagFetch,
            fieldTemplateResponse: res
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
    const marcSource = new BehaviorSubject();
    marcSource.next(this.props.mutator.marcCategories.GET());
    marcSource.subscribe((d) => {
      this.setState({ marcCategorySel: d[0].value });
      this.fetchHeadingTypes(d[0].value);
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
      const headingType = (fetchResult.length > 0) ? fetchResult : '';
      this.fetchMarcAssociated(marcCategoryValue, C.EMPTY_PARAMETER, C.EMPTY_PARAMETER, C.EMPTY_PARAMETER);
      this.props.mutator.itemTypes.reset();
      this.setState({ headingTypeSel: '' });
      this.setState({ headingTypeLoaded: headingType });
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
    this.fetchHeadingTypes(parseInt(event.target.value, 10));
    this.setState({ marcCategorySel: parseInt(event.target.value, 10) });
  }

  onChangeHeadingType = event => {
    this.setState({ headingTypeSel: parseInt(event.target.value, 10) });
    this.fetchItemTypes(this.state.marcCategorySel, parseInt(event.target.value, 10));
  }

  onChangeItemType = event => {
    this.setState({ itemTypeSel: parseInt(event.target.value, 10) }); // eslint-disable-line react/no-unused-state
    this.fetchFunctionCodes(this.state.marcCategorySel, this.state.headingTypeSel, Number.parseInt(event.target.value, 10));
  }

  onChangeFunctionCode = event => {
    this.setState({ functionCodeSel: parseInt(event.target.value, 10) }); // eslint-disable-line react/no-unused-state
    this.fetchMarcAssociated(this.state.marcCategorySel, this.state.headingTypeSel, this.state.itemTypeSel, Number.parseInt(event.target.value, 10));
  }

  render() {
    const { resources } = this.props;
    const subfields = (resources.subfields || {}).records || [];
    return (
      <div className="tag-select-container">
        <MarcCategorySelect {...this.props} onChangeMarcCategory={this.onChangeMarcCategory} />
        <HeadingTypesSelect {...this.props} onChangeHeadingType={this.onChangeHeadingType} />
        <ItemTypesSelect {...this.props} onChangeItemType={this.onChangeItemType} />
        <FunctionCodeSelect {...this.props} onChangeFunctionCode={this.onChangeFunctionCode} />

        {resources.subfields && resources.subfields.hasLoaded && subfields[0].subfields.length > 0 &&
          <SubfieldSection {...this.props} subfields={subfields[0].subfields} />
        }

        {resources.fixedFieldSelect && resources.fixedFieldSelect.hasLoaded &&
          <FixedFieldForm {...this.props} tag={this.state.newTag} fetchData={this.state.fixedFieldSel} defaultValues={this.state.fieldTemplateResponse} />
        }
        <CreateTagButton {...this.props} />
      </div>
    );
  }
}

export default connect(CreateTag, C.META.MODULE_NAME);
