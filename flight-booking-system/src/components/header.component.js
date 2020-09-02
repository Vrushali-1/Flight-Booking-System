import React,{Component} from 'react';
import styled from 'styled-components';
import img from "../images/FlightsL.jpg";
import img2 from "../images/girl.jpg"
class Header extends Component{

    
    render(){
        return(
            <MainContainer>
                <h3>Fly High Airlines</h3>
                <h5>Because it's the journey that makes the destination beautiful..</h5>
                <img style={{width:'100px'}} src={img2} alt="air hostess"/>
            </MainContainer>  
        );
    }
}

export default Header;

const MainContainer=styled.header` 
background:url(${img}) no-repeat center/cover;
height:15rem;

h5{
    font-family:'Sacramento',cursive;
    font-weight:450;
    color:#191970;
    font-size:21px;
}
h3{
    font-family:'Paytone One', sans-serif;
    color:#191970;
    font-weight:400;
    font-size:41px;
    text-align:left;

}
`;