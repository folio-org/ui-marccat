/**
 * @format
 */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';

type CreateTagButtonProps = {
    createNewTag: () => void;
    submitting: boolean;
};

export default function CreateTagButton({ createNewTag, ...props }: CreateTagButtonProps) {
  return (
    <Row>
      <Button
        {...props}
        onClick={createNewTag}
        type="button"
        buttonStyle="primary"
        disabled={!props.submitting}
      >
        <FormattedMessage id="ui-marccat.template.tag.add" />
      </Button>
    </Row>
  );
}
