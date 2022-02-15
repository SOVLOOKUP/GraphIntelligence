'use strict';

/**
 * db-address service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::db-address.db-address');
