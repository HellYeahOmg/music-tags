import React from "react";

export const Songs = ({ songs }) => (
  <div className="tags__songs">
    <span className="tags__songs-title">Подобрано треков</span>
    <span className="tags__songs-count">{songs}</span>
    <button className="tags__btn">Продолжить</button>
  </div>
);
