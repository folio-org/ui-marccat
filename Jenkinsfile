
@Library ('folio_jenkins_shared_libs') _

buildNPM {
  publishModDescriptor = true
  runLint = true
  runSonarqube = true
  runTest = false
  runTestOptions = '--karma.singleRun --karma.browsers ChromeDocker --karma.reporters mocha junit --coverage'
  runRegression =  false /*partial*/

}