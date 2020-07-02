export interface State {
    errors: string[];
    previousPath: string | null;
    currentPath: string | null;
}

export interface StoreState {
    app: State;
}

export interface Match {
    isExact: boolean;
    params: {[key: string]: any};
    path: string;
    url: string;
}
