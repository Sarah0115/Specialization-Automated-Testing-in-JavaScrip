pipeline {
    agent any

    triggers {
        cron('H */2 * * *')
    }

    stages {

        stage('Test UI') {
            steps {
                echo 'Corriendo pruebas UI...'
                bat '''
                    echo Instalando dependencias...
                    npm install

                    echo Ejecutando tests de UI...
                    npm run ui:report
                '''
            }
        }

        stage('Test API') {
            steps {
                echo 'Corriendo pruebas API...'
                bat '''
                    echo Ejecutando tests de API...
                    npm install
                    npm run api:report
                '''
            }
        }
    }

    post {
        success {
            echo 'Todas las pruebas se ejecutaron correctamente.'
        }
        failure {
            echo 'Error detectado en alguna etapa de la pipeline.'
        }
        always {
            echo 'Limpiando workspace...'
            cleanWs()
        }
    }
}
