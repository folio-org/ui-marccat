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
      selectedOption: 3,
    };
    this.handleOption = this.handleOption.bind(this);
  }

  handleOption(e) {
    this.setState({
      selectedOption: parseInt(e.target.value, 10),
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
              name="name"
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
                    value={3}
                    checked={this.state.selectedOption === 3}
                    onChange={this.handleOption}
                    inline
                  />{' '} W
                </label>
                <label className={css.radioLabel}>
                  <Field
                    component="input"
                    type="radio"
                    name="group"
                    value={4}
                    checked={this.state.selectedOption === 4}
                    onChange={this.handleOption}
                    inline
                  />{' '} E
                </label>
                <label className={css.radioLabel}>
                  <Field
                    component="input"
                    type="radio"
                    name="group"
                    value={5}
                    checked={this.state.selectedOption === 5}
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
