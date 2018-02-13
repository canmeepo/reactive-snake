import { Scene, Point2D } from './types';
import { SNAKE_LENGTH, APPLE_COUNT } from './constants';

export const nextDirection = (prev, next) => {
    let isOpposite = (prev: Point2D, next: Point2D) => {
        next.x === prev.x * -1 || next.y === prev.y * -1;
    };

    if (isOpposite(prev, next)) {
        return prev;
    }

    return next;
};

export function move(snake, [direction, snakeLength]) {
    let nx = snake[0].x;
    let ny = snake[0].y;

    nx += 1 * direction.x;
    ny += 1 * direction.y;

    let tail;

    if (snakeLength > snake.length) {
        tail = {x: nx, y: ny};
    } else {
        tail = snake.pop();
        tail.x = nx;
        tail.y = ny;
    }

    snake.unshift(tail);

    return snake;
}