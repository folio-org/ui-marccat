
export class BaseModel {
    static type = '';
    static path = '';
    static relTypes = {};

    static pathFor(id) {
      return id ? `${this.path}/${id}` : this.path;
    }
}

export default function model({ type, path } = {}) {
  return (Class) => {
    const modelType = type || (Class.name).toLowerCase();
    const modelPath = path || `/${modelType}`;

    const relTypes = {};

    // eslint-disable-next-line no-unused-vars
    const { constructor, ...proto } = Object.getOwnPropertyDescriptors(Class.prototype);

    class Model extends BaseModel {
        static type = modelType;
        static path = modelPath;
        static relTypes = relTypes;
    }

    Object.defineProperty(Model, 'name', { value: `${Class.name}Model` });
    Object.defineProperties(Model.prototype, proto);

    return Model;
  };
}
