export declare type ClavaAction<T extends (...funcArgs: any[]) => void> = {
  f: T;
  p: Parameters<T>;
};

class ClavaActionQueueBase {
  private readonly data: ClavaAction<any>[];

  private rear: number;

  private readonly size: number;

  constructor() {
    this.data = [];
    this.rear = 0;
    this.size = 10;
  }

  enqueue(element: ClavaAction<any>) {
    if (this.rear >= this.size) {
      this.dequeue();
      this.enqueue(element);
    } else {
      this.data[this.rear] = element;
      this.rear += 1;
    }
  }

  length() {
    return this.rear;
  }

  isEmpty() {
    return this.rear === 0;
  }

  getFront() {
    if (!this.isEmpty()) {
      return this.data[0];
    }
    return undefined;
  }

  getLast() {
    if (!this.isEmpty()) {
      return this.data[this.rear - 1];
    }
    return undefined;
  }

  dequeue() {
    if (!this.isEmpty()) {
      this.rear -= 1;
      return this.data.shift();
    }
    return undefined;
  }

  clear() {
    this.data.length = 0;
    this.rear = 0;
  }
}

const ClavaActionQueue = new ClavaActionQueueBase();

export default ClavaActionQueue;
