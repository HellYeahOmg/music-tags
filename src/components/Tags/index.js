import React from "react";
import { withApollo } from "react-apollo";
import genreList from "./queries/genreList";
import moodList from "./queries/moodList";
import songsCount from "./queries/songsCount";
import "./styles.sass";
import genreIcon from "./assets/genre.svg";
import moodIcon from "./assets/mood.svg";
import listIcon from "./assets/list.svg";
import { SelectTab } from "./SelectTab";
import { MoodTab } from "./MoodTab";
import { GenreTab } from "./GenreTab";
import { SelectedTags } from "./SelectedTags";
import { Songs } from "./Songs";

class Tags extends React.Component {
  state = {
    selectedTypes: [],
    currentTab: "genres",
    genres: [],
    moods: [],
    songs: 0,
    showChildren: false,
    parent: {}
  };

  // активная вкладка
  handleActiveTab = e => {
    this.setState({ currentTab: e.target.id });
  };

  // добавить тег в список
  handleAddType = tag => {
    const {
      selectedTypes,
      currentTab,
      genres,
      moods,
      showChildren,
      parent
    } = this.state;
    const changedTag = { ...tag, choosed: true, type: currentTab };
    const genreIndex = genres.findIndex(item => item.id === tag.id);
    if (showChildren) {
      // если выбран "ребенок"
      const parentIndex = genres.findIndex(item => item.id === parent.id);
      const childIndex = parent.childs.findIndex(item => item.id === tag.id);
      const changedGenres = [...genres];
      changedGenres[parentIndex].childs[childIndex] = changedTag;
      this.setState({ genres: changedGenres });
    }
    if (genreIndex !== -1) {
      // тип тега - жанр
      const changedGenres = [...genres];
      changedGenres[genreIndex] = changedTag;
      this.setState({ genres: changedGenres });
    } else {
      // тип тега - настроение
      const moodIndex = moods.findIndex(item => item.id === tag.id);
      const changedMoods = [...moods];
      changedMoods[moodIndex] = changedTag;
      this.setState({ moods: changedMoods });
    }
    const selectedIndex = selectedTypes.findIndex(item => item.id === tag.id);
    if (selectedIndex === -1) {
      // избежать дубликатов. Можно было использовать Set, но Set и spread оператор не дружат
      const arr = [...selectedTypes];
      arr.push(changedTag);
      this.setState({ selectedTypes: arr }, () => {
        this.loadSongs();
      });
    }
  };

  // удалить тег из списка
  handleRemoveType = tag => {
    const { selectedTypes, genres, moods } = this.state;
    const changedTag = { ...tag, choosed: false };
    const genreIndex = genres.findIndex(item => item.id === tag.id);
    if (genreIndex !== -1) {
      // тип тега - жанр
      const changedGenres = [...genres];
      changedGenres[genreIndex] = changedTag;
      // отменить выбор "ребенка"
      changedGenres.forEach(parent => {
        if (parent.childs && parent.childs.length) {
          const childIndex = parent.childs.findIndex(
            child => child.id === tag.id
          );
          if (childIndex !== -1) {
            const parentIndex = changedGenres.findIndex(
              item => item.id === parent.id
            );
            changedGenres[parentIndex].childs[childIndex] = changedTag;
          }
        }
      });
      this.setState({ genres: changedGenres });
    } else {
      // тип тега - настроение
      const moodIndex = moods.findIndex(item => item.id === tag.id);
      const changedMoods = [...moods];
      changedMoods[moodIndex] = changedTag;
      this.setState({ moods: changedMoods });
    }
    const selectedIndex = selectedTypes.findIndex(item => item.id === tag.id);
    const arr = [...selectedTypes];
    arr.splice(selectedIndex, 1);
    this.setState({ selectedTypes: arr });
  };

  componentDidMount = () => {
    this.props.client
      .query({
        query: genreList
      })
      .then(({ data }) => {
        this.setState({ genres: data.demoValues });
      });
    this.props.client
      .query({
        query: moodList
      })
      .then(({ data }) => {
        this.setState({ moods: data.demoValues });
      });
  };

  // получить количество песен
  loadSongs = () => {
    const valueIds = [];
    this.state.selectedTypes.forEach(item => {
      valueIds.push(item.id);
    });
    this.props.client
      .query({
        query: songsCount,
        variables: { valueIds }
      })
      .then(({ data }) => this.setState({ songs: data.demoMediafilesCount }));
  };

  handleShowChildren = tag => {
    this.setState({
      showChildren: true,
      parent: tag
    });
  };

  handleHideChildren = () => {
    this.setState({
      showChildren: false,
      childs: {
        title: "",
        items: []
      }
    });
  };

  getGenres = () => {
    const { showChildren, genres, parent } = this.state;
    if (!showChildren) {
      return genres;
    } else {
      return parent.childs;
    }
  };

  render() {
    const {
      moods,
      currentTab,
      selectedTypes,
      songs,
      showChildren,
      parent
    } = this.state;

    return (
      <div className="tags">
        <h1>Музыка для баров и ресторанов → Утренний музыкальный блок</h1>
        <h2>Укажите подходящие характеристики для музыкального блока</h2>
        <SelectTab
          genreIcon={genreIcon}
          moodIcon={moodIcon}
          currentTab={currentTab}
          handleActiveTab={this.handleActiveTab}
        />

        {currentTab === "genres" && (
          <GenreTab
            handleAddType={this.handleAddType}
            handleRemoveType={this.handleRemoveType}
            listIcon={listIcon}
            genres={this.getGenres()}
            showChildren={showChildren}
            handleShowChildren={this.handleShowChildren}
            handleHideChildren={this.handleHideChildren}
            parent={parent}
          />
        )}

        {currentTab === "mood" && (
          <MoodTab
            moods={moods}
            handleAddType={this.handleAddType}
            handleRemoveType={this.handleRemoveType}
          />
        )}

        {selectedTypes.length !== 0 && (
          <SelectedTags
            selectedTypes={selectedTypes}
            handleRemoveType={this.handleRemoveType}
          />
        )}

        {selectedTypes.length !== 0 && <Songs songs={songs} />}
      </div>
    );
  }
}

export default withApollo(Tags);
