import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadService from "../service/file-upload.service";


export default class UploadImages extends Component {



  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      currentFile: undefined,
      //  previewImage: undefined,
      progress: 0,
      message: "",

      imageInfos: [],
    };
  }

  // componentDidMount() {
  //   UploadService.getFiles().then((response) => {
  //     this.setState({
  //       imageInfos: response.data,
  //     });
  //   });
  // }

  selectFile(event) {
    this.setState({
      currentFile: event.target.files[0],
      // previewImage: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      message: ""
    });
  }

  upload() {
    this.setState({
      progress: 0,
    });

    UploadService.upload(
      this.state.currentFile, (event) => {
        this.setState({
          progress: Math.round((100 * event.loaded) / event.total),
        });
      }
    )
      .then((response) => {
        console.log("image response"+response.data)
        this.setState({
          message: response.data,
        });
        this.navigate("/farmer/farmerHome")
        // return UploadService.getFiles();
      })
      // .then((files) => {
      //   console.log("tushar"+files.data)
      //   this.setState({
      //     imageInfos: files.data,
      //   });
      // })
      .catch((err) => {
        this.setState({
          progress: 0,
          message: "Could not upload the image!",
          currentFile: undefined,
        });
      });
  }

  render() {
    const {
      currentFile,
      // previewImage,
      progress,
      message,
      imageInfos,
    } = this.state;

    return (
      <div style={{backgroundColor: "#e2f2e6"}}>
        <div className="row">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input type="file" accept="image/*" onChange={this.selectFile} />
            </label>
          </div>

          <div className="col-4">
            <button
              className="btn btn-success btn-sm"
              disabled={!currentFile}
              onClick={this.upload}
            >
              Upload
            </button>
            
            <Link style={{marginLeft: "10px"}} className="btn btn-success btn-sm" to="/farmer/farmerHome">Go To Homepage</Link>

          </div>
        </div>

        {currentFile && (
          <div className="progress my-3">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        {/* {previewImage && (
          <div>
            <img className="preview" src={previewImage} alt="" />
          </div>
        )} */}

        {message && (
          <div className="alert alert-secondary mt-3" role="alert">
            {message}
          </div>
        )}

        <div className="card mt-3">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {imageInfos &&
              imageInfos.map((img, index) => (
                <li className="list-group-item" key={index}>
                  {/* <a href={img.url}>{img.name}</a> */}
                  {/* <img src={img.url} alt="" width="40" height="40"/> */
                    <img
                      className="img-thumbnail rounded-circle mx-auto mb-2 shadow-sm"
                      src={img.url}
                      alt={img.name}
                      style={{ width: "100px", height: "100px" }}
                    />}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
