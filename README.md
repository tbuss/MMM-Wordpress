# Info

This module for Magic Mirror should display posts from a WordPress site.


# Install

```bash
git clone https://github.com/tbuss/MMM-Wordpress.git
cd MMM-Wordpress
npm install
```

# Config

Put this in your config.js

```js
{
    module: 'MMM-Wordpress',
    position: 'bottom_bar', // or any other position
    config: {
        updateInterval: 10*60*1000, // 10 minutes
        url: 'https://www.your_wordpress.url',
        numberOfPosts: 5
    }
},
```