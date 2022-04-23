import { ChangeEventHandler, useEffect, useState } from "react";
import styles from "./Modal.module.css";
import SimpleImageSlider from "react-simple-image-slider";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/store";
import { deletePost, fetchPost } from "../../redux/actions/postsActions";
import { Comments } from "./Comments";
import { petsFetch } from "../../services/helpers";
import { useNavigate } from "react-router-dom";
import { stringify } from "querystring";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Modal = () => {
  const navigate = useNavigate();

  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state: IState) => state.postsReducer.post);
  const comments = useSelector(
    (state: IState) => state.postsReducer.post.comments
  );
  const id = useSelector((state: IState) => state.authReducer.id);
  const images = useSelector((state: IState) => state.postsReducer.post.images);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId));
    }
    document.body.classList.add("modalShow");
    return () => {
      dispatch(deletePost());
    };
  }, []);

  function onDismiss() {
    navigate(-1);
    document.body.classList.remove("modalShow");
  }

  const [textComment, setTextComment] = useState<string>("");
  const post_id = Number(postId);
  const addComment = () => {
    if (id !== 0) {
      
      if (textComment !== "") {
        petsFetch("https://api2.adoptpets.click/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: textComment, owner_id: id, post_id }),
        }).then(() => {
          setTextComment("");
           if (postId) {
             dispatch(fetchPost(postId));
           }
        });
      }
    } else {
      alert("Login, please");
      setTextComment("");
    }
  };

  const like = (id: string) => {
    petsFetch(`https://api2.adoptpets.click/posts/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then(() => {
    
      if (postId) {
        dispatch(fetchPost(postId));
      }
    });
  };

  const likeDelete = (id: string) => {
    petsFetch(`https://api2.adoptpets.click/posts/${id}/like`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then(() => {
      if (postId) {
        dispatch(fetchPost(postId));
      }
    });
  };

  const deleteComment = (id: string) => {
    petsFetch(`https://api2.adoptpets.click/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then(() => {
     
      if (postId) {
        dispatch(fetchPost(postId));
      }
    });
  };
  const settings = {
    dots: true,
    adaptiveHeight: true,
    variableWidth: true,
  };

  const sliders = () => {
    return post.images.map((data) => {
      return (
        <div key={data} className={styles.slickSlide}>
          <img alt="image" src={data} />
        </div>
      );
    });
  };

  return post ? (
    <>
      <div className={styles.wrapper}>
        <div className={styles.background} onClick={onDismiss}></div>
        <div className={styles.inner}>
          <div className={styles.containerModal}>
            <div className={styles.container}>
              <Slider {...settings} >{sliders()}</Slider>
            </div>

            <div className={styles.info}>
              <div className={styles.userInfo}>
                <img src={post.avatar} className={styles.avatar}></img>
                <div className={styles.petName}>{post.name}</div>
              </div>
              <div className={styles.comments}>
                <div className={styles.comment}>
                  <div className={styles.userInfoComment}>
                    <div className={styles.petName}>{post.name}</div>
                    <div className={styles.text}>{post.text}</div>
                  </div>
                  <div className={styles.time}>
                    {post.time.toString().split("T").join("  ").split(".")[0]}
                  </div>
                </div>
                {comments.map((item) => (
                  <Comments
                    text={item.text}
                    id={item.id}
                    time={item.time}
                    owner_id={item.owner_id}
                    post_id={item.post_id}
                    username={item.username}
                  >
                    {" "}
                    {id === item.owner_id ? (
                      <div
                        onClick={() => {
                          deleteComment(item.id);
									 }}
									 style={{color: "grey",
										fontSize: "12px", cursor: "pointer"}}
                      >
                        {" "}
                        Delete{" "}
                      </div>
                    ) : null}
                  </Comments>
                ))}
              </div>
              <div className={styles.buttom}>
              	<div className={styles.likesAndComments}>
	                <div className={styles.icon}>
	                  {post.liked ? (
	                    <img
	                      onClick={() => {
	                        likeDelete(post.id);
	                      }}
	                      src="/images/liked.svg"
	                    ></img>
	                  ) : (
	                    <img
	                      onClick={() => {
	                        like(post.id);
	                      }}
	                      src="/images/like1.svg"
	                    ></img>
	                  )}
	                  {post.likes_count}
	                </div>
	                <div className={styles.icon}>
	                  <img src="/images/comment.svg"></img>  {post.comments_count}
	                </div>
	              </div>
	              <div className={styles.footerContainer}>
	                <div className={styles.footer}>
	                  <div className={styles.textarea}>
	                    <textarea
	                      placeholder="Add comment..."
	                      value={textComment}
	                      onChange={(event) => setTextComment(event.target.value)}
	                    />
	                  </div>
	                  <div className={styles.btn}>
	                    <button onClick={addComment}>Publish</button>
	                  </div>
	                </div>
	              </div>
              </div>
            </div>
          </div>
          <div className={styles.close}>
            <div onClick={onDismiss} className={styles.closeBtn}>
              <img src="/images/close.svg"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>preloader</div>
  );
};
