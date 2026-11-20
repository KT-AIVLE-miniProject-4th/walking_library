/* @ds-bundle: {"format":4,"namespace":"BoneKombu","components":[{"name":"Button"},{"name":"TextInput"},{"name":"Select"},{"name":"Badge"}]} */
(function () {
  var R = window.React, h = R.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function omit(o, keys) { var r = {}; for (var k in o) if (keys.indexOf(k) < 0) r[k] = o[k]; return r; }

  function Button(p) {
    var variant = p.variant || "secondary";
    return h("button", Object.assign({ type: "button" }, omit(p, ["variant", "pill", "className", "children"]), {
      className: cx("bk-btn", variant === "primary" && "bk-btn-primary", p.pill && "bk-btn-pill", p.className)
    }), p.children);
  }

  function TextInput(p) {
    var id = p.id || ("bk-" + (p.label || "input").toLowerCase().replace(/[^a-z0-9]+/g, "-"));
    var input = h("input", Object.assign({ type: p.type || "text" }, omit(p, ["label", "className", "type", "id"]), {
      id: id, className: cx("bk-input", p.type === "search" && "bk-input-search", p.className)
    }));
    if (!p.label) return input;
    return h("div", { className: "bk-field" }, h("label", { className: "bk-label", htmlFor: id }, p.label), input);
  }

  function Select(p) {
    var opts = (p.options || []).map(function (o) {
      var v = typeof o === "string" ? o : o.value, l = typeof o === "string" ? o : o.label;
      return h("option", { key: v, value: v }, l);
    });
    return h("select", Object.assign({}, omit(p, ["options", "className"]), { className: cx("bk-select", p.className) }), opts);
  }

  function Badge(p) {
    var tone = p.tone || "neutral";
    return h("span", { className: cx("bk-badge", tone !== "neutral" && "bk-badge-" + tone) }, p.children);
  }

  window.BoneKombu = Object.assign(window.BoneKombu || {}, { Button: Button, TextInput: TextInput, Select: Select, Badge: Badge });
})();
