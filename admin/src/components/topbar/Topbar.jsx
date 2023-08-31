import React from 'react'
import {NotificationsNone,Language,Settings }from '@mui/icons-material';
import './Topbar.css'
const Topbar = () => {
  return (
      <div className='topbar'>
          <div className="topbarWrapper">
              <div className="topLeft">
                  <span className="logo">CampusOlx Admin</span>
              </div>
              <div className="topRight">
                  <div className="topbarIconContainer">
                      <NotificationsNone />
                      <span className="topbarIconBadge">2</span>
                  </div>
                  <div className="topbarIconContainer">
                      <Language />
                  </div>
                  <div className="topbarIconContainer">
                      <Settings />
                  </div>
                  <img src="https://qph.cf2.quoracdn.net/main-qimg-403dc7cef6c283c3c501392129315ebe-lq" alt="" className="topAvatar" />
              </div>
          </div>
      </div>
  )
}

export default Topbar