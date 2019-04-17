import React from "react";

export const SelectTabs = ({
  genreIcon,
  currentTab,
  moodIcon,
  handleActiveTab
}) => (
  <div className="tags__type">
    <img src={genreIcon} alt="genre" />
    <span
      onClick={handleActiveTab}
      id="genres"
      className={currentTab === "genres" ? "active" : ""}
    >
      жанр
    </span>
    <img src={moodIcon} alt="genre" />
    <span
      onClick={handleActiveTab}
      id="mood"
      className={currentTab === "mood" ? "active" : ""}
    >
      настроение
    </span>
  </div>
);
