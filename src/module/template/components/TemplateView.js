import React from 'react';
import PropTypes from 'prop-types';
import Settings from '@folio/stripes-components/lib/Settings';
import _ from 'lodash';
import { connect } from '@folio/stripes-connect';
import { stripesShape } from '@folio/stripes-core/src/Stripes'; 
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';


class TemplateView extends React.Component {

    static manifest = Object.freeze({
        recordTemplate: {
            type: 'rest',
            root: 'http://localhost:8080/cataloging',       
            path: 'record-templates', 
            headers: { 'x-okapi-tenant': 'tnx'},
            records: 'recordTemplates',
            GET: {
                params: {lang: 'ita', type: 'B'}
            },                      
        }
    });

    constructor(props) {
        super(props);            
    }
    render(){
        const { resources: { recordTemplate } } = this.props;
        if (!recordTemplate || !recordTemplate.hasLoaded) return <div />;
        const templates = recordTemplate.records;
        const formatter = {
            'Id: id': x => _.get(x, ['id']),
            'name: name': x => _.get(x, ['name']),
        };                
				          
		return (
            <Paneset static>            
            <Pane defaultWidth="80%" paneTitle="Some Stripes Components">    
                <div>
                <MultiColumnList
                        id="list-templates"
                        contentData={templates}
                        rowMetadata={['id', 'id']}
                        formatter={formatter}
                        visibleColumns={['Id: id', 'name']}
                        ariaLabel="TemplateView"
                        containerRef={(ref) => { this.resultsList = ref; }}
                        rowFormatter={this.anchoredRowFormatter}
                />
                </div>
            </Pane>
      </Paneset>
      ); }
}

TemplateView.propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    showSettings: PropTypes.bool,
}

export default TemplateView;