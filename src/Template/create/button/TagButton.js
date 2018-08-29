/**
 * @format
 */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import { actionTypes as ActionTypes } from '../../../Redux/actions/Actions';
import { EMPTY_PARAMETER } from '../../../Utils';

type TagButtonProps = {
    dispatch: () => void;
    renewInitialProcess: () => void;
    reset: () => void;
    state: Object;
    tagSection: boolean;
    mutator: Object;
};

export default function TagButton({ tagSection, reset, renewInitialProcess, ...props }: TagButtonProps) {
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
    reset(EMPTY_PARAMETER);
    renewInitialProcess();
  };

  return (
    <Row>
      {tagSection &&
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
