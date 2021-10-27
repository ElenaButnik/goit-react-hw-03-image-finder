import { Component } from "react";
import s from "./ImageGalleryItem.module.css";

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
