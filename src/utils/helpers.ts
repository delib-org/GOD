function getCookies() {
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  return ca.map((c) => {
    while (c.charAt(0) === " ") {
      c = c.substring(1); // eslint-disable-line no-param-reassign
    }
    return c.split("=");
  });
}

export function isLogged(): boolean {
  const cookies = getCookies();
  let isLoggedRes = false;
  cookies.forEach((cookie) => {
    console.log(cookie[0], cookie[1]);
    if (cookie[0] === "isLogged" && cookie[1] === "true") {
      isLoggedRes = true;
    }
  });
  return isLoggedRes;
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function getLastParamsFromURL(
  location: any
): string | undefined | false {
  try {
    const { pathname } = location;
    if (pathname) {
      const splitPathname = pathname.split("/");
      return splitPathname[splitPathname.length - 1];
    }
    throw new Error("Pathname was not found in the location");
  } catch (error) {
    console.info(location);
    console.error(error);
    return false;
  }
}
