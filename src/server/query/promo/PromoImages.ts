const TABLE_NAME = 'wikipet.promo_images';

export default {
    TABLE_NAME,

    SAVE_ALL: `INSERT INTO ${TABLE_NAME} (IMAGE_ID, PROMO_ID, IMAGE_PATH) VALUES ?`,

    DELETE_BY_PROMO_ID: `DELETE FROM ${TABLE_NAME} WHERE PROMO_ID = ?`
};