# React + Vite

Development -
Body

- NavBar
- Route=/ => Feed
- Route=/login => Login
- Route=/connections => Connections
- Route=/profile => Profile

#Deployment -

- Signup on AWS
- Launch an ec2 instance
- chmod 400 <secret>.pem
- ssh ec2 instance
- Install node js
- Git clone
- npm i
- npm run build
- sudo apt update
- sudo apt install nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx
- Copy code from dist(build files) to /var/www/html/
  - sudo scp -r dist/\* /var/www/html
- Enable port :80 of your instance
