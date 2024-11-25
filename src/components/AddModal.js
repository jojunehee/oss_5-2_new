import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';

function AddModal({ show, handleClose, handleNewParcelChange, addParcel, newParcel }) {
  const trackingNumberRef = useRef(null);
  const senderNameRef = useRef(null);
  const recipientNameRef = useRef(null);
  const recipientAddressRef = useRef(null);
  const statusRef = useRef(null);
  const costRef = useRef(null);

  const validateFields = () => {
    const refs = [
      { ref: trackingNumberRef, name: "운송장 번호" },
      { ref: senderNameRef, name: "보내는 사람" },
      { ref: recipientNameRef, name: "받는 사람" },
      { ref: recipientAddressRef, name: "주소" },
      { ref: statusRef, name: "상태" },
      { ref: costRef, name: "비용" },
    ];

    for (const { ref, name } of refs) {
      if (!ref.current.value.trim()) {
        alert(`${name}을(를) 입력해주세요.`);
        ref.current.focus();
        return false;
      }
    }

    if (costRef.current.value < 0) {
      alert("비용은 0보다 커야 합니다.");
      costRef.current.focus();
      return false;
    }

    return true;
  };

  const handleAddParcel = () => {
    if (validateFields()) {
      addParcel();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>새 택배 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label className="form-label">운송장 번호</label>
            <input
              ref={trackingNumberRef}
              type="text"
              className="form-control"
              name="tracking_number"
              value={newParcel.tracking_number || ''}
              onChange={handleNewParcelChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">보내는 사람</label>
            <input
              ref={senderNameRef}
              type="text"
              className="form-control"
              name="sender_name"
              value={newParcel.sender_name || ''}
              onChange={handleNewParcelChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">받는 사람</label>
            <input
              ref={recipientNameRef}
              type="text"
              className="form-control"
              name="recipient_name"
              value={newParcel.recipient_name || ''}
              onChange={handleNewParcelChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">주소</label>
            <input
              ref={recipientAddressRef}
              type="text"
              className="form-control"
              name="recipient_address"
              value={newParcel.recipient_address || ''}
              onChange={handleNewParcelChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">상태</label>
            <select
              ref={statusRef}
              className="form-select"
              name="status"
              value={newParcel.status || ''}
              onChange={handleNewParcelChange}
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
              value={newParcel.cost}
              onChange={handleNewParcelChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="danger" onClick={handleAddParcel}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddModal;
