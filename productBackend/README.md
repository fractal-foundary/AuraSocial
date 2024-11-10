# Things to complete: Don't hesitate

## backend
* Twitter Auth
    - where to refresh token from twitter. 
* Users
    - check whole jwt authentication process in registeration. (fool proof)
        - no need to store username in jwt token.
    - User CRUD --- serializer + view
        - when user deleted his (profile + access_token) is also deleted with it.
        - without twitter authentication no new user can be created.
    - Profile CRUD ---- serializer + view
        - add (Social Score) + (wallet address ---- why? cause i want the user identity on the blockchain world) in profile model
* Posts
    - Post CRUD ---- serializer + view
* RePosts
    - repost CRUD ----- serializer + view
* Bookmark
    - bookmark CRUD ----- serializer + view
* Follow
    - follow -----> create
    - unfollow -----> delete
    - list follows and following accounts. (view)
* coming soon...
    - calculate the initial social score using "Celery Beat" or "cron jobs" not using views or serializers.
    - search engine


## frontend
* complete your registeration page
    - store the **username** there on the authcontext.
* user Preferences page
* follow atleast one user page.
* a tab on home page which redirect you to complete your profile
* homePage
    - change sidebar
    - timeline dynamic
        - for now lets make timeline just basic
    - popular nfts (with price) + top social score ---- make in dynamic
* profilePage
    - add social score
    - profile form
        - connect wallet button
    - all posts till date user made section
    - media user uploaded section
    - nfts you hold section
    - social score metric, we can provide the insights in the data we have.
* mint tokens
    - create a thirdweb mint token page.
* Secondary Marketplace
    - sell, buy, bid and more.
* Bookmark
    - bookmark posts
    - bookmark nfts you want to buy or you like.
* Direct Messaging
* More
    - Settings
        - Account details, and delete the account
* In the very last of sidebar
    - The pic, should be clicked to give you logout button
* miscellaneous
    * follow button on (profile + top socialScore)
    * list of followers and following account on profile.