import React from 'react'
import { Icon } from '@iconify/react';
import linkedinIcon from '@iconify-icons/cib/linkedin';
import githubFilled from '@iconify-icons/ant-design/github-filled';
import websiteIcon from '@iconify-icons/gg/website';
import angellistIcon from '@iconify-icons/cib/angellist';
import danielphoto from '../danielphoto.jpg'
const About = () => {


    return (
        <div>
            <img src={danielphoto} alt="Daniel" />
            <p>Daniel a software engineer based in New York City with experience in Javascript, React.js, Redux, Python, Flask, Django, Express, and Sequelize. I'm passionate about problem-solving, debugging, and coding applications. I'm always looking to grow my skillset and learn new languages, frameworks, and concepts.</p>
            <a href="https://danielford.dev/"><Icon icon={websiteIcon} /></a>
            <a href="https://www.linkedin.com/in/daniel-ford-29970a5a/"><Icon icon={linkedinIcon} /></a>
            <a href="https://github.com/theuncoolgirl/aaBlueJay"><Icon icon={githubFilled} /></a>
            <a href="https://angel.co/u/daniel-ford-14"><Icon icon={angellistIcon} /></a>
        </div>
    )
}

export default About
