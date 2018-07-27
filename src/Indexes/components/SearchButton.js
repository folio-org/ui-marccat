import React, { Component } from 'react';
import Button from '@folio/stripes-components/lib/Button';

type SearchButtonProps = {
  stripes: Object;
  submitting:boolean;
  pristine:boolean;
  onSubmit:Function;
};
type SearchButtonState = {};

export default class SearchButton extends Component<SearchButtonProps, SearchButtonState> {
  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { submitting, pristine, onSubmit } = this.props;
    return (
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={submitting || pristine}
        buttonStyle="primary"
        style={{ width: '50%' }}
      >{formatMsg({
          id: 'ui-marccat.search.searchButton',
        })}
      </Button>
    );
  }
}
