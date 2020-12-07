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

  constructor(private notemaker: NotemakerService) {}

  ngOnInit(): void {
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

    // const moveObservable = fromEvent(
    //   this.noteContainer.nativeElement,
    //   'change'
    // );
    // moveObservable.subscribe((event) => {
    //   console.log(event);
    // });
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
}
