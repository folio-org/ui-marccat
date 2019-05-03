// @flow
import * as React from 'react';
import { Pane, Icon, MenuSection } from '@folio/stripes/components';
import RecordDetails from '../RecordDetails';
import { injectCommonProp } from '../../../../shared';
import { META } from '../../../../config/constants';
import { Localize, findParam } from '../../../../utils/Function';
import { duplicaRecordAction } from '../../Actions';

class RecordDetailPane extends React.Component {

  duplicaRecord = (props) => {
    const id = findParam('id' || 'savedId');
    const { store } = props;
    const cb = (r) => this.onDuplicate(r, id);
    store.dispatch(duplicaRecordAction(id, cb));
  }

  onDuplicate = (response, id) => {
    const { router, toggleFilterPane } = this.props;
    setTimeout(() => {
      toggleFilterPane();
      router.push(`/marccat/cataloging?id=${id}&mode=duplicate`);
    }, 3000);

  };


  ActionMenuDetail = ({ ...props }) => {
    return (
      <React.Fragment>
        <MenuSection label="Actions" style={{ fontWeight: '600' }}>
          {Localize([
            { key: 'search.actionmenu.export.mrc' },
            { key: 'search.actionmenu.export.csv' },
            { key: 'search.actionmenu.export.dat' },
            { key: 'search.actionmenu.print' },
            { key: 'search.actionmenu.opac' },
            { key: 'search.actionmenu.duplicate', action: () => this.duplicaRecord(props) },
            { key: 'search.actionmenu.duplicate.ebook' }], true)}
        </MenuSection>
        <MenuSection label="View related...." style={{ paddingLeft: '15px', fontWeight: '600' }}>
          {Localize([
            { key: 'search.actionmenu.holdings' },
            { key: 'search.actionmenu.instances' },
            { key: 'search.actionmenu.authority.records' }
          ], true)}
        </MenuSection>
      </React.Fragment>
    );
  };

  render() {
    const { detailPaneMeta, detail, onClose, rightMenuEdit } = this.props;
    return (
      <React.Fragment>
        <Pane
          id="pane-details"
          defaultWidth="35%"
          paneTitle={detailPaneMeta.title}
          paneSub={detailPaneMeta.subTitle}
          appIcon={{ app: META.ICON_TITLE }}
          actionMenu={() => <this.ActionMenuDetail {...this.props} />}
          dismissible
          onClose={onClose}
          lastMenu={rightMenuEdit}
        >
          {(!detail) ?
            <Icon icon="spinner-ellipsis" /> :
            <RecordDetails {...this.props} detail={detail} />
          }
        </Pane>
      </React.Fragment>
    );
  }
}
export default (injectCommonProp(RecordDetailPane));
