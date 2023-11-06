## Back-end structure
+ Server
  - middleware
     - verify token
     - verify username
  - models
     - user - userSchema
     - lesson - lessonSchema
  - services
     - genToken
       - generate token with id, username, role
     - getLessons
       - get lessons from database - username or all
  - routes
     - More inside server.md