function Mapper() {}
Mapper.prototype.foo = () => { return 'foo in Mapper'; };
Mapper.bar = () => { return 'bar in Mapper'; };

function ColumnMapper(...args) {
  const { constructor } = Object.getPrototypeOf(homeObject);
  const $this = Reflect.construct(constructor, args, new.target);

  $this.x = 43;
  return $this;
}
Object.setPrototypeOf(ColumnMapper, Mapper);
Object.setPrototypeOf(ColumnMapper.prototype, Mapper.prototype);
const homeObject = ColumnMapper.prototype;

const homeCtor = ColumnMapper;
const homeProto = ColumnMapper.prototype;

ColumnMapper.prototype.fooo = () => {
  return Object.getPrototypeOf(homeProto).foo.call(this);
};
ColumnMapper.barr = () => {
  return Object.getPrototypeOf(homeCtor).bar.call(this);
};
