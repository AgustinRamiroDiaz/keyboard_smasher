var startGameKey = " ";

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

let app = Vue.createApp({
  data() {
    return {
      timer: "",
      scores: {},
    };
  },

  methods: {
    clean() {
      this.scores = {};
    },
    catchKey(e) {
      if (e.repeat) return;

      let key = e.key;
      if (this.scores[key] === undefined) {
        this.scores[key] = 1;
      } else {
        this.scores[key] += 1;
      }
    },

    async play(gamePlaySeconds, delay = 3) {
      for (let secondsElapsed = 0; secondsElapsed < delay; secondsElapsed++) {
        let timeLeft = delay - secondsElapsed;
        this.timer = timeLeft;
        await sleep(1000);
      }
      this.timer = "GO!";

      document.addEventListener("keydown", this.catchKey);
      await sleep(gamePlaySeconds * 1000);
      document.removeEventListener("keydown", this.catchKey);

      this.timer = "Time's up!";
    },

    pressKeyToStartGame(startGameKey) {
      document.addEventListener(
        "keydown",
        (e) => {
          if (e.key != startGameKey) {
            this.pressKeyToStartGame(startGameKey);
            return;
          }
          this.clean();
          this.play(3);
        },
        { once: true }
      );
    },
  },

  mounted() {
    this.pressKeyToStartGame(startGameKey);
  },
});

app.mount("#app");
