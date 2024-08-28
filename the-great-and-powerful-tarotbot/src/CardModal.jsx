import React, { useEffect, useRef } from "react";


function CardModal({ openModal, closeModal,  children }) {
    const ref = useRef();


    useEffect(() => {
        if (openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal]);

    return (
        <>
        <dialog
            ref={ref}
            onCancel={closeModal}
            className="description-modal"
        >
        {children}
            <br/>
            <button 
                onClick={closeModal}
                className="close-button"
            >
                Close
            </button>
        </dialog>
        </>
    )
}

export default CardModal;