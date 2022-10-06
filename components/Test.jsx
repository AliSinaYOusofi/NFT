import  { useState } from 'react'
import {MdExplore, MdDarkMode} from 'react-icons/md'
import {
    BiStats, 
    BiMessageSquareDetail, 
    BsDiscord, BsReddit, 
    BsYoutube,
    BsLightbulbOff,
    BsLightbulb
} 
from 'react-icons/bi';
import {
    AiFillTwitterCircle,
} from 'react-icons/ai';
import { SiTiktok } from 'react-icons/si';

export default function Test() {
    const [theme, setTheme] = useState(true);

    return (
        <h1> {theme ? <MdDarkMode /> : ""}</h1>
    );
}
