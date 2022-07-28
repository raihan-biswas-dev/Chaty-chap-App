import React from 'react'
import { TextField } from '@mui/material';
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';

export default function Search() {
    return (
        <div className='search'>
            <input type="text" placeholder='Search' />
            <div className="searchIcon">
                <BsSearch />
            </div>
            <div className="ThreeDotsVertical">
                <BsThreeDotsVertical />
            </div>
        </div>
    )
}
