/* global Module, MMM-Wordpress */

/* Magic Mirror
 * Module: MMM-Wordpress
 *
 * By Tobias Buss
 * MIT Licensed.
 */


Module.register('MMM-Wordpress', {
    defaults: {
      updateInterval: 600000, // 10 minutes
      url: 'YOUR_WORDPRESS_API_URL', // replace with your WordPress API endpoint
      numberOfPosts: 5 // number of posts to display
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
      const numberOfPosts = this.config.numberOfPosts;
  
      const request = require('request');
  
      request.get(`${url}/wp-json/wp/v2/posts?per_page=${numberOfPosts}`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          this.posts = JSON.parse(body);
          this.updateDom();
        }
      });
    },
  
    getDom: function() {
      const wrapper = document.createElement('div');
      const posts = this.posts;
  
      if (posts.length > 0) {
        for (let i = 0; i < posts.length; i++) {
          const post = posts[i];
          const postElement = document.createElement('div');
          postElement.innerHTML = `<h2>${post.title.rendered}</h2><p>${post.excerpt.rendered}</p>`;
          wrapper.appendChild(postElement);
        }
      } else {
        wrapper.innerHTML = 'No posts found';
      }
  
      return wrapper;
    }
  });

  