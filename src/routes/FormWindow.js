import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FormWindow.scss';

const FormWindow = () => {
  return (
    <div className='formWindow'>
      <div className='demo'>
        <div className='demo__title'>회의록 양식 선택</div>
        <div className='demo__content'>
          <div className='demo__content__wrap'>
            <label className='switcher'>
              <input type='checkbox' />
              <div className='switcher__indicator'></div>
              <span>회의 일시</span>
            </label>
            <label className='switcher'>
              <input type='checkbox' />
              <div className='switcher__indicator'></div>
              <span>작성자</span>
            </label>
          </div>
          <div className='demo__content__wrap'>
            <label className='switcher'>
              <input type='checkbox' />
              <div className='switcher__indicator'></div>
              <span>회의 장소</span>
            </label>
            <label className='switcher'>
              <input type='checkbox' />
              <div className='switcher__indicator'></div>
              <span>참석자</span>
            </label>
          </div>
          <div className='demo__content__wrap'>
            <label className='switcher'>
              <input type='checkbox' />
              <div className='switcher__indicator'></div>
              <span>회의 제목</span>
            </label>
            <label className='switcher'>
              <input type='checkbox' />
              <div className='switcher__indicator'></div>
              <span>참석자 서명란</span>
            </label>
          </div>
          <div className='demo__content__button'>
            <button className='button-two'>
              <span>회의록 생성</span>
            </button>
            <Link to={'/'}>
              <button className='button-two cancle'>
                <span>취소</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWindow;
