import Logger from '@folio/stripes/logger';

/**
 *
 * @param  {Array<string>} categories
 * @returns logger - a new Logger
 */
export default function logger(...categories) {
  return new Logger(categories.join(','));
}
