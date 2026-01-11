class MysteryBox {
  constructor() {
    this.lastNumber = 0;
    this.unlocked = false;
    this.seed = Date.now();
  }

  random() {
    // Seeded random (LCG)
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
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
          text: "random glitch effect"
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
              defaultValue: 25
            }
          }
        },
        {
          opcode: "cameraShake",
          blockType: Scratch.BlockType.COMMAND,
          text: "camera shake %n",
          arguments: {
            n: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 10
            }
          }
        },
        {
          opcode: "cameraZoom",
          blockType: Scratch.BlockType.COMMAND,
          text: "camera zoom %n %",
          arguments: {
            n: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 120
            }
          }
        },
        {
          opcode: "devSecret",
          blockType: Scratch.BlockType.COMMAND,
          text: "⚠ dev only",
          hideFromPalette: true
        }
      ]
    };
  }

  activate() {
    this.lastNumber = Math.floor(this.random() * 10000);
    this.unlocked = true;
  }

  randomEffect() {
    if (!this.unlocked) return;

    const stage = Scratch.vm.runtime.getTargetForStage();
    if (!stage) return;

    const effects = ["color", "ghost", "brightness", "fisheye", "whirl"];
    const effect = effects[Math.floor(this.random() * effects.length)];
    stage.effects[effect] = Math.floor(this.random() * 100);
    stage.emit("EVENT_TARGET_VISUAL_CHANGE");
  }

  secretNumber() {
    return this.lastNumber;
  }

  chance(args) {
    return this.random() * 100 < args.n;
  }

  cameraShake(args) {
    if (!this.unlocked) return;

    const stage = Scratch.vm.runtime.getTargetForStage();
    if (!stage) return;

    stage.x += (this.random() - 0.5) * args.n;
    stage.y += (this.random() - 0.5) * args.n;
  }

  cameraZoom(args) {
    if (!this.unlocked) return;

    const stage = Scratch.vm.runtime.getTargetFors
tage();
    if (!stage) return;

    stage.setSize(args.n);
  }

  devSecret() {
    // Hidden dev power
    const stage = Scratch.vm.runtime.getTargetForStage();
    if (!stage) return;

    stage.effects.color = 200;
    stage.effects.whirl = 100;
    stage.effects.fisheye = 100;
    stage.emit("EVENT_TARGET_VISUAL_CHANGE");
  }
}

Scratch.extensions.register(new MysteryBox());
