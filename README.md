# The Dad-a-base

The Dad-a-base is social media site for sharing and rating 'dad jokes' and 'dad memes'.  Users can post jokes in text and/or image format.  Posts can receive comments and ratings.

The Dad-a-base is visitable at: http://thedadabase.herokuapp.com/


### Stack

  - Ruby 2.6.5
  - Rails 5.2.4.4
  - React 16.8.0
  - PostgresSQL 12


### Set Up

Complete the following steps to create an instance of The Dad-a-base on your local machine.

Open your terminal and execute the following command to clone the GitHub repository.
Make sure you execute this command from the directory that you wish to keep this project.
If you do not have git configured on your machine you may refer to this guide: https://github.com/git-guides/install-git

  `$ git clone https://github.com/BenjaminFairbank/dad-a-base.git`

Once you have downloaded the repository to your local machine, navigate into the project directory.

  `$ cd yardsale`

Download required ruby gems by executing:

  `$ bundle install`

Download required yarn and node packages with:

  `$ yarn install`

Create the PostgresSQL database with the following commands:

  `$ rake db:create`

  `$ rake db:migrate`

Before running the app locally one must still configure a number of things.


### AWS S3

The Dad-a-base uses AWS S3 for cloud image storage.  You must sign up for an AWS account in order to configure the AWS Access Key ID and the AWS Secret Access Key needed to run the app.  After that, you will need to configure an S3 bucket for development, and also for production if you wish to deploy.  If you are unfamiliar with AWS, refer to the documentation here: https://aws.amazon.com/s3/getting-started/

Once you have completed the setup, you must provide the keys in the .env file found the project's main directory as such:

  `AWS_ACCESS_KEY_ID='Your-access-key-ID'`

  `AWS_SECRET_ACCESS_KEY='Your-secret-access-key'`

  `DEVELOPMENT_S3_BUCKET='The-name-of-your-development-bucket'`

  `PRODUCTION_S3_BUCKET='The-name-of-your-production-bucket'`

...replacing the values in single quotations with your own corresponding values.


### Development Environment

The application is now ready to be run in a development environment on your local machine.

To do so, execute the following from the project's directory:

  `$ rails s`

Then, in a separate terminal, within the same directory execute:

  `$ yarn start`

The project will then be viewable by visiting 'localhost:3000' in your browser.


### Testing

The test suite can be run by executing:

  `$ rspec`


### To Do

 - Encrypt frontend sign-in features
 - Edit posts
 - User pages
 - Sharing
 - Favorites
 - GIF comments with giphy API
 - Tests
 - Topbar "hamburger" menu for login, favs, user page, top rated, etc 
...


### Inspiration

The Dad-a-base was inspired by a dad joke meme which can be viewed here: https://img-9gag-fun.9cache.com/photo/ae5XW2p_460s.jpg.  As someone who has a healthy appetite for terrible puns, I thought this would be an enjoyable side project that I could share with friends and family who share my taste in humour.


### Please enjoy this application! Any regards can be directed to benfairbank26@gmail.com
