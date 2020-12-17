import { CdkDragEnd } from '@angular/cdk/drag-drop';
import {
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { NotemakerService } from '../notemaker.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() note;
  @ViewChild('title', { static: true }) title: ElementRef;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('note', { static: true }) noteContainer: ElementRef;
  buttonContainerColor: string;
  noteColor: string;

  noteColors = [
    {
      color: 'yellow',
      barColor: '#FDE84F',
      backgroundColor: '#FEF3A1',
    },
    {
      color: 'blue',
      barColor: '#8DF0FE',
      backgroundColor: '#AFF4FE',
    },

    {
      color: 'green',
      barColor: '#87fc89',
      backgroundColor: '#b4fda5',
    },
    {
      color: 'pink',
      barColor: '#fdb2b3',
      backgroundColor: '#fec7c8',
    },
    {
      color: 'violet',
      barColor: '#9cb7fc',
      backgroundColor: '#b7cbfd',
    },
    {
      color: 'grey',
      barColor: '#dadada',
      backgroundColor: '#eeeeee',
    },
  ];

  constructor(private notemaker: NotemakerService) {}

  ngOnInit(): void {
    this.setNoteColors(this.note.color);
    const titleObservable = fromEvent(this.title.nativeElement, 'keyup').pipe(
      debounceTime(1000)
    );
    titleObservable.subscribe((event: KeyboardEvent) => {
      const value = (<HTMLElement>event.target).innerText;
      this.updateNote(this.note.id, this.title, this.content);
    });

    const contentObservable = fromEvent(
      this.content.nativeElement,
      'keyup'
    ).pipe(debounceTime(1000));
    contentObservable.subscribe((event: KeyboardEvent) => {
      const value = (<HTMLElement>event.target).innerText;
      this.updateNote(this.note.id, this.title, this.content);
    });

    const titleClickObservable = fromEvent(this.title.nativeElement, 'click');
    titleClickObservable.subscribe((event: MouseEvent) => {
      const value = (<HTMLElement>event.target).innerText;
      console.log(value);
      if (value == 'Type a title') {
        this.title.nativeElement.innerText = '';
      }
    });
    const contentClickObservable = fromEvent(
      this.content.nativeElement,
      'click'
    );
    contentClickObservable.subscribe((event: MouseEvent) => {
      const value = (<HTMLElement>event.target).innerText;
      console.log(value);
      if (value == 'Type content') {
        this.content.nativeElement.innerText = '';
      }
    });
  }

  updateNote(id, title, content) {
    this.notemaker.updateNote(id, title, content);
  }

  removeNote(id) {
    this.notemaker.removeNote(id);
  }

  dragEnd(event: CdkDragEnd) {
    console.log(event);
  }

  setNoteColors(color) {
    console.log(color);
    switch (color) {
      case 'yellow':
        console.log('yellow picked');
        this.buttonContainerColor = 'yellowButtonContainer';
        this.noteColor = 'yellowContainer';
        break;
      case 'blue':
        console.log('blue picked');
        this.buttonContainerColor = 'blueButtonContainer';
        this.noteColor = 'blueContainer';
        break;
      case 'green':
        console.log('green picked');
        this.buttonContainerColor = 'greenButtonContainer';
        this.noteColor = 'greenContainer';
        break;
      case 'pink':
        console.log('pink picked');
        this.buttonContainerColor = 'pinkButtonContainer';
        this.noteColor = 'pinkContainer';
        break;
      case 'violet':
        console.log('violet picked');
        this.buttonContainerColor = 'violetButtonContainer';
        this.noteColor = 'violetContainer';
        break;
      case 'grey':
        console.log('grey picked');
        this.buttonContainerColor = 'greyButtonContainer';
        this.noteColor = 'greyContainer';
        break;
      default:
        console.log('default picked');
        this.buttonContainerColor = 'yellowButtonContainer';
        this.noteColor = 'yellowContainer';
    }
  }

  updateColor(color) {
    this.setNoteColors(color);
    console.log(color);
    console.log(this.noteColor, this.buttonContainerColor);
    this.notemaker.updateColor(this.note.id, color);
  }

  getLocalTime() {
    const newDate = new Date(this.note.date);
    const localTime = newDate.toLocaleTimeString('sp-SP');
    const localDate = newDate.toLocaleDateString('sp-SP');
    return `${localTime} ${localDate}`;
  }
}
