import {
  Entity,
  EntityResolver,
  HasAndBelongsToManyDefinition,
  relation,
  RelationType,
} from '../..';

export function hasAndBelongsToMany<U extends Entity, T extends Entity>(
  throughResolver: EntityResolver<U>,
  targetResolver: EntityResolver<T>,
  definition?: Partial<HasAndBelongsToManyDefinition>,
) {
  return function (decoratedTarget: object, key: string) {
    const meta: HasAndBelongsToManyDefinition = Object.assign(
      // Default values, can be customized by the caller
      {name: key},
      // Properties provided by the caller
      definition,
      // Properties enforced by the decorator
      {
        type: RelationType.hasAndBelongsToMany,
        targetsMany: true,
        source: decoratedTarget.constructor,
        target: targetResolver,
        through: {
          model: throughResolver,
        },
      },
    );
    relation(meta)(decoratedTarget, key);
  };
}
