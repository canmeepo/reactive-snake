import { Observable, BehaviorSubject } from 'rxjs';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { DIRECTIONS, POINTS_PER_APPLE, SPEED } from './constants';
import { Key } from './types';

import {
    createCanvasElement
} from './canvas';
import { nextDirection, move, generateSnake } from './utils';

let canvas = createCanvasElement();
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

const INITIAL_DIRECTION = DIRECTIONS[Key.RIGHT];

let keydown$ = Observable.fromEvent(document, 'keydown');
let click$ = Observable.fromEvent(document, 'click');
let ticks$ = Observable.interval(SPEED);

let direction$ = keydown$
    .map((event: KeyboardEvent) => DIRECTIONS[event.keyCode])
    .filter(direction => !!direction)
    .scan(nextDirection)
    .startWith(INITIAL_DIRECTION)
    .distinctUntilChanged();

let snakeLength$ = length$
    .map((event: KeyboardEvent) => DIRECTIONS[event.keyCode])
    .filter(direction => !!direction)
    .scan(nextDirection)
    .startWidth(INITIAL_DIRECTION)
    .distinctUntilChanged();

let score$ = snakeLength$
    .startWidth(0)
    .scan((score, _) => score + POINTS_PER_APPLE);

let snake$: Observable<Arrayy<Point2D>> = ticks$
    .withLatestFrom(direction$, snakeLength$, (_, direction, snakeLength) => [direction, snakeLength])
    .scan(move, generateSnake())
    .share();