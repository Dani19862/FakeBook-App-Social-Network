# FakeBook - Social Network Application

### 1.	About This Project

The app serves as a simple social network that allows you to create an account, create posts and comments, like and communicate with friends in messages.

This App is an end to end application.
The Server side written in c# by Asp.Net technology ,Entity Framework (EF) Core.
The Server side written with Angular (version 13), based on java script, TypeScript, HTML and CSS.

In this project, Repository and UnitOfWork design patterns were used.

 ### 2. Run The Appliction :
 - To run the application you need to to activate the server by running the command `dotnet run` in the .NET CLI - within API folder.
   if the DB doesn't exist it will be created in the Program by actiavting the migration with the method - Database.MigrateAsync(), with a data Seed.
 - after that, open a new terminal within the client folder and run the command `ng serve` to activate the client side, angular server.
 - if it dosen't work run the command `npm install` to update all packages and then tun again `ng serve`.

 ### 3. Usage :
  - Create an account in the home page by clicking the Register button and start communicate with your friends.
  - Go to the feed page and publish posts and comments, like posts.
  - go to the member page to watch your friends cards, send them meesages.

  
  ### This applictaion was developed by _Daniel Levy
  ## mail : daniellevy1989@gmail.com
  
  
