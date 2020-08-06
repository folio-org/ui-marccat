/* istanbul ignore file */

// default scenario is used during `yarn start --mirage`
export default function defaultScenario(server) {
  server.create('fromTemplate', 1);
  server.createList('mergedSearch', 1);
}
