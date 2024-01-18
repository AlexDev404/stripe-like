while ($true) {
Invoke-WebRequest -Method POST -H @{"Content-Type"= "application/json"} -Body '{"what":"auth","is":["username","password"]}' http://localhost:8080/api/v0/auth/login;
}