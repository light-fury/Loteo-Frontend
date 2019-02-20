export interface State {
    errors: string[];
    previousPath: string | null;
    currentPath: string | null;
}

export interface StoreState {
    app: State;
}
