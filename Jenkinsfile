pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building the app '
                git branch: 'main', credentialsId: 'b6ef5a54-8357-4aa1-8f35-4ea57a1c1b8d', url: 'https://github.com/Sarah0115/Specialization-Automated-Testing-in-JavaScrip'
            }
        }
        stage('Test') {
            steps {
                echo 'Running test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'HDeploying app'
            }
        }
    }
}
