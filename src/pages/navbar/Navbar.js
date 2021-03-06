import React, {useContext, useState, useEffect, useRef} from 'react'

import {UsersStore} from "../../contexts/UserContext";
import {GistsStore} from "../../contexts/GistContext";
import logo from '../../assets/images/logo.png'
import profile from '../../assets/images/pro-image.jpg'
import InputField from "../../components/InputField";
import ButtonWIthIcon from "../../components/ButtonWIthIcon";
import ProfileLogo from "../../components/ProfileLogo"
import {Link} from "react-router-dom";
import styled from "styled-components";
import {isAuthenticated} from "../../utils";

const StyledDiv = styled.div`
    
    font-size: 25px;
    font-weight: 500;
    display: grid;
    width: 40%;
    color: #ffffff;
    gap: 20px;
    grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr;
    grid-template-areas: "E M U M B A";
`;

export const Navbar = () => {
    const textInput = useRef();
    const focusTextInput = () => textInput.current.focus();
    const {userDispatch} = useContext(UsersStore);

    const globalGist = useContext(GistsStore)
    const {dispatch} = globalGist;
    const [search, setSearch] = useState('');



    useEffect(()=> {
        userDispatch({type:'Current_User'})
    }, [userDispatch])


    const handleSearch = (e)=> {
        e.preventDefault();
        dispatch({type: 'SEARCH_GISTS', payload: {search: search}})
    }

    const handleLogin = (e)=> {
        e.preventDefault()
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=01b5f613e35062481297';
    }

    const handleLogout = (e) => {
        e.preventDefault();

        userDispatch({type: 'Logout'})
    }

    return (


        <nav onClick={focusTextInput}  className="navbar justify-content-between" style= {{'background': '#5acba1'}}>
            <div className={"container"}>
                <div className="navbar-brand">

                    <StyledDiv>
                        <div>
                            <Link to={"/"}>
                                <img src={logo} width="30" height="30"  alt=""/>
                            </Link>
                        </div>
                        <div>M</div>
                        <div>U</div>
                        <div>M</div>
                        <div>B</div>
                        <div>A</div>
                    </StyledDiv>

                </div>


                <form  className="form-inline" id="navbarNav">

                    <InputField
                        ref = {textInput}
                        type={"Search"}
                        placeholder={"Search"}
                        handleChange = {(e) => setSearch(e.target.value)}
                    />

                    <ButtonWIthIcon icon = {"fa fa-search"} handleClick = {handleSearch} />

                    {
                        !isAuthenticated().login && (


                            <ButtonWIthIcon
                                text={"Login"}
                                color={"blue"}
                                font={"small"}
                                background={"white"}
                                handleClick={handleLogin}
                            />
                        )
                    }

                    {
                        isAuthenticated().login && (
                            <div className="dropdown">
                                <Link

                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false" to={``}>
                                    <ProfileLogo src={profile}  />
                                </Link>

                                <div className="dropdown-menu dropdown-menu-right mt-2" aria-labelledby="dropdownMenuButton">

                                    <Link className="dropdown-item" to={`/user/${isAuthenticated().id}`} style={{'fontSize': 'small'}} >Signed in as <br/> {isAuthenticated().name}  </Link>

                                    <hr/>
                                    <a className="dropdown-item" href={`/user/${isAuthenticated().id}`}><span style={{'fontSize': 'small'}}>Your gists</span></a>
                                    <a className="dropdown-item" href={`/user/${isAuthenticated().id}`}><span style={{'fontSize': 'small'}}>Help</span></a>

                                    <button
                                        className="dropdown-item"
                                        onClick={handleLogout}
                                    >
                                        <span>Signout</span>
                                    </button>
                                </div>

                            </div>
                        )
                    }

                </form>
            </div>




        </nav>

    )
}