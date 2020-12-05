import React from 'react'
import { Icon } from '@iconify/react';
import linkedinIcon from '@iconify-icons/cib/linkedin';
import githubFilled from '@iconify-icons/ant-design/github-filled';
import websiteIcon from '@iconify-icons/gg/website';
import angellistIcon from '@iconify-icons/cib/angellist';
import danielphoto from '../danielphoto.jpg'
import quynnphoto from '../quynnphoto.jpg'
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
        <div>
        <img src={quynnphoto} alt="Daniel" />
            <p>Hi my name is Quynn Smith. I am a Full Stack Software Engineer residing in Tampa, Florida striving to learn and experience everything tech. I have exposure in developing web applications harnessing React, Redux, Express, Python, Flask, and Postgresql. I also have a background in chemistry and Pharmacy. Happy Hacking!</p>
            <a href="http://www.quynnsmith.com"><Icon icon={websiteIcon} /></a>
            <a href="https://www.linkedin.com/in/quynn-smith-a442671bb/"><Icon icon={linkedinIcon} /></a>
            <a href="https://github.com/qsmity"><Icon icon={githubFilled} /></a>
            <a href="https://angel.co/u/quynn-smith"><Icon icon={angellistIcon} /></a>
        </div>
    )
}

export default About
