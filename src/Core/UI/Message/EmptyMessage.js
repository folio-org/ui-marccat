/**
 * @format
 * @flow
 */
import * as React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import Icon from '@folio/stripes-components/lib/Icon';
import { ToolbarMenu } from '../../';
import css from './EmptyMessage.css';

type EmptyMessageProps = {
  translate: (id:Object) => void;

};


const EmptyMessage = (props: EmptyMessageProps) => {
  const { translate } = props;
  const leftMenu = <ToolbarMenu icon={['search']} />;
  const rightMenu = <ToolbarMenu icon={['gear']} />;
  return (
    <Pane
      dismissible
      onClose={() => {}}
      defaultWidth="fill"
      firstMenu={leftMenu}
      lastMenu={rightMenu}
      paneTitle={translate({
        id: 'ui-marccat.app.title',
      })}
      paneSub={translate({
        id: 'ui-marccat.noResult',
      })}
      appIcon={{ app: 'marccat' }}
    >
      <div className={css.emptyMessage}>
        <div className={css.emptyMessageLabelWrap}>
          <Icon iconRootClass={css.emptyMessageIcon} icon="left-arrow" />
          <span className={css.emptyMessageLabel}>{translate({
            id: 'ui-marccat.initial.title',
          })}
          </span>
        </div>
      </div>
    </Pane>
  );
};

export default EmptyMessage;
