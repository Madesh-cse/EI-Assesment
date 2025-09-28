interface content {
  render(): string;
}


class PlainText implements content {
  constructor(private content: string) {}
  render(): string {
    return this.content;
  }
}


abstract class TextDecorator implements content {
  constructor(protected wrapped: content) {}
  abstract render(): string;
}

class BoldDecorator extends TextDecorator {
  render(): string {
    return `\x1b[1m${this.wrapped.render()}\x1b[0m`; // ANSI escape code for bold
  }
}

class ItalicDecorator extends TextDecorator {
  render(): string {
    return `\x1b[3m${this.wrapped.render()}\x1b[0m`;
  }
}

class UnderlineDecorator extends TextDecorator {
  render(): string {
    return `\x1b[4m${this.wrapped.render()}\x1b[0m`;
  }
}

class ColorDecorator extends TextDecorator {
  constructor(wrapped: content, private color: string) {
    super(wrapped);
  }

  render(): string {
    const colorCodes: { [key: string]: string } = {
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      magenta: "\x1b[35m",
      cyan: "\x1b[36m",
    };
    const code = colorCodes[this.color.toLowerCase()] || "\x1b[0m";
    return `${code}${this.wrapped.render()}\x1b[0m`;
  }
}

let mycontent: content = new PlainText("Weclome to SOLID Principle and design Pattern")
mycontent = new BoldDecorator(mycontent);
mycontent = new ItalicDecorator(mycontent);
mycontent = new UnderlineDecorator(mycontent);
mycontent = new ColorDecorator(mycontent, 'yellow');

console.log(mycontent.render());