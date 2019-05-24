import * as React from 'react';
import { withContext } from 'recompose';

const ctx = { store: {} };
const Context = withContext(ctx, props => ({
  store: props.store,
  state: props.store.marccat,
  data: props.store.marccat.data,
  test: props.store.marccat.data,
  form: props.store.form,
}));
export default Context(({ children }) => <React.Fragment>{children}</React.Fragment>);
