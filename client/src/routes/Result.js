import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import axios from 'axios';
import './Result.css';
import { listen } from 'socket.io';
const SimpleComponent = (props) => {
  const { printRef } = props;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

 
  const [data, setData] = useState('');
  useEffect ( () => {
    axios.get('/result')
    /*
    .then(function(response) {
      console.log(response.data)
    })
    */
    .then(res => {
      setData(res.data.script);
    })
  }, []);

  console.log(data)
 
  let strDay = `${year} / ${month} / ${date}`;
  return (
    <div className='noteDiv' ref={printRef}>
      <span className='noteText'>회의록</span>
      <table className='noteTable'>
        <tr>
          <td>회의일시</td>
          <td>{strDay}</td>
          <td>작성자</td>
          <td colSpan='3'>
            <input type='text' placeholder='이름' />
          </td>
        </tr>
        <tr>
          <td>참석자</td>
          <td colSpan='3'>
            <input type='text' placeholder='이름' />
          </td>
        </tr>
        <tr>
          <td>회의 제목</td>
          <td colSpan='3'>
            <input type='text' placeholder='제목' />
          </td>
        </tr>
        <tr className='meetingNote'>
          <td>회의 내용</td>
          <td colSpan='3'>
          {data}
          </td>
        </tr>
        <tr>
          <td rowSpan='4'>참석자 서명란</td>
          <td colSpan='2'>
            <span>(인)</span>
          </td>
          <td>
            <span>(인)</span>
          </td>
        </tr>
        <tr>
          <td colSpan='2'>
            <span>(인)</span>
          </td>
          <td>
            <span>(인)</span>
          </td>
        </tr>
        <tr>
          <td colSpan='2'>
            <span>(인)</span>
          </td>
          <td>
            <span>(인)</span>
          </td>
        </tr>
        <tr>
          <td colSpan='2'>
            <span>(인)</span>
          </td>
          <td>
            <span>(인)</span>
          </td>
        </tr>
      </table>
    </div>
  );
};


function Result () {

  const componentRef = useRef(null);
  /*
  useEffect ( () => {
    axios.get('/speechtoText')
    .then(function(response) {
      console.log(response.data)
    })
  });
  */

  return (
    <div>
      {' '}
      <ReactToPrint
        content={() => componentRef.current}
        trigger={() => (
          <button>
            <i class='fas fa-print fa-2x'></i>
          </button>
        )}
      />{' '}
      <SimpleComponent printRef={componentRef} /> <printButton />
    </div>
  );
        

};

export default Result;