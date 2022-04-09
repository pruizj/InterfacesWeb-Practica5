import react, { FC, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { AnyRecord } from 'dns';
import styled from '@emotion/styled';
import InfoModal from './InfoModal';

type characters = {
    characters: {
        results: Array< character>
    }
}

type charAndPages = {
    characters: {

        info: {pages:number};
        results: Array< character>
    }
}

type character = {
    id: number,
    name: string,
    image:string,
    status:string,
    species:string,
    type:string,
    gender:string,
}

const GET_CHARACTERS = gql`
    query characters {
        characters {
            results{
                name
            }
        }
    }
`;


const GET_PAGE = gql`
    query characters($var: Int) {
        characters(page: $var) {
   		 info{
    		  pages
   		 }
            results{
                id,
                name,
                image,
                status,
                species,
                type,
                gender
            }
        }
    }
    
`;

const Container: FC = () => {

   const p:character = {
        id: -1,
        name: "",
        image:"",
        status:"",
        species:"",
        type:"",
        gender:"",
   }

   const [pagina, setPagina] = useState <number> (1);
   const [ultima,setUltima]=useState<any>();
   const [isModalVisible,setIsModalVisible] = useState(false);
   const [personajeInfo, setPersonajeInfo] = useState<character>(p);
   
   //Visualización modal
   const toggleModal = () =>{
       setIsModalVisible(isModalVisible =>!isModalVisible);
   }

   const Infopersonaje = (personaje:character) =>{
        setPersonajeInfo(personaje);
        setIsModalVisible(isModalVisible =>!isModalVisible);
   }

    const { data, loading, error, refetch } = useQuery<charAndPages>(GET_PAGE, {
        variables: {
            var: pagina
        },
    });

    useEffect(()=>{
        setUltima(data?.characters.info.pages);
    },[data])

    if (loading) {
        return <div>Cargando....</div>
    }
    if (error) {
        return <div>Oh no, ERROR :(</div>
    }

    return (
        <Contenedor>

            <Buttons className='paginacion'>
                {pagina !== 1 && <Button type="button" onClick={()=> setPagina(pagina-1)}> &lt;</Button>}
                <Button type="button" onClick={()=> setPagina(1)}> {1}...</Button>
                {pagina !== 1 && <Button type="button" onClick={()=> setPagina(pagina-1)}> {pagina-1}</Button>}
                <Button type="button" onClick={()=> setPagina(pagina)}> {pagina}</Button>
                {pagina !== ultima && <Button type="button" onClick={()=> setPagina(pagina+1)}> {pagina+1}</Button>}
                <Button type="button" onClick={()=> setPagina(ultima)}>...{ultima} </Button>
                {pagina !== ultima && <Button type="button"  onClick={()=> setPagina(pagina+1)}> &gt;</Button>}
            </Buttons>

            <Personajes>
                {data?.characters.results.map((c:any) => (
                    <Personaje key={c.id} onClick = {()=>{Infopersonaje(c)}}>
                        <img src={c.image}></img>
                        <br/>
                        {c.name}
                    </Personaje>       
                ))}
            </Personajes>
            
            <InfoModal isModalVisible = {isModalVisible} onBackdropClick = {toggleModal} personaje = {personajeInfo}></InfoModal>

        </Contenedor>
    );

}

const Contenedor = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    
`
const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`

const Button = styled.button`
    margin: 2%; 
    height: 5%;
    width: 15%;
    text-align: center;
    background-color: lightgray;
    color: black;
    font-weight:bolder;
    font-family: 'Courier New', Courier, monospace;
    overflow: hidden;
`

const Personajes = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`

const Personaje = styled.div`
    width: auto;
    height: auto;
    margin: 1rem;
    font-weight:bolder;
    font-family: 'Courier New', Courier, monospace;
    color: black;
    text-align: center;
`

export default Container;