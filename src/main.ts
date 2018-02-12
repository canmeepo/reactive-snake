import { Observable, BehaviorSubject } from 'rxjs';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { DIRECTIONS } from './constants';
import { Key } from './types';

import {
    createCanvasElement
} from './canvas';
import { nextDirection } from './utils';

let canvas = createCanvasElement();
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

const INITIAL_DIRECTION = DIRECTIONS[Key.RIGHT];

let keydown$ = Observable.fromEvent(document, 'keydown');

let direction$ = keydown$
    .map((event: KeyboardEvent) => DIRECTIONS[event.keyCode])
    .filter(direction => !!direction)
    .scan(nextDirection)
    .startWith(INITIAL_DIRECTION)
    .distinctUntilChanged();