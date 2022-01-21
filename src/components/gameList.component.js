import React, { Component } from "react";
import GameService from "../services/game.service";
import { Link } from "react-router-dom";

export default class GamessList extends Component {
  constructor(props) {
    super(props);
    this.onChangesearchGames = this.onChangesearchGames.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setGame = this.setGame.bind(this);
    this.searchGames = this.searchGames.bind(this);

    this.state = {
      game: [],
      currentGame: null,
      currentIndex: -1,
      searchGames: ""
    };
  }

  componentDidMount() {
    this.retriveGames();
  }

  onChangesearchGames(e) {
    const searchGames = e.target.value;

    this.setState({
      searchGames: searchGames
    });
  }

  retriveGames() {
    GameService.getAll()
      .then(response => {
        this.setState({
          game: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retriveGames();
    this.setState({
      currentGame: null,
      currentIndex: -1
    });
  }

  setGame(game, index) {
    this.setState({
      currentGame: game,
      currentIndex: index
    });
  }

  removeAllVideoGames() {
    GameService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchGames() {
    this.setState({
      currentGame: null,
      currentIndex: -1
    });

    GameService.findByName(this.state.searchGames)
      .then(response => {
        this.setState({
          game: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchGames, game, currentGame, currentIndex } = this.state;

    return (

      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchGames}
              onChange={this.onChangesearchGames}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchGames}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Games List</h4>

          <ul className="list-group">
            {game &&
              game.map((game, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setGame(game, index)}
                  key={index}
                >
                  {game.name}
                </li>
              ))}
          </ul>


        </div>


        <div className="col-md-6">
          {currentGame ? (
            <div>
              <h4>Games</h4>
              <div>
                <label>
                  <strong>Name``:</strong>
                </label>{" "}
                {currentGame.name}
              </div>
              <div>
                <label>
                  <strong>First Release Date:</strong>
                </label>{" "}
                {currentGame.first_release_date}
              </div>
              <div>
                <label>
                  <strong>Rating:</strong>
                </label>{" "}
                {currentGame.rating }
              </div>

              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentGame.summary }
              </div>

              <Link
                to={"/game/" + currentGame.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please Select a game</p>
            </div>
          )}
        </div>

       
      </div>
    );
  }
}
