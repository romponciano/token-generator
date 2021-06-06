import React, { useState } from 'react'
import styled from 'styled-components'

const Navbar: React.FC<{ 
    session: ISession, 
    setSession: (session: ISession | undefined) => Promise<void> }> = 
    ({session, setSession}) => {

    const [display, setDisplay] = useState('none')
    
    const openProfileMenu = () => {
        setDisplay(display == 'none' ? 'inherit' : 'none')
    }

    const DropdownMenu = styled.div`
        display: ${display};
        left: -130px;

        i {
            margin-right: 10px;
        }
    `

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="collapse navbar-collapse mx-4 w-100 d-inline">
                <a className="navbar-brand" href="/">Token Generator</a>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/tokens">Tokens</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="/team">Team</a>
                    </li>
                </ul>
                <RightDiv>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                    <ProfileIcon className="dropdown">
                        <i className="fas fa-user fa-2x" onClick={() => openProfileMenu()} />
                        <DropdownMenu className="dropdown-menu">
                            <a className="dropdown-item" href="/profile-settings">
                                <i className="fas fa-tools" />Settings
                            </a>
                            <a className="dropdown-item" href="/" onClick={() => setSession(undefined)}>
                                <i className="fas fa-sign-out-alt" />Logout
                            </a>
                        </DropdownMenu>
                    </ProfileIcon>
                </RightDiv>
            </div>
        </nav>
    )
}

export default Navbar

const RightDiv = styled.div`
    margin-left: auto;
    display: inherit;
`

const ProfileIcon = styled.div`
    color: white;
    margin-left: 20px;
`
