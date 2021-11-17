# curious_room_api
## RESTful Web Services with 
* Node.js 
* Express
* Sequelize ORM 

## Services
* Accounts service
* Rooms service
* Posts service
* Comments service

## Endpoint Url
```http
GET /user/:email
```

#### Headers
| Key | Value |
| ---- | ----- |
| Accept | * / *


## Responses

Many API endpoints return the JSON representation of the resources created or edited. However, if an invalid request is submitted, or some other error occurs, Curious room returns a JSON response in the following format:

```javascript
{
  "message" : string,
  "data"    : string
}
```

The `message` attribute contains a message commonly used to indicate errors or, in the case of deleting a resource, success that the resource was properly deleted.

The `data` attribute contains any other metadata associated with the response. This will be an escaped string containing JSON data.

## Status code
returns the following status codes in its API:
| Status | Code | Body |
| ---- | ---- | ---- | 
| OK | 200 | {user} |
| Not Found  | 404 | Cannot GET /user/
| Internal Server Error | 500 | "Not found user"


## Example code
> ### http get user where email
```
getUser: async (req, res) => {
 email = req.params.email;
    user = await User.findOne({
      where: { email: email },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(500).send({
        message: `Cannot found user`,
      });
    }
  }, 
  ```

## Prepared a project by our group.
1. Ms. Siriwika Puangthong
2. Mr. Poonnalak Keasornbua

## Credit
* 610107030011@dpu.ac.th
* 610107030035@dpu.ac.th
