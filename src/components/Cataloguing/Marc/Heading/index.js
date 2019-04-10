// eslint-disable-next-line import/prefer-default-export
export async function asyncCreateHeading(item, heading) {
  try {
    const response = await post(buildUrl(C.ENDPOINT.CREATE_HEADING_URL, C.ENDPOINT.DEFAULT_LANG_VIEW), heading);
    const data = await response.json();
    item.variableField.categoryCode = data.categoryCode;
    item.variableField.keyNumber = data.keyNumber;
    item.variableField.displayValue = data.displayValue;
    showValidationMessage(this.callout, Localize('cataloging.record.tag.create.success'), C.VALIDATION_MESSAGE_TYPE.SUCCESS);
  } catch (exception) {
    showValidationMessage(this.callout, Localize('cataloging.record.tag.create.failure'), C.VALIDATION_MESSAGE_TYPE.ERROR);
  }
}
