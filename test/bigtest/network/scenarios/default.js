/* istanbul ignore file */

// default scenario is used during `yarn start --mirage`
export default function defaultScenario(server) {
  server.create('fromTemplate');
  server.create('fromAuthTemplate');
  server.createList('mergedSearch', 1);
  server.createList('bibSearch', 1);
  server.createList('noResultSearch', 1);
  server.createList('authoritySearch', 1);
  server.create('browseSearch');
  server.createList('noResultBrowse', 1);
  server.create('bibRecordDetail');
  server.create('authRecordDetail');
  server.create('verticalDetail');
  server.create('headerType');
  server.create('header007Type');
  server.create('header008Type');
  server.create('authHeader008Type');
  server.create('fixedFieldsCodeGroup');
  server.create('fixedFieldsCode31Group');
  server.create('fixedFieldsCodeGroupsByLeader');
  server.create('authFixedFieldsCodeGroup');
  server.create('authFixedFieldsCode008Group');
  server.create('fixedFieldDisplayValue');
  server.create('authFixedFieldDisplayValue');
  server.create('filterTagsListsValue');
  server.create('filterTagValue');
  server.create('validateTag');
  server.create('errorValidateTag');
  server.create('createHeadingValue');
  server.create('createBibRecordValue');
  server.create('createAuthRecordValue');
  server.create('duplicateBibRecordValue');
}
