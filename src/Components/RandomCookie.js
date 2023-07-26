import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RandomCookie = () =>{
    
    const getRandomDisplayTime = () => {
        const minDisplayTime = 5000;
        const maxDisplayTime = 15000;
        return Math.random() * (maxDisplayTime - minDisplayTime) + minDisplayTime;
    }
    

    return (
        <div>🍪</div>
    )
}
export default RandomCookie;