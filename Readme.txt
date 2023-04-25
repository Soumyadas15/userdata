Development to deployment: A step by step approach

Working url: https://userdata1.netlify.app
Backend URL: https://userdata-qqlp.onrender.com/users


Backend:

Step 1: Initializing the backend:

    1. In this step I created the backend directory and the necessary sub-directories for the backend.
    2. Then I installed the necessary npm packages: Express, Cars, node-cache, Mongoose, MongoDB and nodemon.

Step 2: Creating the backend files:

    1. In this step I created the server.js file that listens on port 5000.
    2. Inside the database folder, I created a db.js file that connects to the mongoDB cluster.
    3. After creating the db.js file, I moved on to create the UserSchema.js inside schemas folder.


Step 3: Creating the API routes:

    1. In this step, I defined an API route called ‘users’ inside the server.js file.
    2. From the users route we are fetching user data.
    3. Then using the Cors dependency I enabled Cross Origin Resource Sharing.
    4. I also used caching to cache the users and reduce loading time.


Step4: Uploading the dataset:

    1. In this step, I used postman to test the API.
    2. I uploaded the data to mongoDB by sending a post request.

Our backend Is done!


Frontend:

Step1: Initializing the frontend:

    1. In this step I initialised the backend in a folder called “front” using the command ’npx create-react-app front’.
    2. Then I installed the axios dependency.
    3. I created a folder called ‘components’ inside src and a subfolder named ‘styles’

Step2: Creating the Table.js file:

    1. In the components folder, I created a Table.js file for the table.
    2. Inside the table component I used axis to fetch data from the server.
    3. Then I rendered out a dynamic table using user data.

Step3: Creating filters:

    1. In this step, I created filter functions to filter out data.
    2. Instead of creating five different table components for five different tables, which would have increased loading time significantly, I decided to create four functions instead.
    3. I created a dropdown menu in the table component to select the corresponding table with the filters. When a table is selected, it renders out filtered content defined by its filter function, avoiding frequent API calls.

Step4: CSS styling:

    1. In this step I added some CSS to make the table look visually appealing.

Step5: Deployment:

    1. Finally I deployed the backend on render and the frontend on netlify.
