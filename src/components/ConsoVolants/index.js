import React from 'react'
import { useOutletContext } from 'react-router-dom'
import ConsoVolantTemplate from '../ConsoVolantTemplate';


const ConsoVolants = () => {
    const {saison} = useOutletContext();
    return <ConsoVolantTemplate saison={saison} volantDefault={true}/>
}

export default ConsoVolants