# FakeBook-App-Social-Network
8. Getting to know the API project files

9. Creating our first Entity

10. Introduction to Entity Framework what is EF?

  * an object relational mapper is used to translate our code to SQL commands
  * it's good because ADO.net was problematic (open/close connections, manual operations ("strings") => error prone)
  * so microsoft introduces EF
  now we have | we'll add now | well have later ^ | // EF // | Id UserName AppUser | DbContext | 1 Bob (acts as bridge) 2 Tom

DbContext allows us to write Linq Queries:

DbContext.Users.Add(new User{Id = 4, Name="John"}) => sqlite provider => INSERT INTO Users (Id, Name) VALUES (4, "John")

  * EF work with DB Providers
  * for Dev we'll use Sql Lite (no need to install, using a file)
  * not for production, great for dev (portable, just adds a file to project)
  * later we'll change this

so our provider is responsible for the translation

summery. EF Features:

 * Querying
 * Change Tracking (in our entities to be submitted to db)
 * Saving (CRUD), DBContext will provide the SaveChanges (well see that)
 * Concurrency (preventing overriding changes made by another user)
 * Transactions (Transaction managment (like rollback))
 * Caching (first level - returned objects caching - same query => data from cache)
 * Built-in conventions (conventions to help build schema (like the Id prop name))
 * Configurations (to override conventions)
 * Migrations (the ability to create schema - generate db on command)
 * this is all called 'code first' and it's better because it's more convenient for developers

11. Adding Entity Framework to our project

12. Adding a DbContext class

13. Creating the Connection string.

14. Creating the DB using EF Code first migrations

15. Adding a new API Controller

16. Making our code Asynchronous

17. Saving our code into Source control

18. Section 1 Summary

 * used doentet cli to create app, solution file gitignore file
 * implemented basic API functionality, controller and endpoints
 * installed entity framework, get data
 * project structure
 * configuration of the variables of our app
 * source control

next up:

 * setting our angular app to get the data from there