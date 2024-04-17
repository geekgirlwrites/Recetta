// AboutUs.js

import React, { useState } from 'react';
import './aboutus.css';
import diyaHingerImage from '../components/image/diya hinger.png'; 
import anujatiwari from '../components/image/9d055793-5e83-40fc-b96a-3875aae5a154.jpg';
import pakhisushman from '../components/image/IMG_20230605_185705.jpg';
import niharika from '../components/image/IMG_20220428_132743~2.jpg';

export const AboutUs = () => {
  const [userReview, setUserReview] = useState('');
  const [userName, setUserName] = useState('');
  const [reviews, setReviews] = useState([
    { text: 'Lorem ipsum dolor sit amet.', author: 'John Doe' },
    { text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', author: 'Jane Smith' },
  ]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (userReview && userName) {
      setReviews([...reviews, { text: userReview, author: userName }]);
      setUserReview('');
      setUserName('');
    }
  };

  return (
    <div className="container">
      <div className="team-members">
        <h2 style={{color:'white'}}>Meet Our Members</h2>
        {/* Member 1 */}
        <div className="member">
          <img src={diyaHingerImage} alt="Diya Hinger" />
          <div className="text">
            <p>Diya Hinger</p>
            <p>20UCC040</p>
            <p>Email: 20ucc040@lnmiit.ac.in</p>
          </div>
        </div>

        {/* Member 2 */}
        <div className="member">
          <img src={anujatiwari} alt="Anuja Tiwari" />
          <div className="text">
            <p>Anuja Tiwari</p>
            <p>20UEC026</p>
            <p>Email: 20uec026@lnmiit.ac.in</p>
          </div>
        </div>
        <div className="member">
          <img src={niharika} alt="Niharika Mahajan" />
          <div className="text">
            <p>Niharika Mahajan</p>
            <p>20UEC084</p>
            <p>Email: 20uec084@lnmiit.ac.in</p>
          </div>
        </div>

        {/* Member 3 */}
        <div className="member">
          <img src={pakhisushman} alt="Pakhi Sushman" />
          <div className="text">
            <p>Pakhi Sushman</p>
            <p>20UEC088</p>
            <p>Email: 20uec088@lnmiit.ac.in</p>
          </div>
        </div>
      </div>

      <div className="reviews">
        <h3 style={{color:'white', paddingBottom:'30px'}}>What People Say About Us</h3>
        <ul style={{ color: 'black', listStyleType: 'none', paddingBottom:'20px' }}>
          {reviews.map((review, index) => (
            <li key={index}>
              <p style={{color:'white'}}>"{review.text}"</p>
              <p style={{color:'white'}}>- {review.author}</p>
            </li>
          ))}
        </ul>

        {/* Form for users to submit reviews */}
        <form className="form-aboutus" onSubmit={handleReviewSubmit}>
          <label style={{color:'white'}}>
            Your Name:
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </label>
          <label style={{ paddingBottom:'20px', color:'white' }}>
            Your Review:
            <textarea value={userReview} onChange={(e) => setUserReview(e.target.value)} />
          </label>
          <button className="button-aboutus" type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};
