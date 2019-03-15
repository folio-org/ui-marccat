// eslint-disable-next-line no-unused-vars
import { uniqueId } from 'lodash';

export function Resolver() {}
export function PathResolver() {}

Object.setPrototypeOf(PathResolver, Resolver);

PathResolver.resolve = () => {};
