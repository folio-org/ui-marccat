import React from 'react';
import { connect } from '@folio/stripes-connect';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import Pane from '@folio/stripes-components/lib/Pane';
import TextField from '@folio/stripes-components/lib/TextField';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import SelectTagCreation from './SelectTagCreation';
import * as C from '../../Utils';

type CreateTagProps = {
  stripes: Object,
  history: Object,
  resources: Object,
  resources: Object,
  selectTagCreation: Boolean,
  tagValue: String,
  ind1Value: String,
  ind2Value: String,
  categoryCode: String,
  createTagForm: Object
};

type CreateTagState = {
};

class CreateTag extends React.Component<CreateTagProps, CreateTagState> {
  static manifest = Object.freeze({
    marcCategories: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `marc-categories?lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.MARC_CATEGORIES,
    }
  });
  constructor(props) {
    super(props);
    this.createTag = this.createTag.bind(this);
    this.state = {
      selectTagCreation: false
    };
  }

  createTag() {
    //TODO: validate this fields    
    this.setState(
      { selectTagCreation: true,
        tagValue: createTagForm.tag.value,
        ind1Value: createTagForm.ind1.value,
        ind2Value: createTagForm.ind1.value,
        categoryCode: createTagForm.marcCategoriesSelect.value }
    );
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
    const { resources: { marcCategories } } = this.props;
    let marcCategoryOptions = {};
    if (marcCategories) {
      marcCategoryOptions = marcCategories.records.map((element) => (
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
            <Col xs={4}>
              <TextField
                label={formatMsg({
                  id: 'ui-marccat.template.form.tag.code',
                })}
                id="tag"
                name="tag"
                maxlength="3"
                /*type="number"*/
                fullWidth={false}
              />
            </Col>
            <Col xs={2}>
              <TextField
                label={formatMsg({
                  id: 'ui-marccat.template.form.tag.ind1',
                })}
                id="ind1"
                name="ind1"
                maxlength="1"
                fullWidth={false}
              />
            </Col>
            <Col xs={2}>
              <TextField
                label={formatMsg({
                  id: 'ui-marccat.template.form.tag.ind2',
                })}
                id="ind2"
                name="ind2"
                maxlength="1"
                fullWidth={false}
              />
            </Col>
          </Row>
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
            <Button
              {...this.props}
              onClick={this.createTag}
              type="button"
              buttonStyle="primary"
            >
              <FormattedMessage id="ui-marccat.template.tag.create" />
            </Button>
          </Row>
          {this.state.selectTagCreation &&
            <SelectTagCreation
              {...this.props}
              tag={this.state.tagValue}
              ind1={this.state.ind1Value}
              ind2={this.state.ind2Value}
              categoryCode={this.state.categoryCode}
            />
          }
        </form>
      </Pane>
    );
  }
}

export default connect(CreateTag, C.META.MODULE_NAME);
