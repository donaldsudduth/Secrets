# Secrets

This project is to demonstrate authentication and encryption methods for user security. 
Users can create an account to post an anonymous secret that will be posted on the /secrets page. 
oAuth for Google accounts can be used for authentication. 
All user passwords are hashed and have gone through 10 rounds of salting. 


# Usage
/register = users can register an account with an email/password combination, or can use Google oAuth to login. Once logged in, the user will be redirected to the /secrets page. 
/login = login to the Secrets website to be able to post your own secret. 
/secrets = web page where all the anonymous secrets are published. 
