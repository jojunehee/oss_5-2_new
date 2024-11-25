import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import Header from './components/Header';
import ParcelList from './components/ParcelList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailPage from './components/DetailPage';
import EditPage from './components/EditPage';

function App() {
  //필요한 상태 변수, 함수 선언부------------------------------------------------------------
  const [parcels, setParcels] = useState([]);
  // 택배 정보를 저장하는 상태 변수. 서버에서 데이터 전체를 다! 다! 가져와서 저장.
  const [currentParcel, setCurrentParcel] = useState(null);
  // 수정 중인 택배 데이터를 임시로 저장하는 상태 변수.
  const [showModal, setShowModal] = useState(false);
  // "수정 모달"이 열려 있는지 여부를 구별하는 상태 변수. true면 열림.

  const [showAddModal, setShowAddModal] = useState(false);
  // "추가 모달"이 열려 있는지 여부를 관리하는 상태 변수. true면 열림.
  // 초기값은 false이며, 추가 버튼을 클릭하면 true로 변경되어 모달이 열림.

  const [newParcel, setNewParcel] = useState({
    tracking_number: '',  // 새로 추가할 운송장 번호
    sender_name: '',      // 새로 추가할 보내는 사람 이름
    recipient_name: '',   // 새로 추가할 받는 사람 이름
    recipient_address: '',// 새로 추가할 받는 사람 주소
    status: '배송 준비',           // 새로 추가할 상태 (배송 준비, 배송 중 등)
    cost: ''              // 새로 추가할 배송 비용
  });
  // "추가 모달"에서 입력받은 데이터를 저장하는 상태 변수

  // 데이터 가져오기. 두고두고 쓸 것.
  const fetchParcels = async () => {
    const response = await axios.get('https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels');
    setParcels(response.data);
  };
  // 맨 처음에 데이터 가져오기.(최초 한번만 동작)
  useEffect(() => {
    fetchParcels();
  }, []);

  // 모달 열기/닫기
  const handleShowModal = (parcel) => {
    setCurrentParcel({ ...parcel });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  //모달 매 입력에 반응하여 업데이트
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentParcel({ ...currentParcel, [name]: value });
  };

  // 수정 서버에 저장
  const saveChanges = async () => {
    await axios.put(
      `https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels/${currentParcel.id}`,
      currentParcel
    );
    fetchParcels();
    setShowModal(false);//모달 닫기
  };

  // 새 데이터 추가 입력 값 관리
  const handleNewParcelChange = (e) => {
    const { name, value } = e.target;
    setNewParcel({ ...newParcel, [name]: value });
  };

  // 새 데이터 추가
  const addParcel = async () => {
    await axios.post('https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels', newParcel);
    fetchParcels();
    setNewParcel({
      tracking_number: '',
      sender_name: '',
      recipient_name: '',
      recipient_address: '',
      status: '',
      cost: ''
    });

    setShowAddModal(false);
  };

  // 데이터 삭제
  const deleteParcel = async (id) => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      await axios.delete(`https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels/${id}`);
      fetchParcels();
    }
  };
  //------------------------------------------------------------필요한 상태 변수, 함수 선언부
  return (
    <Router> {/* Router 내용물을 모두 감싼다. */}
      <div className="container">
        <Header handleShowAddModal={handleShowAddModal} />

        {/* 라우트 설정 : 홈, 수정 페이지, 세부 정보 페이지 */}
        <Routes>
          <Route
            path="/"
            element={
              <ParcelList parcels={parcels} handleShowModal={handleShowModal} deleteParcel={deleteParcel} />
            }
          /> 
          <Route path="/update/:id" element={<EditPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>

        {/* 수정 모달 - 이제 사용 안함*/}
        {currentParcel && (
          <EditModal
            show={showModal}
            handleClose={handleCloseModal}
            handleInputChange={handleInputChange}
            saveChanges={saveChanges}
            currentParcel={currentParcel}
          />
        )}

        {/* 추가 모달 */}
        <AddModal
          show={showAddModal}
          handleClose={handleCloseAddModal}
          handleNewParcelChange={handleNewParcelChange}
          addParcel={addParcel}
          newParcel={newParcel}
        />
        <footer className="text-center mt-4">
          <div className="footer-content">
            <p>문의: chojun1108@handong.ac.kr | 전화: 02-345-6789 | <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></p>
            <p>© 2024 Parcel Management System.</p>
            <p>Developed by ChoJunehee and Team</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
