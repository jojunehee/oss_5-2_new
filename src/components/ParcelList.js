// 파일: ParcelList.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

function ParcelList({ parcels = [], handleShowModal, deleteParcel }) {
  const navigate = useNavigate();

  // 수정된 부분: handleShowDetails 함수 추가
  const handleShowDetails = (parcel) => {
    navigate(`/detail/${parcel.id}`);
  };
  // 수정된 부분: handleShowEdit 함수 추가
  const handleShowEdit = (parcel) => {
    navigate(`/update/${parcel.id}`);
  };
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>운송장 번호</th>
          <th>보내는 사람</th>
          <th>받는 사람</th>
          <th>주소</th>
          <th>상태</th>
          <th>비용</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {parcels.map((parcel) => (
          <tr key={parcel.id}>
            <td>{parcel.tracking_number}</td>
            <td>{parcel.sender_name}</td>
            <td>{parcel.recipient_name}</td>
            <td>{parcel.recipient_address}</td>
            <td>{parcel.status}</td>
            <td>{Number(parcel.cost).toLocaleString()}원</td>
            <td>
              <div className="d-flex flex-wrap align-items-center gap-2">
                <button
                  className="btn btn-success"
                  onClick={() => handleShowEdit(parcel)}
                >
                  수정
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => deleteParcel && deleteParcel(parcel.id)}
                >
                  삭제
                </button>
                <button
                  className="btn btn-info"
                  // 수정된 부분: onClick에 handleShowDetails 연결
                  onClick={() => handleShowDetails(parcel)}
                >
                  자세히
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ParcelList;
