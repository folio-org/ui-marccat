/**
 * @format
 */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import { actionTypes as ActionTypes } from '../../../Redux/actions/Actions';

type TagButtonProps = {
    dispatch: () => void;
    dirty: boolean;
    tagSectionVisible: boolean;
    mutator: Object;
};

export default function TagButton({ tagSectionVisible, ...props }: TagButtonProps) {
  const showTagSection = () => {
    props.dispatch({
      type: ActionTypes.SHOW_TAG_SECTION,
      payload: true
    });
  };

  const cancelCurrentTag = () => {
    props.dispatch({
      type: ActionTypes.SHOW_TAG_SECTION,
      payload: false
    });
  };

  return (
    <Row>
      {tagSectionVisible &&
      <Button
        {...props}
        onClick={() => showTagSection()}
        type="button"
      >
        <FormattedMessage id="ui-marccat.template.tag.create" />
      </Button>}
      <Button
        {...props}
        onClick={() => cancelCurrentTag()}
        type="button"
      >
        <FormattedMessage id="ui-marccat.template.tag.cancel" />
      </Button>
    </Row>
  );
}
