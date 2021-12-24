var startGameKey = " ";

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
        this.scores[key] = 0;
      } else {
        this.scores[key] += 1;
      }
    },

    play(gamePlaySeconds, delay = 3) {
      for (let secondsElapsed = 0; secondsElapsed < delay; secondsElapsed++) {
        let timeLeft = delay - secondsElapsed;
        setTimeout(() => {
          this.timer = timeLeft;
        }, secondsElapsed * 1000);
      }

      setTimeout(
        () => {
          this.timer = "GO!";
          document.addEventListener("keydown", this.catchKey);
          setTimeout(
            () => document.removeEventListener("keydown", this.catchKey),
            gamePlaySeconds * 1000
          );
        },

        delay * 1000
      );

      setTimeout(() => {
        this.timer = "Time's up!";
      }, (gamePlaySeconds + delay) * 1000);
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
