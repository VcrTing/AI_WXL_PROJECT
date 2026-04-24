import { APP, BKD, BUSINESS, NET, NET_ENDPOINTS } from "@/conf/conf-net";
import { Net } from "./net";


export const app = new Net(
    NET.APP.URI + '/' + NET.APP.API, 
    NET_ENDPOINTS[ APP ],  APP,
    NET.APP.JWT_FUNCTION,
    NET.APP.TIMEOUT_GET, NET.APP.TIMEOUT_POS, NET.APP.IS_LOG
)

export const bkd = new Net(
    NET.BKD.URI + ( NET.BKD.API ? ('/' + NET.BKD.API) : '' ), 
    NET_ENDPOINTS[ BKD ],  BKD,
    NET.BKD.JWT_FUNCTION,
    NET.BKD.TIMEOUT_GET, NET.BKD.TIMEOUT_POS, NET.BKD.IS_LOG
) 

export const business = new Net(
    NET.BUSINESS.URI + ( NET.BUSINESS.API ? ('/' + NET.BUSINESS.API) : '' ), 
    NET_ENDPOINTS[ BUSINESS ],  BUSINESS,
    NET.BUSINESS.JWT_FUNCTION,
    NET.BUSINESS.TIMEOUT_GET, NET.BUSINESS.TIMEOUT_POS, NET.BUSINESS.IS_LOG
) 