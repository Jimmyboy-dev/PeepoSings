export function getOS(): OSString {
  var OSName: OSString = "Unknown OS"
  if (navigator.userAgent.indexOf("Win") != -1) OSName = "Windows"
  if (navigator.userAgent.indexOf("Mac") != -1) OSName = "MacOS"
  if (navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX"
  if (navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux"
  return OSName
}

export type OSString = "UNIX" | "Windows" | "MacOS" | "Linux" | "Unknown OS"
