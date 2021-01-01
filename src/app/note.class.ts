export class Note {
  title: string;
  content: string;
  date: Date;
  id: number;
  creationDate: Date;
  lastDragPosition: Object;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
    this.date = new Date();
    this.id = this.getId();
    this.creationDate = new Date();
    this.lastDragPosition = {
      x: 0,
      y: 0,
    };
  }

  getId() {
    return Math.floor(Math.random() * 10000000);
  }
}
