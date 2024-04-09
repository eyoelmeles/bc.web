import { SiteModel } from "../../../feature/site/model/site";

export const SET_SITE = 'SET_SITE';

export const setSite = (site: SiteModel) => ({
    type: SET_SITE,
    payload: site
});
