import http from "../http-common";

class GameService {
  getAll() {
    return http.get("https://adaorachi.github.io/esetech-assessment-api/game-data.json");
  }

  findByTitle(title) {
    return http.get(`https://adaorachi.github.io/esetech-assessment-api/game-data.json?title=${title}`);
  }
}

export default new GameService();