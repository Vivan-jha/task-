


import Masonry from 'react-masonry-css';
import styles from '../components/Imagegrid.module.css';
import React, { useState } from 'react';

interface ImageGridProps {
  recognitionData: {
    img: string;
    team_name: string;
    message: string;
    receiver_names: string[];
    value: number;
    date_posted: string;
  }[];
}

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const ImageGrid: React.FC<ImageGridProps> = ({ recognitionData }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredRecognitionData = recognitionData.filter(data =>
    (data.team_name.includes(searchKeyword) ||
     data.message.includes(searchKeyword) ||
     data.receiver_names.some(name => name.includes(searchKeyword))) &&
    (startDate === '' || data.date_posted >= startDate) &&
    (endDate === '' || data.date_posted <= endDate)
  );

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setFilteredRecognitionData(recognitionData.filter(data =>
      (data.team_name.includes(searchKeyword) ||
       data.message.includes(searchKeyword) ||
       data.receiver_names.some(name => name.includes(searchKeyword))) &&
      (startDate === '' || data.date_posted >= startDate) &&
      (endDate === '' || data.date_posted <= endDate)
    ));
  };

  return (
    <div>
      <div className={styles['search']}>
        <input
          className={styles['searchterm']}
          type="text"
          placeholder="Search by team name, message, receiver name, or date posted"
          value={searchKeyword}
          onChange={handleSearchChange}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        <button onClick={() => { setStartDate(''); setEndDate(''); }}>Clear Date Range</button>
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles['my-masonry-grid']}
        columnClassName={styles['my-masonry-grid_column']}
      >
        {filteredRecognitionData.map((data, index) => (
          <div key={index} className={styles['image-item']}>
            {data.img ? (
              <img src={data.img} alt={`Image ${index}`} />
            ) : (
              <img src="https://images.squarespace-cdn.com/content/v1/538d37c5e4b0688c5c56de0e/1503778857835-5IP78QV5RQA5SHEFRY9H/DomSmall3.gif?format=1000w" alt={`Placeholder Image ${index}`}  />
            )}

            <div className={styles['image-details']}>
              <p>Team: {data.team_name}</p>
              <p>Message: {data.message}</p>
              <p>Receivers: {data.receiver_names.join(', ')}</p>
              <p>Value: {data.value}</p>
              <p>Date Posted: {new Date(data.date_posted).toDateString()}</p>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default ImageGrid;


