class MysteryBox {
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
    this._last = Math.floor(Math.random() * 9999);
    this._spin = !this._spin;
  }

  randomEffect() {
    const stage = Scratch.vm.runtime.getTargetForStage();
    stage.setTempo(20 + Math.random() * 200);
    Scratch.vm.runtime.emit("RUNTIME_DISPOSED");
  }

  secretNumber() {
    return this._last || 0;
  }

  chance(args) {
    return Math.random() * 100 < args.n;
  }
}

Scratch.extensions.register(new MysteryBox());
