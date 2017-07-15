import BaseCRUD from "./BaseCRUD";
import {executeQuery} from "../database/Pool";

export default class Type extends BaseCRUD {

    protected TABLE_NAME : string = 'WIKIPET.PROMO_Type';

    private GET_BY_NAME = 'SELECT * FROM ' + this.TABLE_NAME + ' WHERE TY_NAME = ?';

    public async getByName(name, connection) {
        return await executeQuery(this.GET_BY_NAME, [name], connection);
    }
}