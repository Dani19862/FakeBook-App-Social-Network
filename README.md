Section 8 Extending the API:

1. Entity Framework Relationships

2. Entity Framework Conventions (using conventions to let EF figure out the relationships)

3. Seeding Data into the Database (the lazy approach)

4. the repository pattern (abstracting our work away from the dbcontext)

5. Using AutoMapper utility to map our models to our DTOs

6. Introduction

7. Extending the user entity

8. Adding a DateTime extension to calculate age

9. Entity Framework relationships

10. Generating seed data

11. Seeding data part one

12. Seeding data part two

13. The repository pattern why?

  * encapsulation of the logic
  * DRY: reduces duplicate query logic
  * it helps with testing
  * we can change the ORM
14. Creating a repository

15. Updating the users controller

16. Using AutoMapper

17. Configuring AutoMapper

18. Using AutoMapper queryable extensions

19. Section 8 summary

  * EF Relationship: understand the one to many relationship
  * EF Conventions: fully define relationship (photo being added it added to a user)
  * Seeding Data into the Database: the lazy way
  * The Repository Pattern: a bit more architecture (some will argue that's not necessary, but when it comes to testing it's a good idea)
  * Using AutoMapper:
     - configure AutoMapper and using the queryable extensions to use projection from our repository - into our DTOs,
     - so we don't handle the mapping in the controller, but in the repository
     - as it's one of it's jobs too, to get the data from the DB and return it in a  presentable format TO the controller     