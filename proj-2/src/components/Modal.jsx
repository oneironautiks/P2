import React from 'react';

// class Modal extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { isModalOpen: false }
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={() => this.openModal()}>Open modal</button>
//         <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
//           <h1>Modal title</h1>
//           <p>hello</p>
//           <p><button onClick={() => this.closeModal()}>Close</button></p>
//         </Modal>
//       </div>
//     )
//   }

//   openModal() {
//     this.setState({ isModalOpen: true })
//   }

//   closeModal() {
//     this.setState({ isModalOpen: false })
//   }
// }


// const Modal = (props) => {

//   const close = (e) => {
//     e.preventDefault();
//     if (props.onClose) {
//       return props.onClose();
//     }
//   };
//   if (props.isOpen === false) {
//     return null
//   }
//   else {
//     return (
//       // <div>
//       //   <div>{props.children}</div>
//       //   <div onClick={e => close(e)}></div>
//       // </div>

//       <div className={props.containerClassName}>
//         <div className={props.className}>
//           {props.children}
//         </div>
//         {!props.noBackdrop &&
//           <div className={props.backdropClassName}
//             onClick={e => close(e)} />}
//       </div>
//     )
//   }
// }

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        {children}
        {/* <a href="javascript:;" className="modal-close" onClick={handleClose}>
          close
        </a> */}
        <p><button className="modal-close" onClick={handleClose}>Close</button></p>
      </div>
    </div>
  );
};


export default Modal;