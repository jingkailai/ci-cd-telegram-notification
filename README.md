# CI/CD Telegram Notification
How an automated Telegram notification workflow is set up for push/pull requests on my repo

## Requirements
- Telegram Bot 

- Github repository 

>(For the purpose of expediency, a MERN stack web app that I've created earlier will be used to trigger the workflow here)

**1. Creating my Telegram Bot**

- How to create: https://core.telegram.org/bots

**2. Getting Token Code**

- After creating my Telegram bot, a confirmation message + token code will be received

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

**3. On My Github Repo**

- "Settings" -> "Secrets" tab 

!![](https://.....)

- ```TELEGRAM_TO: ##########```
- ```TELEGRAM_TOKEN: ##########:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx```

**4. Github Workflow Set Up**

- "Actions" -> "“set up a workflow yourself” link

!![](https://.....)

- Changing the default name from “main.yml” to “tg-notify.yml” to trigger workflow

- Changing the default code to the following as well:

```name: tg-notify

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
          
- Once "Start Commit" is clicked and “Commit New File” selected, a workflow will be successfully set up

- Workflow ensures a Telegram ping everytime a new push commit or pull request is triggered on the Github repo






