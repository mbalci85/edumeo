import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import ReactPlayer from "react-player";
import "./SinglePost.css";

Modal.setAppElement("#root");

const SinglePost = ({ post }) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    let mounted = true;
    axios
      .get(`http://localhost:5000/users/${post.userId}`)
      .then((res) => {
        if (mounted) {
          return setName(res.data.fullName);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => (mounted = false);
  }, [post.userId]);

  return (
    <div className="home-page-single-post-container">
      <h3 className="home-page-post-title">{post.title}</h3>
      <h5>Author: {name}</h5>

      <br />

      {post.body.split(" ").length > 50 ? (
        <p className="home-page-post-body">
          {post.body.split(" ").slice(0, 49).join(" ")}...{" "}
          <small>
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                setIsPostModalOpen(true);
              }}
            >
              continue reading &gt;
            </a>
          </small>
        </p>
      ) : (
        <p className="home-page-post-body">{post.body}</p>
      )}

      <br />

      {post.imageUrls.length > 5 ? (
        <>
          <div div className="home-page-post-images-container ">
            {post.imageUrls.slice(0, 5).map((imageUrl, index) => (
              <img
                src={imageUrl}
                alt="pic"
                key={index}
                className="home-page-post-image"
              />
            ))}
          </div>
          <div style={{textAlign:'center'}}>
            <small>
              <a
                href="/#"
                onClick={(e) => {
                  setIsPostModalOpen(true);
                  e.preventDefault();
                }}
              >
                Click here
              </a>{" "}
              to see all images{" "}
            </small>
          </div>
        </>
      ) : (
        <div className="home-page-post-images-container ">
          {post.imageUrls.map((imageUrl, index) => (
            <img
              src={imageUrl}
              alt="pic"
              key={index}
              className="home-page-post-image"
            />
          ))}
        </div>
      )}

      <br />

      {post.videoUrl.length !== 0 ? (
        <div className="home-page-post-video-container">
          <ReactPlayer
            controls
            url={post.videoUrl[0]}
            height="280px"
            width="500px"
          />
        </div>
      ) : null}

	  <hr/>
	  <br/>

      <Modal
        isOpen={isPostModalOpen}
        onRequestClose={() => setIsPostModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: "#f5f5f5",
          },
          content: {
            width: "60%",
            height: "75%",
            margin: "auto",
            padding: "30px 50px",
            lineHeight: "1.6",
            textAlign: "justify",
          },
        }}
      >
        <h3 className="home-page-post-modal-title">{post.title}</h3>
        <p>{post.body}</p>

        <br />

        <h5>Author: {name}</h5>
        <div className="home-page-post-modal-images-container">
          {post.imageUrls.map((imageUrl, index) => (
            <img
              src={imageUrl}
              alt="pic"
              key={index}
              className="home-page-post-modal-single-image"
            />
          ))}
        </div>

        <div className="home-page-post-modal-go-back-btn-container">
          <button
            className="home-page-post-modal-go-back-btn"
            onClick={() => setIsPostModalOpen(false)}
          >
            Go Back
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SinglePost;
