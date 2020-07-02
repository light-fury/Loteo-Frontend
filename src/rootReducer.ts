import app from "app";
import auth from "auth";
import loteo from "loteo";

export default {
    [app.constants.NAME]: app.reducer,
    [auth.constants.NAME]: auth.reducer,
    [loteo.constants.NAME]: loteo.reducer
};
