class MysteryBox {
  constructor() {
    this.lastNumber = 0;
  }

  getInfo() {
    return {
      id: "mysterybox",
      name: "???",
      color1: "#6a00ff",
      color2: "#9b4dff",
      blocks: [
        {
          opcode: "activate",
          blockType: Scratch.BlockType.COMMAND,
          text: "activate mystery"
        },
        {
          opcode: "randomEffect",
          blockType: Scratch.BlockType.COMMAND,
          text: "random effect"
        },
        {
          opcode: "secretNumber",
          blockType: Scratch.BlockType.REPORTER,
          text: "secret number"
        },
        {
          opcode: "chance",
          blockType: Scratch.BlockType.BOOLEAN,
          text: "mystery chance %n",
          arguments: {
            n: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 50
            }
          }
        }
      ]
    };
  }

  activate() {
    this.lastNumber = Math.floor(Math.random() * 10000);
  }

  randomEffect() {
    const runtime = Scratch.vm.runtime;
    const stage = runtime.getTargetForStage();

    if (!stage) return;

    // Random visual effect
    const effects = ["ghost", "color", "brightness", "fisheye", "whirl"];
    const effect = effects[Math.floor(Math.random() * effects.length)];

    stage.effects[effect] = Math.floor(Math.random() * 100);
    stage.emit("EVENT_TARGET_VISUAL_CHANGE");
  }

  secretNumber() {
    return this.lastNumber;
  }

  chance(args) {
    return Math.random() * 100 < args.n;
  }
}

Scratch.extensions.register(new MysteryBox());
