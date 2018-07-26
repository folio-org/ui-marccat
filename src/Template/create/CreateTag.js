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
      records: 'headingTypes'
    }
  });

  constructor(props) {
    super(props);
    this.props.mutator.marcCategory.replace('1');
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

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { resources: { marcCategories, headingTypes } } = this.props;

    let marcCategoryOptions = {};
    if (marcCategories) {
      marcCategoryOptions = marcCategories.records.map((element) => (
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
                >
                  {marcCategoryOptions}
                </Select>
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
