# A simple full-stack web app using Spring Boot 3 + Angular 16  + MongoDB
# What it does?

It helps to keep your job application history in MongoDB. Each history item has job title, company, location, apply link, apply date and status. It can show the list using pagination, and filter the list by entered keyword. Besides, it supports batch import and export in CSV.

# Local Setup and Run the application

Step 1: Create a free account in Mongo DB (https://www.mongodb.com/).

Step 2: Download or clone the source code from GitHub to a local machine

# Backend

Make sure you have Java 17 and Maven 3.9 installed.

Step 3: edit the application.properties in backend/src/main/resources to set the mongodb_uri, something look like:

```
spring.data.mongodb.uri=mongodb+srv://testuser:Test123@cluster0.m5b2309.mongodb.net/?retryWrites=true&w=majority
```

Step 4:  ```mvn clean install```

Step 5:  ```mvn spring-boot:run```

# Frontend

Make sure you have Node.js and npm installed, as well as Angular/cli (e.g., version 16).

Step 6: ```npm install -g @angular/cli```

Step 7:  ```nnpm install bootstrap typescript```

Step 8:  ```npm install -g file-saver --save```

Step 9: ```npm install```

Step 10:  ```ng serve```

### From the browser call the endpoint http://localhost:4200/. You should get something like this:

<img src="https://github.com/msmarkgu/springboot3-angular16-mongodb-app/assets/26933333/a77b9183-de96-4def-a2dc-3fb3b7c448f2" width="800" height="450" />

