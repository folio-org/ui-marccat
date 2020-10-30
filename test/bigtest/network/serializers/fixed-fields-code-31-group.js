import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);

    return json.fixedFieldsCode31Groups[0];
  }
});