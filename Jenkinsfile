pipeline {
    agent any
     tools {
            nodejs 'Node20'
    }
    triggers {
        cron('H */2 * * *')
    }
    stages{
        stage('Linter') {
            steps {
                echo 'Running ESlint'
                bat 'npm install'
                bat 'npm run lint'            
            }
        }
         stage('Prettier') {
            steps {
                echo 'Running Prettier'
                bat 'npm install'
                bat 'npm run format'
            }
        }
       stage('Test UI') {
            steps {
                echo 'Execute UI test...'
                bat 'npm install'
                bat 'npm run ui:report'
            }
        }

        stage('Test API') {
            steps {
                echo 'Execute API test...'
                bat 'npm install'
                bat 'npm run api:report'
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
    }
}
