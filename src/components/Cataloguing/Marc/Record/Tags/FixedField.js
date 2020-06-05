// @flow
import * as React from 'react';
import { Button } from '@folio/stripes/components';
import { first, isEmpty, sortBy } from 'lodash';
import { connect } from 'react-redux';
import { registerField, reset, autofill, unregisterField } from 'redux-form';
import {
  EMPTY_FIXED_FIELD,
  TAGS,
  SORTED_BY,
  RECORD_ACTION,
} from '../../../Utils/MarcConstant';
import Tag00X from './Tag00X';
import { sort } from '../../../Utils/MarcApiUtils';
import { Localize, findParam } from '../../../../../shared';
import Tag006 from './Tag006';
import Tag007 from './Tag007';
import { ACTION } from '../../../../../redux/actions';

type P = {
  handleOnChange: () => void,
} & Props;

type State = {
  fields: Array<*>,
};
class FixedField extends React.PureComponent<P, State> {
  constructor(props: P) {
    super(props);

    this.state = {
      inizialized: false,
      fields: sort(props.field),
      isCreationMode: findParam('mode') === RECORD_ACTION.CREATION_MODE,
      is006Del:false,
      is007Del: true,
    };
    // this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.getActionButton = this.getActionButton.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { fields, inizialized } = this.state;
    const field006 = fields.filter(f => f.fixedField.code === TAGS._006);
    const field007 = fields.filter(f => f.fixedField.code === TAGS._007);
    if (!inizialized) {
      if (field006.length === 0) {
        fields.push(EMPTY_FIXED_FIELD(TAGS._006));
      }
      if (field007.length === 0) {
        fields.push(EMPTY_FIXED_FIELD(TAGS._007));
      }
      this.setState({ fields, inizialized: true });
    }
  }

  // handleAdd = code => {
  //   this.setState(({ fields }) => ({
  //     fields: fields.concat(EMPTY_FIXED_FIELD(code)),
  //   }));
  // };

  handleRemove = e => {
    const { fields, is006Del, is007Del } = this.state;
    const { dispatch, change } = this.props;
    const code = e.currentTarget.name;
    dispatch(change(code, null));
    dispatch(change('Tag' + code, null));
    if (code === '006') {
      dispatch({ type: ACTION.SETTINGS, data:{ tagDel6: 'del' } });
      this.setState({ is006Del: true });
    } else {
      dispatch({ type: ACTION.SETTINGS, data: { tagDel7: 'del' } });
      this.setState({ is007Del: true });
    }
  }

  RenderField00X = () => {
    const { fields, is006Del, is007Del } = this.state;
    const { headertype006, headertype007, headertype008 } = this.props;
    return (
      <React.Fragment>
        {sortBy(fields, SORTED_BY.CODE).map((f, index) => (f.code === TAGS._006 ? (
          <div>
            {this.getActionButton(f, index)}
            <Tag006 element={f} headingTypes={headertype006} isDeleted={is006Del} {...this.props} />
          </div>
        ) : f.code === TAGS._007 ? (
          <div>
            {this.getActionButton(f, index)}
            <Tag007 element={f} headingTypes={headertype007} isDeleted={is007Del} {...this.props} />
          </div>
        ) : (
          <Tag00X element={f} headingTypes={headertype008} {...this.props} />
        )))}
      </React.Fragment>
    );
  };

  getActionButton(item, index) {
    const { isCreationMode } = this.state;
    return (
      <div style={{ width: '20%', float: 'right', marginTop: '15px' }}>
        {/* <Button
          name={item.code}
          id={'add'.concat(item.code).concat('-' + index)}
          onClick={this.handleAdd}
        >
          {Localize({
            key: 'cataloging.fixedfield.section.add.newtag',
            value: item.code,
          })}
        </Button> */}
        <Button
          disabled={!isCreationMode}
          name={item.code}
          id={'remove'.concat(item.code).concat('-' + index)}
          onClick={this.handleRemove}
        >
          {Localize({
            key: 'cataloging.fixedfield.section.remove.newtag',
            value: item.code,
          })}
        </Button>
      </div>
    );
  }

  render() {
    return this.RenderField00X();
  }
}

export default connect(
  ({
    marccat: {
      data: { headertype006, headertype007, headertype008 },
    },
  }) => ({
    headertype006,
    headertype007,
    headertype008,
  })
)(FixedField);
