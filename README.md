# apde-front-spring

Front-end application for the Spring course project, 2020-2021.

## Team

Emilien Lambert  
Dylan Li-Cho  
Maxime Nicolas  
Nicolas Kleinhentz

## Installation

First, clone this repo using a terminal :

```shell
$ git clone https://github.com/Dylanlicho/apde-front-spring.git
```

Then got into the cloned project :

```shell
$ cd apde-front-spring
```

Before launching the application, you will need to install the required dependencies :

```shell
$ yarn install
```

Finally you can launch the application :

```shell
$ ng serve
```

The front-end will be running at http://localhost:4200/ .

To stop the application, simply use Ctrl+C or Cmd+C.

To delete the repository, first make sure that the application is stopped, then move to the parent folder and you will be able to delete the project :

```shell
$ cd ..
$ rm -rf apde-front-spring
```

## Notes

### Bidding
An article is biddable if :
- startDate < today < endDate
- user is connected
- connected user is not the article's seller

An article is editable if :
- user is connected
- connected user is the article'ss seller
- endDate < today

### Register (Signup)
Registering a new account is fully functional, you will need to enter your firstname, lastname, address, login and password. Do note that the address is optional.

### Logging in
The login function is not working. In order to try the different functionalities you can access the login page and "log in" as any (existing or not) user without even knowing the corresponding password (-- TEST area).  
Being logged in provides :
- Replaces the 'Login' and 'Signup' buttons with a 'Disconnect' one in the top nav bar.  
- When viewing a specific bid, if you are logged as the seller of the item you will see an 'edit' button appear as well as a 'delete' one.
- A bid is not biddable by its own seller.

### "Login" cookie
This cookie contains information about the logged-in user, saved as a JSON object containing all the data of that user according to the DB.
- The user object is stored in the cookie using the *JSON.stringify* method
- The user can be extracted from the cookie using the *JSON.parse* method

### Creating a new bid
When logged in, you'll be able to create a new bid. On the bid creation page you will be able to choose the name, starting price, weight, starting date and ending date of the bid. The 'seller' field of the bid will be automatically filled with your user ID and the 'price' field will be filled with the starting price value.

### Available bids
Available bids are listing in the auction page, their endDate is written in red when the date has passed.

### Bidding
Anyone connected and not owner of the article can bid on it, the highest current bid is shown next to "Prix actuel :". If none, the starting price is displayed instead of the highest bid.

## Related repositories

The back-end application is located at https://github.com/Dylanlicho/apde-back-spring .
