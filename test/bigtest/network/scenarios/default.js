/* istanbul ignore file */

// default scenario is used during `yarn start --mirage`
export default function defaultScenario(server) {
  server.create('fromTemplate');
  server.create('fromAuthTemplate');
  server.createList('mergedSearch', 1);
  server.createList('bibSearch', 1);
  server.createList('authoritySearch', 1);
  server.create('browseSearch');
  server.create('bibRecordDetail');
  server.create('verticalDetail');
  server.create('headerType');
  server.create('fixedFieldsCodeGroup');
  server.create('fixedFieldsCodeGroupsByLeader');
}
