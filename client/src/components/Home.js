import React from 'react';
import { Link } from 'react-router-dom';
/**
 * 함수형 컴포넌트 스니펫입니다.
 */
const Home = () => {
  return (
    <div>
       <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">어바웃</Link>
        </li>
      </ul>
      <h1>Home</h1>
      <p>Take me home~ Country road~</p>
    </div>
  );
};

export default Home;
