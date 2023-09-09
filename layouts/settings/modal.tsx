import { useState } from "react";

const Modal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <style jsx>{`
        .modal-bg {
          background-color: #848a97;
        }

        .modal-box {
          width: 100%;
          height: 100%;
          background-color: #ffffeb;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
      <div className="w-full min-h-screen flex justify-center items-center bg-black">
        <p
          id="modal-switch"
          className="text-[10vw] bg-gradient-to-r from-indigo-500 via-purple-500 text-transparent bg-clip-text to-pink-500 font-bold cursor-pointer"
          onClick={openModal}
        >
          Click Me
        </p>
      </div>
      {modalVisible && (
        <div className="w-full h-full">
          <div id="modal-bg" className="w-full h-full bg-[#848A97] top-0 absolute" onClick={closeModal}></div>
          <div
            id="modal-box"
            className="sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[50vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 bg-[#FFFFEB] rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#059669] mx-auto h-11 rounded-full bg-[#D1FAE5] w-11"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-2xl font-medium">Payment Successful</span>
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, consequatur?
            </p>
            <button id="modal-close" className="p-3 bg-[#4F46E5] rounded-lg w-full text-white" onClick={closeModal}>
              Click Background
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
