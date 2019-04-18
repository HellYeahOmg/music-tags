import React from "react";

export const SelectedTags = ({ selectedTypes, handleRemoveType }) => (
  <div className="tags__choosed">
    <span className="tags__choosed-title">Выбранные характеристики: </span>
    {selectedTypes.map((item, index) => {
      return (
        <div
          className={
            item.type === "genres"
              ? "tags__choosed-item--genre tags__choosed-item"
              : "tags__choosed-item--mood tags__choosed-item"
          }
          key={index}
        >
          {`${item.title} `}
          <span
            onClick={() => {
              handleRemoveType(item);
            }}
            className="tags__choosed-remove"
          >
            X
          </span>
        </div>
      );
    })}
  </div>
);
