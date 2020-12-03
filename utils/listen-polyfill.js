import _extends from "@babel/runtime/helpers/esm/extends";

function hasBasename(path, prefix) {
  return (
    path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 &&
    "/?#".indexOf(path.charAt(prefix.length)) !== -1
  );
}

function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}

function parsePath(path) {
    var pathname = path || '/';
    var search = '';
    var hash = '';
    var hashIndex = pathname.indexOf('#');
  
    if (hashIndex !== -1) {
      hash = pathname.substr(hashIndex);
      pathname = pathname.substr(0, hashIndex);
    }
  
    var searchIndex = pathname.indexOf('?');
  
    if (searchIndex !== -1) {
      search = pathname.substr(searchIndex);
      pathname = pathname.substr(0, searchIndex);
    }
  
    return {
      pathname: pathname,
      search: search === '?' ? '' : search,
      hash: hash === '#' ? '' : hash
    };
  }

function createLocation(path, state, key, currentLocation) {
  var location;

  if (typeof path === "string") {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);
    if (location.pathname === undefined) location.pathname = "";

    if (location.search) {
      if (location.search.charAt(0) !== "?")
        location.search = "?" + location.search;
    } else {
      location.search = "";
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== "#") location.hash = "#" + location.hash;
    } else {
      location.hash = "";
    }

    if (state !== undefined && location.state === undefined)
      location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    // if (e instanceof URIError) {
    //   throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    // } else {
    throw e;
    // }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== "/") {
      location.pathname = resolvePathname(
        location.pathname,
        currentLocation.pathname
      );
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = "/";
    }
  }

  return location;
}


/**
 * allPaths
 */
function getDOMLocation(historyState) {
  var _ref = historyState || {},
    key = _ref.key,
    state = _ref.state;

    // var _window$location = window.location,
  var _window$location = global.window ? window.location : {}, // modified due to window undefined error
    pathname = _window$location.pathname,
    search = _window$location.search,
    hash = _window$location.hash;
  var path = pathname + search + hash;
//   process.env.NODE_ENV !== "production"
//     ? console.warn(
//         !basename || hasBasename(path, basename),
//         "You are attempting to use a basename on a page whose URL path does not begin " +
//           'with the basename. Expected path "' +
//           path +
//           '" to begin with "' +
//           basename +
//           '".'
//       )
//     : void 0;
//   if (basename) path = stripBasename(path, basename);
  return createLocation(path, state, key);
}

function createPath(location) {
  var pathname = location.pathname,
    search = location.search,
    hash = location.hash;
  var path = pathname || "/";
  if (search && search !== "?")
    path += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") path += hash.charAt(0) === "#" ? hash : "#" + hash;
  return path;
}

function getHistoryState() {
    try {
      return window.history.state || {};
    } catch (e) {
      // IE 11 sometimes throws when accessing window.history.state
      // See https://github.com/ReactTraining/history/pull/289
      return {};
    }
  }

var initialLocation = getDOMLocation(getHistoryState());

var allPaths = [createPath(initialLocation)]; // Public interface




function revertPop(fromLocation) {
  var toLocation = history.location; // TODO: We could probably make this more reliable by
  // keeping a list of paths we've seen in sessionStorage.
  // Instead, we just default to 0 for paths we don't know.

  var toIndex = allPaths.lastIndexOf(createPath(toLocation));
  if (toIndex === -1) toIndex = 0;
  var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
  if (fromIndex === -1) fromIndex = 0;
  var delta = toIndex - fromIndex;

  if (delta) {
    forceNextPop = true;
    go(delta);
  }
} // Ensure the hash is encoded properly before doing anything else.

function setState(nextState) {
  _extends(history, nextState);

  history.length = globalHistory.length;
  transitionManager.notifyListeners(history.location, history.action);
}

function handlePop(location) {
  if (forceNextPop) {
    forceNextPop = false;
    setState();
  } else {
    var action = "POP";
    transitionManager.confirmTransitionTo(location, action, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
        });
      } else {
        revertPop(location);
      }
    });
  }
}

var PopStateEvent = "popstate";

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function isExtraneousPopstateEvent(event) {
  return (
    event.state === undefined && navigator.userAgent.indexOf("CriOS") === -1
  );
}

function handlePopState(event) {
  // Ignore extraneous popstate events in WebKit.
  if (isExtraneousPopstateEvent(event)) return;
  handlePop(getDOMLocation(event.state));
}

var listenerCount = 0;

function checkDOMListeners(delta) {
  listenerCount += delta;

  if (listenerCount === 1 && delta === 1) {
    window.addEventListener(PopStateEvent, handlePopState);
    // if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
  } else if (listenerCount === 0) {
    window.removeEventListener(PopStateEvent, handlePopState);
    // if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
  }
}

function createTransitionManager() {
  // var prompt = null;

  // function setPrompt(nextPrompt) {
  //   process.env.NODE_ENV !== "production" ? warning(prompt == null, 'A history supports only one prompt at a time') : void 0;
  //   prompt = nextPrompt;
  //   return function () {
  //     if (prompt === nextPrompt) prompt = null;
  //   };
  // }

  function confirmTransitionTo(location, action, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result =
        typeof prompt === "function" ? prompt(location, action) : prompt;

      if (typeof result === "string") {
        // if (typeof getUserConfirmation === 'function') {
        //   getUserConfirmation(result, callback);
        // } else {
        // process.env.NODE_ENV !== "production" ? warning(false, 'A history needs a getUserConfirmation function in order to use a prompt message') : void 0;
        callback(true);
        // }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  var listeners = [];

  function appendListener(fn) {
    var isActive = true;

    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function notifyListeners() {
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    // setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners,
  };
}
/**
 * Sets up a listener that will be called whenever the current location
 * changes.
 *
 * @param listener - A function that will be called when the location changes
 * @returns unlisten - A function that may be used to stop listening
 *
 * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md#history.listen
 */
// listen(listener: Listener<S>): () => void;
const listen = (listener) => {
  var transitionManager = createTransitionManager();
  var unlisten = transitionManager.appendListener(listener);
  checkDOMListeners(1);
  return function () {
    checkDOMListeners(-1);
    unlisten();
  };
};

export default listen;
