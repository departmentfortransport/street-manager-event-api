# street-manager-event-subscriber

## Description
Lambda function that is invoked by SNS messages published (via street-manager-event-notifier lambda).
The purpose of this lambda is to emit performance information for our Data Streaming Notifications.

## Run locally
### 1. Install AWS SAM
`brew tap aws/tap`
`brew install aws-sam-cli`

### 2. Build
Compile typescript to javascript - output to /dist folder
`npm run build`

### 3. Run
Invoke main function defined in template.yml -> Resources -> EventNotifier -> Handler
`sam local invoke --docker-network host`

Send SNS event message to Lambda (Example file in fixtures - snsEvent.json)
`sam local invoke --docker-network host -e <path-to-json-file>`

### OR

### 3. Run script
Script to run build & run commands above
`npm run local`
