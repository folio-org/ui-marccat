// @flow
import * as React from 'react';
import { Button } from '@folio/stripes/components';
import { first, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import {
  EMPTY_FIXED_FIELD,
  TAGS,
} from '../../../Utils/MarcConstant';
import Tag00X from './Tag00X';
import { sort } from '../../../Utils/MarcApiUtils';
import { Localize } from '../../../../../shared';

class FixedField extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      inizialized: false,
      fields: sort(props.field),
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.getActionButton = this.getActionButton.bind(this);
    this.RenderField = this.RenderField.bind(this);
    this.RenderField006 = this.RenderField006.bind(this);
    this.RenderField007 = this.RenderField007.bind(this);
    this.RenderField008 = this.RenderField008.bind(this);
  }

  componentWillMount() {
    const { fields, inizialized } = this.state;
    const field006 = fields.filter(f => f.fixedField.code === TAGS._006);
    const field007 = fields.filter(f => f.fixedField.code === TAGS._007);
    if (!inizialized) {
      if (field006.length === 0) fields.push(EMPTY_FIXED_FIELD(TAGS._006));
      if (field007.length === 0) fields.push(EMPTY_FIXED_FIELD(TAGS._007));
      this.setState({ fields, inizialized: true });
    }
  }

  handleAdd = (code) => {
    this.setState(({ fields }) => ({
      fields: fields.concat(EMPTY_FIXED_FIELD(code))
    }));
  }

  handleRemove(index) {
    this.setState(({ fields }) => ({
      fields: [...fields.slice(0, index), ...fields.slice(index + 1)]
    }));
  }

  RenderField({ element, ...props }) {
    const { headertype006, headertype007, headertype008 } = props;
    const headingTypes = headertype006 || headertype007 || headertype008;
    return (
      <React.Fragment>
        {!isEmpty(headingTypes) &&
          <Tag00X
            {...props}
            element={element}
            headingTypes={headingTypes}
          />
        }
      </React.Fragment>
    );
  }

  RenderField00X = () => {
    const { fields } = this.state;
    const { headertype006, headertype007, headertype008 } = this.props;
    return (
      <React.Fragment>
        {sort(fields).map(f => (
          (f.code === TAGS._006) ? <Tag00X element={f} headingTypes={headertype006} {...this.props} />
            : (f.code === TAGS._007) ? <Tag00X element={f} headingTypes={headertype007} {...this.props} />
              : <Tag00X element={f} headingTypes={headertype008} {...this.props} />
        ))}
      </React.Fragment>);
  }

  RenderField006(props) {
    const { headertype006 } = props;
    return (
      <this.RenderField headingTypes={headertype006 || {}} {...props} />
    );
  }

  RenderField007(props) {
    const { fields } = this.state;
    const { headertype007 } = props;
    const field007 = first(fields.filter(f => f.fixedField.code === TAGS._007));
    return (
      <this.RenderField element={field007} headingTypes={headertype007 || {}} {...props} />
    );
  }

  RenderField008(props) {
    const { fields } = this.state;
    const { headertype008 } = props;
    const field008 = first(fields.filter(f => f.fixedField.code === TAGS._008));
    return (
      <this.RenderField element={field008} headingTypes={headertype008 || {}} {...props} />
    );
  }

  getActionButton(item) {
    return (
      <div style={{ display: 'flex' }}>
        <Button
          marginBottom0
          id={`clickable-add-${item.code}`}
          onClick={this.handleAdd}
        >
          {Localize({ key: 'cataloging.fixedfield.section.add.newtag', value: item.code })}
        </Button>
      </div>);
  }

  render() {
    return (
      this.RenderField00X()
    );
  }
}

export default (connect(
  ({ marccat: { data: {
    headertype006,
    headertype007,
    headertype008 } }
  }) => ({
    headertype006,
    headertype007,
    headertype008,
  }),
)((FixedField)));
