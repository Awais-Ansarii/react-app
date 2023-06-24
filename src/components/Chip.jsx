import PropTypes from "prop-types";
import classes from "./Chip.module.css";

const Chip = ({ text, active, onClick }) => {
  return (
    <div
      type="button"
      onClick={onClick}
      className={`${classes.container} ${active && classes.active} ${
        text == "reset" && classes.reset
      }`}
    >
      <span>{text}</span>
    </div>
  );
};

Chip.propTypes = {
  active: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
export default Chip;
