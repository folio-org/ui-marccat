/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Observable } from 'rxjs';
import { connect } from 'react-redux';
import {
  MarcCategorySelect,
  HeadingTypesSelect,
  ItemTypesSelect,
  FunctionCodeSelect,
  SubfieldSection,
  TagButton,
  DisplayTag
} from '../';
import { injectCommonProp } from '../../../Core';
import * as C from '../../../Utils';


type CreateTagProps = {
  mutator: Object;
  multiReset: () => void;
  tagSection: boolean;
};

class CreateTag extends React.Component<CreateTagProps, {}> {
  static manifest = Object.freeze({
    marcCategory: {},
    headingType: {},
    itemType: {},
    functionCode: {},
    validationTag: {},
    fixedField: [{}],
    fixedFieldGroup: {},
    variablefield: [{}],
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

  marcCategoriesSubscription = (): void => {
    const { mutator } = this.props;
    const subscription = Observable.from(mutator.marcCategories.GET());
    subscription.subscribe(c => {
      mutator.marcCategory.replace(c[0].value);
      mutator.headingTypes.GET();
    });
  };

  multiReset = (localResource: string):void => {
    const { mutator } = this.props;
    Object.keys(mutator)
      .filter(k => k.endsWith('s') && k !== localResource)
      .forEach(z => mutator[z].reset());
  }

   handleField = (x) => {
     const { mutator } = this.props;
     const key = (x[C.MARC.FIXED_FIELD]) ? 'fixedField' : 'variablefield';
     mutator[key].replace(x);
     mutator[key].GET().then(k => mutator[key].replace(k));
   };

   render() {
     const { tagSection } = this.props;
     return (
       <div className="tag-select-container">
         {tagSection &&
         <React.Fragment>
           <DisplayTag {...this.props} />
           <MarcCategorySelect {...this.props} reset={this.multiReset} />
           <HeadingTypesSelect {...this.props} />
           <ItemTypesSelect {...this.props} />
           <FunctionCodeSelect {...this.props} />
           <SubfieldSection {...this.props} />
         </React.Fragment>}
         <TagButton
           {...this.props}
           renewInitialProcess={this.marcCategoriesSubscription}
           reset={this.multiReset}
           tagSection
         />
       </div>
     );
   }
}

export default injectCommonProp(connect(
  (state) => ({
    tagSection: state.marccat.form.tagSectionVisible || false,
  }),
)(CreateTag));
