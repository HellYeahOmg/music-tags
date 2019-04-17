import React from "react";
import { withApollo } from "react-apollo";
import taglist from "./queries/taglist";
import "./styles.sass";
import genreIcon from "./assets/genre.svg";
import moodIcon from "./assets/mood.svg";
import listIcon from "./assets/list.svg";
import { SelectTabs } from "./SelectTabs";
import { MoodTab } from "./MoodTab";
import { GenreTab } from "./GenreTab";

class Tags extends React.Component {
  state = {
    selectedTypes: new Set(),
    currentTab: "genres",
    genres: [
      {
        title: "Прогрессивный рок",
        id: 5178,
        childs: [1]
      },
      {
        title: "Рок-н-ролл",
        id: 5179,
        childs: []
      },
      {
        title: "Пост-рок",
        id: 5180,
        childs: []
      },
      {
        title: "Фолк-рок",
        id: 5181,
        childs: []
      },
      {
        title: "Русская поп-музыка",
        id: 5173,
        childs: []
      },
      {
        title: "Инди-поп",
        id: 5174,
        childs: []
      },
      {
        title: "Авторская песня",
        id: 5175,
        childs: []
      }
    ],
    mood: [
      {
        title: "Меланхоличная",
        id: 4417,
        childs: []
      },
      {
        title: "Нейтральная",
        id: 4418,
        childs: []
      },
      {
        title: "Счастливая",
        id: 4420,
        childs: []
      },
      {
        title: "Печальная",
        id: 4416,
        childs: []
      },
      {
        title: "Радостная",
        id: 4419,
        childs: []
      },
      {
        title: "Сердитая",
        id: 5212,
        childs: []
      },
      {
        title: "Мрачная",
        id: 5213,
        childs: []
      },
      {
        title: "Расслабляющая",
        id: 5214,
        childs: []
      }
    ]
  };

  // активная вкладка
  handleActiveTab = e => {
    this.setState({ currentTab: e.target.id });
  };

  // добавить тег в список
  handleAddType = tag => {
    const { currentTab, genres, mood, selectedTypes } = this.state;
    if (currentTab === "genres") {
      const index = genres.findIndex(item => item.id === tag.id);
      const newGenres = [...genres];
      newGenres[index].choosed = true;
      this.setState({ genres: newGenres });
    } else {
      const index = mood.findIndex(item => item.id === tag.id);
      const newMoods = [...mood];
      newMoods[index].choosed = true;
      this.setState({ mood: newMoods });
    }
    const set = new Set(selectedTypes);
    tag.type = currentTab; // записать тип тега
    set.add(tag);
    this.setState({ selectedTypes: set });
  };

  // удалить тег из списка
  handleRemoveType = tag => {
    const { currentTab, genres, mood, selectedTypes } = this.state;
    if (currentTab === "genres") {
      const index = genres.findIndex(item => item.id === tag.id);
      const newGenres = [...genres];
      newGenres[index].choosed = false;
      this.setState({ genres: newGenres });
    } else {
      const index = mood.findIndex(item => item.id === tag.id);
      const newMoods = [...mood];
      newMoods[index].choosed = false;
      this.setState({ mood: newMoods });
    }
    const set = new Set(selectedTypes);
    set.delete(tag);
    this.setState({ selectedTypes: set });
  };

  componentDidMount = () => {
    this.props.client
      .query({
        query: taglist
      })
      .then(data => console.log(data));
  };

  render() {
    const { genres, mood, currentTab, selectedTypes } = this.state;
    return (
      <div className="tags">
        <h1>Музыка для баров и ресторанов → Утренний музыкальный блок</h1>
        <h2>Укажите подходящие характеристики для музыкального блока</h2>
        <SelectTabs
          genreIcon={genreIcon}
          moodIcon={moodIcon}
          currentTab={currentTab}
          handleActiveTab={this.handleActiveTab}
        />

        {currentTab === "genres" && (
          <>
            <GenreTab
              handleAddType={this.handleAddType}
              handleRemoveType={this.handleRemoveType}
              listIcon={listIcon}
              genres={genres}
            />
          </>
        )}

        {currentTab === "mood" && (
          <>
            <MoodTab
              mood={mood}
              handleAddType={this.handleAddType}
              handleRemoveType={this.handleRemoveType}
            />
          </>
        )}

        <div className="tags__choosed">
          {selectedTypes.size !== 0 && (
            <>
              <span className="tags__choosed-title">
                Выбранные характеристики:{" "}
              </span>
              {Array.from(selectedTypes).map((item, index) => {
                return <span key={index}>{`${item.title} `}</span>;
              })}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default withApollo(Tags);
