 <!-- markdownlint-disable MD014 MD007 MD034-->

# 1. Omnia Radix Workshop 1

Purpose

The purpose of the workshop is to give a general and hands-on introduction to Radix. We do this by "forking" and example application, get familiar with the application, establish a CI environment locally, move the application into Radix and then establish the full CI/CD DevOps cycle.

<!-- TOC -->

- [1. Omnia Radix Workshop 1](#1-omnia-radix-workshop-1)
    - [1.1. Part 1](#11-part-1)
        - [1.1.1. Pre-requisites](#111-pre-requisites)
        - [1.1.2. Getting started](#112-getting-started)
        - [1.1.3. Exploring the Echo app](#113-exploring-the-echo-app)
        - [1.1.4. Exploring the WWW app](#114-exploring-the-www-app)
        - [1.1.5. Preparing for Radix](#115-preparing-for-radix)
        - [1.1.6. Explore radixconfig.yaml](#116-explore-radixconfigyaml)
        - [1.1.7. Creating the application on Radix](#117-creating-the-application-on-radix)
        - [1.1.8. Using multiple branches - multiple environments](#118-using-multiple-branches---multiple-environments)
        - [1.1.9. Monitoring & Metrics](#119-monitoring--metrics)
    - [1.2. Typical questions](#12-typical-questions)
    - [1.3. Where to get started, get help, log issues or feature requests](#13-where-to-get-started-get-help-log-issues-or-feature-requests)
        - [1.3.1. Getting help](#131-getting-help)
        - [1.3.2. Getting started](#132-getting-started)
        - [1.3.3. Log issues & feature requests](#133-log-issues--feature-requests)
    - [1.4. Part 2](#14-part-2)
        - [1.4.1. Next steps](#141-next-steps)

<!-- /TOC -->

### 1.1. Pre-requisites

- Have access to the Radix Playground
  - Apply for access to the Radix Playground in AccessIT (seach for ````Radix Playground Users````)
  -  Find Radix at [https://console.playground.radix.equinor.com](https://console.playground.radix.equinor.com)
- Account on github.com
- Git installed and working locally against github.com
- Docker running locally
- Local dev. environment (IDE++)
- Node js eco system installed and running ([Downnload Nodejs](https://nodejs.org/en/download/))
- Laptop that "works" on “Statoil Approved” WiFi. If not - know how to handle proxy fun for both Docker and local development environment

## 2.1. Part 1 - Register app in Radix

Scenario

Your team has just started developing an application that generates secure passwords and displayes it in a web client. To get feedback from end users as fast as possible, your team have chosen to do [UI first](https://konstantinpavlov.net/blog/2017/03/07/ui-first-development/) development. To facilitate a short feedback loop, continous CI/CD (automate build/deploy) of the application needs to be setup, ending with a public url that users can test.

An OpenAPI specification has been agreed on with the API team, so we'll begin with mocking data for the UI. Radix has been choosen as platform, seemingly perfect for the scenario.

### 2.1.1. Getting started

1. Fork repository to your home on github. Consider choosing an alternative name for the repository
1. Clone your newly forked repository down to your developer laptop

### 2.1.2. Exploring the WWW app

1. Move into the [www](../www/) folder and explore how to develop the WWW app using ```ReactJs``` and ```Node.js``` as well as Dockerizing the application.

### 2.1.3. Preparing for Radix

- The Radix cluster we use for the workshop is available at https://console.playground.radix.equinor.com/
- Radix documentation is available at https://www.radix.equinor.com/

Important to know:

1. The difference between ```platform user``` and ```application user```
1. Important terminology: ```application```, ```environments```,```components```, and ```replicas``` [Important Radix Concepts](https://www.radix.equinor.com/docs/topic-concepts/)
1. ```radixconfig.yaml``` - lives on the master branch and is your infrastrucure as code - drive your app in Radix.

### 2.1.4. Explore radixconfig.yaml

1. Reading the [docs](https://github.com/equinor/radix-operator/blob/master/docs/radixconfig.md) [docs app](https://www.radix.equinor.com/docs/reference-radix-config/)
1. Exploring the config file for the example app [./radixconfig.yaml](../radixconfig.yaml)

### 2.1.5. Creating the application on Radix

1. Update the name of ```your instance``` of the application in radixconfig.yaml
1. Follow the getting started guide (www.radix.equinor.com) or "just do it!"
1. Do a change to trigger the initial build (or use the "New job" feature in the jobs/environment section). Examine web-hooks and reponse in Radix
1. Verify that the app work on the public end-point it has been given.

## 2.2 Part 2 - connecting UI and API

Scenario

The UI is comming along nicely, and your team has started on the API. Next step is to integrate the API with the UI, so users can also start testing the logic behind password generation.

### 2.2.1. Exploring the Echo app

1. Move into the [echo](../echo/) folder and explore how to develop the Echo app using ```Node.js``` as well as Dockerizing the application.

### 2.2.2. Connect UI with Echo Api

1. Move into [UI](../www/src/App.js) and disable the use of Mock data. 
1. Run Echo API locally
1. Run www locally
1. Verify in log that requests are being handled by API

### 2.2.3. Update app in Radix

1. Add Echo app to radixconfig.yaml 
1. Update [nginx.conf](../www/src/nginx.conf) to forward request to echo api
1. Commit code to Master branch. 
1. Verify the changes in Radix. Look at the Radix Host name, which should jump between the two replicas we've setup for the API. 

### 2.2.4. Update api

1. Do a change on master branch either in the api or ui
1. commit and push to master branch
1. Verify that there is no downtime during the release of a new version

Radix run on top of [Kubernetes](https://kubernetes.io/), which support [rolling updates](https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/). This means that traffic will not be routed to the newly deploy api before it is up and running. 

## 2.3 Part 3 - setup prod environment

Scenario

The MVP of the application is done, and next step is to setup a production environment. There is sadly too few automated tests to support a clean [Trunk base development](https://trunkbaseddevelopment.com/), but we will do something similar. 

We'll setup 2 new environments, QA and prod. A build/deploy to QA will be triggered by push to "release" branches. When the QA version has been verified its manually promoted to prod environment. 

### 2.3.1. Multiple environments

Radix support connecting a branch to a specific environment. Let's explore this.

1. Add two new environment in radixconfig.yaml file - QA and prod. QA should be built from release* (whenever someone publish to a release* branch). 
1. Commit and push changes to master branch, explore what's happening in Radix.

### 2.3.2 Deploy to QA

1. Check out a new branch "release/0.1.0" from master branch
1. Commit and push the new branch, explore what's happening in Radix.
1. Verified that the application is running as expected in QA environment. 

### 2.3.3 Promote to production

1. Do a promotion of the deployment running in QA to prod environment. 
1. Verified that the application is running as expected in prod environment. 

## 2.4 Part 4 - Authentication

Radix support refering to prebuild docker images. This can be used to introduce common services as proxies, caching, authentication etc. In this part we will explore how to reference an existing image to add OpenId Connect authentication to the application. 

### 2.4.1 Create an app in Azure AD

1. Go through an example (whole class use same app)
1. Explain scenarios OAuth proxy is fittet for, and where it is not

### 2.4.2 Update radixconfig with oauth_proxy

1. We'll use [OAuth proxy](https://github.com/pusher/oauth2_proxy) developed by pusher to add Authentication
1. Update radixconfig file. See [example](https://github.com/equinor/radix-example-front-proxy) on how it can be done
1. Remember to disable the public endpoint for ```www``` component in radixconfig file (publicPort should not be set)
1. Optional: get the authentication to work locally using docker-compose - the format is similar to radixconfig
1. Commit & push to master branch to verify setup

## 2.5 Monitoring & Metrics

The Echo component is exposing metrics on the /metrics endpoint. These metrics are scraped by [Prometheus](https://prometheus.io/docs/introduction/overview/) and made available in [Grafana](https://grafana.com/). Consult the docs for Prometheus and Grafana for how to work with metrics and monitoring.

## 2.6 *.equinor.com domain

The application is currently hosted under a *.radix.equinor.com domain. This is OK for now, but it has been identified that for the future we'll want our own *.equinor.com domain as is possible in [Radix](https://www.radix.equinor.com/docs/reference-radix-config/#dnsexternalalias).

## 3. Typical questions

(Status as of January 2019)

- Storage - databases
- Authentication
- Logging
- Metrics - Monitoring
- Radix CLI (Api)
- Backup & Disaster recovery
- Own domain names / urls for apps

## 3.1. Where to get started, get help, log issues or feature requests

### 3.1.1. Getting help

- Radix on #Slack ([#omnia_radix](https://equinor.slack.com/messages/C8U7XGGAJ), [#omnia_radix_support](https://equinor.slack.com/messages/CBKM6N2JY))
- [Raidx front app](https://www.radix.equinor.com/)
- Radix on [github.com](https://github.com/equinor/radix-platform)

### 3.1.2. Getting started

- Radix Getting Started - https://www.radix.equinor.com/

### 3.1.3. Log issues & feature requests

- https://github.com/equinor/radix-platform/issues

It makes sense to examing existing issues and perhaps discuss on Slack prior to logging a new one

## 4 Next steps

- Move your own apps into Radix
