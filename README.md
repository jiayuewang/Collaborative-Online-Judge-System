# Collaborative Online Judge System

### Detail
* Implemented a web-based collaborative code editor supports multiple user editing simultaneously (ACE, Socket.io, Redis).
* Designed and developed a single-page web application for coding problems (Angular2, Auth0, Node.js, MongoDB).
* Built a user-code executor service which can build and execute user's code (Docker, Flask).
* Refactored and improved system throughput by decoupling services using RESTful API and loading balancing by Nginx (REST API, Nginx).

### Skills
JavaScript, Python, Angular2, Node.js, Express, Redis, MongoDB, Docker, RESTful API, Nginx.
step1related:
Daily active user ○ 100,000..

● Lookup problems ○ Per day: 100,000 * 100% (function usage) * 3 (function frequency) = 300,000 ○ Per second: 300,000 / 86400 = 3.5 ○ Peak per second: 3.5 * 10 = 35

● Editing ○ ○ ○

Average concurrent users: 100,000 * 60 * 60 / 86400 = 416 Per second: 400 * 50% (function usage) * 10 (function frequency) = 2,000 Peak per second: 2,000 * 10 = 20,000

● Submit Code ○ Per second: 400 * 1% (function usage) * 1 (function frequency) = 4 ○ Peak per second: 4 * 10 = 40
● Function is a first-class object

○ A function is an instance of the Object type ○ You can store the function in a variable ○ You can pass the function as a parameter to another function ○ You can return the function from a function


Model-View-Controller (MVC)
Model:Data or Data + Algorithm
View:Web Page+UI
Controller 
Router and handler in 

Request / Event / Action

### Step2
●A function passed to some other function

● Which we assume will be invoked at some point

● The function “calls back” back invoking the function you give it when it’s done doing its work

promise and outline
● "Imagine you are a kid. Your mom promises you that she'll get you a new phone next week."

● You don't know if you will get that phone until next week. Your mom can either really buy you a brand new phone, or stand you up and withhold the phone if she is not happy
● Asynchronous programing

● Node.js

● Restful API

● NoSQL

● MongoDB

REST (REpresentational State Transfer)

● Resource

● REpresentational

● State Transfer

● Stateless
● A URL identifies a resource ○ GET http://example.gov/api/v1/magazines/1234/

● URLs should include nouns, not verbs.

○ POST http://example.gov/api/v1/magazines/1234/articles ○ http://www.example.gov/magazine/1234/create

● Use HTTP verbs (GET, POST, PUT, DELETE) to operate on the collections and elements
● Use plural nouns only for consistency (no singular nouns)

● You shouldn’t need to go deeper than resource/identifier/resource

● Put the version number at the base of your URL ○ http://example.com/api/v1/path/to/resource

● Specify optional fields in a comma separated list ○ GET http://www.example.gov/api/v1/magazines/1234?fields=ti tle,subtitle,date

● Document databases

NoSQL
● Key-Value databases

Redis, Memcached, Dynamo...

● Document databases
MongoDB, CouchDB... XML, JSON, BSON...