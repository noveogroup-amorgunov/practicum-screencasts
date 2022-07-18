/**
 * @see https://stackoverflow.com/questions/8572826/generic-deep-diff-between-two-objects
 */
export const diffObjectsDeep = {
  VALUE_CREATED: 'created',
  VALUE_UPDATED: 'updated',
  VALUE_DELETED: 'deleted',
  VALUE_UNCHANGED: 'unchanged',
  map: function (obj1?: Indexed, obj2?: Indexed) {
    if (this.isFunction(obj1) || this.isFunction(obj2)) {
      throw 'Invalid argument. Function given, object expected.';
    }
    if (this.isValue(obj1) || this.isValue(obj2)) {
      const type = this.compareValues(obj1, obj2);

      if (type === this.VALUE_UNCHANGED) {
        return;
      }

      return {
        type,
        data: obj1 === undefined ? obj2 : obj1,
      };
    }

    var diff: Indexed = {};
    for (var key in obj1) {
      if (this.isFunction(obj1[key])) {
        continue;
      }

      var value2 = undefined;
      if (obj2 && obj2[key] !== undefined) {
        value2 = obj2[key];
      }

      diff[key] = this.map(obj1[key], value2);
    }
    for (var key in obj2) {
      if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
        continue;
      }

      diff[key] = this.map(undefined, obj2[key]);
    }

    return diff;
  },
  compareValues: function (value1: unknown, value2: unknown) {
    if (value1 === value2) {
      return this.VALUE_UNCHANGED;
    }
    if (
      this.isDate(value1) &&
      this.isDate(value2) &&
      value1.getTime() === value2.getTime()
    ) {
      return this.VALUE_UNCHANGED;
    }
    if (value1 === undefined) {
      return this.VALUE_CREATED;
    }
    if (value2 === undefined) {
      return this.VALUE_DELETED;
    }
    return this.VALUE_UPDATED;
  },
  isFunction: function (x: unknown): x is Function {
    return Object.prototype.toString.call(x) === '[object Function]';
  },
  isArray: function (x: unknown): x is any[] {
    return Object.prototype.toString.call(x) === '[object Array]';
  },
  isDate: function (x: unknown): x is Date {
    return Object.prototype.toString.call(x) === '[object Date]';
  },
  isObject: function (x: unknown): x is Indexed {
    return Object.prototype.toString.call(x) === '[object Object]';
  },
  isValue: function (x: unknown) {
    return !this.isObject(x) && !this.isArray(x);
  },
};
