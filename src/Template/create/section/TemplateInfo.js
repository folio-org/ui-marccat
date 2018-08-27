/**
 * @format
 * @flow
 */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Field } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import TextField from '@folio/stripes-components/lib/TextField';
import { Accordion } from '@folio/stripes-components/lib/Accordion';

import css from '../../styles/Template.css';

type TemplateInfoProps = {
    translate: (o: Object) => void;
    onToggle: () => void;
    expanded: boolean;
    accordionId: string;
};

export default class TemplateInfo extends React.Component<TemplateInfoProps, {}> {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'W',
    };
    this.handleOption = this.handleOption.bind(this);
  }

  handleOption(e) {
    this.setState({
      selectedOption: e.target.value,
    });
  }

  render() {
    const { translate, expanded, accordionId, onToggle } = this.props;
    return (
      <Accordion
        label={translate({ id: 'ui-marccat.template.detail.information.title' })}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row id="section-name">
          <Col xs={3}>
            <Field
              label={`${translate({
                id: 'ui-marccat.template.form.name',
              })} *`}
              name="templateName"
              placeholder={translate({
                id: 'ui-marccat.template.form.name',
              })}
              aria-label={translate({
                id: 'ui-marccat.template.form.name',
              })}
              fullWidth
              id="input-template-name"
              component={TextField}
              required
            />
          </Col>
          <Col xs={3}>
            <div className={css.radioGroup}>
              <label>Group</label>
              <div>
                <label className={css.radioLabel}>
                  <Field
                    component="input"
                    type="radio"
                    name="group"
                    value="W"
                    checked={this.state.selectedOption === 'W'}
                    onChange={this.handleOption}
                    inline
                  />{' '} W
                </label>
                <label className={css.radioLabel}>
                  <Field
                    component="input"
                    type="radio"
                    name="group"
                    value="E"
                    checked={this.state.selectedOption === 'E'}
                    onChange={this.handleOption}
                    inline
                  />{' '} E
                </label>
                <label className={css.radioLabel}>
                  <Field
                    component="input"
                    type="radio"
                    name="group"
                    value="M"
                    checked={this.state.selectedOption === 'M'}
                    onChange={this.handleOption}
                    inline
                  />{' '} M
                </label>
              </div>
            </div>
          </Col>
        </Row>
      </Accordion>
    );
  }
}
