import app from "app";
import loteo from "loteo";

export default {
    [app.constants.NAME]: app.reducer,
    [loteo.constants.NAME]: loteo.reducer
};
