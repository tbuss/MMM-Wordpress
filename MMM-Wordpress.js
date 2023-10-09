/* global Module, MMM-Wordpress */

/* Magic Mirror
 * Module: MMM-Wordpress
 *
 * By Tobias Buss
 * MIT Licensed.
 */
const NodeHelper = require('./node_helper.js');

Module.register('MMM-Wordpress', {
  defaults: {
    updateInterval: 600000, // 10 minutes
    url: 'YOUR_WORDPRESS_API_URL', // replace with your WordPress API endpoint
    numberOfPosts: 5, // number of posts to display
      posts: 'posts', //Endpoint ("posts" for normal posts, can be changed to custom post type)
  },

  start: function() {
    this.posts = [];
    this.getPosts();
    setInterval(() => {
      this.getPosts();
    }, this.config.updateInterval);
  },

  getPosts: function() {
    const url = this.config.url;
    const posts = this.config.posts;
    const numberOfPosts = this.config.numberOfPosts;

    //hier müssen die posts noch rein!
    this.sendSocketNotification('GET_POSTS', { url, numberOfPosts });
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'POSTS_RESULT' && payload) {
      this.posts = payload;
      this.updateDom();
    }
  },

  getDom: function() {
    const wrapper = document.createElement('div');
    const posts = this.posts;

    if (posts.length > 0) {
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const postElement = document.createElement('div');
        postElement.innerHTML = `<h2>${this.stripTags(post.title.rendered)}</h2><p>${this.stripTags(post.excerpt.rendered)}</p>`;
        wrapper.appendChild(postElement);
      }
    } else {
      wrapper.innerHTML = 'Keine Beiträge gefunden';
    }

    return wrapper;
  },

  stripTags: function(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }
});
