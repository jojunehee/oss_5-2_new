import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const EditPage = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const [parcel, setParcel] = useState(null);
  const [editCount, setEditCount] = useState(0); // 총 수정 횟수 상태 변수 추가

  // useRef를 각 필드에 사용
  const trackingNumberRef = useRef(null);
  const senderNameRef = useRef(null);
  const recipientNameRef = useRef(null);
  const recipientAddressRef = useRef(null);
  const statusRef = useRef(null);
  const costRef = useRef(null);

  useEffect(() => {
    // 해당 id로 Parcel 정보 가져오기
    const fetchParcel = async () => {
      try {
        const response = await axios.get(`https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels/${id}`);
        setParcel(response.data);
      } catch (error) {
        console.error('Error fetching parcel details:', error);
      }
    };

    fetchParcel();
  }, [id]);

  const validateFields = () => {
    const refs = [
      { ref: trackingNumberRef, name: '운송장 번호' },
      { ref: senderNameRef, name: '보내는 사람' },
      { ref: recipientNameRef, name: '받는 사람' },
      { ref: recipientAddressRef, name: '주소' },
      { ref: costRef, name: '비용' },
    ];

    for (const { ref, name } of refs) {
      if (!ref.current.value.trim()) {
        alert(`${name}을(를) 입력해주세요.`);
        ref.current.focus();
        return false;
      }
    }

    if (costRef.current.value < 0) {
      alert('비용은 0보다 커야 합니다.');
      costRef.current.focus();
      return false;
    }

    return true;
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    setParcel((prevParcel) => ({
      ...prevParcel,
      [name]: value,
    }));

    if (validateFields()) {
      try {
        await axios.put(`https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels/${id}`, {
          ...parcel,
          [name]: value,
        });
        setEditCount((prevCount) => prevCount + 1); // 수정 횟수 증가
      } catch (error) {
        console.error('Error updating parcel details:', error);
      }
    }
  };

  if (!parcel) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>수정하기</h2>
      <p>총 수정 횟수: {editCount}</p>
      <form>
        <div className="mb-3">
          <label className="form-label">운송장 번호</label>
          <input
            ref={trackingNumberRef}
            type="text"
            className="form-control"
            name="tracking_number"
            value={parcel.tracking_number || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">보내는 사람</label>
          <input
            ref={senderNameRef}
            type="text"
            className="form-control"
            name="sender_name"
            value={parcel.sender_name || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">받는 사람</label>
          <input
            ref={recipientNameRef}
            type="text"
            className="form-control"
            name="recipient_name"
            value={parcel.recipient_name || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">주소</label>
          <input
            ref={recipientAddressRef}
            type="text"
            className="form-control"
            name="recipient_address"
            value={parcel.recipient_address || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">상태</label>
          <select
            ref={statusRef}
            className="form-select"
            name="status"
            value={parcel.status || ''}
            onChange={handleInputChange}
          >
            <option value="배송 준비">배송 준비</option>
            <option value="배송 중">배송 중</option>
            <option value="배송 완료">배송 완료</option>
            <option value="반송">반송</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">비용</label>
          <input
            ref={costRef}
            type="number"
            className="form-control"
            name="cost"
            value={parcel.cost || ''}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div className="mt-4">
        <Button variant="secondary" onClick={() => window.history.back()} className="me-2">
          뒤로가기
        </Button>
      </div>
    </div>
  );
};

export default EditPage;
