import react, { FC, useEffect, useState } from 'react';
import Modal from './Modal';
import styled from '@emotion/styled';

type character = {
    id: number,
    name: string,
    image:string,
    status:string,
    species:string,
    type:string,
    gender:string,
}

interface InfoModalProps{
    isModalVisible:boolean;
    onBackdropClick: () => void;
    personaje: character;
}

const InfoModal: React.FC<InfoModalProps> = ({onBackdropClick,isModalVisible,personaje}) => {
    if(!isModalVisible){
        return null
    }

    return(<Modal>
        <DesktopModalContainer>
        <Info>
            <Info1>
                <img src={personaje.image}></img>
                <br/>
                {personaje.name}
            </Info1>
            <Info2>
                <div>INFORMATION:</div>
                <div>Status: {personaje.status}</div>
                <div>Species: {personaje.species}</div>
                <div>Type: {personaje.type}</div>  
                <div>Gender: {personaje.gender}</div>
            </Info2>
            <Button onClick={onBackdropClick} >x</Button>
        </Info>
        </DesktopModalContainer>
    </Modal>

    )
}

const Button = styled.button`
    margin: 2%; 
    height: 5%;
    width: 10%;
    text-align: center;
    background-color: darkred;
    color: white;
    font-weight:bolder;
    font-family: 'Courier New', Courier, monospace;
    overflow: hidden;
`

const Info = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;

`
const Info1 = styled.div`
    width: auto;
    height: auto;
    margin: 1rem;
    font-weight:bolder;
    font-family: 'Courier New', Courier, monospace;
    color: white;
    text-align: center;
`

const Info2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: auto;
    height: auto;
    margin: 1rem;
    font-weight:bolder;
    font-family: 'Courier New', Courier, monospace;
    color: white;
`

const ModalContainer = styled.div`
    background-color:grey;
    display:flex;
    flex-direction: column;
    align-items:center;
    position:relative;
`

export const DesktopModalContainer = styled(ModalContainer)`
    border-radius:7px;
    box-shadow: 0 0 32px rgba(0,0,0,0.5);
    padding:40px;
    width:50%;
    font-size:20px
`
export default InfoModal;