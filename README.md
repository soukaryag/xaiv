# XAIV: Group Decisions, Simplified

## About

Even in quarantine, choosing what to do with friends is close to impossible. If one person likes a restaurant, another does not and the friend group rotates around the same activities or locations, bored out of their minds. With our app, that problem would not exist.

XAIV essentially acts as a Tinder but for activities for when you cannot decide or do not know where to go. It allows you to make a secure profile using two-factor authentication and create a group with other users of the app. From there, you determine an activity, general region, and range to determine all the locations in the area that are available to visit. You can choose to swipe right if you like the location and left if you do not. As all the members make their choices anonymously, one location will be determined by consensus. 

Users will be able to post about this on their feed easily and even make comments to review their time and experience at the location. We also have a calendar feature so that users with many groups and sessions can keep track of their activities and where and when it will be taking place. With our app, decisions are made easier and quicker with a swipe of your finger.

## Use

1. Clone the repository to you local machine
   - `git clone https://github.com/soukaryag/xaiv.git`
2. Continue to the client folder
   - `cd xaiv/xaiv-react-client`
3. Run `yarn install` to install all dependencies and setup the client environment
4. Run `yarn start` to spin up a local instance
5. Visit `http://localhost:19002/` in your browser and choose to `Run in web browser`
   - This app is best viewed in mobile view, you can do this by using `Ctrl+Shift+I` to access the web console and click the mobile icon on the top right on the console.
6. Welcome to Xaiv, have fun!

## To do
- Functionality:
  - Essential:
    - Local App functionality:
      - ~~Add friends CHECK~~
      - ~~Create a group CHECK~~
      - ~~Choose a topic / start a group session CHECK~~
      - ~~Populate session pool on the backend CHECK~~
      - Conclude group session / show users consensuses achieved
      - ~~Make card data length dyanmic based on number of activities~~
      - Change group_name as query to a unique group id
      - ~~Some kind of loader to prevent double sends~~
    - Solana:
      - ~~Get it to actually work~~
      - ~~Rerun compile source code for swipe left~~
      - ~~Record consensus event~~
      - ~~Home page displays blockchain events in real time~~
    - Other:
      - Get the app to actually work on mobile
      - ~~Deploy backend to heroku and update endpoints accordingly~~
  
  - Good to have:
    - Worry about this after the 14th I guess
    
- Style:
  - Essential:
    - Decide page: ~~active~~ and inactive group listings
    - Topic page
  - Good to have:
    - ~~Swipe page improvements~~

push to heroku: `git subtree push --prefix backend heroku master` after staging and commiting changes
