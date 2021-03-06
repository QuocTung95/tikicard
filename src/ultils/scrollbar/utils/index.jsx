let  scrollbarWidth = false;
let IS_UNITLESS = {
    animationIterationCount: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridRow: true,
    gridColumn: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
  
    // SVG-related properties
    fillOpacity: true,
    stopOpacity: true,
    strokeDashoffset: true,
    strokeOpacity: true,
    strokeWidth: true
  };
let cache = { 'float': 'cssFloat' }
let div = null;

let hasSpace = /\s/
let hasSeparator = /(_|-|\.|:)/
let hasCamel = /([a-z][A-Z]|[A-Z][a-z])/

/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase(string) {
  if (hasSpace.test(string)) return string.toLowerCase()
  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase()
  if (hasCamel.test(string)) return uncamelize(string).toLowerCase()
  return string.toLowerCase()
}

/**
 * Separator splitter.
 */

let separatorSplitter = /[\W_]+(.|$)/g

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : ''
  })
}

/**
 * Camelcase splitter.
 */

let camelSplitter = /(.)([A-Z]+)/g

/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize(string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ')
  })
}

function toSpaceCase(string) {
    return toNoCase(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
      return match ? ' ' + match : ''
    }).trim()
  }

export default {
    getInnerHeight:function (el) {
        let clientHeight = el.clientHeight;
        let _style = getComputedStyle(el);
        return clientHeight - parseFloat(_style.paddingTop) - parseFloat(_style.paddingBottom);
    },

    getInnerWidth:function (el) {
        let clientWidth = el.clientWidth;
        let _style = getComputedStyle(el);
        return clientWidth - parseFloat(_style.paddingLeft) - parseFloat(_style.paddingRight);
    },

    getScrollbarWidth:function () {
        if (scrollbarWidth !== false) return scrollbarWidth;
        /* istanbul ignore else */
        if (typeof document !== 'undefined') {
            let div = document.createElement('div');
            div.style.width = 100;
            div.style.height = 100;
            div.style.position = 'absolute';
            div.style.top = -9999;
            div.style.overflow = 'scroll';
            div.style.MsOverflowStyle = 'scrollbar';
            document.body.appendChild(div);
            scrollbarWidth = (div.offsetWidth - div.clientWidth);
            document.body.removeChild(div);
        } else {
            scrollbarWidth = 0;
        }
        return scrollbarWidth || 0;
    },

    isString:function (maybe) {
        return typeof maybe === 'string';
    },

    returnFalse:function () {
        return false;
    },

    toCamelCase:function(string) {
        return toSpaceCase(string).replace(/\s(\w)/g, function (matches, letter) {
          return letter.toUpperCase()
        })
    },

     prefixStyle: function (prop) {
        let prefixes = [ 'Webkit', 'Moz', 'O', 'ms' ]
        // re-use a dummy div
        if (!div) {
          div = document.createElement('div')
        }
      
        let style = div.style
      
        // prop exists without prefix
        if (prop in style) {
          return prop
        }
      
        // borderRadius -> BorderRadius
        let titleCase = prop.charAt(0).toUpperCase() + prop.slice(1)
      
        // find the vendor-prefixed prop
        for (let i = prefixes.length; i >= 0; i--) {
          let name = prefixes[i] + titleCase
          // e.g. WebkitBorderRadius or webkitBorderRadius
          if (name in style) {
            return name
          }
        }
      
        return false
    },

    addPxToStyle: function(name, value) {
        if(typeof value === 'number' && !IS_UNITLESS[ name ]) {
          return value + 'px';
        } else {
          return value;
        }
    },

    style: function  (element, property, value) {
        let camel = cache[property]
        if (typeof camel === 'undefined') {
          camel = this.detectCssProp(property)
        }
      
        // may be false if CSS prop is unsupported
        if (camel) {
          if (value === undefined) {
            return element.style[camel]
          }
      
          element.style[camel] = this.addPxToStyle(camel, value)
        }
      },
      
      
      detectCssProp: function(cssProp) {
        let camel = this.toCamelCase(cssProp)
        let result = this.prefixStyle(camel)
        cache[camel] = cache[cssProp] = cache[result] = result
        return result
      },
      
      css: function(element, properties) {
        let self=this;
        for (let k in properties) {
            if (properties.hasOwnProperty(k)) {
              self.style(element, k, properties[k])
            }
          }
      }
};