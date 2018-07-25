import React from 'react';
import { connect } from '@folio/stripes-connect';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import * as C from '../../Utils';

type CreateTagProps = {
    resources: Object;
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

    render() {
      const { resources: { marcCategories } } = this.props;
      let marcCategoryOptions = {};
      if (marcCategories) {
        marcCategoryOptions = marcCategories.records.map((element) => (
          <option key={element.value} value={element.value}>{element.label}</option>
        ));
      }

      return (
        <Row>
          <Col xs={12}>
            <form name="createTagForm" id="createTagForm" noValidate>
              {marcCategories &&
                <Select
                  name="marcCategoriesSelect"
                >
                  {marcCategoryOptions}
                </Select>
              }
            </form>
          </Col>
        </Row>
      );
    }
}

export default connect(CreateTag, C.META.MODULE_NAME);
