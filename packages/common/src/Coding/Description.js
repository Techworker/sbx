const P_POSITION = Symbol('position');
const P_PARENT_POSITION = Symbol('parent_position');
const P_ID = Symbol('id');
const P_DESCRIPTION = Symbol('description');
const P_TYPE = Symbol('type');
const P_TYPEINFO = Symbol('type_info');

class Description
{
  position(position, parentPosition = '') {
    this[P_POSITION] = position;
    this[P_PARENT_POSITION] = parentPosition;
    return this;
  }

  id(id) {
    this[P_ID] = id;
    return this;
  }

  description(description) {
    this[P_DESCRIPTION] = description;
    return this;
  }

  type(type) {
    this[P_TYPE] = type;
    return this;
  }

  typeInfo(typeInfo) {
    this[P_TYPEINFO] = typeInfo;
    return this;
  }
}

module.exports = Description;
