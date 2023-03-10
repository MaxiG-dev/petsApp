<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A simple pets application for practice whit nest.js, dtos, typeorm, exceptions filters and more.</p>

## About this app
You can create simple users and their pets.
You can also create posts referring to both pets and users.

## Installation

1- Install dependencies
```bash
$ npm install
```

2- Rename ``.env.example`` to ``.env`` and fill the variables

3- Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoints and queries examples

```bash
# All endpoints start with host and port, for example: http://localhost:3000

# Users endpoint
/users
  GET
    - Get all users
  POST
    - Create a new user
      - Body: {
        "name": "A cool name",
        "lastname": "A cool lastname",
        "email": "github@msn.com",
        "password": "MyStrong!Passw0rd",
        # Optional, you can add one array whit Pets and create here
        "pets": [
            {
            "name":"Clara",
            "lastname": "Mente",
            "colors": [
                "white",
                "black"
            ],
            "type": "Dog"
          },
        ],
        # Optional, you can add one array whit Pets ID and relate to this new user
        "petsId": [
            # A valid pet UUID'S
            "00000000-0000-0000-0000-000000000000",
            "11111111-1111-1111-1111-111111111111"
        ]
      }

# You must a provide a valid User UUID
/users:id
  GET
    - Get specific user
  PATCH
    - Update a specific user
      # In this case, all properties are optional
      - Body: {
        "name": "A cool name",
        "lastname": "A cool lastname",
        "email": "github@msn.com",
        "password": "MyStrong!Passw0rd"
        "pets": [
            {
            "name":"Clara",
            "lastname": "Mente",
            "colors": [
                "white",
                "black"
            ],
            "type": "Dog"
          },
        ],
        # If you provide a Pets ID array, the pets will be related to this user
        "petsId": [
            "00000000-0000-0000-0000-000000000000",
            "11111111-1111-1111-1111-111111111111"
        ]
      }
  DELETE
    - Remove specific user and return one array of the orphans pets

# Pets endpoint
/pets
  GET
    - Get all pets
  POST
    - Create a new pet
      - Body: {
        "name":"Clara",
        "lastname": "Mente",
        "colors": [
            "white",
            "black"
        ],
        "type": "Dog",
        # Optional, you can add user whit User ID and relate this new pet
        "user": "00000000-0000-0000-0000-000000000000"
      }

# You must a provide a valid Pet UUID
/pets:id
  GET
    - Get specific pet
  PATCH
    - Update a specific pet
      # In this case, all properties are optional
      - Body: {
            "name":"Clara",
            "lastname":"Mente",
            "colors":[
                "white",
                "black"
            ],
            "type":"Dog",
            # You can add user whit User ID and relate this new pet
            "user":"0316b9f-331d-229c-8s32-7cf450f748b1"
          }
  DELETE
    - Remove specific pet


# Posts endpoint
/posts
  GET
    - Get all posts
  POST
    - Create a new post
      - Body: {
        "title":"Example title",
        "description":"A post description",
        # Optional, you can add one array of user whit User ID's, and one array of pets whit Pets ID's and relate this new pet
        "users":["00316b9f-easd-229c-8s32-7cf450f748b1"]
        "pets":["02313b9f-ebd0-4641-8892-7casd248b1"]
      }

# You must a provide a valid Post UUID
/pets:id
  GET
    - Get specific post
  PATCH
    - Update a specific post
      # In this case, all properties are optional
      - Body: {
        "title":"Example title",
        "description":"A post description",
        # Optional, you can add one array of user whit User ID's, and one array of pets whit Pets ID's and relate this new pet
        "users":["00316b9f-easd-229c-8s32-7cf450f748b1"]
        "pets":["02313b9f-ebd0-4641-8892-7casd248b1"]
      }
  DELETE
    - Remove specific post

```


<p align="right"> <i>By Maximiliano González</i> </p>