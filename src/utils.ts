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