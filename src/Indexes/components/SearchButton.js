/**
 * @format
 * @flow
 */
import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import css from '../style/indexes.css';

type SearchButtonProps = {
  stripes: Object;
  submitting:boolean;
  pristine:boolean;
  onSubmit:Function;
};
type SearchButtonState = {};

export default class SearchButton extends React.Component<SearchButtonProps, SearchButtonState> {
  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { submitting, pristine, onSubmit } = this.props;
    return (
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={submitting || pristine}
        buttonStyle="primary"
        buttonClass={css.CustomButtons}
      >{formatMsg({
          id: 'ui-marccat.search.searchButton',
        })}
      </Button>
    );
  }
}
