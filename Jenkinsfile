pipeline {
    agent any
    stages {
      stage('SCM Checkout') {
           when {
                 expression { BRANCH_NAME ==~ /(master|develop|release)/ }
                 }
            steps {
                echo 'Checkout....'
             }
        }
          stage('Publish Npm') {
               when {
                 expression { BRANCH_NAME ==~ /(master|develop|release)/ }
                 }
                steps {
                    echo 'Publishing on Npm....'
              }
         }
    }
}
