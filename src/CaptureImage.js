import React, { Component } from 'react'
import Webcam from 'react-webcam'
// import { connect } from 'react-redux'

class CaptureImage extends Component {
    state = {
        imageData: null,
        image_name: '',
        saveImage: false
    }

    setRef = (webcam) => {
        this.webcam = webcam
    }

    capture = () => {
        const imageSrc = this.webcam.getScreenshot()
        console.log(imageSrc);
        
        this.setState({
            imageData: imageSrc
        })
    }

    onRetake = e => {
        e.persist()

        this.setState({
            imageData: null
        })
    }

    onSave = e => {
        e.persist()

        this.setState(prevState => {
            return {
                ...prevState,
                saveImage: !prevState.saveImage
            }
        })
    }

    handleChange = e => {
        e.persist()

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        let imageObject = {
            image_name: this.state.image_name,
            job_id: this.state.job_id,
            image_data: this.state.imageData
        }

        console.log(imageObject);
    }
    
    saveForm = () => {
        return (
            <div>
                <form onSubmit={this.handelSubmit}>
                    <p>
                        <label for="">Image Name :</label>
                        <input
                            type="text"
                            name="image_name"
                            value={this.state.image_name}
                            onChange={this.handleChange}    
                        />
    
                        <input type="submit" value="Save" />
                    </p>
                </form>
            </div>
        )
    }

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: 'user'
        }

        return (
            <div>
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                />

                <div>
                    <button onClick={this.capture}>Capture Photo</button>
                </div>

                <div>
                    <p><img src={this.state.imageData} alt="" /></p>
                    <span><button onClick={this.onRetake}>Retake</button></span>
                    <span><button onClick={this.onSave}>Save</button></span>
                    
                    {this.state.saveImage ? this.saveForm() : null}
                </div>
            </div>
        )
    }
}


export default CaptureImage
