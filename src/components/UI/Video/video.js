import React from 'react'

class VideoOutput extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const videoObj = this.videoRef.current;
        videoObj.srcObject = this.props.video;
        console.log(videoObj);
    }

    render() {
        return <video ref={this.videoRef}></video>;
    }
}