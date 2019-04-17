import React from "react";
export const MoodTab = ({ mood, handleAddType, handleRemoveType }) => (
  <div className="tags__list">
    {mood.map((item, index) => {
      return (
        <div
          className={
            item.choosed
              ? "tags__list-item tags__list-item--mood--active"
              : "tags__list-item tags__list-item--mood"
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
  </div>
);
