import react, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';


const Modal: React.FC = ({children})=>{
    return ReactDOM.createPortal(<Overlay>
        {children}
    </Overlay>, document.getElementById('modal-root')!);
}

const Overlay = styled.div`
    background-color: rgba(0,0,0,0.5);
    position:fixed;
    height:100%;
    width:100%;
    top:0;
    left:0;
    display:flex;
    align-items: center;
    justify-content:center;
`
export default Modal;