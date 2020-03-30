import React from "react";
import webShare from 'react-web-share-api';

const FlashingButtonShare = ({ share, isSupported }) => isSupported
    ? <button onClick={share}>Share now!</button>
    : <span style={{ fontSize: '8px', paddingRight: '2px', paddingLeft: '2px' }}>Web Share not supported</span>;

export default webShare()(FlashingButtonShare);