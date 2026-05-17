pipeline {

    agent any

    stages {

        stage('📥 Clone Repository') {

            steps {

                git branch: 'main',
                url: 'https://github.com/sushmithagk/smart-campus-system.git'

            }

        }

        stage('🐳 Docker Deploy') {

            steps {

                sh '''
                    cd /smart_campus_system

                    docker-compose down

                    docker-compose up --build -d
                '''

            }

        }

    }

    post {

        success {

            echo '✅ Pipeline Successfully Executed'

        }

        failure {

            echo '❌ Pipeline Failed'

        }

    }

}