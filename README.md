## CMAJ Legend 

CMAJ Legend is hosted inside of Joule's development cluster at Google Cloud Platform, In order to have access to it, it must be published to be publicly available, for the time being the only way to access either MongoDB or the Front End is by using a K8s Port Forwarding Proxy (for more about how, please read further).

You should have credentials to be able to access our GCP instances, the prerequisites for it is to have install google cloud software development kit, this are a group of command line tools that will allow us to authenticate to GCP and then have access to the development environment, as well as to establish the connection via a port forwarder proxy.

Please make sure Google Cloud SDK is installed on your system by following the guide:

https://cloud.google.com/sdk/ to select an OS or https://cloud.google.com/sdk/docs/quickstart-macos to install on Mac OS.

A second requirement is that you have installed Docker for Mac OS, so please go ahead and follow the instructions on:

https://docs.docker.com/docker-for-mac/install/

Once installed you can reach out to me and give me  the email address so I can give authorization to have access. 

Once this is done you will need to run the following commands:

This will authenticate your credentials with google cloud and establish an active session:
`gcloud auth login`

Once authenticated and authorized you'll be able to get the token required to connect to our development cluster with the following command:

`gcloud container clusters get-credentials joule-development-can-ne-a-k8s --zone northamerica-northeast1-a --project joule-development-218113`

The authenticated token should be set on your local machine, inside of the configuration file located on the path `~/.kube/config`, however this is not prone to change often. And most likely this is a step that you'll need to execute only once.

You will need two port forwarding proxies, one to reach the MongoDB as I assume you still need to load your Schemas and Models, normally once this is setup you won't have need to do this, only every time that you need to talk directly to the DB, however you'll need a second port fowarding proxy to access the NodeJS APP, the APP is configured already to talk to the DB internally.

Basically a port fowarding proxy establishes an encripted connection between your computer and the internal network of the Kubernetes Cluster by doing this it exposes the services as if they were running locally, thus exposing them for you to consume them as they were in your localhost, it is important to know that the proxy should be enabled/active while you need access.

To establish a connection for the DB issue the following command:

`kubectl port-forward $(echo $(kubectl get pods -o=name --all-namespaces | grep mongodb) | sed 's/pod\///g') 27017 -n mongodb`

Please send me an email so that I can give you the admin credentials.

And the following command to establish a connection with the Front End
`kubectl port-forward $(echo $(kubectl get pods -o=name --all-namespaces | grep cmaj-legend) | sed 's/pod\///g') 8080 -n legend`

Then you should be able to access Mongo DB as localhost at port 27017 and to access the NodeJS app as localhost on port 8080











