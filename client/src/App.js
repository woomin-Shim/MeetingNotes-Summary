import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
   // get요청으로 전송받을 데이터를 담을 state
   const [loadData, setLoadData] = useState();

   // 컴포넌트가 처음 렌더링되었을 때 실행될 useEffect
   useEffect(() => {
     // axios 라이브러리를 사용하여 get요청을 받아옵니다.
     axios
       .get('/api/load')
       .then((res) => {
         // get요청이 성공하면 콘솔에 데이터를 띄우고 스테이트를 변경
         console.log(res.data);
         setLoadData(res.data);
       })
       .catch((err) => {
         // get요청이 실패하면 콘솔에 에러 메세지를 띄움
         console.log(err);
       });
   }, []);
 
   return (
     <div className='App' style={{ marginTop: '5rem' }}>
       {loadData ? (
         <div>
           안녕하세요 {loadData.name}입니다. {loadData.age}살이에요.
         </div>
       ) : null}
     </div>
   );
}

export default App;
