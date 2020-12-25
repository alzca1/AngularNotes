import { CdkDragEnd } from '@angular/cdk/drag-drop';
import {
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NotemakerService } from '../notemaker.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  animations: [
    trigger('divState', [
      state(
        'open',
        style({
          width: '50px',
          opacity: 1,
          backgroundColor: 'transparent',
          transform: 'translate(20px,0)',
          visibility: 'visible',
        })
      ),
      state(
        'closed',
        style({
          width: '0px',
          opacity: 0,
          left: '-100px',
          transform: 'translate(60px, 0)',
          visibility: 'hidden',
        })
      ),
      transition('closed <=> open', animate('300ms ease-out')),
      transition('open => closed', animate('300ms ease-in')),
    ]),
  ],
})
export class NoteComponent implements OnInit, OnDestroy {
  @Input() note;
  @ViewChild('title', { static: true }) title: ElementRef;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('note', { static: true }) noteContainer: ElementRef;
  @Input('cdkDragFreeDragPosition')
  dragPosition: { x: number; y: number };
  titleObservable: any;
  contentObservable: any;
  titleClickObservable: any;
  contentClickObservable: any;
  buttonContainerColor: string;
  titleBlurObservable: any;
  contentBlurObservable: any;
  noteColor: string;
  state: string = 'closed';
  isDisabled: boolean = true;

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
    this.titleObservable = fromEvent(this.title.nativeElement, 'keyup').pipe(
      debounceTime(4000)
    );
    this.titleObservable.subscribe((event: KeyboardEvent) => {
      const value = (<HTMLElement>event.target).innerText;
      this.updateNote(this.note.id, this.title, this.content);
    });
    this.dragPosition = this.note.lastDragPosition;

    // this.titleBlurObservable = fromEvent(this.title.nativeElement, 'blur');
    // this.titleBlurObservable
    //   .pipe(
    //     distinctUntilChanged((prev, curr) => {
    //       console.log(prev, curr);
    //       return prev !== curr;
    //     })
    //   )
    //   .subscribe((event: KeyboardEvent) => {
    //     const value = (<HTMLElement>event.target).innerText;
    //     this.updateNote(this.note.id, this.title, this.content);
    //   });

    this.contentObservable = fromEvent(
      this.content.nativeElement,
      'keyup'
    ).pipe(debounceTime(4000));
    this.contentObservable.subscribe((event: KeyboardEvent) => {
      const value = (<HTMLElement>event.target).innerText;
      this.updateNote(this.note.id, this.title, this.content);
    });

    // this.contentBlurObservable = fromEvent(this.content.nativeElement, 'blur');
    // this.contentBlurObservable.subscribe((event: KeyboardEvent) => {
    //   const value = (<HTMLElement>event.target).innerText;
    //   this.updateNote(this.note.id, this.title, this.content);
    // });

    this.titleClickObservable = fromEvent(this.title.nativeElement, 'click');
    this.titleClickObservable.subscribe((event: MouseEvent) => {
      const value = (<HTMLElement>event.target).innerText;
      console.log(value);
      if (value == 'Type a title') {
        this.title.nativeElement.innerText = '';
      }
    });
    this.contentClickObservable = fromEvent(
      this.content.nativeElement,
      'click'
    );
    this.contentClickObservable.subscribe((event: MouseEvent) => {
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

  switchState() {
    this.state === 'closed' ? (this.state = 'open') : (this.state = 'closed');
    console.log(this.state);
  }

  toggleDraggable() {
    this.isDisabled = !this.isDisabled;
  }

  dragEnded(id, event) {
    this.dragPosition = event.distance;
    console.log(this.dragPosition);
    this.notemaker.updatePosition(id, this.dragPosition);
  }

  ngOnDestroy() {
    // this.titleObservable.unsubscribe();
    // this.contentObservable.unsubscribe();
    // this.titleClickObservable.unsubscribe();
    // this.contentClickObservable.unsubscribe();
  }
}
