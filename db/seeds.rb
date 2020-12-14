# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create(email: 'benfairbank26@gmail.com', password: '112233', password_confirmation: '112233')
User.create(email: 'yardsalenotifications@gmail.com', password: '112233', password_confirmation: '112233')
User.create(email: 'mariaanespina@gmail.com', password: '112233', password_confirmation: '112233')
Joke.create(user_id: 1, body: "Classic!", image: "https://i.pinimg.com/564x/7d/e8/e1/7de8e1bb164f8bf5b2851d26680223a8.jpg",)
Joke.create(user_id: 1, body: "Horrible...", image: "https://media.socastsrm.com/wordpress/wp-content/blogs.dir/853/files/2019/06/Fishhhhhhh.jpg",)
Comment.create(user_id: 1, joke_id: 1, body: "Hilarious! (If I don't say so myself...)")
Comment.create(user_id: 1, joke_id: 1, body: "I really crack myself up")
Rating.create(user_id: 1, joke_id: 1, value: 10)
Rating.create(user_id: 2, joke_id: 1, value: 3)
Rating.create(user_id: 3, joke_id: 1, value: 4)
Rating.create(user_id: 3, joke_id: 2, value: 1)