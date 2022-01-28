

# CLIMATE EVENTS
<img src="https://i.imgur.com/aJZSKwy.png"/>

[CLIMATE EVENTS](https://climate-events.herokuapp.com/) is the app that I recently created that offers full CRUD (create/read/update/delete) functionality for people who would like to keep track of events and be able to attach current weather to those events. Using OAUTH / Google credentials to login, a user can create an event that fetches accurate latitudinal and longitudinal coordinates from an external source(API), that can then be used to fetch weather data from another excternal source(API). The data is saved to the event and the weather can be updated once per day until the event has passed. Additionally a tagging search system has been implemented to make finding events easier!

### **TECHNOLOGIES** 
**NODEJS**, **EXPRESS**, **MONGODB**, **MONGOOSE**, **HEROKU**, **AFFINITY DESIGNER**, and **TRELLO** were all used to make this app complete. NodeJS allows programmers to utilize Javascript on the server, express is the web framework that helps setup / maintain the organization of the **MVC**   (MODEL/VIEW/CONTROLLER) design pattern, and the Mongoose library helps with interacting and creating databases in MongoDB! Their powers combined with **HTML & CSS** are the basis creating just about anything for the world wide web. Special thanks to [OPEN WEATHER MAP](https://openweathermap.org/api/) for use of their API, [PTV DEVELOPER](https://developer.myptv.com/) for use of their GeoCoding API, and **HEROKU** for deployment of my app! (TRELLO was used as an organization tool for implementing each step of the process. By creating boards to plan user stories (AAU - as a user:) and move those stories from "ice-box" to "implementation" to "completion")

## [CLIMATE EVENTS](https://climate-events.herokuapp.com/)  Screenshots:

<img src="https://i.imgur.com/qnMP10B.png" width=300px/>
<img src="https://i.imgur.com/RZtDlE4.png" width=300px/>

1. Enter the app via Google OAUTH 
2. Search via TAGS or create a new event.
3. Click on details to view an individual event.
4. Fetch / update the weather, add / delete tags, and edit information for the event. 
4. Navigate to "past events" to see the events that have already passed.

### ICEBOX:

Down the road I would consider other feature sets that would be a nice addition:
1. Deletion of individual events.
2. Additonal Weather Features.

