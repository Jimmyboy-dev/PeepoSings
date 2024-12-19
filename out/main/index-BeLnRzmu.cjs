'use strict';

require('reflect-metadata');
const path = require('path');
const url = require('url');
const dotenv = require('dotenv');
const electronBetterIpc = require('electron-better-ipc');
const inversify = require('inversify');
const require$$0 = require('electron');
const typeorm = require('typeorm');
const fs = require('fs');
const ffBin = require('ffbinaries');
const ffmpeg$1 = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const ffmetadata = require('ffmetadata');
const sanitize = require('sanitize-filename');
const _ = require('lodash');
const chalk = require('chalk');
const ElectronStore = require('electron-store');
const windowStateKeeper = require('electron-window-state');
const require$$0$1 = require('events');
const require$$1 = require('child_process');
const require$$3 = require('https');
const require$$4 = require('os');
const require$$5 = require('stream');
const promises = require('fs/promises');
const yts = require('yt-search');
const DiscordRPC = require('discord-rpc');
const MetadataFilter = require('metadata-filter');
const axios = require('axios');
const fpcalcAsync = require('fpcalc-async');
const electronUpdater = require('electron-updater');
const log = require('electron-log');
const livePluginManager = require('live-plugin-manager');
const registerUnhandled = require('electron-unhandled');
const contextMenu = require('electron-context-menu');
const AutoLaunch = require('auto-launch');

function _interopNamespaceDefault(e) {
	const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
	if (e) {
		for (const k in e) {
			if (k !== 'default') {
				const d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: () => e[k]
				});
			}
		}
	}
	n.default = e;
	return Object.freeze(n);
}

const dotenv__namespace = /*#__PURE__*/_interopNamespaceDefault(dotenv);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var register = {};

var sourceMapSupport = {exports: {}};

var sourceMap = {};

var sourceMapGenerator = {};

var base64Vlq = {};

var base64 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredBase64;

function requireBase64 () {
	if (hasRequiredBase64) return base64;
	hasRequiredBase64 = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

	/**
	 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
	 */
	base64.encode = function (number) {
	  if (0 <= number && number < intToCharMap.length) {
	    return intToCharMap[number];
	  }
	  throw new TypeError("Must be between 0 and 63: " + number);
	};

	/**
	 * Decode a single base 64 character code digit to an integer. Returns -1 on
	 * failure.
	 */
	base64.decode = function (charCode) {
	  var bigA = 65;     // 'A'
	  var bigZ = 90;     // 'Z'

	  var littleA = 97;  // 'a'
	  var littleZ = 122; // 'z'

	  var zero = 48;     // '0'
	  var nine = 57;     // '9'

	  var plus = 43;     // '+'
	  var slash = 47;    // '/'

	  var littleOffset = 26;
	  var numberOffset = 52;

	  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
	  if (bigA <= charCode && charCode <= bigZ) {
	    return (charCode - bigA);
	  }

	  // 26 - 51: abcdefghijklmnopqrstuvwxyz
	  if (littleA <= charCode && charCode <= littleZ) {
	    return (charCode - littleA + littleOffset);
	  }

	  // 52 - 61: 0123456789
	  if (zero <= charCode && charCode <= nine) {
	    return (charCode - zero + numberOffset);
	  }

	  // 62: +
	  if (charCode == plus) {
	    return 62;
	  }

	  // 63: /
	  if (charCode == slash) {
	    return 63;
	  }

	  // Invalid base64 digit.
	  return -1;
	};
	return base64;
}

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredBase64Vlq;

function requireBase64Vlq () {
	if (hasRequiredBase64Vlq) return base64Vlq;
	hasRequiredBase64Vlq = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 *
	 * Based on the Base 64 VLQ implementation in Closure Compiler:
	 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	 *
	 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are
	 * met:
	 *
	 *  * Redistributions of source code must retain the above copyright
	 *    notice, this list of conditions and the following disclaimer.
	 *  * Redistributions in binary form must reproduce the above
	 *    copyright notice, this list of conditions and the following
	 *    disclaimer in the documentation and/or other materials provided
	 *    with the distribution.
	 *  * Neither the name of Google Inc. nor the names of its
	 *    contributors may be used to endorse or promote products derived
	 *    from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */

	var base64 = requireBase64();

	// A single base 64 digit can contain 6 bits of data. For the base 64 variable
	// length quantities we use in the source map spec, the first bit is the sign,
	// the next four bits are the actual value, and the 6th bit is the
	// continuation bit. The continuation bit tells us whether there are more
	// digits in this value following this digit.
	//
	//   Continuation
	//   |    Sign
	//   |    |
	//   V    V
	//   101011

	var VLQ_BASE_SHIFT = 5;

	// binary: 100000
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

	// binary: 011111
	var VLQ_BASE_MASK = VLQ_BASE - 1;

	// binary: 100000
	var VLQ_CONTINUATION_BIT = VLQ_BASE;

	/**
	 * Converts from a two-complement value to a value where the sign bit is
	 * placed in the least significant bit.  For example, as decimals:
	 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	 */
	function toVLQSigned(aValue) {
	  return aValue < 0
	    ? ((-aValue) << 1) + 1
	    : (aValue << 1) + 0;
	}

	/**
	 * Converts to a two-complement value from a value where the sign bit is
	 * placed in the least significant bit.  For example, as decimals:
	 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	 */
	function fromVLQSigned(aValue) {
	  var isNegative = (aValue & 1) === 1;
	  var shifted = aValue >> 1;
	  return isNegative
	    ? -shifted
	    : shifted;
	}

	/**
	 * Returns the base 64 VLQ encoded value.
	 */
	base64Vlq.encode = function base64VLQ_encode(aValue) {
	  var encoded = "";
	  var digit;

	  var vlq = toVLQSigned(aValue);

	  do {
	    digit = vlq & VLQ_BASE_MASK;
	    vlq >>>= VLQ_BASE_SHIFT;
	    if (vlq > 0) {
	      // There are still more digits in this value, so we must make sure the
	      // continuation bit is marked.
	      digit |= VLQ_CONTINUATION_BIT;
	    }
	    encoded += base64.encode(digit);
	  } while (vlq > 0);

	  return encoded;
	};

	/**
	 * Decodes the next base 64 VLQ value from the given string and returns the
	 * value and the rest of the string via the out parameter.
	 */
	base64Vlq.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
	  var strLen = aStr.length;
	  var result = 0;
	  var shift = 0;
	  var continuation, digit;

	  do {
	    if (aIndex >= strLen) {
	      throw new Error("Expected more digits in base 64 VLQ value.");
	    }

	    digit = base64.decode(aStr.charCodeAt(aIndex++));
	    if (digit === -1) {
	      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
	    }

	    continuation = !!(digit & VLQ_CONTINUATION_BIT);
	    digit &= VLQ_BASE_MASK;
	    result = result + (digit << shift);
	    shift += VLQ_BASE_SHIFT;
	  } while (continuation);

	  aOutParam.value = fromVLQSigned(result);
	  aOutParam.rest = aIndex;
	};
	return base64Vlq;
}

var util = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;
	(function (exports) {
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */

		/**
		 * This is a helper function for getting values from parameter/options
		 * objects.
		 *
		 * @param args The object we are extracting values from
		 * @param name The name of the property we are getting.
		 * @param defaultValue An optional value to return if the property is missing
		 * from the object. If this is not specified and the property is missing, an
		 * error will be thrown.
		 */
		function getArg(aArgs, aName, aDefaultValue) {
		  if (aName in aArgs) {
		    return aArgs[aName];
		  } else if (arguments.length === 3) {
		    return aDefaultValue;
		  } else {
		    throw new Error('"' + aName + '" is a required argument.');
		  }
		}
		exports.getArg = getArg;

		var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
		var dataUrlRegexp = /^data:.+\,.+$/;

		function urlParse(aUrl) {
		  var match = aUrl.match(urlRegexp);
		  if (!match) {
		    return null;
		  }
		  return {
		    scheme: match[1],
		    auth: match[2],
		    host: match[3],
		    port: match[4],
		    path: match[5]
		  };
		}
		exports.urlParse = urlParse;

		function urlGenerate(aParsedUrl) {
		  var url = '';
		  if (aParsedUrl.scheme) {
		    url += aParsedUrl.scheme + ':';
		  }
		  url += '//';
		  if (aParsedUrl.auth) {
		    url += aParsedUrl.auth + '@';
		  }
		  if (aParsedUrl.host) {
		    url += aParsedUrl.host;
		  }
		  if (aParsedUrl.port) {
		    url += ":" + aParsedUrl.port;
		  }
		  if (aParsedUrl.path) {
		    url += aParsedUrl.path;
		  }
		  return url;
		}
		exports.urlGenerate = urlGenerate;

		/**
		 * Normalizes a path, or the path portion of a URL:
		 *
		 * - Replaces consecutive slashes with one slash.
		 * - Removes unnecessary '.' parts.
		 * - Removes unnecessary '<dir>/..' parts.
		 *
		 * Based on code in the Node.js 'path' core module.
		 *
		 * @param aPath The path or url to normalize.
		 */
		function normalize(aPath) {
		  var path = aPath;
		  var url = urlParse(aPath);
		  if (url) {
		    if (!url.path) {
		      return aPath;
		    }
		    path = url.path;
		  }
		  var isAbsolute = exports.isAbsolute(path);

		  var parts = path.split(/\/+/);
		  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
		    part = parts[i];
		    if (part === '.') {
		      parts.splice(i, 1);
		    } else if (part === '..') {
		      up++;
		    } else if (up > 0) {
		      if (part === '') {
		        // The first part is blank if the path is absolute. Trying to go
		        // above the root is a no-op. Therefore we can remove all '..' parts
		        // directly after the root.
		        parts.splice(i + 1, up);
		        up = 0;
		      } else {
		        parts.splice(i, 2);
		        up--;
		      }
		    }
		  }
		  path = parts.join('/');

		  if (path === '') {
		    path = isAbsolute ? '/' : '.';
		  }

		  if (url) {
		    url.path = path;
		    return urlGenerate(url);
		  }
		  return path;
		}
		exports.normalize = normalize;

		/**
		 * Joins two paths/URLs.
		 *
		 * @param aRoot The root path or URL.
		 * @param aPath The path or URL to be joined with the root.
		 *
		 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
		 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
		 *   first.
		 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
		 *   is updated with the result and aRoot is returned. Otherwise the result
		 *   is returned.
		 *   - If aPath is absolute, the result is aPath.
		 *   - Otherwise the two paths are joined with a slash.
		 * - Joining for example 'http://' and 'www.example.com' is also supported.
		 */
		function join(aRoot, aPath) {
		  if (aRoot === "") {
		    aRoot = ".";
		  }
		  if (aPath === "") {
		    aPath = ".";
		  }
		  var aPathUrl = urlParse(aPath);
		  var aRootUrl = urlParse(aRoot);
		  if (aRootUrl) {
		    aRoot = aRootUrl.path || '/';
		  }

		  // `join(foo, '//www.example.org')`
		  if (aPathUrl && !aPathUrl.scheme) {
		    if (aRootUrl) {
		      aPathUrl.scheme = aRootUrl.scheme;
		    }
		    return urlGenerate(aPathUrl);
		  }

		  if (aPathUrl || aPath.match(dataUrlRegexp)) {
		    return aPath;
		  }

		  // `join('http://', 'www.example.com')`
		  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
		    aRootUrl.host = aPath;
		    return urlGenerate(aRootUrl);
		  }

		  var joined = aPath.charAt(0) === '/'
		    ? aPath
		    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

		  if (aRootUrl) {
		    aRootUrl.path = joined;
		    return urlGenerate(aRootUrl);
		  }
		  return joined;
		}
		exports.join = join;

		exports.isAbsolute = function (aPath) {
		  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
		};

		/**
		 * Make a path relative to a URL or another path.
		 *
		 * @param aRoot The root path or URL.
		 * @param aPath The path or URL to be made relative to aRoot.
		 */
		function relative(aRoot, aPath) {
		  if (aRoot === "") {
		    aRoot = ".";
		  }

		  aRoot = aRoot.replace(/\/$/, '');

		  // It is possible for the path to be above the root. In this case, simply
		  // checking whether the root is a prefix of the path won't work. Instead, we
		  // need to remove components from the root one by one, until either we find
		  // a prefix that fits, or we run out of components to remove.
		  var level = 0;
		  while (aPath.indexOf(aRoot + '/') !== 0) {
		    var index = aRoot.lastIndexOf("/");
		    if (index < 0) {
		      return aPath;
		    }

		    // If the only part of the root that is left is the scheme (i.e. http://,
		    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
		    // have exhausted all components, so the path is not relative to the root.
		    aRoot = aRoot.slice(0, index);
		    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
		      return aPath;
		    }

		    ++level;
		  }

		  // Make sure we add a "../" for each component we removed from the root.
		  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
		}
		exports.relative = relative;

		var supportsNullProto = (function () {
		  var obj = Object.create(null);
		  return !('__proto__' in obj);
		}());

		function identity (s) {
		  return s;
		}

		/**
		 * Because behavior goes wacky when you set `__proto__` on objects, we
		 * have to prefix all the strings in our set with an arbitrary character.
		 *
		 * See https://github.com/mozilla/source-map/pull/31 and
		 * https://github.com/mozilla/source-map/issues/30
		 *
		 * @param String aStr
		 */
		function toSetString(aStr) {
		  if (isProtoString(aStr)) {
		    return '$' + aStr;
		  }

		  return aStr;
		}
		exports.toSetString = supportsNullProto ? identity : toSetString;

		function fromSetString(aStr) {
		  if (isProtoString(aStr)) {
		    return aStr.slice(1);
		  }

		  return aStr;
		}
		exports.fromSetString = supportsNullProto ? identity : fromSetString;

		function isProtoString(s) {
		  if (!s) {
		    return false;
		  }

		  var length = s.length;

		  if (length < 9 /* "__proto__".length */) {
		    return false;
		  }

		  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
		      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
		      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
		      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
		      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
		      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
		      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
		      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
		      s.charCodeAt(length - 9) !== 95  /* '_' */) {
		    return false;
		  }

		  for (var i = length - 10; i >= 0; i--) {
		    if (s.charCodeAt(i) !== 36 /* '$' */) {
		      return false;
		    }
		  }

		  return true;
		}

		/**
		 * Comparator between two mappings where the original positions are compared.
		 *
		 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
		 * mappings with the same original source/line/column, but different generated
		 * line and column the same. Useful when searching for a mapping with a
		 * stubbed out mapping.
		 */
		function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		  var cmp = strcmp(mappingA.source, mappingB.source);
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalLine - mappingB.originalLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalColumn - mappingB.originalColumn;
		  if (cmp !== 0 || onlyCompareOriginal) {
		    return cmp;
		  }

		  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.generatedLine - mappingB.generatedLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  return strcmp(mappingA.name, mappingB.name);
		}
		exports.compareByOriginalPositions = compareByOriginalPositions;

		/**
		 * Comparator between two mappings with deflated source and name indices where
		 * the generated positions are compared.
		 *
		 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
		 * mappings with the same generated line and column, but different
		 * source/name/original line and column the same. Useful when searching for a
		 * mapping with a stubbed out mapping.
		 */
		function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		  var cmp = mappingA.generatedLine - mappingB.generatedLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		  if (cmp !== 0 || onlyCompareGenerated) {
		    return cmp;
		  }

		  cmp = strcmp(mappingA.source, mappingB.source);
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalLine - mappingB.originalLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalColumn - mappingB.originalColumn;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  return strcmp(mappingA.name, mappingB.name);
		}
		exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

		function strcmp(aStr1, aStr2) {
		  if (aStr1 === aStr2) {
		    return 0;
		  }

		  if (aStr1 === null) {
		    return 1; // aStr2 !== null
		  }

		  if (aStr2 === null) {
		    return -1; // aStr1 !== null
		  }

		  if (aStr1 > aStr2) {
		    return 1;
		  }

		  return -1;
		}

		/**
		 * Comparator between two mappings with inflated source and name strings where
		 * the generated positions are compared.
		 */
		function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		  var cmp = mappingA.generatedLine - mappingB.generatedLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = strcmp(mappingA.source, mappingB.source);
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalLine - mappingB.originalLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalColumn - mappingB.originalColumn;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  return strcmp(mappingA.name, mappingB.name);
		}
		exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

		/**
		 * Strip any JSON XSSI avoidance prefix from the string (as documented
		 * in the source maps specification), and then parse the string as
		 * JSON.
		 */
		function parseSourceMapInput(str) {
		  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
		}
		exports.parseSourceMapInput = parseSourceMapInput;

		/**
		 * Compute the URL of a source given the the source root, the source's
		 * URL, and the source map's URL.
		 */
		function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
		  sourceURL = sourceURL || '';

		  if (sourceRoot) {
		    // This follows what Chrome does.
		    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
		      sourceRoot += '/';
		    }
		    // The spec says:
		    //   Line 4: An optional source root, useful for relocating source
		    //   files on a server or removing repeated values in the
		    //   “sources” entry.  This value is prepended to the individual
		    //   entries in the “source” field.
		    sourceURL = sourceRoot + sourceURL;
		  }

		  // Historically, SourceMapConsumer did not take the sourceMapURL as
		  // a parameter.  This mode is still somewhat supported, which is why
		  // this code block is conditional.  However, it's preferable to pass
		  // the source map URL to SourceMapConsumer, so that this function
		  // can implement the source URL resolution algorithm as outlined in
		  // the spec.  This block is basically the equivalent of:
		  //    new URL(sourceURL, sourceMapURL).toString()
		  // ... except it avoids using URL, which wasn't available in the
		  // older releases of node still supported by this library.
		  //
		  // The spec says:
		  //   If the sources are not absolute URLs after prepending of the
		  //   “sourceRoot”, the sources are resolved relative to the
		  //   SourceMap (like resolving script src in a html document).
		  if (sourceMapURL) {
		    var parsed = urlParse(sourceMapURL);
		    if (!parsed) {
		      throw new Error("sourceMapURL could not be parsed");
		    }
		    if (parsed.path) {
		      // Strip the last path component, but keep the "/".
		      var index = parsed.path.lastIndexOf('/');
		      if (index >= 0) {
		        parsed.path = parsed.path.substring(0, index + 1);
		      }
		    }
		    sourceURL = join(urlGenerate(parsed), sourceURL);
		  }

		  return normalize(sourceURL);
		}
		exports.computeSourceURL = computeSourceURL; 
	} (util));
	return util;
}

var arraySet = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredArraySet;

function requireArraySet () {
	if (hasRequiredArraySet) return arraySet;
	hasRequiredArraySet = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var util = requireUtil();
	var has = Object.prototype.hasOwnProperty;
	var hasNativeMap = typeof Map !== "undefined";

	/**
	 * A data structure which is a combination of an array and a set. Adding a new
	 * member is O(1), testing for membership is O(1), and finding the index of an
	 * element is O(1). Removing elements from the set is not supported. Only
	 * strings are supported for membership.
	 */
	function ArraySet() {
	  this._array = [];
	  this._set = hasNativeMap ? new Map() : Object.create(null);
	}

	/**
	 * Static method for creating ArraySet instances from an existing array.
	 */
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
	  var set = new ArraySet();
	  for (var i = 0, len = aArray.length; i < len; i++) {
	    set.add(aArray[i], aAllowDuplicates);
	  }
	  return set;
	};

	/**
	 * Return how many unique items are in this ArraySet. If duplicates have been
	 * added, than those do not count towards the size.
	 *
	 * @returns Number
	 */
	ArraySet.prototype.size = function ArraySet_size() {
	  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
	};

	/**
	 * Add the given string to this set.
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
	  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
	  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
	  var idx = this._array.length;
	  if (!isDuplicate || aAllowDuplicates) {
	    this._array.push(aStr);
	  }
	  if (!isDuplicate) {
	    if (hasNativeMap) {
	      this._set.set(aStr, idx);
	    } else {
	      this._set[sStr] = idx;
	    }
	  }
	};

	/**
	 * Is the given string a member of this set?
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.has = function ArraySet_has(aStr) {
	  if (hasNativeMap) {
	    return this._set.has(aStr);
	  } else {
	    var sStr = util.toSetString(aStr);
	    return has.call(this._set, sStr);
	  }
	};

	/**
	 * What is the index of the given string in the array?
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
	  if (hasNativeMap) {
	    var idx = this._set.get(aStr);
	    if (idx >= 0) {
	        return idx;
	    }
	  } else {
	    var sStr = util.toSetString(aStr);
	    if (has.call(this._set, sStr)) {
	      return this._set[sStr];
	    }
	  }

	  throw new Error('"' + aStr + '" is not in the set.');
	};

	/**
	 * What is the element at the given index?
	 *
	 * @param Number aIdx
	 */
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
	  if (aIdx >= 0 && aIdx < this._array.length) {
	    return this._array[aIdx];
	  }
	  throw new Error('No element indexed by ' + aIdx);
	};

	/**
	 * Returns the array representation of this set (which has the proper indices
	 * indicated by indexOf). Note that this is a copy of the internal array used
	 * for storing the members so that no one can mess with internal state.
	 */
	ArraySet.prototype.toArray = function ArraySet_toArray() {
	  return this._array.slice();
	};

	arraySet.ArraySet = ArraySet;
	return arraySet;
}

var mappingList = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredMappingList;

function requireMappingList () {
	if (hasRequiredMappingList) return mappingList;
	hasRequiredMappingList = 1;
	/*
	 * Copyright 2014 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var util = requireUtil();

	/**
	 * Determine whether mappingB is after mappingA with respect to generated
	 * position.
	 */
	function generatedPositionAfter(mappingA, mappingB) {
	  // Optimized for most common case
	  var lineA = mappingA.generatedLine;
	  var lineB = mappingB.generatedLine;
	  var columnA = mappingA.generatedColumn;
	  var columnB = mappingB.generatedColumn;
	  return lineB > lineA || lineB == lineA && columnB >= columnA ||
	         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}

	/**
	 * A data structure to provide a sorted view of accumulated mappings in a
	 * performance conscious manner. It trades a neglibable overhead in general
	 * case for a large speedup in case of mappings being added in order.
	 */
	function MappingList() {
	  this._array = [];
	  this._sorted = true;
	  // Serves as infimum
	  this._last = {generatedLine: -1, generatedColumn: 0};
	}

	/**
	 * Iterate through internal items. This method takes the same arguments that
	 * `Array.prototype.forEach` takes.
	 *
	 * NOTE: The order of the mappings is NOT guaranteed.
	 */
	MappingList.prototype.unsortedForEach =
	  function MappingList_forEach(aCallback, aThisArg) {
	    this._array.forEach(aCallback, aThisArg);
	  };

	/**
	 * Add the given source mapping.
	 *
	 * @param Object aMapping
	 */
	MappingList.prototype.add = function MappingList_add(aMapping) {
	  if (generatedPositionAfter(this._last, aMapping)) {
	    this._last = aMapping;
	    this._array.push(aMapping);
	  } else {
	    this._sorted = false;
	    this._array.push(aMapping);
	  }
	};

	/**
	 * Returns the flat, sorted array of mappings. The mappings are sorted by
	 * generated position.
	 *
	 * WARNING: This method returns internal data without copying, for
	 * performance. The return value must NOT be mutated, and should be treated as
	 * an immutable borrow. If you want to take ownership, you must make your own
	 * copy.
	 */
	MappingList.prototype.toArray = function MappingList_toArray() {
	  if (!this._sorted) {
	    this._array.sort(util.compareByGeneratedPositionsInflated);
	    this._sorted = true;
	  }
	  return this._array;
	};

	mappingList.MappingList = MappingList;
	return mappingList;
}

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredSourceMapGenerator;

function requireSourceMapGenerator () {
	if (hasRequiredSourceMapGenerator) return sourceMapGenerator;
	hasRequiredSourceMapGenerator = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var base64VLQ = requireBase64Vlq();
	var util = requireUtil();
	var ArraySet = requireArraySet().ArraySet;
	var MappingList = requireMappingList().MappingList;

	/**
	 * An instance of the SourceMapGenerator represents a source map which is
	 * being built incrementally. You may pass an object with the following
	 * properties:
	 *
	 *   - file: The filename of the generated source.
	 *   - sourceRoot: A root for all relative URLs in this source map.
	 */
	function SourceMapGenerator(aArgs) {
	  if (!aArgs) {
	    aArgs = {};
	  }
	  this._file = util.getArg(aArgs, 'file', null);
	  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
	  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
	  this._sources = new ArraySet();
	  this._names = new ArraySet();
	  this._mappings = new MappingList();
	  this._sourcesContents = null;
	}

	SourceMapGenerator.prototype._version = 3;

	/**
	 * Creates a new SourceMapGenerator based on a SourceMapConsumer
	 *
	 * @param aSourceMapConsumer The SourceMap.
	 */
	SourceMapGenerator.fromSourceMap =
	  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
	    var sourceRoot = aSourceMapConsumer.sourceRoot;
	    var generator = new SourceMapGenerator({
	      file: aSourceMapConsumer.file,
	      sourceRoot: sourceRoot
	    });
	    aSourceMapConsumer.eachMapping(function (mapping) {
	      var newMapping = {
	        generated: {
	          line: mapping.generatedLine,
	          column: mapping.generatedColumn
	        }
	      };

	      if (mapping.source != null) {
	        newMapping.source = mapping.source;
	        if (sourceRoot != null) {
	          newMapping.source = util.relative(sourceRoot, newMapping.source);
	        }

	        newMapping.original = {
	          line: mapping.originalLine,
	          column: mapping.originalColumn
	        };

	        if (mapping.name != null) {
	          newMapping.name = mapping.name;
	        }
	      }

	      generator.addMapping(newMapping);
	    });
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var sourceRelative = sourceFile;
	      if (sourceRoot !== null) {
	        sourceRelative = util.relative(sourceRoot, sourceFile);
	      }

	      if (!generator._sources.has(sourceRelative)) {
	        generator._sources.add(sourceRelative);
	      }

	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        generator.setSourceContent(sourceFile, content);
	      }
	    });
	    return generator;
	  };

	/**
	 * Add a single mapping from original source line and column to the generated
	 * source's line and column for this source map being created. The mapping
	 * object should have the following properties:
	 *
	 *   - generated: An object with the generated line and column positions.
	 *   - original: An object with the original line and column positions.
	 *   - source: The original source file (relative to the sourceRoot).
	 *   - name: An optional original token name for this mapping.
	 */
	SourceMapGenerator.prototype.addMapping =
	  function SourceMapGenerator_addMapping(aArgs) {
	    var generated = util.getArg(aArgs, 'generated');
	    var original = util.getArg(aArgs, 'original', null);
	    var source = util.getArg(aArgs, 'source', null);
	    var name = util.getArg(aArgs, 'name', null);

	    if (!this._skipValidation) {
	      this._validateMapping(generated, original, source, name);
	    }

	    if (source != null) {
	      source = String(source);
	      if (!this._sources.has(source)) {
	        this._sources.add(source);
	      }
	    }

	    if (name != null) {
	      name = String(name);
	      if (!this._names.has(name)) {
	        this._names.add(name);
	      }
	    }

	    this._mappings.add({
	      generatedLine: generated.line,
	      generatedColumn: generated.column,
	      originalLine: original != null && original.line,
	      originalColumn: original != null && original.column,
	      source: source,
	      name: name
	    });
	  };

	/**
	 * Set the source content for a source file.
	 */
	SourceMapGenerator.prototype.setSourceContent =
	  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
	    var source = aSourceFile;
	    if (this._sourceRoot != null) {
	      source = util.relative(this._sourceRoot, source);
	    }

	    if (aSourceContent != null) {
	      // Add the source content to the _sourcesContents map.
	      // Create a new _sourcesContents map if the property is null.
	      if (!this._sourcesContents) {
	        this._sourcesContents = Object.create(null);
	      }
	      this._sourcesContents[util.toSetString(source)] = aSourceContent;
	    } else if (this._sourcesContents) {
	      // Remove the source file from the _sourcesContents map.
	      // If the _sourcesContents map is empty, set the property to null.
	      delete this._sourcesContents[util.toSetString(source)];
	      if (Object.keys(this._sourcesContents).length === 0) {
	        this._sourcesContents = null;
	      }
	    }
	  };

	/**
	 * Applies the mappings of a sub-source-map for a specific source file to the
	 * source map being generated. Each mapping to the supplied source file is
	 * rewritten using the supplied source map. Note: The resolution for the
	 * resulting mappings is the minimium of this map and the supplied map.
	 *
	 * @param aSourceMapConsumer The source map to be applied.
	 * @param aSourceFile Optional. The filename of the source file.
	 *        If omitted, SourceMapConsumer's file property will be used.
	 * @param aSourceMapPath Optional. The dirname of the path to the source map
	 *        to be applied. If relative, it is relative to the SourceMapConsumer.
	 *        This parameter is needed when the two source maps aren't in the same
	 *        directory, and the source map to be applied contains relative source
	 *        paths. If so, those relative source paths need to be rewritten
	 *        relative to the SourceMapGenerator.
	 */
	SourceMapGenerator.prototype.applySourceMap =
	  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
	    var sourceFile = aSourceFile;
	    // If aSourceFile is omitted, we will use the file property of the SourceMap
	    if (aSourceFile == null) {
	      if (aSourceMapConsumer.file == null) {
	        throw new Error(
	          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
	          'or the source map\'s "file" property. Both were omitted.'
	        );
	      }
	      sourceFile = aSourceMapConsumer.file;
	    }
	    var sourceRoot = this._sourceRoot;
	    // Make "sourceFile" relative if an absolute Url is passed.
	    if (sourceRoot != null) {
	      sourceFile = util.relative(sourceRoot, sourceFile);
	    }
	    // Applying the SourceMap can add and remove items from the sources and
	    // the names array.
	    var newSources = new ArraySet();
	    var newNames = new ArraySet();

	    // Find mappings for the "sourceFile"
	    this._mappings.unsortedForEach(function (mapping) {
	      if (mapping.source === sourceFile && mapping.originalLine != null) {
	        // Check if it can be mapped by the source map, then update the mapping.
	        var original = aSourceMapConsumer.originalPositionFor({
	          line: mapping.originalLine,
	          column: mapping.originalColumn
	        });
	        if (original.source != null) {
	          // Copy mapping
	          mapping.source = original.source;
	          if (aSourceMapPath != null) {
	            mapping.source = util.join(aSourceMapPath, mapping.source);
	          }
	          if (sourceRoot != null) {
	            mapping.source = util.relative(sourceRoot, mapping.source);
	          }
	          mapping.originalLine = original.line;
	          mapping.originalColumn = original.column;
	          if (original.name != null) {
	            mapping.name = original.name;
	          }
	        }
	      }

	      var source = mapping.source;
	      if (source != null && !newSources.has(source)) {
	        newSources.add(source);
	      }

	      var name = mapping.name;
	      if (name != null && !newNames.has(name)) {
	        newNames.add(name);
	      }

	    }, this);
	    this._sources = newSources;
	    this._names = newNames;

	    // Copy sourcesContents of applied map.
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        if (aSourceMapPath != null) {
	          sourceFile = util.join(aSourceMapPath, sourceFile);
	        }
	        if (sourceRoot != null) {
	          sourceFile = util.relative(sourceRoot, sourceFile);
	        }
	        this.setSourceContent(sourceFile, content);
	      }
	    }, this);
	  };

	/**
	 * A mapping can have one of the three levels of data:
	 *
	 *   1. Just the generated position.
	 *   2. The Generated position, original position, and original source.
	 *   3. Generated and original position, original source, as well as a name
	 *      token.
	 *
	 * To maintain consistency, we validate that any new mapping being added falls
	 * in to one of these categories.
	 */
	SourceMapGenerator.prototype._validateMapping =
	  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
	                                              aName) {
	    // When aOriginal is truthy but has empty values for .line and .column,
	    // it is most likely a programmer error. In this case we throw a very
	    // specific error message to try to guide them the right way.
	    // For example: https://github.com/Polymer/polymer-bundler/pull/519
	    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
	        throw new Error(
	            'original.line and original.column are not numbers -- you probably meant to omit ' +
	            'the original mapping entirely and only map the generated position. If so, pass ' +
	            'null for the original mapping instead of an object with empty or null values.'
	        );
	    }

	    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	        && aGenerated.line > 0 && aGenerated.column >= 0
	        && !aOriginal && !aSource && !aName) {
	      // Case 1.
	      return;
	    }
	    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
	             && aGenerated.line > 0 && aGenerated.column >= 0
	             && aOriginal.line > 0 && aOriginal.column >= 0
	             && aSource) {
	      // Cases 2 and 3.
	      return;
	    }
	    else {
	      throw new Error('Invalid mapping: ' + JSON.stringify({
	        generated: aGenerated,
	        source: aSource,
	        original: aOriginal,
	        name: aName
	      }));
	    }
	  };

	/**
	 * Serialize the accumulated mappings in to the stream of base 64 VLQs
	 * specified by the source map format.
	 */
	SourceMapGenerator.prototype._serializeMappings =
	  function SourceMapGenerator_serializeMappings() {
	    var previousGeneratedColumn = 0;
	    var previousGeneratedLine = 1;
	    var previousOriginalColumn = 0;
	    var previousOriginalLine = 0;
	    var previousName = 0;
	    var previousSource = 0;
	    var result = '';
	    var next;
	    var mapping;
	    var nameIdx;
	    var sourceIdx;

	    var mappings = this._mappings.toArray();
	    for (var i = 0, len = mappings.length; i < len; i++) {
	      mapping = mappings[i];
	      next = '';

	      if (mapping.generatedLine !== previousGeneratedLine) {
	        previousGeneratedColumn = 0;
	        while (mapping.generatedLine !== previousGeneratedLine) {
	          next += ';';
	          previousGeneratedLine++;
	        }
	      }
	      else {
	        if (i > 0) {
	          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
	            continue;
	          }
	          next += ',';
	        }
	      }

	      next += base64VLQ.encode(mapping.generatedColumn
	                                 - previousGeneratedColumn);
	      previousGeneratedColumn = mapping.generatedColumn;

	      if (mapping.source != null) {
	        sourceIdx = this._sources.indexOf(mapping.source);
	        next += base64VLQ.encode(sourceIdx - previousSource);
	        previousSource = sourceIdx;

	        // lines are stored 0-based in SourceMap spec version 3
	        next += base64VLQ.encode(mapping.originalLine - 1
	                                   - previousOriginalLine);
	        previousOriginalLine = mapping.originalLine - 1;

	        next += base64VLQ.encode(mapping.originalColumn
	                                   - previousOriginalColumn);
	        previousOriginalColumn = mapping.originalColumn;

	        if (mapping.name != null) {
	          nameIdx = this._names.indexOf(mapping.name);
	          next += base64VLQ.encode(nameIdx - previousName);
	          previousName = nameIdx;
	        }
	      }

	      result += next;
	    }

	    return result;
	  };

	SourceMapGenerator.prototype._generateSourcesContent =
	  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
	    return aSources.map(function (source) {
	      if (!this._sourcesContents) {
	        return null;
	      }
	      if (aSourceRoot != null) {
	        source = util.relative(aSourceRoot, source);
	      }
	      var key = util.toSetString(source);
	      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
	        ? this._sourcesContents[key]
	        : null;
	    }, this);
	  };

	/**
	 * Externalize the source map.
	 */
	SourceMapGenerator.prototype.toJSON =
	  function SourceMapGenerator_toJSON() {
	    var map = {
	      version: this._version,
	      sources: this._sources.toArray(),
	      names: this._names.toArray(),
	      mappings: this._serializeMappings()
	    };
	    if (this._file != null) {
	      map.file = this._file;
	    }
	    if (this._sourceRoot != null) {
	      map.sourceRoot = this._sourceRoot;
	    }
	    if (this._sourcesContents) {
	      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
	    }

	    return map;
	  };

	/**
	 * Render the source map being generated to a string.
	 */
	SourceMapGenerator.prototype.toString =
	  function SourceMapGenerator_toString() {
	    return JSON.stringify(this.toJSON());
	  };

	sourceMapGenerator.SourceMapGenerator = SourceMapGenerator;
	return sourceMapGenerator;
}

var sourceMapConsumer = {};

var binarySearch = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredBinarySearch;

function requireBinarySearch () {
	if (hasRequiredBinarySearch) return binarySearch;
	hasRequiredBinarySearch = 1;
	(function (exports) {
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */

		exports.GREATEST_LOWER_BOUND = 1;
		exports.LEAST_UPPER_BOUND = 2;

		/**
		 * Recursive implementation of binary search.
		 *
		 * @param aLow Indices here and lower do not contain the needle.
		 * @param aHigh Indices here and higher do not contain the needle.
		 * @param aNeedle The element being searched for.
		 * @param aHaystack The non-empty array being searched.
		 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
		 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
		 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
		 *     closest element that is smaller than or greater than the one we are
		 *     searching for, respectively, if the exact element cannot be found.
		 */
		function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
		  // This function terminates when one of the following is true:
		  //
		  //   1. We find the exact element we are looking for.
		  //
		  //   2. We did not find the exact element, but we can return the index of
		  //      the next-closest element.
		  //
		  //   3. We did not find the exact element, and there is no next-closest
		  //      element than the one we are searching for, so we return -1.
		  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
		  var cmp = aCompare(aNeedle, aHaystack[mid], true);
		  if (cmp === 0) {
		    // Found the element we are looking for.
		    return mid;
		  }
		  else if (cmp > 0) {
		    // Our needle is greater than aHaystack[mid].
		    if (aHigh - mid > 1) {
		      // The element is in the upper half.
		      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
		    }

		    // The exact needle element was not found in this haystack. Determine if
		    // we are in termination case (3) or (2) and return the appropriate thing.
		    if (aBias == exports.LEAST_UPPER_BOUND) {
		      return aHigh < aHaystack.length ? aHigh : -1;
		    } else {
		      return mid;
		    }
		  }
		  else {
		    // Our needle is less than aHaystack[mid].
		    if (mid - aLow > 1) {
		      // The element is in the lower half.
		      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
		    }

		    // we are in termination case (3) or (2) and return the appropriate thing.
		    if (aBias == exports.LEAST_UPPER_BOUND) {
		      return mid;
		    } else {
		      return aLow < 0 ? -1 : aLow;
		    }
		  }
		}

		/**
		 * This is an implementation of binary search which will always try and return
		 * the index of the closest element if there is no exact hit. This is because
		 * mappings between original and generated line/col pairs are single points,
		 * and there is an implicit region between each of them, so a miss just means
		 * that you aren't on the very start of a region.
		 *
		 * @param aNeedle The element you are looking for.
		 * @param aHaystack The array that is being searched.
		 * @param aCompare A function which takes the needle and an element in the
		 *     array and returns -1, 0, or 1 depending on whether the needle is less
		 *     than, equal to, or greater than the element, respectively.
		 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
		 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
		 *     closest element that is smaller than or greater than the one we are
		 *     searching for, respectively, if the exact element cannot be found.
		 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
		 */
		exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
		  if (aHaystack.length === 0) {
		    return -1;
		  }

		  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
		                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
		  if (index < 0) {
		    return -1;
		  }

		  // We have found either the exact element, or the next-closest element than
		  // the one we are searching for. However, there may be more than one such
		  // element. Make sure we always return the smallest of these.
		  while (index - 1 >= 0) {
		    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
		      break;
		    }
		    --index;
		  }

		  return index;
		}; 
	} (binarySearch));
	return binarySearch;
}

var quickSort = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredQuickSort;

function requireQuickSort () {
	if (hasRequiredQuickSort) return quickSort;
	hasRequiredQuickSort = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	// It turns out that some (most?) JavaScript engines don't self-host
	// `Array.prototype.sort`. This makes sense because C++ will likely remain
	// faster than JS when doing raw CPU-intensive sorting. However, when using a
	// custom comparator function, calling back and forth between the VM's C++ and
	// JIT'd JS is rather slow *and* loses JIT type information, resulting in
	// worse generated code for the comparator function than would be optimal. In
	// fact, when sorting with a comparator, these costs outweigh the benefits of
	// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
	// a ~3500ms mean speed-up in `bench/bench.html`.

	/**
	 * Swap the elements indexed by `x` and `y` in the array `ary`.
	 *
	 * @param {Array} ary
	 *        The array.
	 * @param {Number} x
	 *        The index of the first item.
	 * @param {Number} y
	 *        The index of the second item.
	 */
	function swap(ary, x, y) {
	  var temp = ary[x];
	  ary[x] = ary[y];
	  ary[y] = temp;
	}

	/**
	 * Returns a random integer within the range `low .. high` inclusive.
	 *
	 * @param {Number} low
	 *        The lower bound on the range.
	 * @param {Number} high
	 *        The upper bound on the range.
	 */
	function randomIntInRange(low, high) {
	  return Math.round(low + (Math.random() * (high - low)));
	}

	/**
	 * The Quick Sort algorithm.
	 *
	 * @param {Array} ary
	 *        An array to sort.
	 * @param {function} comparator
	 *        Function to use to compare two items.
	 * @param {Number} p
	 *        Start index of the array
	 * @param {Number} r
	 *        End index of the array
	 */
	function doQuickSort(ary, comparator, p, r) {
	  // If our lower bound is less than our upper bound, we (1) partition the
	  // array into two pieces and (2) recurse on each half. If it is not, this is
	  // the empty array and our base case.

	  if (p < r) {
	    // (1) Partitioning.
	    //
	    // The partitioning chooses a pivot between `p` and `r` and moves all
	    // elements that are less than or equal to the pivot to the before it, and
	    // all the elements that are greater than it after it. The effect is that
	    // once partition is done, the pivot is in the exact place it will be when
	    // the array is put in sorted order, and it will not need to be moved
	    // again. This runs in O(n) time.

	    // Always choose a random pivot so that an input array which is reverse
	    // sorted does not cause O(n^2) running time.
	    var pivotIndex = randomIntInRange(p, r);
	    var i = p - 1;

	    swap(ary, pivotIndex, r);
	    var pivot = ary[r];

	    // Immediately after `j` is incremented in this loop, the following hold
	    // true:
	    //
	    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
	    //
	    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
	    for (var j = p; j < r; j++) {
	      if (comparator(ary[j], pivot) <= 0) {
	        i += 1;
	        swap(ary, i, j);
	      }
	    }

	    swap(ary, i + 1, j);
	    var q = i + 1;

	    // (2) Recurse on each half.

	    doQuickSort(ary, comparator, p, q - 1);
	    doQuickSort(ary, comparator, q + 1, r);
	  }
	}

	/**
	 * Sort the given array in-place with the given comparator function.
	 *
	 * @param {Array} ary
	 *        An array to sort.
	 * @param {function} comparator
	 *        Function to use to compare two items.
	 */
	quickSort.quickSort = function (ary, comparator) {
	  doQuickSort(ary, comparator, 0, ary.length - 1);
	};
	return quickSort;
}

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredSourceMapConsumer;

function requireSourceMapConsumer () {
	if (hasRequiredSourceMapConsumer) return sourceMapConsumer;
	hasRequiredSourceMapConsumer = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var util = requireUtil();
	var binarySearch = requireBinarySearch();
	var ArraySet = requireArraySet().ArraySet;
	var base64VLQ = requireBase64Vlq();
	var quickSort = requireQuickSort().quickSort;

	function SourceMapConsumer(aSourceMap, aSourceMapURL) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = util.parseSourceMapInput(aSourceMap);
	  }

	  return sourceMap.sections != null
	    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
	    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
	}

	SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
	  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
	};

	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	SourceMapConsumer.prototype._version = 3;

	// `__generatedMappings` and `__originalMappings` are arrays that hold the
	// parsed mapping coordinates from the source map's "mappings" attribute. They
	// are lazily instantiated, accessed via the `_generatedMappings` and
	// `_originalMappings` getters respectively, and we only parse the mappings
	// and create these arrays once queried for a source location. We jump through
	// these hoops because there can be many thousands of mappings, and parsing
	// them is expensive, so we only want to do it if we must.
	//
	// Each object in the arrays is of the form:
	//
	//     {
	//       generatedLine: The line number in the generated code,
	//       generatedColumn: The column number in the generated code,
	//       source: The path to the original source file that generated this
	//               chunk of code,
	//       originalLine: The line number in the original source that
	//                     corresponds to this chunk of generated code,
	//       originalColumn: The column number in the original source that
	//                       corresponds to this chunk of generated code,
	//       name: The name of the original symbol which generated this chunk of
	//             code.
	//     }
	//
	// All properties except for `generatedLine` and `generatedColumn` can be
	// `null`.
	//
	// `_generatedMappings` is ordered by the generated positions.
	//
	// `_originalMappings` is ordered by the original positions.

	SourceMapConsumer.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
	  configurable: true,
	  enumerable: true,
	  get: function () {
	    if (!this.__generatedMappings) {
	      this._parseMappings(this._mappings, this.sourceRoot);
	    }

	    return this.__generatedMappings;
	  }
	});

	SourceMapConsumer.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
	  configurable: true,
	  enumerable: true,
	  get: function () {
	    if (!this.__originalMappings) {
	      this._parseMappings(this._mappings, this.sourceRoot);
	    }

	    return this.__originalMappings;
	  }
	});

	SourceMapConsumer.prototype._charIsMappingSeparator =
	  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
	    var c = aStr.charAt(index);
	    return c === ";" || c === ",";
	  };

	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */
	SourceMapConsumer.prototype._parseMappings =
	  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    throw new Error("Subclasses must implement _parseMappings");
	  };

	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;

	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;

	/**
	 * Iterate over each mapping between an original source/line/column and a
	 * generated line/column in this source map.
	 *
	 * @param Function aCallback
	 *        The function that is called with each mapping.
	 * @param Object aContext
	 *        Optional. If specified, this object will be the value of `this` every
	 *        time that `aCallback` is called.
	 * @param aOrder
	 *        Either `SourceMapConsumer.GENERATED_ORDER` or
	 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	 *        iterate over the mappings sorted by the generated file's line/column
	 *        order or the original's source/line/column order, respectively. Defaults to
	 *        `SourceMapConsumer.GENERATED_ORDER`.
	 */
	SourceMapConsumer.prototype.eachMapping =
	  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
	    var context = aContext || null;
	    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

	    var mappings;
	    switch (order) {
	    case SourceMapConsumer.GENERATED_ORDER:
	      mappings = this._generatedMappings;
	      break;
	    case SourceMapConsumer.ORIGINAL_ORDER:
	      mappings = this._originalMappings;
	      break;
	    default:
	      throw new Error("Unknown order of iteration.");
	    }

	    var sourceRoot = this.sourceRoot;
	    mappings.map(function (mapping) {
	      var source = mapping.source === null ? null : this._sources.at(mapping.source);
	      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
	      return {
	        source: source,
	        generatedLine: mapping.generatedLine,
	        generatedColumn: mapping.generatedColumn,
	        originalLine: mapping.originalLine,
	        originalColumn: mapping.originalColumn,
	        name: mapping.name === null ? null : this._names.at(mapping.name)
	      };
	    }, this).forEach(aCallback, context);
	  };

	/**
	 * Returns all generated line and column information for the original source,
	 * line, and column provided. If no column is provided, returns all mappings
	 * corresponding to a either the line we are searching for or the next
	 * closest line that has any mappings. Otherwise, returns all mappings
	 * corresponding to the given line and either the column we are searching for
	 * or the next closest column that has any offsets.
	 *
	 * The only argument is an object with the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.  The line number is 1-based.
	 *   - column: Optional. the column number in the original source.
	 *    The column number is 0-based.
	 *
	 * and an array of objects is returned, each with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.  The
	 *    line number is 1-based.
	 *   - column: The column number in the generated source, or null.
	 *    The column number is 0-based.
	 */
	SourceMapConsumer.prototype.allGeneratedPositionsFor =
	  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
	    var line = util.getArg(aArgs, 'line');

	    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
	    // returns the index of the closest mapping less than the needle. By
	    // setting needle.originalColumn to 0, we thus find the last mapping for
	    // the given line, provided such a mapping exists.
	    var needle = {
	      source: util.getArg(aArgs, 'source'),
	      originalLine: line,
	      originalColumn: util.getArg(aArgs, 'column', 0)
	    };

	    needle.source = this._findSourceIndex(needle.source);
	    if (needle.source < 0) {
	      return [];
	    }

	    var mappings = [];

	    var index = this._findMapping(needle,
	                                  this._originalMappings,
	                                  "originalLine",
	                                  "originalColumn",
	                                  util.compareByOriginalPositions,
	                                  binarySearch.LEAST_UPPER_BOUND);
	    if (index >= 0) {
	      var mapping = this._originalMappings[index];

	      if (aArgs.column === undefined) {
	        var originalLine = mapping.originalLine;

	        // Iterate until either we run out of mappings, or we run into
	        // a mapping for a different line than the one we found. Since
	        // mappings are sorted, this is guaranteed to find all mappings for
	        // the line we found.
	        while (mapping && mapping.originalLine === originalLine) {
	          mappings.push({
	            line: util.getArg(mapping, 'generatedLine', null),
	            column: util.getArg(mapping, 'generatedColumn', null),
	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	          });

	          mapping = this._originalMappings[++index];
	        }
	      } else {
	        var originalColumn = mapping.originalColumn;

	        // Iterate until either we run out of mappings, or we run into
	        // a mapping for a different line than the one we were searching for.
	        // Since mappings are sorted, this is guaranteed to find all mappings for
	        // the line we are searching for.
	        while (mapping &&
	               mapping.originalLine === line &&
	               mapping.originalColumn == originalColumn) {
	          mappings.push({
	            line: util.getArg(mapping, 'generatedLine', null),
	            column: util.getArg(mapping, 'generatedColumn', null),
	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	          });

	          mapping = this._originalMappings[++index];
	        }
	      }
	    }

	    return mappings;
	  };

	sourceMapConsumer.SourceMapConsumer = SourceMapConsumer;

	/**
	 * A BasicSourceMapConsumer instance represents a parsed source map which we can
	 * query for information about the original file positions by giving it a file
	 * position in the generated source.
	 *
	 * The first parameter is the raw source map (either as a JSON string, or
	 * already parsed to an object). According to the spec, source maps have the
	 * following attributes:
	 *
	 *   - version: Which version of the source map spec this map is following.
	 *   - sources: An array of URLs to the original source files.
	 *   - names: An array of identifiers which can be referrenced by individual mappings.
	 *   - sourceRoot: Optional. The URL root from which all sources are relative.
	 *   - sourcesContent: Optional. An array of contents of the original source files.
	 *   - mappings: A string of base64 VLQs which contain the actual mappings.
	 *   - file: Optional. The generated file this source map is associated with.
	 *
	 * Here is an example source map, taken from the source map spec[0]:
	 *
	 *     {
	 *       version : 3,
	 *       file: "out.js",
	 *       sourceRoot : "",
	 *       sources: ["foo.js", "bar.js"],
	 *       names: ["src", "maps", "are", "fun"],
	 *       mappings: "AA,AB;;ABCDE;"
	 *     }
	 *
	 * The second parameter, if given, is a string whose value is the URL
	 * at which the source map was found.  This URL is used to compute the
	 * sources array.
	 *
	 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	 */
	function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = util.parseSourceMapInput(aSourceMap);
	  }

	  var version = util.getArg(sourceMap, 'version');
	  var sources = util.getArg(sourceMap, 'sources');
	  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
	  // requires the array) to play nice here.
	  var names = util.getArg(sourceMap, 'names', []);
	  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
	  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
	  var mappings = util.getArg(sourceMap, 'mappings');
	  var file = util.getArg(sourceMap, 'file', null);

	  // Once again, Sass deviates from the spec and supplies the version as a
	  // string rather than a number, so we use loose equality checking here.
	  if (version != this._version) {
	    throw new Error('Unsupported version: ' + version);
	  }

	  if (sourceRoot) {
	    sourceRoot = util.normalize(sourceRoot);
	  }

	  sources = sources
	    .map(String)
	    // Some source maps produce relative source paths like "./foo.js" instead of
	    // "foo.js".  Normalize these first so that future comparisons will succeed.
	    // See bugzil.la/1090768.
	    .map(util.normalize)
	    // Always ensure that absolute sources are internally stored relative to
	    // the source root, if the source root is absolute. Not doing this would
	    // be particularly problematic when the source root is a prefix of the
	    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
	    .map(function (source) {
	      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
	        ? util.relative(sourceRoot, source)
	        : source;
	    });

	  // Pass `true` below to allow duplicate names and sources. While source maps
	  // are intended to be compressed and deduplicated, the TypeScript compiler
	  // sometimes generates source maps with duplicates in them. See Github issue
	  // #72 and bugzil.la/889492.
	  this._names = ArraySet.fromArray(names.map(String), true);
	  this._sources = ArraySet.fromArray(sources, true);

	  this._absoluteSources = this._sources.toArray().map(function (s) {
	    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
	  });

	  this.sourceRoot = sourceRoot;
	  this.sourcesContent = sourcesContent;
	  this._mappings = mappings;
	  this._sourceMapURL = aSourceMapURL;
	  this.file = file;
	}

	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

	/**
	 * Utility function to find the index of a source.  Returns -1 if not
	 * found.
	 */
	BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
	  var relativeSource = aSource;
	  if (this.sourceRoot != null) {
	    relativeSource = util.relative(this.sourceRoot, relativeSource);
	  }

	  if (this._sources.has(relativeSource)) {
	    return this._sources.indexOf(relativeSource);
	  }

	  // Maybe aSource is an absolute URL as returned by |sources|.  In
	  // this case we can't simply undo the transform.
	  var i;
	  for (i = 0; i < this._absoluteSources.length; ++i) {
	    if (this._absoluteSources[i] == aSource) {
	      return i;
	    }
	  }

	  return -1;
	};

	/**
	 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
	 *
	 * @param SourceMapGenerator aSourceMap
	 *        The source map that will be consumed.
	 * @param String aSourceMapURL
	 *        The URL at which the source map can be found (optional)
	 * @returns BasicSourceMapConsumer
	 */
	BasicSourceMapConsumer.fromSourceMap =
	  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
	    var smc = Object.create(BasicSourceMapConsumer.prototype);

	    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
	    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
	    smc.sourceRoot = aSourceMap._sourceRoot;
	    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
	                                                            smc.sourceRoot);
	    smc.file = aSourceMap._file;
	    smc._sourceMapURL = aSourceMapURL;
	    smc._absoluteSources = smc._sources.toArray().map(function (s) {
	      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
	    });

	    // Because we are modifying the entries (by converting string sources and
	    // names to indices into the sources and names ArraySets), we have to make
	    // a copy of the entry or else bad things happen. Shared mutable state
	    // strikes again! See github issue #191.

	    var generatedMappings = aSourceMap._mappings.toArray().slice();
	    var destGeneratedMappings = smc.__generatedMappings = [];
	    var destOriginalMappings = smc.__originalMappings = [];

	    for (var i = 0, length = generatedMappings.length; i < length; i++) {
	      var srcMapping = generatedMappings[i];
	      var destMapping = new Mapping;
	      destMapping.generatedLine = srcMapping.generatedLine;
	      destMapping.generatedColumn = srcMapping.generatedColumn;

	      if (srcMapping.source) {
	        destMapping.source = sources.indexOf(srcMapping.source);
	        destMapping.originalLine = srcMapping.originalLine;
	        destMapping.originalColumn = srcMapping.originalColumn;

	        if (srcMapping.name) {
	          destMapping.name = names.indexOf(srcMapping.name);
	        }

	        destOriginalMappings.push(destMapping);
	      }

	      destGeneratedMappings.push(destMapping);
	    }

	    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

	    return smc;
	  };

	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	BasicSourceMapConsumer.prototype._version = 3;

	/**
	 * The list of original sources.
	 */
	Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
	  get: function () {
	    return this._absoluteSources.slice();
	  }
	});

	/**
	 * Provide the JIT with a nice shape / hidden class.
	 */
	function Mapping() {
	  this.generatedLine = 0;
	  this.generatedColumn = 0;
	  this.source = null;
	  this.originalLine = null;
	  this.originalColumn = null;
	  this.name = null;
	}

	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */
	BasicSourceMapConsumer.prototype._parseMappings =
	  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    var generatedLine = 1;
	    var previousGeneratedColumn = 0;
	    var previousOriginalLine = 0;
	    var previousOriginalColumn = 0;
	    var previousSource = 0;
	    var previousName = 0;
	    var length = aStr.length;
	    var index = 0;
	    var cachedSegments = {};
	    var temp = {};
	    var originalMappings = [];
	    var generatedMappings = [];
	    var mapping, str, segment, end, value;

	    while (index < length) {
	      if (aStr.charAt(index) === ';') {
	        generatedLine++;
	        index++;
	        previousGeneratedColumn = 0;
	      }
	      else if (aStr.charAt(index) === ',') {
	        index++;
	      }
	      else {
	        mapping = new Mapping();
	        mapping.generatedLine = generatedLine;

	        // Because each offset is encoded relative to the previous one,
	        // many segments often have the same encoding. We can exploit this
	        // fact by caching the parsed variable length fields of each segment,
	        // allowing us to avoid a second parse if we encounter the same
	        // segment again.
	        for (end = index; end < length; end++) {
	          if (this._charIsMappingSeparator(aStr, end)) {
	            break;
	          }
	        }
	        str = aStr.slice(index, end);

	        segment = cachedSegments[str];
	        if (segment) {
	          index += str.length;
	        } else {
	          segment = [];
	          while (index < end) {
	            base64VLQ.decode(aStr, index, temp);
	            value = temp.value;
	            index = temp.rest;
	            segment.push(value);
	          }

	          if (segment.length === 2) {
	            throw new Error('Found a source, but no line and column');
	          }

	          if (segment.length === 3) {
	            throw new Error('Found a source and line, but no column');
	          }

	          cachedSegments[str] = segment;
	        }

	        // Generated column.
	        mapping.generatedColumn = previousGeneratedColumn + segment[0];
	        previousGeneratedColumn = mapping.generatedColumn;

	        if (segment.length > 1) {
	          // Original source.
	          mapping.source = previousSource + segment[1];
	          previousSource += segment[1];

	          // Original line.
	          mapping.originalLine = previousOriginalLine + segment[2];
	          previousOriginalLine = mapping.originalLine;
	          // Lines are stored 0-based
	          mapping.originalLine += 1;

	          // Original column.
	          mapping.originalColumn = previousOriginalColumn + segment[3];
	          previousOriginalColumn = mapping.originalColumn;

	          if (segment.length > 4) {
	            // Original name.
	            mapping.name = previousName + segment[4];
	            previousName += segment[4];
	          }
	        }

	        generatedMappings.push(mapping);
	        if (typeof mapping.originalLine === 'number') {
	          originalMappings.push(mapping);
	        }
	      }
	    }

	    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
	    this.__generatedMappings = generatedMappings;

	    quickSort(originalMappings, util.compareByOriginalPositions);
	    this.__originalMappings = originalMappings;
	  };

	/**
	 * Find the mapping that best matches the hypothetical "needle" mapping that
	 * we are searching for in the given "haystack" of mappings.
	 */
	BasicSourceMapConsumer.prototype._findMapping =
	  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
	                                         aColumnName, aComparator, aBias) {
	    // To return the position we are searching for, we must first find the
	    // mapping for the given position and then return the opposite position it
	    // points to. Because the mappings are sorted, we can use binary search to
	    // find the best mapping.

	    if (aNeedle[aLineName] <= 0) {
	      throw new TypeError('Line must be greater than or equal to 1, got '
	                          + aNeedle[aLineName]);
	    }
	    if (aNeedle[aColumnName] < 0) {
	      throw new TypeError('Column must be greater than or equal to 0, got '
	                          + aNeedle[aColumnName]);
	    }

	    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
	  };

	/**
	 * Compute the last column for each generated mapping. The last column is
	 * inclusive.
	 */
	BasicSourceMapConsumer.prototype.computeColumnSpans =
	  function SourceMapConsumer_computeColumnSpans() {
	    for (var index = 0; index < this._generatedMappings.length; ++index) {
	      var mapping = this._generatedMappings[index];

	      // Mappings do not contain a field for the last generated columnt. We
	      // can come up with an optimistic estimate, however, by assuming that
	      // mappings are contiguous (i.e. given two consecutive mappings, the
	      // first mapping ends where the second one starts).
	      if (index + 1 < this._generatedMappings.length) {
	        var nextMapping = this._generatedMappings[index + 1];

	        if (mapping.generatedLine === nextMapping.generatedLine) {
	          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
	          continue;
	        }
	      }

	      // The last mapping for each line spans the entire line.
	      mapping.lastGeneratedColumn = Infinity;
	    }
	  };

	/**
	 * Returns the original source, line, and column information for the generated
	 * source's line and column positions provided. The only argument is an object
	 * with the following properties:
	 *
	 *   - line: The line number in the generated source.  The line number
	 *     is 1-based.
	 *   - column: The column number in the generated source.  The column
	 *     number is 0-based.
	 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - source: The original source file, or null.
	 *   - line: The line number in the original source, or null.  The
	 *     line number is 1-based.
	 *   - column: The column number in the original source, or null.  The
	 *     column number is 0-based.
	 *   - name: The original identifier, or null.
	 */
	BasicSourceMapConsumer.prototype.originalPositionFor =
	  function SourceMapConsumer_originalPositionFor(aArgs) {
	    var needle = {
	      generatedLine: util.getArg(aArgs, 'line'),
	      generatedColumn: util.getArg(aArgs, 'column')
	    };

	    var index = this._findMapping(
	      needle,
	      this._generatedMappings,
	      "generatedLine",
	      "generatedColumn",
	      util.compareByGeneratedPositionsDeflated,
	      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
	    );

	    if (index >= 0) {
	      var mapping = this._generatedMappings[index];

	      if (mapping.generatedLine === needle.generatedLine) {
	        var source = util.getArg(mapping, 'source', null);
	        if (source !== null) {
	          source = this._sources.at(source);
	          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
	        }
	        var name = util.getArg(mapping, 'name', null);
	        if (name !== null) {
	          name = this._names.at(name);
	        }
	        return {
	          source: source,
	          line: util.getArg(mapping, 'originalLine', null),
	          column: util.getArg(mapping, 'originalColumn', null),
	          name: name
	        };
	      }
	    }

	    return {
	      source: null,
	      line: null,
	      column: null,
	      name: null
	    };
	  };

	/**
	 * Return true if we have the source content for every source in the source
	 * map, false otherwise.
	 */
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
	  function BasicSourceMapConsumer_hasContentsOfAllSources() {
	    if (!this.sourcesContent) {
	      return false;
	    }
	    return this.sourcesContent.length >= this._sources.size() &&
	      !this.sourcesContent.some(function (sc) { return sc == null; });
	  };

	/**
	 * Returns the original source content. The only argument is the url of the
	 * original source file. Returns null if no original source content is
	 * available.
	 */
	BasicSourceMapConsumer.prototype.sourceContentFor =
	  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
	    if (!this.sourcesContent) {
	      return null;
	    }

	    var index = this._findSourceIndex(aSource);
	    if (index >= 0) {
	      return this.sourcesContent[index];
	    }

	    var relativeSource = aSource;
	    if (this.sourceRoot != null) {
	      relativeSource = util.relative(this.sourceRoot, relativeSource);
	    }

	    var url;
	    if (this.sourceRoot != null
	        && (url = util.urlParse(this.sourceRoot))) {
	      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
	      // many users. We can help them out when they expect file:// URIs to
	      // behave like it would if they were running a local HTTP server. See
	      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
	      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
	      if (url.scheme == "file"
	          && this._sources.has(fileUriAbsPath)) {
	        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
	      }

	      if ((!url.path || url.path == "/")
	          && this._sources.has("/" + relativeSource)) {
	        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
	      }
	    }

	    // This function is used recursively from
	    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
	    // don't want to throw if we can't find the source - we just want to
	    // return null, so we provide a flag to exit gracefully.
	    if (nullOnMissing) {
	      return null;
	    }
	    else {
	      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
	    }
	  };

	/**
	 * Returns the generated line and column information for the original source,
	 * line, and column positions provided. The only argument is an object with
	 * the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.  The line number
	 *     is 1-based.
	 *   - column: The column number in the original source.  The column
	 *     number is 0-based.
	 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.  The
	 *     line number is 1-based.
	 *   - column: The column number in the generated source, or null.
	 *     The column number is 0-based.
	 */
	BasicSourceMapConsumer.prototype.generatedPositionFor =
	  function SourceMapConsumer_generatedPositionFor(aArgs) {
	    var source = util.getArg(aArgs, 'source');
	    source = this._findSourceIndex(source);
	    if (source < 0) {
	      return {
	        line: null,
	        column: null,
	        lastColumn: null
	      };
	    }

	    var needle = {
	      source: source,
	      originalLine: util.getArg(aArgs, 'line'),
	      originalColumn: util.getArg(aArgs, 'column')
	    };

	    var index = this._findMapping(
	      needle,
	      this._originalMappings,
	      "originalLine",
	      "originalColumn",
	      util.compareByOriginalPositions,
	      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
	    );

	    if (index >= 0) {
	      var mapping = this._originalMappings[index];

	      if (mapping.source === needle.source) {
	        return {
	          line: util.getArg(mapping, 'generatedLine', null),
	          column: util.getArg(mapping, 'generatedColumn', null),
	          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	        };
	      }
	    }

	    return {
	      line: null,
	      column: null,
	      lastColumn: null
	    };
	  };

	sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;

	/**
	 * An IndexedSourceMapConsumer instance represents a parsed source map which
	 * we can query for information. It differs from BasicSourceMapConsumer in
	 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	 * input.
	 *
	 * The first parameter is a raw source map (either as a JSON string, or already
	 * parsed to an object). According to the spec for indexed source maps, they
	 * have the following attributes:
	 *
	 *   - version: Which version of the source map spec this map is following.
	 *   - file: Optional. The generated file this source map is associated with.
	 *   - sections: A list of section definitions.
	 *
	 * Each value under the "sections" field has two fields:
	 *   - offset: The offset into the original specified at which this section
	 *       begins to apply, defined as an object with a "line" and "column"
	 *       field.
	 *   - map: A source map definition. This source map could also be indexed,
	 *       but doesn't have to be.
	 *
	 * Instead of the "map" field, it's also possible to have a "url" field
	 * specifying a URL to retrieve a source map from, but that's currently
	 * unsupported.
	 *
	 * Here's an example source map, taken from the source map spec[0], but
	 * modified to omit a section which uses the "url" field.
	 *
	 *  {
	 *    version : 3,
	 *    file: "app.js",
	 *    sections: [{
	 *      offset: {line:100, column:10},
	 *      map: {
	 *        version : 3,
	 *        file: "section.js",
	 *        sources: ["foo.js", "bar.js"],
	 *        names: ["src", "maps", "are", "fun"],
	 *        mappings: "AAAA,E;;ABCDE;"
	 *      }
	 *    }],
	 *  }
	 *
	 * The second parameter, if given, is a string whose value is the URL
	 * at which the source map was found.  This URL is used to compute the
	 * sources array.
	 *
	 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	 */
	function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = util.parseSourceMapInput(aSourceMap);
	  }

	  var version = util.getArg(sourceMap, 'version');
	  var sections = util.getArg(sourceMap, 'sections');

	  if (version != this._version) {
	    throw new Error('Unsupported version: ' + version);
	  }

	  this._sources = new ArraySet();
	  this._names = new ArraySet();

	  var lastOffset = {
	    line: -1,
	    column: 0
	  };
	  this._sections = sections.map(function (s) {
	    if (s.url) {
	      // The url field will require support for asynchronicity.
	      // See https://github.com/mozilla/source-map/issues/16
	      throw new Error('Support for url field in sections not implemented.');
	    }
	    var offset = util.getArg(s, 'offset');
	    var offsetLine = util.getArg(offset, 'line');
	    var offsetColumn = util.getArg(offset, 'column');

	    if (offsetLine < lastOffset.line ||
	        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
	      throw new Error('Section offsets must be ordered and non-overlapping.');
	    }
	    lastOffset = offset;

	    return {
	      generatedOffset: {
	        // The offset fields are 0-based, but we use 1-based indices when
	        // encoding/decoding from VLQ.
	        generatedLine: offsetLine + 1,
	        generatedColumn: offsetColumn + 1
	      },
	      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
	    }
	  });
	}

	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	IndexedSourceMapConsumer.prototype._version = 3;

	/**
	 * The list of original sources.
	 */
	Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
	  get: function () {
	    var sources = [];
	    for (var i = 0; i < this._sections.length; i++) {
	      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
	        sources.push(this._sections[i].consumer.sources[j]);
	      }
	    }
	    return sources;
	  }
	});

	/**
	 * Returns the original source, line, and column information for the generated
	 * source's line and column positions provided. The only argument is an object
	 * with the following properties:
	 *
	 *   - line: The line number in the generated source.  The line number
	 *     is 1-based.
	 *   - column: The column number in the generated source.  The column
	 *     number is 0-based.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - source: The original source file, or null.
	 *   - line: The line number in the original source, or null.  The
	 *     line number is 1-based.
	 *   - column: The column number in the original source, or null.  The
	 *     column number is 0-based.
	 *   - name: The original identifier, or null.
	 */
	IndexedSourceMapConsumer.prototype.originalPositionFor =
	  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
	    var needle = {
	      generatedLine: util.getArg(aArgs, 'line'),
	      generatedColumn: util.getArg(aArgs, 'column')
	    };

	    // Find the section containing the generated position we're trying to map
	    // to an original position.
	    var sectionIndex = binarySearch.search(needle, this._sections,
	      function(needle, section) {
	        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
	        if (cmp) {
	          return cmp;
	        }

	        return (needle.generatedColumn -
	                section.generatedOffset.generatedColumn);
	      });
	    var section = this._sections[sectionIndex];

	    if (!section) {
	      return {
	        source: null,
	        line: null,
	        column: null,
	        name: null
	      };
	    }

	    return section.consumer.originalPositionFor({
	      line: needle.generatedLine -
	        (section.generatedOffset.generatedLine - 1),
	      column: needle.generatedColumn -
	        (section.generatedOffset.generatedLine === needle.generatedLine
	         ? section.generatedOffset.generatedColumn - 1
	         : 0),
	      bias: aArgs.bias
	    });
	  };

	/**
	 * Return true if we have the source content for every source in the source
	 * map, false otherwise.
	 */
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
	  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
	    return this._sections.every(function (s) {
	      return s.consumer.hasContentsOfAllSources();
	    });
	  };

	/**
	 * Returns the original source content. The only argument is the url of the
	 * original source file. Returns null if no original source content is
	 * available.
	 */
	IndexedSourceMapConsumer.prototype.sourceContentFor =
	  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];

	      var content = section.consumer.sourceContentFor(aSource, true);
	      if (content) {
	        return content;
	      }
	    }
	    if (nullOnMissing) {
	      return null;
	    }
	    else {
	      throw new Error('"' + aSource + '" is not in the SourceMap.');
	    }
	  };

	/**
	 * Returns the generated line and column information for the original source,
	 * line, and column positions provided. The only argument is an object with
	 * the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.  The line number
	 *     is 1-based.
	 *   - column: The column number in the original source.  The column
	 *     number is 0-based.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.  The
	 *     line number is 1-based. 
	 *   - column: The column number in the generated source, or null.
	 *     The column number is 0-based.
	 */
	IndexedSourceMapConsumer.prototype.generatedPositionFor =
	  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];

	      // Only consider this section if the requested source is in the list of
	      // sources of the consumer.
	      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
	        continue;
	      }
	      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
	      if (generatedPosition) {
	        var ret = {
	          line: generatedPosition.line +
	            (section.generatedOffset.generatedLine - 1),
	          column: generatedPosition.column +
	            (section.generatedOffset.generatedLine === generatedPosition.line
	             ? section.generatedOffset.generatedColumn - 1
	             : 0)
	        };
	        return ret;
	      }
	    }

	    return {
	      line: null,
	      column: null
	    };
	  };

	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */
	IndexedSourceMapConsumer.prototype._parseMappings =
	  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    this.__generatedMappings = [];
	    this.__originalMappings = [];
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];
	      var sectionMappings = section.consumer._generatedMappings;
	      for (var j = 0; j < sectionMappings.length; j++) {
	        var mapping = sectionMappings[j];

	        var source = section.consumer._sources.at(mapping.source);
	        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
	        this._sources.add(source);
	        source = this._sources.indexOf(source);

	        var name = null;
	        if (mapping.name) {
	          name = section.consumer._names.at(mapping.name);
	          this._names.add(name);
	          name = this._names.indexOf(name);
	        }

	        // The mappings coming from the consumer for the section have
	        // generated positions relative to the start of the section, so we
	        // need to offset them to be relative to the start of the concatenated
	        // generated file.
	        var adjustedMapping = {
	          source: source,
	          generatedLine: mapping.generatedLine +
	            (section.generatedOffset.generatedLine - 1),
	          generatedColumn: mapping.generatedColumn +
	            (section.generatedOffset.generatedLine === mapping.generatedLine
	            ? section.generatedOffset.generatedColumn - 1
	            : 0),
	          originalLine: mapping.originalLine,
	          originalColumn: mapping.originalColumn,
	          name: name
	        };

	        this.__generatedMappings.push(adjustedMapping);
	        if (typeof adjustedMapping.originalLine === 'number') {
	          this.__originalMappings.push(adjustedMapping);
	        }
	      }
	    }

	    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
	    quickSort(this.__originalMappings, util.compareByOriginalPositions);
	  };

	sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
	return sourceMapConsumer;
}

var sourceNode = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredSourceNode;

function requireSourceNode () {
	if (hasRequiredSourceNode) return sourceNode;
	hasRequiredSourceNode = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var SourceMapGenerator = requireSourceMapGenerator().SourceMapGenerator;
	var util = requireUtil();

	// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
	// operating systems these days (capturing the result).
	var REGEX_NEWLINE = /(\r?\n)/;

	// Newline character code for charCodeAt() comparisons
	var NEWLINE_CODE = 10;

	// Private symbol for identifying `SourceNode`s when multiple versions of
	// the source-map library are loaded. This MUST NOT CHANGE across
	// versions!
	var isSourceNode = "$$$isSourceNode$$$";

	/**
	 * SourceNodes provide a way to abstract over interpolating/concatenating
	 * snippets of generated JavaScript source code while maintaining the line and
	 * column information associated with the original source code.
	 *
	 * @param aLine The original line number.
	 * @param aColumn The original column number.
	 * @param aSource The original source's filename.
	 * @param aChunks Optional. An array of strings which are snippets of
	 *        generated JS, or other SourceNodes.
	 * @param aName The original identifier.
	 */
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
	  this.children = [];
	  this.sourceContents = {};
	  this.line = aLine == null ? null : aLine;
	  this.column = aColumn == null ? null : aColumn;
	  this.source = aSource == null ? null : aSource;
	  this.name = aName == null ? null : aName;
	  this[isSourceNode] = true;
	  if (aChunks != null) this.add(aChunks);
	}

	/**
	 * Creates a SourceNode from generated code and a SourceMapConsumer.
	 *
	 * @param aGeneratedCode The generated code
	 * @param aSourceMapConsumer The SourceMap for the generated code
	 * @param aRelativePath Optional. The path that relative sources in the
	 *        SourceMapConsumer should be relative to.
	 */
	SourceNode.fromStringWithSourceMap =
	  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
	    // The SourceNode we want to fill with the generated code
	    // and the SourceMap
	    var node = new SourceNode();

	    // All even indices of this array are one line of the generated code,
	    // while all odd indices are the newlines between two adjacent lines
	    // (since `REGEX_NEWLINE` captures its match).
	    // Processed fragments are accessed by calling `shiftNextLine`.
	    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
	    var remainingLinesIndex = 0;
	    var shiftNextLine = function() {
	      var lineContents = getNextLine();
	      // The last line of a file might not have a newline.
	      var newLine = getNextLine() || "";
	      return lineContents + newLine;

	      function getNextLine() {
	        return remainingLinesIndex < remainingLines.length ?
	            remainingLines[remainingLinesIndex++] : undefined;
	      }
	    };

	    // We need to remember the position of "remainingLines"
	    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

	    // The generate SourceNodes we need a code range.
	    // To extract it current and last mapping is used.
	    // Here we store the last mapping.
	    var lastMapping = null;

	    aSourceMapConsumer.eachMapping(function (mapping) {
	      if (lastMapping !== null) {
	        // We add the code from "lastMapping" to "mapping":
	        // First check if there is a new line in between.
	        if (lastGeneratedLine < mapping.generatedLine) {
	          // Associate first line with "lastMapping"
	          addMappingWithCode(lastMapping, shiftNextLine());
	          lastGeneratedLine++;
	          lastGeneratedColumn = 0;
	          // The remaining code is added without mapping
	        } else {
	          // There is no new line in between.
	          // Associate the code between "lastGeneratedColumn" and
	          // "mapping.generatedColumn" with "lastMapping"
	          var nextLine = remainingLines[remainingLinesIndex] || '';
	          var code = nextLine.substr(0, mapping.generatedColumn -
	                                        lastGeneratedColumn);
	          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
	                                              lastGeneratedColumn);
	          lastGeneratedColumn = mapping.generatedColumn;
	          addMappingWithCode(lastMapping, code);
	          // No more remaining code, continue
	          lastMapping = mapping;
	          return;
	        }
	      }
	      // We add the generated code until the first mapping
	      // to the SourceNode without any mapping.
	      // Each line is added as separate string.
	      while (lastGeneratedLine < mapping.generatedLine) {
	        node.add(shiftNextLine());
	        lastGeneratedLine++;
	      }
	      if (lastGeneratedColumn < mapping.generatedColumn) {
	        var nextLine = remainingLines[remainingLinesIndex] || '';
	        node.add(nextLine.substr(0, mapping.generatedColumn));
	        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
	        lastGeneratedColumn = mapping.generatedColumn;
	      }
	      lastMapping = mapping;
	    }, this);
	    // We have processed all mappings.
	    if (remainingLinesIndex < remainingLines.length) {
	      if (lastMapping) {
	        // Associate the remaining code in the current line with "lastMapping"
	        addMappingWithCode(lastMapping, shiftNextLine());
	      }
	      // and add the remaining lines without any mapping
	      node.add(remainingLines.splice(remainingLinesIndex).join(""));
	    }

	    // Copy sourcesContent into SourceNode
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        if (aRelativePath != null) {
	          sourceFile = util.join(aRelativePath, sourceFile);
	        }
	        node.setSourceContent(sourceFile, content);
	      }
	    });

	    return node;

	    function addMappingWithCode(mapping, code) {
	      if (mapping === null || mapping.source === undefined) {
	        node.add(code);
	      } else {
	        var source = aRelativePath
	          ? util.join(aRelativePath, mapping.source)
	          : mapping.source;
	        node.add(new SourceNode(mapping.originalLine,
	                                mapping.originalColumn,
	                                source,
	                                code,
	                                mapping.name));
	      }
	    }
	  };

	/**
	 * Add a chunk of generated JS to this source node.
	 *
	 * @param aChunk A string snippet of generated JS code, another instance of
	 *        SourceNode, or an array where each member is one of those things.
	 */
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
	  if (Array.isArray(aChunk)) {
	    aChunk.forEach(function (chunk) {
	      this.add(chunk);
	    }, this);
	  }
	  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	    if (aChunk) {
	      this.children.push(aChunk);
	    }
	  }
	  else {
	    throw new TypeError(
	      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	    );
	  }
	  return this;
	};

	/**
	 * Add a chunk of generated JS to the beginning of this source node.
	 *
	 * @param aChunk A string snippet of generated JS code, another instance of
	 *        SourceNode, or an array where each member is one of those things.
	 */
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
	  if (Array.isArray(aChunk)) {
	    for (var i = aChunk.length-1; i >= 0; i--) {
	      this.prepend(aChunk[i]);
	    }
	  }
	  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	    this.children.unshift(aChunk);
	  }
	  else {
	    throw new TypeError(
	      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	    );
	  }
	  return this;
	};

	/**
	 * Walk over the tree of JS snippets in this node and its children. The
	 * walking function is called once for each snippet of JS and is passed that
	 * snippet and the its original associated source's line/column location.
	 *
	 * @param aFn The traversal function.
	 */
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
	  var chunk;
	  for (var i = 0, len = this.children.length; i < len; i++) {
	    chunk = this.children[i];
	    if (chunk[isSourceNode]) {
	      chunk.walk(aFn);
	    }
	    else {
	      if (chunk !== '') {
	        aFn(chunk, { source: this.source,
	                     line: this.line,
	                     column: this.column,
	                     name: this.name });
	      }
	    }
	  }
	};

	/**
	 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	 * each of `this.children`.
	 *
	 * @param aSep The separator.
	 */
	SourceNode.prototype.join = function SourceNode_join(aSep) {
	  var newChildren;
	  var i;
	  var len = this.children.length;
	  if (len > 0) {
	    newChildren = [];
	    for (i = 0; i < len-1; i++) {
	      newChildren.push(this.children[i]);
	      newChildren.push(aSep);
	    }
	    newChildren.push(this.children[i]);
	    this.children = newChildren;
	  }
	  return this;
	};

	/**
	 * Call String.prototype.replace on the very right-most source snippet. Useful
	 * for trimming whitespace from the end of a source node, etc.
	 *
	 * @param aPattern The pattern to replace.
	 * @param aReplacement The thing to replace the pattern with.
	 */
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
	  var lastChild = this.children[this.children.length - 1];
	  if (lastChild[isSourceNode]) {
	    lastChild.replaceRight(aPattern, aReplacement);
	  }
	  else if (typeof lastChild === 'string') {
	    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
	  }
	  else {
	    this.children.push(''.replace(aPattern, aReplacement));
	  }
	  return this;
	};

	/**
	 * Set the source content for a source file. This will be added to the SourceMapGenerator
	 * in the sourcesContent field.
	 *
	 * @param aSourceFile The filename of the source file
	 * @param aSourceContent The content of the source file
	 */
	SourceNode.prototype.setSourceContent =
	  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
	    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
	  };

	/**
	 * Walk over the tree of SourceNodes. The walking function is called for each
	 * source file content and is passed the filename and source content.
	 *
	 * @param aFn The traversal function.
	 */
	SourceNode.prototype.walkSourceContents =
	  function SourceNode_walkSourceContents(aFn) {
	    for (var i = 0, len = this.children.length; i < len; i++) {
	      if (this.children[i][isSourceNode]) {
	        this.children[i].walkSourceContents(aFn);
	      }
	    }

	    var sources = Object.keys(this.sourceContents);
	    for (var i = 0, len = sources.length; i < len; i++) {
	      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
	    }
	  };

	/**
	 * Return the string representation of this source node. Walks over the tree
	 * and concatenates all the various snippets together to one string.
	 */
	SourceNode.prototype.toString = function SourceNode_toString() {
	  var str = "";
	  this.walk(function (chunk) {
	    str += chunk;
	  });
	  return str;
	};

	/**
	 * Returns the string representation of this source node along with a source
	 * map.
	 */
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
	  var generated = {
	    code: "",
	    line: 1,
	    column: 0
	  };
	  var map = new SourceMapGenerator(aArgs);
	  var sourceMappingActive = false;
	  var lastOriginalSource = null;
	  var lastOriginalLine = null;
	  var lastOriginalColumn = null;
	  var lastOriginalName = null;
	  this.walk(function (chunk, original) {
	    generated.code += chunk;
	    if (original.source !== null
	        && original.line !== null
	        && original.column !== null) {
	      if(lastOriginalSource !== original.source
	         || lastOriginalLine !== original.line
	         || lastOriginalColumn !== original.column
	         || lastOriginalName !== original.name) {
	        map.addMapping({
	          source: original.source,
	          original: {
	            line: original.line,
	            column: original.column
	          },
	          generated: {
	            line: generated.line,
	            column: generated.column
	          },
	          name: original.name
	        });
	      }
	      lastOriginalSource = original.source;
	      lastOriginalLine = original.line;
	      lastOriginalColumn = original.column;
	      lastOriginalName = original.name;
	      sourceMappingActive = true;
	    } else if (sourceMappingActive) {
	      map.addMapping({
	        generated: {
	          line: generated.line,
	          column: generated.column
	        }
	      });
	      lastOriginalSource = null;
	      sourceMappingActive = false;
	    }
	    for (var idx = 0, length = chunk.length; idx < length; idx++) {
	      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
	        generated.line++;
	        generated.column = 0;
	        // Mappings end at eol
	        if (idx + 1 === length) {
	          lastOriginalSource = null;
	          sourceMappingActive = false;
	        } else if (sourceMappingActive) {
	          map.addMapping({
	            source: original.source,
	            original: {
	              line: original.line,
	              column: original.column
	            },
	            generated: {
	              line: generated.line,
	              column: generated.column
	            },
	            name: original.name
	          });
	        }
	      } else {
	        generated.column++;
	      }
	    }
	  });
	  this.walkSourceContents(function (sourceFile, sourceContent) {
	    map.setSourceContent(sourceFile, sourceContent);
	  });

	  return { code: generated.code, map: map };
	};

	sourceNode.SourceNode = SourceNode;
	return sourceNode;
}

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var hasRequiredSourceMap;

function requireSourceMap () {
	if (hasRequiredSourceMap) return sourceMap;
	hasRequiredSourceMap = 1;
	sourceMap.SourceMapGenerator = requireSourceMapGenerator().SourceMapGenerator;
	sourceMap.SourceMapConsumer = requireSourceMapConsumer().SourceMapConsumer;
	sourceMap.SourceNode = requireSourceNode().SourceNode;
	return sourceMap;
}

/* eslint-disable node/no-deprecated-api */

var bufferFrom_1;
var hasRequiredBufferFrom;

function requireBufferFrom () {
	if (hasRequiredBufferFrom) return bufferFrom_1;
	hasRequiredBufferFrom = 1;
	var toString = Object.prototype.toString;

	var isModern = (
	  typeof Buffer !== 'undefined' &&
	  typeof Buffer.alloc === 'function' &&
	  typeof Buffer.allocUnsafe === 'function' &&
	  typeof Buffer.from === 'function'
	);

	function isArrayBuffer (input) {
	  return toString.call(input).slice(8, -1) === 'ArrayBuffer'
	}

	function fromArrayBuffer (obj, byteOffset, length) {
	  byteOffset >>>= 0;

	  var maxLength = obj.byteLength - byteOffset;

	  if (maxLength < 0) {
	    throw new RangeError("'offset' is out of bounds")
	  }

	  if (length === undefined) {
	    length = maxLength;
	  } else {
	    length >>>= 0;

	    if (length > maxLength) {
	      throw new RangeError("'length' is out of bounds")
	    }
	  }

	  return isModern
	    ? Buffer.from(obj.slice(byteOffset, byteOffset + length))
	    : new Buffer(new Uint8Array(obj.slice(byteOffset, byteOffset + length)))
	}

	function fromString (string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  return isModern
	    ? Buffer.from(string, encoding)
	    : new Buffer(string, encoding)
	}

	function bufferFrom (value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (isArrayBuffer(value)) {
	    return fromArrayBuffer(value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(value, encodingOrOffset)
	  }

	  return isModern
	    ? Buffer.from(value)
	    : new Buffer(value)
	}

	bufferFrom_1 = bufferFrom;
	return bufferFrom_1;
}

sourceMapSupport.exports;

var hasRequiredSourceMapSupport;

function requireSourceMapSupport () {
	if (hasRequiredSourceMapSupport) return sourceMapSupport.exports;
	hasRequiredSourceMapSupport = 1;
	(function (module, exports) {
		var SourceMapConsumer = requireSourceMap().SourceMapConsumer;
		var path$1 = path;

		var fs;
		try {
		  fs = require('fs');
		  if (!fs.existsSync || !fs.readFileSync) {
		    // fs doesn't have all methods we need
		    fs = null;
		  }
		} catch (err) {
		  /* nop */
		}

		var bufferFrom = requireBufferFrom();

		/**
		 * Requires a module which is protected against bundler minification.
		 *
		 * @param {NodeModule} mod
		 * @param {string} request
		 */
		function dynamicRequire(mod, request) {
		  return mod.require(request);
		}

		// Only install once if called multiple times
		var errorFormatterInstalled = false;
		var uncaughtShimInstalled = false;

		// If true, the caches are reset before a stack trace formatting operation
		var emptyCacheBetweenOperations = false;

		// Supports {browser, node, auto}
		var environment = "auto";

		// Maps a file path to a string containing the file contents
		var fileContentsCache = {};

		// Maps a file path to a source map for that file
		var sourceMapCache = {};

		// Regex for detecting source maps
		var reSourceMap = /^data:application\/json[^,]+base64,/;

		// Priority list of retrieve handlers
		var retrieveFileHandlers = [];
		var retrieveMapHandlers = [];

		function isInBrowser() {
		  if (environment === "browser")
		    return true;
		  if (environment === "node")
		    return false;
		  return ((typeof window !== 'undefined') && (typeof XMLHttpRequest === 'function') && !(window.require && window.module && window.process && window.process.type === "renderer"));
		}

		function hasGlobalProcessEventEmitter() {
		  return ((typeof process === 'object') && (process !== null) && (typeof process.on === 'function'));
		}

		function globalProcessVersion() {
		  if ((typeof process === 'object') && (process !== null)) {
		    return process.version;
		  } else {
		    return '';
		  }
		}

		function globalProcessStderr() {
		  if ((typeof process === 'object') && (process !== null)) {
		    return process.stderr;
		  }
		}

		function globalProcessExit(code) {
		  if ((typeof process === 'object') && (process !== null) && (typeof process.exit === 'function')) {
		    return process.exit(code);
		  }
		}

		function handlerExec(list) {
		  return function(arg) {
		    for (var i = 0; i < list.length; i++) {
		      var ret = list[i](arg);
		      if (ret) {
		        return ret;
		      }
		    }
		    return null;
		  };
		}

		var retrieveFile = handlerExec(retrieveFileHandlers);

		retrieveFileHandlers.push(function(path) {
		  // Trim the path to make sure there is no extra whitespace.
		  path = path.trim();
		  if (/^file:/.test(path)) {
		    // existsSync/readFileSync can't handle file protocol, but once stripped, it works
		    path = path.replace(/file:\/\/\/(\w:)?/, function(protocol, drive) {
		      return drive ?
		        '' : // file:///C:/dir/file -> C:/dir/file
		        '/'; // file:///root-dir/file -> /root-dir/file
		    });
		  }
		  if (path in fileContentsCache) {
		    return fileContentsCache[path];
		  }

		  var contents = '';
		  try {
		    if (!fs) {
		      // Use SJAX if we are in the browser
		      var xhr = new XMLHttpRequest();
		      xhr.open('GET', path, /** async */ false);
		      xhr.send(null);
		      if (xhr.readyState === 4 && xhr.status === 200) {
		        contents = xhr.responseText;
		      }
		    } else if (fs.existsSync(path)) {
		      // Otherwise, use the filesystem
		      contents = fs.readFileSync(path, 'utf8');
		    }
		  } catch (er) {
		    /* ignore any errors */
		  }

		  return fileContentsCache[path] = contents;
		});

		// Support URLs relative to a directory, but be careful about a protocol prefix
		// in case we are in the browser (i.e. directories may start with "http://" or "file:///")
		function supportRelativeURL(file, url) {
		  if (!file) return url;
		  var dir = path$1.dirname(file);
		  var match = /^\w+:\/\/[^\/]*/.exec(dir);
		  var protocol = match ? match[0] : '';
		  var startPath = dir.slice(protocol.length);
		  if (protocol && /^\/\w\:/.test(startPath)) {
		    // handle file:///C:/ paths
		    protocol += '/';
		    return protocol + path$1.resolve(dir.slice(protocol.length), url).replace(/\\/g, '/');
		  }
		  return protocol + path$1.resolve(dir.slice(protocol.length), url);
		}

		function retrieveSourceMapURL(source) {
		  var fileData;

		  if (isInBrowser()) {
		     try {
		       var xhr = new XMLHttpRequest();
		       xhr.open('GET', source, false);
		       xhr.send(null);
		       fileData = xhr.readyState === 4 ? xhr.responseText : null;

		       // Support providing a sourceMappingURL via the SourceMap header
		       var sourceMapHeader = xhr.getResponseHeader("SourceMap") ||
		                             xhr.getResponseHeader("X-SourceMap");
		       if (sourceMapHeader) {
		         return sourceMapHeader;
		       }
		     } catch (e) {
		     }
		  }

		  // Get the URL of the source map
		  fileData = retrieveFile(source);
		  var re = /(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/mg;
		  // Keep executing the search to find the *last* sourceMappingURL to avoid
		  // picking up sourceMappingURLs from comments, strings, etc.
		  var lastMatch, match;
		  while (match = re.exec(fileData)) lastMatch = match;
		  if (!lastMatch) return null;
		  return lastMatch[1];
		}
		// Can be overridden by the retrieveSourceMap option to install. Takes a
		// generated source filename; returns a {map, optional url} object, or null if
		// there is no source map.  The map field may be either a string or the parsed
		// JSON object (ie, it must be a valid argument to the SourceMapConsumer
		// constructor).
		var retrieveSourceMap = handlerExec(retrieveMapHandlers);
		retrieveMapHandlers.push(function(source) {
		  var sourceMappingURL = retrieveSourceMapURL(source);
		  if (!sourceMappingURL) return null;

		  // Read the contents of the source map
		  var sourceMapData;
		  if (reSourceMap.test(sourceMappingURL)) {
		    // Support source map URL as a data url
		    var rawData = sourceMappingURL.slice(sourceMappingURL.indexOf(',') + 1);
		    sourceMapData = bufferFrom(rawData, "base64").toString();
		    sourceMappingURL = source;
		  } else {
		    // Support source map URLs relative to the source URL
		    sourceMappingURL = supportRelativeURL(source, sourceMappingURL);
		    sourceMapData = retrieveFile(sourceMappingURL);
		  }

		  if (!sourceMapData) {
		    return null;
		  }

		  return {
		    url: sourceMappingURL,
		    map: sourceMapData
		  };
		});

		function mapSourcePosition(position) {
		  var sourceMap = sourceMapCache[position.source];
		  if (!sourceMap) {
		    // Call the (overrideable) retrieveSourceMap function to get the source map.
		    var urlAndMap = retrieveSourceMap(position.source);
		    if (urlAndMap) {
		      sourceMap = sourceMapCache[position.source] = {
		        url: urlAndMap.url,
		        map: new SourceMapConsumer(urlAndMap.map)
		      };

		      // Load all sources stored inline with the source map into the file cache
		      // to pretend like they are already loaded. They may not exist on disk.
		      if (sourceMap.map.sourcesContent) {
		        sourceMap.map.sources.forEach(function(source, i) {
		          var contents = sourceMap.map.sourcesContent[i];
		          if (contents) {
		            var url = supportRelativeURL(sourceMap.url, source);
		            fileContentsCache[url] = contents;
		          }
		        });
		      }
		    } else {
		      sourceMap = sourceMapCache[position.source] = {
		        url: null,
		        map: null
		      };
		    }
		  }

		  // Resolve the source URL relative to the URL of the source map
		  if (sourceMap && sourceMap.map && typeof sourceMap.map.originalPositionFor === 'function') {
		    var originalPosition = sourceMap.map.originalPositionFor(position);

		    // Only return the original position if a matching line was found. If no
		    // matching line is found then we return position instead, which will cause
		    // the stack trace to print the path and line for the compiled file. It is
		    // better to give a precise location in the compiled file than a vague
		    // location in the original file.
		    if (originalPosition.source !== null) {
		      originalPosition.source = supportRelativeURL(
		        sourceMap.url, originalPosition.source);
		      return originalPosition;
		    }
		  }

		  return position;
		}

		// Parses code generated by FormatEvalOrigin(), a function inside V8:
		// https://code.google.com/p/v8/source/browse/trunk/src/messages.js
		function mapEvalOrigin(origin) {
		  // Most eval() calls are in this format
		  var match = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(origin);
		  if (match) {
		    var position = mapSourcePosition({
		      source: match[2],
		      line: +match[3],
		      column: match[4] - 1
		    });
		    return 'eval at ' + match[1] + ' (' + position.source + ':' +
		      position.line + ':' + (position.column + 1) + ')';
		  }

		  // Parse nested eval() calls using recursion
		  match = /^eval at ([^(]+) \((.+)\)$/.exec(origin);
		  if (match) {
		    return 'eval at ' + match[1] + ' (' + mapEvalOrigin(match[2]) + ')';
		  }

		  // Make sure we still return useful information if we didn't find anything
		  return origin;
		}

		// This is copied almost verbatim from the V8 source code at
		// https://code.google.com/p/v8/source/browse/trunk/src/messages.js. The
		// implementation of wrapCallSite() used to just forward to the actual source
		// code of CallSite.prototype.toString but unfortunately a new release of V8
		// did something to the prototype chain and broke the shim. The only fix I
		// could find was copy/paste.
		function CallSiteToString() {
		  var fileName;
		  var fileLocation = "";
		  if (this.isNative()) {
		    fileLocation = "native";
		  } else {
		    fileName = this.getScriptNameOrSourceURL();
		    if (!fileName && this.isEval()) {
		      fileLocation = this.getEvalOrigin();
		      fileLocation += ", ";  // Expecting source position to follow.
		    }

		    if (fileName) {
		      fileLocation += fileName;
		    } else {
		      // Source code does not originate from a file and is not native, but we
		      // can still get the source position inside the source string, e.g. in
		      // an eval string.
		      fileLocation += "<anonymous>";
		    }
		    var lineNumber = this.getLineNumber();
		    if (lineNumber != null) {
		      fileLocation += ":" + lineNumber;
		      var columnNumber = this.getColumnNumber();
		      if (columnNumber) {
		        fileLocation += ":" + columnNumber;
		      }
		    }
		  }

		  var line = "";
		  var functionName = this.getFunctionName();
		  var addSuffix = true;
		  var isConstructor = this.isConstructor();
		  var isMethodCall = !(this.isToplevel() || isConstructor);
		  if (isMethodCall) {
		    var typeName = this.getTypeName();
		    // Fixes shim to be backward compatable with Node v0 to v4
		    if (typeName === "[object Object]") {
		      typeName = "null";
		    }
		    var methodName = this.getMethodName();
		    if (functionName) {
		      if (typeName && functionName.indexOf(typeName) != 0) {
		        line += typeName + ".";
		      }
		      line += functionName;
		      if (methodName && functionName.indexOf("." + methodName) != functionName.length - methodName.length - 1) {
		        line += " [as " + methodName + "]";
		      }
		    } else {
		      line += typeName + "." + (methodName || "<anonymous>");
		    }
		  } else if (isConstructor) {
		    line += "new " + (functionName || "<anonymous>");
		  } else if (functionName) {
		    line += functionName;
		  } else {
		    line += fileLocation;
		    addSuffix = false;
		  }
		  if (addSuffix) {
		    line += " (" + fileLocation + ")";
		  }
		  return line;
		}

		function cloneCallSite(frame) {
		  var object = {};
		  Object.getOwnPropertyNames(Object.getPrototypeOf(frame)).forEach(function(name) {
		    object[name] = /^(?:is|get)/.test(name) ? function() { return frame[name].call(frame); } : frame[name];
		  });
		  object.toString = CallSiteToString;
		  return object;
		}

		function wrapCallSite(frame, state) {
		  // provides interface backward compatibility
		  if (state === undefined) {
		    state = { nextPosition: null, curPosition: null };
		  }
		  if(frame.isNative()) {
		    state.curPosition = null;
		    return frame;
		  }

		  // Most call sites will return the source file from getFileName(), but code
		  // passed to eval() ending in "//# sourceURL=..." will return the source file
		  // from getScriptNameOrSourceURL() instead
		  var source = frame.getFileName() || frame.getScriptNameOrSourceURL();
		  if (source) {
		    var line = frame.getLineNumber();
		    var column = frame.getColumnNumber() - 1;

		    // Fix position in Node where some (internal) code is prepended.
		    // See https://github.com/evanw/node-source-map-support/issues/36
		    // Header removed in node at ^10.16 || >=11.11.0
		    // v11 is not an LTS candidate, we can just test the one version with it.
		    // Test node versions for: 10.16-19, 10.20+, 12-19, 20-99, 100+, or 11.11
		    var noHeader = /^v(10\.1[6-9]|10\.[2-9][0-9]|10\.[0-9]{3,}|1[2-9]\d*|[2-9]\d|\d{3,}|11\.11)/;
		    var headerLength = noHeader.test(globalProcessVersion()) ? 0 : 62;
		    if (line === 1 && column > headerLength && !isInBrowser() && !frame.isEval()) {
		      column -= headerLength;
		    }

		    var position = mapSourcePosition({
		      source: source,
		      line: line,
		      column: column
		    });
		    state.curPosition = position;
		    frame = cloneCallSite(frame);
		    var originalFunctionName = frame.getFunctionName;
		    frame.getFunctionName = function() {
		      if (state.nextPosition == null) {
		        return originalFunctionName();
		      }
		      return state.nextPosition.name || originalFunctionName();
		    };
		    frame.getFileName = function() { return position.source; };
		    frame.getLineNumber = function() { return position.line; };
		    frame.getColumnNumber = function() { return position.column + 1; };
		    frame.getScriptNameOrSourceURL = function() { return position.source; };
		    return frame;
		  }

		  // Code called using eval() needs special handling
		  var origin = frame.isEval() && frame.getEvalOrigin();
		  if (origin) {
		    origin = mapEvalOrigin(origin);
		    frame = cloneCallSite(frame);
		    frame.getEvalOrigin = function() { return origin; };
		    return frame;
		  }

		  // If we get here then we were unable to change the source position
		  return frame;
		}

		// This function is part of the V8 stack trace API, for more info see:
		// https://v8.dev/docs/stack-trace-api
		function prepareStackTrace(error, stack) {
		  if (emptyCacheBetweenOperations) {
		    fileContentsCache = {};
		    sourceMapCache = {};
		  }

		  var name = error.name || 'Error';
		  var message = error.message || '';
		  var errorString = name + ": " + message;

		  var state = { nextPosition: null, curPosition: null };
		  var processedStack = [];
		  for (var i = stack.length - 1; i >= 0; i--) {
		    processedStack.push('\n    at ' + wrapCallSite(stack[i], state));
		    state.nextPosition = state.curPosition;
		  }
		  state.curPosition = state.nextPosition = null;
		  return errorString + processedStack.reverse().join('');
		}

		// Generate position and snippet of original source with pointer
		function getErrorSource(error) {
		  var match = /\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(error.stack);
		  if (match) {
		    var source = match[1];
		    var line = +match[2];
		    var column = +match[3];

		    // Support the inline sourceContents inside the source map
		    var contents = fileContentsCache[source];

		    // Support files on disk
		    if (!contents && fs && fs.existsSync(source)) {
		      try {
		        contents = fs.readFileSync(source, 'utf8');
		      } catch (er) {
		        contents = '';
		      }
		    }

		    // Format the line from the original source code like node does
		    if (contents) {
		      var code = contents.split(/(?:\r\n|\r|\n)/)[line - 1];
		      if (code) {
		        return source + ':' + line + '\n' + code + '\n' +
		          new Array(column).join(' ') + '^';
		      }
		    }
		  }
		  return null;
		}

		function printErrorAndExit (error) {
		  var source = getErrorSource(error);

		  // Ensure error is printed synchronously and not truncated
		  var stderr = globalProcessStderr();
		  if (stderr && stderr._handle && stderr._handle.setBlocking) {
		    stderr._handle.setBlocking(true);
		  }

		  if (source) {
		    console.error();
		    console.error(source);
		  }

		  console.error(error.stack);
		  globalProcessExit(1);
		}

		function shimEmitUncaughtException () {
		  var origEmit = process.emit;

		  process.emit = function (type) {
		    if (type === 'uncaughtException') {
		      var hasStack = (arguments[1] && arguments[1].stack);
		      var hasListeners = (this.listeners(type).length > 0);

		      if (hasStack && !hasListeners) {
		        return printErrorAndExit(arguments[1]);
		      }
		    }

		    return origEmit.apply(this, arguments);
		  };
		}

		var originalRetrieveFileHandlers = retrieveFileHandlers.slice(0);
		var originalRetrieveMapHandlers = retrieveMapHandlers.slice(0);

		exports.wrapCallSite = wrapCallSite;
		exports.getErrorSource = getErrorSource;
		exports.mapSourcePosition = mapSourcePosition;
		exports.retrieveSourceMap = retrieveSourceMap;

		exports.install = function(options) {
		  options = options || {};

		  if (options.environment) {
		    environment = options.environment;
		    if (["node", "browser", "auto"].indexOf(environment) === -1) {
		      throw new Error("environment " + environment + " was unknown. Available options are {auto, browser, node}")
		    }
		  }

		  // Allow sources to be found by methods other than reading the files
		  // directly from disk.
		  if (options.retrieveFile) {
		    if (options.overrideRetrieveFile) {
		      retrieveFileHandlers.length = 0;
		    }

		    retrieveFileHandlers.unshift(options.retrieveFile);
		  }

		  // Allow source maps to be found by methods other than reading the files
		  // directly from disk.
		  if (options.retrieveSourceMap) {
		    if (options.overrideRetrieveSourceMap) {
		      retrieveMapHandlers.length = 0;
		    }

		    retrieveMapHandlers.unshift(options.retrieveSourceMap);
		  }

		  // Support runtime transpilers that include inline source maps
		  if (options.hookRequire && !isInBrowser()) {
		    // Use dynamicRequire to avoid including in browser bundles
		    var Module = dynamicRequire(module, 'module');
		    var $compile = Module.prototype._compile;

		    if (!$compile.__sourceMapSupport) {
		      Module.prototype._compile = function(content, filename) {
		        fileContentsCache[filename] = content;
		        sourceMapCache[filename] = undefined;
		        return $compile.call(this, content, filename);
		      };

		      Module.prototype._compile.__sourceMapSupport = true;
		    }
		  }

		  // Configure options
		  if (!emptyCacheBetweenOperations) {
		    emptyCacheBetweenOperations = 'emptyCacheBetweenOperations' in options ?
		      options.emptyCacheBetweenOperations : false;
		  }

		  // Install the error reformatter
		  if (!errorFormatterInstalled) {
		    errorFormatterInstalled = true;
		    Error.prepareStackTrace = prepareStackTrace;
		  }

		  if (!uncaughtShimInstalled) {
		    var installHandler = 'handleUncaughtExceptions' in options ?
		      options.handleUncaughtExceptions : true;

		    // Do not override 'uncaughtException' with our own handler in Node.js
		    // Worker threads. Workers pass the error to the main thread as an event,
		    // rather than printing something to stderr and exiting.
		    try {
		      // We need to use `dynamicRequire` because `require` on it's own will be optimized by WebPack/Browserify.
		      var worker_threads = dynamicRequire(module, 'worker_threads');
		      if (worker_threads.isMainThread === false) {
		        installHandler = false;
		      }
		    } catch(e) {}

		    // Provide the option to not install the uncaught exception handler. This is
		    // to support other uncaught exception handlers (in test frameworks, for
		    // example). If this handler is not installed and there are no other uncaught
		    // exception handlers, uncaught exceptions will be caught by node's built-in
		    // exception handler and the process will still be terminated. However, the
		    // generated JavaScript code will be shown above the stack trace instead of
		    // the original source code.
		    if (installHandler && hasGlobalProcessEventEmitter()) {
		      uncaughtShimInstalled = true;
		      shimEmitUncaughtException();
		    }
		  }
		};

		exports.resetRetrieveHandlers = function() {
		  retrieveFileHandlers.length = 0;
		  retrieveMapHandlers.length = 0;

		  retrieveFileHandlers = originalRetrieveFileHandlers.slice(0);
		  retrieveMapHandlers = originalRetrieveMapHandlers.slice(0);

		  retrieveSourceMap = handlerExec(retrieveMapHandlers);
		  retrieveFile = handlerExec(retrieveFileHandlers);
		}; 
	} (sourceMapSupport, sourceMapSupport.exports));
	return sourceMapSupport.exports;
}

var hasRequiredRegister;

function requireRegister () {
	if (hasRequiredRegister) return register;
	hasRequiredRegister = 1;
	requireSourceMapSupport().install();
	return register;
}

requireRegister();

var IpcEvents;
(function(IpcEvents) {
    IpcEvents["STARTED"] = 'started';
    IpcEvents["PLAY"] = 'play';
    IpcEvents["PAUSE"] = 'pause';
    IpcEvents["STOP"] = 'stop';
    IpcEvents["PLAYPAUSE"] = 'playpause';
    IpcEvents["NEXT"] = 'next';
    IpcEvents["PREVIOUS"] = 'previous';
    IpcEvents["VOLUME"] = 'volume';
    IpcEvents["MUTE"] = 'mute';
    IpcEvents["SEEK"] = 'seek';
    IpcEvents["PLAYING_STATUS"] = 'playing-status';
    IpcEvents["SONG_CHANGE"] = 'song-change';
    IpcEvents["WINDOW_MINIMIZE"] = 'minimize';
    IpcEvents["WINDOW_MAXIMIZE"] = 'maximize';
    IpcEvents["WINDOW_CLOSE"] = 'close';
    IpcEvents["WINDOW_OPEN_DEVTOOLS"] = 'open-devtools';
    IpcEvents["MUSIC_ADD"] = 'music-add';
    IpcEvents["MUSIC_ERROR"] = 'music-error';
    IpcEvents["MUSIC_PROGRESS"] = 'music-progress';
    IpcEvents["MUSIC_FINISHED"] = 'music-finished';
    IpcEvents["MUSIC_INFO"] = 'music-info';
    IpcEvents["MUSIC_SEARCH"] = 'music-search';
    IpcEvents["MUSIC_PREVIEW"] = 'music-preview';
    IpcEvents["LOCALFOLDER_REMOVE"] = 'remove-localfolder';
    IpcEvents["LOCALFOLDERS_REFRESH"] = 'refresh-localfolders';
    IpcEvents["LOCALFOLDERS_GET"] = 'get-localfolders';
    IpcEvents["LOCALFOLDERS_SET"] = 'set-localfolders';
    IpcEvents["LOCAL_METAS"] = 'get-metas';
    IpcEvents["QUEUE_CLEAR"] = 'clear-queue';
    IpcEvents["QUEUE"] = 'queue';
    IpcEvents["QUEUE_ADD"] = 'queue-add';
    IpcEvents["QUEUE_DROP"] = 'queue_drop';
    IpcEvents["LOCAL_FILES"] = 'local-files';
    IpcEvents["LOCAL_FILES_PROGRESS"] = 'local-files-progress';
    IpcEvents["LOCAL_FILES_ERROR"] = 'local-files-error';
    IpcEvents["WINDOW_CMD"] = 'window-cmd';
    IpcEvents["RENDERER_LOG"] = 'renderer-log';
    IpcEvents["FILE_START_DRAG"] = 'file-start-drag';
    IpcEvents["GET_OPTION"] = 'get-option';
    IpcEvents["SET_OPTION"] = 'set-option';
    IpcEvents["SET_OPTION_SENSITIVE"] = 'set-option-sensitive';
    IpcEvents["LASTFM_LOGIN"] = 'lastfm-login';
    IpcEvents["LASTFM_SESSION"] = 'lastfm-session';
    IpcEvents["INITIAL_INFO"] = 'initial-info';
    IpcEvents["MUSIC_OPEN_EDITOR"] = 'music-open-editor';
    IpcEvents["DB_UPDATE"] = 'db-update';
    IpcEvents["DB_REMOVE"] = 'db-remove';
    IpcEvents["MUSIC_BACK"] = 'music-back';
    IpcEvents["MUSIC_PLAY"] = 'music-play';
    IpcEvents["MUSIC_FORWARD"] = 'music-forward';
    IpcEvents["MUSIC_MOOD"] = 'music-mood';
    IpcEvents["MOOD_ADD"] = 'mood-add';
    IpcEvents["MANUAL_UPDATE"] = 'manual-update';
})(IpcEvents || (IpcEvents = {}));
const IpcEvents$1 = IpcEvents;

var Acodec;
(function(Acodec) {
    Acodec["Mp4A402"] = 'mp4a.40.2';
    Acodec["Mp4A405"] = 'mp4a.40.5';
    Acodec["None"] = 'none';
    Acodec["Opus"] = 'opus';
})(Acodec || (Acodec = {}));
var DynamicRange;
(function(DynamicRange) {
    DynamicRange["SDR"] = "SDR";
})(DynamicRange || (DynamicRange = {}));
var Ext;
(function(Ext) {
    Ext["M4A"] = 'm4a';
    Ext["None"] = 'none';
    Ext["Webm"] = 'webm';
})(Ext || (Ext = {}));
var Container$1;
(function(Container) {
    Container["M4ADash"] = 'm4a_dash';
    Container["Mp4Dash"] = 'mp4_dash';
    Container["WebmDash"] = 'webm_dash';
})(Container$1 || (Container$1 = {}));
var Accept;
(function(Accept) {
    Accept["TexthtmlApplicationxhtmlxmlApplicationxmlQ09Q08"] = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
})(Accept || (Accept = {}));
var AcceptLanguage;
(function(AcceptLanguage) {
    AcceptLanguage["EnUsEnQ05"] = 'en-us,en;q=0.5';
})(AcceptLanguage || (AcceptLanguage = {}));
var SecFetchMode;
(function(SecFetchMode) {
    SecFetchMode["Navigate"] = 'navigate';
})(SecFetchMode || (SecFetchMode = {}));
var Protocol;
(function(Protocol) {
    Protocol["Https"] = 'https';
    Protocol["Mhtml"] = 'mhtml';
})(Protocol || (Protocol = {}));
var Videoext;
(function(Videoext) {
    Videoext["Mp4"] = 'mp4';
    Videoext["None"] = 'none';
    Videoext["The3Gp"] = '3gp';
    Videoext["Webm"] = 'webm';
})(Videoext || (Videoext = {}));

function _ts_decorate$h(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$g(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Mood = class Mood {
    id;
    name;
    color;
    icon;
    order;
    songs;
};
_ts_decorate$h([
    typeorm.PrimaryGeneratedColumn(),
    _ts_metadata$g("design:type", Number)
], Mood.prototype, "id", void 0);
_ts_decorate$h([
    typeorm.Column(),
    _ts_metadata$g("design:type", String)
], Mood.prototype, "name", void 0);
_ts_decorate$h([
    typeorm.Column({
        default: '#77ee77',
        length: 7
    }),
    _ts_metadata$g("design:type", String)
], Mood.prototype, "color", void 0);
_ts_decorate$h([
    typeorm.Column({
        default: 'fas:music-note'
    }),
    _ts_metadata$g("design:type", String)
], Mood.prototype, "icon", void 0);
_ts_decorate$h([
    typeorm.Column({
        default: false
    }),
    _ts_metadata$g("design:type", Number)
], Mood.prototype, "order", void 0);
_ts_decorate$h([
    typeorm.ManyToMany(()=>Song, (song)=>song.mood),
    _ts_metadata$g("design:type", Array)
], Mood.prototype, "songs", void 0);
Mood = _ts_decorate$h([
    typeorm.Entity()
], Mood);

function _ts_decorate$g(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$f(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Song = class Song {
    id;
    muid;
    position;
    title;
    path;
    artist;
    duration;
    album;
    thumbnail;
    lastScanned;
    favorite;
    in;
    out;
    metadata;
    mood;
};
_ts_decorate$g([
    typeorm.PrimaryGeneratedColumn(),
    _ts_metadata$f("design:type", Number)
], Song.prototype, "id", void 0);
_ts_decorate$g([
    typeorm.Column({
        nullable: true,
        unique: true
    }),
    _ts_metadata$f("design:type", String)
], Song.prototype, "muid", void 0);
_ts_decorate$g([
    typeorm.Column({
        default: 0,
        type: 'integer'
    }),
    _ts_metadata$f("design:type", Number)
], Song.prototype, "position", void 0);
_ts_decorate$g([
    typeorm.Column(),
    _ts_metadata$f("design:type", String)
], Song.prototype, "title", void 0);
_ts_decorate$g([
    typeorm.Column({
        unique: true
    }),
    _ts_metadata$f("design:type", String)
], Song.prototype, "path", void 0);
_ts_decorate$g([
    typeorm.Column(),
    _ts_metadata$f("design:type", String)
], Song.prototype, "artist", void 0);
_ts_decorate$g([
    typeorm.Column(),
    _ts_metadata$f("design:type", Number)
], Song.prototype, "duration", void 0);
_ts_decorate$g([
    typeorm.Column({
        nullable: true
    }),
    _ts_metadata$f("design:type", String)
], Song.prototype, "album", void 0);
_ts_decorate$g([
    typeorm.Column(),
    _ts_metadata$f("design:type", String)
], Song.prototype, "thumbnail", void 0);
_ts_decorate$g([
    typeorm.Column({
        nullable: true
    }),
    _ts_metadata$f("design:type", Number)
], Song.prototype, "lastScanned", void 0);
_ts_decorate$g([
    typeorm.Column({
        default: false
    }),
    _ts_metadata$f("design:type", Boolean)
], Song.prototype, "favorite", void 0);
_ts_decorate$g([
    typeorm.Column({
        default: 0
    }),
    _ts_metadata$f("design:type", Number)
], Song.prototype, "in", void 0);
_ts_decorate$g([
    typeorm.Column(),
    _ts_metadata$f("design:type", Number)
], Song.prototype, "out", void 0);
_ts_decorate$g([
    typeorm.Column('simple-json'),
    _ts_metadata$f("design:type", typeof VideoInfo === "undefined" ? Object : VideoInfo)
], Song.prototype, "metadata", void 0);
_ts_decorate$g([
    typeorm.ManyToMany(()=>Mood, (mood)=>mood.songs),
    typeorm.JoinTable(),
    _ts_metadata$f("design:type", Array)
], Song.prototype, "mood", void 0);
Song = _ts_decorate$g([
    typeorm.Entity()
], Song);

function _ts_decorate$f(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$e(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Database = class Database extends typeorm.DataSource {
    dbPath;
    ready;
    constructor(){
        const dbPath = path.join(require$$0.app.getPath('userData'), 'music.db');
        super({
            type: 'better-sqlite3',
            database: dbPath,
            entities: [
                Song,
                Mood
            ],
            migrations: [
                './migrations/*.ts',
                './migrations/*.js'
            ],
            migrationsRun: true,
            migrationsTableName: 'peepo_migrations',
            synchronize: true
        });
        this.dbPath = dbPath;
        this.ready = this.registerSchemas();
    }
    onModuleDestroy() {
        return this.destroy();
    }
    async registerSchemas() {
        await this.initialize();
    }
    get songs() {
        return this.getRepository(Song);
    }
    get moods() {
        return this.getRepository(Mood);
    }
};
Database = _ts_decorate$f([
    inversify.injectable(),
    _ts_metadata$e("design:type", Function),
    _ts_metadata$e("design:paramtypes", [])
], Database);

function _ts_decorate$e(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$d(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Config = class Config2 {
  acousticId;
  isConnected = false;
  youtubeUrl;
  youtubeSearch;
  title;
  appid;
  supportedFormats;
  icon;
  icons;
  buildResourcesPath;
  macIcon;
  discordClientId;
  thumbCleanInterval;
  sqliteDbName;
  fpcalcPath;
  constructor() {
    this.title = "Peepo Sings";
    this.appid = "peeposings";
    this.youtubeUrl = "https://www.youtube.com/watch";
    this.youtubeSearch = "https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&maxResults=50&q=";
    this.supportedFormats = _.uniq(fileAssociations.map(({ ext }) => ext));
    const buildResourcesPath = path.resolve(__dirname, this.isProd() ? "../../resources/" : "../../resources/");
    console.log("buildResourcesPath:", chalk.green(buildResourcesPath));
    this.buildResourcesPath = buildResourcesPath;
    const platform = process.platform === "darwin" ? "macos" : process.platform === "win32" ? "windows" : "linux";
    this.fpcalcPath = path.join(buildResourcesPath, `bin${!this.isProd() ? `/${platform}` : ""}`, `fpcalc${platform === "windows" ? ".exe" : ""}`);
    console.log("fpcalcPath:", this.fpcalcPath);
    this.icon = path.resolve(buildResourcesPath, "icon.ico");
    this.macIcon = path.resolve(buildResourcesPath, "icon.png");
    this.mapIcons();
    this.thumbCleanInterval = 30;
    this.sqliteDbName = "peepo-db.sqlite";
    console.log("Env variables loaded");
    this.acousticId = {
      key: "oERijnvBZ0",
      url: "https://api.acoustid.org/v2/lookup"
    };
    this.discordClientId = "940441365286903868";
  }
  mapIcons() {
    const iconPath = path.resolve(this.buildResourcesPath, "./icons");
    const icons = fs.readdirSync(iconPath);
    console.log("icons:", icons.join());
    this.icons = icons.reduce((acc, icon) => {
      acc[icon.split(".")[0]] = {
        path: path.resolve(iconPath, icon),
        img: require$$0.nativeImage.createFromPath(path.join(this.buildResourcesPath, "icons", icon))
      };
      return acc;
    }, {});
  }
  isDev() {
    return true;
  }
  isProd() {
    return require$$0.app.isPackaged;
  }
  isFileSupported(filePath) {
    return this.supportedFormats.includes(path.extname(filePath).split(".")[1]);
  }
  setConnectivity(isConnected) {
    this.isConnected = isConnected;
  }
  getIcon(string) {
    const icon = this.icons[string];
    if (!icon) {
      console.log("Icon not found", string);
      console.log(chalk.greenBright("Available icons:"), Object.keys(this.icons));
    } else {
      console.log("Icon found:", icon.img.getSize());
    }
    return icon;
  }
};
Config = _ts_decorate$e([
  inversify.injectable(),
  _ts_metadata$d("design:type", Function),
  _ts_metadata$d("design:paramtypes", [])
], Config);
const Config$1 = Config;
const fileAssociations = [
  {
    ext: "mp3",
    mimeType: "audio/mp3"
  },
  {
    ext: "mp3",
    mimeType: "audio/mpeg"
  },
  {
    ext: "ogg",
    mimeType: "audio/ogg"
  },
  {
    ext: "opus",
    mimeType: "audio/ogg"
  },
  {
    ext: "aac",
    mimeType: "audio/aac"
  },
  {
    ext: "flac",
    mimeType: "audio/flac"
  },
  {
    ext: "wav",
    mimeType: "audio/x-wav"
  },
  {
    ext: "m4a",
    mimeType: "audio/m4a"
  },
  {
    ext: "weba",
    mimeType: "audio/weba"
  },
  {
    ext: "mp4",
    mimeType: "audio/mp4"
  },
  {
    ext: "webm",
    mimeType: "audio/webm"
  }
];

function _ts_decorate$d(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$c(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$9(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let Store = class Store extends ElectronStore {
    config;
    constructor(config){
        super({
            name: 'settings'
        });
        this.config = config;
        if (!this.getOption('invidious.url')) {
            this.setOption('invidious.url', this.config.defaultInvidiousUrl);
        }
        if (!this.getLastThumbCleanDate()) {
            this.setLastThumbCleanDate(new Date());
        }
        console.log(`Initialized settings store at ${this.path}`);
    }
    getOption(key) {
        const value = this.get(`settings.${key}`) || {};
        return value;
    }
    setOption(key, value) {
        try {
            if (!value) {
                this.delete(`settings.${key}`);
            } else this.set(`settings.${key}`, value);
        } catch (e) {
            console.error(e);
        }
    }
    getAll() {
        const settings = this.get('settings') || {};
        return settings;
    }
    async setAvailableHttpPort(startPort, endPort) {
        const { default: getPort , portNumbers  } = await import('get-port');
        const availablePort = await getPort({
            port: portNumbers(startPort, endPort)
        });
        this.setOption('api.port', availablePort);
    }
    getLastThumbCleanDate() {
        const time = this.get('last-thumb-clean-date');
        if (time) {
            return new Date(time);
        }
    }
    setLastThumbCleanDate(date) {
        this.set('last-thumb-clean-date', date.getTime());
    }
};
Store = _ts_decorate$d([
    inversify.injectable(),
    _ts_param$9(0, inversify.inject(Config$1)),
    _ts_metadata$c("design:type", Function),
    _ts_metadata$c("design:paramtypes", [
        typeof Config$1 === "undefined" ? Object : Config$1
    ])
], Store);
const Store$1 = Store;

function _ts_decorate$c(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
var PlatformNames;
(function(PlatformNames) {
    PlatformNames["LINUX"] = 'linux';
    PlatformNames["WINDOWS"] = 'win';
    PlatformNames["MAC"] = 'mac';
})(PlatformNames || (PlatformNames = {}));
let Platform = class Platform {
    getPlatform() {
        if (process.platform === 'win32') {
            return PlatformNames.WINDOWS;
        } else if (process.platform === 'darwin') {
            return PlatformNames.MAC;
        } else {
            return PlatformNames.LINUX;
        }
    }
    isLinux() {
        return this.getPlatform() === PlatformNames.LINUX;
    }
    isMac() {
        return process.platform === 'darwin';
    }
    isWindows() {
        return process.platform === 'win32';
    }
    getBinaryPath() {
        return process.env.NODE_ENV === 'production' && require$$0.app.isPackaged ? path.join(path.dirname(require$$0.app.getAppPath()), '..', './resources', './bin') : path.join(__dirname, '../bin', this.getPlatform());
    }
};
Platform = _ts_decorate$c([
    inversify.injectable()
], Platform);
const Platform$1 = Platform;

function _ts_decorate$b(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$b(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$8(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
const ROOT_PATH = {
    dist: path.resolve(__dirname, '..')
};
let Window = class Window {
    config;
    platform;
    browserWindow;
    mainWindowState;
    isReady;
    resolve;
    paused;
    thumbarButtons;
    userTasks;
    appIcon;
    constructor(config, platform, store){
        this.config = config;
        this.platform = platform;
        this.paused = false;
        this.appIcon = require$$0.nativeImage.createFromPath(path.join(__dirname, '../..', 'resources', process.platform === 'win32' ? 'icon.ico' : 'icon.png'));
        this.mainWindowState = windowStateKeeper({
            defaultWidth: 1000,
            defaultHeight: 800
        });
        const preload = path.join(__dirname, '../preload/index.js');
        console.debug('initializing window with the following dirNames:');
        console.dir({
            dist: ROOT_PATH.dist,
            preload
        });
        this.browserWindow = new require$$0.BrowserWindow({
            title: config.title,
            x: this.mainWindowState.x,
            y: this.mainWindowState.y,
            width: this.mainWindowState.width,
            height: this.mainWindowState.height,
            minWidth: 775,
            icon: this.appIcon,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                nodeIntegrationInWorker: true,
                preload
            },
            frame: !store.getOption('framelessWindow') || false,
            show: false
        });
        if (platform.isMac()) {
            require$$0.app.dock.setIcon(this.appIcon);
        }
        if (platform.isWindows()) {
            this.thumbarButtons = [
                {
                    tooltip: 'Previous Song',
                    icon: this.config.getIcon('step-backward')?.img,
                    click: ()=>{
                        console.log('clicked', IpcEvents$1.MUSIC_BACK);
                        this.send(IpcEvents$1.MUSIC_BACK);
                    }
                },
                {
                    tooltip: 'Play',
                    icon: this.config.getIcon('play')?.img,
                    click: ()=>{
                        console.log('clicked', IpcEvents$1.PLAYPAUSE);
                        this.togglePlayPause();
                    }
                },
                {
                    tooltip: 'Forward Song',
                    icon: this.config.getIcon('step-forward')?.img,
                    click: ()=>{
                        console.log('clicked', IpcEvents$1.MUSIC_FORWARD);
                        this.send(IpcEvents$1.MUSIC_FORWARD);
                    }
                }
            ];
            this.userTasks = [
                {
                    program: process.execPath,
                    arguments: '--play-pause',
                    iconPath: process.execPath,
                    iconIndex: 0,
                    title: 'Download Clipboard',
                    description: 'Download Song from Clipboard'
                }
            ];
            this.browserWindow.flashFrame(true);
            this.browserWindow.once('focus', ()=>this.browserWindow.flashFrame(false));
        } else this.thumbarButtons = this.userTasks = [];
        this.isReady = new Promise((resolve)=>{
            this.resolve = resolve;
        });
        this.browserWindow.once('ready-to-show', ()=>{
            this.browserWindow.show();
            console.log('ready-to-show');
            if (this.config.isDev()) {
                this.browserWindow.webContents.openDevTools();
            }
            this.updateThumbarButtons();
            this.resolve?.();
        });
        this.browserWindow.webContents.setWindowOpenHandler(({ url  })=>{
            if (url.startsWith('https:')) require$$0.shell.openExternal(url);
            return {
                action: 'deny'
            };
        });
        this.mainWindowState.manage(this.browserWindow);
    }
    togglePlayPause(paused = !this.paused, fromWindow) {
        if (!fromWindow) this.send(IpcEvents$1.PLAYPAUSE);
        this.thumbarButtons[1].icon = paused ? this.config.getIcon('pause')?.img : this.config.getIcon('play')?.img;
        this.thumbarButtons[1].tooltip = paused ? 'Pause' : 'Play';
        this.updateThumbarButtons();
        this.paused = paused;
    }
    send(event, ...param) {
        electronBetterIpc.ipcMain.callRenderer(this.browserWindow, event, ...param);
    }
    focus() {
        this.browserWindow.focus();
    }
    getBrowserWindow() {
        return this.browserWindow;
    }
    load() {
        const url = process.env['ELECTRON_RENDERER_URL'], indexHtml = path.join(ROOT_PATH.dist, 'renderer/index.html');
        if (!this.config.isDev()) {
            console.debug('window loading url:', indexHtml);
            this.browserWindow.loadFile(indexHtml);
        } else {
            console.debug('window loading url:', url);
            this.browserWindow.loadURL(url);
        }
        return this.isReady;
    }
    minimize() {
        this.browserWindow.minimize();
    }
    maximize() {
        if (this.platform.isMac()) {
            this.browserWindow.isFullScreen() ? this.browserWindow.setFullScreen(false) : this.browserWindow.setFullScreen(true);
        } else {
            this.browserWindow.isMaximized() ? this.browserWindow.unmaximize() : this.browserWindow.maximize();
        }
    }
    restore() {
        if (this.browserWindow.isMinimized()) {
            this.browserWindow.restore();
        }
    }
    setProgressBar(number) {
        this.browserWindow.setProgressBar(number);
    }
    setTitle(title) {
        this.browserWindow.setTitle(title);
    }
    updateThumbarButtons() {
        if (!this.platform.isWindows()) return;
        this.browserWindow.setThumbarButtons(this.thumbarButtons) ? console.log('thumbar buttons set') : console.error('thumbar buttons not set');
    }
    clearThumbarButtons() {
        if (!this.platform.isWindows()) return;
        this.thumbarButtons = [];
        this.updateThumbarButtons();
    }
    openDevTools() {
        if (this.browserWindow.webContents.isDevToolsOpened()) {
            this.browserWindow.webContents.closeDevTools();
        } else {
            this.browserWindow.webContents.openDevTools({
                mode: 'detach'
            });
        }
    }
    async installDevTools() {
        try {
            if (this.config.isDev()) {
                const { default: installExtension , REACT_DEVELOPER_TOOLS , REDUX_DEVTOOLS  } = await Promise.resolve().then(() => require('./index-DY2Tv1qg.cjs')).then(n => n.index);
                installExtension([
                    REACT_DEVELOPER_TOOLS,
                    REDUX_DEVTOOLS
                ]);
            }
        } catch (err) {
            console.warn('something fails while trying to install devtools');
        }
    }
    close() {
        this.browserWindow.close();
    }
    showError(e) {
        require$$0.dialog.showErrorBox('Error', e.message ?? JSON.stringify(e));
    }
};
Window = _ts_decorate$b([
    inversify.injectable(),
    _ts_param$8(0, inversify.inject(Config$1)),
    _ts_param$8(1, inversify.inject(Platform$1)),
    _ts_param$8(2, inversify.inject(Store$1)),
    _ts_metadata$b("design:type", Function),
    _ts_metadata$b("design:paramtypes", [
        typeof Config$1 === "undefined" ? Object : Config$1,
        typeof Platform$1 === "undefined" ? Object : Platform$1,
        typeof Store$1 === "undefined" ? Object : Store$1
    ])
], Window);
const Window$1 = Window;

var dist = {};

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	var __awaiter = (dist && dist.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (dist && dist.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var __importDefault = (dist && dist.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(dist, "__esModule", { value: true });
	var events_1 = require$$0$1;
	var child_process_1 = require$$1;
	var fs_1 = __importDefault(fs);
	var https_1 = __importDefault(require$$3);
	var os_1 = __importDefault(require$$4);
	var stream_1 = require$$5;
	var executableName = 'yt-dlp';
	var progressRegex = /\[download\] *(.*) of ([^ ]*)(:? *at *([^ ]*))?(:? *ETA *([^ ]*))?/;
	var YTDlpWrap = /** @class */ (function () {
	    function YTDlpWrap(binaryPath) {
	        if (binaryPath === void 0) { binaryPath = executableName; }
	        this.binaryPath = binaryPath;
	    }
	    YTDlpWrap.prototype.getBinaryPath = function () {
	        return this.binaryPath;
	    };
	    YTDlpWrap.prototype.setBinaryPath = function (binaryPath) {
	        this.binaryPath = binaryPath;
	    };
	    YTDlpWrap.createGetMessage = function (url) {
	        return new Promise(function (resolve, reject) {
	            https_1.default.get(url, function (httpResponse) {
	                httpResponse.on('error', function (e) { return reject(e); });
	                resolve(httpResponse);
	            });
	        });
	    };
	    YTDlpWrap.processMessageToFile = function (message, filePath) {
	        var file = fs_1.default.createWriteStream(filePath);
	        return new Promise(function (resolve, reject) {
	            message.pipe(file);
	            message.on('error', function (e) { return reject(e); });
	            file.on('finish', function () {
	                return message.statusCode == 200 ? resolve(message) : reject(message);
	            });
	        });
	    };
	    YTDlpWrap.downloadFile = function (fileURL, filePath) {
	        return __awaiter(this, void 0, void 0, function () {
	            var currentUrl, message;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        currentUrl = fileURL;
	                        _a.label = 1;
	                    case 1:
	                        if (!currentUrl) return [3 /*break*/, 6];
	                        return [4 /*yield*/, YTDlpWrap.createGetMessage(currentUrl)];
	                    case 2:
	                        message = _a.sent();
	                        if (!message.headers.location) return [3 /*break*/, 3];
	                        currentUrl = message.headers.location;
	                        return [3 /*break*/, 5];
	                    case 3: return [4 /*yield*/, YTDlpWrap.processMessageToFile(message, filePath)];
	                    case 4: return [2 /*return*/, _a.sent()];
	                    case 5: return [3 /*break*/, 1];
	                    case 6: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    YTDlpWrap.getGithubReleases = function (page, perPage) {
	        if (page === void 0) { page = 1; }
	        if (perPage === void 0) { perPage = 1; }
	        return new Promise(function (resolve, reject) {
	            var apiURL = 'https://api.github.com/repos/yt-dlp/yt-dlp/releases?page=' +
	                page +
	                '&per_page=' +
	                perPage;
	            https_1.default.get(apiURL, { headers: { 'User-Agent': 'node' } }, function (response) {
	                var resonseString = '';
	                response.setEncoding('utf8');
	                response.on('data', function (body) { return (resonseString += body); });
	                response.on('error', function (e) { return reject(e); });
	                response.on('end', function () {
	                    return response.statusCode == 200
	                        ? resolve(JSON.parse(resonseString))
	                        : reject(response);
	                });
	            });
	        });
	    };
	    YTDlpWrap.downloadFromGithub = function (filePath, version, platform) {
	        if (platform === void 0) { platform = os_1.default.platform(); }
	        return __awaiter(this, void 0, void 0, function () {
	            var isWin32, fileName, fileURL;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        isWin32 = platform == 'win32';
	                        fileName = "".concat(executableName).concat(isWin32 ? '.exe' : '');
	                        if (!!version) return [3 /*break*/, 2];
	                        return [4 /*yield*/, YTDlpWrap.getGithubReleases(1, 1)];
	                    case 1:
	                        version = (_a.sent())[0].tag_name;
	                        _a.label = 2;
	                    case 2:
	                        if (!filePath)
	                            filePath = './' + fileName;
	                        fileURL = 'https://github.com/yt-dlp/yt-dlp/releases/download/' +
	                            version +
	                            '/' +
	                            fileName;
	                        return [4 /*yield*/, YTDlpWrap.downloadFile(fileURL, filePath)];
	                    case 3:
	                        _a.sent();
	                        !isWin32 && fs_1.default.chmodSync(filePath, '777');
	                        return [2 /*return*/];
	                }
	            });
	        });
	    };
	    YTDlpWrap.prototype.exec = function (ytDlpArguments, options, abortSignal) {
	        if (ytDlpArguments === void 0) { ytDlpArguments = []; }
	        if (options === void 0) { options = {}; }
	        if (abortSignal === void 0) { abortSignal = null; }
	        options = YTDlpWrap.setDefaultOptions(options);
	        var execEventEmitter = new events_1.EventEmitter();
	        var ytDlpProcess = (0, child_process_1.spawn)(this.binaryPath, ytDlpArguments, options);
	        execEventEmitter.ytDlpProcess = ytDlpProcess;
	        YTDlpWrap.bindAbortSignal(abortSignal, ytDlpProcess);
	        var stderrData = '';
	        var processError;
	        ytDlpProcess.stdout.on('data', function (data) {
	            return YTDlpWrap.emitYoutubeDlEvents(data.toString(), execEventEmitter);
	        });
	        ytDlpProcess.stderr.on('data', function (data) { return (stderrData += data.toString()); });
	        ytDlpProcess.on('error', function (error) { return (processError = error); });
	        ytDlpProcess.on('close', function (code) {
	            if (code === 0 || ytDlpProcess.killed)
	                execEventEmitter.emit('close', code);
	            else
	                execEventEmitter.emit('error', YTDlpWrap.createError(code, processError, stderrData));
	        });
	        return execEventEmitter;
	    };
	    YTDlpWrap.prototype.execPromise = function (ytDlpArguments, options, abortSignal) {
	        var _this = this;
	        if (ytDlpArguments === void 0) { ytDlpArguments = []; }
	        if (options === void 0) { options = {}; }
	        if (abortSignal === void 0) { abortSignal = null; }
	        var ytDlpProcess;
	        var ytDlpPromise = new Promise(function (resolve, reject) {
	            options = YTDlpWrap.setDefaultOptions(options);
	            ytDlpProcess = (0, child_process_1.execFile)(_this.binaryPath, ytDlpArguments, options, function (error, stdout, stderr) {
	                if (error)
	                    reject(YTDlpWrap.createError(error, null, stderr));
	                resolve(stdout);
	            });
	            YTDlpWrap.bindAbortSignal(abortSignal, ytDlpProcess);
	        });
	        ytDlpPromise.ytDlpProcess = ytDlpProcess;
	        return ytDlpPromise;
	    };
	    YTDlpWrap.prototype.execStream = function (ytDlpArguments, options, abortSignal) {
	        if (ytDlpArguments === void 0) { ytDlpArguments = []; }
	        if (options === void 0) { options = {}; }
	        if (abortSignal === void 0) { abortSignal = null; }
	        var readStream = new stream_1.Readable({ read: function (size) { } });
	        options = YTDlpWrap.setDefaultOptions(options);
	        ytDlpArguments = ytDlpArguments.concat(['-o', '-']);
	        var ytDlpProcess = (0, child_process_1.spawn)(this.binaryPath, ytDlpArguments, options);
	        readStream.ytDlpProcess = ytDlpProcess;
	        YTDlpWrap.bindAbortSignal(abortSignal, ytDlpProcess);
	        var stderrData = '';
	        var processError;
	        ytDlpProcess.stdout.on('data', function (data) { return readStream.push(data); });
	        ytDlpProcess.stderr.on('data', function (data) {
	            var stringData = data.toString();
	            YTDlpWrap.emitYoutubeDlEvents(stringData, readStream);
	            stderrData += stringData;
	        });
	        ytDlpProcess.on('error', function (error) { return (processError = error); });
	        ytDlpProcess.on('close', function (code) {
	            if (code === 0 || ytDlpProcess.killed) {
	                readStream.emit('close');
	                readStream.destroy();
	                readStream.emit('end');
	            }
	            else {
	                var error = YTDlpWrap.createError(code, processError, stderrData);
	                readStream.emit('error', error);
	                readStream.destroy(error);
	            }
	        });
	        return readStream;
	    };
	    YTDlpWrap.prototype.getExtractors = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var ytDlpStdout;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, this.execPromise(['--list-extractors'])];
	                    case 1:
	                        ytDlpStdout = _a.sent();
	                        return [2 /*return*/, ytDlpStdout.split('\n')];
	                }
	            });
	        });
	    };
	    YTDlpWrap.prototype.getExtractorDescriptions = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var ytDlpStdout;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, this.execPromise(['--extractor-descriptions'])];
	                    case 1:
	                        ytDlpStdout = _a.sent();
	                        return [2 /*return*/, ytDlpStdout.split('\n')];
	                }
	            });
	        });
	    };
	    YTDlpWrap.prototype.getHelp = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var ytDlpStdout;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, this.execPromise(['--help'])];
	                    case 1:
	                        ytDlpStdout = _a.sent();
	                        return [2 /*return*/, ytDlpStdout];
	                }
	            });
	        });
	    };
	    YTDlpWrap.prototype.getUserAgent = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var ytDlpStdout;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, this.execPromise(['--dump-user-agent'])];
	                    case 1:
	                        ytDlpStdout = _a.sent();
	                        return [2 /*return*/, ytDlpStdout];
	                }
	            });
	        });
	    };
	    YTDlpWrap.prototype.getVersion = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var ytDlpStdout;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, this.execPromise(['--version'])];
	                    case 1:
	                        ytDlpStdout = _a.sent();
	                        return [2 /*return*/, ytDlpStdout];
	                }
	            });
	        });
	    };
	    YTDlpWrap.prototype.getVideoInfo = function (ytDlpArguments) {
	        return __awaiter(this, void 0, void 0, function () {
	            var ytDlpStdout;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        if (typeof ytDlpArguments == 'string')
	                            ytDlpArguments = [ytDlpArguments];
	                        if (!ytDlpArguments.includes('-f') &&
	                            !ytDlpArguments.includes('--format'))
	                            ytDlpArguments = ytDlpArguments.concat(['-f', 'best']);
	                        return [4 /*yield*/, this.execPromise(ytDlpArguments.concat(['--dump-json']))];
	                    case 1:
	                        ytDlpStdout = _a.sent();
	                        try {
	                            return [2 /*return*/, JSON.parse(ytDlpStdout)];
	                        }
	                        catch (e) {
	                            return [2 /*return*/, JSON.parse('[' + ytDlpStdout.replace(/\n/g, ',').slice(0, -1) + ']')];
	                        }
	                        return [2 /*return*/];
	                }
	            });
	        });
	    };
	    YTDlpWrap.bindAbortSignal = function (signal, process) {
	        signal === null || signal === void 0 ? void 0 : signal.addEventListener('abort', function () {
	            try {
	                if (os_1.default.platform() === 'win32')
	                    (0, child_process_1.execSync)("taskkill /pid ".concat(process.pid, " /T /F"));
	                else {
	                    (0, child_process_1.execSync)("pgrep -P ".concat(process.pid, " | xargs -L 1 kill"));
	                }
	            }
	            catch (e) {
	                // at least we tried
	            }
	            finally {
	                process.kill(); // call to make sure that object state is updated even if task might be already killed by OS
	            }
	        });
	    };
	    YTDlpWrap.setDefaultOptions = function (options) {
	        if (!options.maxBuffer)
	            options.maxBuffer = 1024 * 1024 * 1024;
	        return options;
	    };
	    YTDlpWrap.createError = function (code, processError, stderrData) {
	        var errorMessage = '\nError code: ' + code;
	        if (processError)
	            errorMessage += '\n\nProcess error:\n' + processError;
	        if (stderrData)
	            errorMessage += '\n\nStderr:\n' + stderrData;
	        return new Error(errorMessage);
	    };
	    YTDlpWrap.emitYoutubeDlEvents = function (stringData, emitter) {
	        var outputLines = stringData.split(/\r|\n/g).filter(Boolean);
	        for (var _i = 0, outputLines_1 = outputLines; _i < outputLines_1.length; _i++) {
	            var outputLine = outputLines_1[_i];
	            if (outputLine[0] == '[') {
	                var progressMatch = outputLine.match(progressRegex);
	                if (progressMatch) {
	                    var progressObject = {};
	                    progressObject.percent = parseFloat(progressMatch[1].replace('%', ''));
	                    progressObject.totalSize = progressMatch[2].replace('~', '');
	                    progressObject.currentSpeed = progressMatch[4];
	                    progressObject.eta = progressMatch[6];
	                    emitter.emit('progress', progressObject);
	                }
	                var eventType = outputLine
	                    .split(' ')[0]
	                    .replace('[', '')
	                    .replace(']', '');
	                var eventData = outputLine.substring(outputLine.indexOf(' '), outputLine.length);
	                emitter.emit('ytDlpEvent', eventType, eventData);
	            }
	        }
	    };
	    return YTDlpWrap;
	}());
	dist.default = YTDlpWrap;
	
	return dist;
}

var distExports = requireDist();
const YTDlpWrap = /*@__PURE__*/getDefaultExportFromCjs(distExports);

function _ts_decorate$a(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$a(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$7(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
ffmpeg.setFfmpegPath(ffmpeg$1.path);
let MusicManager = class MusicManager {
    window;
    db;
    config;
    ytdlPath;
    ffmpegPath;
    binPath;
    ytdl;
    musicPath;
    currentDownload;
    dlInfo;
    constructor(window, db, config){
        this.window = window;
        this.db = db;
        this.config = config;
        this.currentDownload = null;
        this.binPath = path.resolve(require$$0.app.getPath('exe'), this.config.isProd() ? '../' : '../../../..', 'bin');
        this.ytdlPath = path.resolve(this.binPath, `yt-dlp${process.platform === 'win32' ? '.exe' : ''}`);
        this.musicPath = path.join(require$$0.app.getPath('music'), 'peepo-sings');
        this.ytdl = new YTDlpWrap(this.ytdlPath);
        this.init();
    }
    async init() {
        const ffmpegInstalled = ffBin.locateBinariesSync([
            'ffmpeg',
            'ffprobe'
        ], {
            ensureExecutable: true,
            paths: [
                this.binPath
            ]
        });
        if (!ffmpegInstalled.ffmpeg.found || !ffmpegInstalled.ffprobe.found || [
            ffmpegInstalled.ffmpeg.version,
            ffmpegInstalled.ffprobe.version
        ].some((v)=>v !== '4.4.1')) {
            await new Promise((resolve, reject)=>{
                ffBin.downloadBinaries([
                    'ffmpeg',
                    'ffprobe'
                ], {
                    destination: this.binPath
                }, (err, binaries)=>{
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    for(let i = 0; i < 2; i++){
                        const binary = binaries[i];
                        if (i === 0) {
                            this.ffmpegPath = path.resolve(binary.path, binary.filename);
                            ffmpeg.setFfmpegPath(this.ffmpegPath);
                            ffmetadata.setFfmpegPath(this.ffmpegPath);
                        } else {
                            ffmpeg.setFfprobePath(path.resolve(binary.path, binary.filename));
                        }
                    }
                    resolve();
                });
            });
            console.log('FFMPEG Installed to:', this.ffmpegPath);
        } else {
            this.ffmpegPath = ffmpegInstalled.ffmpeg.path;
            ffmpeg.setFfprobePath(ffmpegInstalled.ffprobe.path);
            console.log('FFMPEG found at:');
            console.dir(ffmpegInstalled);
        }
        ffmpeg.setFfmpegPath(this.ffmpegPath);
        ffmetadata.setFfmpegPath(this.ffmpegPath);
        console.log('FFMPEG Installed to:', this.ffmpegPath);
        let githubReleasesData = await YTDlpWrap.getGithubReleases(1, 5);
        let currVersion = null;
        if (fs.existsSync(this.ytdlPath)) {
            currVersion = (await this.ytdl.getVersion()).trim();
        }
        if (currVersion !== githubReleasesData[0].tag_name.trim()) {
            await YTDlpWrap.downloadFromGithub(this.ytdlPath).then(()=>{
                console.log('Downloaded Latest yt-dlp, version', githubReleasesData[0].tag_name);
            }).catch((e)=>{
                console.log(e);
            });
        } else {
            console.log('yt-dlp is up to date, version', currVersion);
        }
        require$$0.protocol.registerStreamProtocol('preview', (request, callback)=>{
            const url = request.url.replace('preview', 'https');
            callback(this.getPreviewStream(url));
        });
        await this.readCurrentData();
    }
    showNotification(title, body) {
        const noti = new require$$0.Notification({
            title,
            body
        });
        noti.on('click', ()=>{
            this.window.showError(body);
        });
        noti.show();
    }
    async readCurrentData() {
        if (!fs.existsSync(this.musicPath)) {
            fs.mkdirSync(this.musicPath, {
                recursive: true
            });
        }
        if (!this.db.isInitialized) {
            await new Promise((resolve)=>{
                const to = setInterval(()=>{
                    if (this.db.isInitialized) {
                        clearTimeout(to);
                        resolve();
                    }
                }, 100);
            });
        }
        const files = fs.readdirSync(this.musicPath);
        const knownSongs = await this.db.songs.find();
        console.log('Currently known songs:', knownSongs.map((s)=>s.metadata.title).join(', '));
        for (const file of files){
            const filePath = path.join(this.musicPath, file);
            const song = knownSongs.find((s)=>s.path === filePath);
            if (song) continue;
            ffmpeg.ffprobe(filePath, (err, metadata)=>{
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(metadata);
                const newSong = this.db.songs.create({
                    artist: 'unknown',
                    metadata: {
                        artist: 'unknown',
                        title: file.replace(/\.(mp3|wav|opus)/, ''),
                        duration: metadata.format.duration,
                        thumbnail: ''
                    },
                    path: filePath,
                    in: 0,
                    out: metadata.format.duration,
                    duration: metadata.format.duration,
                    mood: [],
                    title: file.replace(/\.(mp3|wav|opus)/, ''),
                    thumbnail: ''
                });
                this.db.songs.save(newSong);
            });
        }
    }
    removeSong(path) {
        try {
            if (fs.existsSync(path)) {
                fs.rmSync(path, {
                    maxRetries: 5
                });
            }
            this.db.songs.delete({
                path
            });
        } catch (e) {
            console.error(e);
        }
    }
    async addSong(url) {
        this.getYoutubeVideo(url).catch((e)=>{
            console.error('YT vid failed dl:', e);
            return null;
        }).then(async (res)=>{
            if (!res) return Promise.reject('Failed to download video');
            const info = res.info, path = res.path;
            const cleanedMeta = this.cleanMetadata(info);
            const songEntity = this.db.songs.create({
                title: info.track ?? info.title,
                path,
                artist: info.artist ?? info.channel ?? info.creator ?? info.uploader ?? 'Unknown',
                duration: info.duration,
                in: 0,
                out: info.duration,
                thumbnail: info.thumbnail ?? info.thumbnails?.reduceRight((best, cur)=>cur.preference ?? 0 > (best.preference ?? 1) ? cur : best).url,
                metadata: cleanedMeta,
                album: info.album ?? undefined,
                mood: []
            });
            const song = await this.db.songs.save(songEntity);
            setTimeout(()=>{
                electronBetterIpc.ipcMain.callRenderer(this.window.getBrowserWindow(), IpcEvents$1.MUSIC_FINISHED, {
                    path: path,
                    dlInfo: this.dlInfo,
                    song
                });
            }, 1000);
        }).catch((e)=>{
            console.error(e);
            this.showNotification(`Error Occurred Downloading ${url}`, e || 'Unknown Error');
        });
    }
    cleanMetadata(info) {
        const cleanedInfo = {
            ...info,
            thumbnails: info.thumbnails?.filter((thumbnail)=>(thumbnail?.preference ?? -8) > -7)
        };
        delete cleanedInfo.formats;
        delete cleanedInfo.format;
        delete cleanedInfo.requested_formats;
        return cleanedInfo;
    }
    async getYoutubeVideo(url) {
        const info = await this.getYoutubeVideoInfo(url);
        const savePath = path.join(this.musicPath, sanitize((info?.title?.trim() ?? url.match('v=([a-zA-Z0-9_-]+)&?')[1]).replace(/[/|\\]/g, ''), {
            replacement: ''
        }) + '.mp3');
        this.dlInfo = {
            start: Date.now(),
            vidInfo: info ?? {},
            savePath
        };
        let progress = 0;
        let tempPath = await promises.mkdtemp(`${require$$4.tmpdir()}${path.sep}`);
        const tempVidPath = path.join(tempPath, `temp.${info.ext}`);
        let stream = this.ytdl.execStream([
            url,
            '-f',
            'bestaudio'
        ]);
        this.currentDownload = stream;
        stream.pipe(fs.createWriteStream(tempVidPath));
        try {
            await new Promise((resolve, reject)=>{
                stream.on('progress', (prog)=>{
                    this.window.setProgressBar((prog.percent ?? 201) / 200);
                }).on('end', ()=>{
                    resolve();
                }).on('error', (e)=>{
                    reject(e);
                });
            });
        } catch (e) {
            console.error(e);
        }
        const dl = ffmpeg(tempVidPath).audioBitrate(128).save(savePath).on('progress', (p)=>{
            if (p.percent - progress > 0.1) {
                progress = p.percent;
                console.log(`${p.percent}% downloaded`);
                if (this.window) electronBetterIpc.ipcMain.callRenderer(this.window.getBrowserWindow(), IpcEvents$1.MUSIC_PROGRESS, {
                    raw: p,
                    msg: `${p.percent}% downloaded`,
                    dlInfo: this.dlInfo
                });
            }
            this.window.setProgressBar(0.5 + p.percent / 200);
        }).on('error', (err)=>{
            console.error('Cannot process youtube download: ' + err.message);
            if (this.window) electronBetterIpc.ipcMain.callRenderer(this.window.getBrowserWindow(), IpcEvents$1.MUSIC_ERROR, {
                err,
                path: savePath,
                dlInfo: this.dlInfo,
                title: this.dlInfo?.vidInfo.title
            });
            this.window.setProgressBar(-1);
        }).on('end', ()=>{
            console.log(`\nFinished downloading "${this.dlInfo.vidInfo.title}" by ${this.dlInfo.vidInfo.channel}, took ${(Date.now() - (this.dlInfo?.start || Date.now())) / 1000}s`);
            this.window.setProgressBar(-1);
            this.currentDownload = null;
            promises.rm(tempPath, {
                recursive: true,
                force: true,
                maxRetries: 5,
                retryDelay: 500
            });
        });
        return {
            path: savePath,
            info,
            stream: dl
        };
    }
    async getYoutubeVideoInfo(url) {
        if (!url || url.length < 1) return {};
        return await this.ytdl.getVideoInfo([
            url,
            '-f',
            'bestaudio'
        ]);
    }
    async getSongs() {
        return await this.db.songs.find({
            relations: {
                mood: true
            }
        });
    }
    async getMoods() {
        return await this.db.moods.find();
    }
    getPreviewStream(url) {
        console.log('getPreviewStream', url);
        return this.ytdl.execStream([
            url
        ]);
    }
};
MusicManager = _ts_decorate$a([
    inversify.injectable(),
    _ts_param$7(0, inversify.inject(Window$1)),
    _ts_param$7(1, inversify.inject(Database)),
    _ts_param$7(2, inversify.inject(Config$1)),
    _ts_metadata$a("design:type", Function),
    _ts_metadata$a("design:paramtypes", [
        typeof Window$1 === "undefined" ? Object : Window$1,
        typeof Database === "undefined" ? Object : Database,
        typeof Config$1 === "undefined" ? Object : Config$1
    ])
], MusicManager);

const IPC_EVENT_KEY = Symbol('$$ipc-event-prefix');
const eventEmitterControllerFactory = (metadataKey)=>(prefix)=>{
        return (target)=>{
            const proto = target.prototype;
            let events = Reflect.getMetadata(metadataKey, proto) || [];
            if (!events.length) {
                throw new Error(`The controller ${proto.constructor.name} has no event registered, you must register at least one`);
            }
            if (prefix) {
                events = events.map((event)=>({
                        eventName: prefix ? `${prefix}-${event.eventName}` : event.eventName,
                        name: event.name
                    }));
                Reflect.defineMetadata(metadataKey, events, proto);
            }
            return inversify.injectable()(target);
        };
    };
const eventListenerFactory = (metadataKey)=>{
    console.log('eventListenerFactory', metadataKey);
    return (eventName, options)=>{
        console.log('eventListener registered for', eventName);
        return (target, name)=>{
            if (!eventName) {
                throw new Error(`You must specify an event name for method ${name} of class ${target.constructor.name}`);
            }
            const meta = Reflect.getMetadata(metadataKey, target) || [];
            const eventMeta = {
                eventName,
                name
            };
            if (options && options.once) {
                eventMeta.once = options.once;
            }
            if (options && options.log) {
                eventMeta.log = options.log;
            }
            meta.push(eventMeta);
            Reflect.defineMetadata(metadataKey, meta, target);
        };
    };
};
const ipcController = eventEmitterControllerFactory(IPC_EVENT_KEY);
const ipcEvent = eventListenerFactory(IPC_EVENT_KEY);

function _ts_decorate$9(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$9(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$6(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let DatabaseControl = class DatabaseControl {
    db;
    musicManager;
    constructor(db, musicManager){
        this.db = db;
        this.musicManager = musicManager;
    }
    async updateDb([model, criteria, data]) {
        const repoName = `${model}s`;
        const repo = this.db[repoName];
        let entity = await repo.findOneBy(criteria);
        entity = repo.merge(entity, data);
        return await repo.save(entity);
    }
    async removeDb([model, criteria]) {
        if (model === 'song') {
            const result = await this.db.songs.findOneBy(criteria);
            if (!result) return;
            const song = this.musicManager.removeSong(result.path);
            return song;
        }
        let result = model === 'mood' ? await this.db.moods.delete(criteria) : await this.db.songs.delete(criteria);
        return result;
    }
    async addMood(data) {
        const mood = this.db.moods.create(data);
        return await this.db.moods.save(mood);
    }
    async addSongToMood(data) {
        let song = await this.db.songs.findOne({
            where: {
                id: data.song
            },
            relations: {
                mood: true
            }
        });
        let moodToAdd;
        if (!song) return;
        if (Array.isArray(data.mood)) {
            moodToAdd = await this.db.moods.find({
                where: {
                    id: typeorm.In(data.mood)
                }
            });
            moodToAdd = moodToAdd.filter((m)=>song.mood.findIndex((sM)=>sM.id === m.id) === -1);
            song.mood.push(...moodToAdd);
            for(let i = 0; i < song.mood.length; i++){
                if (data.mood.findIndex((m)=>m === song.mood[i].id) === -1) {
                    song.mood.splice(i, 1);
                    i--;
                }
            }
        } else {
            moodToAdd = await this.db.moods.findOneBy({
                id: data.mood
            });
            song.mood.push(moodToAdd);
        }
        return await this.db.songs.save(song);
    }
};
_ts_decorate$9([
    ipcEvent(IpcEvents$1.DB_UPDATE),
    _ts_metadata$9("design:type", Function),
    _ts_metadata$9("design:paramtypes", [
        typeof UpdateCriteria === "undefined" ? Object : UpdateCriteria
    ])
], DatabaseControl.prototype, "updateDb", null);
_ts_decorate$9([
    ipcEvent(IpcEvents$1.DB_REMOVE),
    _ts_metadata$9("design:type", Function),
    _ts_metadata$9("design:paramtypes", [
        typeof FindCriteria === "undefined" ? Object : FindCriteria
    ])
], DatabaseControl.prototype, "removeDb", null);
_ts_decorate$9([
    ipcEvent(IpcEvents$1.MOOD_ADD),
    _ts_metadata$9("design:type", Function),
    _ts_metadata$9("design:paramtypes", [
        typeof Omit === "undefined" ? Object : Omit
    ])
], DatabaseControl.prototype, "addMood", null);
_ts_decorate$9([
    ipcEvent(IpcEvents$1.MUSIC_MOOD),
    _ts_metadata$9("design:type", Function),
    _ts_metadata$9("design:paramtypes", [
        Object
    ])
], DatabaseControl.prototype, "addSongToMood", null);
DatabaseControl = _ts_decorate$9([
    inversify.injectable(),
    _ts_param$6(0, inversify.inject(Database)),
    _ts_param$6(1, inversify.inject(MusicManager)),
    _ts_metadata$9("design:type", Function),
    _ts_metadata$9("design:paramtypes", [
        typeof Database === "undefined" ? Object : Database,
        typeof MusicManager === "undefined" ? Object : MusicManager
    ])
], DatabaseControl);

function _ts_decorate$8(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$8(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$5(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let DownloadController = class DownloadController {
    musicManager;
    config;
    iconName;
    constructor(musicManager, config){
        this.musicManager = musicManager;
        this.config = config;
        this.iconName = path.join(config.buildResourcesPath, 'peepoG.png');
        console.log('DownloadController initialized');
    }
    async addSong(url) {
        await this.musicManager.addSong(url);
    }
    async onDragStart(filePath, sender) {
        console.log('starting drag on file', filePath);
        if (!filePath) return;
        sender.webContents.startDrag({
            file: filePath,
            icon: this.iconName
        });
    }
    async getSongInfo(url) {
        return await this.musicManager.getYoutubeVideoInfo(url);
    }
    async search(query) {
        console.log('searching for', query);
        return await yts(query).catch((e)=>{
            return [];
        });
    }
};
_ts_decorate$8([
    ipcEvent(IpcEvents$1.MUSIC_ADD),
    _ts_metadata$8("design:type", Function),
    _ts_metadata$8("design:paramtypes", [
        String
    ])
], DownloadController.prototype, "addSong", null);
_ts_decorate$8([
    ipcEvent(IpcEvents$1.FILE_START_DRAG),
    _ts_metadata$8("design:type", Function),
    _ts_metadata$8("design:paramtypes", [
        String,
        typeof require$$0.BrowserWindow === "undefined" ? Object : require$$0.BrowserWindow
    ])
], DownloadController.prototype, "onDragStart", null);
_ts_decorate$8([
    ipcEvent(IpcEvents$1.MUSIC_INFO),
    _ts_metadata$8("design:type", Function),
    _ts_metadata$8("design:paramtypes", [
        String
    ])
], DownloadController.prototype, "getSongInfo", null);
_ts_decorate$8([
    ipcEvent(IpcEvents$1.MUSIC_SEARCH),
    _ts_metadata$8("design:type", Function),
    _ts_metadata$8("design:paramtypes", [
        String
    ])
], DownloadController.prototype, "search", null);
DownloadController = _ts_decorate$8([
    ipcController(),
    _ts_param$5(0, inversify.inject(MusicManager)),
    _ts_param$5(1, inversify.inject(Config$1)),
    _ts_metadata$8("design:type", Function),
    _ts_metadata$8("design:paramtypes", [
        typeof MusicManager === "undefined" ? Object : MusicManager,
        typeof Config$1 === "undefined" ? Object : Config$1
    ])
], DownloadController);

function _ts_decorate$7(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$7(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LoggerCtrl = class LoggerCtrl {
    constructor(){}
    onLog(args) {}
};
_ts_decorate$7([
    ipcEvent(IpcEvents$1.RENDERER_LOG),
    _ts_metadata$7("design:type", Function),
    _ts_metadata$7("design:paramtypes", [
        Array
    ])
], LoggerCtrl.prototype, "onLog", null);
LoggerCtrl = _ts_decorate$7([
    ipcController(),
    _ts_metadata$7("design:type", Function),
    _ts_metadata$7("design:paramtypes", [])
], LoggerCtrl);

function _ts_decorate$6(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$6(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$4(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let Discord = class Discord {
    config;
    rpc;
    connected;
    isReady;
    baseStart;
    pauseStart;
    pausedTotal;
    activity;
    constructor(config){
        this.config = config;
        this.connected = false;
        this.isReady = false;
        this.pausedTotal = 0;
    }
    async sendActivity() {
        try {
            await this.rpc.setActivity(this.activity);
            console.log('update discord activity');
        } catch (err) {
            console.error('error trying to set discord activity');
        }
    }
    async pause() {
        if (this.isReady && this.activity) {
            this.pauseStart = Date.now();
            this.activity.details += '\nPaused';
            this.activity.startTimestamp = this.pauseStart;
            return this.sendActivity();
        }
    }
    async play() {
        if (this.isReady && this.activity) {
            this.pausedTotal += Date.now() - this.pauseStart;
            if (this.activity) {
                this.activity.details = this.activity.details?.substring(0, this.activity.details?.length - 8);
                this.activity.startTimestamp = this.baseStart + this.pausedTotal;
                return this.sendActivity();
            }
        }
    }
    async init(cb) {
        DiscordRPC.register(this.config.discordClientId);
        this.rpc = new DiscordRPC.Client({
            transport: 'ipc'
        });
        this.rpc.once('ready', ()=>{
            console.log('connected to discord');
            this.connected = true;
            this.isReady = true;
            cb && cb();
        });
        this.rpc.once('error', (e)=>{
            console.error('error connecting to discord', e);
            this.connected = false;
            this.isReady = false;
        });
        try {
            await this.rpc.login({
                clientId: this.config.discordClientId
            });
        } catch (err) {
            console.log('error trying to connect discord');
            this.isReady = false;
        }
    }
    async trackChange(track) {
        const extractor = track.metadata.extractor;
        this.baseStart = Date.now();
        this.pausedTotal = 0;
        this.activity = {
            details: `${track.artist} - ${track.title}`,
            startTimestamp: this.baseStart,
            largeImageKey: 'logo-idle',
            buttons: extractor ? [
                {
                    label: `Open on ${extractor[0].toUpperCase() + extractor.substring(1)}`,
                    url: track.metadata.webpage_url
                }
            ] : undefined,
            state: 'Listening to Beautiful Music'
        };
        if (!this.rpc) {
            return null;
        } else if (!this.isReady) {
            return this.init(()=>{
                this.sendActivity();
            });
        } else {
            this.sendActivity();
        }
    }
    async clear() {
        delete this.activity;
        if (this.isReady) {
            console.log('clear discord activity');
            try {
                await this.rpc.clearActivity();
            } catch (err) {
                console.error('error trying to clear discord activity');
            }
        }
    }
};
Discord = _ts_decorate$6([
    inversify.injectable(),
    _ts_param$4(0, inversify.inject(Config$1)),
    _ts_metadata$6("design:type", Function),
    _ts_metadata$6("design:paramtypes", [
        typeof Config$1 === "undefined" ? Object : Config$1
    ])
], Discord);
const Discord$1 = Discord;

function _ts_decorate$5(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$5(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$3(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
let Scrobbler = class Scrobbler2 {
  config;
  window;
  store;
  session;
  lastfm;
  token;
  apiKey;
  apiSecret;
  currentSong;
  fpcalc;
  fpcalcExists;
  filter;
  constructor(config, window, store) {
    this.config = config;
    this.window = window;
    this.store = store;
    this.session = null;
    this.token = "";
    this.currentSong = null;
    this.fpcalc = fpcalcAsync;
    this.fpcalcExists = false;
    this.filter = MetadataFilter.createYouTubeFilter();
    const apiKey = "660db7281d5441ad8d8fa66edd07cae8";
    const apiSecret = "5a7fef53dd62924dde466672e9d4bf58";
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.session = this.store.getOption("lastfm.session") ?? null;
    this.fpcalcExists = fs.existsSync(this.config.fpcalcPath);
    this.lastfm = axios.create({
      baseURL: "https://ws.audioscrobbler.com/2.0/",
      params: {
        api_key: this.apiKey,
        format: "json"
      }
    });
  }
  async trackChange(song) {
    try {
      await this.scrobble(song);
    } catch (e) {
      console.error(e);
    }
  }
  async scrobble(song) {
    if (!this.fpcalcExists) {
      console.log("fpcalc not found");
      return null;
    }
    let artistIsTrue = false;
    const trackName = this.filter.filterField("track", song.title);
    if (!trackName.includes("-") || song.artist.includes(" - Topic")) {
      artistIsTrue = true;
    }
    const artistName = song.artist.replace(" - Topic", "");
    song.album;
    const fingerprint = await this.getFingerprint(song.path);
    const metadata = await this.getMetadata(fingerprint).catch((e) => {
      console.error(e);
      return null;
    });
    console.log(metadata);
    let searchResults;
    if (!metadata) {
      searchResults = await this.lastfm.get("", {
        params: {
          method: "track.search",
          track: trackName,
          limit: 15,
          artist: artistIsTrue ? artistName : void 0
        }
      });
    } else {
      searchResults = await this.lastfm.get("", {
        params: {
          method: "track.getInfo",
          mbid: metadata.results[0].id
        }
      });
    }
    console.log(searchResults.data);
  }
  async login() {
  }
  async authCallback() {
  }
  async getMetadata(fingerprint) {
    const metaUrl = `https://api.acoustid.org/v2/lookup`;
    const body = {
      client: this.config.acousticId.key,
      meta: "recordings+releasegroups+compress",
      duration: fingerprint.duration,
      fingerprint: fingerprint.fingerprint
    };
    const res = await axios.get(metaUrl, {
      params: body,
      headers: {
        "User-Agent": "Peepo Sings"
      },
      paramsSerializer: (params) => {
        return Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&");
      }
    });
    if (res.status !== 200) throw new Error("AcousticID returned non 200 status code");
    else if (res.data.status !== "ok") throw new Error("AcousticID returned non ok status");
    else if (res.data.results.length === 0) {
      console.log("AcousticID returned no results");
      return null;
    }
    console.log(res.data);
    let result = res.data.results[0];
    if (result.score < 0.8) {
      console.log("AcousticID returned low score");
      return null;
    }
    if (!result.recordings || result.recordings.length === 0) throw new Error("No recordings found");
    const recording = result.recordings[result.recordings.length - 1];
    const artists = recording.artists.map((a) => a.name).join(", ");
    const title = recording.title;
    console.log(title, artists, recording.releasegroups[0].title, recording.releasegroups[0].type);
    return res.data;
  }
  async getFingerprint(file) {
    const result = await this.fpcalc(file, {
      command: this.config.fpcalcPath
    });
    return result;
  }
};
Scrobbler = _ts_decorate$5([
  inversify.injectable(),
  _ts_param$3(0, inversify.inject(Config$1)),
  _ts_param$3(1, inversify.inject(Window$1)),
  _ts_param$3(2, inversify.inject(Store$1)),
  _ts_metadata$5("design:type", Function),
  _ts_metadata$5("design:paramtypes", [
    typeof Config$1 === "undefined" ? Object : Config$1,
    typeof Window$1 === "undefined" ? Object : Window$1,
    typeof Store$1 === "undefined" ? Object : Store$1
  ])
], Scrobbler);

function _ts_decorate$4(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$4(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$2(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let TrayMenu = class TrayMenu {
    config;
    platform;
    window;
    tray;
    playerContext;
    constructor(config, platform, window){
        this.config = config;
        this.platform = platform;
        this.window = window;
    }
    init() {
        const icon = require$$0.nativeImage.createFromPath(this.platform.isMac() ? this.config.macIcon : this.config.icon);
        this.tray = new require$$0.Tray(icon);
        !this.platform.isMac() && this.tray.setTitle(this.config.title);
        this.setPlayerContext({
            isPlaying: false,
            track: null
        });
        this.tray.setToolTip(this.getToolTipString());
        this.tray.setContextMenu(this.getMenu());
    }
    getMenu() {
        const template = [];
        if (this.playerContext.track) {
            template.push({
                label: `${this.playerContext.isPlaying ? 'Playing - ' : ''}${this.playerContext.track.title}`,
                enabled: false
            });
            template.push({
                label: `by ${this.playerContext.track.artist}`,
                enabled: false
            });
        } else {
            template.push({
                label: '--/--',
                enabled: false
            });
        }
        template.push({
            type: 'separator'
        });
        if (this.playerContext.track) {
            if (this.playerContext.isPlaying) {
                template.push({
                    label: 'Pause',
                    type: 'normal',
                    click: async ()=>{
                        this.window.send(IpcEvents$1.PAUSE);
                        this.update({
                            isPlaying: false
                        });
                    }
                });
            } else {
                template.push({
                    label: 'Play',
                    type: 'normal',
                    click: async ()=>{
                        this.window.send(IpcEvents$1.PLAY);
                        this.update({
                            isPlaying: true
                        });
                    }
                });
            }
            template.push({
                label: 'Next',
                type: 'normal',
                click: async ()=>{
                    this.window.send(IpcEvents$1.NEXT);
                }
            });
            template.push({
                label: 'Previous',
                type: 'normal',
                click: async ()=>{
                    this.window.send(IpcEvents$1.PREVIOUS);
                }
            });
            template.push({
                type: 'separator'
            });
        }
        template.push({
            label: 'Quit',
            type: 'normal',
            click: async ()=>{
                require$$0.app.quit();
            }
        });
        return require$$0.Menu.buildFromTemplate(template);
    }
    getToolTipString() {
        return this.playerContext.track ? `${this.playerContext.isPlaying ? 'Playing: ' : ''} ${this.playerContext.track.title} - ${this.playerContext.track.artist}` : this.config.title;
    }
    setPlayerContext(playerContext) {
        this.playerContext = {
            ...this.playerContext,
            ...playerContext
        };
    }
    update(newPlayerContext) {
        if (newPlayerContext) {
            this.setPlayerContext(newPlayerContext);
        }
        this.tray.setContextMenu(this.getMenu());
        this.tray.setToolTip(this.getToolTipString());
    }
};
TrayMenu = _ts_decorate$4([
    inversify.injectable(),
    _ts_param$2(0, inversify.inject(Config$1)),
    _ts_param$2(1, inversify.inject(Platform$1)),
    _ts_param$2(2, inversify.inject(Window$1)),
    _ts_metadata$4("design:type", Function),
    _ts_metadata$4("design:paramtypes", [
        typeof Config$1 === "undefined" ? Object : Config$1,
        typeof Platform$1 === "undefined" ? Object : Platform$1,
        typeof Window$1 === "undefined" ? Object : Window$1
    ])
], TrayMenu);
const TrayMenu$1 = TrayMenu;

function _ts_decorate$3(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$3(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$1(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let IpcPlayer = class IpcPlayer {
    discord;
    trayMenu;
    scrobbler;
    window;
    constructor(discord, trayMenu, scrobbler, window){
        this.discord = discord;
        this.trayMenu = trayMenu;
        this.scrobbler = scrobbler;
        this.window = window;
    }
    onPlay() {
        this.window.togglePlayPause(false, true);
        return this.discord.play();
    }
    onPause() {
        this.window.togglePlayPause(true, true);
        return this.discord.pause();
    }
    onVolume(data) {}
    async onClearTrackList() {
        try {
            await this.discord.clear();
        } catch (e) {
            console.error('Main process failed to react to IPC clear queue event');
        }
    }
    onSongChange(arg) {
        if (!arg) {
            this.window.setTitle(`Peepo Sings`);
            this.discord.clear();
            this.trayMenu.update({
                isPlaying: false,
                track: null
            });
            return;
        }
        this.window.setTitle(`${arg.artist} - ${arg.title} - Peepo Sings`);
        this.discord.trackChange(arg);
        this.trayMenu.update({
            track: arg
        });
    }
};
_ts_decorate$3([
    ipcEvent(IpcEvents$1.PLAY),
    _ts_metadata$3("design:type", Function),
    _ts_metadata$3("design:paramtypes", [])
], IpcPlayer.prototype, "onPlay", null);
_ts_decorate$3([
    ipcEvent(IpcEvents$1.PAUSE),
    _ts_metadata$3("design:type", Function),
    _ts_metadata$3("design:paramtypes", [])
], IpcPlayer.prototype, "onPause", null);
_ts_decorate$3([
    ipcEvent(IpcEvents$1.VOLUME),
    _ts_metadata$3("design:type", Function),
    _ts_metadata$3("design:paramtypes", [
        Number
    ])
], IpcPlayer.prototype, "onVolume", null);
_ts_decorate$3([
    ipcEvent(IpcEvents$1.QUEUE_CLEAR),
    _ts_metadata$3("design:type", Function),
    _ts_metadata$3("design:paramtypes", [])
], IpcPlayer.prototype, "onClearTrackList", null);
_ts_decorate$3([
    ipcEvent(IpcEvents$1.SONG_CHANGE),
    _ts_metadata$3("design:type", Function),
    _ts_metadata$3("design:paramtypes", [
        Object
    ])
], IpcPlayer.prototype, "onSongChange", null);
IpcPlayer = _ts_decorate$3([
    ipcController(),
    _ts_param$1(0, inversify.inject(Discord$1)),
    _ts_param$1(1, inversify.inject(TrayMenu$1)),
    _ts_param$1(2, inversify.inject(Scrobbler)),
    _ts_param$1(3, inversify.inject(Window$1)),
    _ts_metadata$3("design:type", Function),
    _ts_metadata$3("design:paramtypes", [
        typeof Discord$1 === "undefined" ? Object : Discord$1,
        typeof TrayMenu$1 === "undefined" ? Object : TrayMenu$1,
        typeof Scrobbler === "undefined" ? Object : Scrobbler,
        typeof Window$1 === "undefined" ? Object : Window$1
    ])
], IpcPlayer);
const IpcPlayer$1 = IpcPlayer;

function _ts_decorate$2(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$2(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AutoUpdater = class AutoUpdater {
    constructor(){
        log.transports.file.level = 'debug';
        electronUpdater.autoUpdater.logger = log;
    }
    async onModuleInit() {
        if (!process.env.PROD) {
            electronUpdater.autoUpdater.autoDownload = false;
        }
        electronUpdater.autoUpdater.fullChangelog = true;
        const result = await electronUpdater.autoUpdater.checkForUpdatesAndNotify({
            body: "It'll install in the background and update automatically when you restart the app.\n\nCheck the changelog for more info at https://github.com/Jimmyboy-dev/PeepoSings/releases/latest",
            title: `New Update Available for Peepo Sings!`
        });
        log.info(result.updateInfo.releaseName, result.updateInfo.version);
    }
    async manualCheckForUpdates(bWindow) {
        const update = await electronUpdater.autoUpdater.checkForUpdates();
        if (update?.updateInfo.version !== require$$0.app.getVersion()) {
            bWindow.webContents.send('update-available', update?.updateInfo);
        }
        return update?.updateInfo;
    }
};
AutoUpdater = _ts_decorate$2([
    inversify.injectable(),
    _ts_metadata$2("design:type", Function),
    _ts_metadata$2("design:paramtypes", [])
], AutoUpdater);

function _ts_decorate$1(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$1(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let SettingsIpcCtrl = class SettingsIpcCtrl {
    config;
    store;
    scrobbler;
    window;
    music;
    updater;
    constructor(config, store, scrobbler, window, music, updater){
        this.config = config;
        this.store = store;
        this.scrobbler = scrobbler;
        this.window = window;
        this.music = music;
        this.updater = updater;
    }
    onStart() {
        const settings = this.store.get('settings');
        for(const setting in settings){
            if (setting.startsWith('restart-')) {
                this.store.setOption(setting.replace('restart-', ''), settings[setting]);
            }
        }
    }
    async onInitialData() {
        const songs = await this.music.getSongs();
        const moods = await this.music.getMoods();
        return {
            settings: this.store.getAll(),
            songs,
            moods
        };
    }
    onStoreGet(key) {
        return this.store.getOption(key);
    }
    async onStoreSet([key, val]) {
        this.store.setOption(key, val);
    }
    async onStoreSetSensitive([key, val]) {
        this.store.setOption(`restart-${key}`, val);
    }
    async onClose() {
        this.window.close();
    }
    onMinimize() {
        this.window.minimize();
    }
    onMaximize() {
        this.window.maximize();
    }
    openDevtools() {
        this.window.openDevTools();
    }
    lastfmLogin() {
        this.scrobbler.login();
    }
    lastfmSession(session) {
        this.store.setOption('lastfm.session', session.key);
        this.scrobbler.session = session;
    }
    onOpenEditor() {
        this.store.openInEditor();
    }
    async manualUpdate(arg, window) {
        return await this.updater.manualCheckForUpdates(window);
    }
};
_ts_decorate$1([
    ipcEvent(IpcEvents$1.STARTED, {
        once: true
    }),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [])
], SettingsIpcCtrl.prototype, "onStart", null);
_ts_decorate$1([
    ipcEvent(IpcEvents$1.INITIAL_INFO),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [])
], SettingsIpcCtrl.prototype, "onInitialData", null);
_ts_decorate$1([
    ipcEvent(IpcEvents$1.GET_OPTION),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [
        String
    ])
], SettingsIpcCtrl.prototype, "onStoreGet", null);
_ts_decorate$1([
    ipcEvent(IpcEvents$1.SET_OPTION),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [
        Array
    ])
], SettingsIpcCtrl.prototype, "onStoreSet", null);
_ts_decorate$1([
    ipcEvent(IpcEvents$1.SET_OPTION_SENSITIVE),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [
        Array
    ])
], SettingsIpcCtrl.prototype, "onStoreSetSensitive", null);
_ts_decorate$1([
    ipcEvent(IpcEvents$1.WINDOW_CLOSE),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [])
], SettingsIpcCtrl.prototype, "onClose", null);
_ts_decorate$1([
    ipcEvent(IpcEvents$1.WINDOW_MINIMIZE),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [])
], SettingsIpcCtrl.prototype, "onMinimize", null);
_ts_decorate$1([
    ipcEvent(IpcEvents$1.WINDOW_MAXIMIZE),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [])
], SettingsIpcCtrl.prototype, "onMaximize", null);
_ts_decorate$1([
    ipcEvent(IpcEvents$1.WINDOW_OPEN_DEVTOOLS),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [])
], SettingsIpcCtrl.prototype, "openDevtools", null);
_ts_decorate$1([
    ipcEvent(IpcEvents$1.LASTFM_LOGIN),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [])
], SettingsIpcCtrl.prototype, "lastfmLogin", null);
_ts_decorate$1([
    ipcEvent(IpcEvents$1.LASTFM_SESSION),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [
        typeof getSession === "undefined" ? Object : getSession
    ])
], SettingsIpcCtrl.prototype, "lastfmSession", null);
_ts_decorate$1([
    ipcEvent(IpcEvents$1.MUSIC_OPEN_EDITOR),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [])
], SettingsIpcCtrl.prototype, "onOpenEditor", null);
_ts_decorate$1([
    ipcEvent(IpcEvents$1.MANUAL_UPDATE),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [
        void 0,
        typeof require$$0.BrowserWindow === "undefined" ? Object : require$$0.BrowserWindow
    ])
], SettingsIpcCtrl.prototype, "manualUpdate", null);
SettingsIpcCtrl = _ts_decorate$1([
    ipcController(),
    _ts_param(0, inversify.inject(Config$1)),
    _ts_param(1, inversify.inject(Store$1)),
    _ts_param(2, inversify.inject(Scrobbler)),
    _ts_param(3, inversify.inject(Window$1)),
    _ts_param(4, inversify.inject(MusicManager)),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [
        typeof Config$1 === "undefined" ? Object : Config$1,
        typeof Store$1 === "undefined" ? Object : Store$1,
        typeof Scrobbler === "undefined" ? Object : Scrobbler,
        typeof Window$1 === "undefined" ? Object : Window$1,
        typeof MusicManager === "undefined" ? Object : MusicManager,
        typeof AutoUpdater === "undefined" ? Object : AutoUpdater
    ])
], SettingsIpcCtrl);
const SettingsIpcCtrl$1 = SettingsIpcCtrl;

const $ipc = Symbol('ipc');

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PluginService = class PluginService extends livePluginManager.PluginManager {
    constructor(){
        super({
            pluginsPath: path.resolve(require$$0.app.getPath('userData'), 'plugins')
        });
    }
};
PluginService = _ts_decorate([
    inversify.injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], PluginService);

const services = [
    {
        useClass: Config$1
    },
    {
        useClass: Database
    },
    {
        useClass: Discord$1
    },
    {
        useClass: TrayMenu$1
    },
    {
        useClass: MusicManager
    },
    {
        useClass: Platform$1
    },
    {
        useClass: Scrobbler
    },
    {
        useClass: Store$1
    },
    {
        useClass: Window$1
    },
    {
        useClass: AutoUpdater
    },
    {
        useClass: PluginService
    },
    {
        provide: $ipc,
        useValue: electronBetterIpc.ipcMain
    }
];
const controllers = [
    DatabaseControl,
    DownloadController,
    IpcPlayer$1,
    SettingsIpcCtrl$1,
    LoggerCtrl
];

let Container = class Container extends inversify.Container {
    controllers;
    services;
    constructor({ controllers , services  }){
        super({
            skipBaseClassChecks: true
        });
        this.controllers = controllers;
        this.services = [];
        services.forEach(({ provide , useClass , useValue  })=>{
            if (useClass) {
                this.bind(provide || useClass).to(useClass).inSingletonScope();
                this.services.push(provide || useClass);
            } else if (useValue) {
                this.bind(provide).toConstantValue(useValue);
                this.services.push(provide);
            }
        });
    }
    async bindAsync({ provide , usePromise  }) {
        const { default: service  } = await usePromise;
        console.log(`Async service loaded => ${service.name}`);
        this.bind(provide).to(service).inSingletonScope();
    }
    listen() {
        const ipc = this.get($ipc);
        this.controllers.forEach((Controller)=>{
            try {
                this.bind(Controller).to(Controller).inSingletonScope();
                const meta = Reflect.getMetadata(IPC_EVENT_KEY, Controller.prototype);
                const controller = this.get(Controller);
                meta.forEach(({ eventName , name , once , log  })=>{
                    const on = once ? ipc.once : ipc.answerRenderer;
                    on.bind(ipc)(eventName, (e, d)=>{
                        const event = once ? e : d;
                        const data = once ? d : e;
                        if (log) console.log('Event', eventName, 'Triggered from', once ? event.sender.getTitle() : event.getTitle(), 'with data', typeof data === 'string' ? data : JSON.stringify(data, null, 2)?.substring(0, 25) ?? '');
                        const result = controller[name](data, event);
                        if (result instanceof Promise) {
                            return result.catch((err)=>{
                                console.error(`error in event ${eventName} => ${err.message}`);
                                console.error(err.stack);
                            });
                        }
                        return result;
                    });
                });
            } catch (e) {
                console.error('Service failed to initialize');
                console.error(e);
            }
        });
    }
    async close() {
        try {
            for (const service of this.services){
                if (this.isBound(service)) {
                    const value = this.get(service);
                    const result = value.onModuleDestroy ? value.onModuleDestroy() : Promise.resolve();
                    if (result instanceof Promise) {
                        await result;
                    }
                    this.unbind(service);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
};

dotenv__namespace.config({
    path: path.resolve(process.cwd(), './.env.local')
});
registerUnhandled({});
const appId = 'com.devJimmyboy.PeepoSings';
let autoLauncher;
require$$0.app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
if (require$$4.release().startsWith('6.1')) require$$0.app.disableHardwareAcceleration();
let container;
if (process.platform === 'win32') require$$0.app.setAppUserModelId(appId);
const gotTheLock = require$$0.app.requestSingleInstanceLock();
if (!gotTheLock) {
    require$$0.app.quit();
    process.exit(0);
} else {
    require$$0.app.on('second-instance', async (event, commandLine, workingDirectory)=>{
        const window = container.get(Window$1);
        const config = container.get(Config$1);
        if (window) {
            window.restore();
            window.focus();
            if (commandLine[1] && config.isFileSupported(commandLine[1])) ;
        }
    });
}
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
if (process.defaultApp) {
    if (process.argv.length >= 2) {
        require$$0.app.setAsDefaultProtocolClient('peepo', process.execPath, [
            path.resolve(process.argv[1])
        ]);
    }
} else {
    require$$0.app.setAsDefaultProtocolClient('peepo');
}
const disposeCTXMenu = contextMenu({
    showSaveImageAs: true,
    append: (_menu)=>[
            {
                label: 'Refresh',
                click: ()=>require$$0.BrowserWindow.getFocusedWindow()?.reload()
            }
        ]
});
require$$0.app.on('open-url', (event, url)=>{
    const pUrl = new URL(url);
    pUrl.searchParams;
    const path = pUrl.hostname;
    switch(path){
        case 'lastfm-redirect':
            container.get(Scrobbler)?.authCallback();
    }
});
require$$0.app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin') {
        require$$0.app.quit();
        process.exit(0);
    }
});
require$$0.app.whenReady().then(async ()=>{
    try {
        container = new Container({
            controllers,
            services
        });
        const config = container.get(Config$1);
        const store = container.get(Store$1);
        const discord = container.get(Discord$1);
        const trayMenu = container.get(TrayMenu$1);
        const window = container.get(Window$1);
        if (config.isDev()) {
            await Promise.all([
                window.installDevTools()
            ]);
        }
        container.listen();
        await window.load();
        trayMenu.init();
        if (store.getOption('discordRichPresence')) {
            discord.init();
        }
        require$$0.nativeTheme.themeSource = 'dark';
        require$$0.protocol.interceptFileProtocol('resource', async (req, callback)=>{
            const url$1 = url.fileURLToPath(req.url.replace('resource', 'file'));
            callback(url$1);
        });
        if (config.isProd()) autoLauncher = new AutoLaunch({
            name: 'Peepo Sings',
            path: process.execPath || require$$0.app.getPath('exe')
        });
    } catch (e) {
        console.error('Failed to start app:', e);
        require$$0.app.quit();
    }
});
require$$0.app.on('will-quit', async ()=>{
    disposeCTXMenu();
    await container.close();
});
electronBetterIpc.ipcMain.answerRenderer('open-location', async (url)=>{
    require$$0.shell.showItemInFolder(url);
    return true;
});
electronBetterIpc.ipcMain.answerRenderer('get-version', ()=>{
    return require$$0.app.getVersion();
});
electronBetterIpc.ipcMain.answerRenderer('toggle-auto-launch', async ()=>{
    const store = container.get(Store$1);
    if (process.env.DEV) return false;
    const enabled = await autoLauncher.isEnabled();
    if (enabled) {
        await autoLauncher.disable();
        console.log('Disabled auto-launch');
    } else {
        await autoLauncher.enable();
        console.log('Enabled auto-launch');
    }
    store.setOption('runOnStartup', !enabled);
    return !enabled;
});
electronBetterIpc.ipcMain.answerRenderer('open-url', (url)=>{
    if (url.startsWith('http')) require$$0.shell.openExternal(url);
});

exports.commonjsGlobal = commonjsGlobal;
exports.getDefaultExportFromCjs = getDefaultExportFromCjs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtQmVMblJ6bXUuY2pzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvc291cmNlLW1hcC9saWIvYmFzZTY0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3NvdXJjZS1tYXAvbGliL2Jhc2U2NC12bHEuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc291cmNlLW1hcC9saWIvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zb3VyY2UtbWFwL2xpYi9hcnJheS1zZXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc291cmNlLW1hcC9saWIvbWFwcGluZy1saXN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3NvdXJjZS1tYXAvbGliL3NvdXJjZS1tYXAtZ2VuZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3NvdXJjZS1tYXAvbGliL2JpbmFyeS1zZWFyY2guanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc291cmNlLW1hcC9saWIvcXVpY2stc29ydC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zb3VyY2UtbWFwL2xpYi9zb3VyY2UtbWFwLWNvbnN1bWVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3NvdXJjZS1tYXAvbGliL3NvdXJjZS1ub2RlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3NvdXJjZS1tYXAvc291cmNlLW1hcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9idWZmZXItZnJvbS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zb3VyY2UtbWFwLXN1cHBvcnQvc291cmNlLW1hcC1zdXBwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy95dC1kbHAtd3JhcC9kaXN0L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cbi8qXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXG4gKi9cblxudmFyIGludFRvQ2hhck1hcCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJy5zcGxpdCgnJyk7XG5cbi8qKlxuICogRW5jb2RlIGFuIGludGVnZXIgaW4gdGhlIHJhbmdlIG9mIDAgdG8gNjMgdG8gYSBzaW5nbGUgYmFzZSA2NCBkaWdpdC5cbiAqL1xuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiAobnVtYmVyKSB7XG4gIGlmICgwIDw9IG51bWJlciAmJiBudW1iZXIgPCBpbnRUb0NoYXJNYXAubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGludFRvQ2hhck1hcFtudW1iZXJdO1xuICB9XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJNdXN0IGJlIGJldHdlZW4gMCBhbmQgNjM6IFwiICsgbnVtYmVyKTtcbn07XG5cbi8qKlxuICogRGVjb2RlIGEgc2luZ2xlIGJhc2UgNjQgY2hhcmFjdGVyIGNvZGUgZGlnaXQgdG8gYW4gaW50ZWdlci4gUmV0dXJucyAtMSBvblxuICogZmFpbHVyZS5cbiAqL1xuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbiAoY2hhckNvZGUpIHtcbiAgdmFyIGJpZ0EgPSA2NTsgICAgIC8vICdBJ1xuICB2YXIgYmlnWiA9IDkwOyAgICAgLy8gJ1onXG5cbiAgdmFyIGxpdHRsZUEgPSA5NzsgIC8vICdhJ1xuICB2YXIgbGl0dGxlWiA9IDEyMjsgLy8gJ3onXG5cbiAgdmFyIHplcm8gPSA0ODsgICAgIC8vICcwJ1xuICB2YXIgbmluZSA9IDU3OyAgICAgLy8gJzknXG5cbiAgdmFyIHBsdXMgPSA0MzsgICAgIC8vICcrJ1xuICB2YXIgc2xhc2ggPSA0NzsgICAgLy8gJy8nXG5cbiAgdmFyIGxpdHRsZU9mZnNldCA9IDI2O1xuICB2YXIgbnVtYmVyT2Zmc2V0ID0gNTI7XG5cbiAgLy8gMCAtIDI1OiBBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlxuICBpZiAoYmlnQSA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8PSBiaWdaKSB7XG4gICAgcmV0dXJuIChjaGFyQ29kZSAtIGJpZ0EpO1xuICB9XG5cbiAgLy8gMjYgLSA1MTogYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcbiAgaWYgKGxpdHRsZUEgPD0gY2hhckNvZGUgJiYgY2hhckNvZGUgPD0gbGl0dGxlWikge1xuICAgIHJldHVybiAoY2hhckNvZGUgLSBsaXR0bGVBICsgbGl0dGxlT2Zmc2V0KTtcbiAgfVxuXG4gIC8vIDUyIC0gNjE6IDAxMjM0NTY3ODlcbiAgaWYgKHplcm8gPD0gY2hhckNvZGUgJiYgY2hhckNvZGUgPD0gbmluZSkge1xuICAgIHJldHVybiAoY2hhckNvZGUgLSB6ZXJvICsgbnVtYmVyT2Zmc2V0KTtcbiAgfVxuXG4gIC8vIDYyOiArXG4gIGlmIChjaGFyQ29kZSA9PSBwbHVzKSB7XG4gICAgcmV0dXJuIDYyO1xuICB9XG5cbiAgLy8gNjM6IC9cbiAgaWYgKGNoYXJDb2RlID09IHNsYXNoKSB7XG4gICAgcmV0dXJuIDYzO1xuICB9XG5cbiAgLy8gSW52YWxpZCBiYXNlNjQgZGlnaXQuXG4gIHJldHVybiAtMTtcbn07XG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXG4vKlxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxuICpcbiAqIEJhc2VkIG9uIHRoZSBCYXNlIDY0IFZMUSBpbXBsZW1lbnRhdGlvbiBpbiBDbG9zdXJlIENvbXBpbGVyOlxuICogaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jbG9zdXJlLWNvbXBpbGVyL3NvdXJjZS9icm93c2UvdHJ1bmsvc3JjL2NvbS9nb29nbGUvZGVidWdnaW5nL3NvdXJjZW1hcC9CYXNlNjRWTFEuamF2YVxuICpcbiAqIENvcHlyaWdodCAyMDExIFRoZSBDbG9zdXJlIENvbXBpbGVyIEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmVcbiAqIG1ldDpcbiAqXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxuICogICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZVxuICogICAgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmdcbiAqICAgIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZFxuICogICAgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICogTmVpdGhlciB0aGUgbmFtZSBvZiBHb29nbGUgSW5jLiBub3IgdGhlIG5hbWVzIG9mIGl0c1xuICogICAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkXG4gKiAgICBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SU1xuICogXCJBUyBJU1wiIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVFxuICogTElNSVRFRCBUTywgVEhFIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SXG4gKiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVFxuICogT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsXG4gKiBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UXG4gKiBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSxcbiAqIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWVxuICogVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuICogKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFXG4gKiBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICovXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCcuL2Jhc2U2NCcpO1xuXG4vLyBBIHNpbmdsZSBiYXNlIDY0IGRpZ2l0IGNhbiBjb250YWluIDYgYml0cyBvZiBkYXRhLiBGb3IgdGhlIGJhc2UgNjQgdmFyaWFibGVcbi8vIGxlbmd0aCBxdWFudGl0aWVzIHdlIHVzZSBpbiB0aGUgc291cmNlIG1hcCBzcGVjLCB0aGUgZmlyc3QgYml0IGlzIHRoZSBzaWduLFxuLy8gdGhlIG5leHQgZm91ciBiaXRzIGFyZSB0aGUgYWN0dWFsIHZhbHVlLCBhbmQgdGhlIDZ0aCBiaXQgaXMgdGhlXG4vLyBjb250aW51YXRpb24gYml0LiBUaGUgY29udGludWF0aW9uIGJpdCB0ZWxscyB1cyB3aGV0aGVyIHRoZXJlIGFyZSBtb3JlXG4vLyBkaWdpdHMgaW4gdGhpcyB2YWx1ZSBmb2xsb3dpbmcgdGhpcyBkaWdpdC5cbi8vXG4vLyAgIENvbnRpbnVhdGlvblxuLy8gICB8ICAgIFNpZ25cbi8vICAgfCAgICB8XG4vLyAgIFYgICAgVlxuLy8gICAxMDEwMTFcblxudmFyIFZMUV9CQVNFX1NISUZUID0gNTtcblxuLy8gYmluYXJ5OiAxMDAwMDBcbnZhciBWTFFfQkFTRSA9IDEgPDwgVkxRX0JBU0VfU0hJRlQ7XG5cbi8vIGJpbmFyeTogMDExMTExXG52YXIgVkxRX0JBU0VfTUFTSyA9IFZMUV9CQVNFIC0gMTtcblxuLy8gYmluYXJ5OiAxMDAwMDBcbnZhciBWTFFfQ09OVElOVUFUSU9OX0JJVCA9IFZMUV9CQVNFO1xuXG4vKipcbiAqIENvbnZlcnRzIGZyb20gYSB0d28tY29tcGxlbWVudCB2YWx1ZSB0byBhIHZhbHVlIHdoZXJlIHRoZSBzaWduIGJpdCBpc1xuICogcGxhY2VkIGluIHRoZSBsZWFzdCBzaWduaWZpY2FudCBiaXQuICBGb3IgZXhhbXBsZSwgYXMgZGVjaW1hbHM6XG4gKiAgIDEgYmVjb21lcyAyICgxMCBiaW5hcnkpLCAtMSBiZWNvbWVzIDMgKDExIGJpbmFyeSlcbiAqICAgMiBiZWNvbWVzIDQgKDEwMCBiaW5hcnkpLCAtMiBiZWNvbWVzIDUgKDEwMSBiaW5hcnkpXG4gKi9cbmZ1bmN0aW9uIHRvVkxRU2lnbmVkKGFWYWx1ZSkge1xuICByZXR1cm4gYVZhbHVlIDwgMFxuICAgID8gKCgtYVZhbHVlKSA8PCAxKSArIDFcbiAgICA6IChhVmFsdWUgPDwgMSkgKyAwO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHRvIGEgdHdvLWNvbXBsZW1lbnQgdmFsdWUgZnJvbSBhIHZhbHVlIHdoZXJlIHRoZSBzaWduIGJpdCBpc1xuICogcGxhY2VkIGluIHRoZSBsZWFzdCBzaWduaWZpY2FudCBiaXQuICBGb3IgZXhhbXBsZSwgYXMgZGVjaW1hbHM6XG4gKiAgIDIgKDEwIGJpbmFyeSkgYmVjb21lcyAxLCAzICgxMSBiaW5hcnkpIGJlY29tZXMgLTFcbiAqICAgNCAoMTAwIGJpbmFyeSkgYmVjb21lcyAyLCA1ICgxMDEgYmluYXJ5KSBiZWNvbWVzIC0yXG4gKi9cbmZ1bmN0aW9uIGZyb21WTFFTaWduZWQoYVZhbHVlKSB7XG4gIHZhciBpc05lZ2F0aXZlID0gKGFWYWx1ZSAmIDEpID09PSAxO1xuICB2YXIgc2hpZnRlZCA9IGFWYWx1ZSA+PiAxO1xuICByZXR1cm4gaXNOZWdhdGl2ZVxuICAgID8gLXNoaWZ0ZWRcbiAgICA6IHNoaWZ0ZWQ7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYmFzZSA2NCBWTFEgZW5jb2RlZCB2YWx1ZS5cbiAqL1xuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiBiYXNlNjRWTFFfZW5jb2RlKGFWYWx1ZSkge1xuICB2YXIgZW5jb2RlZCA9IFwiXCI7XG4gIHZhciBkaWdpdDtcblxuICB2YXIgdmxxID0gdG9WTFFTaWduZWQoYVZhbHVlKTtcblxuICBkbyB7XG4gICAgZGlnaXQgPSB2bHEgJiBWTFFfQkFTRV9NQVNLO1xuICAgIHZscSA+Pj49IFZMUV9CQVNFX1NISUZUO1xuICAgIGlmICh2bHEgPiAwKSB7XG4gICAgICAvLyBUaGVyZSBhcmUgc3RpbGwgbW9yZSBkaWdpdHMgaW4gdGhpcyB2YWx1ZSwgc28gd2UgbXVzdCBtYWtlIHN1cmUgdGhlXG4gICAgICAvLyBjb250aW51YXRpb24gYml0IGlzIG1hcmtlZC5cbiAgICAgIGRpZ2l0IHw9IFZMUV9DT05USU5VQVRJT05fQklUO1xuICAgIH1cbiAgICBlbmNvZGVkICs9IGJhc2U2NC5lbmNvZGUoZGlnaXQpO1xuICB9IHdoaWxlICh2bHEgPiAwKTtcblxuICByZXR1cm4gZW5jb2RlZDtcbn07XG5cbi8qKlxuICogRGVjb2RlcyB0aGUgbmV4dCBiYXNlIDY0IFZMUSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBzdHJpbmcgYW5kIHJldHVybnMgdGhlXG4gKiB2YWx1ZSBhbmQgdGhlIHJlc3Qgb2YgdGhlIHN0cmluZyB2aWEgdGhlIG91dCBwYXJhbWV0ZXIuXG4gKi9cbmV4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24gYmFzZTY0VkxRX2RlY29kZShhU3RyLCBhSW5kZXgsIGFPdXRQYXJhbSkge1xuICB2YXIgc3RyTGVuID0gYVN0ci5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSAwO1xuICB2YXIgc2hpZnQgPSAwO1xuICB2YXIgY29udGludWF0aW9uLCBkaWdpdDtcblxuICBkbyB7XG4gICAgaWYgKGFJbmRleCA+PSBzdHJMZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIG1vcmUgZGlnaXRzIGluIGJhc2UgNjQgVkxRIHZhbHVlLlwiKTtcbiAgICB9XG5cbiAgICBkaWdpdCA9IGJhc2U2NC5kZWNvZGUoYVN0ci5jaGFyQ29kZUF0KGFJbmRleCsrKSk7XG4gICAgaWYgKGRpZ2l0ID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBiYXNlNjQgZGlnaXQ6IFwiICsgYVN0ci5jaGFyQXQoYUluZGV4IC0gMSkpO1xuICAgIH1cblxuICAgIGNvbnRpbnVhdGlvbiA9ICEhKGRpZ2l0ICYgVkxRX0NPTlRJTlVBVElPTl9CSVQpO1xuICAgIGRpZ2l0ICY9IFZMUV9CQVNFX01BU0s7XG4gICAgcmVzdWx0ID0gcmVzdWx0ICsgKGRpZ2l0IDw8IHNoaWZ0KTtcbiAgICBzaGlmdCArPSBWTFFfQkFTRV9TSElGVDtcbiAgfSB3aGlsZSAoY29udGludWF0aW9uKTtcblxuICBhT3V0UGFyYW0udmFsdWUgPSBmcm9tVkxRU2lnbmVkKHJlc3VsdCk7XG4gIGFPdXRQYXJhbS5yZXN0ID0gYUluZGV4O1xufTtcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cbi8qXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXG4gKi9cblxuLyoqXG4gKiBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uIGZvciBnZXR0aW5nIHZhbHVlcyBmcm9tIHBhcmFtZXRlci9vcHRpb25zXG4gKiBvYmplY3RzLlxuICpcbiAqIEBwYXJhbSBhcmdzIFRoZSBvYmplY3Qgd2UgYXJlIGV4dHJhY3RpbmcgdmFsdWVzIGZyb21cbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB3ZSBhcmUgZ2V0dGluZy5cbiAqIEBwYXJhbSBkZWZhdWx0VmFsdWUgQW4gb3B0aW9uYWwgdmFsdWUgdG8gcmV0dXJuIGlmIHRoZSBwcm9wZXJ0eSBpcyBtaXNzaW5nXG4gKiBmcm9tIHRoZSBvYmplY3QuIElmIHRoaXMgaXMgbm90IHNwZWNpZmllZCBhbmQgdGhlIHByb3BlcnR5IGlzIG1pc3NpbmcsIGFuXG4gKiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqL1xuZnVuY3Rpb24gZ2V0QXJnKGFBcmdzLCBhTmFtZSwgYURlZmF1bHRWYWx1ZSkge1xuICBpZiAoYU5hbWUgaW4gYUFyZ3MpIHtcbiAgICByZXR1cm4gYUFyZ3NbYU5hbWVdO1xuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICByZXR1cm4gYURlZmF1bHRWYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGFOYW1lICsgJ1wiIGlzIGEgcmVxdWlyZWQgYXJndW1lbnQuJyk7XG4gIH1cbn1cbmV4cG9ydHMuZ2V0QXJnID0gZ2V0QXJnO1xuXG52YXIgdXJsUmVnZXhwID0gL14oPzooW1xcdytcXC0uXSspOik/XFwvXFwvKD86KFxcdys6XFx3KylAKT8oW1xcdy4tXSopKD86OihcXGQrKSk/KC4qKSQvO1xudmFyIGRhdGFVcmxSZWdleHAgPSAvXmRhdGE6LitcXCwuKyQvO1xuXG5mdW5jdGlvbiB1cmxQYXJzZShhVXJsKSB7XG4gIHZhciBtYXRjaCA9IGFVcmwubWF0Y2godXJsUmVnZXhwKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB7XG4gICAgc2NoZW1lOiBtYXRjaFsxXSxcbiAgICBhdXRoOiBtYXRjaFsyXSxcbiAgICBob3N0OiBtYXRjaFszXSxcbiAgICBwb3J0OiBtYXRjaFs0XSxcbiAgICBwYXRoOiBtYXRjaFs1XVxuICB9O1xufVxuZXhwb3J0cy51cmxQYXJzZSA9IHVybFBhcnNlO1xuXG5mdW5jdGlvbiB1cmxHZW5lcmF0ZShhUGFyc2VkVXJsKSB7XG4gIHZhciB1cmwgPSAnJztcbiAgaWYgKGFQYXJzZWRVcmwuc2NoZW1lKSB7XG4gICAgdXJsICs9IGFQYXJzZWRVcmwuc2NoZW1lICsgJzonO1xuICB9XG4gIHVybCArPSAnLy8nO1xuICBpZiAoYVBhcnNlZFVybC5hdXRoKSB7XG4gICAgdXJsICs9IGFQYXJzZWRVcmwuYXV0aCArICdAJztcbiAgfVxuICBpZiAoYVBhcnNlZFVybC5ob3N0KSB7XG4gICAgdXJsICs9IGFQYXJzZWRVcmwuaG9zdDtcbiAgfVxuICBpZiAoYVBhcnNlZFVybC5wb3J0KSB7XG4gICAgdXJsICs9IFwiOlwiICsgYVBhcnNlZFVybC5wb3J0XG4gIH1cbiAgaWYgKGFQYXJzZWRVcmwucGF0aCkge1xuICAgIHVybCArPSBhUGFyc2VkVXJsLnBhdGg7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn1cbmV4cG9ydHMudXJsR2VuZXJhdGUgPSB1cmxHZW5lcmF0ZTtcblxuLyoqXG4gKiBOb3JtYWxpemVzIGEgcGF0aCwgb3IgdGhlIHBhdGggcG9ydGlvbiBvZiBhIFVSTDpcbiAqXG4gKiAtIFJlcGxhY2VzIGNvbnNlY3V0aXZlIHNsYXNoZXMgd2l0aCBvbmUgc2xhc2guXG4gKiAtIFJlbW92ZXMgdW5uZWNlc3NhcnkgJy4nIHBhcnRzLlxuICogLSBSZW1vdmVzIHVubmVjZXNzYXJ5ICc8ZGlyPi8uLicgcGFydHMuXG4gKlxuICogQmFzZWQgb24gY29kZSBpbiB0aGUgTm9kZS5qcyAncGF0aCcgY29yZSBtb2R1bGUuXG4gKlxuICogQHBhcmFtIGFQYXRoIFRoZSBwYXRoIG9yIHVybCB0byBub3JtYWxpemUuXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZShhUGF0aCkge1xuICB2YXIgcGF0aCA9IGFQYXRoO1xuICB2YXIgdXJsID0gdXJsUGFyc2UoYVBhdGgpO1xuICBpZiAodXJsKSB7XG4gICAgaWYgKCF1cmwucGF0aCkge1xuICAgICAgcmV0dXJuIGFQYXRoO1xuICAgIH1cbiAgICBwYXRoID0gdXJsLnBhdGg7XG4gIH1cbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCk7XG5cbiAgdmFyIHBhcnRzID0gcGF0aC5zcGxpdCgvXFwvKy8pO1xuICBmb3IgKHZhciBwYXJ0LCB1cCA9IDAsIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHBhcnQgPSBwYXJ0c1tpXTtcbiAgICBpZiAocGFydCA9PT0gJy4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChwYXJ0ID09PSAnLi4nKSB7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXAgPiAwKSB7XG4gICAgICBpZiAocGFydCA9PT0gJycpIHtcbiAgICAgICAgLy8gVGhlIGZpcnN0IHBhcnQgaXMgYmxhbmsgaWYgdGhlIHBhdGggaXMgYWJzb2x1dGUuIFRyeWluZyB0byBnb1xuICAgICAgICAvLyBhYm92ZSB0aGUgcm9vdCBpcyBhIG5vLW9wLiBUaGVyZWZvcmUgd2UgY2FuIHJlbW92ZSBhbGwgJy4uJyBwYXJ0c1xuICAgICAgICAvLyBkaXJlY3RseSBhZnRlciB0aGUgcm9vdC5cbiAgICAgICAgcGFydHMuc3BsaWNlKGkgKyAxLCB1cCk7XG4gICAgICAgIHVwID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnRzLnNwbGljZShpLCAyKTtcbiAgICAgICAgdXAtLTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcGF0aCA9IHBhcnRzLmpvaW4oJy8nKTtcblxuICBpZiAocGF0aCA9PT0gJycpIHtcbiAgICBwYXRoID0gaXNBYnNvbHV0ZSA/ICcvJyA6ICcuJztcbiAgfVxuXG4gIGlmICh1cmwpIHtcbiAgICB1cmwucGF0aCA9IHBhdGg7XG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKHVybCk7XG4gIH1cbiAgcmV0dXJuIHBhdGg7XG59XG5leHBvcnRzLm5vcm1hbGl6ZSA9IG5vcm1hbGl6ZTtcblxuLyoqXG4gKiBKb2lucyB0d28gcGF0aHMvVVJMcy5cbiAqXG4gKiBAcGFyYW0gYVJvb3QgVGhlIHJvb3QgcGF0aCBvciBVUkwuXG4gKiBAcGFyYW0gYVBhdGggVGhlIHBhdGggb3IgVVJMIHRvIGJlIGpvaW5lZCB3aXRoIHRoZSByb290LlxuICpcbiAqIC0gSWYgYVBhdGggaXMgYSBVUkwgb3IgYSBkYXRhIFVSSSwgYVBhdGggaXMgcmV0dXJuZWQsIHVubGVzcyBhUGF0aCBpcyBhXG4gKiAgIHNjaGVtZS1yZWxhdGl2ZSBVUkw6IFRoZW4gdGhlIHNjaGVtZSBvZiBhUm9vdCwgaWYgYW55LCBpcyBwcmVwZW5kZWRcbiAqICAgZmlyc3QuXG4gKiAtIE90aGVyd2lzZSBhUGF0aCBpcyBhIHBhdGguIElmIGFSb290IGlzIGEgVVJMLCB0aGVuIGl0cyBwYXRoIHBvcnRpb25cbiAqICAgaXMgdXBkYXRlZCB3aXRoIHRoZSByZXN1bHQgYW5kIGFSb290IGlzIHJldHVybmVkLiBPdGhlcndpc2UgdGhlIHJlc3VsdFxuICogICBpcyByZXR1cm5lZC5cbiAqICAgLSBJZiBhUGF0aCBpcyBhYnNvbHV0ZSwgdGhlIHJlc3VsdCBpcyBhUGF0aC5cbiAqICAgLSBPdGhlcndpc2UgdGhlIHR3byBwYXRocyBhcmUgam9pbmVkIHdpdGggYSBzbGFzaC5cbiAqIC0gSm9pbmluZyBmb3IgZXhhbXBsZSAnaHR0cDovLycgYW5kICd3d3cuZXhhbXBsZS5jb20nIGlzIGFsc28gc3VwcG9ydGVkLlxuICovXG5mdW5jdGlvbiBqb2luKGFSb290LCBhUGF0aCkge1xuICBpZiAoYVJvb3QgPT09IFwiXCIpIHtcbiAgICBhUm9vdCA9IFwiLlwiO1xuICB9XG4gIGlmIChhUGF0aCA9PT0gXCJcIikge1xuICAgIGFQYXRoID0gXCIuXCI7XG4gIH1cbiAgdmFyIGFQYXRoVXJsID0gdXJsUGFyc2UoYVBhdGgpO1xuICB2YXIgYVJvb3RVcmwgPSB1cmxQYXJzZShhUm9vdCk7XG4gIGlmIChhUm9vdFVybCkge1xuICAgIGFSb290ID0gYVJvb3RVcmwucGF0aCB8fCAnLyc7XG4gIH1cblxuICAvLyBgam9pbihmb28sICcvL3d3dy5leGFtcGxlLm9yZycpYFxuICBpZiAoYVBhdGhVcmwgJiYgIWFQYXRoVXJsLnNjaGVtZSkge1xuICAgIGlmIChhUm9vdFVybCkge1xuICAgICAgYVBhdGhVcmwuc2NoZW1lID0gYVJvb3RVcmwuc2NoZW1lO1xuICAgIH1cbiAgICByZXR1cm4gdXJsR2VuZXJhdGUoYVBhdGhVcmwpO1xuICB9XG5cbiAgaWYgKGFQYXRoVXJsIHx8IGFQYXRoLm1hdGNoKGRhdGFVcmxSZWdleHApKSB7XG4gICAgcmV0dXJuIGFQYXRoO1xuICB9XG5cbiAgLy8gYGpvaW4oJ2h0dHA6Ly8nLCAnd3d3LmV4YW1wbGUuY29tJylgXG4gIGlmIChhUm9vdFVybCAmJiAhYVJvb3RVcmwuaG9zdCAmJiAhYVJvb3RVcmwucGF0aCkge1xuICAgIGFSb290VXJsLmhvc3QgPSBhUGF0aDtcbiAgICByZXR1cm4gdXJsR2VuZXJhdGUoYVJvb3RVcmwpO1xuICB9XG5cbiAgdmFyIGpvaW5lZCA9IGFQYXRoLmNoYXJBdCgwKSA9PT0gJy8nXG4gICAgPyBhUGF0aFxuICAgIDogbm9ybWFsaXplKGFSb290LnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgYVBhdGgpO1xuXG4gIGlmIChhUm9vdFVybCkge1xuICAgIGFSb290VXJsLnBhdGggPSBqb2luZWQ7XG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFSb290VXJsKTtcbiAgfVxuICByZXR1cm4gam9pbmVkO1xufVxuZXhwb3J0cy5qb2luID0gam9pbjtcblxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24gKGFQYXRoKSB7XG4gIHJldHVybiBhUGF0aC5jaGFyQXQoMCkgPT09ICcvJyB8fCB1cmxSZWdleHAudGVzdChhUGF0aCk7XG59O1xuXG4vKipcbiAqIE1ha2UgYSBwYXRoIHJlbGF0aXZlIHRvIGEgVVJMIG9yIGFub3RoZXIgcGF0aC5cbiAqXG4gKiBAcGFyYW0gYVJvb3QgVGhlIHJvb3QgcGF0aCBvciBVUkwuXG4gKiBAcGFyYW0gYVBhdGggVGhlIHBhdGggb3IgVVJMIHRvIGJlIG1hZGUgcmVsYXRpdmUgdG8gYVJvb3QuXG4gKi9cbmZ1bmN0aW9uIHJlbGF0aXZlKGFSb290LCBhUGF0aCkge1xuICBpZiAoYVJvb3QgPT09IFwiXCIpIHtcbiAgICBhUm9vdCA9IFwiLlwiO1xuICB9XG5cbiAgYVJvb3QgPSBhUm9vdC5yZXBsYWNlKC9cXC8kLywgJycpO1xuXG4gIC8vIEl0IGlzIHBvc3NpYmxlIGZvciB0aGUgcGF0aCB0byBiZSBhYm92ZSB0aGUgcm9vdC4gSW4gdGhpcyBjYXNlLCBzaW1wbHlcbiAgLy8gY2hlY2tpbmcgd2hldGhlciB0aGUgcm9vdCBpcyBhIHByZWZpeCBvZiB0aGUgcGF0aCB3b24ndCB3b3JrLiBJbnN0ZWFkLCB3ZVxuICAvLyBuZWVkIHRvIHJlbW92ZSBjb21wb25lbnRzIGZyb20gdGhlIHJvb3Qgb25lIGJ5IG9uZSwgdW50aWwgZWl0aGVyIHdlIGZpbmRcbiAgLy8gYSBwcmVmaXggdGhhdCBmaXRzLCBvciB3ZSBydW4gb3V0IG9mIGNvbXBvbmVudHMgdG8gcmVtb3ZlLlxuICB2YXIgbGV2ZWwgPSAwO1xuICB3aGlsZSAoYVBhdGguaW5kZXhPZihhUm9vdCArICcvJykgIT09IDApIHtcbiAgICB2YXIgaW5kZXggPSBhUm9vdC5sYXN0SW5kZXhPZihcIi9cIik7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuIGFQYXRoO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBvbmx5IHBhcnQgb2YgdGhlIHJvb3QgdGhhdCBpcyBsZWZ0IGlzIHRoZSBzY2hlbWUgKGkuZS4gaHR0cDovLyxcbiAgICAvLyBmaWxlOi8vLywgZXRjLiksIG9uZSBvciBtb3JlIHNsYXNoZXMgKC8pLCBvciBzaW1wbHkgbm90aGluZyBhdCBhbGwsIHdlXG4gICAgLy8gaGF2ZSBleGhhdXN0ZWQgYWxsIGNvbXBvbmVudHMsIHNvIHRoZSBwYXRoIGlzIG5vdCByZWxhdGl2ZSB0byB0aGUgcm9vdC5cbiAgICBhUm9vdCA9IGFSb290LnNsaWNlKDAsIGluZGV4KTtcbiAgICBpZiAoYVJvb3QubWF0Y2goL14oW15cXC9dKzpcXC8pP1xcLyokLykpIHtcbiAgICAgIHJldHVybiBhUGF0aDtcbiAgICB9XG5cbiAgICArK2xldmVsO1xuICB9XG5cbiAgLy8gTWFrZSBzdXJlIHdlIGFkZCBhIFwiLi4vXCIgZm9yIGVhY2ggY29tcG9uZW50IHdlIHJlbW92ZWQgZnJvbSB0aGUgcm9vdC5cbiAgcmV0dXJuIEFycmF5KGxldmVsICsgMSkuam9pbihcIi4uL1wiKSArIGFQYXRoLnN1YnN0cihhUm9vdC5sZW5ndGggKyAxKTtcbn1cbmV4cG9ydHMucmVsYXRpdmUgPSByZWxhdGl2ZTtcblxudmFyIHN1cHBvcnRzTnVsbFByb3RvID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHJldHVybiAhKCdfX3Byb3RvX18nIGluIG9iaik7XG59KCkpO1xuXG5mdW5jdGlvbiBpZGVudGl0eSAocykge1xuICByZXR1cm4gcztcbn1cblxuLyoqXG4gKiBCZWNhdXNlIGJlaGF2aW9yIGdvZXMgd2Fja3kgd2hlbiB5b3Ugc2V0IGBfX3Byb3RvX19gIG9uIG9iamVjdHMsIHdlXG4gKiBoYXZlIHRvIHByZWZpeCBhbGwgdGhlIHN0cmluZ3MgaW4gb3VyIHNldCB3aXRoIGFuIGFyYml0cmFyeSBjaGFyYWN0ZXIuXG4gKlxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3NvdXJjZS1tYXAvcHVsbC8zMSBhbmRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3NvdXJjZS1tYXAvaXNzdWVzLzMwXG4gKlxuICogQHBhcmFtIFN0cmluZyBhU3RyXG4gKi9cbmZ1bmN0aW9uIHRvU2V0U3RyaW5nKGFTdHIpIHtcbiAgaWYgKGlzUHJvdG9TdHJpbmcoYVN0cikpIHtcbiAgICByZXR1cm4gJyQnICsgYVN0cjtcbiAgfVxuXG4gIHJldHVybiBhU3RyO1xufVxuZXhwb3J0cy50b1NldFN0cmluZyA9IHN1cHBvcnRzTnVsbFByb3RvID8gaWRlbnRpdHkgOiB0b1NldFN0cmluZztcblxuZnVuY3Rpb24gZnJvbVNldFN0cmluZyhhU3RyKSB7XG4gIGlmIChpc1Byb3RvU3RyaW5nKGFTdHIpKSB7XG4gICAgcmV0dXJuIGFTdHIuc2xpY2UoMSk7XG4gIH1cblxuICByZXR1cm4gYVN0cjtcbn1cbmV4cG9ydHMuZnJvbVNldFN0cmluZyA9IHN1cHBvcnRzTnVsbFByb3RvID8gaWRlbnRpdHkgOiBmcm9tU2V0U3RyaW5nO1xuXG5mdW5jdGlvbiBpc1Byb3RvU3RyaW5nKHMpIHtcbiAgaWYgKCFzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9IHMubGVuZ3RoO1xuXG4gIGlmIChsZW5ndGggPCA5IC8qIFwiX19wcm90b19fXCIubGVuZ3RoICovKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHMuY2hhckNvZGVBdChsZW5ndGggLSAxKSAhPT0gOTUgIC8qICdfJyAqLyB8fFxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDIpICE9PSA5NSAgLyogJ18nICovIHx8XG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMykgIT09IDExMSAvKiAnbycgKi8gfHxcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA0KSAhPT0gMTE2IC8qICd0JyAqLyB8fFxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDUpICE9PSAxMTEgLyogJ28nICovIHx8XG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gNikgIT09IDExNCAvKiAncicgKi8gfHxcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA3KSAhPT0gMTEyIC8qICdwJyAqLyB8fFxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDgpICE9PSA5NSAgLyogJ18nICovIHx8XG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gOSkgIT09IDk1ICAvKiAnXycgKi8pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTA7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKHMuY2hhckNvZGVBdChpKSAhPT0gMzYgLyogJyQnICovKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogQ29tcGFyYXRvciBiZXR3ZWVuIHR3byBtYXBwaW5ncyB3aGVyZSB0aGUgb3JpZ2luYWwgcG9zaXRpb25zIGFyZSBjb21wYXJlZC5cbiAqXG4gKiBPcHRpb25hbGx5IHBhc3MgaW4gYHRydWVgIGFzIGBvbmx5Q29tcGFyZUdlbmVyYXRlZGAgdG8gY29uc2lkZXIgdHdvXG4gKiBtYXBwaW5ncyB3aXRoIHRoZSBzYW1lIG9yaWdpbmFsIHNvdXJjZS9saW5lL2NvbHVtbiwgYnV0IGRpZmZlcmVudCBnZW5lcmF0ZWRcbiAqIGxpbmUgYW5kIGNvbHVtbiB0aGUgc2FtZS4gVXNlZnVsIHdoZW4gc2VhcmNoaW5nIGZvciBhIG1hcHBpbmcgd2l0aCBhXG4gKiBzdHViYmVkIG91dCBtYXBwaW5nLlxuICovXG5mdW5jdGlvbiBjb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyhtYXBwaW5nQSwgbWFwcGluZ0IsIG9ubHlDb21wYXJlT3JpZ2luYWwpIHtcbiAgdmFyIGNtcCA9IHN0cmNtcChtYXBwaW5nQS5zb3VyY2UsIG1hcHBpbmdCLnNvdXJjZSk7XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxMaW5lIC0gbWFwcGluZ0Iub3JpZ2luYWxMaW5lO1xuICBpZiAoY21wICE9PSAwKSB7XG4gICAgcmV0dXJuIGNtcDtcbiAgfVxuXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsQ29sdW1uIC0gbWFwcGluZ0Iub3JpZ2luYWxDb2x1bW47XG4gIGlmIChjbXAgIT09IDAgfHwgb25seUNvbXBhcmVPcmlnaW5hbCkge1xuICAgIHJldHVybiBjbXA7XG4gIH1cblxuICBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW4gLSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkTGluZSAtIG1hcHBpbmdCLmdlbmVyYXRlZExpbmU7XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgcmV0dXJuIHN0cmNtcChtYXBwaW5nQS5uYW1lLCBtYXBwaW5nQi5uYW1lKTtcbn1cbmV4cG9ydHMuY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMgPSBjb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucztcblxuLyoqXG4gKiBDb21wYXJhdG9yIGJldHdlZW4gdHdvIG1hcHBpbmdzIHdpdGggZGVmbGF0ZWQgc291cmNlIGFuZCBuYW1lIGluZGljZXMgd2hlcmVcbiAqIHRoZSBnZW5lcmF0ZWQgcG9zaXRpb25zIGFyZSBjb21wYXJlZC5cbiAqXG4gKiBPcHRpb25hbGx5IHBhc3MgaW4gYHRydWVgIGFzIGBvbmx5Q29tcGFyZUdlbmVyYXRlZGAgdG8gY29uc2lkZXIgdHdvXG4gKiBtYXBwaW5ncyB3aXRoIHRoZSBzYW1lIGdlbmVyYXRlZCBsaW5lIGFuZCBjb2x1bW4sIGJ1dCBkaWZmZXJlbnRcbiAqIHNvdXJjZS9uYW1lL29yaWdpbmFsIGxpbmUgYW5kIGNvbHVtbiB0aGUgc2FtZS4gVXNlZnVsIHdoZW4gc2VhcmNoaW5nIGZvciBhXG4gKiBtYXBwaW5nIHdpdGggYSBzdHViYmVkIG91dCBtYXBwaW5nLlxuICovXG5mdW5jdGlvbiBjb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZChtYXBwaW5nQSwgbWFwcGluZ0IsIG9ubHlDb21wYXJlR2VuZXJhdGVkKSB7XG4gIHZhciBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRMaW5lIC0gbWFwcGluZ0IuZ2VuZXJhdGVkTGluZTtcbiAgaWYgKGNtcCAhPT0gMCkge1xuICAgIHJldHVybiBjbXA7XG4gIH1cblxuICBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW4gLSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XG4gIGlmIChjbXAgIT09IDAgfHwgb25seUNvbXBhcmVHZW5lcmF0ZWQpIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgY21wID0gc3RyY21wKG1hcHBpbmdBLnNvdXJjZSwgbWFwcGluZ0Iuc291cmNlKTtcbiAgaWYgKGNtcCAhPT0gMCkge1xuICAgIHJldHVybiBjbXA7XG4gIH1cblxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbExpbmUgLSBtYXBwaW5nQi5vcmlnaW5hbExpbmU7XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxDb2x1bW4gLSBtYXBwaW5nQi5vcmlnaW5hbENvbHVtbjtcbiAgaWYgKGNtcCAhPT0gMCkge1xuICAgIHJldHVybiBjbXA7XG4gIH1cblxuICByZXR1cm4gc3RyY21wKG1hcHBpbmdBLm5hbWUsIG1hcHBpbmdCLm5hbWUpO1xufVxuZXhwb3J0cy5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZCA9IGNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0RlZmxhdGVkO1xuXG5mdW5jdGlvbiBzdHJjbXAoYVN0cjEsIGFTdHIyKSB7XG4gIGlmIChhU3RyMSA9PT0gYVN0cjIpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmIChhU3RyMSA9PT0gbnVsbCkge1xuICAgIHJldHVybiAxOyAvLyBhU3RyMiAhPT0gbnVsbFxuICB9XG5cbiAgaWYgKGFTdHIyID09PSBudWxsKSB7XG4gICAgcmV0dXJuIC0xOyAvLyBhU3RyMSAhPT0gbnVsbFxuICB9XG5cbiAgaWYgKGFTdHIxID4gYVN0cjIpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBDb21wYXJhdG9yIGJldHdlZW4gdHdvIG1hcHBpbmdzIHdpdGggaW5mbGF0ZWQgc291cmNlIGFuZCBuYW1lIHN0cmluZ3Mgd2hlcmVcbiAqIHRoZSBnZW5lcmF0ZWQgcG9zaXRpb25zIGFyZSBjb21wYXJlZC5cbiAqL1xuZnVuY3Rpb24gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zSW5mbGF0ZWQobWFwcGluZ0EsIG1hcHBpbmdCKSB7XG4gIHZhciBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRMaW5lIC0gbWFwcGluZ0IuZ2VuZXJhdGVkTGluZTtcbiAgaWYgKGNtcCAhPT0gMCkge1xuICAgIHJldHVybiBjbXA7XG4gIH1cblxuICBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW4gLSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgY21wID0gc3RyY21wKG1hcHBpbmdBLnNvdXJjZSwgbWFwcGluZ0Iuc291cmNlKTtcbiAgaWYgKGNtcCAhPT0gMCkge1xuICAgIHJldHVybiBjbXA7XG4gIH1cblxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbExpbmUgLSBtYXBwaW5nQi5vcmlnaW5hbExpbmU7XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxDb2x1bW4gLSBtYXBwaW5nQi5vcmlnaW5hbENvbHVtbjtcbiAgaWYgKGNtcCAhPT0gMCkge1xuICAgIHJldHVybiBjbXA7XG4gIH1cblxuICByZXR1cm4gc3RyY21wKG1hcHBpbmdBLm5hbWUsIG1hcHBpbmdCLm5hbWUpO1xufVxuZXhwb3J0cy5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNJbmZsYXRlZCA9IGNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkO1xuXG4vKipcbiAqIFN0cmlwIGFueSBKU09OIFhTU0kgYXZvaWRhbmNlIHByZWZpeCBmcm9tIHRoZSBzdHJpbmcgKGFzIGRvY3VtZW50ZWRcbiAqIGluIHRoZSBzb3VyY2UgbWFwcyBzcGVjaWZpY2F0aW9uKSwgYW5kIHRoZW4gcGFyc2UgdGhlIHN0cmluZyBhc1xuICogSlNPTi5cbiAqL1xuZnVuY3Rpb24gcGFyc2VTb3VyY2VNYXBJbnB1dChzdHIpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyLnJlcGxhY2UoL15cXCldfSdbXlxcbl0qXFxuLywgJycpKTtcbn1cbmV4cG9ydHMucGFyc2VTb3VyY2VNYXBJbnB1dCA9IHBhcnNlU291cmNlTWFwSW5wdXQ7XG5cbi8qKlxuICogQ29tcHV0ZSB0aGUgVVJMIG9mIGEgc291cmNlIGdpdmVuIHRoZSB0aGUgc291cmNlIHJvb3QsIHRoZSBzb3VyY2Unc1xuICogVVJMLCBhbmQgdGhlIHNvdXJjZSBtYXAncyBVUkwuXG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVTb3VyY2VVUkwoc291cmNlUm9vdCwgc291cmNlVVJMLCBzb3VyY2VNYXBVUkwpIHtcbiAgc291cmNlVVJMID0gc291cmNlVVJMIHx8ICcnO1xuXG4gIGlmIChzb3VyY2VSb290KSB7XG4gICAgLy8gVGhpcyBmb2xsb3dzIHdoYXQgQ2hyb21lIGRvZXMuXG4gICAgaWYgKHNvdXJjZVJvb3Rbc291cmNlUm9vdC5sZW5ndGggLSAxXSAhPT0gJy8nICYmIHNvdXJjZVVSTFswXSAhPT0gJy8nKSB7XG4gICAgICBzb3VyY2VSb290ICs9ICcvJztcbiAgICB9XG4gICAgLy8gVGhlIHNwZWMgc2F5czpcbiAgICAvLyAgIExpbmUgNDogQW4gb3B0aW9uYWwgc291cmNlIHJvb3QsIHVzZWZ1bCBmb3IgcmVsb2NhdGluZyBzb3VyY2VcbiAgICAvLyAgIGZpbGVzIG9uIGEgc2VydmVyIG9yIHJlbW92aW5nIHJlcGVhdGVkIHZhbHVlcyBpbiB0aGVcbiAgICAvLyAgIOKAnHNvdXJjZXPigJ0gZW50cnkuICBUaGlzIHZhbHVlIGlzIHByZXBlbmRlZCB0byB0aGUgaW5kaXZpZHVhbFxuICAgIC8vICAgZW50cmllcyBpbiB0aGUg4oCcc291cmNl4oCdIGZpZWxkLlxuICAgIHNvdXJjZVVSTCA9IHNvdXJjZVJvb3QgKyBzb3VyY2VVUkw7XG4gIH1cblxuICAvLyBIaXN0b3JpY2FsbHksIFNvdXJjZU1hcENvbnN1bWVyIGRpZCBub3QgdGFrZSB0aGUgc291cmNlTWFwVVJMIGFzXG4gIC8vIGEgcGFyYW1ldGVyLiAgVGhpcyBtb2RlIGlzIHN0aWxsIHNvbWV3aGF0IHN1cHBvcnRlZCwgd2hpY2ggaXMgd2h5XG4gIC8vIHRoaXMgY29kZSBibG9jayBpcyBjb25kaXRpb25hbC4gIEhvd2V2ZXIsIGl0J3MgcHJlZmVyYWJsZSB0byBwYXNzXG4gIC8vIHRoZSBzb3VyY2UgbWFwIFVSTCB0byBTb3VyY2VNYXBDb25zdW1lciwgc28gdGhhdCB0aGlzIGZ1bmN0aW9uXG4gIC8vIGNhbiBpbXBsZW1lbnQgdGhlIHNvdXJjZSBVUkwgcmVzb2x1dGlvbiBhbGdvcml0aG0gYXMgb3V0bGluZWQgaW5cbiAgLy8gdGhlIHNwZWMuICBUaGlzIGJsb2NrIGlzIGJhc2ljYWxseSB0aGUgZXF1aXZhbGVudCBvZjpcbiAgLy8gICAgbmV3IFVSTChzb3VyY2VVUkwsIHNvdXJjZU1hcFVSTCkudG9TdHJpbmcoKVxuICAvLyAuLi4gZXhjZXB0IGl0IGF2b2lkcyB1c2luZyBVUkwsIHdoaWNoIHdhc24ndCBhdmFpbGFibGUgaW4gdGhlXG4gIC8vIG9sZGVyIHJlbGVhc2VzIG9mIG5vZGUgc3RpbGwgc3VwcG9ydGVkIGJ5IHRoaXMgbGlicmFyeS5cbiAgLy9cbiAgLy8gVGhlIHNwZWMgc2F5czpcbiAgLy8gICBJZiB0aGUgc291cmNlcyBhcmUgbm90IGFic29sdXRlIFVSTHMgYWZ0ZXIgcHJlcGVuZGluZyBvZiB0aGVcbiAgLy8gICDigJxzb3VyY2VSb2904oCdLCB0aGUgc291cmNlcyBhcmUgcmVzb2x2ZWQgcmVsYXRpdmUgdG8gdGhlXG4gIC8vICAgU291cmNlTWFwIChsaWtlIHJlc29sdmluZyBzY3JpcHQgc3JjIGluIGEgaHRtbCBkb2N1bWVudCkuXG4gIGlmIChzb3VyY2VNYXBVUkwpIHtcbiAgICB2YXIgcGFyc2VkID0gdXJsUGFyc2Uoc291cmNlTWFwVVJMKTtcbiAgICBpZiAoIXBhcnNlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwic291cmNlTWFwVVJMIGNvdWxkIG5vdCBiZSBwYXJzZWRcIik7XG4gICAgfVxuICAgIGlmIChwYXJzZWQucGF0aCkge1xuICAgICAgLy8gU3RyaXAgdGhlIGxhc3QgcGF0aCBjb21wb25lbnQsIGJ1dCBrZWVwIHRoZSBcIi9cIi5cbiAgICAgIHZhciBpbmRleCA9IHBhcnNlZC5wYXRoLmxhc3RJbmRleE9mKCcvJyk7XG4gICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICBwYXJzZWQucGF0aCA9IHBhcnNlZC5wYXRoLnN1YnN0cmluZygwLCBpbmRleCArIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBzb3VyY2VVUkwgPSBqb2luKHVybEdlbmVyYXRlKHBhcnNlZCksIHNvdXJjZVVSTCk7XG4gIH1cblxuICByZXR1cm4gbm9ybWFsaXplKHNvdXJjZVVSTCk7XG59XG5leHBvcnRzLmNvbXB1dGVTb3VyY2VVUkwgPSBjb21wdXRlU291cmNlVVJMO1xuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xuLypcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcbiAqL1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgaGFzTmF0aXZlTWFwID0gdHlwZW9mIE1hcCAhPT0gXCJ1bmRlZmluZWRcIjtcblxuLyoqXG4gKiBBIGRhdGEgc3RydWN0dXJlIHdoaWNoIGlzIGEgY29tYmluYXRpb24gb2YgYW4gYXJyYXkgYW5kIGEgc2V0LiBBZGRpbmcgYSBuZXdcbiAqIG1lbWJlciBpcyBPKDEpLCB0ZXN0aW5nIGZvciBtZW1iZXJzaGlwIGlzIE8oMSksIGFuZCBmaW5kaW5nIHRoZSBpbmRleCBvZiBhblxuICogZWxlbWVudCBpcyBPKDEpLiBSZW1vdmluZyBlbGVtZW50cyBmcm9tIHRoZSBzZXQgaXMgbm90IHN1cHBvcnRlZC4gT25seVxuICogc3RyaW5ncyBhcmUgc3VwcG9ydGVkIGZvciBtZW1iZXJzaGlwLlxuICovXG5mdW5jdGlvbiBBcnJheVNldCgpIHtcbiAgdGhpcy5fYXJyYXkgPSBbXTtcbiAgdGhpcy5fc2V0ID0gaGFzTmF0aXZlTWFwID8gbmV3IE1hcCgpIDogT2JqZWN0LmNyZWF0ZShudWxsKTtcbn1cblxuLyoqXG4gKiBTdGF0aWMgbWV0aG9kIGZvciBjcmVhdGluZyBBcnJheVNldCBpbnN0YW5jZXMgZnJvbSBhbiBleGlzdGluZyBhcnJheS5cbiAqL1xuQXJyYXlTZXQuZnJvbUFycmF5ID0gZnVuY3Rpb24gQXJyYXlTZXRfZnJvbUFycmF5KGFBcnJheSwgYUFsbG93RHVwbGljYXRlcykge1xuICB2YXIgc2V0ID0gbmV3IEFycmF5U2V0KCk7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhQXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBzZXQuYWRkKGFBcnJheVtpXSwgYUFsbG93RHVwbGljYXRlcyk7XG4gIH1cbiAgcmV0dXJuIHNldDtcbn07XG5cbi8qKlxuICogUmV0dXJuIGhvdyBtYW55IHVuaXF1ZSBpdGVtcyBhcmUgaW4gdGhpcyBBcnJheVNldC4gSWYgZHVwbGljYXRlcyBoYXZlIGJlZW5cbiAqIGFkZGVkLCB0aGFuIHRob3NlIGRvIG5vdCBjb3VudCB0b3dhcmRzIHRoZSBzaXplLlxuICpcbiAqIEByZXR1cm5zIE51bWJlclxuICovXG5BcnJheVNldC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uIEFycmF5U2V0X3NpemUoKSB7XG4gIHJldHVybiBoYXNOYXRpdmVNYXAgPyB0aGlzLl9zZXQuc2l6ZSA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuX3NldCkubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBBZGQgdGhlIGdpdmVuIHN0cmluZyB0byB0aGlzIHNldC5cbiAqXG4gKiBAcGFyYW0gU3RyaW5nIGFTdHJcbiAqL1xuQXJyYXlTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIEFycmF5U2V0X2FkZChhU3RyLCBhQWxsb3dEdXBsaWNhdGVzKSB7XG4gIHZhciBzU3RyID0gaGFzTmF0aXZlTWFwID8gYVN0ciA6IHV0aWwudG9TZXRTdHJpbmcoYVN0cik7XG4gIHZhciBpc0R1cGxpY2F0ZSA9IGhhc05hdGl2ZU1hcCA/IHRoaXMuaGFzKGFTdHIpIDogaGFzLmNhbGwodGhpcy5fc2V0LCBzU3RyKTtcbiAgdmFyIGlkeCA9IHRoaXMuX2FycmF5Lmxlbmd0aDtcbiAgaWYgKCFpc0R1cGxpY2F0ZSB8fCBhQWxsb3dEdXBsaWNhdGVzKSB7XG4gICAgdGhpcy5fYXJyYXkucHVzaChhU3RyKTtcbiAgfVxuICBpZiAoIWlzRHVwbGljYXRlKSB7XG4gICAgaWYgKGhhc05hdGl2ZU1hcCkge1xuICAgICAgdGhpcy5fc2V0LnNldChhU3RyLCBpZHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRbc1N0cl0gPSBpZHg7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIElzIHRoZSBnaXZlbiBzdHJpbmcgYSBtZW1iZXIgb2YgdGhpcyBzZXQ/XG4gKlxuICogQHBhcmFtIFN0cmluZyBhU3RyXG4gKi9cbkFycmF5U2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBBcnJheVNldF9oYXMoYVN0cikge1xuICBpZiAoaGFzTmF0aXZlTWFwKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NldC5oYXMoYVN0cik7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHNTdHIgPSB1dGlsLnRvU2V0U3RyaW5nKGFTdHIpO1xuICAgIHJldHVybiBoYXMuY2FsbCh0aGlzLl9zZXQsIHNTdHIpO1xuICB9XG59O1xuXG4vKipcbiAqIFdoYXQgaXMgdGhlIGluZGV4IG9mIHRoZSBnaXZlbiBzdHJpbmcgaW4gdGhlIGFycmF5P1xuICpcbiAqIEBwYXJhbSBTdHJpbmcgYVN0clxuICovXG5BcnJheVNldC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIEFycmF5U2V0X2luZGV4T2YoYVN0cikge1xuICBpZiAoaGFzTmF0aXZlTWFwKSB7XG4gICAgdmFyIGlkeCA9IHRoaXMuX3NldC5nZXQoYVN0cik7XG4gICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBzU3RyID0gdXRpbC50b1NldFN0cmluZyhhU3RyKTtcbiAgICBpZiAoaGFzLmNhbGwodGhpcy5fc2V0LCBzU3RyKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NldFtzU3RyXTtcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGFTdHIgKyAnXCIgaXMgbm90IGluIHRoZSBzZXQuJyk7XG59O1xuXG4vKipcbiAqIFdoYXQgaXMgdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4P1xuICpcbiAqIEBwYXJhbSBOdW1iZXIgYUlkeFxuICovXG5BcnJheVNldC5wcm90b3R5cGUuYXQgPSBmdW5jdGlvbiBBcnJheVNldF9hdChhSWR4KSB7XG4gIGlmIChhSWR4ID49IDAgJiYgYUlkeCA8IHRoaXMuX2FycmF5Lmxlbmd0aCkge1xuICAgIHJldHVybiB0aGlzLl9hcnJheVthSWR4XTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ05vIGVsZW1lbnQgaW5kZXhlZCBieSAnICsgYUlkeCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGFycmF5IHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgc2V0ICh3aGljaCBoYXMgdGhlIHByb3BlciBpbmRpY2VzXG4gKiBpbmRpY2F0ZWQgYnkgaW5kZXhPZikuIE5vdGUgdGhhdCB0aGlzIGlzIGEgY29weSBvZiB0aGUgaW50ZXJuYWwgYXJyYXkgdXNlZFxuICogZm9yIHN0b3JpbmcgdGhlIG1lbWJlcnMgc28gdGhhdCBubyBvbmUgY2FuIG1lc3Mgd2l0aCBpbnRlcm5hbCBzdGF0ZS5cbiAqL1xuQXJyYXlTZXQucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiBBcnJheVNldF90b0FycmF5KCkge1xuICByZXR1cm4gdGhpcy5fYXJyYXkuc2xpY2UoKTtcbn07XG5cbmV4cG9ydHMuQXJyYXlTZXQgPSBBcnJheVNldDtcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cbi8qXG4gKiBDb3B5cmlnaHQgMjAxNCBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXG4gKi9cblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciBtYXBwaW5nQiBpcyBhZnRlciBtYXBwaW5nQSB3aXRoIHJlc3BlY3QgdG8gZ2VuZXJhdGVkXG4gKiBwb3NpdGlvbi5cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVkUG9zaXRpb25BZnRlcihtYXBwaW5nQSwgbWFwcGluZ0IpIHtcbiAgLy8gT3B0aW1pemVkIGZvciBtb3N0IGNvbW1vbiBjYXNlXG4gIHZhciBsaW5lQSA9IG1hcHBpbmdBLmdlbmVyYXRlZExpbmU7XG4gIHZhciBsaW5lQiA9IG1hcHBpbmdCLmdlbmVyYXRlZExpbmU7XG4gIHZhciBjb2x1bW5BID0gbWFwcGluZ0EuZ2VuZXJhdGVkQ29sdW1uO1xuICB2YXIgY29sdW1uQiA9IG1hcHBpbmdCLmdlbmVyYXRlZENvbHVtbjtcbiAgcmV0dXJuIGxpbmVCID4gbGluZUEgfHwgbGluZUIgPT0gbGluZUEgJiYgY29sdW1uQiA+PSBjb2x1bW5BIHx8XG4gICAgICAgICB1dGlsLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkKG1hcHBpbmdBLCBtYXBwaW5nQikgPD0gMDtcbn1cblxuLyoqXG4gKiBBIGRhdGEgc3RydWN0dXJlIHRvIHByb3ZpZGUgYSBzb3J0ZWQgdmlldyBvZiBhY2N1bXVsYXRlZCBtYXBwaW5ncyBpbiBhXG4gKiBwZXJmb3JtYW5jZSBjb25zY2lvdXMgbWFubmVyLiBJdCB0cmFkZXMgYSBuZWdsaWJhYmxlIG92ZXJoZWFkIGluIGdlbmVyYWxcbiAqIGNhc2UgZm9yIGEgbGFyZ2Ugc3BlZWR1cCBpbiBjYXNlIG9mIG1hcHBpbmdzIGJlaW5nIGFkZGVkIGluIG9yZGVyLlxuICovXG5mdW5jdGlvbiBNYXBwaW5nTGlzdCgpIHtcbiAgdGhpcy5fYXJyYXkgPSBbXTtcbiAgdGhpcy5fc29ydGVkID0gdHJ1ZTtcbiAgLy8gU2VydmVzIGFzIGluZmltdW1cbiAgdGhpcy5fbGFzdCA9IHtnZW5lcmF0ZWRMaW5lOiAtMSwgZ2VuZXJhdGVkQ29sdW1uOiAwfTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIHRocm91Z2ggaW50ZXJuYWwgaXRlbXMuIFRoaXMgbWV0aG9kIHRha2VzIHRoZSBzYW1lIGFyZ3VtZW50cyB0aGF0XG4gKiBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIHRha2VzLlxuICpcbiAqIE5PVEU6IFRoZSBvcmRlciBvZiB0aGUgbWFwcGluZ3MgaXMgTk9UIGd1YXJhbnRlZWQuXG4gKi9cbk1hcHBpbmdMaXN0LnByb3RvdHlwZS51bnNvcnRlZEZvckVhY2ggPVxuICBmdW5jdGlvbiBNYXBwaW5nTGlzdF9mb3JFYWNoKGFDYWxsYmFjaywgYVRoaXNBcmcpIHtcbiAgICB0aGlzLl9hcnJheS5mb3JFYWNoKGFDYWxsYmFjaywgYVRoaXNBcmcpO1xuICB9O1xuXG4vKipcbiAqIEFkZCB0aGUgZ2l2ZW4gc291cmNlIG1hcHBpbmcuXG4gKlxuICogQHBhcmFtIE9iamVjdCBhTWFwcGluZ1xuICovXG5NYXBwaW5nTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gTWFwcGluZ0xpc3RfYWRkKGFNYXBwaW5nKSB7XG4gIGlmIChnZW5lcmF0ZWRQb3NpdGlvbkFmdGVyKHRoaXMuX2xhc3QsIGFNYXBwaW5nKSkge1xuICAgIHRoaXMuX2xhc3QgPSBhTWFwcGluZztcbiAgICB0aGlzLl9hcnJheS5wdXNoKGFNYXBwaW5nKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9zb3J0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9hcnJheS5wdXNoKGFNYXBwaW5nKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmbGF0LCBzb3J0ZWQgYXJyYXkgb2YgbWFwcGluZ3MuIFRoZSBtYXBwaW5ncyBhcmUgc29ydGVkIGJ5XG4gKiBnZW5lcmF0ZWQgcG9zaXRpb24uXG4gKlxuICogV0FSTklORzogVGhpcyBtZXRob2QgcmV0dXJucyBpbnRlcm5hbCBkYXRhIHdpdGhvdXQgY29weWluZywgZm9yXG4gKiBwZXJmb3JtYW5jZS4gVGhlIHJldHVybiB2YWx1ZSBtdXN0IE5PVCBiZSBtdXRhdGVkLCBhbmQgc2hvdWxkIGJlIHRyZWF0ZWQgYXNcbiAqIGFuIGltbXV0YWJsZSBib3Jyb3cuIElmIHlvdSB3YW50IHRvIHRha2Ugb3duZXJzaGlwLCB5b3UgbXVzdCBtYWtlIHlvdXIgb3duXG4gKiBjb3B5LlxuICovXG5NYXBwaW5nTGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uIE1hcHBpbmdMaXN0X3RvQXJyYXkoKSB7XG4gIGlmICghdGhpcy5fc29ydGVkKSB7XG4gICAgdGhpcy5fYXJyYXkuc29ydCh1dGlsLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkKTtcbiAgICB0aGlzLl9zb3J0ZWQgPSB0cnVlO1xuICB9XG4gIHJldHVybiB0aGlzLl9hcnJheTtcbn07XG5cbmV4cG9ydHMuTWFwcGluZ0xpc3QgPSBNYXBwaW5nTGlzdDtcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cbi8qXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXG4gKi9cblxudmFyIGJhc2U2NFZMUSA9IHJlcXVpcmUoJy4vYmFzZTY0LXZscScpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBBcnJheVNldCA9IHJlcXVpcmUoJy4vYXJyYXktc2V0JykuQXJyYXlTZXQ7XG52YXIgTWFwcGluZ0xpc3QgPSByZXF1aXJlKCcuL21hcHBpbmctbGlzdCcpLk1hcHBpbmdMaXN0O1xuXG4vKipcbiAqIEFuIGluc3RhbmNlIG9mIHRoZSBTb3VyY2VNYXBHZW5lcmF0b3IgcmVwcmVzZW50cyBhIHNvdXJjZSBtYXAgd2hpY2ggaXNcbiAqIGJlaW5nIGJ1aWx0IGluY3JlbWVudGFsbHkuIFlvdSBtYXkgcGFzcyBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nXG4gKiBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBmaWxlOiBUaGUgZmlsZW5hbWUgb2YgdGhlIGdlbmVyYXRlZCBzb3VyY2UuXG4gKiAgIC0gc291cmNlUm9vdDogQSByb290IGZvciBhbGwgcmVsYXRpdmUgVVJMcyBpbiB0aGlzIHNvdXJjZSBtYXAuXG4gKi9cbmZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcihhQXJncykge1xuICBpZiAoIWFBcmdzKSB7XG4gICAgYUFyZ3MgPSB7fTtcbiAgfVxuICB0aGlzLl9maWxlID0gdXRpbC5nZXRBcmcoYUFyZ3MsICdmaWxlJywgbnVsbCk7XG4gIHRoaXMuX3NvdXJjZVJvb3QgPSB1dGlsLmdldEFyZyhhQXJncywgJ3NvdXJjZVJvb3QnLCBudWxsKTtcbiAgdGhpcy5fc2tpcFZhbGlkYXRpb24gPSB1dGlsLmdldEFyZyhhQXJncywgJ3NraXBWYWxpZGF0aW9uJywgZmFsc2UpO1xuICB0aGlzLl9zb3VyY2VzID0gbmV3IEFycmF5U2V0KCk7XG4gIHRoaXMuX25hbWVzID0gbmV3IEFycmF5U2V0KCk7XG4gIHRoaXMuX21hcHBpbmdzID0gbmV3IE1hcHBpbmdMaXN0KCk7XG4gIHRoaXMuX3NvdXJjZXNDb250ZW50cyA9IG51bGw7XG59XG5cblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuX3ZlcnNpb24gPSAzO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgU291cmNlTWFwR2VuZXJhdG9yIGJhc2VkIG9uIGEgU291cmNlTWFwQ29uc3VtZXJcbiAqXG4gKiBAcGFyYW0gYVNvdXJjZU1hcENvbnN1bWVyIFRoZSBTb3VyY2VNYXAuXG4gKi9cblNvdXJjZU1hcEdlbmVyYXRvci5mcm9tU291cmNlTWFwID1cbiAgZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX2Zyb21Tb3VyY2VNYXAoYVNvdXJjZU1hcENvbnN1bWVyKSB7XG4gICAgdmFyIHNvdXJjZVJvb3QgPSBhU291cmNlTWFwQ29uc3VtZXIuc291cmNlUm9vdDtcbiAgICB2YXIgZ2VuZXJhdG9yID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7XG4gICAgICBmaWxlOiBhU291cmNlTWFwQ29uc3VtZXIuZmlsZSxcbiAgICAgIHNvdXJjZVJvb3Q6IHNvdXJjZVJvb3RcbiAgICB9KTtcbiAgICBhU291cmNlTWFwQ29uc3VtZXIuZWFjaE1hcHBpbmcoZnVuY3Rpb24gKG1hcHBpbmcpIHtcbiAgICAgIHZhciBuZXdNYXBwaW5nID0ge1xuICAgICAgICBnZW5lcmF0ZWQ6IHtcbiAgICAgICAgICBsaW5lOiBtYXBwaW5nLmdlbmVyYXRlZExpbmUsXG4gICAgICAgICAgY29sdW1uOiBtYXBwaW5nLmdlbmVyYXRlZENvbHVtblxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAobWFwcGluZy5zb3VyY2UgIT0gbnVsbCkge1xuICAgICAgICBuZXdNYXBwaW5nLnNvdXJjZSA9IG1hcHBpbmcuc291cmNlO1xuICAgICAgICBpZiAoc291cmNlUm9vdCAhPSBudWxsKSB7XG4gICAgICAgICAgbmV3TWFwcGluZy5zb3VyY2UgPSB1dGlsLnJlbGF0aXZlKHNvdXJjZVJvb3QsIG5ld01hcHBpbmcuc291cmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5ld01hcHBpbmcub3JpZ2luYWwgPSB7XG4gICAgICAgICAgbGluZTogbWFwcGluZy5vcmlnaW5hbExpbmUsXG4gICAgICAgICAgY29sdW1uOiBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1hcHBpbmcubmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgbmV3TWFwcGluZy5uYW1lID0gbWFwcGluZy5uYW1lO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGdlbmVyYXRvci5hZGRNYXBwaW5nKG5ld01hcHBpbmcpO1xuICAgIH0pO1xuICAgIGFTb3VyY2VNYXBDb25zdW1lci5zb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZUZpbGUpIHtcbiAgICAgIHZhciBzb3VyY2VSZWxhdGl2ZSA9IHNvdXJjZUZpbGU7XG4gICAgICBpZiAoc291cmNlUm9vdCAhPT0gbnVsbCkge1xuICAgICAgICBzb3VyY2VSZWxhdGl2ZSA9IHV0aWwucmVsYXRpdmUoc291cmNlUm9vdCwgc291cmNlRmlsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghZ2VuZXJhdG9yLl9zb3VyY2VzLmhhcyhzb3VyY2VSZWxhdGl2ZSkpIHtcbiAgICAgICAgZ2VuZXJhdG9yLl9zb3VyY2VzLmFkZChzb3VyY2VSZWxhdGl2ZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZW50ID0gYVNvdXJjZU1hcENvbnN1bWVyLnNvdXJjZUNvbnRlbnRGb3Ioc291cmNlRmlsZSk7XG4gICAgICBpZiAoY29udGVudCAhPSBudWxsKSB7XG4gICAgICAgIGdlbmVyYXRvci5zZXRTb3VyY2VDb250ZW50KHNvdXJjZUZpbGUsIGNvbnRlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH07XG5cbi8qKlxuICogQWRkIGEgc2luZ2xlIG1hcHBpbmcgZnJvbSBvcmlnaW5hbCBzb3VyY2UgbGluZSBhbmQgY29sdW1uIHRvIHRoZSBnZW5lcmF0ZWRcbiAqIHNvdXJjZSdzIGxpbmUgYW5kIGNvbHVtbiBmb3IgdGhpcyBzb3VyY2UgbWFwIGJlaW5nIGNyZWF0ZWQuIFRoZSBtYXBwaW5nXG4gKiBvYmplY3Qgc2hvdWxkIGhhdmUgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBnZW5lcmF0ZWQ6IEFuIG9iamVjdCB3aXRoIHRoZSBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uIHBvc2l0aW9ucy5cbiAqICAgLSBvcmlnaW5hbDogQW4gb2JqZWN0IHdpdGggdGhlIG9yaWdpbmFsIGxpbmUgYW5kIGNvbHVtbiBwb3NpdGlvbnMuXG4gKiAgIC0gc291cmNlOiBUaGUgb3JpZ2luYWwgc291cmNlIGZpbGUgKHJlbGF0aXZlIHRvIHRoZSBzb3VyY2VSb290KS5cbiAqICAgLSBuYW1lOiBBbiBvcHRpb25hbCBvcmlnaW5hbCB0b2tlbiBuYW1lIGZvciB0aGlzIG1hcHBpbmcuXG4gKi9cblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuYWRkTWFwcGluZyA9XG4gIGZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcl9hZGRNYXBwaW5nKGFBcmdzKSB7XG4gICAgdmFyIGdlbmVyYXRlZCA9IHV0aWwuZ2V0QXJnKGFBcmdzLCAnZ2VuZXJhdGVkJyk7XG4gICAgdmFyIG9yaWdpbmFsID0gdXRpbC5nZXRBcmcoYUFyZ3MsICdvcmlnaW5hbCcsIG51bGwpO1xuICAgIHZhciBzb3VyY2UgPSB1dGlsLmdldEFyZyhhQXJncywgJ3NvdXJjZScsIG51bGwpO1xuICAgIHZhciBuYW1lID0gdXRpbC5nZXRBcmcoYUFyZ3MsICduYW1lJywgbnVsbCk7XG5cbiAgICBpZiAoIXRoaXMuX3NraXBWYWxpZGF0aW9uKSB7XG4gICAgICB0aGlzLl92YWxpZGF0ZU1hcHBpbmcoZ2VuZXJhdGVkLCBvcmlnaW5hbCwgc291cmNlLCBuYW1lKTtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlICE9IG51bGwpIHtcbiAgICAgIHNvdXJjZSA9IFN0cmluZyhzb3VyY2UpO1xuICAgICAgaWYgKCF0aGlzLl9zb3VyY2VzLmhhcyhzb3VyY2UpKSB7XG4gICAgICAgIHRoaXMuX3NvdXJjZXMuYWRkKHNvdXJjZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgIT0gbnVsbCkge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKTtcbiAgICAgIGlmICghdGhpcy5fbmFtZXMuaGFzKG5hbWUpKSB7XG4gICAgICAgIHRoaXMuX25hbWVzLmFkZChuYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9tYXBwaW5ncy5hZGQoe1xuICAgICAgZ2VuZXJhdGVkTGluZTogZ2VuZXJhdGVkLmxpbmUsXG4gICAgICBnZW5lcmF0ZWRDb2x1bW46IGdlbmVyYXRlZC5jb2x1bW4sXG4gICAgICBvcmlnaW5hbExpbmU6IG9yaWdpbmFsICE9IG51bGwgJiYgb3JpZ2luYWwubGluZSxcbiAgICAgIG9yaWdpbmFsQ29sdW1uOiBvcmlnaW5hbCAhPSBudWxsICYmIG9yaWdpbmFsLmNvbHVtbixcbiAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgbmFtZTogbmFtZVxuICAgIH0pO1xuICB9O1xuXG4vKipcbiAqIFNldCB0aGUgc291cmNlIGNvbnRlbnQgZm9yIGEgc291cmNlIGZpbGUuXG4gKi9cblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuc2V0U291cmNlQ29udGVudCA9XG4gIGZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcl9zZXRTb3VyY2VDb250ZW50KGFTb3VyY2VGaWxlLCBhU291cmNlQ29udGVudCkge1xuICAgIHZhciBzb3VyY2UgPSBhU291cmNlRmlsZTtcbiAgICBpZiAodGhpcy5fc291cmNlUm9vdCAhPSBudWxsKSB7XG4gICAgICBzb3VyY2UgPSB1dGlsLnJlbGF0aXZlKHRoaXMuX3NvdXJjZVJvb3QsIHNvdXJjZSk7XG4gICAgfVxuXG4gICAgaWYgKGFTb3VyY2VDb250ZW50ICE9IG51bGwpIHtcbiAgICAgIC8vIEFkZCB0aGUgc291cmNlIGNvbnRlbnQgdG8gdGhlIF9zb3VyY2VzQ29udGVudHMgbWFwLlxuICAgICAgLy8gQ3JlYXRlIGEgbmV3IF9zb3VyY2VzQ29udGVudHMgbWFwIGlmIHRoZSBwcm9wZXJ0eSBpcyBudWxsLlxuICAgICAgaWYgKCF0aGlzLl9zb3VyY2VzQ29udGVudHMpIHtcbiAgICAgICAgdGhpcy5fc291cmNlc0NvbnRlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NvdXJjZXNDb250ZW50c1t1dGlsLnRvU2V0U3RyaW5nKHNvdXJjZSldID0gYVNvdXJjZUNvbnRlbnQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zb3VyY2VzQ29udGVudHMpIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgc291cmNlIGZpbGUgZnJvbSB0aGUgX3NvdXJjZXNDb250ZW50cyBtYXAuXG4gICAgICAvLyBJZiB0aGUgX3NvdXJjZXNDb250ZW50cyBtYXAgaXMgZW1wdHksIHNldCB0aGUgcHJvcGVydHkgdG8gbnVsbC5cbiAgICAgIGRlbGV0ZSB0aGlzLl9zb3VyY2VzQ29udGVudHNbdXRpbC50b1NldFN0cmluZyhzb3VyY2UpXTtcbiAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLl9zb3VyY2VzQ29udGVudHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLl9zb3VyY2VzQ29udGVudHMgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBtYXBwaW5ncyBvZiBhIHN1Yi1zb3VyY2UtbWFwIGZvciBhIHNwZWNpZmljIHNvdXJjZSBmaWxlIHRvIHRoZVxuICogc291cmNlIG1hcCBiZWluZyBnZW5lcmF0ZWQuIEVhY2ggbWFwcGluZyB0byB0aGUgc3VwcGxpZWQgc291cmNlIGZpbGUgaXNcbiAqIHJld3JpdHRlbiB1c2luZyB0aGUgc3VwcGxpZWQgc291cmNlIG1hcC4gTm90ZTogVGhlIHJlc29sdXRpb24gZm9yIHRoZVxuICogcmVzdWx0aW5nIG1hcHBpbmdzIGlzIHRoZSBtaW5pbWl1bSBvZiB0aGlzIG1hcCBhbmQgdGhlIHN1cHBsaWVkIG1hcC5cbiAqXG4gKiBAcGFyYW0gYVNvdXJjZU1hcENvbnN1bWVyIFRoZSBzb3VyY2UgbWFwIHRvIGJlIGFwcGxpZWQuXG4gKiBAcGFyYW0gYVNvdXJjZUZpbGUgT3B0aW9uYWwuIFRoZSBmaWxlbmFtZSBvZiB0aGUgc291cmNlIGZpbGUuXG4gKiAgICAgICAgSWYgb21pdHRlZCwgU291cmNlTWFwQ29uc3VtZXIncyBmaWxlIHByb3BlcnR5IHdpbGwgYmUgdXNlZC5cbiAqIEBwYXJhbSBhU291cmNlTWFwUGF0aCBPcHRpb25hbC4gVGhlIGRpcm5hbWUgb2YgdGhlIHBhdGggdG8gdGhlIHNvdXJjZSBtYXBcbiAqICAgICAgICB0byBiZSBhcHBsaWVkLiBJZiByZWxhdGl2ZSwgaXQgaXMgcmVsYXRpdmUgdG8gdGhlIFNvdXJjZU1hcENvbnN1bWVyLlxuICogICAgICAgIFRoaXMgcGFyYW1ldGVyIGlzIG5lZWRlZCB3aGVuIHRoZSB0d28gc291cmNlIG1hcHMgYXJlbid0IGluIHRoZSBzYW1lXG4gKiAgICAgICAgZGlyZWN0b3J5LCBhbmQgdGhlIHNvdXJjZSBtYXAgdG8gYmUgYXBwbGllZCBjb250YWlucyByZWxhdGl2ZSBzb3VyY2VcbiAqICAgICAgICBwYXRocy4gSWYgc28sIHRob3NlIHJlbGF0aXZlIHNvdXJjZSBwYXRocyBuZWVkIHRvIGJlIHJld3JpdHRlblxuICogICAgICAgIHJlbGF0aXZlIHRvIHRoZSBTb3VyY2VNYXBHZW5lcmF0b3IuXG4gKi9cblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuYXBwbHlTb3VyY2VNYXAgPVxuICBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3JfYXBwbHlTb3VyY2VNYXAoYVNvdXJjZU1hcENvbnN1bWVyLCBhU291cmNlRmlsZSwgYVNvdXJjZU1hcFBhdGgpIHtcbiAgICB2YXIgc291cmNlRmlsZSA9IGFTb3VyY2VGaWxlO1xuICAgIC8vIElmIGFTb3VyY2VGaWxlIGlzIG9taXR0ZWQsIHdlIHdpbGwgdXNlIHRoZSBmaWxlIHByb3BlcnR5IG9mIHRoZSBTb3VyY2VNYXBcbiAgICBpZiAoYVNvdXJjZUZpbGUgPT0gbnVsbCkge1xuICAgICAgaWYgKGFTb3VyY2VNYXBDb25zdW1lci5maWxlID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdTb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLmFwcGx5U291cmNlTWFwIHJlcXVpcmVzIGVpdGhlciBhbiBleHBsaWNpdCBzb3VyY2UgZmlsZSwgJyArXG4gICAgICAgICAgJ29yIHRoZSBzb3VyY2UgbWFwXFwncyBcImZpbGVcIiBwcm9wZXJ0eS4gQm90aCB3ZXJlIG9taXR0ZWQuJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgc291cmNlRmlsZSA9IGFTb3VyY2VNYXBDb25zdW1lci5maWxlO1xuICAgIH1cbiAgICB2YXIgc291cmNlUm9vdCA9IHRoaXMuX3NvdXJjZVJvb3Q7XG4gICAgLy8gTWFrZSBcInNvdXJjZUZpbGVcIiByZWxhdGl2ZSBpZiBhbiBhYnNvbHV0ZSBVcmwgaXMgcGFzc2VkLlxuICAgIGlmIChzb3VyY2VSb290ICE9IG51bGwpIHtcbiAgICAgIHNvdXJjZUZpbGUgPSB1dGlsLnJlbGF0aXZlKHNvdXJjZVJvb3QsIHNvdXJjZUZpbGUpO1xuICAgIH1cbiAgICAvLyBBcHBseWluZyB0aGUgU291cmNlTWFwIGNhbiBhZGQgYW5kIHJlbW92ZSBpdGVtcyBmcm9tIHRoZSBzb3VyY2VzIGFuZFxuICAgIC8vIHRoZSBuYW1lcyBhcnJheS5cbiAgICB2YXIgbmV3U291cmNlcyA9IG5ldyBBcnJheVNldCgpO1xuICAgIHZhciBuZXdOYW1lcyA9IG5ldyBBcnJheVNldCgpO1xuXG4gICAgLy8gRmluZCBtYXBwaW5ncyBmb3IgdGhlIFwic291cmNlRmlsZVwiXG4gICAgdGhpcy5fbWFwcGluZ3MudW5zb3J0ZWRGb3JFYWNoKGZ1bmN0aW9uIChtYXBwaW5nKSB7XG4gICAgICBpZiAobWFwcGluZy5zb3VyY2UgPT09IHNvdXJjZUZpbGUgJiYgbWFwcGluZy5vcmlnaW5hbExpbmUgIT0gbnVsbCkge1xuICAgICAgICAvLyBDaGVjayBpZiBpdCBjYW4gYmUgbWFwcGVkIGJ5IHRoZSBzb3VyY2UgbWFwLCB0aGVuIHVwZGF0ZSB0aGUgbWFwcGluZy5cbiAgICAgICAgdmFyIG9yaWdpbmFsID0gYVNvdXJjZU1hcENvbnN1bWVyLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xuICAgICAgICAgIGxpbmU6IG1hcHBpbmcub3JpZ2luYWxMaW5lLFxuICAgICAgICAgIGNvbHVtbjogbWFwcGluZy5vcmlnaW5hbENvbHVtblxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG9yaWdpbmFsLnNvdXJjZSAhPSBudWxsKSB7XG4gICAgICAgICAgLy8gQ29weSBtYXBwaW5nXG4gICAgICAgICAgbWFwcGluZy5zb3VyY2UgPSBvcmlnaW5hbC5zb3VyY2U7XG4gICAgICAgICAgaWYgKGFTb3VyY2VNYXBQYXRoICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1hcHBpbmcuc291cmNlID0gdXRpbC5qb2luKGFTb3VyY2VNYXBQYXRoLCBtYXBwaW5nLnNvdXJjZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNvdXJjZVJvb3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgbWFwcGluZy5zb3VyY2UgPSB1dGlsLnJlbGF0aXZlKHNvdXJjZVJvb3QsIG1hcHBpbmcuc291cmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWFwcGluZy5vcmlnaW5hbExpbmUgPSBvcmlnaW5hbC5saW5lO1xuICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWxDb2x1bW4gPSBvcmlnaW5hbC5jb2x1bW47XG4gICAgICAgICAgaWYgKG9yaWdpbmFsLm5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgbWFwcGluZy5uYW1lID0gb3JpZ2luYWwubmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHNvdXJjZSA9IG1hcHBpbmcuc291cmNlO1xuICAgICAgaWYgKHNvdXJjZSAhPSBudWxsICYmICFuZXdTb3VyY2VzLmhhcyhzb3VyY2UpKSB7XG4gICAgICAgIG5ld1NvdXJjZXMuYWRkKHNvdXJjZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBuYW1lID0gbWFwcGluZy5uYW1lO1xuICAgICAgaWYgKG5hbWUgIT0gbnVsbCAmJiAhbmV3TmFtZXMuaGFzKG5hbWUpKSB7XG4gICAgICAgIG5ld05hbWVzLmFkZChuYW1lKTtcbiAgICAgIH1cblxuICAgIH0sIHRoaXMpO1xuICAgIHRoaXMuX3NvdXJjZXMgPSBuZXdTb3VyY2VzO1xuICAgIHRoaXMuX25hbWVzID0gbmV3TmFtZXM7XG5cbiAgICAvLyBDb3B5IHNvdXJjZXNDb250ZW50cyBvZiBhcHBsaWVkIG1hcC5cbiAgICBhU291cmNlTWFwQ29uc3VtZXIuc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2VGaWxlKSB7XG4gICAgICB2YXIgY29udGVudCA9IGFTb3VyY2VNYXBDb25zdW1lci5zb3VyY2VDb250ZW50Rm9yKHNvdXJjZUZpbGUpO1xuICAgICAgaWYgKGNvbnRlbnQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoYVNvdXJjZU1hcFBhdGggIT0gbnVsbCkge1xuICAgICAgICAgIHNvdXJjZUZpbGUgPSB1dGlsLmpvaW4oYVNvdXJjZU1hcFBhdGgsIHNvdXJjZUZpbGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzb3VyY2VSb290ICE9IG51bGwpIHtcbiAgICAgICAgICBzb3VyY2VGaWxlID0gdXRpbC5yZWxhdGl2ZShzb3VyY2VSb290LCBzb3VyY2VGaWxlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFNvdXJjZUNvbnRlbnQoc291cmNlRmlsZSwgY29udGVudCk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH07XG5cbi8qKlxuICogQSBtYXBwaW5nIGNhbiBoYXZlIG9uZSBvZiB0aGUgdGhyZWUgbGV2ZWxzIG9mIGRhdGE6XG4gKlxuICogICAxLiBKdXN0IHRoZSBnZW5lcmF0ZWQgcG9zaXRpb24uXG4gKiAgIDIuIFRoZSBHZW5lcmF0ZWQgcG9zaXRpb24sIG9yaWdpbmFsIHBvc2l0aW9uLCBhbmQgb3JpZ2luYWwgc291cmNlLlxuICogICAzLiBHZW5lcmF0ZWQgYW5kIG9yaWdpbmFsIHBvc2l0aW9uLCBvcmlnaW5hbCBzb3VyY2UsIGFzIHdlbGwgYXMgYSBuYW1lXG4gKiAgICAgIHRva2VuLlxuICpcbiAqIFRvIG1haW50YWluIGNvbnNpc3RlbmN5LCB3ZSB2YWxpZGF0ZSB0aGF0IGFueSBuZXcgbWFwcGluZyBiZWluZyBhZGRlZCBmYWxsc1xuICogaW4gdG8gb25lIG9mIHRoZXNlIGNhdGVnb3JpZXMuXG4gKi9cblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuX3ZhbGlkYXRlTWFwcGluZyA9XG4gIGZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcl92YWxpZGF0ZU1hcHBpbmcoYUdlbmVyYXRlZCwgYU9yaWdpbmFsLCBhU291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFOYW1lKSB7XG4gICAgLy8gV2hlbiBhT3JpZ2luYWwgaXMgdHJ1dGh5IGJ1dCBoYXMgZW1wdHkgdmFsdWVzIGZvciAubGluZSBhbmQgLmNvbHVtbixcbiAgICAvLyBpdCBpcyBtb3N0IGxpa2VseSBhIHByb2dyYW1tZXIgZXJyb3IuIEluIHRoaXMgY2FzZSB3ZSB0aHJvdyBhIHZlcnlcbiAgICAvLyBzcGVjaWZpYyBlcnJvciBtZXNzYWdlIHRvIHRyeSB0byBndWlkZSB0aGVtIHRoZSByaWdodCB3YXkuXG4gICAgLy8gRm9yIGV4YW1wbGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9Qb2x5bWVyL3BvbHltZXItYnVuZGxlci9wdWxsLzUxOVxuICAgIGlmIChhT3JpZ2luYWwgJiYgdHlwZW9mIGFPcmlnaW5hbC5saW5lICE9PSAnbnVtYmVyJyAmJiB0eXBlb2YgYU9yaWdpbmFsLmNvbHVtbiAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ29yaWdpbmFsLmxpbmUgYW5kIG9yaWdpbmFsLmNvbHVtbiBhcmUgbm90IG51bWJlcnMgLS0geW91IHByb2JhYmx5IG1lYW50IHRvIG9taXQgJyArXG4gICAgICAgICAgICAndGhlIG9yaWdpbmFsIG1hcHBpbmcgZW50aXJlbHkgYW5kIG9ubHkgbWFwIHRoZSBnZW5lcmF0ZWQgcG9zaXRpb24uIElmIHNvLCBwYXNzICcgK1xuICAgICAgICAgICAgJ251bGwgZm9yIHRoZSBvcmlnaW5hbCBtYXBwaW5nIGluc3RlYWQgb2YgYW4gb2JqZWN0IHdpdGggZW1wdHkgb3IgbnVsbCB2YWx1ZXMuJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGlmIChhR2VuZXJhdGVkICYmICdsaW5lJyBpbiBhR2VuZXJhdGVkICYmICdjb2x1bW4nIGluIGFHZW5lcmF0ZWRcbiAgICAgICAgJiYgYUdlbmVyYXRlZC5saW5lID4gMCAmJiBhR2VuZXJhdGVkLmNvbHVtbiA+PSAwXG4gICAgICAgICYmICFhT3JpZ2luYWwgJiYgIWFTb3VyY2UgJiYgIWFOYW1lKSB7XG4gICAgICAvLyBDYXNlIDEuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2UgaWYgKGFHZW5lcmF0ZWQgJiYgJ2xpbmUnIGluIGFHZW5lcmF0ZWQgJiYgJ2NvbHVtbicgaW4gYUdlbmVyYXRlZFxuICAgICAgICAgICAgICYmIGFPcmlnaW5hbCAmJiAnbGluZScgaW4gYU9yaWdpbmFsICYmICdjb2x1bW4nIGluIGFPcmlnaW5hbFxuICAgICAgICAgICAgICYmIGFHZW5lcmF0ZWQubGluZSA+IDAgJiYgYUdlbmVyYXRlZC5jb2x1bW4gPj0gMFxuICAgICAgICAgICAgICYmIGFPcmlnaW5hbC5saW5lID4gMCAmJiBhT3JpZ2luYWwuY29sdW1uID49IDBcbiAgICAgICAgICAgICAmJiBhU291cmNlKSB7XG4gICAgICAvLyBDYXNlcyAyIGFuZCAzLlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBtYXBwaW5nOiAnICsgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBnZW5lcmF0ZWQ6IGFHZW5lcmF0ZWQsXG4gICAgICAgIHNvdXJjZTogYVNvdXJjZSxcbiAgICAgICAgb3JpZ2luYWw6IGFPcmlnaW5hbCxcbiAgICAgICAgbmFtZTogYU5hbWVcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbi8qKlxuICogU2VyaWFsaXplIHRoZSBhY2N1bXVsYXRlZCBtYXBwaW5ncyBpbiB0byB0aGUgc3RyZWFtIG9mIGJhc2UgNjQgVkxRc1xuICogc3BlY2lmaWVkIGJ5IHRoZSBzb3VyY2UgbWFwIGZvcm1hdC5cbiAqL1xuU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS5fc2VyaWFsaXplTWFwcGluZ3MgPVxuICBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3Jfc2VyaWFsaXplTWFwcGluZ3MoKSB7XG4gICAgdmFyIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uID0gMDtcbiAgICB2YXIgcHJldmlvdXNHZW5lcmF0ZWRMaW5lID0gMTtcbiAgICB2YXIgcHJldmlvdXNPcmlnaW5hbENvbHVtbiA9IDA7XG4gICAgdmFyIHByZXZpb3VzT3JpZ2luYWxMaW5lID0gMDtcbiAgICB2YXIgcHJldmlvdXNOYW1lID0gMDtcbiAgICB2YXIgcHJldmlvdXNTb3VyY2UgPSAwO1xuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB2YXIgbmV4dDtcbiAgICB2YXIgbWFwcGluZztcbiAgICB2YXIgbmFtZUlkeDtcbiAgICB2YXIgc291cmNlSWR4O1xuXG4gICAgdmFyIG1hcHBpbmdzID0gdGhpcy5fbWFwcGluZ3MudG9BcnJheSgpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBtYXBwaW5ncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbWFwcGluZyA9IG1hcHBpbmdzW2ldO1xuICAgICAgbmV4dCA9ICcnXG5cbiAgICAgIGlmIChtYXBwaW5nLmdlbmVyYXRlZExpbmUgIT09IHByZXZpb3VzR2VuZXJhdGVkTGluZSkge1xuICAgICAgICBwcmV2aW91c0dlbmVyYXRlZENvbHVtbiA9IDA7XG4gICAgICAgIHdoaWxlIChtYXBwaW5nLmdlbmVyYXRlZExpbmUgIT09IHByZXZpb3VzR2VuZXJhdGVkTGluZSkge1xuICAgICAgICAgIG5leHQgKz0gJzsnO1xuICAgICAgICAgIHByZXZpb3VzR2VuZXJhdGVkTGluZSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgaWYgKCF1dGlsLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkKG1hcHBpbmcsIG1hcHBpbmdzW2kgLSAxXSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuZXh0ICs9ICcsJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBuZXh0ICs9IGJhc2U2NFZMUS5lbmNvZGUobWFwcGluZy5nZW5lcmF0ZWRDb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gcHJldmlvdXNHZW5lcmF0ZWRDb2x1bW4pO1xuICAgICAgcHJldmlvdXNHZW5lcmF0ZWRDb2x1bW4gPSBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbjtcblxuICAgICAgaWYgKG1hcHBpbmcuc291cmNlICE9IG51bGwpIHtcbiAgICAgICAgc291cmNlSWR4ID0gdGhpcy5fc291cmNlcy5pbmRleE9mKG1hcHBpbmcuc291cmNlKTtcbiAgICAgICAgbmV4dCArPSBiYXNlNjRWTFEuZW5jb2RlKHNvdXJjZUlkeCAtIHByZXZpb3VzU291cmNlKTtcbiAgICAgICAgcHJldmlvdXNTb3VyY2UgPSBzb3VyY2VJZHg7XG5cbiAgICAgICAgLy8gbGluZXMgYXJlIHN0b3JlZCAwLWJhc2VkIGluIFNvdXJjZU1hcCBzcGVjIHZlcnNpb24gM1xuICAgICAgICBuZXh0ICs9IGJhc2U2NFZMUS5lbmNvZGUobWFwcGluZy5vcmlnaW5hbExpbmUgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gcHJldmlvdXNPcmlnaW5hbExpbmUpO1xuICAgICAgICBwcmV2aW91c09yaWdpbmFsTGluZSA9IG1hcHBpbmcub3JpZ2luYWxMaW5lIC0gMTtcblxuICAgICAgICBuZXh0ICs9IGJhc2U2NFZMUS5lbmNvZGUobWFwcGluZy5vcmlnaW5hbENvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIHByZXZpb3VzT3JpZ2luYWxDb2x1bW4pO1xuICAgICAgICBwcmV2aW91c09yaWdpbmFsQ29sdW1uID0gbWFwcGluZy5vcmlnaW5hbENvbHVtbjtcblxuICAgICAgICBpZiAobWFwcGluZy5uYW1lICE9IG51bGwpIHtcbiAgICAgICAgICBuYW1lSWR4ID0gdGhpcy5fbmFtZXMuaW5kZXhPZihtYXBwaW5nLm5hbWUpO1xuICAgICAgICAgIG5leHQgKz0gYmFzZTY0VkxRLmVuY29kZShuYW1lSWR4IC0gcHJldmlvdXNOYW1lKTtcbiAgICAgICAgICBwcmV2aW91c05hbWUgPSBuYW1lSWR4O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdCArPSBuZXh0O1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuX2dlbmVyYXRlU291cmNlc0NvbnRlbnQgPVxuICBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3JfZ2VuZXJhdGVTb3VyY2VzQ29udGVudChhU291cmNlcywgYVNvdXJjZVJvb3QpIHtcbiAgICByZXR1cm4gYVNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIGlmICghdGhpcy5fc291cmNlc0NvbnRlbnRzKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKGFTb3VyY2VSb290ICE9IG51bGwpIHtcbiAgICAgICAgc291cmNlID0gdXRpbC5yZWxhdGl2ZShhU291cmNlUm9vdCwgc291cmNlKTtcbiAgICAgIH1cbiAgICAgIHZhciBrZXkgPSB1dGlsLnRvU2V0U3RyaW5nKHNvdXJjZSk7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuX3NvdXJjZXNDb250ZW50cywga2V5KVxuICAgICAgICA/IHRoaXMuX3NvdXJjZXNDb250ZW50c1trZXldXG4gICAgICAgIDogbnVsbDtcbiAgICB9LCB0aGlzKTtcbiAgfTtcblxuLyoqXG4gKiBFeHRlcm5hbGl6ZSB0aGUgc291cmNlIG1hcC5cbiAqL1xuU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS50b0pTT04gPVxuICBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3JfdG9KU09OKCkge1xuICAgIHZhciBtYXAgPSB7XG4gICAgICB2ZXJzaW9uOiB0aGlzLl92ZXJzaW9uLFxuICAgICAgc291cmNlczogdGhpcy5fc291cmNlcy50b0FycmF5KCksXG4gICAgICBuYW1lczogdGhpcy5fbmFtZXMudG9BcnJheSgpLFxuICAgICAgbWFwcGluZ3M6IHRoaXMuX3NlcmlhbGl6ZU1hcHBpbmdzKClcbiAgICB9O1xuICAgIGlmICh0aGlzLl9maWxlICE9IG51bGwpIHtcbiAgICAgIG1hcC5maWxlID0gdGhpcy5fZmlsZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NvdXJjZVJvb3QgIT0gbnVsbCkge1xuICAgICAgbWFwLnNvdXJjZVJvb3QgPSB0aGlzLl9zb3VyY2VSb290O1xuICAgIH1cbiAgICBpZiAodGhpcy5fc291cmNlc0NvbnRlbnRzKSB7XG4gICAgICBtYXAuc291cmNlc0NvbnRlbnQgPSB0aGlzLl9nZW5lcmF0ZVNvdXJjZXNDb250ZW50KG1hcC5zb3VyY2VzLCBtYXAuc291cmNlUm9vdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcDtcbiAgfTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIHNvdXJjZSBtYXAgYmVpbmcgZ2VuZXJhdGVkIHRvIGEgc3RyaW5nLlxuICovXG5Tb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLnRvU3RyaW5nID1cbiAgZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX3RvU3RyaW5nKCkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnRvSlNPTigpKTtcbiAgfTtcblxuZXhwb3J0cy5Tb3VyY2VNYXBHZW5lcmF0b3IgPSBTb3VyY2VNYXBHZW5lcmF0b3I7XG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXG4vKlxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxuICovXG5cbmV4cG9ydHMuR1JFQVRFU1RfTE9XRVJfQk9VTkQgPSAxO1xuZXhwb3J0cy5MRUFTVF9VUFBFUl9CT1VORCA9IDI7XG5cbi8qKlxuICogUmVjdXJzaXZlIGltcGxlbWVudGF0aW9uIG9mIGJpbmFyeSBzZWFyY2guXG4gKlxuICogQHBhcmFtIGFMb3cgSW5kaWNlcyBoZXJlIGFuZCBsb3dlciBkbyBub3QgY29udGFpbiB0aGUgbmVlZGxlLlxuICogQHBhcmFtIGFIaWdoIEluZGljZXMgaGVyZSBhbmQgaGlnaGVyIGRvIG5vdCBjb250YWluIHRoZSBuZWVkbGUuXG4gKiBAcGFyYW0gYU5lZWRsZSBUaGUgZWxlbWVudCBiZWluZyBzZWFyY2hlZCBmb3IuXG4gKiBAcGFyYW0gYUhheXN0YWNrIFRoZSBub24tZW1wdHkgYXJyYXkgYmVpbmcgc2VhcmNoZWQuXG4gKiBAcGFyYW0gYUNvbXBhcmUgRnVuY3Rpb24gd2hpY2ggdGFrZXMgdHdvIGVsZW1lbnRzIGFuZCByZXR1cm5zIC0xLCAwLCBvciAxLlxuICogQHBhcmFtIGFCaWFzIEVpdGhlciAnYmluYXJ5U2VhcmNoLkdSRUFURVNUX0xPV0VSX0JPVU5EJyBvclxuICogICAgICdiaW5hcnlTZWFyY2guTEVBU1RfVVBQRVJfQk9VTkQnLiBTcGVjaWZpZXMgd2hldGhlciB0byByZXR1cm4gdGhlXG4gKiAgICAgY2xvc2VzdCBlbGVtZW50IHRoYXQgaXMgc21hbGxlciB0aGFuIG9yIGdyZWF0ZXIgdGhhbiB0aGUgb25lIHdlIGFyZVxuICogICAgIHNlYXJjaGluZyBmb3IsIHJlc3BlY3RpdmVseSwgaWYgdGhlIGV4YWN0IGVsZW1lbnQgY2Fubm90IGJlIGZvdW5kLlxuICovXG5mdW5jdGlvbiByZWN1cnNpdmVTZWFyY2goYUxvdywgYUhpZ2gsIGFOZWVkbGUsIGFIYXlzdGFjaywgYUNvbXBhcmUsIGFCaWFzKSB7XG4gIC8vIFRoaXMgZnVuY3Rpb24gdGVybWluYXRlcyB3aGVuIG9uZSBvZiB0aGUgZm9sbG93aW5nIGlzIHRydWU6XG4gIC8vXG4gIC8vICAgMS4gV2UgZmluZCB0aGUgZXhhY3QgZWxlbWVudCB3ZSBhcmUgbG9va2luZyBmb3IuXG4gIC8vXG4gIC8vICAgMi4gV2UgZGlkIG5vdCBmaW5kIHRoZSBleGFjdCBlbGVtZW50LCBidXQgd2UgY2FuIHJldHVybiB0aGUgaW5kZXggb2ZcbiAgLy8gICAgICB0aGUgbmV4dC1jbG9zZXN0IGVsZW1lbnQuXG4gIC8vXG4gIC8vICAgMy4gV2UgZGlkIG5vdCBmaW5kIHRoZSBleGFjdCBlbGVtZW50LCBhbmQgdGhlcmUgaXMgbm8gbmV4dC1jbG9zZXN0XG4gIC8vICAgICAgZWxlbWVudCB0aGFuIHRoZSBvbmUgd2UgYXJlIHNlYXJjaGluZyBmb3IsIHNvIHdlIHJldHVybiAtMS5cbiAgdmFyIG1pZCA9IE1hdGguZmxvb3IoKGFIaWdoIC0gYUxvdykgLyAyKSArIGFMb3c7XG4gIHZhciBjbXAgPSBhQ29tcGFyZShhTmVlZGxlLCBhSGF5c3RhY2tbbWlkXSwgdHJ1ZSk7XG4gIGlmIChjbXAgPT09IDApIHtcbiAgICAvLyBGb3VuZCB0aGUgZWxlbWVudCB3ZSBhcmUgbG9va2luZyBmb3IuXG4gICAgcmV0dXJuIG1pZDtcbiAgfVxuICBlbHNlIGlmIChjbXAgPiAwKSB7XG4gICAgLy8gT3VyIG5lZWRsZSBpcyBncmVhdGVyIHRoYW4gYUhheXN0YWNrW21pZF0uXG4gICAgaWYgKGFIaWdoIC0gbWlkID4gMSkge1xuICAgICAgLy8gVGhlIGVsZW1lbnQgaXMgaW4gdGhlIHVwcGVyIGhhbGYuXG4gICAgICByZXR1cm4gcmVjdXJzaXZlU2VhcmNoKG1pZCwgYUhpZ2gsIGFOZWVkbGUsIGFIYXlzdGFjaywgYUNvbXBhcmUsIGFCaWFzKTtcbiAgICB9XG5cbiAgICAvLyBUaGUgZXhhY3QgbmVlZGxlIGVsZW1lbnQgd2FzIG5vdCBmb3VuZCBpbiB0aGlzIGhheXN0YWNrLiBEZXRlcm1pbmUgaWZcbiAgICAvLyB3ZSBhcmUgaW4gdGVybWluYXRpb24gY2FzZSAoMykgb3IgKDIpIGFuZCByZXR1cm4gdGhlIGFwcHJvcHJpYXRlIHRoaW5nLlxuICAgIGlmIChhQmlhcyA9PSBleHBvcnRzLkxFQVNUX1VQUEVSX0JPVU5EKSB7XG4gICAgICByZXR1cm4gYUhpZ2ggPCBhSGF5c3RhY2subGVuZ3RoID8gYUhpZ2ggOiAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1pZDtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gT3VyIG5lZWRsZSBpcyBsZXNzIHRoYW4gYUhheXN0YWNrW21pZF0uXG4gICAgaWYgKG1pZCAtIGFMb3cgPiAxKSB7XG4gICAgICAvLyBUaGUgZWxlbWVudCBpcyBpbiB0aGUgbG93ZXIgaGFsZi5cbiAgICAgIHJldHVybiByZWN1cnNpdmVTZWFyY2goYUxvdywgbWlkLCBhTmVlZGxlLCBhSGF5c3RhY2ssIGFDb21wYXJlLCBhQmlhcyk7XG4gICAgfVxuXG4gICAgLy8gd2UgYXJlIGluIHRlcm1pbmF0aW9uIGNhc2UgKDMpIG9yICgyKSBhbmQgcmV0dXJuIHRoZSBhcHByb3ByaWF0ZSB0aGluZy5cbiAgICBpZiAoYUJpYXMgPT0gZXhwb3J0cy5MRUFTVF9VUFBFUl9CT1VORCkge1xuICAgICAgcmV0dXJuIG1pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFMb3cgPCAwID8gLTEgOiBhTG93O1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgYmluYXJ5IHNlYXJjaCB3aGljaCB3aWxsIGFsd2F5cyB0cnkgYW5kIHJldHVyblxuICogdGhlIGluZGV4IG9mIHRoZSBjbG9zZXN0IGVsZW1lbnQgaWYgdGhlcmUgaXMgbm8gZXhhY3QgaGl0LiBUaGlzIGlzIGJlY2F1c2VcbiAqIG1hcHBpbmdzIGJldHdlZW4gb3JpZ2luYWwgYW5kIGdlbmVyYXRlZCBsaW5lL2NvbCBwYWlycyBhcmUgc2luZ2xlIHBvaW50cyxcbiAqIGFuZCB0aGVyZSBpcyBhbiBpbXBsaWNpdCByZWdpb24gYmV0d2VlbiBlYWNoIG9mIHRoZW0sIHNvIGEgbWlzcyBqdXN0IG1lYW5zXG4gKiB0aGF0IHlvdSBhcmVuJ3Qgb24gdGhlIHZlcnkgc3RhcnQgb2YgYSByZWdpb24uXG4gKlxuICogQHBhcmFtIGFOZWVkbGUgVGhlIGVsZW1lbnQgeW91IGFyZSBsb29raW5nIGZvci5cbiAqIEBwYXJhbSBhSGF5c3RhY2sgVGhlIGFycmF5IHRoYXQgaXMgYmVpbmcgc2VhcmNoZWQuXG4gKiBAcGFyYW0gYUNvbXBhcmUgQSBmdW5jdGlvbiB3aGljaCB0YWtlcyB0aGUgbmVlZGxlIGFuZCBhbiBlbGVtZW50IGluIHRoZVxuICogICAgIGFycmF5IGFuZCByZXR1cm5zIC0xLCAwLCBvciAxIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBuZWVkbGUgaXMgbGVzc1xuICogICAgIHRoYW4sIGVxdWFsIHRvLCBvciBncmVhdGVyIHRoYW4gdGhlIGVsZW1lbnQsIHJlc3BlY3RpdmVseS5cbiAqIEBwYXJhbSBhQmlhcyBFaXRoZXIgJ2JpbmFyeVNlYXJjaC5HUkVBVEVTVF9MT1dFUl9CT1VORCcgb3JcbiAqICAgICAnYmluYXJ5U2VhcmNoLkxFQVNUX1VQUEVSX0JPVU5EJy4gU3BlY2lmaWVzIHdoZXRoZXIgdG8gcmV0dXJuIHRoZVxuICogICAgIGNsb3Nlc3QgZWxlbWVudCB0aGF0IGlzIHNtYWxsZXIgdGhhbiBvciBncmVhdGVyIHRoYW4gdGhlIG9uZSB3ZSBhcmVcbiAqICAgICBzZWFyY2hpbmcgZm9yLCByZXNwZWN0aXZlbHksIGlmIHRoZSBleGFjdCBlbGVtZW50IGNhbm5vdCBiZSBmb3VuZC5cbiAqICAgICBEZWZhdWx0cyB0byAnYmluYXJ5U2VhcmNoLkdSRUFURVNUX0xPV0VSX0JPVU5EJy5cbiAqL1xuZXhwb3J0cy5zZWFyY2ggPSBmdW5jdGlvbiBzZWFyY2goYU5lZWRsZSwgYUhheXN0YWNrLCBhQ29tcGFyZSwgYUJpYXMpIHtcbiAgaWYgKGFIYXlzdGFjay5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICB2YXIgaW5kZXggPSByZWN1cnNpdmVTZWFyY2goLTEsIGFIYXlzdGFjay5sZW5ndGgsIGFOZWVkbGUsIGFIYXlzdGFjayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFDb21wYXJlLCBhQmlhcyB8fCBleHBvcnRzLkdSRUFURVNUX0xPV0VSX0JPVU5EKTtcbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIC8vIFdlIGhhdmUgZm91bmQgZWl0aGVyIHRoZSBleGFjdCBlbGVtZW50LCBvciB0aGUgbmV4dC1jbG9zZXN0IGVsZW1lbnQgdGhhblxuICAvLyB0aGUgb25lIHdlIGFyZSBzZWFyY2hpbmcgZm9yLiBIb3dldmVyLCB0aGVyZSBtYXkgYmUgbW9yZSB0aGFuIG9uZSBzdWNoXG4gIC8vIGVsZW1lbnQuIE1ha2Ugc3VyZSB3ZSBhbHdheXMgcmV0dXJuIHRoZSBzbWFsbGVzdCBvZiB0aGVzZS5cbiAgd2hpbGUgKGluZGV4IC0gMSA+PSAwKSB7XG4gICAgaWYgKGFDb21wYXJlKGFIYXlzdGFja1tpbmRleF0sIGFIYXlzdGFja1tpbmRleCAtIDFdLCB0cnVlKSAhPT0gMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC0taW5kZXg7XG4gIH1cblxuICByZXR1cm4gaW5kZXg7XG59O1xuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xuLypcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcbiAqL1xuXG4vLyBJdCB0dXJucyBvdXQgdGhhdCBzb21lIChtb3N0PykgSmF2YVNjcmlwdCBlbmdpbmVzIGRvbid0IHNlbGYtaG9zdFxuLy8gYEFycmF5LnByb3RvdHlwZS5zb3J0YC4gVGhpcyBtYWtlcyBzZW5zZSBiZWNhdXNlIEMrKyB3aWxsIGxpa2VseSByZW1haW5cbi8vIGZhc3RlciB0aGFuIEpTIHdoZW4gZG9pbmcgcmF3IENQVS1pbnRlbnNpdmUgc29ydGluZy4gSG93ZXZlciwgd2hlbiB1c2luZyBhXG4vLyBjdXN0b20gY29tcGFyYXRvciBmdW5jdGlvbiwgY2FsbGluZyBiYWNrIGFuZCBmb3J0aCBiZXR3ZWVuIHRoZSBWTSdzIEMrKyBhbmRcbi8vIEpJVCdkIEpTIGlzIHJhdGhlciBzbG93ICphbmQqIGxvc2VzIEpJVCB0eXBlIGluZm9ybWF0aW9uLCByZXN1bHRpbmcgaW5cbi8vIHdvcnNlIGdlbmVyYXRlZCBjb2RlIGZvciB0aGUgY29tcGFyYXRvciBmdW5jdGlvbiB0aGFuIHdvdWxkIGJlIG9wdGltYWwuIEluXG4vLyBmYWN0LCB3aGVuIHNvcnRpbmcgd2l0aCBhIGNvbXBhcmF0b3IsIHRoZXNlIGNvc3RzIG91dHdlaWdoIHRoZSBiZW5lZml0cyBvZlxuLy8gc29ydGluZyBpbiBDKysuIEJ5IHVzaW5nIG91ciBvd24gSlMtaW1wbGVtZW50ZWQgUXVpY2sgU29ydCAoYmVsb3cpLCB3ZSBnZXRcbi8vIGEgfjM1MDBtcyBtZWFuIHNwZWVkLXVwIGluIGBiZW5jaC9iZW5jaC5odG1sYC5cblxuLyoqXG4gKiBTd2FwIHRoZSBlbGVtZW50cyBpbmRleGVkIGJ5IGB4YCBhbmQgYHlgIGluIHRoZSBhcnJheSBgYXJ5YC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnlcbiAqICAgICAgICBUaGUgYXJyYXkuXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogICAgICAgIFRoZSBpbmRleCBvZiB0aGUgZmlyc3QgaXRlbS5cbiAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gKiAgICAgICAgVGhlIGluZGV4IG9mIHRoZSBzZWNvbmQgaXRlbS5cbiAqL1xuZnVuY3Rpb24gc3dhcChhcnksIHgsIHkpIHtcbiAgdmFyIHRlbXAgPSBhcnlbeF07XG4gIGFyeVt4XSA9IGFyeVt5XTtcbiAgYXJ5W3ldID0gdGVtcDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgd2l0aGluIHRoZSByYW5nZSBgbG93IC4uIGhpZ2hgIGluY2x1c2l2ZS5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbG93XG4gKiAgICAgICAgVGhlIGxvd2VyIGJvdW5kIG9uIHRoZSByYW5nZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWdoXG4gKiAgICAgICAgVGhlIHVwcGVyIGJvdW5kIG9uIHRoZSByYW5nZS5cbiAqL1xuZnVuY3Rpb24gcmFuZG9tSW50SW5SYW5nZShsb3csIGhpZ2gpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQobG93ICsgKE1hdGgucmFuZG9tKCkgKiAoaGlnaCAtIGxvdykpKTtcbn1cblxuLyoqXG4gKiBUaGUgUXVpY2sgU29ydCBhbGdvcml0aG0uXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJ5XG4gKiAgICAgICAgQW4gYXJyYXkgdG8gc29ydC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbXBhcmF0b3JcbiAqICAgICAgICBGdW5jdGlvbiB0byB1c2UgdG8gY29tcGFyZSB0d28gaXRlbXMuXG4gKiBAcGFyYW0ge051bWJlcn0gcFxuICogICAgICAgIFN0YXJ0IGluZGV4IG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IHJcbiAqICAgICAgICBFbmQgaW5kZXggb2YgdGhlIGFycmF5XG4gKi9cbmZ1bmN0aW9uIGRvUXVpY2tTb3J0KGFyeSwgY29tcGFyYXRvciwgcCwgcikge1xuICAvLyBJZiBvdXIgbG93ZXIgYm91bmQgaXMgbGVzcyB0aGFuIG91ciB1cHBlciBib3VuZCwgd2UgKDEpIHBhcnRpdGlvbiB0aGVcbiAgLy8gYXJyYXkgaW50byB0d28gcGllY2VzIGFuZCAoMikgcmVjdXJzZSBvbiBlYWNoIGhhbGYuIElmIGl0IGlzIG5vdCwgdGhpcyBpc1xuICAvLyB0aGUgZW1wdHkgYXJyYXkgYW5kIG91ciBiYXNlIGNhc2UuXG5cbiAgaWYgKHAgPCByKSB7XG4gICAgLy8gKDEpIFBhcnRpdGlvbmluZy5cbiAgICAvL1xuICAgIC8vIFRoZSBwYXJ0aXRpb25pbmcgY2hvb3NlcyBhIHBpdm90IGJldHdlZW4gYHBgIGFuZCBgcmAgYW5kIG1vdmVzIGFsbFxuICAgIC8vIGVsZW1lbnRzIHRoYXQgYXJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgcGl2b3QgdG8gdGhlIGJlZm9yZSBpdCwgYW5kXG4gICAgLy8gYWxsIHRoZSBlbGVtZW50cyB0aGF0IGFyZSBncmVhdGVyIHRoYW4gaXQgYWZ0ZXIgaXQuIFRoZSBlZmZlY3QgaXMgdGhhdFxuICAgIC8vIG9uY2UgcGFydGl0aW9uIGlzIGRvbmUsIHRoZSBwaXZvdCBpcyBpbiB0aGUgZXhhY3QgcGxhY2UgaXQgd2lsbCBiZSB3aGVuXG4gICAgLy8gdGhlIGFycmF5IGlzIHB1dCBpbiBzb3J0ZWQgb3JkZXIsIGFuZCBpdCB3aWxsIG5vdCBuZWVkIHRvIGJlIG1vdmVkXG4gICAgLy8gYWdhaW4uIFRoaXMgcnVucyBpbiBPKG4pIHRpbWUuXG5cbiAgICAvLyBBbHdheXMgY2hvb3NlIGEgcmFuZG9tIHBpdm90IHNvIHRoYXQgYW4gaW5wdXQgYXJyYXkgd2hpY2ggaXMgcmV2ZXJzZVxuICAgIC8vIHNvcnRlZCBkb2VzIG5vdCBjYXVzZSBPKG5eMikgcnVubmluZyB0aW1lLlxuICAgIHZhciBwaXZvdEluZGV4ID0gcmFuZG9tSW50SW5SYW5nZShwLCByKTtcbiAgICB2YXIgaSA9IHAgLSAxO1xuXG4gICAgc3dhcChhcnksIHBpdm90SW5kZXgsIHIpO1xuICAgIHZhciBwaXZvdCA9IGFyeVtyXTtcblxuICAgIC8vIEltbWVkaWF0ZWx5IGFmdGVyIGBqYCBpcyBpbmNyZW1lbnRlZCBpbiB0aGlzIGxvb3AsIHRoZSBmb2xsb3dpbmcgaG9sZFxuICAgIC8vIHRydWU6XG4gICAgLy9cbiAgICAvLyAgICogRXZlcnkgZWxlbWVudCBpbiBgYXJ5W3AgLi4gaV1gIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgcGl2b3QuXG4gICAgLy9cbiAgICAvLyAgICogRXZlcnkgZWxlbWVudCBpbiBgYXJ5W2krMSAuLiBqLTFdYCBpcyBncmVhdGVyIHRoYW4gdGhlIHBpdm90LlxuICAgIGZvciAodmFyIGogPSBwOyBqIDwgcjsgaisrKSB7XG4gICAgICBpZiAoY29tcGFyYXRvcihhcnlbal0sIHBpdm90KSA8PSAwKSB7XG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgc3dhcChhcnksIGksIGopO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN3YXAoYXJ5LCBpICsgMSwgaik7XG4gICAgdmFyIHEgPSBpICsgMTtcblxuICAgIC8vICgyKSBSZWN1cnNlIG9uIGVhY2ggaGFsZi5cblxuICAgIGRvUXVpY2tTb3J0KGFyeSwgY29tcGFyYXRvciwgcCwgcSAtIDEpO1xuICAgIGRvUXVpY2tTb3J0KGFyeSwgY29tcGFyYXRvciwgcSArIDEsIHIpO1xuICB9XG59XG5cbi8qKlxuICogU29ydCB0aGUgZ2l2ZW4gYXJyYXkgaW4tcGxhY2Ugd2l0aCB0aGUgZ2l2ZW4gY29tcGFyYXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnlcbiAqICAgICAgICBBbiBhcnJheSB0byBzb3J0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29tcGFyYXRvclxuICogICAgICAgIEZ1bmN0aW9uIHRvIHVzZSB0byBjb21wYXJlIHR3byBpdGVtcy5cbiAqL1xuZXhwb3J0cy5xdWlja1NvcnQgPSBmdW5jdGlvbiAoYXJ5LCBjb21wYXJhdG9yKSB7XG4gIGRvUXVpY2tTb3J0KGFyeSwgY29tcGFyYXRvciwgMCwgYXJ5Lmxlbmd0aCAtIDEpO1xufTtcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cbi8qXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXG4gKi9cblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBiaW5hcnlTZWFyY2ggPSByZXF1aXJlKCcuL2JpbmFyeS1zZWFyY2gnKTtcbnZhciBBcnJheVNldCA9IHJlcXVpcmUoJy4vYXJyYXktc2V0JykuQXJyYXlTZXQ7XG52YXIgYmFzZTY0VkxRID0gcmVxdWlyZSgnLi9iYXNlNjQtdmxxJyk7XG52YXIgcXVpY2tTb3J0ID0gcmVxdWlyZSgnLi9xdWljay1zb3J0JykucXVpY2tTb3J0O1xuXG5mdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcihhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKSB7XG4gIHZhciBzb3VyY2VNYXAgPSBhU291cmNlTWFwO1xuICBpZiAodHlwZW9mIGFTb3VyY2VNYXAgPT09ICdzdHJpbmcnKSB7XG4gICAgc291cmNlTWFwID0gdXRpbC5wYXJzZVNvdXJjZU1hcElucHV0KGFTb3VyY2VNYXApO1xuICB9XG5cbiAgcmV0dXJuIHNvdXJjZU1hcC5zZWN0aW9ucyAhPSBudWxsXG4gICAgPyBuZXcgSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyKHNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTClcbiAgICA6IG5ldyBCYXNpY1NvdXJjZU1hcENvbnN1bWVyKHNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTCk7XG59XG5cblNvdXJjZU1hcENvbnN1bWVyLmZyb21Tb3VyY2VNYXAgPSBmdW5jdGlvbihhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKSB7XG4gIHJldHVybiBCYXNpY1NvdXJjZU1hcENvbnN1bWVyLmZyb21Tb3VyY2VNYXAoYVNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTCk7XG59XG5cbi8qKlxuICogVGhlIHZlcnNpb24gb2YgdGhlIHNvdXJjZSBtYXBwaW5nIHNwZWMgdGhhdCB3ZSBhcmUgY29uc3VtaW5nLlxuICovXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3ZlcnNpb24gPSAzO1xuXG4vLyBgX19nZW5lcmF0ZWRNYXBwaW5nc2AgYW5kIGBfX29yaWdpbmFsTWFwcGluZ3NgIGFyZSBhcnJheXMgdGhhdCBob2xkIHRoZVxuLy8gcGFyc2VkIG1hcHBpbmcgY29vcmRpbmF0ZXMgZnJvbSB0aGUgc291cmNlIG1hcCdzIFwibWFwcGluZ3NcIiBhdHRyaWJ1dGUuIFRoZXlcbi8vIGFyZSBsYXppbHkgaW5zdGFudGlhdGVkLCBhY2Nlc3NlZCB2aWEgdGhlIGBfZ2VuZXJhdGVkTWFwcGluZ3NgIGFuZFxuLy8gYF9vcmlnaW5hbE1hcHBpbmdzYCBnZXR0ZXJzIHJlc3BlY3RpdmVseSwgYW5kIHdlIG9ubHkgcGFyc2UgdGhlIG1hcHBpbmdzXG4vLyBhbmQgY3JlYXRlIHRoZXNlIGFycmF5cyBvbmNlIHF1ZXJpZWQgZm9yIGEgc291cmNlIGxvY2F0aW9uLiBXZSBqdW1wIHRocm91Z2hcbi8vIHRoZXNlIGhvb3BzIGJlY2F1c2UgdGhlcmUgY2FuIGJlIG1hbnkgdGhvdXNhbmRzIG9mIG1hcHBpbmdzLCBhbmQgcGFyc2luZ1xuLy8gdGhlbSBpcyBleHBlbnNpdmUsIHNvIHdlIG9ubHkgd2FudCB0byBkbyBpdCBpZiB3ZSBtdXN0LlxuLy9cbi8vIEVhY2ggb2JqZWN0IGluIHRoZSBhcnJheXMgaXMgb2YgdGhlIGZvcm06XG4vL1xuLy8gICAgIHtcbi8vICAgICAgIGdlbmVyYXRlZExpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIGNvZGUsXG4vLyAgICAgICBnZW5lcmF0ZWRDb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgY29kZSxcbi8vICAgICAgIHNvdXJjZTogVGhlIHBhdGggdG8gdGhlIG9yaWdpbmFsIHNvdXJjZSBmaWxlIHRoYXQgZ2VuZXJhdGVkIHRoaXNcbi8vICAgICAgICAgICAgICAgY2h1bmsgb2YgY29kZSxcbi8vICAgICAgIG9yaWdpbmFsTGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UgdGhhdFxuLy8gICAgICAgICAgICAgICAgICAgICBjb3JyZXNwb25kcyB0byB0aGlzIGNodW5rIG9mIGdlbmVyYXRlZCBjb2RlLFxuLy8gICAgICAgb3JpZ2luYWxDb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UgdGhhdFxuLy8gICAgICAgICAgICAgICAgICAgICAgIGNvcnJlc3BvbmRzIHRvIHRoaXMgY2h1bmsgb2YgZ2VuZXJhdGVkIGNvZGUsXG4vLyAgICAgICBuYW1lOiBUaGUgbmFtZSBvZiB0aGUgb3JpZ2luYWwgc3ltYm9sIHdoaWNoIGdlbmVyYXRlZCB0aGlzIGNodW5rIG9mXG4vLyAgICAgICAgICAgICBjb2RlLlxuLy8gICAgIH1cbi8vXG4vLyBBbGwgcHJvcGVydGllcyBleGNlcHQgZm9yIGBnZW5lcmF0ZWRMaW5lYCBhbmQgYGdlbmVyYXRlZENvbHVtbmAgY2FuIGJlXG4vLyBgbnVsbGAuXG4vL1xuLy8gYF9nZW5lcmF0ZWRNYXBwaW5nc2AgaXMgb3JkZXJlZCBieSB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9ucy5cbi8vXG4vLyBgX29yaWdpbmFsTWFwcGluZ3NgIGlzIG9yZGVyZWQgYnkgdGhlIG9yaWdpbmFsIHBvc2l0aW9ucy5cblxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9fZ2VuZXJhdGVkTWFwcGluZ3MgPSBudWxsO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSwgJ19nZW5lcmF0ZWRNYXBwaW5ncycsIHtcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX19nZW5lcmF0ZWRNYXBwaW5ncykge1xuICAgICAgdGhpcy5fcGFyc2VNYXBwaW5ncyh0aGlzLl9tYXBwaW5ncywgdGhpcy5zb3VyY2VSb290KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzO1xuICB9XG59KTtcblxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9fb3JpZ2luYWxNYXBwaW5ncyA9IG51bGw7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLCAnX29yaWdpbmFsTWFwcGluZ3MnLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLl9fb3JpZ2luYWxNYXBwaW5ncykge1xuICAgICAgdGhpcy5fcGFyc2VNYXBwaW5ncyh0aGlzLl9tYXBwaW5ncywgdGhpcy5zb3VyY2VSb290KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fX29yaWdpbmFsTWFwcGluZ3M7XG4gIH1cbn0pO1xuXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX2NoYXJJc01hcHBpbmdTZXBhcmF0b3IgPVxuICBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9jaGFySXNNYXBwaW5nU2VwYXJhdG9yKGFTdHIsIGluZGV4KSB7XG4gICAgdmFyIGMgPSBhU3RyLmNoYXJBdChpbmRleCk7XG4gICAgcmV0dXJuIGMgPT09IFwiO1wiIHx8IGMgPT09IFwiLFwiO1xuICB9O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBtYXBwaW5ncyBpbiBhIHN0cmluZyBpbiB0byBhIGRhdGEgc3RydWN0dXJlIHdoaWNoIHdlIGNhbiBlYXNpbHlcbiAqIHF1ZXJ5ICh0aGUgb3JkZXJlZCBhcnJheXMgaW4gdGhlIGB0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3NgIGFuZFxuICogYHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzYCBwcm9wZXJ0aWVzKS5cbiAqL1xuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9wYXJzZU1hcHBpbmdzID1cbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfcGFyc2VNYXBwaW5ncyhhU3RyLCBhU291cmNlUm9vdCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlN1YmNsYXNzZXMgbXVzdCBpbXBsZW1lbnQgX3BhcnNlTWFwcGluZ3NcIik7XG4gIH07XG5cblNvdXJjZU1hcENvbnN1bWVyLkdFTkVSQVRFRF9PUkRFUiA9IDE7XG5Tb3VyY2VNYXBDb25zdW1lci5PUklHSU5BTF9PUkRFUiA9IDI7XG5cblNvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EID0gMTtcblNvdXJjZU1hcENvbnN1bWVyLkxFQVNUX1VQUEVSX0JPVU5EID0gMjtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgZWFjaCBtYXBwaW5nIGJldHdlZW4gYW4gb3JpZ2luYWwgc291cmNlL2xpbmUvY29sdW1uIGFuZCBhXG4gKiBnZW5lcmF0ZWQgbGluZS9jb2x1bW4gaW4gdGhpcyBzb3VyY2UgbWFwLlxuICpcbiAqIEBwYXJhbSBGdW5jdGlvbiBhQ2FsbGJhY2tcbiAqICAgICAgICBUaGUgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2l0aCBlYWNoIG1hcHBpbmcuXG4gKiBAcGFyYW0gT2JqZWN0IGFDb250ZXh0XG4gKiAgICAgICAgT3B0aW9uYWwuIElmIHNwZWNpZmllZCwgdGhpcyBvYmplY3Qgd2lsbCBiZSB0aGUgdmFsdWUgb2YgYHRoaXNgIGV2ZXJ5XG4gKiAgICAgICAgdGltZSB0aGF0IGBhQ2FsbGJhY2tgIGlzIGNhbGxlZC5cbiAqIEBwYXJhbSBhT3JkZXJcbiAqICAgICAgICBFaXRoZXIgYFNvdXJjZU1hcENvbnN1bWVyLkdFTkVSQVRFRF9PUkRFUmAgb3JcbiAqICAgICAgICBgU291cmNlTWFwQ29uc3VtZXIuT1JJR0lOQUxfT1JERVJgLiBTcGVjaWZpZXMgd2hldGhlciB5b3Ugd2FudCB0b1xuICogICAgICAgIGl0ZXJhdGUgb3ZlciB0aGUgbWFwcGluZ3Mgc29ydGVkIGJ5IHRoZSBnZW5lcmF0ZWQgZmlsZSdzIGxpbmUvY29sdW1uXG4gKiAgICAgICAgb3JkZXIgb3IgdGhlIG9yaWdpbmFsJ3Mgc291cmNlL2xpbmUvY29sdW1uIG9yZGVyLCByZXNwZWN0aXZlbHkuIERlZmF1bHRzIHRvXG4gKiAgICAgICAgYFNvdXJjZU1hcENvbnN1bWVyLkdFTkVSQVRFRF9PUkRFUmAuXG4gKi9cblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5lYWNoTWFwcGluZyA9XG4gIGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX2VhY2hNYXBwaW5nKGFDYWxsYmFjaywgYUNvbnRleHQsIGFPcmRlcikge1xuICAgIHZhciBjb250ZXh0ID0gYUNvbnRleHQgfHwgbnVsbDtcbiAgICB2YXIgb3JkZXIgPSBhT3JkZXIgfHwgU291cmNlTWFwQ29uc3VtZXIuR0VORVJBVEVEX09SREVSO1xuXG4gICAgdmFyIG1hcHBpbmdzO1xuICAgIHN3aXRjaCAob3JkZXIpIHtcbiAgICBjYXNlIFNvdXJjZU1hcENvbnN1bWVyLkdFTkVSQVRFRF9PUkRFUjpcbiAgICAgIG1hcHBpbmdzID0gdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3M7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFNvdXJjZU1hcENvbnN1bWVyLk9SSUdJTkFMX09SREVSOlxuICAgICAgbWFwcGluZ3MgPSB0aGlzLl9vcmlnaW5hbE1hcHBpbmdzO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gb3JkZXIgb2YgaXRlcmF0aW9uLlwiKTtcbiAgICB9XG5cbiAgICB2YXIgc291cmNlUm9vdCA9IHRoaXMuc291cmNlUm9vdDtcbiAgICBtYXBwaW5ncy5tYXAoZnVuY3Rpb24gKG1hcHBpbmcpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBtYXBwaW5nLnNvdXJjZSA9PT0gbnVsbCA/IG51bGwgOiB0aGlzLl9zb3VyY2VzLmF0KG1hcHBpbmcuc291cmNlKTtcbiAgICAgIHNvdXJjZSA9IHV0aWwuY29tcHV0ZVNvdXJjZVVSTChzb3VyY2VSb290LCBzb3VyY2UsIHRoaXMuX3NvdXJjZU1hcFVSTCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgZ2VuZXJhdGVkTGluZTogbWFwcGluZy5nZW5lcmF0ZWRMaW5lLFxuICAgICAgICBnZW5lcmF0ZWRDb2x1bW46IG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uLFxuICAgICAgICBvcmlnaW5hbExpbmU6IG1hcHBpbmcub3JpZ2luYWxMaW5lLFxuICAgICAgICBvcmlnaW5hbENvbHVtbjogbWFwcGluZy5vcmlnaW5hbENvbHVtbixcbiAgICAgICAgbmFtZTogbWFwcGluZy5uYW1lID09PSBudWxsID8gbnVsbCA6IHRoaXMuX25hbWVzLmF0KG1hcHBpbmcubmFtZSlcbiAgICAgIH07XG4gICAgfSwgdGhpcykuZm9yRWFjaChhQ2FsbGJhY2ssIGNvbnRleHQpO1xuICB9O1xuXG4vKipcbiAqIFJldHVybnMgYWxsIGdlbmVyYXRlZCBsaW5lIGFuZCBjb2x1bW4gaW5mb3JtYXRpb24gZm9yIHRoZSBvcmlnaW5hbCBzb3VyY2UsXG4gKiBsaW5lLCBhbmQgY29sdW1uIHByb3ZpZGVkLiBJZiBubyBjb2x1bW4gaXMgcHJvdmlkZWQsIHJldHVybnMgYWxsIG1hcHBpbmdzXG4gKiBjb3JyZXNwb25kaW5nIHRvIGEgZWl0aGVyIHRoZSBsaW5lIHdlIGFyZSBzZWFyY2hpbmcgZm9yIG9yIHRoZSBuZXh0XG4gKiBjbG9zZXN0IGxpbmUgdGhhdCBoYXMgYW55IG1hcHBpbmdzLiBPdGhlcndpc2UsIHJldHVybnMgYWxsIG1hcHBpbmdzXG4gKiBjb3JyZXNwb25kaW5nIHRvIHRoZSBnaXZlbiBsaW5lIGFuZCBlaXRoZXIgdGhlIGNvbHVtbiB3ZSBhcmUgc2VhcmNoaW5nIGZvclxuICogb3IgdGhlIG5leHQgY2xvc2VzdCBjb2x1bW4gdGhhdCBoYXMgYW55IG9mZnNldHMuXG4gKlxuICogVGhlIG9ubHkgYXJndW1lbnQgaXMgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBzb3VyY2U6IFRoZSBmaWxlbmFtZSBvZiB0aGUgb3JpZ2luYWwgc291cmNlLlxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLiAgVGhlIGxpbmUgbnVtYmVyIGlzIDEtYmFzZWQuXG4gKiAgIC0gY29sdW1uOiBPcHRpb25hbC4gdGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS5cbiAqICAgIFRoZSBjb2x1bW4gbnVtYmVyIGlzIDAtYmFzZWQuXG4gKlxuICogYW5kIGFuIGFycmF5IG9mIG9iamVjdHMgaXMgcmV0dXJuZWQsIGVhY2ggd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKlxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxuICogICAgbGluZSBudW1iZXIgaXMgMS1iYXNlZC5cbiAqICAgLSBjb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLCBvciBudWxsLlxuICogICAgVGhlIGNvbHVtbiBudW1iZXIgaXMgMC1iYXNlZC5cbiAqL1xuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmFsbEdlbmVyYXRlZFBvc2l0aW9uc0ZvciA9XG4gIGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX2FsbEdlbmVyYXRlZFBvc2l0aW9uc0ZvcihhQXJncykge1xuICAgIHZhciBsaW5lID0gdXRpbC5nZXRBcmcoYUFyZ3MsICdsaW5lJyk7XG5cbiAgICAvLyBXaGVuIHRoZXJlIGlzIG5vIGV4YWN0IG1hdGNoLCBCYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fZmluZE1hcHBpbmdcbiAgICAvLyByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgY2xvc2VzdCBtYXBwaW5nIGxlc3MgdGhhbiB0aGUgbmVlZGxlLiBCeVxuICAgIC8vIHNldHRpbmcgbmVlZGxlLm9yaWdpbmFsQ29sdW1uIHRvIDAsIHdlIHRodXMgZmluZCB0aGUgbGFzdCBtYXBwaW5nIGZvclxuICAgIC8vIHRoZSBnaXZlbiBsaW5lLCBwcm92aWRlZCBzdWNoIGEgbWFwcGluZyBleGlzdHMuXG4gICAgdmFyIG5lZWRsZSA9IHtcbiAgICAgIHNvdXJjZTogdXRpbC5nZXRBcmcoYUFyZ3MsICdzb3VyY2UnKSxcbiAgICAgIG9yaWdpbmFsTGluZTogbGluZSxcbiAgICAgIG9yaWdpbmFsQ29sdW1uOiB1dGlsLmdldEFyZyhhQXJncywgJ2NvbHVtbicsIDApXG4gICAgfTtcblxuICAgIG5lZWRsZS5zb3VyY2UgPSB0aGlzLl9maW5kU291cmNlSW5kZXgobmVlZGxlLnNvdXJjZSk7XG4gICAgaWYgKG5lZWRsZS5zb3VyY2UgPCAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgdmFyIG1hcHBpbmdzID0gW107XG5cbiAgICB2YXIgaW5kZXggPSB0aGlzLl9maW5kTWFwcGluZyhuZWVkbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxNYXBwaW5ncyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9yaWdpbmFsTGluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib3JpZ2luYWxDb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLmNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeVNlYXJjaC5MRUFTVF9VUFBFUl9CT1VORCk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHZhciBtYXBwaW5nID0gdGhpcy5fb3JpZ2luYWxNYXBwaW5nc1tpbmRleF07XG5cbiAgICAgIGlmIChhQXJncy5jb2x1bW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgb3JpZ2luYWxMaW5lID0gbWFwcGluZy5vcmlnaW5hbExpbmU7XG5cbiAgICAgICAgLy8gSXRlcmF0ZSB1bnRpbCBlaXRoZXIgd2UgcnVuIG91dCBvZiBtYXBwaW5ncywgb3Igd2UgcnVuIGludG9cbiAgICAgICAgLy8gYSBtYXBwaW5nIGZvciBhIGRpZmZlcmVudCBsaW5lIHRoYW4gdGhlIG9uZSB3ZSBmb3VuZC4gU2luY2VcbiAgICAgICAgLy8gbWFwcGluZ3MgYXJlIHNvcnRlZCwgdGhpcyBpcyBndWFyYW50ZWVkIHRvIGZpbmQgYWxsIG1hcHBpbmdzIGZvclxuICAgICAgICAvLyB0aGUgbGluZSB3ZSBmb3VuZC5cbiAgICAgICAgd2hpbGUgKG1hcHBpbmcgJiYgbWFwcGluZy5vcmlnaW5hbExpbmUgPT09IG9yaWdpbmFsTGluZSkge1xuICAgICAgICAgIG1hcHBpbmdzLnB1c2goe1xuICAgICAgICAgICAgbGluZTogdXRpbC5nZXRBcmcobWFwcGluZywgJ2dlbmVyYXRlZExpbmUnLCBudWxsKSxcbiAgICAgICAgICAgIGNvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgJ2dlbmVyYXRlZENvbHVtbicsIG51bGwpLFxuICAgICAgICAgICAgbGFzdENvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgJ2xhc3RHZW5lcmF0ZWRDb2x1bW4nLCBudWxsKVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgbWFwcGluZyA9IHRoaXMuX29yaWdpbmFsTWFwcGluZ3NbKytpbmRleF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBvcmlnaW5hbENvbHVtbiA9IG1hcHBpbmcub3JpZ2luYWxDb2x1bW47XG5cbiAgICAgICAgLy8gSXRlcmF0ZSB1bnRpbCBlaXRoZXIgd2UgcnVuIG91dCBvZiBtYXBwaW5ncywgb3Igd2UgcnVuIGludG9cbiAgICAgICAgLy8gYSBtYXBwaW5nIGZvciBhIGRpZmZlcmVudCBsaW5lIHRoYW4gdGhlIG9uZSB3ZSB3ZXJlIHNlYXJjaGluZyBmb3IuXG4gICAgICAgIC8vIFNpbmNlIG1hcHBpbmdzIGFyZSBzb3J0ZWQsIHRoaXMgaXMgZ3VhcmFudGVlZCB0byBmaW5kIGFsbCBtYXBwaW5ncyBmb3JcbiAgICAgICAgLy8gdGhlIGxpbmUgd2UgYXJlIHNlYXJjaGluZyBmb3IuXG4gICAgICAgIHdoaWxlIChtYXBwaW5nICYmXG4gICAgICAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsTGluZSA9PT0gbGluZSAmJlxuICAgICAgICAgICAgICAgbWFwcGluZy5vcmlnaW5hbENvbHVtbiA9PSBvcmlnaW5hbENvbHVtbikge1xuICAgICAgICAgIG1hcHBpbmdzLnB1c2goe1xuICAgICAgICAgICAgbGluZTogdXRpbC5nZXRBcmcobWFwcGluZywgJ2dlbmVyYXRlZExpbmUnLCBudWxsKSxcbiAgICAgICAgICAgIGNvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgJ2dlbmVyYXRlZENvbHVtbicsIG51bGwpLFxuICAgICAgICAgICAgbGFzdENvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgJ2xhc3RHZW5lcmF0ZWRDb2x1bW4nLCBudWxsKVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgbWFwcGluZyA9IHRoaXMuX29yaWdpbmFsTWFwcGluZ3NbKytpbmRleF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFwcGluZ3M7XG4gIH07XG5cbmV4cG9ydHMuU291cmNlTWFwQ29uc3VtZXIgPSBTb3VyY2VNYXBDb25zdW1lcjtcblxuLyoqXG4gKiBBIEJhc2ljU291cmNlTWFwQ29uc3VtZXIgaW5zdGFuY2UgcmVwcmVzZW50cyBhIHBhcnNlZCBzb3VyY2UgbWFwIHdoaWNoIHdlIGNhblxuICogcXVlcnkgZm9yIGluZm9ybWF0aW9uIGFib3V0IHRoZSBvcmlnaW5hbCBmaWxlIHBvc2l0aW9ucyBieSBnaXZpbmcgaXQgYSBmaWxlXG4gKiBwb3NpdGlvbiBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZS5cbiAqXG4gKiBUaGUgZmlyc3QgcGFyYW1ldGVyIGlzIHRoZSByYXcgc291cmNlIG1hcCAoZWl0aGVyIGFzIGEgSlNPTiBzdHJpbmcsIG9yXG4gKiBhbHJlYWR5IHBhcnNlZCB0byBhbiBvYmplY3QpLiBBY2NvcmRpbmcgdG8gdGhlIHNwZWMsIHNvdXJjZSBtYXBzIGhhdmUgdGhlXG4gKiBmb2xsb3dpbmcgYXR0cmlidXRlczpcbiAqXG4gKiAgIC0gdmVyc2lvbjogV2hpY2ggdmVyc2lvbiBvZiB0aGUgc291cmNlIG1hcCBzcGVjIHRoaXMgbWFwIGlzIGZvbGxvd2luZy5cbiAqICAgLSBzb3VyY2VzOiBBbiBhcnJheSBvZiBVUkxzIHRvIHRoZSBvcmlnaW5hbCBzb3VyY2UgZmlsZXMuXG4gKiAgIC0gbmFtZXM6IEFuIGFycmF5IG9mIGlkZW50aWZpZXJzIHdoaWNoIGNhbiBiZSByZWZlcnJlbmNlZCBieSBpbmRpdmlkdWFsIG1hcHBpbmdzLlxuICogICAtIHNvdXJjZVJvb3Q6IE9wdGlvbmFsLiBUaGUgVVJMIHJvb3QgZnJvbSB3aGljaCBhbGwgc291cmNlcyBhcmUgcmVsYXRpdmUuXG4gKiAgIC0gc291cmNlc0NvbnRlbnQ6IE9wdGlvbmFsLiBBbiBhcnJheSBvZiBjb250ZW50cyBvZiB0aGUgb3JpZ2luYWwgc291cmNlIGZpbGVzLlxuICogICAtIG1hcHBpbmdzOiBBIHN0cmluZyBvZiBiYXNlNjQgVkxRcyB3aGljaCBjb250YWluIHRoZSBhY3R1YWwgbWFwcGluZ3MuXG4gKiAgIC0gZmlsZTogT3B0aW9uYWwuIFRoZSBnZW5lcmF0ZWQgZmlsZSB0aGlzIHNvdXJjZSBtYXAgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEhlcmUgaXMgYW4gZXhhbXBsZSBzb3VyY2UgbWFwLCB0YWtlbiBmcm9tIHRoZSBzb3VyY2UgbWFwIHNwZWNbMF06XG4gKlxuICogICAgIHtcbiAqICAgICAgIHZlcnNpb24gOiAzLFxuICogICAgICAgZmlsZTogXCJvdXQuanNcIixcbiAqICAgICAgIHNvdXJjZVJvb3QgOiBcIlwiLFxuICogICAgICAgc291cmNlczogW1wiZm9vLmpzXCIsIFwiYmFyLmpzXCJdLFxuICogICAgICAgbmFtZXM6IFtcInNyY1wiLCBcIm1hcHNcIiwgXCJhcmVcIiwgXCJmdW5cIl0sXG4gKiAgICAgICBtYXBwaW5nczogXCJBQSxBQjs7QUJDREU7XCJcbiAqICAgICB9XG4gKlxuICogVGhlIHNlY29uZCBwYXJhbWV0ZXIsIGlmIGdpdmVuLCBpcyBhIHN0cmluZyB3aG9zZSB2YWx1ZSBpcyB0aGUgVVJMXG4gKiBhdCB3aGljaCB0aGUgc291cmNlIG1hcCB3YXMgZm91bmQuICBUaGlzIFVSTCBpcyB1c2VkIHRvIGNvbXB1dGUgdGhlXG4gKiBzb3VyY2VzIGFycmF5LlxuICpcbiAqIFswXTogaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xVTFSR0FlaFF3UnlwVVRvdkYxS1JscGlPRnplMGItXzJnYzZmQUgwS1kway9lZGl0P3BsaT0xI1xuICovXG5mdW5jdGlvbiBCYXNpY1NvdXJjZU1hcENvbnN1bWVyKGFTb3VyY2VNYXAsIGFTb3VyY2VNYXBVUkwpIHtcbiAgdmFyIHNvdXJjZU1hcCA9IGFTb3VyY2VNYXA7XG4gIGlmICh0eXBlb2YgYVNvdXJjZU1hcCA9PT0gJ3N0cmluZycpIHtcbiAgICBzb3VyY2VNYXAgPSB1dGlsLnBhcnNlU291cmNlTWFwSW5wdXQoYVNvdXJjZU1hcCk7XG4gIH1cblxuICB2YXIgdmVyc2lvbiA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgJ3ZlcnNpb24nKTtcbiAgdmFyIHNvdXJjZXMgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsICdzb3VyY2VzJyk7XG4gIC8vIFNhc3MgMy4zIGxlYXZlcyBvdXQgdGhlICduYW1lcycgYXJyYXksIHNvIHdlIGRldmlhdGUgZnJvbSB0aGUgc3BlYyAod2hpY2hcbiAgLy8gcmVxdWlyZXMgdGhlIGFycmF5KSB0byBwbGF5IG5pY2UgaGVyZS5cbiAgdmFyIG5hbWVzID0gdXRpbC5nZXRBcmcoc291cmNlTWFwLCAnbmFtZXMnLCBbXSk7XG4gIHZhciBzb3VyY2VSb290ID0gdXRpbC5nZXRBcmcoc291cmNlTWFwLCAnc291cmNlUm9vdCcsIG51bGwpO1xuICB2YXIgc291cmNlc0NvbnRlbnQgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsICdzb3VyY2VzQ29udGVudCcsIG51bGwpO1xuICB2YXIgbWFwcGluZ3MgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsICdtYXBwaW5ncycpO1xuICB2YXIgZmlsZSA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgJ2ZpbGUnLCBudWxsKTtcblxuICAvLyBPbmNlIGFnYWluLCBTYXNzIGRldmlhdGVzIGZyb20gdGhlIHNwZWMgYW5kIHN1cHBsaWVzIHRoZSB2ZXJzaW9uIGFzIGFcbiAgLy8gc3RyaW5nIHJhdGhlciB0aGFuIGEgbnVtYmVyLCBzbyB3ZSB1c2UgbG9vc2UgZXF1YWxpdHkgY2hlY2tpbmcgaGVyZS5cbiAgaWYgKHZlcnNpb24gIT0gdGhpcy5fdmVyc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgdmVyc2lvbjogJyArIHZlcnNpb24pO1xuICB9XG5cbiAgaWYgKHNvdXJjZVJvb3QpIHtcbiAgICBzb3VyY2VSb290ID0gdXRpbC5ub3JtYWxpemUoc291cmNlUm9vdCk7XG4gIH1cblxuICBzb3VyY2VzID0gc291cmNlc1xuICAgIC5tYXAoU3RyaW5nKVxuICAgIC8vIFNvbWUgc291cmNlIG1hcHMgcHJvZHVjZSByZWxhdGl2ZSBzb3VyY2UgcGF0aHMgbGlrZSBcIi4vZm9vLmpzXCIgaW5zdGVhZCBvZlxuICAgIC8vIFwiZm9vLmpzXCIuICBOb3JtYWxpemUgdGhlc2UgZmlyc3Qgc28gdGhhdCBmdXR1cmUgY29tcGFyaXNvbnMgd2lsbCBzdWNjZWVkLlxuICAgIC8vIFNlZSBidWd6aWwubGEvMTA5MDc2OC5cbiAgICAubWFwKHV0aWwubm9ybWFsaXplKVxuICAgIC8vIEFsd2F5cyBlbnN1cmUgdGhhdCBhYnNvbHV0ZSBzb3VyY2VzIGFyZSBpbnRlcm5hbGx5IHN0b3JlZCByZWxhdGl2ZSB0b1xuICAgIC8vIHRoZSBzb3VyY2Ugcm9vdCwgaWYgdGhlIHNvdXJjZSByb290IGlzIGFic29sdXRlLiBOb3QgZG9pbmcgdGhpcyB3b3VsZFxuICAgIC8vIGJlIHBhcnRpY3VsYXJseSBwcm9ibGVtYXRpYyB3aGVuIHRoZSBzb3VyY2Ugcm9vdCBpcyBhIHByZWZpeCBvZiB0aGVcbiAgICAvLyBzb3VyY2UgKHZhbGlkLCBidXQgd2h5Pz8pLiBTZWUgZ2l0aHViIGlzc3VlICMxOTkgYW5kIGJ1Z3ppbC5sYS8xMTg4OTgyLlxuICAgIC5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIHNvdXJjZVJvb3QgJiYgdXRpbC5pc0Fic29sdXRlKHNvdXJjZVJvb3QpICYmIHV0aWwuaXNBYnNvbHV0ZShzb3VyY2UpXG4gICAgICAgID8gdXRpbC5yZWxhdGl2ZShzb3VyY2VSb290LCBzb3VyY2UpXG4gICAgICAgIDogc291cmNlO1xuICAgIH0pO1xuXG4gIC8vIFBhc3MgYHRydWVgIGJlbG93IHRvIGFsbG93IGR1cGxpY2F0ZSBuYW1lcyBhbmQgc291cmNlcy4gV2hpbGUgc291cmNlIG1hcHNcbiAgLy8gYXJlIGludGVuZGVkIHRvIGJlIGNvbXByZXNzZWQgYW5kIGRlZHVwbGljYXRlZCwgdGhlIFR5cGVTY3JpcHQgY29tcGlsZXJcbiAgLy8gc29tZXRpbWVzIGdlbmVyYXRlcyBzb3VyY2UgbWFwcyB3aXRoIGR1cGxpY2F0ZXMgaW4gdGhlbS4gU2VlIEdpdGh1YiBpc3N1ZVxuICAvLyAjNzIgYW5kIGJ1Z3ppbC5sYS84ODk0OTIuXG4gIHRoaXMuX25hbWVzID0gQXJyYXlTZXQuZnJvbUFycmF5KG5hbWVzLm1hcChTdHJpbmcpLCB0cnVlKTtcbiAgdGhpcy5fc291cmNlcyA9IEFycmF5U2V0LmZyb21BcnJheShzb3VyY2VzLCB0cnVlKTtcblxuICB0aGlzLl9hYnNvbHV0ZVNvdXJjZXMgPSB0aGlzLl9zb3VyY2VzLnRvQXJyYXkoKS5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICByZXR1cm4gdXRpbC5jb21wdXRlU291cmNlVVJMKHNvdXJjZVJvb3QsIHMsIGFTb3VyY2VNYXBVUkwpO1xuICB9KTtcblxuICB0aGlzLnNvdXJjZVJvb3QgPSBzb3VyY2VSb290O1xuICB0aGlzLnNvdXJjZXNDb250ZW50ID0gc291cmNlc0NvbnRlbnQ7XG4gIHRoaXMuX21hcHBpbmdzID0gbWFwcGluZ3M7XG4gIHRoaXMuX3NvdXJjZU1hcFVSTCA9IGFTb3VyY2VNYXBVUkw7XG4gIHRoaXMuZmlsZSA9IGZpbGU7XG59XG5cbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUpO1xuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuY29uc3VtZXIgPSBTb3VyY2VNYXBDb25zdW1lcjtcblxuLyoqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGZpbmQgdGhlIGluZGV4IG9mIGEgc291cmNlLiAgUmV0dXJucyAtMSBpZiBub3RcbiAqIGZvdW5kLlxuICovXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fZmluZFNvdXJjZUluZGV4ID0gZnVuY3Rpb24oYVNvdXJjZSkge1xuICB2YXIgcmVsYXRpdmVTb3VyY2UgPSBhU291cmNlO1xuICBpZiAodGhpcy5zb3VyY2VSb290ICE9IG51bGwpIHtcbiAgICByZWxhdGl2ZVNvdXJjZSA9IHV0aWwucmVsYXRpdmUodGhpcy5zb3VyY2VSb290LCByZWxhdGl2ZVNvdXJjZSk7XG4gIH1cblxuICBpZiAodGhpcy5fc291cmNlcy5oYXMocmVsYXRpdmVTb3VyY2UpKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZXMuaW5kZXhPZihyZWxhdGl2ZVNvdXJjZSk7XG4gIH1cblxuICAvLyBNYXliZSBhU291cmNlIGlzIGFuIGFic29sdXRlIFVSTCBhcyByZXR1cm5lZCBieSB8c291cmNlc3wuICBJblxuICAvLyB0aGlzIGNhc2Ugd2UgY2FuJ3Qgc2ltcGx5IHVuZG8gdGhlIHRyYW5zZm9ybS5cbiAgdmFyIGk7XG4gIGZvciAoaSA9IDA7IGkgPCB0aGlzLl9hYnNvbHV0ZVNvdXJjZXMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAodGhpcy5fYWJzb2x1dGVTb3VyY2VzW2ldID09IGFTb3VyY2UpIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgQmFzaWNTb3VyY2VNYXBDb25zdW1lciBmcm9tIGEgU291cmNlTWFwR2VuZXJhdG9yLlxuICpcbiAqIEBwYXJhbSBTb3VyY2VNYXBHZW5lcmF0b3IgYVNvdXJjZU1hcFxuICogICAgICAgIFRoZSBzb3VyY2UgbWFwIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cbiAqIEBwYXJhbSBTdHJpbmcgYVNvdXJjZU1hcFVSTFxuICogICAgICAgIFRoZSBVUkwgYXQgd2hpY2ggdGhlIHNvdXJjZSBtYXAgY2FuIGJlIGZvdW5kIChvcHRpb25hbClcbiAqIEByZXR1cm5zIEJhc2ljU291cmNlTWFwQ29uc3VtZXJcbiAqL1xuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5mcm9tU291cmNlTWFwID1cbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfZnJvbVNvdXJjZU1hcChhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKSB7XG4gICAgdmFyIHNtYyA9IE9iamVjdC5jcmVhdGUoQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUpO1xuXG4gICAgdmFyIG5hbWVzID0gc21jLl9uYW1lcyA9IEFycmF5U2V0LmZyb21BcnJheShhU291cmNlTWFwLl9uYW1lcy50b0FycmF5KCksIHRydWUpO1xuICAgIHZhciBzb3VyY2VzID0gc21jLl9zb3VyY2VzID0gQXJyYXlTZXQuZnJvbUFycmF5KGFTb3VyY2VNYXAuX3NvdXJjZXMudG9BcnJheSgpLCB0cnVlKTtcbiAgICBzbWMuc291cmNlUm9vdCA9IGFTb3VyY2VNYXAuX3NvdXJjZVJvb3Q7XG4gICAgc21jLnNvdXJjZXNDb250ZW50ID0gYVNvdXJjZU1hcC5fZ2VuZXJhdGVTb3VyY2VzQ29udGVudChzbWMuX3NvdXJjZXMudG9BcnJheSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc21jLnNvdXJjZVJvb3QpO1xuICAgIHNtYy5maWxlID0gYVNvdXJjZU1hcC5fZmlsZTtcbiAgICBzbWMuX3NvdXJjZU1hcFVSTCA9IGFTb3VyY2VNYXBVUkw7XG4gICAgc21jLl9hYnNvbHV0ZVNvdXJjZXMgPSBzbWMuX3NvdXJjZXMudG9BcnJheSgpLm1hcChmdW5jdGlvbiAocykge1xuICAgICAgcmV0dXJuIHV0aWwuY29tcHV0ZVNvdXJjZVVSTChzbWMuc291cmNlUm9vdCwgcywgYVNvdXJjZU1hcFVSTCk7XG4gICAgfSk7XG5cbiAgICAvLyBCZWNhdXNlIHdlIGFyZSBtb2RpZnlpbmcgdGhlIGVudHJpZXMgKGJ5IGNvbnZlcnRpbmcgc3RyaW5nIHNvdXJjZXMgYW5kXG4gICAgLy8gbmFtZXMgdG8gaW5kaWNlcyBpbnRvIHRoZSBzb3VyY2VzIGFuZCBuYW1lcyBBcnJheVNldHMpLCB3ZSBoYXZlIHRvIG1ha2VcbiAgICAvLyBhIGNvcHkgb2YgdGhlIGVudHJ5IG9yIGVsc2UgYmFkIHRoaW5ncyBoYXBwZW4uIFNoYXJlZCBtdXRhYmxlIHN0YXRlXG4gICAgLy8gc3RyaWtlcyBhZ2FpbiEgU2VlIGdpdGh1YiBpc3N1ZSAjMTkxLlxuXG4gICAgdmFyIGdlbmVyYXRlZE1hcHBpbmdzID0gYVNvdXJjZU1hcC5fbWFwcGluZ3MudG9BcnJheSgpLnNsaWNlKCk7XG4gICAgdmFyIGRlc3RHZW5lcmF0ZWRNYXBwaW5ncyA9IHNtYy5fX2dlbmVyYXRlZE1hcHBpbmdzID0gW107XG4gICAgdmFyIGRlc3RPcmlnaW5hbE1hcHBpbmdzID0gc21jLl9fb3JpZ2luYWxNYXBwaW5ncyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGdlbmVyYXRlZE1hcHBpbmdzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc3JjTWFwcGluZyA9IGdlbmVyYXRlZE1hcHBpbmdzW2ldO1xuICAgICAgdmFyIGRlc3RNYXBwaW5nID0gbmV3IE1hcHBpbmc7XG4gICAgICBkZXN0TWFwcGluZy5nZW5lcmF0ZWRMaW5lID0gc3JjTWFwcGluZy5nZW5lcmF0ZWRMaW5lO1xuICAgICAgZGVzdE1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uID0gc3JjTWFwcGluZy5nZW5lcmF0ZWRDb2x1bW47XG5cbiAgICAgIGlmIChzcmNNYXBwaW5nLnNvdXJjZSkge1xuICAgICAgICBkZXN0TWFwcGluZy5zb3VyY2UgPSBzb3VyY2VzLmluZGV4T2Yoc3JjTWFwcGluZy5zb3VyY2UpO1xuICAgICAgICBkZXN0TWFwcGluZy5vcmlnaW5hbExpbmUgPSBzcmNNYXBwaW5nLm9yaWdpbmFsTGluZTtcbiAgICAgICAgZGVzdE1hcHBpbmcub3JpZ2luYWxDb2x1bW4gPSBzcmNNYXBwaW5nLm9yaWdpbmFsQ29sdW1uO1xuXG4gICAgICAgIGlmIChzcmNNYXBwaW5nLm5hbWUpIHtcbiAgICAgICAgICBkZXN0TWFwcGluZy5uYW1lID0gbmFtZXMuaW5kZXhPZihzcmNNYXBwaW5nLm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVzdE9yaWdpbmFsTWFwcGluZ3MucHVzaChkZXN0TWFwcGluZyk7XG4gICAgICB9XG5cbiAgICAgIGRlc3RHZW5lcmF0ZWRNYXBwaW5ncy5wdXNoKGRlc3RNYXBwaW5nKTtcbiAgICB9XG5cbiAgICBxdWlja1NvcnQoc21jLl9fb3JpZ2luYWxNYXBwaW5ncywgdXRpbC5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyk7XG5cbiAgICByZXR1cm4gc21jO1xuICB9O1xuXG4vKipcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBzb3VyY2UgbWFwcGluZyBzcGVjIHRoYXQgd2UgYXJlIGNvbnN1bWluZy5cbiAqL1xuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3ZlcnNpb24gPSAzO1xuXG4vKipcbiAqIFRoZSBsaXN0IG9mIG9yaWdpbmFsIHNvdXJjZXMuXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSwgJ3NvdXJjZXMnLCB7XG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9hYnNvbHV0ZVNvdXJjZXMuc2xpY2UoKTtcbiAgfVxufSk7XG5cbi8qKlxuICogUHJvdmlkZSB0aGUgSklUIHdpdGggYSBuaWNlIHNoYXBlIC8gaGlkZGVuIGNsYXNzLlxuICovXG5mdW5jdGlvbiBNYXBwaW5nKCkge1xuICB0aGlzLmdlbmVyYXRlZExpbmUgPSAwO1xuICB0aGlzLmdlbmVyYXRlZENvbHVtbiA9IDA7XG4gIHRoaXMuc291cmNlID0gbnVsbDtcbiAgdGhpcy5vcmlnaW5hbExpbmUgPSBudWxsO1xuICB0aGlzLm9yaWdpbmFsQ29sdW1uID0gbnVsbDtcbiAgdGhpcy5uYW1lID0gbnVsbDtcbn1cblxuLyoqXG4gKiBQYXJzZSB0aGUgbWFwcGluZ3MgaW4gYSBzdHJpbmcgaW4gdG8gYSBkYXRhIHN0cnVjdHVyZSB3aGljaCB3ZSBjYW4gZWFzaWx5XG4gKiBxdWVyeSAodGhlIG9yZGVyZWQgYXJyYXlzIGluIHRoZSBgdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzYCBhbmRcbiAqIGB0aGlzLl9fb3JpZ2luYWxNYXBwaW5nc2AgcHJvcGVydGllcykuXG4gKi9cbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9wYXJzZU1hcHBpbmdzID1cbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfcGFyc2VNYXBwaW5ncyhhU3RyLCBhU291cmNlUm9vdCkge1xuICAgIHZhciBnZW5lcmF0ZWRMaW5lID0gMTtcbiAgICB2YXIgcHJldmlvdXNHZW5lcmF0ZWRDb2x1bW4gPSAwO1xuICAgIHZhciBwcmV2aW91c09yaWdpbmFsTGluZSA9IDA7XG4gICAgdmFyIHByZXZpb3VzT3JpZ2luYWxDb2x1bW4gPSAwO1xuICAgIHZhciBwcmV2aW91c1NvdXJjZSA9IDA7XG4gICAgdmFyIHByZXZpb3VzTmFtZSA9IDA7XG4gICAgdmFyIGxlbmd0aCA9IGFTdHIubGVuZ3RoO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGNhY2hlZFNlZ21lbnRzID0ge307XG4gICAgdmFyIHRlbXAgPSB7fTtcbiAgICB2YXIgb3JpZ2luYWxNYXBwaW5ncyA9IFtdO1xuICAgIHZhciBnZW5lcmF0ZWRNYXBwaW5ncyA9IFtdO1xuICAgIHZhciBtYXBwaW5nLCBzdHIsIHNlZ21lbnQsIGVuZCwgdmFsdWU7XG5cbiAgICB3aGlsZSAoaW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGlmIChhU3RyLmNoYXJBdChpbmRleCkgPT09ICc7Jykge1xuICAgICAgICBnZW5lcmF0ZWRMaW5lKys7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uID0gMDtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGFTdHIuY2hhckF0KGluZGV4KSA9PT0gJywnKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbWFwcGluZyA9IG5ldyBNYXBwaW5nKCk7XG4gICAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkTGluZSA9IGdlbmVyYXRlZExpbmU7XG5cbiAgICAgICAgLy8gQmVjYXVzZSBlYWNoIG9mZnNldCBpcyBlbmNvZGVkIHJlbGF0aXZlIHRvIHRoZSBwcmV2aW91cyBvbmUsXG4gICAgICAgIC8vIG1hbnkgc2VnbWVudHMgb2Z0ZW4gaGF2ZSB0aGUgc2FtZSBlbmNvZGluZy4gV2UgY2FuIGV4cGxvaXQgdGhpc1xuICAgICAgICAvLyBmYWN0IGJ5IGNhY2hpbmcgdGhlIHBhcnNlZCB2YXJpYWJsZSBsZW5ndGggZmllbGRzIG9mIGVhY2ggc2VnbWVudCxcbiAgICAgICAgLy8gYWxsb3dpbmcgdXMgdG8gYXZvaWQgYSBzZWNvbmQgcGFyc2UgaWYgd2UgZW5jb3VudGVyIHRoZSBzYW1lXG4gICAgICAgIC8vIHNlZ21lbnQgYWdhaW4uXG4gICAgICAgIGZvciAoZW5kID0gaW5kZXg7IGVuZCA8IGxlbmd0aDsgZW5kKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5fY2hhcklzTWFwcGluZ1NlcGFyYXRvcihhU3RyLCBlbmQpKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3RyID0gYVN0ci5zbGljZShpbmRleCwgZW5kKTtcblxuICAgICAgICBzZWdtZW50ID0gY2FjaGVkU2VnbWVudHNbc3RyXTtcbiAgICAgICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAgICBpbmRleCArPSBzdHIubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlZ21lbnQgPSBbXTtcbiAgICAgICAgICB3aGlsZSAoaW5kZXggPCBlbmQpIHtcbiAgICAgICAgICAgIGJhc2U2NFZMUS5kZWNvZGUoYVN0ciwgaW5kZXgsIHRlbXApO1xuICAgICAgICAgICAgdmFsdWUgPSB0ZW1wLnZhbHVlO1xuICAgICAgICAgICAgaW5kZXggPSB0ZW1wLnJlc3Q7XG4gICAgICAgICAgICBzZWdtZW50LnB1c2godmFsdWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWdtZW50Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3VuZCBhIHNvdXJjZSwgYnV0IG5vIGxpbmUgYW5kIGNvbHVtbicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWdtZW50Lmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3VuZCBhIHNvdXJjZSBhbmQgbGluZSwgYnV0IG5vIGNvbHVtbicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhY2hlZFNlZ21lbnRzW3N0cl0gPSBzZWdtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2VuZXJhdGVkIGNvbHVtbi5cbiAgICAgICAgbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4gPSBwcmV2aW91c0dlbmVyYXRlZENvbHVtbiArIHNlZ21lbnRbMF07XG4gICAgICAgIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uID0gbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW47XG5cbiAgICAgICAgaWYgKHNlZ21lbnQubGVuZ3RoID4gMSkge1xuICAgICAgICAgIC8vIE9yaWdpbmFsIHNvdXJjZS5cbiAgICAgICAgICBtYXBwaW5nLnNvdXJjZSA9IHByZXZpb3VzU291cmNlICsgc2VnbWVudFsxXTtcbiAgICAgICAgICBwcmV2aW91c1NvdXJjZSArPSBzZWdtZW50WzFdO1xuXG4gICAgICAgICAgLy8gT3JpZ2luYWwgbGluZS5cbiAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsTGluZSA9IHByZXZpb3VzT3JpZ2luYWxMaW5lICsgc2VnbWVudFsyXTtcbiAgICAgICAgICBwcmV2aW91c09yaWdpbmFsTGluZSA9IG1hcHBpbmcub3JpZ2luYWxMaW5lO1xuICAgICAgICAgIC8vIExpbmVzIGFyZSBzdG9yZWQgMC1iYXNlZFxuICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWxMaW5lICs9IDE7XG5cbiAgICAgICAgICAvLyBPcmlnaW5hbCBjb2x1bW4uXG4gICAgICAgICAgbWFwcGluZy5vcmlnaW5hbENvbHVtbiA9IHByZXZpb3VzT3JpZ2luYWxDb2x1bW4gKyBzZWdtZW50WzNdO1xuICAgICAgICAgIHByZXZpb3VzT3JpZ2luYWxDb2x1bW4gPSBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uO1xuXG4gICAgICAgICAgaWYgKHNlZ21lbnQubGVuZ3RoID4gNCkge1xuICAgICAgICAgICAgLy8gT3JpZ2luYWwgbmFtZS5cbiAgICAgICAgICAgIG1hcHBpbmcubmFtZSA9IHByZXZpb3VzTmFtZSArIHNlZ21lbnRbNF07XG4gICAgICAgICAgICBwcmV2aW91c05hbWUgKz0gc2VnbWVudFs0XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZW5lcmF0ZWRNYXBwaW5ncy5wdXNoKG1hcHBpbmcpO1xuICAgICAgICBpZiAodHlwZW9mIG1hcHBpbmcub3JpZ2luYWxMaW5lID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIG9yaWdpbmFsTWFwcGluZ3MucHVzaChtYXBwaW5nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHF1aWNrU29ydChnZW5lcmF0ZWRNYXBwaW5ncywgdXRpbC5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZCk7XG4gICAgdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzID0gZ2VuZXJhdGVkTWFwcGluZ3M7XG5cbiAgICBxdWlja1NvcnQob3JpZ2luYWxNYXBwaW5ncywgdXRpbC5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyk7XG4gICAgdGhpcy5fX29yaWdpbmFsTWFwcGluZ3MgPSBvcmlnaW5hbE1hcHBpbmdzO1xuICB9O1xuXG4vKipcbiAqIEZpbmQgdGhlIG1hcHBpbmcgdGhhdCBiZXN0IG1hdGNoZXMgdGhlIGh5cG90aGV0aWNhbCBcIm5lZWRsZVwiIG1hcHBpbmcgdGhhdFxuICogd2UgYXJlIHNlYXJjaGluZyBmb3IgaW4gdGhlIGdpdmVuIFwiaGF5c3RhY2tcIiBvZiBtYXBwaW5ncy5cbiAqL1xuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX2ZpbmRNYXBwaW5nID1cbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfZmluZE1hcHBpbmcoYU5lZWRsZSwgYU1hcHBpbmdzLCBhTGluZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFDb2x1bW5OYW1lLCBhQ29tcGFyYXRvciwgYUJpYXMpIHtcbiAgICAvLyBUbyByZXR1cm4gdGhlIHBvc2l0aW9uIHdlIGFyZSBzZWFyY2hpbmcgZm9yLCB3ZSBtdXN0IGZpcnN0IGZpbmQgdGhlXG4gICAgLy8gbWFwcGluZyBmb3IgdGhlIGdpdmVuIHBvc2l0aW9uIGFuZCB0aGVuIHJldHVybiB0aGUgb3Bwb3NpdGUgcG9zaXRpb24gaXRcbiAgICAvLyBwb2ludHMgdG8uIEJlY2F1c2UgdGhlIG1hcHBpbmdzIGFyZSBzb3J0ZWQsIHdlIGNhbiB1c2UgYmluYXJ5IHNlYXJjaCB0b1xuICAgIC8vIGZpbmQgdGhlIGJlc3QgbWFwcGluZy5cblxuICAgIGlmIChhTmVlZGxlW2FMaW5lTmFtZV0gPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTGluZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAxLCBnb3QgJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICArIGFOZWVkbGVbYUxpbmVOYW1lXSk7XG4gICAgfVxuICAgIGlmIChhTmVlZGxlW2FDb2x1bW5OYW1lXSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NvbHVtbiBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAwLCBnb3QgJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICArIGFOZWVkbGVbYUNvbHVtbk5hbWVdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmluYXJ5U2VhcmNoLnNlYXJjaChhTmVlZGxlLCBhTWFwcGluZ3MsIGFDb21wYXJhdG9yLCBhQmlhcyk7XG4gIH07XG5cbi8qKlxuICogQ29tcHV0ZSB0aGUgbGFzdCBjb2x1bW4gZm9yIGVhY2ggZ2VuZXJhdGVkIG1hcHBpbmcuIFRoZSBsYXN0IGNvbHVtbiBpc1xuICogaW5jbHVzaXZlLlxuICovXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5jb21wdXRlQ29sdW1uU3BhbnMgPVxuICBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9jb21wdXRlQ29sdW1uU3BhbnMoKSB7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzLmxlbmd0aDsgKytpbmRleCkge1xuICAgICAgdmFyIG1hcHBpbmcgPSB0aGlzLl9nZW5lcmF0ZWRNYXBwaW5nc1tpbmRleF07XG5cbiAgICAgIC8vIE1hcHBpbmdzIGRvIG5vdCBjb250YWluIGEgZmllbGQgZm9yIHRoZSBsYXN0IGdlbmVyYXRlZCBjb2x1bW50LiBXZVxuICAgICAgLy8gY2FuIGNvbWUgdXAgd2l0aCBhbiBvcHRpbWlzdGljIGVzdGltYXRlLCBob3dldmVyLCBieSBhc3N1bWluZyB0aGF0XG4gICAgICAvLyBtYXBwaW5ncyBhcmUgY29udGlndW91cyAoaS5lLiBnaXZlbiB0d28gY29uc2VjdXRpdmUgbWFwcGluZ3MsIHRoZVxuICAgICAgLy8gZmlyc3QgbWFwcGluZyBlbmRzIHdoZXJlIHRoZSBzZWNvbmQgb25lIHN0YXJ0cykuXG4gICAgICBpZiAoaW5kZXggKyAxIDwgdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3MubGVuZ3RoKSB7XG4gICAgICAgIHZhciBuZXh0TWFwcGluZyA9IHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzW2luZGV4ICsgMV07XG5cbiAgICAgICAgaWYgKG1hcHBpbmcuZ2VuZXJhdGVkTGluZSA9PT0gbmV4dE1hcHBpbmcuZ2VuZXJhdGVkTGluZSkge1xuICAgICAgICAgIG1hcHBpbmcubGFzdEdlbmVyYXRlZENvbHVtbiA9IG5leHRNYXBwaW5nLmdlbmVyYXRlZENvbHVtbiAtIDE7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGxhc3QgbWFwcGluZyBmb3IgZWFjaCBsaW5lIHNwYW5zIHRoZSBlbnRpcmUgbGluZS5cbiAgICAgIG1hcHBpbmcubGFzdEdlbmVyYXRlZENvbHVtbiA9IEluZmluaXR5O1xuICAgIH1cbiAgfTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBvcmlnaW5hbCBzb3VyY2UsIGxpbmUsIGFuZCBjb2x1bW4gaW5mb3JtYXRpb24gZm9yIHRoZSBnZW5lcmF0ZWRcbiAqIHNvdXJjZSdzIGxpbmUgYW5kIGNvbHVtbiBwb3NpdGlvbnMgcHJvdmlkZWQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIG9iamVjdFxuICogd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKlxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZS4gIFRoZSBsaW5lIG51bWJlclxuICogICAgIGlzIDEtYmFzZWQuXG4gKiAgIC0gY29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZS4gIFRoZSBjb2x1bW5cbiAqICAgICBudW1iZXIgaXMgMC1iYXNlZC5cbiAqICAgLSBiaWFzOiBFaXRoZXIgJ1NvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EJyBvclxuICogICAgICdTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCcuIFNwZWNpZmllcyB3aGV0aGVyIHRvIHJldHVybiB0aGVcbiAqICAgICBjbG9zZXN0IGVsZW1lbnQgdGhhdCBpcyBzbWFsbGVyIHRoYW4gb3IgZ3JlYXRlciB0aGFuIHRoZSBvbmUgd2UgYXJlXG4gKiAgICAgc2VhcmNoaW5nIGZvciwgcmVzcGVjdGl2ZWx5LCBpZiB0aGUgZXhhY3QgZWxlbWVudCBjYW5ub3QgYmUgZm91bmQuXG4gKiAgICAgRGVmYXVsdHMgdG8gJ1NvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EJy5cbiAqXG4gKiBhbmQgYW4gb2JqZWN0IGlzIHJldHVybmVkIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBzb3VyY2U6IFRoZSBvcmlnaW5hbCBzb3VyY2UgZmlsZSwgb3IgbnVsbC5cbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxuICogICAgIGxpbmUgbnVtYmVyIGlzIDEtYmFzZWQuXG4gKiAgIC0gY29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLCBvciBudWxsLiAgVGhlXG4gKiAgICAgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkLlxuICogICAtIG5hbWU6IFRoZSBvcmlnaW5hbCBpZGVudGlmaWVyLCBvciBudWxsLlxuICovXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5vcmlnaW5hbFBvc2l0aW9uRm9yID1cbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfb3JpZ2luYWxQb3NpdGlvbkZvcihhQXJncykge1xuICAgIHZhciBuZWVkbGUgPSB7XG4gICAgICBnZW5lcmF0ZWRMaW5lOiB1dGlsLmdldEFyZyhhQXJncywgJ2xpbmUnKSxcbiAgICAgIGdlbmVyYXRlZENvbHVtbjogdXRpbC5nZXRBcmcoYUFyZ3MsICdjb2x1bW4nKVxuICAgIH07XG5cbiAgICB2YXIgaW5kZXggPSB0aGlzLl9maW5kTWFwcGluZyhcbiAgICAgIG5lZWRsZSxcbiAgICAgIHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzLFxuICAgICAgXCJnZW5lcmF0ZWRMaW5lXCIsXG4gICAgICBcImdlbmVyYXRlZENvbHVtblwiLFxuICAgICAgdXRpbC5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZCxcbiAgICAgIHV0aWwuZ2V0QXJnKGFBcmdzLCAnYmlhcycsIFNvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EKVxuICAgICk7XG5cbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdmFyIG1hcHBpbmcgPSB0aGlzLl9nZW5lcmF0ZWRNYXBwaW5nc1tpbmRleF07XG5cbiAgICAgIGlmIChtYXBwaW5nLmdlbmVyYXRlZExpbmUgPT09IG5lZWRsZS5nZW5lcmF0ZWRMaW5lKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSB1dGlsLmdldEFyZyhtYXBwaW5nLCAnc291cmNlJywgbnVsbCk7XG4gICAgICAgIGlmIChzb3VyY2UgIT09IG51bGwpIHtcbiAgICAgICAgICBzb3VyY2UgPSB0aGlzLl9zb3VyY2VzLmF0KHNvdXJjZSk7XG4gICAgICAgICAgc291cmNlID0gdXRpbC5jb21wdXRlU291cmNlVVJMKHRoaXMuc291cmNlUm9vdCwgc291cmNlLCB0aGlzLl9zb3VyY2VNYXBVUkwpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuYW1lID0gdXRpbC5nZXRBcmcobWFwcGluZywgJ25hbWUnLCBudWxsKTtcbiAgICAgICAgaWYgKG5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgICBuYW1lID0gdGhpcy5fbmFtZXMuYXQobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICBsaW5lOiB1dGlsLmdldEFyZyhtYXBwaW5nLCAnb3JpZ2luYWxMaW5lJywgbnVsbCksXG4gICAgICAgICAgY29sdW1uOiB1dGlsLmdldEFyZyhtYXBwaW5nLCAnb3JpZ2luYWxDb2x1bW4nLCBudWxsKSxcbiAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNvdXJjZTogbnVsbCxcbiAgICAgIGxpbmU6IG51bGwsXG4gICAgICBjb2x1bW46IG51bGwsXG4gICAgICBuYW1lOiBudWxsXG4gICAgfTtcbiAgfTtcblxuLyoqXG4gKiBSZXR1cm4gdHJ1ZSBpZiB3ZSBoYXZlIHRoZSBzb3VyY2UgY29udGVudCBmb3IgZXZlcnkgc291cmNlIGluIHRoZSBzb3VyY2VcbiAqIG1hcCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5oYXNDb250ZW50c09mQWxsU291cmNlcyA9XG4gIGZ1bmN0aW9uIEJhc2ljU291cmNlTWFwQ29uc3VtZXJfaGFzQ29udGVudHNPZkFsbFNvdXJjZXMoKSB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZXNDb250ZW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNvdXJjZXNDb250ZW50Lmxlbmd0aCA+PSB0aGlzLl9zb3VyY2VzLnNpemUoKSAmJlxuICAgICAgIXRoaXMuc291cmNlc0NvbnRlbnQuc29tZShmdW5jdGlvbiAoc2MpIHsgcmV0dXJuIHNjID09IG51bGw7IH0pO1xuICB9O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG9yaWdpbmFsIHNvdXJjZSBjb250ZW50LiBUaGUgb25seSBhcmd1bWVudCBpcyB0aGUgdXJsIG9mIHRoZVxuICogb3JpZ2luYWwgc291cmNlIGZpbGUuIFJldHVybnMgbnVsbCBpZiBubyBvcmlnaW5hbCBzb3VyY2UgY29udGVudCBpc1xuICogYXZhaWxhYmxlLlxuICovXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5zb3VyY2VDb250ZW50Rm9yID1cbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfc291cmNlQ29udGVudEZvcihhU291cmNlLCBudWxsT25NaXNzaW5nKSB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZXNDb250ZW50KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgaW5kZXggPSB0aGlzLl9maW5kU291cmNlSW5kZXgoYVNvdXJjZSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnNvdXJjZXNDb250ZW50W2luZGV4XTtcbiAgICB9XG5cbiAgICB2YXIgcmVsYXRpdmVTb3VyY2UgPSBhU291cmNlO1xuICAgIGlmICh0aGlzLnNvdXJjZVJvb3QgIT0gbnVsbCkge1xuICAgICAgcmVsYXRpdmVTb3VyY2UgPSB1dGlsLnJlbGF0aXZlKHRoaXMuc291cmNlUm9vdCwgcmVsYXRpdmVTb3VyY2UpO1xuICAgIH1cblxuICAgIHZhciB1cmw7XG4gICAgaWYgKHRoaXMuc291cmNlUm9vdCAhPSBudWxsXG4gICAgICAgICYmICh1cmwgPSB1dGlsLnVybFBhcnNlKHRoaXMuc291cmNlUm9vdCkpKSB7XG4gICAgICAvLyBYWFg6IGZpbGU6Ly8gVVJJcyBhbmQgYWJzb2x1dGUgcGF0aHMgbGVhZCB0byB1bmV4cGVjdGVkIGJlaGF2aW9yIGZvclxuICAgICAgLy8gbWFueSB1c2Vycy4gV2UgY2FuIGhlbHAgdGhlbSBvdXQgd2hlbiB0aGV5IGV4cGVjdCBmaWxlOi8vIFVSSXMgdG9cbiAgICAgIC8vIGJlaGF2ZSBsaWtlIGl0IHdvdWxkIGlmIHRoZXkgd2VyZSBydW5uaW5nIGEgbG9jYWwgSFRUUCBzZXJ2ZXIuIFNlZVxuICAgICAgLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9ODg1NTk3LlxuICAgICAgdmFyIGZpbGVVcmlBYnNQYXRoID0gcmVsYXRpdmVTb3VyY2UucmVwbGFjZSgvXmZpbGU6XFwvXFwvLywgXCJcIik7XG4gICAgICBpZiAodXJsLnNjaGVtZSA9PSBcImZpbGVcIlxuICAgICAgICAgICYmIHRoaXMuX3NvdXJjZXMuaGFzKGZpbGVVcmlBYnNQYXRoKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2VzQ29udGVudFt0aGlzLl9zb3VyY2VzLmluZGV4T2YoZmlsZVVyaUFic1BhdGgpXVxuICAgICAgfVxuXG4gICAgICBpZiAoKCF1cmwucGF0aCB8fCB1cmwucGF0aCA9PSBcIi9cIilcbiAgICAgICAgICAmJiB0aGlzLl9zb3VyY2VzLmhhcyhcIi9cIiArIHJlbGF0aXZlU291cmNlKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2VzQ29udGVudFt0aGlzLl9zb3VyY2VzLmluZGV4T2YoXCIvXCIgKyByZWxhdGl2ZVNvdXJjZSldO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCByZWN1cnNpdmVseSBmcm9tXG4gICAgLy8gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5zb3VyY2VDb250ZW50Rm9yLiBJbiB0aGF0IGNhc2UsIHdlXG4gICAgLy8gZG9uJ3Qgd2FudCB0byB0aHJvdyBpZiB3ZSBjYW4ndCBmaW5kIHRoZSBzb3VyY2UgLSB3ZSBqdXN0IHdhbnQgdG9cbiAgICAvLyByZXR1cm4gbnVsbCwgc28gd2UgcHJvdmlkZSBhIGZsYWcgdG8gZXhpdCBncmFjZWZ1bGx5LlxuICAgIGlmIChudWxsT25NaXNzaW5nKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIHJlbGF0aXZlU291cmNlICsgJ1wiIGlzIG5vdCBpbiB0aGUgU291cmNlTWFwLicpO1xuICAgIH1cbiAgfTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uIGluZm9ybWF0aW9uIGZvciB0aGUgb3JpZ2luYWwgc291cmNlLFxuICogbGluZSwgYW5kIGNvbHVtbiBwb3NpdGlvbnMgcHJvdmlkZWQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIG9iamVjdCB3aXRoXG4gKiB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKlxuICogICAtIHNvdXJjZTogVGhlIGZpbGVuYW1lIG9mIHRoZSBvcmlnaW5hbCBzb3VyY2UuXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UuICBUaGUgbGluZSBudW1iZXJcbiAqICAgICBpcyAxLWJhc2VkLlxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS4gIFRoZSBjb2x1bW5cbiAqICAgICBudW1iZXIgaXMgMC1iYXNlZC5cbiAqICAgLSBiaWFzOiBFaXRoZXIgJ1NvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EJyBvclxuICogICAgICdTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCcuIFNwZWNpZmllcyB3aGV0aGVyIHRvIHJldHVybiB0aGVcbiAqICAgICBjbG9zZXN0IGVsZW1lbnQgdGhhdCBpcyBzbWFsbGVyIHRoYW4gb3IgZ3JlYXRlciB0aGFuIHRoZSBvbmUgd2UgYXJlXG4gKiAgICAgc2VhcmNoaW5nIGZvciwgcmVzcGVjdGl2ZWx5LCBpZiB0aGUgZXhhY3QgZWxlbWVudCBjYW5ub3QgYmUgZm91bmQuXG4gKiAgICAgRGVmYXVsdHMgdG8gJ1NvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EJy5cbiAqXG4gKiBhbmQgYW4gb2JqZWN0IGlzIHJldHVybmVkIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuICBUaGVcbiAqICAgICBsaW5lIG51bWJlciBpcyAxLWJhc2VkLlxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuXG4gKiAgICAgVGhlIGNvbHVtbiBudW1iZXIgaXMgMC1iYXNlZC5cbiAqL1xuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuZ2VuZXJhdGVkUG9zaXRpb25Gb3IgPVxuICBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9nZW5lcmF0ZWRQb3NpdGlvbkZvcihhQXJncykge1xuICAgIHZhciBzb3VyY2UgPSB1dGlsLmdldEFyZyhhQXJncywgJ3NvdXJjZScpO1xuICAgIHNvdXJjZSA9IHRoaXMuX2ZpbmRTb3VyY2VJbmRleChzb3VyY2UpO1xuICAgIGlmIChzb3VyY2UgPCAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsaW5lOiBudWxsLFxuICAgICAgICBjb2x1bW46IG51bGwsXG4gICAgICAgIGxhc3RDb2x1bW46IG51bGxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIG5lZWRsZSA9IHtcbiAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgb3JpZ2luYWxMaW5lOiB1dGlsLmdldEFyZyhhQXJncywgJ2xpbmUnKSxcbiAgICAgIG9yaWdpbmFsQ29sdW1uOiB1dGlsLmdldEFyZyhhQXJncywgJ2NvbHVtbicpXG4gICAgfTtcblxuICAgIHZhciBpbmRleCA9IHRoaXMuX2ZpbmRNYXBwaW5nKFxuICAgICAgbmVlZGxlLFxuICAgICAgdGhpcy5fb3JpZ2luYWxNYXBwaW5ncyxcbiAgICAgIFwib3JpZ2luYWxMaW5lXCIsXG4gICAgICBcIm9yaWdpbmFsQ29sdW1uXCIsXG4gICAgICB1dGlsLmNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zLFxuICAgICAgdXRpbC5nZXRBcmcoYUFyZ3MsICdiaWFzJywgU291cmNlTWFwQ29uc3VtZXIuR1JFQVRFU1RfTE9XRVJfQk9VTkQpXG4gICAgKTtcblxuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB2YXIgbWFwcGluZyA9IHRoaXMuX29yaWdpbmFsTWFwcGluZ3NbaW5kZXhdO1xuXG4gICAgICBpZiAobWFwcGluZy5zb3VyY2UgPT09IG5lZWRsZS5zb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsaW5lOiB1dGlsLmdldEFyZyhtYXBwaW5nLCAnZ2VuZXJhdGVkTGluZScsIG51bGwpLFxuICAgICAgICAgIGNvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgJ2dlbmVyYXRlZENvbHVtbicsIG51bGwpLFxuICAgICAgICAgIGxhc3RDb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsICdsYXN0R2VuZXJhdGVkQ29sdW1uJywgbnVsbClcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbGluZTogbnVsbCxcbiAgICAgIGNvbHVtbjogbnVsbCxcbiAgICAgIGxhc3RDb2x1bW46IG51bGxcbiAgICB9O1xuICB9O1xuXG5leHBvcnRzLkJhc2ljU291cmNlTWFwQ29uc3VtZXIgPSBCYXNpY1NvdXJjZU1hcENvbnN1bWVyO1xuXG4vKipcbiAqIEFuIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lciBpbnN0YW5jZSByZXByZXNlbnRzIGEgcGFyc2VkIHNvdXJjZSBtYXAgd2hpY2hcbiAqIHdlIGNhbiBxdWVyeSBmb3IgaW5mb3JtYXRpb24uIEl0IGRpZmZlcnMgZnJvbSBCYXNpY1NvdXJjZU1hcENvbnN1bWVyIGluXG4gKiB0aGF0IGl0IHRha2VzIFwiaW5kZXhlZFwiIHNvdXJjZSBtYXBzIChpLmUuIG9uZXMgd2l0aCBhIFwic2VjdGlvbnNcIiBmaWVsZCkgYXNcbiAqIGlucHV0LlxuICpcbiAqIFRoZSBmaXJzdCBwYXJhbWV0ZXIgaXMgYSByYXcgc291cmNlIG1hcCAoZWl0aGVyIGFzIGEgSlNPTiBzdHJpbmcsIG9yIGFscmVhZHlcbiAqIHBhcnNlZCB0byBhbiBvYmplY3QpLiBBY2NvcmRpbmcgdG8gdGhlIHNwZWMgZm9yIGluZGV4ZWQgc291cmNlIG1hcHMsIHRoZXlcbiAqIGhhdmUgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGVzOlxuICpcbiAqICAgLSB2ZXJzaW9uOiBXaGljaCB2ZXJzaW9uIG9mIHRoZSBzb3VyY2UgbWFwIHNwZWMgdGhpcyBtYXAgaXMgZm9sbG93aW5nLlxuICogICAtIGZpbGU6IE9wdGlvbmFsLiBUaGUgZ2VuZXJhdGVkIGZpbGUgdGhpcyBzb3VyY2UgbWFwIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqICAgLSBzZWN0aW9uczogQSBsaXN0IG9mIHNlY3Rpb24gZGVmaW5pdGlvbnMuXG4gKlxuICogRWFjaCB2YWx1ZSB1bmRlciB0aGUgXCJzZWN0aW9uc1wiIGZpZWxkIGhhcyB0d28gZmllbGRzOlxuICogICAtIG9mZnNldDogVGhlIG9mZnNldCBpbnRvIHRoZSBvcmlnaW5hbCBzcGVjaWZpZWQgYXQgd2hpY2ggdGhpcyBzZWN0aW9uXG4gKiAgICAgICBiZWdpbnMgdG8gYXBwbHksIGRlZmluZWQgYXMgYW4gb2JqZWN0IHdpdGggYSBcImxpbmVcIiBhbmQgXCJjb2x1bW5cIlxuICogICAgICAgZmllbGQuXG4gKiAgIC0gbWFwOiBBIHNvdXJjZSBtYXAgZGVmaW5pdGlvbi4gVGhpcyBzb3VyY2UgbWFwIGNvdWxkIGFsc28gYmUgaW5kZXhlZCxcbiAqICAgICAgIGJ1dCBkb2Vzbid0IGhhdmUgdG8gYmUuXG4gKlxuICogSW5zdGVhZCBvZiB0aGUgXCJtYXBcIiBmaWVsZCwgaXQncyBhbHNvIHBvc3NpYmxlIHRvIGhhdmUgYSBcInVybFwiIGZpZWxkXG4gKiBzcGVjaWZ5aW5nIGEgVVJMIHRvIHJldHJpZXZlIGEgc291cmNlIG1hcCBmcm9tLCBidXQgdGhhdCdzIGN1cnJlbnRseVxuICogdW5zdXBwb3J0ZWQuXG4gKlxuICogSGVyZSdzIGFuIGV4YW1wbGUgc291cmNlIG1hcCwgdGFrZW4gZnJvbSB0aGUgc291cmNlIG1hcCBzcGVjWzBdLCBidXRcbiAqIG1vZGlmaWVkIHRvIG9taXQgYSBzZWN0aW9uIHdoaWNoIHVzZXMgdGhlIFwidXJsXCIgZmllbGQuXG4gKlxuICogIHtcbiAqICAgIHZlcnNpb24gOiAzLFxuICogICAgZmlsZTogXCJhcHAuanNcIixcbiAqICAgIHNlY3Rpb25zOiBbe1xuICogICAgICBvZmZzZXQ6IHtsaW5lOjEwMCwgY29sdW1uOjEwfSxcbiAqICAgICAgbWFwOiB7XG4gKiAgICAgICAgdmVyc2lvbiA6IDMsXG4gKiAgICAgICAgZmlsZTogXCJzZWN0aW9uLmpzXCIsXG4gKiAgICAgICAgc291cmNlczogW1wiZm9vLmpzXCIsIFwiYmFyLmpzXCJdLFxuICogICAgICAgIG5hbWVzOiBbXCJzcmNcIiwgXCJtYXBzXCIsIFwiYXJlXCIsIFwiZnVuXCJdLFxuICogICAgICAgIG1hcHBpbmdzOiBcIkFBQUEsRTs7QUJDREU7XCJcbiAqICAgICAgfVxuICogICAgfV0sXG4gKiAgfVxuICpcbiAqIFRoZSBzZWNvbmQgcGFyYW1ldGVyLCBpZiBnaXZlbiwgaXMgYSBzdHJpbmcgd2hvc2UgdmFsdWUgaXMgdGhlIFVSTFxuICogYXQgd2hpY2ggdGhlIHNvdXJjZSBtYXAgd2FzIGZvdW5kLiAgVGhpcyBVUkwgaXMgdXNlZCB0byBjb21wdXRlIHRoZVxuICogc291cmNlcyBhcnJheS5cbiAqXG4gKiBbMF06IGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMVUxUkdBZWhRd1J5cFVUb3ZGMUtSbHBpT0Z6ZTBiLV8yZ2M2ZkFIMEtZMGsvZWRpdCNoZWFkaW5nPWguNTM1ZXMzeGVwcmd0XG4gKi9cbmZ1bmN0aW9uIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcihhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKSB7XG4gIHZhciBzb3VyY2VNYXAgPSBhU291cmNlTWFwO1xuICBpZiAodHlwZW9mIGFTb3VyY2VNYXAgPT09ICdzdHJpbmcnKSB7XG4gICAgc291cmNlTWFwID0gdXRpbC5wYXJzZVNvdXJjZU1hcElucHV0KGFTb3VyY2VNYXApO1xuICB9XG5cbiAgdmFyIHZlcnNpb24gPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsICd2ZXJzaW9uJyk7XG4gIHZhciBzZWN0aW9ucyA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgJ3NlY3Rpb25zJyk7XG5cbiAgaWYgKHZlcnNpb24gIT0gdGhpcy5fdmVyc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgdmVyc2lvbjogJyArIHZlcnNpb24pO1xuICB9XG5cbiAgdGhpcy5fc291cmNlcyA9IG5ldyBBcnJheVNldCgpO1xuICB0aGlzLl9uYW1lcyA9IG5ldyBBcnJheVNldCgpO1xuXG4gIHZhciBsYXN0T2Zmc2V0ID0ge1xuICAgIGxpbmU6IC0xLFxuICAgIGNvbHVtbjogMFxuICB9O1xuICB0aGlzLl9zZWN0aW9ucyA9IHNlY3Rpb25zLm1hcChmdW5jdGlvbiAocykge1xuICAgIGlmIChzLnVybCkge1xuICAgICAgLy8gVGhlIHVybCBmaWVsZCB3aWxsIHJlcXVpcmUgc3VwcG9ydCBmb3IgYXN5bmNocm9uaWNpdHkuXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvc291cmNlLW1hcC9pc3N1ZXMvMTZcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3VwcG9ydCBmb3IgdXJsIGZpZWxkIGluIHNlY3Rpb25zIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgICB9XG4gICAgdmFyIG9mZnNldCA9IHV0aWwuZ2V0QXJnKHMsICdvZmZzZXQnKTtcbiAgICB2YXIgb2Zmc2V0TGluZSA9IHV0aWwuZ2V0QXJnKG9mZnNldCwgJ2xpbmUnKTtcbiAgICB2YXIgb2Zmc2V0Q29sdW1uID0gdXRpbC5nZXRBcmcob2Zmc2V0LCAnY29sdW1uJyk7XG5cbiAgICBpZiAob2Zmc2V0TGluZSA8IGxhc3RPZmZzZXQubGluZSB8fFxuICAgICAgICAob2Zmc2V0TGluZSA9PT0gbGFzdE9mZnNldC5saW5lICYmIG9mZnNldENvbHVtbiA8IGxhc3RPZmZzZXQuY29sdW1uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZWN0aW9uIG9mZnNldHMgbXVzdCBiZSBvcmRlcmVkIGFuZCBub24tb3ZlcmxhcHBpbmcuJyk7XG4gICAgfVxuICAgIGxhc3RPZmZzZXQgPSBvZmZzZXQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZ2VuZXJhdGVkT2Zmc2V0OiB7XG4gICAgICAgIC8vIFRoZSBvZmZzZXQgZmllbGRzIGFyZSAwLWJhc2VkLCBidXQgd2UgdXNlIDEtYmFzZWQgaW5kaWNlcyB3aGVuXG4gICAgICAgIC8vIGVuY29kaW5nL2RlY29kaW5nIGZyb20gVkxRLlxuICAgICAgICBnZW5lcmF0ZWRMaW5lOiBvZmZzZXRMaW5lICsgMSxcbiAgICAgICAgZ2VuZXJhdGVkQ29sdW1uOiBvZmZzZXRDb2x1bW4gKyAxXG4gICAgICB9LFxuICAgICAgY29uc3VtZXI6IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLmdldEFyZyhzLCAnbWFwJyksIGFTb3VyY2VNYXBVUkwpXG4gICAgfVxuICB9KTtcbn1cblxuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlKTtcbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTb3VyY2VNYXBDb25zdW1lcjtcblxuLyoqXG4gKiBUaGUgdmVyc2lvbiBvZiB0aGUgc291cmNlIG1hcHBpbmcgc3BlYyB0aGF0IHdlIGFyZSBjb25zdW1pbmcuXG4gKi9cbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3ZlcnNpb24gPSAzO1xuXG4vKipcbiAqIFRoZSBsaXN0IG9mIG9yaWdpbmFsIHNvdXJjZXMuXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLCAnc291cmNlcycsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX3NlY3Rpb25zW2ldLmNvbnN1bWVyLnNvdXJjZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgc291cmNlcy5wdXNoKHRoaXMuX3NlY3Rpb25zW2ldLmNvbnN1bWVyLnNvdXJjZXNbal0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc291cmNlcztcbiAgfVxufSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgb3JpZ2luYWwgc291cmNlLCBsaW5lLCBhbmQgY29sdW1uIGluZm9ybWF0aW9uIGZvciB0aGUgZ2VuZXJhdGVkXG4gKiBzb3VyY2UncyBsaW5lIGFuZCBjb2x1bW4gcG9zaXRpb25zIHByb3ZpZGVkLiBUaGUgb25seSBhcmd1bWVudCBpcyBhbiBvYmplY3RcbiAqIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UuICBUaGUgbGluZSBudW1iZXJcbiAqICAgICBpcyAxLWJhc2VkLlxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UuICBUaGUgY29sdW1uXG4gKiAgICAgbnVtYmVyIGlzIDAtYmFzZWQuXG4gKlxuICogYW5kIGFuIG9iamVjdCBpcyByZXR1cm5lZCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqXG4gKiAgIC0gc291cmNlOiBUaGUgb3JpZ2luYWwgc291cmNlIGZpbGUsIG9yIG51bGwuXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UsIG9yIG51bGwuICBUaGVcbiAqICAgICBsaW5lIG51bWJlciBpcyAxLWJhc2VkLlxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxuICogICAgIGNvbHVtbiBudW1iZXIgaXMgMC1iYXNlZC5cbiAqICAgLSBuYW1lOiBUaGUgb3JpZ2luYWwgaWRlbnRpZmllciwgb3IgbnVsbC5cbiAqL1xuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5vcmlnaW5hbFBvc2l0aW9uRm9yID1cbiAgZnVuY3Rpb24gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyX29yaWdpbmFsUG9zaXRpb25Gb3IoYUFyZ3MpIHtcbiAgICB2YXIgbmVlZGxlID0ge1xuICAgICAgZ2VuZXJhdGVkTGluZTogdXRpbC5nZXRBcmcoYUFyZ3MsICdsaW5lJyksXG4gICAgICBnZW5lcmF0ZWRDb2x1bW46IHV0aWwuZ2V0QXJnKGFBcmdzLCAnY29sdW1uJylcbiAgICB9O1xuXG4gICAgLy8gRmluZCB0aGUgc2VjdGlvbiBjb250YWluaW5nIHRoZSBnZW5lcmF0ZWQgcG9zaXRpb24gd2UncmUgdHJ5aW5nIHRvIG1hcFxuICAgIC8vIHRvIGFuIG9yaWdpbmFsIHBvc2l0aW9uLlxuICAgIHZhciBzZWN0aW9uSW5kZXggPSBiaW5hcnlTZWFyY2guc2VhcmNoKG5lZWRsZSwgdGhpcy5fc2VjdGlvbnMsXG4gICAgICBmdW5jdGlvbihuZWVkbGUsIHNlY3Rpb24pIHtcbiAgICAgICAgdmFyIGNtcCA9IG5lZWRsZS5nZW5lcmF0ZWRMaW5lIC0gc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZTtcbiAgICAgICAgaWYgKGNtcCkge1xuICAgICAgICAgIHJldHVybiBjbXA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKG5lZWRsZS5nZW5lcmF0ZWRDb2x1bW4gLVxuICAgICAgICAgICAgICAgIHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZENvbHVtbik7XG4gICAgICB9KTtcbiAgICB2YXIgc2VjdGlvbiA9IHRoaXMuX3NlY3Rpb25zW3NlY3Rpb25JbmRleF07XG5cbiAgICBpZiAoIXNlY3Rpb24pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNvdXJjZTogbnVsbCxcbiAgICAgICAgbGluZTogbnVsbCxcbiAgICAgICAgY29sdW1uOiBudWxsLFxuICAgICAgICBuYW1lOiBudWxsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWN0aW9uLmNvbnN1bWVyLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xuICAgICAgbGluZTogbmVlZGxlLmdlbmVyYXRlZExpbmUgLVxuICAgICAgICAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSAtIDEpLFxuICAgICAgY29sdW1uOiBuZWVkbGUuZ2VuZXJhdGVkQ29sdW1uIC1cbiAgICAgICAgKHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZExpbmUgPT09IG5lZWRsZS5nZW5lcmF0ZWRMaW5lXG4gICAgICAgICA/IHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZENvbHVtbiAtIDFcbiAgICAgICAgIDogMCksXG4gICAgICBiaWFzOiBhQXJncy5iaWFzXG4gICAgfSk7XG4gIH07XG5cbi8qKlxuICogUmV0dXJuIHRydWUgaWYgd2UgaGF2ZSB0aGUgc291cmNlIGNvbnRlbnQgZm9yIGV2ZXJ5IHNvdXJjZSBpbiB0aGUgc291cmNlXG4gKiBtYXAsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5oYXNDb250ZW50c09mQWxsU291cmNlcyA9XG4gIGZ1bmN0aW9uIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcl9oYXNDb250ZW50c09mQWxsU291cmNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VjdGlvbnMuZXZlcnkoZnVuY3Rpb24gKHMpIHtcbiAgICAgIHJldHVybiBzLmNvbnN1bWVyLmhhc0NvbnRlbnRzT2ZBbGxTb3VyY2VzKCk7XG4gICAgfSk7XG4gIH07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgb3JpZ2luYWwgc291cmNlIGNvbnRlbnQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIHRoZSB1cmwgb2YgdGhlXG4gKiBvcmlnaW5hbCBzb3VyY2UgZmlsZS4gUmV0dXJucyBudWxsIGlmIG5vIG9yaWdpbmFsIHNvdXJjZSBjb250ZW50IGlzXG4gKiBhdmFpbGFibGUuXG4gKi9cbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuc291cmNlQ29udGVudEZvciA9XG4gIGZ1bmN0aW9uIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcl9zb3VyY2VDb250ZW50Rm9yKGFTb3VyY2UsIG51bGxPbk1pc3NpbmcpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc2VjdGlvbiA9IHRoaXMuX3NlY3Rpb25zW2ldO1xuXG4gICAgICB2YXIgY29udGVudCA9IHNlY3Rpb24uY29uc3VtZXIuc291cmNlQ29udGVudEZvcihhU291cmNlLCB0cnVlKTtcbiAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobnVsbE9uTWlzc2luZykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyBhU291cmNlICsgJ1wiIGlzIG5vdCBpbiB0aGUgU291cmNlTWFwLicpO1xuICAgIH1cbiAgfTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uIGluZm9ybWF0aW9uIGZvciB0aGUgb3JpZ2luYWwgc291cmNlLFxuICogbGluZSwgYW5kIGNvbHVtbiBwb3NpdGlvbnMgcHJvdmlkZWQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIG9iamVjdCB3aXRoXG4gKiB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKlxuICogICAtIHNvdXJjZTogVGhlIGZpbGVuYW1lIG9mIHRoZSBvcmlnaW5hbCBzb3VyY2UuXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UuICBUaGUgbGluZSBudW1iZXJcbiAqICAgICBpcyAxLWJhc2VkLlxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS4gIFRoZSBjb2x1bW5cbiAqICAgICBudW1iZXIgaXMgMC1iYXNlZC5cbiAqXG4gKiBhbmQgYW4gb2JqZWN0IGlzIHJldHVybmVkIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuICBUaGVcbiAqICAgICBsaW5lIG51bWJlciBpcyAxLWJhc2VkLiBcbiAqICAgLSBjb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLCBvciBudWxsLlxuICogICAgIFRoZSBjb2x1bW4gbnVtYmVyIGlzIDAtYmFzZWQuXG4gKi9cbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuZ2VuZXJhdGVkUG9zaXRpb25Gb3IgPVxuICBmdW5jdGlvbiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXJfZ2VuZXJhdGVkUG9zaXRpb25Gb3IoYUFyZ3MpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc2VjdGlvbiA9IHRoaXMuX3NlY3Rpb25zW2ldO1xuXG4gICAgICAvLyBPbmx5IGNvbnNpZGVyIHRoaXMgc2VjdGlvbiBpZiB0aGUgcmVxdWVzdGVkIHNvdXJjZSBpcyBpbiB0aGUgbGlzdCBvZlxuICAgICAgLy8gc291cmNlcyBvZiB0aGUgY29uc3VtZXIuXG4gICAgICBpZiAoc2VjdGlvbi5jb25zdW1lci5fZmluZFNvdXJjZUluZGV4KHV0aWwuZ2V0QXJnKGFBcmdzLCAnc291cmNlJykpID09PSAtMSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBnZW5lcmF0ZWRQb3NpdGlvbiA9IHNlY3Rpb24uY29uc3VtZXIuZ2VuZXJhdGVkUG9zaXRpb25Gb3IoYUFyZ3MpO1xuICAgICAgaWYgKGdlbmVyYXRlZFBvc2l0aW9uKSB7XG4gICAgICAgIHZhciByZXQgPSB7XG4gICAgICAgICAgbGluZTogZ2VuZXJhdGVkUG9zaXRpb24ubGluZSArXG4gICAgICAgICAgICAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSAtIDEpLFxuICAgICAgICAgIGNvbHVtbjogZ2VuZXJhdGVkUG9zaXRpb24uY29sdW1uICtcbiAgICAgICAgICAgIChzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRMaW5lID09PSBnZW5lcmF0ZWRQb3NpdGlvbi5saW5lXG4gICAgICAgICAgICAgPyBzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRDb2x1bW4gLSAxXG4gICAgICAgICAgICAgOiAwKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBsaW5lOiBudWxsLFxuICAgICAgY29sdW1uOiBudWxsXG4gICAgfTtcbiAgfTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgbWFwcGluZ3MgaW4gYSBzdHJpbmcgaW4gdG8gYSBkYXRhIHN0cnVjdHVyZSB3aGljaCB3ZSBjYW4gZWFzaWx5XG4gKiBxdWVyeSAodGhlIG9yZGVyZWQgYXJyYXlzIGluIHRoZSBgdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzYCBhbmRcbiAqIGB0aGlzLl9fb3JpZ2luYWxNYXBwaW5nc2AgcHJvcGVydGllcykuXG4gKi9cbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3BhcnNlTWFwcGluZ3MgPVxuICBmdW5jdGlvbiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXJfcGFyc2VNYXBwaW5ncyhhU3RyLCBhU291cmNlUm9vdCkge1xuICAgIHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5ncyA9IFtdO1xuICAgIHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9zZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNlY3Rpb24gPSB0aGlzLl9zZWN0aW9uc1tpXTtcbiAgICAgIHZhciBzZWN0aW9uTWFwcGluZ3MgPSBzZWN0aW9uLmNvbnN1bWVyLl9nZW5lcmF0ZWRNYXBwaW5ncztcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VjdGlvbk1hcHBpbmdzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBtYXBwaW5nID0gc2VjdGlvbk1hcHBpbmdzW2pdO1xuXG4gICAgICAgIHZhciBzb3VyY2UgPSBzZWN0aW9uLmNvbnN1bWVyLl9zb3VyY2VzLmF0KG1hcHBpbmcuc291cmNlKTtcbiAgICAgICAgc291cmNlID0gdXRpbC5jb21wdXRlU291cmNlVVJMKHNlY3Rpb24uY29uc3VtZXIuc291cmNlUm9vdCwgc291cmNlLCB0aGlzLl9zb3VyY2VNYXBVUkwpO1xuICAgICAgICB0aGlzLl9zb3VyY2VzLmFkZChzb3VyY2UpO1xuICAgICAgICBzb3VyY2UgPSB0aGlzLl9zb3VyY2VzLmluZGV4T2Yoc291cmNlKTtcblxuICAgICAgICB2YXIgbmFtZSA9IG51bGw7XG4gICAgICAgIGlmIChtYXBwaW5nLm5hbWUpIHtcbiAgICAgICAgICBuYW1lID0gc2VjdGlvbi5jb25zdW1lci5fbmFtZXMuYXQobWFwcGluZy5uYW1lKTtcbiAgICAgICAgICB0aGlzLl9uYW1lcy5hZGQobmFtZSk7XG4gICAgICAgICAgbmFtZSA9IHRoaXMuX25hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgbWFwcGluZ3MgY29taW5nIGZyb20gdGhlIGNvbnN1bWVyIGZvciB0aGUgc2VjdGlvbiBoYXZlXG4gICAgICAgIC8vIGdlbmVyYXRlZCBwb3NpdGlvbnMgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0IG9mIHRoZSBzZWN0aW9uLCBzbyB3ZVxuICAgICAgICAvLyBuZWVkIHRvIG9mZnNldCB0aGVtIHRvIGJlIHJlbGF0aXZlIHRvIHRoZSBzdGFydCBvZiB0aGUgY29uY2F0ZW5hdGVkXG4gICAgICAgIC8vIGdlbmVyYXRlZCBmaWxlLlxuICAgICAgICB2YXIgYWRqdXN0ZWRNYXBwaW5nID0ge1xuICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgIGdlbmVyYXRlZExpbmU6IG1hcHBpbmcuZ2VuZXJhdGVkTGluZSArXG4gICAgICAgICAgICAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSAtIDEpLFxuICAgICAgICAgIGdlbmVyYXRlZENvbHVtbjogbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4gK1xuICAgICAgICAgICAgKHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZExpbmUgPT09IG1hcHBpbmcuZ2VuZXJhdGVkTGluZVxuICAgICAgICAgICAgPyBzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRDb2x1bW4gLSAxXG4gICAgICAgICAgICA6IDApLFxuICAgICAgICAgIG9yaWdpbmFsTGluZTogbWFwcGluZy5vcmlnaW5hbExpbmUsXG4gICAgICAgICAgb3JpZ2luYWxDb2x1bW46IG1hcHBpbmcub3JpZ2luYWxDb2x1bW4sXG4gICAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5ncy5wdXNoKGFkanVzdGVkTWFwcGluZyk7XG4gICAgICAgIGlmICh0eXBlb2YgYWRqdXN0ZWRNYXBwaW5nLm9yaWdpbmFsTGluZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICB0aGlzLl9fb3JpZ2luYWxNYXBwaW5ncy5wdXNoKGFkanVzdGVkTWFwcGluZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBxdWlja1NvcnQodGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzLCB1dGlsLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0RlZmxhdGVkKTtcbiAgICBxdWlja1NvcnQodGhpcy5fX29yaWdpbmFsTWFwcGluZ3MsIHV0aWwuY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMpO1xuICB9O1xuXG5leHBvcnRzLkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lciA9IEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcjtcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cbi8qXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXG4gKi9cblxudmFyIFNvdXJjZU1hcEdlbmVyYXRvciA9IHJlcXVpcmUoJy4vc291cmNlLW1hcC1nZW5lcmF0b3InKS5Tb3VyY2VNYXBHZW5lcmF0b3I7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG4vLyBNYXRjaGVzIGEgV2luZG93cy1zdHlsZSBgXFxyXFxuYCBuZXdsaW5lIG9yIGEgYFxcbmAgbmV3bGluZSB1c2VkIGJ5IGFsbCBvdGhlclxuLy8gb3BlcmF0aW5nIHN5c3RlbXMgdGhlc2UgZGF5cyAoY2FwdHVyaW5nIHRoZSByZXN1bHQpLlxudmFyIFJFR0VYX05FV0xJTkUgPSAvKFxccj9cXG4pLztcblxuLy8gTmV3bGluZSBjaGFyYWN0ZXIgY29kZSBmb3IgY2hhckNvZGVBdCgpIGNvbXBhcmlzb25zXG52YXIgTkVXTElORV9DT0RFID0gMTA7XG5cbi8vIFByaXZhdGUgc3ltYm9sIGZvciBpZGVudGlmeWluZyBgU291cmNlTm9kZWBzIHdoZW4gbXVsdGlwbGUgdmVyc2lvbnMgb2Zcbi8vIHRoZSBzb3VyY2UtbWFwIGxpYnJhcnkgYXJlIGxvYWRlZC4gVGhpcyBNVVNUIE5PVCBDSEFOR0UgYWNyb3NzXG4vLyB2ZXJzaW9ucyFcbnZhciBpc1NvdXJjZU5vZGUgPSBcIiQkJGlzU291cmNlTm9kZSQkJFwiO1xuXG4vKipcbiAqIFNvdXJjZU5vZGVzIHByb3ZpZGUgYSB3YXkgdG8gYWJzdHJhY3Qgb3ZlciBpbnRlcnBvbGF0aW5nL2NvbmNhdGVuYXRpbmdcbiAqIHNuaXBwZXRzIG9mIGdlbmVyYXRlZCBKYXZhU2NyaXB0IHNvdXJjZSBjb2RlIHdoaWxlIG1haW50YWluaW5nIHRoZSBsaW5lIGFuZFxuICogY29sdW1uIGluZm9ybWF0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGUgb3JpZ2luYWwgc291cmNlIGNvZGUuXG4gKlxuICogQHBhcmFtIGFMaW5lIFRoZSBvcmlnaW5hbCBsaW5lIG51bWJlci5cbiAqIEBwYXJhbSBhQ29sdW1uIFRoZSBvcmlnaW5hbCBjb2x1bW4gbnVtYmVyLlxuICogQHBhcmFtIGFTb3VyY2UgVGhlIG9yaWdpbmFsIHNvdXJjZSdzIGZpbGVuYW1lLlxuICogQHBhcmFtIGFDaHVua3MgT3B0aW9uYWwuIEFuIGFycmF5IG9mIHN0cmluZ3Mgd2hpY2ggYXJlIHNuaXBwZXRzIG9mXG4gKiAgICAgICAgZ2VuZXJhdGVkIEpTLCBvciBvdGhlciBTb3VyY2VOb2Rlcy5cbiAqIEBwYXJhbSBhTmFtZSBUaGUgb3JpZ2luYWwgaWRlbnRpZmllci5cbiAqL1xuZnVuY3Rpb24gU291cmNlTm9kZShhTGluZSwgYUNvbHVtbiwgYVNvdXJjZSwgYUNodW5rcywgYU5hbWUpIHtcbiAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICB0aGlzLnNvdXJjZUNvbnRlbnRzID0ge307XG4gIHRoaXMubGluZSA9IGFMaW5lID09IG51bGwgPyBudWxsIDogYUxpbmU7XG4gIHRoaXMuY29sdW1uID0gYUNvbHVtbiA9PSBudWxsID8gbnVsbCA6IGFDb2x1bW47XG4gIHRoaXMuc291cmNlID0gYVNvdXJjZSA9PSBudWxsID8gbnVsbCA6IGFTb3VyY2U7XG4gIHRoaXMubmFtZSA9IGFOYW1lID09IG51bGwgPyBudWxsIDogYU5hbWU7XG4gIHRoaXNbaXNTb3VyY2VOb2RlXSA9IHRydWU7XG4gIGlmIChhQ2h1bmtzICE9IG51bGwpIHRoaXMuYWRkKGFDaHVua3MpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBTb3VyY2VOb2RlIGZyb20gZ2VuZXJhdGVkIGNvZGUgYW5kIGEgU291cmNlTWFwQ29uc3VtZXIuXG4gKlxuICogQHBhcmFtIGFHZW5lcmF0ZWRDb2RlIFRoZSBnZW5lcmF0ZWQgY29kZVxuICogQHBhcmFtIGFTb3VyY2VNYXBDb25zdW1lciBUaGUgU291cmNlTWFwIGZvciB0aGUgZ2VuZXJhdGVkIGNvZGVcbiAqIEBwYXJhbSBhUmVsYXRpdmVQYXRoIE9wdGlvbmFsLiBUaGUgcGF0aCB0aGF0IHJlbGF0aXZlIHNvdXJjZXMgaW4gdGhlXG4gKiAgICAgICAgU291cmNlTWFwQ29uc3VtZXIgc2hvdWxkIGJlIHJlbGF0aXZlIHRvLlxuICovXG5Tb3VyY2VOb2RlLmZyb21TdHJpbmdXaXRoU291cmNlTWFwID1cbiAgZnVuY3Rpb24gU291cmNlTm9kZV9mcm9tU3RyaW5nV2l0aFNvdXJjZU1hcChhR2VuZXJhdGVkQ29kZSwgYVNvdXJjZU1hcENvbnN1bWVyLCBhUmVsYXRpdmVQYXRoKSB7XG4gICAgLy8gVGhlIFNvdXJjZU5vZGUgd2Ugd2FudCB0byBmaWxsIHdpdGggdGhlIGdlbmVyYXRlZCBjb2RlXG4gICAgLy8gYW5kIHRoZSBTb3VyY2VNYXBcbiAgICB2YXIgbm9kZSA9IG5ldyBTb3VyY2VOb2RlKCk7XG5cbiAgICAvLyBBbGwgZXZlbiBpbmRpY2VzIG9mIHRoaXMgYXJyYXkgYXJlIG9uZSBsaW5lIG9mIHRoZSBnZW5lcmF0ZWQgY29kZSxcbiAgICAvLyB3aGlsZSBhbGwgb2RkIGluZGljZXMgYXJlIHRoZSBuZXdsaW5lcyBiZXR3ZWVuIHR3byBhZGphY2VudCBsaW5lc1xuICAgIC8vIChzaW5jZSBgUkVHRVhfTkVXTElORWAgY2FwdHVyZXMgaXRzIG1hdGNoKS5cbiAgICAvLyBQcm9jZXNzZWQgZnJhZ21lbnRzIGFyZSBhY2Nlc3NlZCBieSBjYWxsaW5nIGBzaGlmdE5leHRMaW5lYC5cbiAgICB2YXIgcmVtYWluaW5nTGluZXMgPSBhR2VuZXJhdGVkQ29kZS5zcGxpdChSRUdFWF9ORVdMSU5FKTtcbiAgICB2YXIgcmVtYWluaW5nTGluZXNJbmRleCA9IDA7XG4gICAgdmFyIHNoaWZ0TmV4dExpbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsaW5lQ29udGVudHMgPSBnZXROZXh0TGluZSgpO1xuICAgICAgLy8gVGhlIGxhc3QgbGluZSBvZiBhIGZpbGUgbWlnaHQgbm90IGhhdmUgYSBuZXdsaW5lLlxuICAgICAgdmFyIG5ld0xpbmUgPSBnZXROZXh0TGluZSgpIHx8IFwiXCI7XG4gICAgICByZXR1cm4gbGluZUNvbnRlbnRzICsgbmV3TGluZTtcblxuICAgICAgZnVuY3Rpb24gZ2V0TmV4dExpbmUoKSB7XG4gICAgICAgIHJldHVybiByZW1haW5pbmdMaW5lc0luZGV4IDwgcmVtYWluaW5nTGluZXMubGVuZ3RoID9cbiAgICAgICAgICAgIHJlbWFpbmluZ0xpbmVzW3JlbWFpbmluZ0xpbmVzSW5kZXgrK10gOiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFdlIG5lZWQgdG8gcmVtZW1iZXIgdGhlIHBvc2l0aW9uIG9mIFwicmVtYWluaW5nTGluZXNcIlxuICAgIHZhciBsYXN0R2VuZXJhdGVkTGluZSA9IDEsIGxhc3RHZW5lcmF0ZWRDb2x1bW4gPSAwO1xuXG4gICAgLy8gVGhlIGdlbmVyYXRlIFNvdXJjZU5vZGVzIHdlIG5lZWQgYSBjb2RlIHJhbmdlLlxuICAgIC8vIFRvIGV4dHJhY3QgaXQgY3VycmVudCBhbmQgbGFzdCBtYXBwaW5nIGlzIHVzZWQuXG4gICAgLy8gSGVyZSB3ZSBzdG9yZSB0aGUgbGFzdCBtYXBwaW5nLlxuICAgIHZhciBsYXN0TWFwcGluZyA9IG51bGw7XG5cbiAgICBhU291cmNlTWFwQ29uc3VtZXIuZWFjaE1hcHBpbmcoZnVuY3Rpb24gKG1hcHBpbmcpIHtcbiAgICAgIGlmIChsYXN0TWFwcGluZyAhPT0gbnVsbCkge1xuICAgICAgICAvLyBXZSBhZGQgdGhlIGNvZGUgZnJvbSBcImxhc3RNYXBwaW5nXCIgdG8gXCJtYXBwaW5nXCI6XG4gICAgICAgIC8vIEZpcnN0IGNoZWNrIGlmIHRoZXJlIGlzIGEgbmV3IGxpbmUgaW4gYmV0d2Vlbi5cbiAgICAgICAgaWYgKGxhc3RHZW5lcmF0ZWRMaW5lIDwgbWFwcGluZy5nZW5lcmF0ZWRMaW5lKSB7XG4gICAgICAgICAgLy8gQXNzb2NpYXRlIGZpcnN0IGxpbmUgd2l0aCBcImxhc3RNYXBwaW5nXCJcbiAgICAgICAgICBhZGRNYXBwaW5nV2l0aENvZGUobGFzdE1hcHBpbmcsIHNoaWZ0TmV4dExpbmUoKSk7XG4gICAgICAgICAgbGFzdEdlbmVyYXRlZExpbmUrKztcbiAgICAgICAgICBsYXN0R2VuZXJhdGVkQ29sdW1uID0gMDtcbiAgICAgICAgICAvLyBUaGUgcmVtYWluaW5nIGNvZGUgaXMgYWRkZWQgd2l0aG91dCBtYXBwaW5nXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVGhlcmUgaXMgbm8gbmV3IGxpbmUgaW4gYmV0d2Vlbi5cbiAgICAgICAgICAvLyBBc3NvY2lhdGUgdGhlIGNvZGUgYmV0d2VlbiBcImxhc3RHZW5lcmF0ZWRDb2x1bW5cIiBhbmRcbiAgICAgICAgICAvLyBcIm1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uXCIgd2l0aCBcImxhc3RNYXBwaW5nXCJcbiAgICAgICAgICB2YXIgbmV4dExpbmUgPSByZW1haW5pbmdMaW5lc1tyZW1haW5pbmdMaW5lc0luZGV4XSB8fCAnJztcbiAgICAgICAgICB2YXIgY29kZSA9IG5leHRMaW5lLnN1YnN0cigwLCBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbiAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEdlbmVyYXRlZENvbHVtbik7XG4gICAgICAgICAgcmVtYWluaW5nTGluZXNbcmVtYWluaW5nTGluZXNJbmRleF0gPSBuZXh0TGluZS5zdWJzdHIobWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4gLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RHZW5lcmF0ZWRDb2x1bW4pO1xuICAgICAgICAgIGxhc3RHZW5lcmF0ZWRDb2x1bW4gPSBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbjtcbiAgICAgICAgICBhZGRNYXBwaW5nV2l0aENvZGUobGFzdE1hcHBpbmcsIGNvZGUpO1xuICAgICAgICAgIC8vIE5vIG1vcmUgcmVtYWluaW5nIGNvZGUsIGNvbnRpbnVlXG4gICAgICAgICAgbGFzdE1hcHBpbmcgPSBtYXBwaW5nO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gV2UgYWRkIHRoZSBnZW5lcmF0ZWQgY29kZSB1bnRpbCB0aGUgZmlyc3QgbWFwcGluZ1xuICAgICAgLy8gdG8gdGhlIFNvdXJjZU5vZGUgd2l0aG91dCBhbnkgbWFwcGluZy5cbiAgICAgIC8vIEVhY2ggbGluZSBpcyBhZGRlZCBhcyBzZXBhcmF0ZSBzdHJpbmcuXG4gICAgICB3aGlsZSAobGFzdEdlbmVyYXRlZExpbmUgPCBtYXBwaW5nLmdlbmVyYXRlZExpbmUpIHtcbiAgICAgICAgbm9kZS5hZGQoc2hpZnROZXh0TGluZSgpKTtcbiAgICAgICAgbGFzdEdlbmVyYXRlZExpbmUrKztcbiAgICAgIH1cbiAgICAgIGlmIChsYXN0R2VuZXJhdGVkQ29sdW1uIDwgbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4pIHtcbiAgICAgICAgdmFyIG5leHRMaW5lID0gcmVtYWluaW5nTGluZXNbcmVtYWluaW5nTGluZXNJbmRleF0gfHwgJyc7XG4gICAgICAgIG5vZGUuYWRkKG5leHRMaW5lLnN1YnN0cigwLCBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbikpO1xuICAgICAgICByZW1haW5pbmdMaW5lc1tyZW1haW5pbmdMaW5lc0luZGV4XSA9IG5leHRMaW5lLnN1YnN0cihtYXBwaW5nLmdlbmVyYXRlZENvbHVtbik7XG4gICAgICAgIGxhc3RHZW5lcmF0ZWRDb2x1bW4gPSBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbjtcbiAgICAgIH1cbiAgICAgIGxhc3RNYXBwaW5nID0gbWFwcGluZztcbiAgICB9LCB0aGlzKTtcbiAgICAvLyBXZSBoYXZlIHByb2Nlc3NlZCBhbGwgbWFwcGluZ3MuXG4gICAgaWYgKHJlbWFpbmluZ0xpbmVzSW5kZXggPCByZW1haW5pbmdMaW5lcy5sZW5ndGgpIHtcbiAgICAgIGlmIChsYXN0TWFwcGluZykge1xuICAgICAgICAvLyBBc3NvY2lhdGUgdGhlIHJlbWFpbmluZyBjb2RlIGluIHRoZSBjdXJyZW50IGxpbmUgd2l0aCBcImxhc3RNYXBwaW5nXCJcbiAgICAgICAgYWRkTWFwcGluZ1dpdGhDb2RlKGxhc3RNYXBwaW5nLCBzaGlmdE5leHRMaW5lKCkpO1xuICAgICAgfVxuICAgICAgLy8gYW5kIGFkZCB0aGUgcmVtYWluaW5nIGxpbmVzIHdpdGhvdXQgYW55IG1hcHBpbmdcbiAgICAgIG5vZGUuYWRkKHJlbWFpbmluZ0xpbmVzLnNwbGljZShyZW1haW5pbmdMaW5lc0luZGV4KS5qb2luKFwiXCIpKTtcbiAgICB9XG5cbiAgICAvLyBDb3B5IHNvdXJjZXNDb250ZW50IGludG8gU291cmNlTm9kZVxuICAgIGFTb3VyY2VNYXBDb25zdW1lci5zb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZUZpbGUpIHtcbiAgICAgIHZhciBjb250ZW50ID0gYVNvdXJjZU1hcENvbnN1bWVyLnNvdXJjZUNvbnRlbnRGb3Ioc291cmNlRmlsZSk7XG4gICAgICBpZiAoY29udGVudCAhPSBudWxsKSB7XG4gICAgICAgIGlmIChhUmVsYXRpdmVQYXRoICE9IG51bGwpIHtcbiAgICAgICAgICBzb3VyY2VGaWxlID0gdXRpbC5qb2luKGFSZWxhdGl2ZVBhdGgsIHNvdXJjZUZpbGUpO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUuc2V0U291cmNlQ29udGVudChzb3VyY2VGaWxlLCBjb250ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBub2RlO1xuXG4gICAgZnVuY3Rpb24gYWRkTWFwcGluZ1dpdGhDb2RlKG1hcHBpbmcsIGNvZGUpIHtcbiAgICAgIGlmIChtYXBwaW5nID09PSBudWxsIHx8IG1hcHBpbmcuc291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbm9kZS5hZGQoY29kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc291cmNlID0gYVJlbGF0aXZlUGF0aFxuICAgICAgICAgID8gdXRpbC5qb2luKGFSZWxhdGl2ZVBhdGgsIG1hcHBpbmcuc291cmNlKVxuICAgICAgICAgIDogbWFwcGluZy5zb3VyY2U7XG4gICAgICAgIG5vZGUuYWRkKG5ldyBTb3VyY2VOb2RlKG1hcHBpbmcub3JpZ2luYWxMaW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcHBpbmcubmFtZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuLyoqXG4gKiBBZGQgYSBjaHVuayBvZiBnZW5lcmF0ZWQgSlMgdG8gdGhpcyBzb3VyY2Ugbm9kZS5cbiAqXG4gKiBAcGFyYW0gYUNodW5rIEEgc3RyaW5nIHNuaXBwZXQgb2YgZ2VuZXJhdGVkIEpTIGNvZGUsIGFub3RoZXIgaW5zdGFuY2Ugb2ZcbiAqICAgICAgICBTb3VyY2VOb2RlLCBvciBhbiBhcnJheSB3aGVyZSBlYWNoIG1lbWJlciBpcyBvbmUgb2YgdGhvc2UgdGhpbmdzLlxuICovXG5Tb3VyY2VOb2RlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBTb3VyY2VOb2RlX2FkZChhQ2h1bmspIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYUNodW5rKSkge1xuICAgIGFDaHVuay5mb3JFYWNoKGZ1bmN0aW9uIChjaHVuaykge1xuICAgICAgdGhpcy5hZGQoY2h1bmspO1xuICAgIH0sIHRoaXMpO1xuICB9XG4gIGVsc2UgaWYgKGFDaHVua1tpc1NvdXJjZU5vZGVdIHx8IHR5cGVvZiBhQ2h1bmsgPT09IFwic3RyaW5nXCIpIHtcbiAgICBpZiAoYUNodW5rKSB7XG4gICAgICB0aGlzLmNoaWxkcmVuLnB1c2goYUNodW5rKTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgIFwiRXhwZWN0ZWQgYSBTb3VyY2VOb2RlLCBzdHJpbmcsIG9yIGFuIGFycmF5IG9mIFNvdXJjZU5vZGVzIGFuZCBzdHJpbmdzLiBHb3QgXCIgKyBhQ2h1bmtcbiAgICApO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGQgYSBjaHVuayBvZiBnZW5lcmF0ZWQgSlMgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGlzIHNvdXJjZSBub2RlLlxuICpcbiAqIEBwYXJhbSBhQ2h1bmsgQSBzdHJpbmcgc25pcHBldCBvZiBnZW5lcmF0ZWQgSlMgY29kZSwgYW5vdGhlciBpbnN0YW5jZSBvZlxuICogICAgICAgIFNvdXJjZU5vZGUsIG9yIGFuIGFycmF5IHdoZXJlIGVhY2ggbWVtYmVyIGlzIG9uZSBvZiB0aG9zZSB0aGluZ3MuXG4gKi9cblNvdXJjZU5vZGUucHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbiBTb3VyY2VOb2RlX3ByZXBlbmQoYUNodW5rKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFDaHVuaykpIHtcbiAgICBmb3IgKHZhciBpID0gYUNodW5rLmxlbmd0aC0xOyBpID49IDA7IGktLSkge1xuICAgICAgdGhpcy5wcmVwZW5kKGFDaHVua1tpXSk7XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGFDaHVua1tpc1NvdXJjZU5vZGVdIHx8IHR5cGVvZiBhQ2h1bmsgPT09IFwic3RyaW5nXCIpIHtcbiAgICB0aGlzLmNoaWxkcmVuLnVuc2hpZnQoYUNodW5rKTtcbiAgfVxuICBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgXCJFeHBlY3RlZCBhIFNvdXJjZU5vZGUsIHN0cmluZywgb3IgYW4gYXJyYXkgb2YgU291cmNlTm9kZXMgYW5kIHN0cmluZ3MuIEdvdCBcIiArIGFDaHVua1xuICAgICk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdhbGsgb3ZlciB0aGUgdHJlZSBvZiBKUyBzbmlwcGV0cyBpbiB0aGlzIG5vZGUgYW5kIGl0cyBjaGlsZHJlbi4gVGhlXG4gKiB3YWxraW5nIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbmNlIGZvciBlYWNoIHNuaXBwZXQgb2YgSlMgYW5kIGlzIHBhc3NlZCB0aGF0XG4gKiBzbmlwcGV0IGFuZCB0aGUgaXRzIG9yaWdpbmFsIGFzc29jaWF0ZWQgc291cmNlJ3MgbGluZS9jb2x1bW4gbG9jYXRpb24uXG4gKlxuICogQHBhcmFtIGFGbiBUaGUgdHJhdmVyc2FsIGZ1bmN0aW9uLlxuICovXG5Tb3VyY2VOb2RlLnByb3RvdHlwZS53YWxrID0gZnVuY3Rpb24gU291cmNlTm9kZV93YWxrKGFGbikge1xuICB2YXIgY2h1bms7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY2h1bmsgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgIGlmIChjaHVua1tpc1NvdXJjZU5vZGVdKSB7XG4gICAgICBjaHVuay53YWxrKGFGbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKGNodW5rICE9PSAnJykge1xuICAgICAgICBhRm4oY2h1bmssIHsgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMubGluZSxcbiAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIExpa2UgYFN0cmluZy5wcm90b3R5cGUuam9pbmAgZXhjZXB0IGZvciBTb3VyY2VOb2Rlcy4gSW5zZXJ0cyBgYVN0cmAgYmV0d2VlblxuICogZWFjaCBvZiBgdGhpcy5jaGlsZHJlbmAuXG4gKlxuICogQHBhcmFtIGFTZXAgVGhlIHNlcGFyYXRvci5cbiAqL1xuU291cmNlTm9kZS5wcm90b3R5cGUuam9pbiA9IGZ1bmN0aW9uIFNvdXJjZU5vZGVfam9pbihhU2VwKSB7XG4gIHZhciBuZXdDaGlsZHJlbjtcbiAgdmFyIGk7XG4gIHZhciBsZW4gPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgaWYgKGxlbiA+IDApIHtcbiAgICBuZXdDaGlsZHJlbiA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW4tMTsgaSsrKSB7XG4gICAgICBuZXdDaGlsZHJlbi5wdXNoKHRoaXMuY2hpbGRyZW5baV0pO1xuICAgICAgbmV3Q2hpbGRyZW4ucHVzaChhU2VwKTtcbiAgICB9XG4gICAgbmV3Q2hpbGRyZW4ucHVzaCh0aGlzLmNoaWxkcmVuW2ldKTtcbiAgICB0aGlzLmNoaWxkcmVuID0gbmV3Q2hpbGRyZW47XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGwgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlIG9uIHRoZSB2ZXJ5IHJpZ2h0LW1vc3Qgc291cmNlIHNuaXBwZXQuIFVzZWZ1bFxuICogZm9yIHRyaW1taW5nIHdoaXRlc3BhY2UgZnJvbSB0aGUgZW5kIG9mIGEgc291cmNlIG5vZGUsIGV0Yy5cbiAqXG4gKiBAcGFyYW0gYVBhdHRlcm4gVGhlIHBhdHRlcm4gdG8gcmVwbGFjZS5cbiAqIEBwYXJhbSBhUmVwbGFjZW1lbnQgVGhlIHRoaW5nIHRvIHJlcGxhY2UgdGhlIHBhdHRlcm4gd2l0aC5cbiAqL1xuU291cmNlTm9kZS5wcm90b3R5cGUucmVwbGFjZVJpZ2h0ID0gZnVuY3Rpb24gU291cmNlTm9kZV9yZXBsYWNlUmlnaHQoYVBhdHRlcm4sIGFSZXBsYWNlbWVudCkge1xuICB2YXIgbGFzdENoaWxkID0gdGhpcy5jaGlsZHJlblt0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xuICBpZiAobGFzdENoaWxkW2lzU291cmNlTm9kZV0pIHtcbiAgICBsYXN0Q2hpbGQucmVwbGFjZVJpZ2h0KGFQYXR0ZXJuLCBhUmVwbGFjZW1lbnQpO1xuICB9XG4gIGVsc2UgaWYgKHR5cGVvZiBsYXN0Q2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgdGhpcy5jaGlsZHJlblt0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDFdID0gbGFzdENoaWxkLnJlcGxhY2UoYVBhdHRlcm4sIGFSZXBsYWNlbWVudCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5jaGlsZHJlbi5wdXNoKCcnLnJlcGxhY2UoYVBhdHRlcm4sIGFSZXBsYWNlbWVudCkpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIHNvdXJjZSBjb250ZW50IGZvciBhIHNvdXJjZSBmaWxlLiBUaGlzIHdpbGwgYmUgYWRkZWQgdG8gdGhlIFNvdXJjZU1hcEdlbmVyYXRvclxuICogaW4gdGhlIHNvdXJjZXNDb250ZW50IGZpZWxkLlxuICpcbiAqIEBwYXJhbSBhU291cmNlRmlsZSBUaGUgZmlsZW5hbWUgb2YgdGhlIHNvdXJjZSBmaWxlXG4gKiBAcGFyYW0gYVNvdXJjZUNvbnRlbnQgVGhlIGNvbnRlbnQgb2YgdGhlIHNvdXJjZSBmaWxlXG4gKi9cblNvdXJjZU5vZGUucHJvdG90eXBlLnNldFNvdXJjZUNvbnRlbnQgPVxuICBmdW5jdGlvbiBTb3VyY2VOb2RlX3NldFNvdXJjZUNvbnRlbnQoYVNvdXJjZUZpbGUsIGFTb3VyY2VDb250ZW50KSB7XG4gICAgdGhpcy5zb3VyY2VDb250ZW50c1t1dGlsLnRvU2V0U3RyaW5nKGFTb3VyY2VGaWxlKV0gPSBhU291cmNlQ29udGVudDtcbiAgfTtcblxuLyoqXG4gKiBXYWxrIG92ZXIgdGhlIHRyZWUgb2YgU291cmNlTm9kZXMuIFRoZSB3YWxraW5nIGZ1bmN0aW9uIGlzIGNhbGxlZCBmb3IgZWFjaFxuICogc291cmNlIGZpbGUgY29udGVudCBhbmQgaXMgcGFzc2VkIHRoZSBmaWxlbmFtZSBhbmQgc291cmNlIGNvbnRlbnQuXG4gKlxuICogQHBhcmFtIGFGbiBUaGUgdHJhdmVyc2FsIGZ1bmN0aW9uLlxuICovXG5Tb3VyY2VOb2RlLnByb3RvdHlwZS53YWxrU291cmNlQ29udGVudHMgPVxuICBmdW5jdGlvbiBTb3VyY2VOb2RlX3dhbGtTb3VyY2VDb250ZW50cyhhRm4pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKHRoaXMuY2hpbGRyZW5baV1baXNTb3VyY2VOb2RlXSkge1xuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLndhbGtTb3VyY2VDb250ZW50cyhhRm4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzb3VyY2VzID0gT2JqZWN0LmtleXModGhpcy5zb3VyY2VDb250ZW50cyk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNvdXJjZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFGbih1dGlsLmZyb21TZXRTdHJpbmcoc291cmNlc1tpXSksIHRoaXMuc291cmNlQ29udGVudHNbc291cmNlc1tpXV0pO1xuICAgIH1cbiAgfTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHNvdXJjZSBub2RlLiBXYWxrcyBvdmVyIHRoZSB0cmVlXG4gKiBhbmQgY29uY2F0ZW5hdGVzIGFsbCB0aGUgdmFyaW91cyBzbmlwcGV0cyB0b2dldGhlciB0byBvbmUgc3RyaW5nLlxuICovXG5Tb3VyY2VOb2RlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIFNvdXJjZU5vZGVfdG9TdHJpbmcoKSB7XG4gIHZhciBzdHIgPSBcIlwiO1xuICB0aGlzLndhbGsoZnVuY3Rpb24gKGNodW5rKSB7XG4gICAgc3RyICs9IGNodW5rO1xuICB9KTtcbiAgcmV0dXJuIHN0cjtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgc291cmNlIG5vZGUgYWxvbmcgd2l0aCBhIHNvdXJjZVxuICogbWFwLlxuICovXG5Tb3VyY2VOb2RlLnByb3RvdHlwZS50b1N0cmluZ1dpdGhTb3VyY2VNYXAgPSBmdW5jdGlvbiBTb3VyY2VOb2RlX3RvU3RyaW5nV2l0aFNvdXJjZU1hcChhQXJncykge1xuICB2YXIgZ2VuZXJhdGVkID0ge1xuICAgIGNvZGU6IFwiXCIsXG4gICAgbGluZTogMSxcbiAgICBjb2x1bW46IDBcbiAgfTtcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3IoYUFyZ3MpO1xuICB2YXIgc291cmNlTWFwcGluZ0FjdGl2ZSA9IGZhbHNlO1xuICB2YXIgbGFzdE9yaWdpbmFsU291cmNlID0gbnVsbDtcbiAgdmFyIGxhc3RPcmlnaW5hbExpbmUgPSBudWxsO1xuICB2YXIgbGFzdE9yaWdpbmFsQ29sdW1uID0gbnVsbDtcbiAgdmFyIGxhc3RPcmlnaW5hbE5hbWUgPSBudWxsO1xuICB0aGlzLndhbGsoZnVuY3Rpb24gKGNodW5rLCBvcmlnaW5hbCkge1xuICAgIGdlbmVyYXRlZC5jb2RlICs9IGNodW5rO1xuICAgIGlmIChvcmlnaW5hbC5zb3VyY2UgIT09IG51bGxcbiAgICAgICAgJiYgb3JpZ2luYWwubGluZSAhPT0gbnVsbFxuICAgICAgICAmJiBvcmlnaW5hbC5jb2x1bW4gIT09IG51bGwpIHtcbiAgICAgIGlmKGxhc3RPcmlnaW5hbFNvdXJjZSAhPT0gb3JpZ2luYWwuc291cmNlXG4gICAgICAgICB8fCBsYXN0T3JpZ2luYWxMaW5lICE9PSBvcmlnaW5hbC5saW5lXG4gICAgICAgICB8fCBsYXN0T3JpZ2luYWxDb2x1bW4gIT09IG9yaWdpbmFsLmNvbHVtblxuICAgICAgICAgfHwgbGFzdE9yaWdpbmFsTmFtZSAhPT0gb3JpZ2luYWwubmFtZSkge1xuICAgICAgICBtYXAuYWRkTWFwcGluZyh7XG4gICAgICAgICAgc291cmNlOiBvcmlnaW5hbC5zb3VyY2UsXG4gICAgICAgICAgb3JpZ2luYWw6IHtcbiAgICAgICAgICAgIGxpbmU6IG9yaWdpbmFsLmxpbmUsXG4gICAgICAgICAgICBjb2x1bW46IG9yaWdpbmFsLmNvbHVtblxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2VuZXJhdGVkOiB7XG4gICAgICAgICAgICBsaW5lOiBnZW5lcmF0ZWQubGluZSxcbiAgICAgICAgICAgIGNvbHVtbjogZ2VuZXJhdGVkLmNvbHVtblxuICAgICAgICAgIH0sXG4gICAgICAgICAgbmFtZTogb3JpZ2luYWwubmFtZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGxhc3RPcmlnaW5hbFNvdXJjZSA9IG9yaWdpbmFsLnNvdXJjZTtcbiAgICAgIGxhc3RPcmlnaW5hbExpbmUgPSBvcmlnaW5hbC5saW5lO1xuICAgICAgbGFzdE9yaWdpbmFsQ29sdW1uID0gb3JpZ2luYWwuY29sdW1uO1xuICAgICAgbGFzdE9yaWdpbmFsTmFtZSA9IG9yaWdpbmFsLm5hbWU7XG4gICAgICBzb3VyY2VNYXBwaW5nQWN0aXZlID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHNvdXJjZU1hcHBpbmdBY3RpdmUpIHtcbiAgICAgIG1hcC5hZGRNYXBwaW5nKHtcbiAgICAgICAgZ2VuZXJhdGVkOiB7XG4gICAgICAgICAgbGluZTogZ2VuZXJhdGVkLmxpbmUsXG4gICAgICAgICAgY29sdW1uOiBnZW5lcmF0ZWQuY29sdW1uXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbGFzdE9yaWdpbmFsU291cmNlID0gbnVsbDtcbiAgICAgIHNvdXJjZU1hcHBpbmdBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgZm9yICh2YXIgaWR4ID0gMCwgbGVuZ3RoID0gY2h1bmsubGVuZ3RoOyBpZHggPCBsZW5ndGg7IGlkeCsrKSB7XG4gICAgICBpZiAoY2h1bmsuY2hhckNvZGVBdChpZHgpID09PSBORVdMSU5FX0NPREUpIHtcbiAgICAgICAgZ2VuZXJhdGVkLmxpbmUrKztcbiAgICAgICAgZ2VuZXJhdGVkLmNvbHVtbiA9IDA7XG4gICAgICAgIC8vIE1hcHBpbmdzIGVuZCBhdCBlb2xcbiAgICAgICAgaWYgKGlkeCArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIGxhc3RPcmlnaW5hbFNvdXJjZSA9IG51bGw7XG4gICAgICAgICAgc291cmNlTWFwcGluZ0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZU1hcHBpbmdBY3RpdmUpIHtcbiAgICAgICAgICBtYXAuYWRkTWFwcGluZyh7XG4gICAgICAgICAgICBzb3VyY2U6IG9yaWdpbmFsLnNvdXJjZSxcbiAgICAgICAgICAgIG9yaWdpbmFsOiB7XG4gICAgICAgICAgICAgIGxpbmU6IG9yaWdpbmFsLmxpbmUsXG4gICAgICAgICAgICAgIGNvbHVtbjogb3JpZ2luYWwuY29sdW1uXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2VuZXJhdGVkOiB7XG4gICAgICAgICAgICAgIGxpbmU6IGdlbmVyYXRlZC5saW5lLFxuICAgICAgICAgICAgICBjb2x1bW46IGdlbmVyYXRlZC5jb2x1bW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYW1lOiBvcmlnaW5hbC5uYW1lXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdlbmVyYXRlZC5jb2x1bW4rKztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICB0aGlzLndhbGtTb3VyY2VDb250ZW50cyhmdW5jdGlvbiAoc291cmNlRmlsZSwgc291cmNlQ29udGVudCkge1xuICAgIG1hcC5zZXRTb3VyY2VDb250ZW50KHNvdXJjZUZpbGUsIHNvdXJjZUNvbnRlbnQpO1xuICB9KTtcblxuICByZXR1cm4geyBjb2RlOiBnZW5lcmF0ZWQuY29kZSwgbWFwOiBtYXAgfTtcbn07XG5cbmV4cG9ydHMuU291cmNlTm9kZSA9IFNvdXJjZU5vZGU7XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMDktMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0UudHh0IG9yOlxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxuICovXG5leHBvcnRzLlNvdXJjZU1hcEdlbmVyYXRvciA9IHJlcXVpcmUoJy4vbGliL3NvdXJjZS1tYXAtZ2VuZXJhdG9yJykuU291cmNlTWFwR2VuZXJhdG9yO1xuZXhwb3J0cy5Tb3VyY2VNYXBDb25zdW1lciA9IHJlcXVpcmUoJy4vbGliL3NvdXJjZS1tYXAtY29uc3VtZXInKS5Tb3VyY2VNYXBDb25zdW1lcjtcbmV4cG9ydHMuU291cmNlTm9kZSA9IHJlcXVpcmUoJy4vbGliL3NvdXJjZS1ub2RlJykuU291cmNlTm9kZTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vZGUvbm8tZGVwcmVjYXRlZC1hcGkgKi9cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG52YXIgaXNNb2Rlcm4gPSAoXG4gIHR5cGVvZiBCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gIHR5cGVvZiBCdWZmZXIuYWxsb2MgPT09ICdmdW5jdGlvbicgJiZcbiAgdHlwZW9mIEJ1ZmZlci5hbGxvY1Vuc2FmZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuICB0eXBlb2YgQnVmZmVyLmZyb20gPT09ICdmdW5jdGlvbidcbilcblxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlciAoaW5wdXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaW5wdXQpLnNsaWNlKDgsIC0xKSA9PT0gJ0FycmF5QnVmZmVyJ1xufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKG9iaiwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGJ5dGVPZmZzZXQgPj4+PSAwXG5cbiAgdmFyIG1heExlbmd0aCA9IG9iai5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldFxuXG4gIGlmIChtYXhMZW5ndGggPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCInb2Zmc2V0JyBpcyBvdXQgb2YgYm91bmRzXCIpXG4gIH1cblxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSBtYXhMZW5ndGhcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPj4+PSAwXG5cbiAgICBpZiAobGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIidsZW5ndGgnIGlzIG91dCBvZiBib3VuZHNcIilcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaXNNb2Rlcm5cbiAgICA/IEJ1ZmZlci5mcm9tKG9iai5zbGljZShieXRlT2Zmc2V0LCBieXRlT2Zmc2V0ICsgbGVuZ3RoKSlcbiAgICA6IG5ldyBCdWZmZXIobmV3IFVpbnQ4QXJyYXkob2JqLnNsaWNlKGJ5dGVPZmZzZXQsIGJ5dGVPZmZzZXQgKyBsZW5ndGgpKSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpXG4gIH1cblxuICByZXR1cm4gaXNNb2Rlcm5cbiAgICA/IEJ1ZmZlci5mcm9tKHN0cmluZywgZW5jb2RpbmcpXG4gICAgOiBuZXcgQnVmZmVyKHN0cmluZywgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGJ1ZmZlckZyb20gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKGlzQXJyYXlCdWZmZXIodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBpc01vZGVyblxuICAgID8gQnVmZmVyLmZyb20odmFsdWUpXG4gICAgOiBuZXcgQnVmZmVyKHZhbHVlKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1ZmZlckZyb21cbiIsInZhciBTb3VyY2VNYXBDb25zdW1lciA9IHJlcXVpcmUoJ3NvdXJjZS1tYXAnKS5Tb3VyY2VNYXBDb25zdW1lcjtcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG52YXIgZnM7XG50cnkge1xuICBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gIGlmICghZnMuZXhpc3RzU3luYyB8fCAhZnMucmVhZEZpbGVTeW5jKSB7XG4gICAgLy8gZnMgZG9lc24ndCBoYXZlIGFsbCBtZXRob2RzIHdlIG5lZWRcbiAgICBmcyA9IG51bGw7XG4gIH1cbn0gY2F0Y2ggKGVycikge1xuICAvKiBub3AgKi9cbn1cblxudmFyIGJ1ZmZlckZyb20gPSByZXF1aXJlKCdidWZmZXItZnJvbScpO1xuXG4vKipcbiAqIFJlcXVpcmVzIGEgbW9kdWxlIHdoaWNoIGlzIHByb3RlY3RlZCBhZ2FpbnN0IGJ1bmRsZXIgbWluaWZpY2F0aW9uLlxuICpcbiAqIEBwYXJhbSB7Tm9kZU1vZHVsZX0gbW9kXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdFxuICovXG5mdW5jdGlvbiBkeW5hbWljUmVxdWlyZShtb2QsIHJlcXVlc3QpIHtcbiAgcmV0dXJuIG1vZC5yZXF1aXJlKHJlcXVlc3QpO1xufVxuXG4vLyBPbmx5IGluc3RhbGwgb25jZSBpZiBjYWxsZWQgbXVsdGlwbGUgdGltZXNcbnZhciBlcnJvckZvcm1hdHRlckluc3RhbGxlZCA9IGZhbHNlO1xudmFyIHVuY2F1Z2h0U2hpbUluc3RhbGxlZCA9IGZhbHNlO1xuXG4vLyBJZiB0cnVlLCB0aGUgY2FjaGVzIGFyZSByZXNldCBiZWZvcmUgYSBzdGFjayB0cmFjZSBmb3JtYXR0aW5nIG9wZXJhdGlvblxudmFyIGVtcHR5Q2FjaGVCZXR3ZWVuT3BlcmF0aW9ucyA9IGZhbHNlO1xuXG4vLyBTdXBwb3J0cyB7YnJvd3Nlciwgbm9kZSwgYXV0b31cbnZhciBlbnZpcm9ubWVudCA9IFwiYXV0b1wiO1xuXG4vLyBNYXBzIGEgZmlsZSBwYXRoIHRvIGEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGZpbGUgY29udGVudHNcbnZhciBmaWxlQ29udGVudHNDYWNoZSA9IHt9O1xuXG4vLyBNYXBzIGEgZmlsZSBwYXRoIHRvIGEgc291cmNlIG1hcCBmb3IgdGhhdCBmaWxlXG52YXIgc291cmNlTWFwQ2FjaGUgPSB7fTtcblxuLy8gUmVnZXggZm9yIGRldGVjdGluZyBzb3VyY2UgbWFwc1xudmFyIHJlU291cmNlTWFwID0gL15kYXRhOmFwcGxpY2F0aW9uXFwvanNvblteLF0rYmFzZTY0LC87XG5cbi8vIFByaW9yaXR5IGxpc3Qgb2YgcmV0cmlldmUgaGFuZGxlcnNcbnZhciByZXRyaWV2ZUZpbGVIYW5kbGVycyA9IFtdO1xudmFyIHJldHJpZXZlTWFwSGFuZGxlcnMgPSBbXTtcblxuZnVuY3Rpb24gaXNJbkJyb3dzZXIoKSB7XG4gIGlmIChlbnZpcm9ubWVudCA9PT0gXCJicm93c2VyXCIpXG4gICAgcmV0dXJuIHRydWU7XG4gIGlmIChlbnZpcm9ubWVudCA9PT0gXCJub2RlXCIpXG4gICAgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gKCh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgJiYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gJ2Z1bmN0aW9uJykgJiYgISh3aW5kb3cucmVxdWlyZSAmJiB3aW5kb3cubW9kdWxlICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09IFwicmVuZGVyZXJcIikpO1xufVxuXG5mdW5jdGlvbiBoYXNHbG9iYWxQcm9jZXNzRXZlbnRFbWl0dGVyKCkge1xuICByZXR1cm4gKCh0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcpICYmIChwcm9jZXNzICE9PSBudWxsKSAmJiAodHlwZW9mIHByb2Nlc3Mub24gPT09ICdmdW5jdGlvbicpKTtcbn1cblxuZnVuY3Rpb24gZ2xvYmFsUHJvY2Vzc1ZlcnNpb24oKSB7XG4gIGlmICgodHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnKSAmJiAocHJvY2VzcyAhPT0gbnVsbCkpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy52ZXJzaW9uO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5mdW5jdGlvbiBnbG9iYWxQcm9jZXNzU3RkZXJyKCkge1xuICBpZiAoKHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0JykgJiYgKHByb2Nlc3MgIT09IG51bGwpKSB7XG4gICAgcmV0dXJuIHByb2Nlc3Muc3RkZXJyO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdsb2JhbFByb2Nlc3NFeGl0KGNvZGUpIHtcbiAgaWYgKCh0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcpICYmIChwcm9jZXNzICE9PSBudWxsKSAmJiAodHlwZW9mIHByb2Nlc3MuZXhpdCA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5leGl0KGNvZGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZXJFeGVjKGxpc3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHJldCA9IGxpc3RbaV0oYXJnKTtcbiAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG59XG5cbnZhciByZXRyaWV2ZUZpbGUgPSBoYW5kbGVyRXhlYyhyZXRyaWV2ZUZpbGVIYW5kbGVycyk7XG5cbnJldHJpZXZlRmlsZUhhbmRsZXJzLnB1c2goZnVuY3Rpb24ocGF0aCkge1xuICAvLyBUcmltIHRoZSBwYXRoIHRvIG1ha2Ugc3VyZSB0aGVyZSBpcyBubyBleHRyYSB3aGl0ZXNwYWNlLlxuICBwYXRoID0gcGF0aC50cmltKCk7XG4gIGlmICgvXmZpbGU6Ly50ZXN0KHBhdGgpKSB7XG4gICAgLy8gZXhpc3RzU3luYy9yZWFkRmlsZVN5bmMgY2FuJ3QgaGFuZGxlIGZpbGUgcHJvdG9jb2wsIGJ1dCBvbmNlIHN0cmlwcGVkLCBpdCB3b3Jrc1xuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL2ZpbGU6XFwvXFwvXFwvKFxcdzopPy8sIGZ1bmN0aW9uKHByb3RvY29sLCBkcml2ZSkge1xuICAgICAgcmV0dXJuIGRyaXZlID9cbiAgICAgICAgJycgOiAvLyBmaWxlOi8vL0M6L2Rpci9maWxlIC0+IEM6L2Rpci9maWxlXG4gICAgICAgICcvJzsgLy8gZmlsZTovLy9yb290LWRpci9maWxlIC0+IC9yb290LWRpci9maWxlXG4gICAgfSk7XG4gIH1cbiAgaWYgKHBhdGggaW4gZmlsZUNvbnRlbnRzQ2FjaGUpIHtcbiAgICByZXR1cm4gZmlsZUNvbnRlbnRzQ2FjaGVbcGF0aF07XG4gIH1cblxuICB2YXIgY29udGVudHMgPSAnJztcbiAgdHJ5IHtcbiAgICBpZiAoIWZzKSB7XG4gICAgICAvLyBVc2UgU0pBWCBpZiB3ZSBhcmUgaW4gdGhlIGJyb3dzZXJcbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhoci5vcGVuKCdHRVQnLCBwYXRoLCAvKiogYXN5bmMgKi8gZmFsc2UpO1xuICAgICAgeGhyLnNlbmQobnVsbCk7XG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgIGNvbnRlbnRzID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGZzLmV4aXN0c1N5bmMocGF0aCkpIHtcbiAgICAgIC8vIE90aGVyd2lzZSwgdXNlIHRoZSBmaWxlc3lzdGVtXG4gICAgICBjb250ZW50cyA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLCAndXRmOCcpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXIpIHtcbiAgICAvKiBpZ25vcmUgYW55IGVycm9ycyAqL1xuICB9XG5cbiAgcmV0dXJuIGZpbGVDb250ZW50c0NhY2hlW3BhdGhdID0gY29udGVudHM7XG59KTtcblxuLy8gU3VwcG9ydCBVUkxzIHJlbGF0aXZlIHRvIGEgZGlyZWN0b3J5LCBidXQgYmUgY2FyZWZ1bCBhYm91dCBhIHByb3RvY29sIHByZWZpeFxuLy8gaW4gY2FzZSB3ZSBhcmUgaW4gdGhlIGJyb3dzZXIgKGkuZS4gZGlyZWN0b3JpZXMgbWF5IHN0YXJ0IHdpdGggXCJodHRwOi8vXCIgb3IgXCJmaWxlOi8vL1wiKVxuZnVuY3Rpb24gc3VwcG9ydFJlbGF0aXZlVVJMKGZpbGUsIHVybCkge1xuICBpZiAoIWZpbGUpIHJldHVybiB1cmw7XG4gIHZhciBkaXIgPSBwYXRoLmRpcm5hbWUoZmlsZSk7XG4gIHZhciBtYXRjaCA9IC9eXFx3KzpcXC9cXC9bXlxcL10qLy5leGVjKGRpcik7XG4gIHZhciBwcm90b2NvbCA9IG1hdGNoID8gbWF0Y2hbMF0gOiAnJztcbiAgdmFyIHN0YXJ0UGF0aCA9IGRpci5zbGljZShwcm90b2NvbC5sZW5ndGgpO1xuICBpZiAocHJvdG9jb2wgJiYgL15cXC9cXHdcXDovLnRlc3Qoc3RhcnRQYXRoKSkge1xuICAgIC8vIGhhbmRsZSBmaWxlOi8vL0M6LyBwYXRoc1xuICAgIHByb3RvY29sICs9ICcvJztcbiAgICByZXR1cm4gcHJvdG9jb2wgKyBwYXRoLnJlc29sdmUoZGlyLnNsaWNlKHByb3RvY29sLmxlbmd0aCksIHVybCkucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xuICB9XG4gIHJldHVybiBwcm90b2NvbCArIHBhdGgucmVzb2x2ZShkaXIuc2xpY2UocHJvdG9jb2wubGVuZ3RoKSwgdXJsKTtcbn1cblxuZnVuY3Rpb24gcmV0cmlldmVTb3VyY2VNYXBVUkwoc291cmNlKSB7XG4gIHZhciBmaWxlRGF0YTtcblxuICBpZiAoaXNJbkJyb3dzZXIoKSkge1xuICAgICB0cnkge1xuICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICB4aHIub3BlbignR0VUJywgc291cmNlLCBmYWxzZSk7XG4gICAgICAgeGhyLnNlbmQobnVsbCk7XG4gICAgICAgZmlsZURhdGEgPSB4aHIucmVhZHlTdGF0ZSA9PT0gNCA/IHhoci5yZXNwb25zZVRleHQgOiBudWxsO1xuXG4gICAgICAgLy8gU3VwcG9ydCBwcm92aWRpbmcgYSBzb3VyY2VNYXBwaW5nVVJMIHZpYSB0aGUgU291cmNlTWFwIGhlYWRlclxuICAgICAgIHZhciBzb3VyY2VNYXBIZWFkZXIgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJTb3VyY2VNYXBcIikgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLmdldFJlc3BvbnNlSGVhZGVyKFwiWC1Tb3VyY2VNYXBcIik7XG4gICAgICAgaWYgKHNvdXJjZU1hcEhlYWRlcikge1xuICAgICAgICAgcmV0dXJuIHNvdXJjZU1hcEhlYWRlcjtcbiAgICAgICB9XG4gICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgfVxuICB9XG5cbiAgLy8gR2V0IHRoZSBVUkwgb2YgdGhlIHNvdXJjZSBtYXBcbiAgZmlsZURhdGEgPSByZXRyaWV2ZUZpbGUoc291cmNlKTtcbiAgdmFyIHJlID0gLyg/OlxcL1xcL1tAI11bXFxzXSpzb3VyY2VNYXBwaW5nVVJMPShbXlxccydcIl0rKVtcXHNdKiQpfCg/OlxcL1xcKltAI11bXFxzXSpzb3VyY2VNYXBwaW5nVVJMPShbXlxccyonXCJdKylbXFxzXSooPzpcXCpcXC8pW1xcc10qJCkvbWc7XG4gIC8vIEtlZXAgZXhlY3V0aW5nIHRoZSBzZWFyY2ggdG8gZmluZCB0aGUgKmxhc3QqIHNvdXJjZU1hcHBpbmdVUkwgdG8gYXZvaWRcbiAgLy8gcGlja2luZyB1cCBzb3VyY2VNYXBwaW5nVVJMcyBmcm9tIGNvbW1lbnRzLCBzdHJpbmdzLCBldGMuXG4gIHZhciBsYXN0TWF0Y2gsIG1hdGNoO1xuICB3aGlsZSAobWF0Y2ggPSByZS5leGVjKGZpbGVEYXRhKSkgbGFzdE1hdGNoID0gbWF0Y2g7XG4gIGlmICghbGFzdE1hdGNoKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIGxhc3RNYXRjaFsxXTtcbn07XG5cbi8vIENhbiBiZSBvdmVycmlkZGVuIGJ5IHRoZSByZXRyaWV2ZVNvdXJjZU1hcCBvcHRpb24gdG8gaW5zdGFsbC4gVGFrZXMgYVxuLy8gZ2VuZXJhdGVkIHNvdXJjZSBmaWxlbmFtZTsgcmV0dXJucyBhIHttYXAsIG9wdGlvbmFsIHVybH0gb2JqZWN0LCBvciBudWxsIGlmXG4vLyB0aGVyZSBpcyBubyBzb3VyY2UgbWFwLiAgVGhlIG1hcCBmaWVsZCBtYXkgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIHRoZSBwYXJzZWRcbi8vIEpTT04gb2JqZWN0IChpZSwgaXQgbXVzdCBiZSBhIHZhbGlkIGFyZ3VtZW50IHRvIHRoZSBTb3VyY2VNYXBDb25zdW1lclxuLy8gY29uc3RydWN0b3IpLlxudmFyIHJldHJpZXZlU291cmNlTWFwID0gaGFuZGxlckV4ZWMocmV0cmlldmVNYXBIYW5kbGVycyk7XG5yZXRyaWV2ZU1hcEhhbmRsZXJzLnB1c2goZnVuY3Rpb24oc291cmNlKSB7XG4gIHZhciBzb3VyY2VNYXBwaW5nVVJMID0gcmV0cmlldmVTb3VyY2VNYXBVUkwoc291cmNlKTtcbiAgaWYgKCFzb3VyY2VNYXBwaW5nVVJMKSByZXR1cm4gbnVsbDtcblxuICAvLyBSZWFkIHRoZSBjb250ZW50cyBvZiB0aGUgc291cmNlIG1hcFxuICB2YXIgc291cmNlTWFwRGF0YTtcbiAgaWYgKHJlU291cmNlTWFwLnRlc3Qoc291cmNlTWFwcGluZ1VSTCkpIHtcbiAgICAvLyBTdXBwb3J0IHNvdXJjZSBtYXAgVVJMIGFzIGEgZGF0YSB1cmxcbiAgICB2YXIgcmF3RGF0YSA9IHNvdXJjZU1hcHBpbmdVUkwuc2xpY2Uoc291cmNlTWFwcGluZ1VSTC5pbmRleE9mKCcsJykgKyAxKTtcbiAgICBzb3VyY2VNYXBEYXRhID0gYnVmZmVyRnJvbShyYXdEYXRhLCBcImJhc2U2NFwiKS50b1N0cmluZygpO1xuICAgIHNvdXJjZU1hcHBpbmdVUkwgPSBzb3VyY2U7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3VwcG9ydCBzb3VyY2UgbWFwIFVSTHMgcmVsYXRpdmUgdG8gdGhlIHNvdXJjZSBVUkxcbiAgICBzb3VyY2VNYXBwaW5nVVJMID0gc3VwcG9ydFJlbGF0aXZlVVJMKHNvdXJjZSwgc291cmNlTWFwcGluZ1VSTCk7XG4gICAgc291cmNlTWFwRGF0YSA9IHJldHJpZXZlRmlsZShzb3VyY2VNYXBwaW5nVVJMKTtcbiAgfVxuXG4gIGlmICghc291cmNlTWFwRGF0YSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB1cmw6IHNvdXJjZU1hcHBpbmdVUkwsXG4gICAgbWFwOiBzb3VyY2VNYXBEYXRhXG4gIH07XG59KTtcblxuZnVuY3Rpb24gbWFwU291cmNlUG9zaXRpb24ocG9zaXRpb24pIHtcbiAgdmFyIHNvdXJjZU1hcCA9IHNvdXJjZU1hcENhY2hlW3Bvc2l0aW9uLnNvdXJjZV07XG4gIGlmICghc291cmNlTWFwKSB7XG4gICAgLy8gQ2FsbCB0aGUgKG92ZXJyaWRlYWJsZSkgcmV0cmlldmVTb3VyY2VNYXAgZnVuY3Rpb24gdG8gZ2V0IHRoZSBzb3VyY2UgbWFwLlxuICAgIHZhciB1cmxBbmRNYXAgPSByZXRyaWV2ZVNvdXJjZU1hcChwb3NpdGlvbi5zb3VyY2UpO1xuICAgIGlmICh1cmxBbmRNYXApIHtcbiAgICAgIHNvdXJjZU1hcCA9IHNvdXJjZU1hcENhY2hlW3Bvc2l0aW9uLnNvdXJjZV0gPSB7XG4gICAgICAgIHVybDogdXJsQW5kTWFwLnVybCxcbiAgICAgICAgbWFwOiBuZXcgU291cmNlTWFwQ29uc3VtZXIodXJsQW5kTWFwLm1hcClcbiAgICAgIH07XG5cbiAgICAgIC8vIExvYWQgYWxsIHNvdXJjZXMgc3RvcmVkIGlubGluZSB3aXRoIHRoZSBzb3VyY2UgbWFwIGludG8gdGhlIGZpbGUgY2FjaGVcbiAgICAgIC8vIHRvIHByZXRlbmQgbGlrZSB0aGV5IGFyZSBhbHJlYWR5IGxvYWRlZC4gVGhleSBtYXkgbm90IGV4aXN0IG9uIGRpc2suXG4gICAgICBpZiAoc291cmNlTWFwLm1hcC5zb3VyY2VzQ29udGVudCkge1xuICAgICAgICBzb3VyY2VNYXAubWFwLnNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbihzb3VyY2UsIGkpIHtcbiAgICAgICAgICB2YXIgY29udGVudHMgPSBzb3VyY2VNYXAubWFwLnNvdXJjZXNDb250ZW50W2ldO1xuICAgICAgICAgIGlmIChjb250ZW50cykge1xuICAgICAgICAgICAgdmFyIHVybCA9IHN1cHBvcnRSZWxhdGl2ZVVSTChzb3VyY2VNYXAudXJsLCBzb3VyY2UpO1xuICAgICAgICAgICAgZmlsZUNvbnRlbnRzQ2FjaGVbdXJsXSA9IGNvbnRlbnRzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNvdXJjZU1hcCA9IHNvdXJjZU1hcENhY2hlW3Bvc2l0aW9uLnNvdXJjZV0gPSB7XG4gICAgICAgIHVybDogbnVsbCxcbiAgICAgICAgbWFwOiBudWxsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlc29sdmUgdGhlIHNvdXJjZSBVUkwgcmVsYXRpdmUgdG8gdGhlIFVSTCBvZiB0aGUgc291cmNlIG1hcFxuICBpZiAoc291cmNlTWFwICYmIHNvdXJjZU1hcC5tYXAgJiYgdHlwZW9mIHNvdXJjZU1hcC5tYXAub3JpZ2luYWxQb3NpdGlvbkZvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBvcmlnaW5hbFBvc2l0aW9uID0gc291cmNlTWFwLm1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHBvc2l0aW9uKTtcblxuICAgIC8vIE9ubHkgcmV0dXJuIHRoZSBvcmlnaW5hbCBwb3NpdGlvbiBpZiBhIG1hdGNoaW5nIGxpbmUgd2FzIGZvdW5kLiBJZiBub1xuICAgIC8vIG1hdGNoaW5nIGxpbmUgaXMgZm91bmQgdGhlbiB3ZSByZXR1cm4gcG9zaXRpb24gaW5zdGVhZCwgd2hpY2ggd2lsbCBjYXVzZVxuICAgIC8vIHRoZSBzdGFjayB0cmFjZSB0byBwcmludCB0aGUgcGF0aCBhbmQgbGluZSBmb3IgdGhlIGNvbXBpbGVkIGZpbGUuIEl0IGlzXG4gICAgLy8gYmV0dGVyIHRvIGdpdmUgYSBwcmVjaXNlIGxvY2F0aW9uIGluIHRoZSBjb21waWxlZCBmaWxlIHRoYW4gYSB2YWd1ZVxuICAgIC8vIGxvY2F0aW9uIGluIHRoZSBvcmlnaW5hbCBmaWxlLlxuICAgIGlmIChvcmlnaW5hbFBvc2l0aW9uLnNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgb3JpZ2luYWxQb3NpdGlvbi5zb3VyY2UgPSBzdXBwb3J0UmVsYXRpdmVVUkwoXG4gICAgICAgIHNvdXJjZU1hcC51cmwsIG9yaWdpbmFsUG9zaXRpb24uc291cmNlKTtcbiAgICAgIHJldHVybiBvcmlnaW5hbFBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwb3NpdGlvbjtcbn1cblxuLy8gUGFyc2VzIGNvZGUgZ2VuZXJhdGVkIGJ5IEZvcm1hdEV2YWxPcmlnaW4oKSwgYSBmdW5jdGlvbiBpbnNpZGUgVjg6XG4vLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L3NvdXJjZS9icm93c2UvdHJ1bmsvc3JjL21lc3NhZ2VzLmpzXG5mdW5jdGlvbiBtYXBFdmFsT3JpZ2luKG9yaWdpbikge1xuICAvLyBNb3N0IGV2YWwoKSBjYWxscyBhcmUgaW4gdGhpcyBmb3JtYXRcbiAgdmFyIG1hdGNoID0gL15ldmFsIGF0IChbXihdKykgXFwoKC4rKTooXFxkKyk6KFxcZCspXFwpJC8uZXhlYyhvcmlnaW4pO1xuICBpZiAobWF0Y2gpIHtcbiAgICB2YXIgcG9zaXRpb24gPSBtYXBTb3VyY2VQb3NpdGlvbih7XG4gICAgICBzb3VyY2U6IG1hdGNoWzJdLFxuICAgICAgbGluZTogK21hdGNoWzNdLFxuICAgICAgY29sdW1uOiBtYXRjaFs0XSAtIDFcbiAgICB9KTtcbiAgICByZXR1cm4gJ2V2YWwgYXQgJyArIG1hdGNoWzFdICsgJyAoJyArIHBvc2l0aW9uLnNvdXJjZSArICc6JyArXG4gICAgICBwb3NpdGlvbi5saW5lICsgJzonICsgKHBvc2l0aW9uLmNvbHVtbiArIDEpICsgJyknO1xuICB9XG5cbiAgLy8gUGFyc2UgbmVzdGVkIGV2YWwoKSBjYWxscyB1c2luZyByZWN1cnNpb25cbiAgbWF0Y2ggPSAvXmV2YWwgYXQgKFteKF0rKSBcXCgoLispXFwpJC8uZXhlYyhvcmlnaW4pO1xuICBpZiAobWF0Y2gpIHtcbiAgICByZXR1cm4gJ2V2YWwgYXQgJyArIG1hdGNoWzFdICsgJyAoJyArIG1hcEV2YWxPcmlnaW4obWF0Y2hbMl0pICsgJyknO1xuICB9XG5cbiAgLy8gTWFrZSBzdXJlIHdlIHN0aWxsIHJldHVybiB1c2VmdWwgaW5mb3JtYXRpb24gaWYgd2UgZGlkbid0IGZpbmQgYW55dGhpbmdcbiAgcmV0dXJuIG9yaWdpbjtcbn1cblxuLy8gVGhpcyBpcyBjb3BpZWQgYWxtb3N0IHZlcmJhdGltIGZyb20gdGhlIFY4IHNvdXJjZSBjb2RlIGF0XG4vLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L3NvdXJjZS9icm93c2UvdHJ1bmsvc3JjL21lc3NhZ2VzLmpzLiBUaGVcbi8vIGltcGxlbWVudGF0aW9uIG9mIHdyYXBDYWxsU2l0ZSgpIHVzZWQgdG8ganVzdCBmb3J3YXJkIHRvIHRoZSBhY3R1YWwgc291cmNlXG4vLyBjb2RlIG9mIENhbGxTaXRlLnByb3RvdHlwZS50b1N0cmluZyBidXQgdW5mb3J0dW5hdGVseSBhIG5ldyByZWxlYXNlIG9mIFY4XG4vLyBkaWQgc29tZXRoaW5nIHRvIHRoZSBwcm90b3R5cGUgY2hhaW4gYW5kIGJyb2tlIHRoZSBzaGltLiBUaGUgb25seSBmaXggSVxuLy8gY291bGQgZmluZCB3YXMgY29weS9wYXN0ZS5cbmZ1bmN0aW9uIENhbGxTaXRlVG9TdHJpbmcoKSB7XG4gIHZhciBmaWxlTmFtZTtcbiAgdmFyIGZpbGVMb2NhdGlvbiA9IFwiXCI7XG4gIGlmICh0aGlzLmlzTmF0aXZlKCkpIHtcbiAgICBmaWxlTG9jYXRpb24gPSBcIm5hdGl2ZVwiO1xuICB9IGVsc2Uge1xuICAgIGZpbGVOYW1lID0gdGhpcy5nZXRTY3JpcHROYW1lT3JTb3VyY2VVUkwoKTtcbiAgICBpZiAoIWZpbGVOYW1lICYmIHRoaXMuaXNFdmFsKCkpIHtcbiAgICAgIGZpbGVMb2NhdGlvbiA9IHRoaXMuZ2V0RXZhbE9yaWdpbigpO1xuICAgICAgZmlsZUxvY2F0aW9uICs9IFwiLCBcIjsgIC8vIEV4cGVjdGluZyBzb3VyY2UgcG9zaXRpb24gdG8gZm9sbG93LlxuICAgIH1cblxuICAgIGlmIChmaWxlTmFtZSkge1xuICAgICAgZmlsZUxvY2F0aW9uICs9IGZpbGVOYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb3VyY2UgY29kZSBkb2VzIG5vdCBvcmlnaW5hdGUgZnJvbSBhIGZpbGUgYW5kIGlzIG5vdCBuYXRpdmUsIGJ1dCB3ZVxuICAgICAgLy8gY2FuIHN0aWxsIGdldCB0aGUgc291cmNlIHBvc2l0aW9uIGluc2lkZSB0aGUgc291cmNlIHN0cmluZywgZS5nLiBpblxuICAgICAgLy8gYW4gZXZhbCBzdHJpbmcuXG4gICAgICBmaWxlTG9jYXRpb24gKz0gXCI8YW5vbnltb3VzPlwiO1xuICAgIH1cbiAgICB2YXIgbGluZU51bWJlciA9IHRoaXMuZ2V0TGluZU51bWJlcigpO1xuICAgIGlmIChsaW5lTnVtYmVyICE9IG51bGwpIHtcbiAgICAgIGZpbGVMb2NhdGlvbiArPSBcIjpcIiArIGxpbmVOdW1iZXI7XG4gICAgICB2YXIgY29sdW1uTnVtYmVyID0gdGhpcy5nZXRDb2x1bW5OdW1iZXIoKTtcbiAgICAgIGlmIChjb2x1bW5OdW1iZXIpIHtcbiAgICAgICAgZmlsZUxvY2F0aW9uICs9IFwiOlwiICsgY29sdW1uTnVtYmVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBsaW5lID0gXCJcIjtcbiAgdmFyIGZ1bmN0aW9uTmFtZSA9IHRoaXMuZ2V0RnVuY3Rpb25OYW1lKCk7XG4gIHZhciBhZGRTdWZmaXggPSB0cnVlO1xuICB2YXIgaXNDb25zdHJ1Y3RvciA9IHRoaXMuaXNDb25zdHJ1Y3RvcigpO1xuICB2YXIgaXNNZXRob2RDYWxsID0gISh0aGlzLmlzVG9wbGV2ZWwoKSB8fCBpc0NvbnN0cnVjdG9yKTtcbiAgaWYgKGlzTWV0aG9kQ2FsbCkge1xuICAgIHZhciB0eXBlTmFtZSA9IHRoaXMuZ2V0VHlwZU5hbWUoKTtcbiAgICAvLyBGaXhlcyBzaGltIHRvIGJlIGJhY2t3YXJkIGNvbXBhdGFibGUgd2l0aCBOb2RlIHYwIHRvIHY0XG4gICAgaWYgKHR5cGVOYW1lID09PSBcIltvYmplY3QgT2JqZWN0XVwiKSB7XG4gICAgICB0eXBlTmFtZSA9IFwibnVsbFwiO1xuICAgIH1cbiAgICB2YXIgbWV0aG9kTmFtZSA9IHRoaXMuZ2V0TWV0aG9kTmFtZSgpO1xuICAgIGlmIChmdW5jdGlvbk5hbWUpIHtcbiAgICAgIGlmICh0eXBlTmFtZSAmJiBmdW5jdGlvbk5hbWUuaW5kZXhPZih0eXBlTmFtZSkgIT0gMCkge1xuICAgICAgICBsaW5lICs9IHR5cGVOYW1lICsgXCIuXCI7XG4gICAgICB9XG4gICAgICBsaW5lICs9IGZ1bmN0aW9uTmFtZTtcbiAgICAgIGlmIChtZXRob2ROYW1lICYmIGZ1bmN0aW9uTmFtZS5pbmRleE9mKFwiLlwiICsgbWV0aG9kTmFtZSkgIT0gZnVuY3Rpb25OYW1lLmxlbmd0aCAtIG1ldGhvZE5hbWUubGVuZ3RoIC0gMSkge1xuICAgICAgICBsaW5lICs9IFwiIFthcyBcIiArIG1ldGhvZE5hbWUgKyBcIl1cIjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGluZSArPSB0eXBlTmFtZSArIFwiLlwiICsgKG1ldGhvZE5hbWUgfHwgXCI8YW5vbnltb3VzPlwiKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNDb25zdHJ1Y3Rvcikge1xuICAgIGxpbmUgKz0gXCJuZXcgXCIgKyAoZnVuY3Rpb25OYW1lIHx8IFwiPGFub255bW91cz5cIik7XG4gIH0gZWxzZSBpZiAoZnVuY3Rpb25OYW1lKSB7XG4gICAgbGluZSArPSBmdW5jdGlvbk5hbWU7XG4gIH0gZWxzZSB7XG4gICAgbGluZSArPSBmaWxlTG9jYXRpb247XG4gICAgYWRkU3VmZml4ID0gZmFsc2U7XG4gIH1cbiAgaWYgKGFkZFN1ZmZpeCkge1xuICAgIGxpbmUgKz0gXCIgKFwiICsgZmlsZUxvY2F0aW9uICsgXCIpXCI7XG4gIH1cbiAgcmV0dXJuIGxpbmU7XG59XG5cbmZ1bmN0aW9uIGNsb25lQ2FsbFNpdGUoZnJhbWUpIHtcbiAgdmFyIG9iamVjdCA9IHt9O1xuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPYmplY3QuZ2V0UHJvdG90eXBlT2YoZnJhbWUpKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBvYmplY3RbbmFtZV0gPSAvXig/OmlzfGdldCkvLnRlc3QobmFtZSkgPyBmdW5jdGlvbigpIHsgcmV0dXJuIGZyYW1lW25hbWVdLmNhbGwoZnJhbWUpOyB9IDogZnJhbWVbbmFtZV07XG4gIH0pO1xuICBvYmplY3QudG9TdHJpbmcgPSBDYWxsU2l0ZVRvU3RyaW5nO1xuICByZXR1cm4gb2JqZWN0O1xufVxuXG5mdW5jdGlvbiB3cmFwQ2FsbFNpdGUoZnJhbWUsIHN0YXRlKSB7XG4gIC8vIHByb3ZpZGVzIGludGVyZmFjZSBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gIGlmIChzdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhdGUgPSB7IG5leHRQb3NpdGlvbjogbnVsbCwgY3VyUG9zaXRpb246IG51bGwgfVxuICB9XG4gIGlmKGZyYW1lLmlzTmF0aXZlKCkpIHtcbiAgICBzdGF0ZS5jdXJQb3NpdGlvbiA9IG51bGw7XG4gICAgcmV0dXJuIGZyYW1lO1xuICB9XG5cbiAgLy8gTW9zdCBjYWxsIHNpdGVzIHdpbGwgcmV0dXJuIHRoZSBzb3VyY2UgZmlsZSBmcm9tIGdldEZpbGVOYW1lKCksIGJ1dCBjb2RlXG4gIC8vIHBhc3NlZCB0byBldmFsKCkgZW5kaW5nIGluIFwiLy8jIHNvdXJjZVVSTD0uLi5cIiB3aWxsIHJldHVybiB0aGUgc291cmNlIGZpbGVcbiAgLy8gZnJvbSBnZXRTY3JpcHROYW1lT3JTb3VyY2VVUkwoKSBpbnN0ZWFkXG4gIHZhciBzb3VyY2UgPSBmcmFtZS5nZXRGaWxlTmFtZSgpIHx8IGZyYW1lLmdldFNjcmlwdE5hbWVPclNvdXJjZVVSTCgpO1xuICBpZiAoc291cmNlKSB7XG4gICAgdmFyIGxpbmUgPSBmcmFtZS5nZXRMaW5lTnVtYmVyKCk7XG4gICAgdmFyIGNvbHVtbiA9IGZyYW1lLmdldENvbHVtbk51bWJlcigpIC0gMTtcblxuICAgIC8vIEZpeCBwb3NpdGlvbiBpbiBOb2RlIHdoZXJlIHNvbWUgKGludGVybmFsKSBjb2RlIGlzIHByZXBlbmRlZC5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2V2YW53L25vZGUtc291cmNlLW1hcC1zdXBwb3J0L2lzc3Vlcy8zNlxuICAgIC8vIEhlYWRlciByZW1vdmVkIGluIG5vZGUgYXQgXjEwLjE2IHx8ID49MTEuMTEuMFxuICAgIC8vIHYxMSBpcyBub3QgYW4gTFRTIGNhbmRpZGF0ZSwgd2UgY2FuIGp1c3QgdGVzdCB0aGUgb25lIHZlcnNpb24gd2l0aCBpdC5cbiAgICAvLyBUZXN0IG5vZGUgdmVyc2lvbnMgZm9yOiAxMC4xNi0xOSwgMTAuMjArLCAxMi0xOSwgMjAtOTksIDEwMCssIG9yIDExLjExXG4gICAgdmFyIG5vSGVhZGVyID0gL152KDEwXFwuMVs2LTldfDEwXFwuWzItOV1bMC05XXwxMFxcLlswLTldezMsfXwxWzItOV1cXGQqfFsyLTldXFxkfFxcZHszLH18MTFcXC4xMSkvO1xuICAgIHZhciBoZWFkZXJMZW5ndGggPSBub0hlYWRlci50ZXN0KGdsb2JhbFByb2Nlc3NWZXJzaW9uKCkpID8gMCA6IDYyO1xuICAgIGlmIChsaW5lID09PSAxICYmIGNvbHVtbiA+IGhlYWRlckxlbmd0aCAmJiAhaXNJbkJyb3dzZXIoKSAmJiAhZnJhbWUuaXNFdmFsKCkpIHtcbiAgICAgIGNvbHVtbiAtPSBoZWFkZXJMZW5ndGg7XG4gICAgfVxuXG4gICAgdmFyIHBvc2l0aW9uID0gbWFwU291cmNlUG9zaXRpb24oe1xuICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICBsaW5lOiBsaW5lLFxuICAgICAgY29sdW1uOiBjb2x1bW5cbiAgICB9KTtcbiAgICBzdGF0ZS5jdXJQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIGZyYW1lID0gY2xvbmVDYWxsU2l0ZShmcmFtZSk7XG4gICAgdmFyIG9yaWdpbmFsRnVuY3Rpb25OYW1lID0gZnJhbWUuZ2V0RnVuY3Rpb25OYW1lO1xuICAgIGZyYW1lLmdldEZ1bmN0aW9uTmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHN0YXRlLm5leHRQb3NpdGlvbiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBvcmlnaW5hbEZ1bmN0aW9uTmFtZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlLm5leHRQb3NpdGlvbi5uYW1lIHx8IG9yaWdpbmFsRnVuY3Rpb25OYW1lKCk7XG4gICAgfTtcbiAgICBmcmFtZS5nZXRGaWxlTmFtZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gcG9zaXRpb24uc291cmNlOyB9O1xuICAgIGZyYW1lLmdldExpbmVOdW1iZXIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHBvc2l0aW9uLmxpbmU7IH07XG4gICAgZnJhbWUuZ2V0Q29sdW1uTnVtYmVyID0gZnVuY3Rpb24oKSB7IHJldHVybiBwb3NpdGlvbi5jb2x1bW4gKyAxOyB9O1xuICAgIGZyYW1lLmdldFNjcmlwdE5hbWVPclNvdXJjZVVSTCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gcG9zaXRpb24uc291cmNlOyB9O1xuICAgIHJldHVybiBmcmFtZTtcbiAgfVxuXG4gIC8vIENvZGUgY2FsbGVkIHVzaW5nIGV2YWwoKSBuZWVkcyBzcGVjaWFsIGhhbmRsaW5nXG4gIHZhciBvcmlnaW4gPSBmcmFtZS5pc0V2YWwoKSAmJiBmcmFtZS5nZXRFdmFsT3JpZ2luKCk7XG4gIGlmIChvcmlnaW4pIHtcbiAgICBvcmlnaW4gPSBtYXBFdmFsT3JpZ2luKG9yaWdpbik7XG4gICAgZnJhbWUgPSBjbG9uZUNhbGxTaXRlKGZyYW1lKTtcbiAgICBmcmFtZS5nZXRFdmFsT3JpZ2luID0gZnVuY3Rpb24oKSB7IHJldHVybiBvcmlnaW47IH07XG4gICAgcmV0dXJuIGZyYW1lO1xuICB9XG5cbiAgLy8gSWYgd2UgZ2V0IGhlcmUgdGhlbiB3ZSB3ZXJlIHVuYWJsZSB0byBjaGFuZ2UgdGhlIHNvdXJjZSBwb3NpdGlvblxuICByZXR1cm4gZnJhbWU7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgcGFydCBvZiB0aGUgVjggc3RhY2sgdHJhY2UgQVBJLCBmb3IgbW9yZSBpbmZvIHNlZTpcbi8vIGh0dHBzOi8vdjguZGV2L2RvY3Mvc3RhY2stdHJhY2UtYXBpXG5mdW5jdGlvbiBwcmVwYXJlU3RhY2tUcmFjZShlcnJvciwgc3RhY2spIHtcbiAgaWYgKGVtcHR5Q2FjaGVCZXR3ZWVuT3BlcmF0aW9ucykge1xuICAgIGZpbGVDb250ZW50c0NhY2hlID0ge307XG4gICAgc291cmNlTWFwQ2FjaGUgPSB7fTtcbiAgfVxuXG4gIHZhciBuYW1lID0gZXJyb3IubmFtZSB8fCAnRXJyb3InO1xuICB2YXIgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2UgfHwgJyc7XG4gIHZhciBlcnJvclN0cmluZyA9IG5hbWUgKyBcIjogXCIgKyBtZXNzYWdlO1xuXG4gIHZhciBzdGF0ZSA9IHsgbmV4dFBvc2l0aW9uOiBudWxsLCBjdXJQb3NpdGlvbjogbnVsbCB9O1xuICB2YXIgcHJvY2Vzc2VkU3RhY2sgPSBbXTtcbiAgZm9yICh2YXIgaSA9IHN0YWNrLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgcHJvY2Vzc2VkU3RhY2sucHVzaCgnXFxuICAgIGF0ICcgKyB3cmFwQ2FsbFNpdGUoc3RhY2tbaV0sIHN0YXRlKSk7XG4gICAgc3RhdGUubmV4dFBvc2l0aW9uID0gc3RhdGUuY3VyUG9zaXRpb247XG4gIH1cbiAgc3RhdGUuY3VyUG9zaXRpb24gPSBzdGF0ZS5uZXh0UG9zaXRpb24gPSBudWxsO1xuICByZXR1cm4gZXJyb3JTdHJpbmcgKyBwcm9jZXNzZWRTdGFjay5yZXZlcnNlKCkuam9pbignJyk7XG59XG5cbi8vIEdlbmVyYXRlIHBvc2l0aW9uIGFuZCBzbmlwcGV0IG9mIG9yaWdpbmFsIHNvdXJjZSB3aXRoIHBvaW50ZXJcbmZ1bmN0aW9uIGdldEVycm9yU291cmNlKGVycm9yKSB7XG4gIHZhciBtYXRjaCA9IC9cXG4gICAgYXQgW14oXSsgXFwoKC4qKTooXFxkKyk6KFxcZCspXFwpLy5leGVjKGVycm9yLnN0YWNrKTtcbiAgaWYgKG1hdGNoKSB7XG4gICAgdmFyIHNvdXJjZSA9IG1hdGNoWzFdO1xuICAgIHZhciBsaW5lID0gK21hdGNoWzJdO1xuICAgIHZhciBjb2x1bW4gPSArbWF0Y2hbM107XG5cbiAgICAvLyBTdXBwb3J0IHRoZSBpbmxpbmUgc291cmNlQ29udGVudHMgaW5zaWRlIHRoZSBzb3VyY2UgbWFwXG4gICAgdmFyIGNvbnRlbnRzID0gZmlsZUNvbnRlbnRzQ2FjaGVbc291cmNlXTtcblxuICAgIC8vIFN1cHBvcnQgZmlsZXMgb24gZGlza1xuICAgIGlmICghY29udGVudHMgJiYgZnMgJiYgZnMuZXhpc3RzU3luYyhzb3VyY2UpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb250ZW50cyA9IGZzLnJlYWRGaWxlU3luYyhzb3VyY2UsICd1dGY4Jyk7XG4gICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICBjb250ZW50cyA9ICcnO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZvcm1hdCB0aGUgbGluZSBmcm9tIHRoZSBvcmlnaW5hbCBzb3VyY2UgY29kZSBsaWtlIG5vZGUgZG9lc1xuICAgIGlmIChjb250ZW50cykge1xuICAgICAgdmFyIGNvZGUgPSBjb250ZW50cy5zcGxpdCgvKD86XFxyXFxufFxccnxcXG4pLylbbGluZSAtIDFdO1xuICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZSArICc6JyArIGxpbmUgKyAnXFxuJyArIGNvZGUgKyAnXFxuJyArXG4gICAgICAgICAgbmV3IEFycmF5KGNvbHVtbikuam9pbignICcpICsgJ14nO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gcHJpbnRFcnJvckFuZEV4aXQgKGVycm9yKSB7XG4gIHZhciBzb3VyY2UgPSBnZXRFcnJvclNvdXJjZShlcnJvcik7XG5cbiAgLy8gRW5zdXJlIGVycm9yIGlzIHByaW50ZWQgc3luY2hyb25vdXNseSBhbmQgbm90IHRydW5jYXRlZFxuICB2YXIgc3RkZXJyID0gZ2xvYmFsUHJvY2Vzc1N0ZGVycigpO1xuICBpZiAoc3RkZXJyICYmIHN0ZGVyci5faGFuZGxlICYmIHN0ZGVyci5faGFuZGxlLnNldEJsb2NraW5nKSB7XG4gICAgc3RkZXJyLl9oYW5kbGUuc2V0QmxvY2tpbmcodHJ1ZSk7XG4gIH1cblxuICBpZiAoc291cmNlKSB7XG4gICAgY29uc29sZS5lcnJvcigpO1xuICAgIGNvbnNvbGUuZXJyb3Ioc291cmNlKTtcbiAgfVxuXG4gIGNvbnNvbGUuZXJyb3IoZXJyb3Iuc3RhY2spO1xuICBnbG9iYWxQcm9jZXNzRXhpdCgxKTtcbn1cblxuZnVuY3Rpb24gc2hpbUVtaXRVbmNhdWdodEV4Y2VwdGlvbiAoKSB7XG4gIHZhciBvcmlnRW1pdCA9IHByb2Nlc3MuZW1pdDtcblxuICBwcm9jZXNzLmVtaXQgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgIGlmICh0eXBlID09PSAndW5jYXVnaHRFeGNlcHRpb24nKSB7XG4gICAgICB2YXIgaGFzU3RhY2sgPSAoYXJndW1lbnRzWzFdICYmIGFyZ3VtZW50c1sxXS5zdGFjayk7XG4gICAgICB2YXIgaGFzTGlzdGVuZXJzID0gKHRoaXMubGlzdGVuZXJzKHR5cGUpLmxlbmd0aCA+IDApO1xuXG4gICAgICBpZiAoaGFzU3RhY2sgJiYgIWhhc0xpc3RlbmVycykge1xuICAgICAgICByZXR1cm4gcHJpbnRFcnJvckFuZEV4aXQoYXJndW1lbnRzWzFdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3JpZ0VtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxudmFyIG9yaWdpbmFsUmV0cmlldmVGaWxlSGFuZGxlcnMgPSByZXRyaWV2ZUZpbGVIYW5kbGVycy5zbGljZSgwKTtcbnZhciBvcmlnaW5hbFJldHJpZXZlTWFwSGFuZGxlcnMgPSByZXRyaWV2ZU1hcEhhbmRsZXJzLnNsaWNlKDApO1xuXG5leHBvcnRzLndyYXBDYWxsU2l0ZSA9IHdyYXBDYWxsU2l0ZTtcbmV4cG9ydHMuZ2V0RXJyb3JTb3VyY2UgPSBnZXRFcnJvclNvdXJjZTtcbmV4cG9ydHMubWFwU291cmNlUG9zaXRpb24gPSBtYXBTb3VyY2VQb3NpdGlvbjtcbmV4cG9ydHMucmV0cmlldmVTb3VyY2VNYXAgPSByZXRyaWV2ZVNvdXJjZU1hcDtcblxuZXhwb3J0cy5pbnN0YWxsID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBpZiAob3B0aW9ucy5lbnZpcm9ubWVudCkge1xuICAgIGVudmlyb25tZW50ID0gb3B0aW9ucy5lbnZpcm9ubWVudDtcbiAgICBpZiAoW1wibm9kZVwiLCBcImJyb3dzZXJcIiwgXCJhdXRvXCJdLmluZGV4T2YoZW52aXJvbm1lbnQpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZW52aXJvbm1lbnQgXCIgKyBlbnZpcm9ubWVudCArIFwiIHdhcyB1bmtub3duLiBBdmFpbGFibGUgb3B0aW9ucyBhcmUge2F1dG8sIGJyb3dzZXIsIG5vZGV9XCIpXG4gICAgfVxuICB9XG5cbiAgLy8gQWxsb3cgc291cmNlcyB0byBiZSBmb3VuZCBieSBtZXRob2RzIG90aGVyIHRoYW4gcmVhZGluZyB0aGUgZmlsZXNcbiAgLy8gZGlyZWN0bHkgZnJvbSBkaXNrLlxuICBpZiAob3B0aW9ucy5yZXRyaWV2ZUZpbGUpIHtcbiAgICBpZiAob3B0aW9ucy5vdmVycmlkZVJldHJpZXZlRmlsZSkge1xuICAgICAgcmV0cmlldmVGaWxlSGFuZGxlcnMubGVuZ3RoID0gMDtcbiAgICB9XG5cbiAgICByZXRyaWV2ZUZpbGVIYW5kbGVycy51bnNoaWZ0KG9wdGlvbnMucmV0cmlldmVGaWxlKTtcbiAgfVxuXG4gIC8vIEFsbG93IHNvdXJjZSBtYXBzIHRvIGJlIGZvdW5kIGJ5IG1ldGhvZHMgb3RoZXIgdGhhbiByZWFkaW5nIHRoZSBmaWxlc1xuICAvLyBkaXJlY3RseSBmcm9tIGRpc2suXG4gIGlmIChvcHRpb25zLnJldHJpZXZlU291cmNlTWFwKSB7XG4gICAgaWYgKG9wdGlvbnMub3ZlcnJpZGVSZXRyaWV2ZVNvdXJjZU1hcCkge1xuICAgICAgcmV0cmlldmVNYXBIYW5kbGVycy5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIHJldHJpZXZlTWFwSGFuZGxlcnMudW5zaGlmdChvcHRpb25zLnJldHJpZXZlU291cmNlTWFwKTtcbiAgfVxuXG4gIC8vIFN1cHBvcnQgcnVudGltZSB0cmFuc3BpbGVycyB0aGF0IGluY2x1ZGUgaW5saW5lIHNvdXJjZSBtYXBzXG4gIGlmIChvcHRpb25zLmhvb2tSZXF1aXJlICYmICFpc0luQnJvd3NlcigpKSB7XG4gICAgLy8gVXNlIGR5bmFtaWNSZXF1aXJlIHRvIGF2b2lkIGluY2x1ZGluZyBpbiBicm93c2VyIGJ1bmRsZXNcbiAgICB2YXIgTW9kdWxlID0gZHluYW1pY1JlcXVpcmUobW9kdWxlLCAnbW9kdWxlJyk7XG4gICAgdmFyICRjb21waWxlID0gTW9kdWxlLnByb3RvdHlwZS5fY29tcGlsZTtcblxuICAgIGlmICghJGNvbXBpbGUuX19zb3VyY2VNYXBTdXBwb3J0KSB7XG4gICAgICBNb2R1bGUucHJvdG90eXBlLl9jb21waWxlID0gZnVuY3Rpb24oY29udGVudCwgZmlsZW5hbWUpIHtcbiAgICAgICAgZmlsZUNvbnRlbnRzQ2FjaGVbZmlsZW5hbWVdID0gY29udGVudDtcbiAgICAgICAgc291cmNlTWFwQ2FjaGVbZmlsZW5hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gJGNvbXBpbGUuY2FsbCh0aGlzLCBjb250ZW50LCBmaWxlbmFtZSk7XG4gICAgICB9O1xuXG4gICAgICBNb2R1bGUucHJvdG90eXBlLl9jb21waWxlLl9fc291cmNlTWFwU3VwcG9ydCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gQ29uZmlndXJlIG9wdGlvbnNcbiAgaWYgKCFlbXB0eUNhY2hlQmV0d2Vlbk9wZXJhdGlvbnMpIHtcbiAgICBlbXB0eUNhY2hlQmV0d2Vlbk9wZXJhdGlvbnMgPSAnZW1wdHlDYWNoZUJldHdlZW5PcGVyYXRpb25zJyBpbiBvcHRpb25zID9cbiAgICAgIG9wdGlvbnMuZW1wdHlDYWNoZUJldHdlZW5PcGVyYXRpb25zIDogZmFsc2U7XG4gIH1cblxuICAvLyBJbnN0YWxsIHRoZSBlcnJvciByZWZvcm1hdHRlclxuICBpZiAoIWVycm9yRm9ybWF0dGVySW5zdGFsbGVkKSB7XG4gICAgZXJyb3JGb3JtYXR0ZXJJbnN0YWxsZWQgPSB0cnVlO1xuICAgIEVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gcHJlcGFyZVN0YWNrVHJhY2U7XG4gIH1cblxuICBpZiAoIXVuY2F1Z2h0U2hpbUluc3RhbGxlZCkge1xuICAgIHZhciBpbnN0YWxsSGFuZGxlciA9ICdoYW5kbGVVbmNhdWdodEV4Y2VwdGlvbnMnIGluIG9wdGlvbnMgP1xuICAgICAgb3B0aW9ucy5oYW5kbGVVbmNhdWdodEV4Y2VwdGlvbnMgOiB0cnVlO1xuXG4gICAgLy8gRG8gbm90IG92ZXJyaWRlICd1bmNhdWdodEV4Y2VwdGlvbicgd2l0aCBvdXIgb3duIGhhbmRsZXIgaW4gTm9kZS5qc1xuICAgIC8vIFdvcmtlciB0aHJlYWRzLiBXb3JrZXJzIHBhc3MgdGhlIGVycm9yIHRvIHRoZSBtYWluIHRocmVhZCBhcyBhbiBldmVudCxcbiAgICAvLyByYXRoZXIgdGhhbiBwcmludGluZyBzb21ldGhpbmcgdG8gc3RkZXJyIGFuZCBleGl0aW5nLlxuICAgIHRyeSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIHVzZSBgZHluYW1pY1JlcXVpcmVgIGJlY2F1c2UgYHJlcXVpcmVgIG9uIGl0J3Mgb3duIHdpbGwgYmUgb3B0aW1pemVkIGJ5IFdlYlBhY2svQnJvd3NlcmlmeS5cbiAgICAgIHZhciB3b3JrZXJfdGhyZWFkcyA9IGR5bmFtaWNSZXF1aXJlKG1vZHVsZSwgJ3dvcmtlcl90aHJlYWRzJyk7XG4gICAgICBpZiAod29ya2VyX3RocmVhZHMuaXNNYWluVGhyZWFkID09PSBmYWxzZSkge1xuICAgICAgICBpbnN0YWxsSGFuZGxlciA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge31cblxuICAgIC8vIFByb3ZpZGUgdGhlIG9wdGlvbiB0byBub3QgaW5zdGFsbCB0aGUgdW5jYXVnaHQgZXhjZXB0aW9uIGhhbmRsZXIuIFRoaXMgaXNcbiAgICAvLyB0byBzdXBwb3J0IG90aGVyIHVuY2F1Z2h0IGV4Y2VwdGlvbiBoYW5kbGVycyAoaW4gdGVzdCBmcmFtZXdvcmtzLCBmb3JcbiAgICAvLyBleGFtcGxlKS4gSWYgdGhpcyBoYW5kbGVyIGlzIG5vdCBpbnN0YWxsZWQgYW5kIHRoZXJlIGFyZSBubyBvdGhlciB1bmNhdWdodFxuICAgIC8vIGV4Y2VwdGlvbiBoYW5kbGVycywgdW5jYXVnaHQgZXhjZXB0aW9ucyB3aWxsIGJlIGNhdWdodCBieSBub2RlJ3MgYnVpbHQtaW5cbiAgICAvLyBleGNlcHRpb24gaGFuZGxlciBhbmQgdGhlIHByb2Nlc3Mgd2lsbCBzdGlsbCBiZSB0ZXJtaW5hdGVkLiBIb3dldmVyLCB0aGVcbiAgICAvLyBnZW5lcmF0ZWQgSmF2YVNjcmlwdCBjb2RlIHdpbGwgYmUgc2hvd24gYWJvdmUgdGhlIHN0YWNrIHRyYWNlIGluc3RlYWQgb2ZcbiAgICAvLyB0aGUgb3JpZ2luYWwgc291cmNlIGNvZGUuXG4gICAgaWYgKGluc3RhbGxIYW5kbGVyICYmIGhhc0dsb2JhbFByb2Nlc3NFdmVudEVtaXR0ZXIoKSkge1xuICAgICAgdW5jYXVnaHRTaGltSW5zdGFsbGVkID0gdHJ1ZTtcbiAgICAgIHNoaW1FbWl0VW5jYXVnaHRFeGNlcHRpb24oKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydHMucmVzZXRSZXRyaWV2ZUhhbmRsZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHJpZXZlRmlsZUhhbmRsZXJzLmxlbmd0aCA9IDA7XG4gIHJldHJpZXZlTWFwSGFuZGxlcnMubGVuZ3RoID0gMDtcblxuICByZXRyaWV2ZUZpbGVIYW5kbGVycyA9IG9yaWdpbmFsUmV0cmlldmVGaWxlSGFuZGxlcnMuc2xpY2UoMCk7XG4gIHJldHJpZXZlTWFwSGFuZGxlcnMgPSBvcmlnaW5hbFJldHJpZXZlTWFwSGFuZGxlcnMuc2xpY2UoMCk7XG5cbiAgcmV0cmlldmVTb3VyY2VNYXAgPSBoYW5kbGVyRXhlYyhyZXRyaWV2ZU1hcEhhbmRsZXJzKTtcbiAgcmV0cmlldmVGaWxlID0gaGFuZGxlckV4ZWMocmV0cmlldmVGaWxlSGFuZGxlcnMpO1xufVxuIiwicmVxdWlyZSgnLi8nKS5pbnN0YWxsKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZXZlbnRzXzEgPSByZXF1aXJlKFwiZXZlbnRzXCIpO1xudmFyIGNoaWxkX3Byb2Nlc3NfMSA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xudmFyIGZzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImZzXCIpKTtcbnZhciBodHRwc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJodHRwc1wiKSk7XG52YXIgb3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwib3NcIikpO1xudmFyIHN0cmVhbV8xID0gcmVxdWlyZShcInN0cmVhbVwiKTtcbnZhciBleGVjdXRhYmxlTmFtZSA9ICd5dC1kbHAnO1xudmFyIHByb2dyZXNzUmVnZXggPSAvXFxbZG93bmxvYWRcXF0gKiguKikgb2YgKFteIF0qKSg6PyAqYXQgKihbXiBdKikpPyg6PyAqRVRBICooW14gXSopKT8vO1xudmFyIFlURGxwV3JhcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBZVERscFdyYXAoYmluYXJ5UGF0aCkge1xuICAgICAgICBpZiAoYmluYXJ5UGF0aCA9PT0gdm9pZCAwKSB7IGJpbmFyeVBhdGggPSBleGVjdXRhYmxlTmFtZTsgfVxuICAgICAgICB0aGlzLmJpbmFyeVBhdGggPSBiaW5hcnlQYXRoO1xuICAgIH1cbiAgICBZVERscFdyYXAucHJvdG90eXBlLmdldEJpbmFyeVBhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJpbmFyeVBhdGg7XG4gICAgfTtcbiAgICBZVERscFdyYXAucHJvdG90eXBlLnNldEJpbmFyeVBhdGggPSBmdW5jdGlvbiAoYmluYXJ5UGF0aCkge1xuICAgICAgICB0aGlzLmJpbmFyeVBhdGggPSBiaW5hcnlQYXRoO1xuICAgIH07XG4gICAgWVREbHBXcmFwLmNyZWF0ZUdldE1lc3NhZ2UgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBodHRwc18xLmRlZmF1bHQuZ2V0KHVybCwgZnVuY3Rpb24gKGh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGh0dHBSZXNwb25zZS5vbignZXJyb3InLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gcmVqZWN0KGUpOyB9KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGh0dHBSZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBZVERscFdyYXAucHJvY2Vzc01lc3NhZ2VUb0ZpbGUgPSBmdW5jdGlvbiAobWVzc2FnZSwgZmlsZVBhdGgpIHtcbiAgICAgICAgdmFyIGZpbGUgPSBmc18xLmRlZmF1bHQuY3JlYXRlV3JpdGVTdHJlYW0oZmlsZVBhdGgpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbWVzc2FnZS5waXBlKGZpbGUpO1xuICAgICAgICAgICAgbWVzc2FnZS5vbignZXJyb3InLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gcmVqZWN0KGUpOyB9KTtcbiAgICAgICAgICAgIGZpbGUub24oJ2ZpbmlzaCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5zdGF0dXNDb2RlID09IDIwMCA/IHJlc29sdmUobWVzc2FnZSkgOiByZWplY3QobWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBZVERscFdyYXAuZG93bmxvYWRGaWxlID0gZnVuY3Rpb24gKGZpbGVVUkwsIGZpbGVQYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50VXJsLCBtZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFVybCA9IGZpbGVVUkw7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFVybCkgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBZVERscFdyYXAuY3JlYXRlR2V0TWVzc2FnZShjdXJyZW50VXJsKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaGVhZGVycy5sb2NhdGlvbikgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VXJsID0gbWVzc2FnZS5oZWFkZXJzLmxvY2F0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFs0IC8qeWllbGQqLywgWVREbHBXcmFwLnByb2Nlc3NNZXNzYWdlVG9GaWxlKG1lc3NhZ2UsIGZpbGVQYXRoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFlURGxwV3JhcC5nZXRHaXRodWJSZWxlYXNlcyA9IGZ1bmN0aW9uIChwYWdlLCBwZXJQYWdlKSB7XG4gICAgICAgIGlmIChwYWdlID09PSB2b2lkIDApIHsgcGFnZSA9IDE7IH1cbiAgICAgICAgaWYgKHBlclBhZ2UgPT09IHZvaWQgMCkgeyBwZXJQYWdlID0gMTsgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIGFwaVVSTCA9ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL3l0LWRscC95dC1kbHAvcmVsZWFzZXM/cGFnZT0nICtcbiAgICAgICAgICAgICAgICBwYWdlICtcbiAgICAgICAgICAgICAgICAnJnBlcl9wYWdlPScgK1xuICAgICAgICAgICAgICAgIHBlclBhZ2U7XG4gICAgICAgICAgICBodHRwc18xLmRlZmF1bHQuZ2V0KGFwaVVSTCwgeyBoZWFkZXJzOiB7ICdVc2VyLUFnZW50JzogJ25vZGUnIH0gfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc29uc2VTdHJpbmcgPSAnJztcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zZXRFbmNvZGluZygndXRmOCcpO1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLm9uKCdkYXRhJywgZnVuY3Rpb24gKGJvZHkpIHsgcmV0dXJuIChyZXNvbnNlU3RyaW5nICs9IGJvZHkpOyB9KTtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5vbignZXJyb3InLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gcmVqZWN0KGUpOyB9KTtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSAyMDBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcmVzb2x2ZShKU09OLnBhcnNlKHJlc29uc2VTdHJpbmcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiByZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgWVREbHBXcmFwLmRvd25sb2FkRnJvbUdpdGh1YiA9IGZ1bmN0aW9uIChmaWxlUGF0aCwgdmVyc2lvbiwgcGxhdGZvcm0pIHtcbiAgICAgICAgaWYgKHBsYXRmb3JtID09PSB2b2lkIDApIHsgcGxhdGZvcm0gPSBvc18xLmRlZmF1bHQucGxhdGZvcm0oKTsgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaXNXaW4zMiwgZmlsZU5hbWUsIGZpbGVVUkw7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1dpbjMyID0gcGxhdGZvcm0gPT0gJ3dpbjMyJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lID0gXCJcIi5jb25jYXQoZXhlY3V0YWJsZU5hbWUpLmNvbmNhdChpc1dpbjMyID8gJy5leGUnIDogJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhdmVyc2lvbikgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBZVERscFdyYXAuZ2V0R2l0aHViUmVsZWFzZXMoMSwgMSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uID0gKF9hLnNlbnQoKSlbMF0udGFnX25hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmlsZVBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGggPSAnLi8nICsgZmlsZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlVVJMID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS95dC1kbHAveXQtZGxwL3JlbGVhc2VzL2Rvd25sb2FkLycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb24gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBZVERscFdyYXAuZG93bmxvYWRGaWxlKGZpbGVVUkwsIGZpbGVQYXRoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICFpc1dpbjMyICYmIGZzXzEuZGVmYXVsdC5jaG1vZFN5bmMoZmlsZVBhdGgsICc3NzcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBZVERscFdyYXAucHJvdG90eXBlLmV4ZWMgPSBmdW5jdGlvbiAoeXREbHBBcmd1bWVudHMsIG9wdGlvbnMsIGFib3J0U2lnbmFsKSB7XG4gICAgICAgIGlmICh5dERscEFyZ3VtZW50cyA9PT0gdm9pZCAwKSB7IHl0RGxwQXJndW1lbnRzID0gW107IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgaWYgKGFib3J0U2lnbmFsID09PSB2b2lkIDApIHsgYWJvcnRTaWduYWwgPSBudWxsOyB9XG4gICAgICAgIG9wdGlvbnMgPSBZVERscFdyYXAuc2V0RGVmYXVsdE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHZhciBleGVjRXZlbnRFbWl0dGVyID0gbmV3IGV2ZW50c18xLkV2ZW50RW1pdHRlcigpO1xuICAgICAgICB2YXIgeXREbHBQcm9jZXNzID0gKDAsIGNoaWxkX3Byb2Nlc3NfMS5zcGF3bikodGhpcy5iaW5hcnlQYXRoLCB5dERscEFyZ3VtZW50cywgb3B0aW9ucyk7XG4gICAgICAgIGV4ZWNFdmVudEVtaXR0ZXIueXREbHBQcm9jZXNzID0geXREbHBQcm9jZXNzO1xuICAgICAgICBZVERscFdyYXAuYmluZEFib3J0U2lnbmFsKGFib3J0U2lnbmFsLCB5dERscFByb2Nlc3MpO1xuICAgICAgICB2YXIgc3RkZXJyRGF0YSA9ICcnO1xuICAgICAgICB2YXIgcHJvY2Vzc0Vycm9yO1xuICAgICAgICB5dERscFByb2Nlc3Muc3Rkb3V0Lm9uKCdkYXRhJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBZVERscFdyYXAuZW1pdFlvdXR1YmVEbEV2ZW50cyhkYXRhLnRvU3RyaW5nKCksIGV4ZWNFdmVudEVtaXR0ZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgeXREbHBQcm9jZXNzLnN0ZGVyci5vbignZGF0YScsIGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiAoc3RkZXJyRGF0YSArPSBkYXRhLnRvU3RyaW5nKCkpOyB9KTtcbiAgICAgICAgeXREbHBQcm9jZXNzLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnJvcikgeyByZXR1cm4gKHByb2Nlc3NFcnJvciA9IGVycm9yKTsgfSk7XG4gICAgICAgIHl0RGxwUHJvY2Vzcy5vbignY2xvc2UnLCBmdW5jdGlvbiAoY29kZSkge1xuICAgICAgICAgICAgaWYgKGNvZGUgPT09IDAgfHwgeXREbHBQcm9jZXNzLmtpbGxlZClcbiAgICAgICAgICAgICAgICBleGVjRXZlbnRFbWl0dGVyLmVtaXQoJ2Nsb3NlJywgY29kZSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZXhlY0V2ZW50RW1pdHRlci5lbWl0KCdlcnJvcicsIFlURGxwV3JhcC5jcmVhdGVFcnJvcihjb2RlLCBwcm9jZXNzRXJyb3IsIHN0ZGVyckRhdGEpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBleGVjRXZlbnRFbWl0dGVyO1xuICAgIH07XG4gICAgWVREbHBXcmFwLnByb3RvdHlwZS5leGVjUHJvbWlzZSA9IGZ1bmN0aW9uICh5dERscEFyZ3VtZW50cywgb3B0aW9ucywgYWJvcnRTaWduYWwpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHl0RGxwQXJndW1lbnRzID09PSB2b2lkIDApIHsgeXREbHBBcmd1bWVudHMgPSBbXTsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICBpZiAoYWJvcnRTaWduYWwgPT09IHZvaWQgMCkgeyBhYm9ydFNpZ25hbCA9IG51bGw7IH1cbiAgICAgICAgdmFyIHl0RGxwUHJvY2VzcztcbiAgICAgICAgdmFyIHl0RGxwUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBZVERscFdyYXAuc2V0RGVmYXVsdE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICB5dERscFByb2Nlc3MgPSAoMCwgY2hpbGRfcHJvY2Vzc18xLmV4ZWNGaWxlKShfdGhpcy5iaW5hcnlQYXRoLCB5dERscEFyZ3VtZW50cywgb3B0aW9ucywgZnVuY3Rpb24gKGVycm9yLCBzdGRvdXQsIHN0ZGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFlURGxwV3JhcC5jcmVhdGVFcnJvcihlcnJvciwgbnVsbCwgc3RkZXJyKSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdGRvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBZVERscFdyYXAuYmluZEFib3J0U2lnbmFsKGFib3J0U2lnbmFsLCB5dERscFByb2Nlc3MpO1xuICAgICAgICB9KTtcbiAgICAgICAgeXREbHBQcm9taXNlLnl0RGxwUHJvY2VzcyA9IHl0RGxwUHJvY2VzcztcbiAgICAgICAgcmV0dXJuIHl0RGxwUHJvbWlzZTtcbiAgICB9O1xuICAgIFlURGxwV3JhcC5wcm90b3R5cGUuZXhlY1N0cmVhbSA9IGZ1bmN0aW9uICh5dERscEFyZ3VtZW50cywgb3B0aW9ucywgYWJvcnRTaWduYWwpIHtcbiAgICAgICAgaWYgKHl0RGxwQXJndW1lbnRzID09PSB2b2lkIDApIHsgeXREbHBBcmd1bWVudHMgPSBbXTsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICBpZiAoYWJvcnRTaWduYWwgPT09IHZvaWQgMCkgeyBhYm9ydFNpZ25hbCA9IG51bGw7IH1cbiAgICAgICAgdmFyIHJlYWRTdHJlYW0gPSBuZXcgc3RyZWFtXzEuUmVhZGFibGUoeyByZWFkOiBmdW5jdGlvbiAoc2l6ZSkgeyB9IH0pO1xuICAgICAgICBvcHRpb25zID0gWVREbHBXcmFwLnNldERlZmF1bHRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB5dERscEFyZ3VtZW50cyA9IHl0RGxwQXJndW1lbnRzLmNvbmNhdChbJy1vJywgJy0nXSk7XG4gICAgICAgIHZhciB5dERscFByb2Nlc3MgPSAoMCwgY2hpbGRfcHJvY2Vzc18xLnNwYXduKSh0aGlzLmJpbmFyeVBhdGgsIHl0RGxwQXJndW1lbnRzLCBvcHRpb25zKTtcbiAgICAgICAgcmVhZFN0cmVhbS55dERscFByb2Nlc3MgPSB5dERscFByb2Nlc3M7XG4gICAgICAgIFlURGxwV3JhcC5iaW5kQWJvcnRTaWduYWwoYWJvcnRTaWduYWwsIHl0RGxwUHJvY2Vzcyk7XG4gICAgICAgIHZhciBzdGRlcnJEYXRhID0gJyc7XG4gICAgICAgIHZhciBwcm9jZXNzRXJyb3I7XG4gICAgICAgIHl0RGxwUHJvY2Vzcy5zdGRvdXQub24oJ2RhdGEnLCBmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gcmVhZFN0cmVhbS5wdXNoKGRhdGEpOyB9KTtcbiAgICAgICAgeXREbHBQcm9jZXNzLnN0ZGVyci5vbignZGF0YScsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgc3RyaW5nRGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIFlURGxwV3JhcC5lbWl0WW91dHViZURsRXZlbnRzKHN0cmluZ0RhdGEsIHJlYWRTdHJlYW0pO1xuICAgICAgICAgICAgc3RkZXJyRGF0YSArPSBzdHJpbmdEYXRhO1xuICAgICAgICB9KTtcbiAgICAgICAgeXREbHBQcm9jZXNzLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnJvcikgeyByZXR1cm4gKHByb2Nlc3NFcnJvciA9IGVycm9yKTsgfSk7XG4gICAgICAgIHl0RGxwUHJvY2Vzcy5vbignY2xvc2UnLCBmdW5jdGlvbiAoY29kZSkge1xuICAgICAgICAgICAgaWYgKGNvZGUgPT09IDAgfHwgeXREbHBQcm9jZXNzLmtpbGxlZCkge1xuICAgICAgICAgICAgICAgIHJlYWRTdHJlYW0uZW1pdCgnY2xvc2UnKTtcbiAgICAgICAgICAgICAgICByZWFkU3RyZWFtLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICByZWFkU3RyZWFtLmVtaXQoJ2VuZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gWVREbHBXcmFwLmNyZWF0ZUVycm9yKGNvZGUsIHByb2Nlc3NFcnJvciwgc3RkZXJyRGF0YSk7XG4gICAgICAgICAgICAgICAgcmVhZFN0cmVhbS5lbWl0KCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICByZWFkU3RyZWFtLmRlc3Ryb3koZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlYWRTdHJlYW07XG4gICAgfTtcbiAgICBZVERscFdyYXAucHJvdG90eXBlLmdldEV4dHJhY3RvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB5dERscFN0ZG91dDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5leGVjUHJvbWlzZShbJy0tbGlzdC1leHRyYWN0b3JzJ10pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgeXREbHBTdGRvdXQgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgeXREbHBTdGRvdXQuc3BsaXQoJ1xcbicpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBZVERscFdyYXAucHJvdG90eXBlLmdldEV4dHJhY3RvckRlc2NyaXB0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHl0RGxwU3Rkb3V0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmV4ZWNQcm9taXNlKFsnLS1leHRyYWN0b3ItZGVzY3JpcHRpb25zJ10pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgeXREbHBTdGRvdXQgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgeXREbHBTdGRvdXQuc3BsaXQoJ1xcbicpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBZVERscFdyYXAucHJvdG90eXBlLmdldEhlbHAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB5dERscFN0ZG91dDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5leGVjUHJvbWlzZShbJy0taGVscCddKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHl0RGxwU3Rkb3V0ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHl0RGxwU3Rkb3V0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBZVERscFdyYXAucHJvdG90eXBlLmdldFVzZXJBZ2VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHl0RGxwU3Rkb3V0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmV4ZWNQcm9taXNlKFsnLS1kdW1wLXVzZXItYWdlbnQnXSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICB5dERscFN0ZG91dCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB5dERscFN0ZG91dF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgWVREbHBXcmFwLnByb3RvdHlwZS5nZXRWZXJzaW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgeXREbHBTdGRvdXQ7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZXhlY1Byb21pc2UoWyctLXZlcnNpb24nXSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICB5dERscFN0ZG91dCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB5dERscFN0ZG91dF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgWVREbHBXcmFwLnByb3RvdHlwZS5nZXRWaWRlb0luZm8gPSBmdW5jdGlvbiAoeXREbHBBcmd1bWVudHMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHl0RGxwU3Rkb3V0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB5dERscEFyZ3VtZW50cyA9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5dERscEFyZ3VtZW50cyA9IFt5dERscEFyZ3VtZW50c107XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXl0RGxwQXJndW1lbnRzLmluY2x1ZGVzKCctZicpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIXl0RGxwQXJndW1lbnRzLmluY2x1ZGVzKCctLWZvcm1hdCcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHl0RGxwQXJndW1lbnRzID0geXREbHBBcmd1bWVudHMuY29uY2F0KFsnLWYnLCAnYmVzdCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZXhlY1Byb21pc2UoeXREbHBBcmd1bWVudHMuY29uY2F0KFsnLS1kdW1wLWpzb24nXSkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgeXREbHBTdGRvdXQgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBKU09OLnBhcnNlKHl0RGxwU3Rkb3V0KV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBKU09OLnBhcnNlKCdbJyArIHl0RGxwU3Rkb3V0LnJlcGxhY2UoL1xcbi9nLCAnLCcpLnNsaWNlKDAsIC0xKSArICddJyldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFlURGxwV3JhcC5iaW5kQWJvcnRTaWduYWwgPSBmdW5jdGlvbiAoc2lnbmFsLCBwcm9jZXNzKSB7XG4gICAgICAgIHNpZ25hbCA9PT0gbnVsbCB8fCBzaWduYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKG9zXzEuZGVmYXVsdC5wbGF0Zm9ybSgpID09PSAnd2luMzInKVxuICAgICAgICAgICAgICAgICAgICAoMCwgY2hpbGRfcHJvY2Vzc18xLmV4ZWNTeW5jKShcInRhc2traWxsIC9waWQgXCIuY29uY2F0KHByb2Nlc3MucGlkLCBcIiAvVCAvRlwiKSk7XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICgwLCBjaGlsZF9wcm9jZXNzXzEuZXhlY1N5bmMpKFwicGdyZXAgLVAgXCIuY29uY2F0KHByb2Nlc3MucGlkLCBcIiB8IHhhcmdzIC1MIDEga2lsbFwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBhdCBsZWFzdCB3ZSB0cmllZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5raWxsKCk7IC8vIGNhbGwgdG8gbWFrZSBzdXJlIHRoYXQgb2JqZWN0IHN0YXRlIGlzIHVwZGF0ZWQgZXZlbiBpZiB0YXNrIG1pZ2h0IGJlIGFscmVhZHkga2lsbGVkIGJ5IE9TXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgWVREbHBXcmFwLnNldERlZmF1bHRPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLm1heEJ1ZmZlcilcbiAgICAgICAgICAgIG9wdGlvbnMubWF4QnVmZmVyID0gMTAyNCAqIDEwMjQgKiAxMDI0O1xuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9O1xuICAgIFlURGxwV3JhcC5jcmVhdGVFcnJvciA9IGZ1bmN0aW9uIChjb2RlLCBwcm9jZXNzRXJyb3IsIHN0ZGVyckRhdGEpIHtcbiAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9ICdcXG5FcnJvciBjb2RlOiAnICsgY29kZTtcbiAgICAgICAgaWYgKHByb2Nlc3NFcnJvcilcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSAnXFxuXFxuUHJvY2VzcyBlcnJvcjpcXG4nICsgcHJvY2Vzc0Vycm9yO1xuICAgICAgICBpZiAoc3RkZXJyRGF0YSlcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSAnXFxuXFxuU3RkZXJyOlxcbicgKyBzdGRlcnJEYXRhO1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgfTtcbiAgICBZVERscFdyYXAuZW1pdFlvdXR1YmVEbEV2ZW50cyA9IGZ1bmN0aW9uIChzdHJpbmdEYXRhLCBlbWl0dGVyKSB7XG4gICAgICAgIHZhciBvdXRwdXRMaW5lcyA9IHN0cmluZ0RhdGEuc3BsaXQoL1xccnxcXG4vZykuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIG91dHB1dExpbmVzXzEgPSBvdXRwdXRMaW5lczsgX2kgPCBvdXRwdXRMaW5lc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIG91dHB1dExpbmUgPSBvdXRwdXRMaW5lc18xW19pXTtcbiAgICAgICAgICAgIGlmIChvdXRwdXRMaW5lWzBdID09ICdbJykge1xuICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzc01hdGNoID0gb3V0cHV0TGluZS5tYXRjaChwcm9ncmVzc1JlZ2V4KTtcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NPYmplY3QgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NPYmplY3QucGVyY2VudCA9IHBhcnNlRmxvYXQocHJvZ3Jlc3NNYXRjaFsxXS5yZXBsYWNlKCclJywgJycpKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NPYmplY3QudG90YWxTaXplID0gcHJvZ3Jlc3NNYXRjaFsyXS5yZXBsYWNlKCd+JywgJycpO1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc09iamVjdC5jdXJyZW50U3BlZWQgPSBwcm9ncmVzc01hdGNoWzRdO1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc09iamVjdC5ldGEgPSBwcm9ncmVzc01hdGNoWzZdO1xuICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoJ3Byb2dyZXNzJywgcHJvZ3Jlc3NPYmplY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRUeXBlID0gb3V0cHV0TGluZVxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJyAnKVswXVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgnWycsICcnKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgnXScsICcnKTtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnREYXRhID0gb3V0cHV0TGluZS5zdWJzdHJpbmcob3V0cHV0TGluZS5pbmRleE9mKCcgJyksIG91dHB1dExpbmUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoJ3l0RGxwRXZlbnQnLCBldmVudFR5cGUsIGV2ZW50RGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBZVERscFdyYXA7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWVREbHBXcmFwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sIm5hbWVzIjpbInJlcXVpcmUkJDAiLCJyZXF1aXJlJCQxIiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJyZXF1aXJlJCQ0IiwicGF0aCIsInRoaXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUEsSUFBSSxZQUFZLEdBQUcsa0VBQWtFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzs7QUFFL0Y7QUFDQTtBQUNBO0FBQ0EsQ0FBYyxNQUFBLENBQUEsTUFBQSxHQUFHLFVBQVUsTUFBTSxFQUFFO0dBQ2pDLElBQUksQ0FBQyxJQUFJLE1BQU0sSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRTtBQUNuRCxLQUFJLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQztBQUMvQjtBQUNBLEdBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyw0QkFBNEIsR0FBRyxNQUFNLENBQUM7RUFDM0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFjLE1BQUEsQ0FBQSxNQUFBLEdBQUcsVUFBVSxR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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0N2QixDQUFBLElBQUksU0FBUyxHQUFHLENBQUNNLElBQUksSUFBSUEsSUFBSSxDQUFDLFNBQVMsS0FBSyxVQUFVLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtLQUNyRixTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzlHLEtBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFNBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDakcsU0FBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3BHLFNBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNwSCxTQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDN0UsTUFBSyxDQUFDO0VBQ0w7QUFDRCxDQUFBLElBQUksV0FBVyxHQUFHLENBQUNBLElBQUksSUFBSUEsSUFBSSxDQUFDLFdBQVcsS0FBSyxVQUFVLE9BQU8sRUFBRSxJQUFJLEVBQUU7S0FDckUsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FDaEgsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0tBQ3hKLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwRSxLQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtTQUNkLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUM7U0FDN0QsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixhQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQzthQUM1SixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNuRCxhQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDVCxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztpQkFDeEIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtpQkFDdkQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hDLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2lCQUN4QztxQkFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUztxQkFDMUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07QUFDeEcscUJBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07QUFDdkYscUJBQW9CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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LElBQUEsQ0FBQSxPQUFlLEdBQUcsU0FBUztBQUMzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNF19
