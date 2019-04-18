import React from "react";
import arrowIcon from "./assets/arrow.svg";

export const GenreTab = ({
  genres,
  listIcon,
  handleAddType,
  handleShowChildren,
  handleRemoveType,
  showChildren,
  handleHideChildren,
  parent
}) => {
  const getChildsCount = item => {
    let count = 0;
    item.childs.forEach(child => {
      if (child.choosed === true) {
        count++;
      }
    });
    return count;
  };
  return (
    <div className="tags__list">
      <>
        {showChildren && (
          <div className="tags__child-info">
            <span onClick={handleHideChildren} className="tags__child-back">
              <img src={arrowIcon} alt="назад" />
            </span>
            <span>{parent.title}</span>
          </div>
        )}
        {genres.map((item, index) => {
          return (
            <div
              className={
                item.choosed
                  ? "tags__list-item tags__list-item--genre--active"
                  : "tags__list-item tags__list-item--genre"
              }
              key={index}
            >
              <span
                onClick={() => {
                  handleAddType(item);
                }}
              >
                {item.title}
              </span>
              {item.choosed && (
                <span
                  onClick={() => {
                    handleRemoveType(item);
                  }}
                  className="tags__list-remove"
                >
                  X
                </span>
              )}
              {item.childs && item.childs.length !== 0 && (
                <>
                  <img
                    onClick={() => {
                      handleShowChildren(item);
                    }}
                    className="tags__list-expand"
                    src={listIcon}
                    alt="посмотреть поджанры"
                  />
                  {getChildsCount(item) > 0 && (
                    <span className="tags__list-count">
                      {getChildsCount(item)}
                    </span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </>
    </div>
  );
};
