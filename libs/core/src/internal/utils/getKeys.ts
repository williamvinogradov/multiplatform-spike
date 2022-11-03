const getKeys = <T extends {}>(object: T) => Object.keys(object) as (keyof T)[];

export {getKeys};
