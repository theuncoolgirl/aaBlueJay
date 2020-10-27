# FEATURES & User Stories
Clone of Robinhood, focusing on displaying information of cryptocurrencies. 

MVP Features, User Stories, and Data Schema are outlined below, along with some stretch goals/features that we hope to eventually incorporate.  

## Features - MVP
- [ ] Site-wide navigation element
- [ ] Homepage that includes information about the site and link to signup/login.
- [ ] Authentication - sign up with username/email/password, login/logout, demo user login. If user tries to navigate to protected portions of site, will be redirected to login/signup. 
- [ ] Landing page that user is directed to upon login that gives overall market snapshot of the day [simulation stretch: portfolio].
- [ ] "Explore All Currencies" page that serves list of all currencies, with sorting options and pagination. 
- [ ] Search functionality to view details for particular currency. 
- [ ] Currency detail page that contains details of specified currency and market chat/historical data. 
- [ ] List functionality that allows users to save currencies to different organizational lists. 

## Backlog
- [ ] Multi-list functionality that allows users to add currency to different list(s).
- [ ] Search feature that lists matching results dynamically as you type
- [ ] Additional "advanced search" functionalities
        - Pattern matching
- [ ] Stock/trade simulator where user can simulate buying and selling currencies. 
        - transaction/commission fees?
- [ ] Trade volume feature
- [ ] Trading news
        - Utilize news API
        - By currency on detail page (results served by specificity)
- [ ] Social features
        - Connect/friend request other users
        - Recommend stock to a friend
        - View friends' lists
        - View friends' recent trades
- [ ] Translation to different languages
- [ ] Update default/displayed currency
- [ ] Darkmode

## User Stories
1. As an unauthorized user, I want to view a home page that provides me with information about the site, and the ability to log in. 
    - Acceptance Criteria:
        - [ ] User can visit the `/` path and will be served a homepage/landing page that provides information about the site, a navigation bar & log-in form, and a link to sign-up if necessary. 
1. As an unauthorized user, I want to be able to sign up for the website via a signup form in order to access protected content. 
    - Acceptance Criteria:
        - [ ] User can visit the `/sign-up` path and will be served a form asking for a name, email, and password.  
        - [ ] After user enters valid information for all fields, a new user row is added to the User table, and user is directed to a login page. 
        - [ ] If a user enters invalid sign-up information, they receive a message specific to the information that is incorrect. 
        - [ ] If a user enters an email that is already in use for another user, they receive a message indicating such, with a link to `/log-in`
        - [ ] Session should last 1 day
        - [ ] Use auth with JWT from Redux example
1. As an unauthorized user, I want to be able to login to the website, via a form, in order to access my private information.
    - Acceptance Criteria
        - [ ] User can visit the `/` path and will be served a form on the homepage requesting email and password, along with link to sign-up page. 
        - [ ] After user enters valid login information, the user is redirected back to the homepage at `/`.
        - [ ] Contents of homepage determined by logged in/out state.
        - [ ] After user successfully logs in, a session is created with the necessary cookies/etc. 
        - [ ] If a user enters incorrect log-in information, they receive an error message.
1. As an authorized user, I want to be able to log out of the application in order to protect my private information. 
    - Acceptance Criteria
        - [ ] From any page on the site, the user can click a "Log out" link, which will manually delete their session cookie (logging them out), and redirecting them to the `/` homepage.
1. As an authorized user, I want a clear and consistent way to navigate across the site. 
    - Acceptance Criteria
        - [ ] Every page has a consistent navigation display containing:
            - Login/Logout button depending on login status
            - Search Bar
            - Homepage `/`
            - My Lists
            - Explore All Currencies
1. As an authorized user, I want to be able to search for currency data by full name or ticker symbol. 
    - Acceptance Criteria
        - [ ] User can use search bar at the top of each page to search for currencies by full name or ticker symbol and be directed to a page listing details for that specific currency. 
        - [ ] Currency result will be served at `/currency/${id}}`. 
        - [ ] Users can view currency name, ticker symbol, current trading price, close value of previous market day, open value of current market day, high and low of current market day, market chart (with varying time frames), "About" section with text/info about the currency. 
        - [ ] Users can click on a "Add to List" button, which will add current viewed currency to "Watch List", and a corresponding row to the "Lists" database table.
        - [ ] Once a user clicks on the "Add to List" button, it will update to a "Remove from List" button that the user can click on to delete that record from the table. 
1. As an authorized user, I want to be able to navigate to my "Watch List" to view select details of all saved currencies. 
    - Acceptance Criteria
        - [ ] User can view of list of all saved currencies at `/list/watchlist`. 
1. As an authorized user, I want to be able to browse through cryptocurrencies without specifying a single currency. 
    - Acceptance Criteria
        - [ ] User can view a list of all available currencies at `/explore/${page}`, with links that direct them to each currency's details page. 
        - [ ] User can specify sort options of list based on options available within coingecko API. 
        - [ ] User can view a fixed number of currency links per page, and can navigate across pages using a pagination feature implemented at the bottom of the results. 


## Data Schema
Most data for the setlist.fm clone will be pulled from the setlist.fm API, but app will require the following data to be stored in its database:

1. Users
    - first_name
    - last_name
    - email
    - password hash
1. Lists
    - userId (belongsTo Users.id)
    - currencyId (from coingecko API)

## Frontend Routes
- `/` Home/Landing Page (w/login form if user is not logged in)
- `/signup` Signup Page
- `/currencies/${id}}` Currency Detail Page (directed from search)
- `/lists` Watch List Page
- `/explore/${page}` Explore Currencies Page

## Backend Routes
- `/` Home/Landing Page (w/login form if user is not logged in)
- `/api/users/signup` Signup Page
- `/api/users/logout` Link to Logout, redirects to homepage
- `/api/currencies/${id}}` Currency Detail Page (directed from search)
- `/api/lists` Watch List Page
- `/api/explore/${page}` Explore Currencies Page

## Components
Components to be organized as follows:
- Root
    - App
        - NavBar
            - Search
        - Main Component
        - Footer

The following components will render in between `NavBar` and `Footer` for their corresponding pages:
- /
    - Homepage
        - [if not logged in] LoginForm
        - [if logged in] redirects to `/lists`

- /signup
    - SignupForm

- /currencies/${id}}
    - CurrencyDetails
        - CurrencyHeader
        - CurrencyPrices
        - CurrencyMarketChart
        - CurrencyAbout

- /lists
    - [single watchlist implementation (MVP)] List
        - ListHeader
        - ListContents
    - [multi watchlist implementation] List
        - ListHeader
        - ListContents
        - ListSidebar
            - Stock (symbol, minigraph, price)

- /explore/${page}
    - ExploreCurrencies
        - CurrencyResults
        - Pagination

## State Shape
```JS
{
    session: {
        // Session Data Here
    },
    currentCurrency: {
        // Object data from coingecko API call
    },
    list: {
        // Selected data for all currencies in watchlist
    },
    
}
```