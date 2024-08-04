import React, { useEffect, useRef, useState } from "react";
import { Children } from "react";

function CardModal({ openModal, closeModal, children, delay}) {
    const ref = useRef();

    // Handles the typing animation.
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);


    // Using setTimeout to animate text on card flip
    useEffect(()=> {
        if (currentIndex < children.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + children[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, children]);


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
            {currentText}
            <br/>
            <button onClick={closeModal}>
                Close
            </button>
        </dialog>
        </>
    )
}

export default CardModal;