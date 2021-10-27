import s from "./Button.module.css";

export default function Button({ handleClickBtn }) {
  return (
    
      <button type="button" className={s.ButtonItem} onClick={handleClickBtn}>
        Load more
      </button> 
   
     
  );
}
