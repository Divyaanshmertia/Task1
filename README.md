# Celebal Summer Intern Task-1
## Domain: NodeJS
## :page_facing_up: [Swagger Documentation](https://csi-task-one.herokuapp.com/api-docs/)
### **Note: Only use HTTPS scheme in swagger doc.**
## :rocket: [Express App Deployed at Heroku](https://csi-task-one.herokuapp.com/): 
### - Create a CRUD Operations for a Student Application having the following functionality.
+ Admin can register the students and circulate the StudentID to respective Student
+ Admin can update the total marks plus marks in every subject in the system
+ Students can log-in using the StudentId and in response get the Authentication 
Token used for further APIs
+ Using the AuthToken Student can view the detailed results or total marks or 
percentages only (used query parameters here)
+ Admin only can delete the student record
#
Rest Endpoints 
1. *POST* /student/login 
+ Students pass their studentID in the form data
+ API should check StudentID exists or not if exists send authToken in 
response with 200 else return 404
2. *GET* /student/results 
+ Middleware to verify the authentication token present in the header
+ Return the status with a proper error message if a token is invalid
+ Students can filter the results by passing any subject name, In this case,
only specified subject marks would return
3. *GET* /me 
+ Middleware to verify the authentication token present in the header
+ Student can view their details inserted by Admin like family background,
mobile no. course details etc.
4. *PUT* /student/update 
+ Middleware to verify the authentication token present in the header
+ Students can update their personal details 
5. *POST* /admin/login 
+ Admin pass the AdminId in form data 
+ API should check StudentID exists or not if exists send authToken in 
response with 200 else return 404 
6. *POST* /admin/addStudent 
+ Middleware to verify the authentication token present in the header
+ Insert the new record of the Student and in response return the Student 
ID
 
7. *PUT* /admin/students/id 
+ Middleware to verify the authentication token present in the header
+ Update the student record
8. *DELETE* /admin/delete/students/id 
+ Middleware to verify the authentication token present in the header
+ Delete the student record
