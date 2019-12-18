# Post Thoughts

This is a content and comment web app built with react and redux. Users can post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users are also able to edit and delete posts and comments.

This app is deployed with Netlify and can be accessed here: [post-thoughts.ramizrahman.com](https://post-thoughts.ramizrahman.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/648c3d6f-520d-4755-a3f0-c35e88b11aa6/deploy-status)](https://app.netlify.com/sites/ramizrahman-post-thoughts/deploys)

View a demo of the app on [youtube](https://youtu.be/B8vIyaRwPpo):

[![Demo of 'Post Thoughts' by Ramiz Rahman](http://img.youtube.com/vi/B8vIyaRwPpo/0.jpg)](http://www.youtube.com/watch?v=B8vIyaRwPpo 'Post Thoughts By Ramiz Rahman')

## Purpose

This content and comment structure is common across a large number of websites and applications, from news sites to blogs to aggregators like Hacker News and Reddit. My purpose with building this app was to gain an understanding and demonstrate how React and Redux can function in a standard type of application.

I've also structured my React components in a modular way so that they can used as a starter kit for building similar kinds of applications in the future.

## Installation

The app is already deployed so you can play around with the final product using this [link](https://post-thoughts.ramizrahman.com).

If you wish to run this app locally, clone this repo and install the dependencies.

```
$ git clone https://github.com/ramiz-rahman/post-thoughts-frontend.git
$ cd post-thoughts-frontend
$ npm install
```

The backend server is a modified fork of [udacity's readable demo server](https://github.com/udacity/reactnd-project-readable-starter) that is deployed using [heroku](https://ramiz-post-thoughts-api-server.herokuapp.com/).

As the heroku server is running on a free dyno, for best performance I would strongly recommend installing the [server](https://github.com/udacity/reactnd-project-readable-starter) locally and then replace the line 9 in the `src/utils/PostsApi.js` file:

```
const api = 'https://ramiz-post-thoughts-api-server.herokuapp.com';
```

with the following:

```
const api = 'http://localhost:3001';
```

The server's endpoints are used to manage storing, reading, updating, and deleting data for the application.

### Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## App Conventions

The app is grouped into components and containers. The key difference between the two are that containers connect directly to the Redux store whereas components do not. They are separated into two different folders: `src/components` and `src/containers`. However, both of these groups follow these common conventions:

1. Each component or container is contained in its own folder.
2. The folder is named in `PascalCase`.
3. The folder contains a minimum of two files - a `<ComponentName>.js` file and a `<ComponentName>.module.css` file.
4. The `<ComponentName>` is the same as the folder name and is written in `PascalCase`.
5. The `<ComponentName>.js` file imports React and a styles object from the `<ComponentName>.module.css` file.
6. The `<ComponentName>.module.css` file imports the `src/styles/colors.css` file that contains css variables. This is used to ensure that app colors are consistent across all components and can be updated from one place only, thus making the code more reusable and dry. The idea can be extended for layouts and typography as well but I felt it was not needed for this app.
7. The `<ComponentName>.module.css` file only contains rules for classes which are written using an alternate style naming scheme of [BEM](https://en.bem.info/methodology/quick-start/) that is described as follows:

   - Blocks are written in `PascalCase` and must match the name of the corresponding component.
   - Elements are also written in PascalCase and separated from the block using double underscores (`__`). eg. `ComponentName__ElementName`.
   - An element is always part of a block, not another element.
   - Modifiers are written in lowercase.
   - The modifier name is separated from the block or element name by a single underscore (`_`). eg. `ComponentName_modifername_modifiervalue`

The `index.css` file uses a modified version of Bootsrap's [reboot.css](https://github.com/twbs/bootstrap/blob/v4-dev/dist/css/bootstrap-reboot.css) file. This is used to ensure that the styling remains consistent across different browsers.

## App Functionality

The app has three primary views as defined below:

### Category view

This is the default (Root) view of the app with **all** being the default category. It contains an action bar and a list of all posts.

![all categories](https://i.imgur.com/Fz6MxAH.png)

The action bar itself contains a list of all available categories, which when clicked, takes you to the category view for that category.

![selected category](https://i.imgur.com/6NSYuUk.png)

The action bar also contains a control for sorting the list of posts. The controls are defined as follows:

- **Top Rated**: Sorts by the votescore in descending order
- **Controversial**: Sorts by the votescore in ascending order
- **Latest**: Sorts by timestamp in descending order
- **Oldest**: Sorts by timestamp in ascending order

![sort in action](https://i.imgur.com/U0jCx4q.png)

The action bar also contains a button that navigates you to the Create Post View.

### Create/Edit Post View

The Create or Edit Post view changes based on how it was reached. If it was reached using the create button, then the form displayed is empty and you have to fill everything up.

![create post](https://i.imgur.com/GeAeyaS.png)

If you had navigated this to this view by clicking on the edit button of a post, then the details of the post would have already been filled up.

![edit post](https://i.imgur.com/0Mgnnp7.png)

### Post Details View

Click on the body of a post from the category view to navigate to the post details view. Here you can see the post along with a form for adding a comment and a list of comments for that post.

To add a comment, type into the comment box and click the _comment_ button

![add comment](https://i.imgur.com/akPV1yO.png)

Once the comment is saved, it will appear in the list of comments.

![comment list](https://i.imgur.com/1Byb2H8.png)

Like posts, comments can be upvoted or downvoted, edited and deleted.

## License

My Reads is released under the [MIT License](https://choosealicense.com/licenses/mit/)
