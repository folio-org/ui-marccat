/**
 * @format
 * @flow
 */
import * as React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import css from '../style/indexes.css';

type SearchButtonProps = {
  submitting:boolean;
  pristine:boolean;
  onSubmit:Function;
  translate:Function;
};

export default function SearchButton({ ...props }:SearchButtonProps) {
  const { submitting, pristine, onSubmit, translate } = props;
  return (
    <Button
      type="submit"
      onClick={onSubmit}
      disabled={submitting || pristine}
      buttonStyle="primary"
      buttonClass={css.CustomButtons}
    >{translate({
        id: 'ui-marccat.search.searchButton',
      })}
    </Button>
  );
}
