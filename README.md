# curious_room_api
## RESTful Web Services RESTful with 
* Node.js 
* Express
* Sequelize ORM 

## Prepared a project by our group.
1. Ms. Siriwika Puangthong
2. Mr. Poonnalak Keasornbua

## Services
* Accounts service
* Rooms service
* Posts service
* Comments service

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

## Credit
* 610107030011@dpu.ac.th
* 610107030035@dpu.ac.th
