type KeysOfUnion<ObjectType> = ObjectType extends unknown ? keyof ObjectType : never;

export type DistributedOmit<ObjectType, KeyType extends KeysOfUnion<ObjectType>> = ObjectType extends unknown
  ? Omit<ObjectType, KeyType>
  : never;
