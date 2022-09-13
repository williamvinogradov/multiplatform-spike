// shadow equality
function shadowComparer(
  prev: unknown,
  next: unknown,
): boolean {
  const notReferenceTypes = !(prev instanceof Object) || !(next instanceof Object);

  if (notReferenceTypes) {
    return prev === next;
  }

  const prevObj = prev as {[index: string]: unknown};
  const nextObj = next as {[index: string]: unknown};
  const prevKeys = Object.keys(prevObj);
  const nextKeys = Object.keys(nextObj);

  if (prevKeys.length !== nextKeys.length) {
    return false;
  }

  for(let key of prevKeys) {
    if (prevObj[key] !== nextObj[key]) {
      return false;
    }
  }

  return true;
}

export {shadowComparer};
