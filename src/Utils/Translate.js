import { isString, isArray, isObject, forOwn } from 'lodash';

export function translateMessage(message, values, options = {}, stripes) {
  const { namespace } = options;
  const id = namespace ? `${namespace}.${message}` : message;
  return stripes.intl.formatMessage({ id }, values);
}

export function translateObject(message, values, options = {}, stripes) {
  const messageStr = message[options.key];
  const translated = translateMessage(messageStr, values, options, stripes);
  return Object.assign(message, { [options.key]: translated });
}

// Util function to handle some common translation use cases.
//
// string: message1 - translate(message1, values)
// map: { key1: message1, key2: message2 } - translate(map)
// array of objects: [ { id: 1, value: message1 }, { id: 2, value: message2 } ] - translate(array, {}, { key: 'value' })
//
// Available options:
//
// namespace - prefix each message
// key - used with array of objects to indicate which object's property should be translated
export function translate(message, values, options, stripes) {
  if (isString(message)) {
    return translateMessage(message, values, options, stripes);
  }

  if (isArray(message)) {
    return message.map(key => (isObject(key) ?
      translateObject(key, values, options, stripes) :
      translateMessage(key, values, options, stripes)));
  }

  if (isObject(message)) {
    const messages = {};
    forOwn(message, (value, key) => {
      messages[key] = translateMessage(value, values, options, stripes);
    });

    return messages;
  }

  return message;
}
