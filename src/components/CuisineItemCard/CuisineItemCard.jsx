import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CuisineItemCard.css";
import { FaRegHeart } from "react-icons/fa";
import { RecipeContext } from "../../Context/RecipeContext";

const CuisineItemCard = (props) => {
  const { id, title, imageUrl } = props;
  const { addRecipe, removeRecipe, favItems } = useContext(RecipeContext);
  const [favIconStyle, setFavIconStyle] = useState("classNormalColorIcon");

  useEffect(() => {
    const isItemPresent = favItems.some((item) => item.id === id);
    if (isItemPresent) {
      setFavIconStyle("classRedColorIcon");
    } else {
      setFavIconStyle("classNormalColorIcon");
    }
  }, [favItems, id]);

  const addProductToFav = () => {
    const Recipeitem = {
      id,
      title,
      imageUrl,
    };

    const isItemPresent = favItems.some((item) => item.id === id);

    if (isItemPresent) {
      removeRecipe(Recipeitem);
      setFavIconStyle("classNormalColorIcon");
    } else {
      addRecipe(Recipeitem);
      setFavIconStyle("classRedColorIcon");
    }
  };

  return (
    <div className="cuisineitem-container">
      <Link to={`/recipe/${id}`} className="cuisine-item-card-link">
        <img src={imageUrl} className="cuisineitem-image" alt={title} />
      </Link>
      <div className="cuisine-title-container">
        <p className="cuisineitem-title">{title}</p>
        <div className={`fav-icon-wrapper ${favIconStyle}`}>
          <FaRegHeart onClick={addProductToFav} />
        </div>
      </div>
    </div>
  );
};

export default CuisineItemCard;
