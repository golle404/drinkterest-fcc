import React from 'react';

const About = () => {
  return (
    <div className="container-about">
      <p>DRINKTEREST is my impementation of FreeCodeCamp
        <a href="https://www.freecodecamp.com/challenges/build-a-pinterest-clone"> "Build a Pinterest Clone" </a>
         challenge
      </p>
      <p>With DRINKTEREST App users can view submissions by other users, can vote on dink submission, and submit their own favorite drinks.</p>
      <p>
        <a href="https://www.freecodecamp.com">FreeCodeCamp </a> is an open source community that helps you learn to code.
      </p>
      <h3>Main tools and libraries used:</h3>
      <div className="about-tools">
        <div className="about-block">
          <h4>Backend:</h4>
          <ul>
            <li>
              <a href="https://nodejs.org/en/">Node.js</a>
            </li>
            <li>
              <a href="http://expressjs.com/">Express.js</a>
            </li>
            <li>
              <a href="https://www.mongodb.com/">MongoDB</a>
            </li>
            <li>
              <a href="http://mongoosejs.com/">Mongoose</a>
            </li>
            <li>
              <a href="http://passportjs.org/">Passport.js</a>
            </li>
            <li>
              <a href="http://socket.io/">Socket.io</a>
            </li>
          </ul>
        </div>
        <div className="about-block">
          <h4>Frontend:</h4>
          <ul>
            <li>
              <a href="https://facebook.github.io/react/">React.js</a>
            </li>
            <li>
              <a href="https://github.com/reactjs/react-router">React Router</a>
            </li>
            <li>
              <a href="https://reduxframework.com/">Redux</a>
            </li>
            <li>
              <a href="https://github.com/reactjs/react-redux">React Redux</a>
            </li>
            <li>
              <a href="http://facebook.github.io/immutable-js/">Immutable.js</a>
            </li>
            <li>
              <a href="https://github.com/paularmstrong/normalizr">normalizr</a>
            </li>
          </ul>
        </div>
        <div className= "about-block">
          <h4>Build Tools:</h4>
          <ul>
            <li>
              <a href="https://webpack.github.io/">Webpack</a>
            </li>
            <li>
              <a href="https://babeljs.io/">Babel</a>
            </li>
          </ul>
        </div>
      </div>
      <p>
        <a href="https://github.com/golle404/drinkterest-fcc">
          Source
        </a>
        {" | "}
        <a href="https://www.freecodecamp.com/golle404">
          FreeCodeCamp profile
        </a>
      </p>
    </div>
  );
};

export default About;
