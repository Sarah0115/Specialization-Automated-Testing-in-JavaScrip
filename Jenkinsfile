pipeline {
    agent any

    triggers {
        cron('H */2 * * *')
    }

    stages {

        stage('Test UI') {
            steps {
                echo 'Execute UI test...'
                bat '''
                    npm install
                    npm run ui:report
                '''
            }
        }

        stage('Test API') {
            steps {
                echo 'Execute API test...'
                bat '''
                    npm install
                    npm run api:report
                '''
            }
        }
    }

    post {
        success {
            echo 'Successful execution'
        }
        failure {
            echo 'Error.'
        }
        always {
            echo 'Workspace wiping out...'
            cleanWs()
        }
    }
}
