import React from 'react'
import { useOutletContext } from 'react-router-dom'
import ConsoVolantTemplate from '../ConsoVolantTemplate';


const ConsoTests = () => {
    const {saison} = useOutletContext();
    return <ConsoVolantTemplate saison={saison} volantDefault={false}/>
}

export default ConsoTests