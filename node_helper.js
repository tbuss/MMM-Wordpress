const NodeHelper = require('node_helper');
const request = require('request');

module.exports = NodeHelper.create({
  start: function() {
    console.log('MMM-Wordpress helper started...');
  },

  socketNotificationReceived: function(notification, payload) {
    console.log('Notification!');
    if (notification === 'GET_POSTS') {
      console.log('Notification: GET_POSTS');
      const { url, posts, numberOfPosts } = payload;
      const apiUrl = `${url}/wp-json/wp/v2/${posts}?per_page=${numberOfPosts}`;

      request.get(apiUrl, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const posts = JSON.parse(body);
          this.sendSocketNotification('POSTS_RESULT', posts);
        }
      });
    }
  }
});
