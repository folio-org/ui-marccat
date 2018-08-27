/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Observable } from 'rxjs';
import {
  MarcCategorySelect,
  HeadingTypesSelect,
  ItemTypesSelect,
  FunctionCodeSelect,
  SubfieldSection,
  CreateTagButton
} from '../';
import { injectCommonProp } from '../../../Core';
import * as C from '../../../Utils';


type CreateTagProps = {
  mutator: Object;
};

class CreateTag extends React.Component<CreateTagProps, {}> {
  static manifest = Object.freeze({
    marcCategory: {},
    headingType: {},
    itemType: {},
    functionCode: {},
    validationTag: {},
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
      path: `field-template?categoryCode=%{marcCategory}&code=%{validationTag.tagCode}&ind1=%{validationTag.ind1}&ind2=%{validationTag.ind2}&valueField=&leader=""&headerType=%{headingType}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
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
      path: `fixed-fields-code-groups?code=%{validationTag.tagCode}&headerTypeCode=%{headingType}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      fetch: false,
      accumulate: true
    },
  });

  componentDidMount() {
    this.marcCategoriesSubscription();
  }

  marcCategoriesSubscription = () => {
    const { mutator } = this.props;
    const subscription = Observable.from(mutator.marcCategories.GET());
    subscription.subscribe(c => {
      mutator.marcCategory.replace(c[0].value);
      this.headingTypesSubscription();
    });
  };

  headingTypesSubscription = () => {
    const { mutator } = this.props;
    mutator.headingTypes.GET();
  };

  render() {
    return (
      <div className="tag-select-container">
        <MarcCategorySelect {...this.props} />
        <HeadingTypesSelect {...this.props} />
        <ItemTypesSelect {...this.props} />
        <FunctionCodeSelect {...this.props} />
        <SubfieldSection {...this.props} />
        <CreateTagButton {...this.props} />
      </div>
    );
  }
}

export default injectCommonProp(CreateTag);
