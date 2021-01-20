# CI/CD Telegram Notification
How an automated Telegram notification workflow is set up for push/pull requests on my repo

## Requirements
- Telegram Bot 

- Github repository 

  For expediency, a MERN stack web app that I've created earlier will be used to trigger the workflow here (refer to ```master``` branch)

## Creating Telegram Bot ##

- Best to check out https://core.telegram.org/bots

## Getting Token Code ##

- After creating the Telegram bot, a token code will be revealed in the confirmation message

- Token code (TELEGRAM_TOKEN) for repo settings is in the ##########:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx format, where # are numbers and x are alphanumeric characters

- Pasting this URL on browser:

  ```https://api.telegram.org/bot<aforementionedtokencode>/getUpdates```

- JSON-type response will be returned, from which the unique chat id will be revealed in the ########## format (for TELEGRAM_TO later)

```{
"ok":true,
"result":[{
  "update_id":123456789,
  "message":{
    "message_id":1,"from":
{"id":000000001,"is_bot":false
...}}}]}
```
## Running/Testing Telegram Bot API Using Postman (Optional)

![Postmantest](https://github.com/Bensonlmx/ci-cd-telegram-notification/blob/main/Postmantest.png)


## Inputting Secret Variables ##

- "Settings" -> "Secrets" tab 

![image2](https://github.com/Bensonlmx/ci-cd-telegram-notification/blob/main/image2.png)

  ```TELEGRAM_TO: ##########```
  
  ```TELEGRAM_TOKEN: ##########:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx```

## Finally, Setting Up Workflow ##

- Clicking "Actions" -> "set up a workflow yourself” link

!![image2](https://github.com/Bensonlmx/ci-cd-telegram-notification/blob/main/image1.png)

- Changing the default name from “main.yml” to “tg-notify.yml” to trigger workflow

- Changing the default code to the following as well:

```
name: tg-notify

on: [push, pull_request]
  
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Update status
      uses: appleboy/telegram-action@master
      with:
        to: ${{ secrets.TELEGRAM_TO }}
        token: ${{ secrets.TELEGRAM_TOKEN }}
        message: |  #https://help.github.com/en/actions/reference/contexts-and-expression-syntax-for-github-actions#github-context
          ${{ github.event_name }} commit in ${{ github.repository }} by "${{ github.actor }}". [${{github.sha}}@${{ github.ref }}]
```
          
- Clicking "Start Commit" -> "selecting “Commit New File” tab

- Workflow is successfully set up and a Telegram ping is received everytime a new push commit or pull request is triggered on my Github repo

![image3](https://github.com/Bensonlmx/ci-cd-telegram-notification/blob/main/image3.png)
