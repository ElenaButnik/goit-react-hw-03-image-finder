import { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import PropTypes from 'prop-types';


const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => {
        if(e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleOverlayClick = event => {
        if(event.currentTarget === event.target) {
            this.props.onClose();
        }
    }

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleOverlayClick}>
        <div className={s.Modal}>
          <img src={this.props.largeImg.largeImageURL} alt={this.props.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes={
  toggleModal:PropTypes.func,
  largeImg: PropTypes.object,
}