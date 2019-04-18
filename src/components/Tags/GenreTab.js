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
  childs
}) => (
  <div className="tags__list">
    {!showChildren && (
      <>
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
              {item.childs.length !== 0 && (
                <img
                  onClick={() => {
                    handleShowChildren(item);
                  }}
                  className="tags__list-expand"
                  src={listIcon}
                  alt="посмотреть поджанры"
                />
              )}
            </div>
          );
        })}
      </>
    )}
    {showChildren && (
      <>
        <div className="tags__child-info">
          <span onClick={handleHideChildren} className="tags__child-back">
            <img src={arrowIcon} alt="назад" />
          </span>
          <span>{childs.title}</span>
        </div>
        {childs.items.map((item, index) => {
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
            </div>
          );
        })}
      </>
    )}
  </div>
);
