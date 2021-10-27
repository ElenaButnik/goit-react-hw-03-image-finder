import { Component } from "react";
import s from "./ImageGalleryItem.module.css";
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  render() {
    return this.props.imageArray.map((image) => (
      <li className={s.ImageGalleryItem} key={image.id}>
        <img
          src={image.webformatURL}
          alt={image.tag}
          className={s.ImageGalleryItemImage}
          onClick={this.props.onImageClick}
        />
      </li>
    ));
  }
}

ImageGalleryItem.propTypes={
  onImageClick:PropTypes.func,
  imageArray:PropTypes.array,
}
