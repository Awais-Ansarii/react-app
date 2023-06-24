import Chip from "../Chip";
import PropTypes from "prop-types";
import classes from "./PokemonFilter.module.css";
const FilterCategory = ({ category, title, filter, setFilter }) => {
  const handleSelectItem = (name) => {
    console.log(name);
    setFilter((prev) => {
      return { ...prev, [title]: name };
    });
  };

  return (
    <>
      {category?.length > 0 && (
        <div>
          <h1>Filter By {title} :</h1>
          <div className={classes.chips}>
            {category.map((item) => {
              const { name } = item;
              return (
                <Chip
                  onClick={() => handleSelectItem(name)}
                  key={name}
                  text={name}
                  active={filter[title] === item.name}
                />
              );
            })}
            <Chip onClick={() => handleSelectItem(name)} text={"reset"} />
          </div>
        </div>
      )}
    </>
  );
};

FilterCategory.propTypes = {
  category: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func,
};
export default FilterCategory;
