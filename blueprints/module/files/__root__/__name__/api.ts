import {ApiCall} from "common/api";

export default {
    testMe() {
        return ApiCall("/ping");
    }
};
