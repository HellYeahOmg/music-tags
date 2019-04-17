import React from "react";

export const GenreTab = ({
  genres,
  listIcon,
  handleAddType,
  handleRemoveType
}) => (
  <div className="tags__list">
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
              className="tags__list-expand"
              src={listIcon}
              alt="посмотреть поджанры"
            />
          )}
        </div>
      );
    })}
  </div>
);
