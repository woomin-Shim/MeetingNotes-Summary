import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import './Result.css';
const SimpleComponent = (props) => {
  const { printRef } = props;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  let strDay = `${year} / ${month} / ${date}`;
  return (
    <div className='noteDiv' ref={printRef}>
      <span className='noteText'>회의록</span>
      <table className='noteTable'>
        <tr>
          <td>회의일시</td>
          <td>{strDay}</td>
          <td>작성자</td>
          <td>
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
          <td colSpan='3'></td>
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

const printButton = () => {
  return <button>print</button>;
};
const Result = () => {
  const componentRef = useRef(null);

  return (
    <div>
      {' '}
      <ReactToPrint content={() => componentRef.current} trigger={() => <printButton />} /> <SimpleComponent printRef={componentRef} /> <printButton />
    </div>
  );
};

export default Result;
