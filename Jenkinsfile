pipeline {
    agent any

    environment {
        REGISTRY = "vrajnandak"
        IMAGE_NAME = "vrajnandak/cinesense-frontend-image"
        TAG = "latest"
	DOCKERHUB_CREDENTIALS = "dockerhub-cinesense"
        ANSIBLE_PLAYBOOK = "deploy.yaml"
    }

    stages {

	stage('Check Tools') {
	    steps {
	        echo 'Checking Docker version...'
		sh '''
		    docker --version
		'''
	    }
	}


        stage('Install + Test + Build (inside Node container)') {
            agent {
                docker {
                    image 'node:20-alpine'
                    args '-u root:root'   // ensures permissions
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run type-check || true'
                sh 'npm test || true'
                sh 'npm run build'
            }
        }
        stage('Docker Build') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${TAG} ."
                }
            }
        }

        stage('Docker Push') {
            steps {
 		script {
		    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
		        sh "docker push $IMAGE_NAME:$TAG"
		    }
		}
            }
        }

        stage('Deploy via Ansible') {
	    steps {
	        script {
                    echo "Deploying frontend via Ansible..."

                    // Run the ansible playbook locally on the Jenkins agent
                    sh """
                        ansible-playbook ansible/frontend-deployment.yml \
                        -i localhost, \
                        --connection=local \
                        --extra-vars "image=${IMAGE_NAME}:${TAG} namespace=frontend"
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed: ${IMAGE_NAME}:${TAG}"
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}

