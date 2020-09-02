import React, { Component } from 'react';
import styled from 'styled-components';

export class Footer extends Component {
    render() {
        return (
            <FooterContainer>
                <span style={{color:"white",top:"1.5rem",left:"1rem" ,position:"relative"}}>
                    &copy;{new Date().getFullYear()} All Rights Reserved. Fly High.
                </span>
            </FooterContainer>
                
            
        )
    }
}

export default Footer;

const FooterContainer=styled.footer`
background:#7B68EE;
position:fixed;
height:4rem;
left:0;
bottom:0;
width:100%;
`;
