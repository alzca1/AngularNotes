export class Note {
  title: string;
  content: string;
  date: Date;
  id: number;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
    this.date = new Date();
    this.id = this.getId();
  }

  getId() {
    return Math.floor(Math.random() * 10000000);
  }
}
