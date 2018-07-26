import React from 'react';
import { connect } from '@folio/stripes-connect';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import Pane from '@folio/stripes-components/lib/Pane';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import * as C from '../../Utils';

type CreateTagProps = {
  stripes: Object,
  history: Object,
  resources: Object,
  mutator: Object,
};

type CreateTagState = {
};

class CreateTag extends React.Component<CreateTagProps, CreateTagState> {
  static manifest = Object.freeze({
    marcCategory: {},
    headingType: {},
    itemType: {},
    marcCategories: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `marc-categories?lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.MARC_CATEGORIES,
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
    }
  });

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

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { resources: { marcCategories, headingTypes, itemTypes, functionCodes } } = this.props;
    if (marcCategories && marcCategories.hasLoaded && marcCategoriesSelect.value) {
      const current = marcCategoriesSelect.value;
      this.props.mutator.headingType.replace(current);
    }

    let functionCodesOptions = {};
    if (functionCodes) {
      functionCodesOptions = functionCodes.records.map((element) => (
        <option key={element.value} value={element.value}>{element.label}</option>
      ));
    }

    let itemTypesOptions = {};
    if (itemTypes) {
      itemTypesOptions = itemTypes.records.map((element) => (
        <option key={element.value} value={element.value}>{element.label}</option>
      ));
    }

    let headingTypesOptions = {};
    if (headingTypes) {
      headingTypesOptions = headingTypes.records.map((element) => (
        <option key={element.value} value={element.value}>{element.label}</option>
      ));
    }

    return (
      <Pane
        firstMenu={this.preparePaneMenu()}
        paneTitle={formatMsg({
          id: 'ui-marccat.template.tag.create',
        })}
      >
        <form name="createTagForm" id="createTagForm" noValidate>
          <Row>
            <Col xs={12}>
              {marcCategories &&
                <Select
                  name="marcCategoriesSelect"
                  id="marcCategoriesSelect"
                  dataOptions={marcCategories.records}
                />
              }
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              {headingTypes &&
                <Select
                  name="headingTypesSelect"
                  id="headingTypesSelect"
                >
                  {headingTypesOptions}
                </Select>
              }
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              {itemTypes &&
                <Select
                  name="itemTypesSelect"
                  id="itemTypesSelect"
                >
                  {itemTypesOptions}
                </Select>
              }
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              {functionCodes &&
                <Select
                  name="functionCodesSelect"
                  id="functionCodesSelect"
                >
                  {functionCodesOptions}
                </Select>
              }
            </Col>
          </Row>

          <Row>
            <Button
              {...this.props}
              onClick={this.createTag}
              type="button"
              buttonStyle="primary"
            >
              <FormattedMessage id="ui-marccat.template.tag.create" />
            </Button>
          </Row>
        </form>
      </Pane>
    );
  }
}

export default connect(CreateTag, C.META.MODULE_NAME);
