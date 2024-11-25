// 파일: DetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailPage = () => {
  const { id } = useParams(); // 수정된 부분: useParams를 사용하여 URL에서 id 가져오기
  const [parcel, setParcel] = useState(null);

  useEffect(() => {
    const fetchParcel = async () => {
      try {
        // 수정된 부분: 해당 id로 Parcel 정보 가져오기
        const response = await axios.get(`https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels/${id}`);
        setParcel(response.data);
      } catch (error) {
        console.error('Error fetching parcel details:', error);
      }
    };

    fetchParcel();
  }, [id]);

  if (!parcel) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Parcel Detail</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>운송장 번호</th>
            <td>{parcel.tracking_number}</td>
          </tr>
          <tr>
            <th>보내는 사람</th>
            <td>{parcel.sender_name}</td>
          </tr>
          <tr>
            <th>받는 사람</th>
            <td>{parcel.recipient_name}</td>
          </tr>
          <tr>
            <th>주소</th>
            <td>{parcel.recipient_address}</td>
          </tr>
          <tr>
            <th>상태</th>
            <td>{parcel.status}</td>
          </tr>
          <tr>
            <th>비용</th>
            <td>{Number(parcel.cost).toLocaleString()}원</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailPage;
