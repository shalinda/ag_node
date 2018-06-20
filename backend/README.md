
## CRUD API Setup with Express.js, Mongoose and MongoDB

### Install dependencies
```bash
npm install
```

### Run the Project
This command will start the development server with dev properties
``` bash
npm start
```


### APIs
User Apis

* User Creation : http://localhost:5000/api/v1/users
```json
// requuest data
{
	"fname": "Ajantha",
	"lname": "Bandara"
}
```


* User Read (all users): http://localhost:5000/api/v1/users?comments=true

This will return all users. Need to pass parameter **comments=true** to get all comments with customers.

* Customer Update: http://localhost:5000/api/v1/users

* Customer Delete: http://localhost:5000/api/v1/users/customerId

* Comment Add: http://localhost:5000/api/v1/users/customerId/comments

* Comment Update: http://localhost:5000/api/v1/users/customerId/comments
