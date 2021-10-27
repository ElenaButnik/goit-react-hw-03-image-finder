import s from "./Button.module.css";
import PropTypes from 'prop-types';

export default function Button({ handleClickBtn }) {
  return (
    <button type="button" className={s.ButtonItem} onClick={handleClickBtn}>
      Load more
    </button>
  );
}

Button.propTypes={
  handleClickBtn: PropTypes.func,
}
