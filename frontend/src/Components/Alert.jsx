// import React from "react";
// import Classes from "../Styles/Alert.module.css";

// const Alert = ({ message, onClose }) => {
//   return (
//     <div className={Classes.alertContainer}>
//       <div className={Classes.alertBox}>
//         <p className={Classes.alertMessage}>{message}</p>
//         <button className={Classes.alertButton} onClick={onClose}>
//           Okay!
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Alert;

import React from "react";
import Classes from "../Styles/Alert.module.css";

const Alert = ({ message, onClose, onConfirm }) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className={Classes.alertContainer}>
      <div className={Classes.alertBox}>
        <p className={Classes.alertMessage}>{message}</p>
        <div className={Classes.buttonContainer}>
          <button className={Classes.alertButton} onClick={handleConfirm}>
            Okay!
          </button>
          <button className={Classes.cancelButton} onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;