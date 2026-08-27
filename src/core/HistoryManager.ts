export interface ICommand {
  execute(): void;
  undo(): void;
  description?: string;
}

export class HistoryManager {
  private undoStack: ICommand[] = [];
  private redoStack: ICommand[] = [];
  private maxHistory: number;
  public onStateChange?: (canUndo: boolean, canRedo: boolean) => void;

  constructor(maxHistory: number = 50) {
    this.maxHistory = maxHistory;
  }

  public execute(command: ICommand): void {
    command.execute();
    this.undoStack.push(command);
    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }
    this.redoStack = [];
    this.notify();
  }

  public recordExecuted(command: ICommand): void {
    this.undoStack.push(command);
    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }
    this.redoStack = [];
    this.notify();
  }

  public undo(): boolean {
    if (this.undoStack.length === 0) return false;
    const command = this.undoStack.pop()!;
    command.undo();
    this.redoStack.push(command);
    this.notify();
    return true;
  }

  public redo(): boolean {
    if (this.redoStack.length === 0) return false;
    const command = this.redoStack.pop()!;
    command.execute();
    this.undoStack.push(command);
    this.notify();
    return true;
  }

  public canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  public canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  public get undoCount(): number {
    return this.undoStack.length;
  }

  public get redoCount(): number {
    return this.redoStack.length;
  }

  public clear(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.notify();
  }

  private notify(): void {
    if (this.onStateChange) {
      this.onStateChange(this.canUndo(), this.canRedo());
    }
  }
}
