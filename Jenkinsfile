pipeline {
  agent {
    label "builder-base"
  }
  environment {
    ORG = 'joule-cma'
    APP_NAME = 'cmaj-legend'
    CHARTMUSEUM_CREDS = credentials('jenkins-x-chartmuseum')
  }
  stages {
    stage('CI Build and push snapshot') {
      when {
        branch 'PR-*'
      }
      environment {
        PREVIEW_VERSION = "0.0.0-SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER"
        PREVIEW_NAMESPACE = "$APP_NAME-$BRANCH_NAME".toLowerCase()
        HELM_RELEASE = "$PREVIEW_NAMESPACE".toLowerCase()
      }
      steps {
        container('builder-base') {
          sh "npm install"
          sh "CI=true DISPLAY=:99 npm test"
          sh "export VERSION=$PREVIEW_VERSION && skaffold build -f skaffold.yaml"
          sh "echo 'DEVELOPMENT RELEASE'"
          sh "jx step post build --image $DOCKER_REGISTRY/cmaj/legend/legend-app:$PREVIEW_VERSION"        

          dir('./charts/preview') {
            sh "make preview"
            sh "jx preview --app $APP_NAME --dir ../.."
          }
        }
      }
    }
    stage('Build Release') {
      when {
        branch 'master'
      }
      steps {
        container('builder-base') {

          // ensure we're not on a detached head
          sh "git checkout master"
          sh "git config --global credential.helper store"
          sh "jx step git credentials"
          //setup gcp service account access
          withCredentials([string(credentialsId: 'google-cloud-service-account', variable: 'SERVICE_ACCOUNT_KEY')]) {
            writeFile file: '/home/jenkins/workspace/Joule-CMA_CMAJ-Legend_master/key.json', text: SERVICE_ACCOUNT_KEY
            sh "gcloud auth activate-service-account --key-file key.json"
            }
          // so we can retrieve the version in later steps
          sh "echo \$(jx-release-version) > VERSION"
          sh "jx step tag --version \$(cat VERSION)"
          sh "npm install"
          sh "echo 'PRODUCTION RELEASE'"
          //sh "CI=true DISPLAY=:99 npm test"
          sh "CI=true DISPLAY=:99"
          sh "export VERSION=`cat VERSION` && skaffold build -f skaffold.yaml"
          sh "jx step post build --image $DOCKER_REGISTRY/CMAJ/legend/legend-app:\$(cat VERSION)"        
          }
      }
    }
    stage('Promote to Environments') {
      when {
        branch 'master'
      }
      steps {
        container('builder-base') {
            sh 'UPDATEDDEPLOYMENTSCRIPT=kubernetes/DeployNewArtifact-$(date "+%Y%m%d")-$(openssl rand -hex 4).yaml'
            sh 'cp kubernetes/DeployNewArtifact.yaml $UPDATEDDEPLOYMENTSCRIPT'
            sh 'sed -i -e "s/<ModuleVersion>/$MODULEVERSION/g" $UPDATEDDEPLOYMENTSCRIPT'
            sh 'sed -i -e "s/<environment>/$GCPENVIRONMENT/g" $UPDATEDDEPLOYMENTSCRIPT'
            sh 'kubectl patch deployment cmaj-legend --patch "$(cat $UPDATEDDEPLOYMENTSCRIPT)" --namespace legend'
          }
        }
      }
    }
  post {
        always {
          cleanWs()
        }
  }
}
