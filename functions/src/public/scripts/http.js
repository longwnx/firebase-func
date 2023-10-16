const Http = (() => {
  // Setup request for json
  const getOptions = (verb, data) => {
    const options = {
      dataType: "json",
      method: verb,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    return options;
  };
  // Set Http methods
  return {
    get: (path) => fetch(path, getOptions("GET")),
    post: (path, data) => fetch(path, getOptions("POST", data)),
    put: (path, data) => fetch(path, getOptions("PUT", data)),
    delete: (path) => fetch(path, getOptions("DELETE")),
  };
})();
