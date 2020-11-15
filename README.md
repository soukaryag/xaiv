# XAIV: Group Decisions, Simplified

## About

Even in quarantine, choosing what to do with friends is close to impossible. If one person likes a restaurant, another does not and the friend group rotates around the same activities or locations, bored out of their minds. With our app, that problem would not exist.

XAIV essentially acts as a Tinder but for activities for when you cannot decide or do not know where to go. It allows you to make a secure profile using two-factor authentication and create a group with other users of the app. From there, you determine an activity, general region, and range to determine all the locations in the area that are available to visit. You can choose to swipe right if you like the location and left if you do not. As all the members make their choices anonymously, one location will be determined by consensus. 

Users will be able to post about this on their feed easily and even make comments to review their time and experience at the location. We also have a calendar feature so that users with many groups and sessions can keep track of their activities and where and when it will be taking place. With our app, decisions are made easier and quicker with a swipe of your finger.

## Blockchain Implementation

The app can be broken into two parts. The first is the core "decision making helper" functionality. Users can create a profile, add their friends to a group, and poll the Google Places API freely, swiping as a group until they come to as many agreements as they like. None of this requires the use of a blockchain; Instead, it uses a regular back-end server and database. The second part of the app, however, is where Solana and its blockchain come in. We aim to **tokenize data by-products from casual user interactions with the app, and store them, aggregated and anonymously, on the blockchain**. Each action taken by a user - any user - is sent to the blockchain as a micro-event with a timestamp. This currently includes only swipe events, but will later be expanded to more events. With all these events, a chronological history of user events is transparently built and maintained

Why is this important? The hope of this is to generate **meaningful** and **trustless** data aggregates, while also being **transparent about privacy** to our users. You could think of it as Yelp alternative, where instead of writing formal reviews and explicitly rating restaurants (among other things), data is collected much more casually, and anonymously, from users simply using the group decision making portion of the app. Users are incentivized to provide this data, thanks to the app offering them a useful service free of charge. They also won't have any concerns regarding privacy - none of the data is tied to them personally, and, most importantly, *they can see that* (on the blockchain). It also reduces (or arguably, eliminates) the need to trust us as a centralized organization providing the data, since each data point is permanently stored on a public ledger (with timestamps!). The code and platform can easily be audited to verify that all user interactions successfully make it onto the blockchain. Third parties can see the data being built in real time, leaving any room for doubt regarding its validity or possible tampering. Also, any event from another user (pinged to the blockchain up, and ponged back on request) is shown on the home page of our app as a live feed, like Venmo does. This helps promote a social atmosphere for our users.

## Looking Forward

Like any hackathon project, the app is quite rushed. When testing it out, please interpret any malfunctions or empty pages with a grain of salt :). The core group decision making functionality works, and the app makes (a currently simplistic) use of the blockchain to store data. Blockchain programming was a new experience for us, and getting even a basic application to work within the time constraints has been difficult. Ideally, with more time, we'd expand our implementation of Solana to be necessary and meaningful. This isn't the first "decider" app anyone's ever made, but the way we intend to store and make use of its data by-products is unprecedented. Hopefully, what we've programmed so far using Solana serves as a convincing *proof of concept*, if nothing else.

## Use

1. Clone the repository to your local machine
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
