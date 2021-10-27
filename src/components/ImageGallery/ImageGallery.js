import { Component } from "react";
import Loader from "react-loader-spinner";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import ImageAPI from "../services/pixabay";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import s from "./ImageGallery.module.css";

export default class ImageGallery extends Component {
  state = {
    page: 1,
    perPage: 12,
    imageArray: [],
    error: null,
    status: "idle",
    showModal: false,
    largeImg: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, perPage } = this.state;
    const { imageName } = this.props;

      if (prevProps.imageName !== imageName) {
      this.setState({ imageArray: [], page: 1, status: "pending" });
    }
    if (prevProps.imageName !== imageName || prevState.page !== page) {
      this.setState({ status: "pending" });

      // eslint-disable-next-line
      ImageAPI.fetchImage(imageName, page, perPage)
        .then(({ hits }) => {
          const images = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            }
          );
          // console.log(images);
          if (images.length > 0) {
            this.setState((prevState) => {
              return {
                imageArray: [...prevState.imageArray, ...images],
                status: "resolved",
              };
            });
            this.props.pageScroll();
          } else {
            this.setState({ status: "rejected" });
          }
        })
        .catch((error) => this.setState({ status: "rejected" }));
    }
  }

  handleClickBtn = () => {
    
    this.setState(({ page }) => {
      return {
        page: page + 1,
        //imageArray: this.state.imageArray,
        status: "pending",
      };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = (e) => {
    e.preventDefault();
    let src = e.target.src;
    this.setState({
      largeImg: this.state.imageArray.find((el) => el.webformatURL === src),
    });
    this.toggleModal();
  };

  render() {
    const { status, imageArray, showModal, largeImg } = this.state;

    if (status === "idle") {
      return <div className={s.Query}>Please enter your query!</div>;
    }

    if (status === "pending") {
      return (
        <Loader className={s.Loader}
          type="Circles"
          color="#d5e215"
          height={100}
          width={100}
        />
      );
    }

    if (status === "rejected") {
      return <h1 className={s.Query}>Something was wrong please try again!</h1>;
    }

    if (status === "resolved") {
      return (
        <>
          <ul className={s.ImageGallery}>
            <ImageGalleryItem
              imageArray={imageArray}
              onImageClick={this.onImageClick}
            />
          </ul>
          <Button handleClickBtn={this.handleClickBtn} />
          {showModal && (
            <Modal onClose={this.toggleModal} largeImg={largeImg}></Modal>
          )}
        </>
      );
    }
  }
}