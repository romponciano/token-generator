import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ActionIcon from '../../components/action-icon'
import Modal from '../../components/modal'
import ProfileSettings from '../profile-settings/settings'

const Navbar: React.FC<{ 
    session: ISession, 
    setSession: (session: ISession | undefined) => Promise<void> 
}> = ({session, setSession}) => {

    const [showSettings, setShowSettings] = useState<boolean>(false)
    
    const toggleDropdown = (close: boolean = false) => {
        const element = document.getElementById('userOptionsDropdown')
        if(close || element.style.display == 'inherit') {
            element.style.display = 'none'
            document.removeEventListener('click', (evt) => autoCloseDropdown(evt))
        } else {
            element.style.display = 'inherit'
            document.addEventListener('click', (evt) => autoCloseDropdown(evt))
        }
    }

    const autoCloseDropdown = (evt: MouseEvent): void => {
        const element = document.getElementById('userOptionsDropdown')
        const iconElement = document.getElementsByClassName('fas fa-user fa-2x')[0]
        if(evt.target != element && evt.target != iconElement) toggleDropdown(true)
    }

    useEffect(() => {
        return document.removeEventListener('click', (evt) => autoCloseDropdown(evt))
    }, [])

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
                        <ActionIcon className="fas fa-user fa-2x" onClick={() => toggleDropdown()} />
                        <DropdownMenu id="userOptionsDropdown" className="dropdown-menu">
                            <div className="dropdown-item" onClick={() => {
                                setShowSettings(true)
                                toggleDropdown(true)
                            }}>
                                <i className="fas fa-tools" />Settings
                            </div>
                            <a className="dropdown-item" href="/" onClick={() => setSession(undefined)}>
                                <i className="fas fa-sign-out-alt" />Logout
                            </a>
                        </DropdownMenu>
                    </ProfileIcon>
                </RightDiv>
            </div>

            <Modal 
                show={showSettings}
                setShow={setShowSettings}
                title={<h5>Profile Settings</h5>}
                body={<ProfileSettings session={session} setSession={setSession} />}
            />
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

const DropdownMenu = styled.div`
    display: none;
    left: -130px;
    cursor: pointer;

    i {
        margin-right: 10px;
    }
`
