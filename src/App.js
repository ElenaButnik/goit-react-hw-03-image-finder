import "./App.css";
import { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

export default class App extends Component {
  state = {
    imageName: "",
  };

  handleFormSubmit = (imageName) => {
    this.setState({ imageName });
  };

  pageScroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  render() {
    return (
      <div>
        <Searchbar onPropsSubmit={this.handleFormSubmit} />
        <ImageGallery
          imageName={this.state.imageName}
          pageScroll={this.pageScroll}
        />
      </div>
    );
  }
}
