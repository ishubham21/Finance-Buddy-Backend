## Routes

## Parent Routes 

### For Registration of Parent

`POST` request on the URL - [https://finance-buddy-backend.vercel.app/parent/register](https://finance-buddy-backend.vercel.app/parent/register).

**Request HEADER should include -**
```
{
    "Content-Type": "application/json"
}
```

**Request body should include -**
```
{
    name: "Shubham Gautam",
    email: "sg2199203@gmail.com",
    password: "userPassword"
}
```

**Response is a JS object that looks like this -**

```
{
    id: 6219f59b29849955414a7c5e
}
```

### For Login of Parent

`POST` request on the URL - [https://finance-buddy-backend.vercel.app/parent/login](https://finance-buddy-backend.vercel.app/parent/login).

**Request HEADER should include -**
```
{
    "Content-Type": "application/json"
}
```

**Request body should include -**
```
{
    email: "sg2199203@gmail.com",
    password: "userPassword"
}
```

**Response is a JS object that looks like this -**

```
{
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2h1YmhhbSIsImVtYWlsIjoic2cyMTk5MjAzQGdtYWlsLmNvbSIsImNoaWxkcmVuIjpbXSwic2VudFJlcXVlc3RzIjpbXSwiaWQiOiI2MjE5ZjU5YjI5ODQ5OTU1NDE0YTdjNWUiLCJpYXQiOjE2NDU4NzI4MzZ9.tYuKEw1ZFh2GWlV_uZYF17PTDzG1Usil7humKBCXx1M"
    }
}
```


### For Dashboard of Parent

`GET` request on the URL - [https://finance-buddy-backend.vercel.app/parent/dashboard](https://finance-buddy-backend.vercel.app/parent/dashboard).

**Request HEADER should include -**
```
{
    "Content-Type": "application/json",
    "auth-token" <token_recieved_during_login_request>
}
```

**Response is a JS object that looks like this -**

```
{
    "error": null,
    "data": {
        "parent": {
            "name": "shubham",
            "email": "sg2199203@gmail.com",
            "children": [],
            "sentRequests": [],
            "id": "6219f59b29849955414a7c5e",
            "iat": 1645868906
        }
    }
}
```


## Child Routes 

### For Registration of child

`POST` request on the URL - [https://finance-buddy-backend.vercel.app/child/register](https://finance-buddy-backend.vercel.app/child/register).

**Request HEADER should include -**
```
{
    "Content-Type": "application/json"
}
```

**Request body should include -**
```
{
    name: "Shubham Gautam",
    email: "sg2199203@gmail.com",
    password: "userPassword"
}
```

**Response is a JS object that looks like this -**

```
{
    id: 6219f59b29849955414a7c5e
}
```

### For Login of Child

`POST` request on the URL - [https://finance-buddy-backend.vercel.app/child/login](https://finance-buddy-backend.vercel.app/child/login).

**Request HEADER should include -**
```
{
    "Content-Type": "application/json"
}
```

**Request body should include -**
```
{
    email: "sg2199203@gmail.com",
    password: "userPassword"
}
```

**Response is a JS object that looks like this -**

```
{
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2h1YmhhbSIsImVtYWlsIjoic2cyMTk5MjAzQGdtYWlsLmNvbSIsImNoaWxkcmVuIjpbXSwic2VudFJlcXVlc3RzIjpbXSwiaWQiOiI2MjE5ZjU5YjI5ODQ5OTU1NDE0YTdjNWUiLCJpYXQiOjE2NDU4NzI4MzZ9.tYuKEw1ZFh2GWlV_uZYF17PTDzG1Usil7humKBCXx1M"
    }
}
```

### For Dashboard of Child

`GET` request on the URL - [https://finance-buddy-backend.vercel.app/parent/child](https://finance-buddy-backend.vercel.app/parent/child).

**Request HEADER should include -**
```
{
    "Content-Type": "application/json",
    "auth-token" <token_recieved_during_login_request>
}
```

**Response is a JS object that looks like this -**

```
{
    "error": null,
    "data": {
        "parent": {
            "name": "shubham",
            "email": "sg2199203@gmail.com",
            "parent": [],
            "recievedRequests": [],
            "id": "6219f59b29849955414a7c5e",
            "iat": 1645868906
        }
    }
}
```
