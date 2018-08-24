/**
 * @format
 */
import * as React from 'react';
import { connect } from '@folio/stripes-connect';
import { ReplaySubject } from 'rxjs';
import CreateTagButton from './button/CreateTagButton';
import {
  MarcCategorySelect,
  HeadingTypesSelect,
  ItemTypesSelect,
  FunctionCodeSelect
} from './select/';
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
      headingTypeLoaded: {}, // eslint-disable-line react/no-unused-state
      itemTypeSel: '', // eslint-disable-line react/no-unused-state
      functionCodeSel: '', // eslint-disable-line react/no-unused-state
    };

    this.onChangeMarcCategory = this.onChangeMarcCategory.bind(this);
    this.onChangeHeadingType = this.onChangeHeadingType.bind(this);
    this.onChangeItemType = this.onChangeItemType.bind(this);
    this.onChangeFunctionCode = this.onChangeFunctionCode.bind(this);
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

  fetchingMarcCategory() {
    const source = new ReplaySubject();
    source.next(this.props.mutator.marcCategories.GET());
    source.subscribe(() => {
      this.fetchHeadingTypes();
    });
  }


  fetchHeadingTypes(marcCategoryValue) {
    this.props.mutator.headingTypes.reset();
    this.props.mutator.marcCategory.replace(marcCategoryValue);
    this.props.mutator.headingTypes.GET().then((fetchResult) => {
      if (fetchResult.length > 0) {
        this.setState({ headingTypeSel: fetchResult[0].value });
        this.fetchItemTypes(marcCategoryValue, fetchResult[0].value);
        this.setState({ headingTypeLoaded: fetchResult }); // eslint-disable-line react/no-unused-state
        return;
      }
      const headingType = (fetchResult.length > 0) ? fetchResult : '';
      this.fetchMarcAssociated(marcCategoryValue, C.EMPTY_PARAMETER, C.EMPTY_PARAMETER, C.EMPTY_PARAMETER);
      this.props.mutator.itemTypes.reset();
      this.setState({ headingTypeSel: '' });
      this.setState({ headingTypeLoaded: headingType }); // eslint-disable-line react/no-unused-state
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
    return (
      <div className="tag-select-container">
        <MarcCategorySelect {...this.props} onChangeMarcCategory={this.onChangeMarcCategory} />
        <HeadingTypesSelect {...this.props} onChangeHeadingType={this.onChangeHeadingType} />
        <ItemTypesSelect {...this.props} onChangeItemType={this.onChangeItemType} />
        <FunctionCodeSelect {...this.props} onChangeFunctionCode={this.onChangeFunctionCode} />
        <CreateTagButton {...this.props} />
      </div>
    );
  }
}

export default connect(CreateTag, C.META.MODULE_NAME);
