import { SiteModel } from "../../../feature/site/model/site";
import { SET_SITE } from "./site_action";

const initialState: SiteModel | null = null;

const siteReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_SITE:
            return action.payload;
        default:
            return state;
    }
}

export default siteReducer;
