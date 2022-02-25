It is a simple api to archive a website in a database and retrieve it thanks to the specific timestamp.

You have two availables routes:
- /archive/:website: → unix timestamp
- /view/:timestamp/:website → html of page

The API should be testable at this URL: https://q2-archiver.herokuapp.com/

As I used a free tier on Heroku, you may encounter issues while accessing it. If it is the case, feel free to reach me.


To run it locally, you must have docker, you should be able to going into the folder and run :
  - docker build . -t nest-web-app
  - docker run -p 49160:5000 nest-web-app
