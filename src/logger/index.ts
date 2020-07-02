declare global {
    interface Window {
        logger: {
            debug: Function;
            info: Function;
            warning: Function;
            error: Function;
        };
    }
}

import "./rollbar";
import "./fullstory";
