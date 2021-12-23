(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList === 'function' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done(elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done(elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done(elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? elm$http$Http$GoodStatus_ : elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return elm$core$Dict$empty;
	}

	var headers = elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(elm$core$Dict$update, key, function(oldValue) {
				return elm$core$Maybe$Just(elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2(elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2(elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? elm$core$Maybe$Just(event.total) : elm$core$Maybe$Nothing
		}))));
	});
}



// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var TSFoster$elm_uuid$UUID$UUID = function (a) {
	return {$: 'UUID', a: a};
};
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$or = _Bitwise_or;
var TSFoster$elm_uuid$UUID$setVariantBits = function (v) {
	switch (v) {
		case 1:
			return A2(
				elm$core$Basics$composeR,
				elm$core$Bitwise$and(63),
				elm$core$Bitwise$or(128));
		case 2:
			return A2(
				elm$core$Basics$composeR,
				elm$core$Bitwise$and(31),
				elm$core$Bitwise$or(192));
		default:
			return elm$core$Basics$identity;
	}
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$List$cons = _List_cons;
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var elm_community$list_extra$List$Extra$updateAt = F3(
	function (index, fn, list) {
		if (index < 0) {
			return list;
		} else {
			var tail = A2(elm$core$List$drop, index, list);
			var head = A2(elm$core$List$take, index, list);
			if (tail.b) {
				var x = tail.a;
				var xs = tail.b;
				return _Utils_ap(
					head,
					A2(
						elm$core$List$cons,
						fn(x),
						xs));
			} else {
				return list;
			}
		}
	});
var TSFoster$elm_uuid$UUID$toVariant = F2(
	function (v, _n0) {
		var bytes = _n0.a;
		return TSFoster$elm_uuid$UUID$UUID(
			A3(
				elm_community$list_extra$List$Extra$updateAt,
				8,
				TSFoster$elm_uuid$UUID$setVariantBits(v),
				bytes));
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var TSFoster$elm_uuid$UUID$toVersion = F2(
	function (v, _n0) {
		var bytes = _n0.a;
		var updateFn = A2(
			elm_community$list_extra$List$Extra$updateAt,
			6,
			A2(
				elm$core$Basics$composeR,
				elm$core$Bitwise$and(15),
				elm$core$Bitwise$or((15 & v) << 4)));
		return TSFoster$elm_uuid$UUID$UUID(
			updateFn(bytes));
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var elm$core$Basics$mul = _Basics_mul;
var elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var elm$random$Random$next = function (_n0) {
	var state0 = _n0.a;
	var incr = _n0.b;
	return A2(elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var elm$core$Bitwise$xor = _Bitwise_xor;
var elm$random$Random$peel = function (_n0) {
	var state = _n0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var elm$random$Random$int = F2(
	function (a, b) {
		return elm$random$Random$Generator(
			function (seed0) {
				var _n0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _n0.a;
				var hi = _n0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & elm$random$Random$peel(seed0)) >>> 0) + lo,
						elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = elm$random$Random$peel(seed);
							var seedN = elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var elm$random$Random$listHelp = F4(
	function (revList, n, gen, seed) {
		listHelp:
		while (true) {
			if (n < 1) {
				return _Utils_Tuple2(revList, seed);
			} else {
				var _n0 = gen(seed);
				var value = _n0.a;
				var newSeed = _n0.b;
				var $temp$revList = A2(elm$core$List$cons, value, revList),
					$temp$n = n - 1,
					$temp$gen = gen,
					$temp$seed = newSeed;
				revList = $temp$revList;
				n = $temp$n;
				gen = $temp$gen;
				seed = $temp$seed;
				continue listHelp;
			}
		}
	});
var elm$random$Random$list = F2(
	function (n, _n0) {
		var gen = _n0.a;
		return elm$random$Random$Generator(
			function (seed) {
				return A4(elm$random$Random$listHelp, _List_Nil, n, gen, seed);
			});
	});
var elm$random$Random$map = F2(
	function (func, _n0) {
		var genA = _n0.a;
		return elm$random$Random$Generator(
			function (seed0) {
				var _n1 = genA(seed0);
				var a = _n1.a;
				var seed1 = _n1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var TSFoster$elm_uuid$UUID$generator = A2(
	elm$random$Random$map,
	TSFoster$elm_uuid$UUID$toVariant(1),
	A2(
		elm$random$Random$map,
		TSFoster$elm_uuid$UUID$toVersion(4),
		A2(
			elm$random$Random$map,
			TSFoster$elm_uuid$UUID$UUID,
			A2(
				elm$random$Random$list,
				16,
				A2(elm$random$Random$int, 0, 255)))));
var elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2(elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var elm$core$List$repeat = F2(
	function (n, value) {
		return A3(elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var TSFoster$elm_uuid$UUID$nil = TSFoster$elm_uuid$UUID$UUID(
	A2(elm$core$List$repeat, 16, 0));
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var elm$core$String$cons = _String_cons;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var elm$core$String$length = _String_length;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3(elm$core$String$repeatHelp, n, chunk, '');
	});
var elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				elm$core$String$repeat,
				n - elm$core$String$length(string),
				elm$core$String$fromChar(_char)),
			string);
	});
var elm$core$Basics$or = _Basics_or;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm_community$string_extra$String$Extra$breaker = F3(
	function (width, string, acc) {
		breaker:
		while (true) {
			if (string === '') {
				return elm$core$List$reverse(acc);
			} else {
				var $temp$width = width,
					$temp$string = A2(elm$core$String$dropLeft, width, string),
					$temp$acc = A2(
					elm$core$List$cons,
					A3(elm$core$String$slice, 0, width, string),
					acc);
				width = $temp$width;
				string = $temp$string;
				acc = $temp$acc;
				continue breaker;
			}
		}
	});
var elm_community$string_extra$String$Extra$break = F2(
	function (width, string) {
		return ((!width) || (string === '')) ? _List_fromArray(
			[string]) : A3(elm_community$string_extra$String$Extra$breaker, width, string, _List_Nil);
	});
var elm$core$String$fromList = _String_fromList;
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$modBy = _Basics_modBy;
var rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return _Utils_chr('0');
			case 1:
				return _Utils_chr('1');
			case 2:
				return _Utils_chr('2');
			case 3:
				return _Utils_chr('3');
			case 4:
				return _Utils_chr('4');
			case 5:
				return _Utils_chr('5');
			case 6:
				return _Utils_chr('6');
			case 7:
				return _Utils_chr('7');
			case 8:
				return _Utils_chr('8');
			case 9:
				return _Utils_chr('9');
			case 10:
				return _Utils_chr('a');
			case 11:
				return _Utils_chr('b');
			case 12:
				return _Utils_chr('c');
			case 13:
				return _Utils_chr('d');
			case 14:
				return _Utils_chr('e');
			case 15:
				return _Utils_chr('f');
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					elm$core$List$cons,
					rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					elm$core$List$cons,
					rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2(elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var rtfeldman$elm_hex$Hex$toString = function (num) {
	return elm$core$String$fromList(
		(num < 0) ? A2(
			elm$core$List$cons,
			_Utils_chr('-'),
			A2(rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2(rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var TSFoster$elm_uuid$UUID$canonical = function (_n0) {
	var bytes = _n0.a;
	var strings = A2(
		elm_community$string_extra$String$Extra$break,
		4,
		elm$core$String$concat(
			A2(
				elm$core$List$map,
				A2(
					elm$core$String$padLeft,
					2,
					_Utils_chr('0')),
				A2(elm$core$List$map, rtfeldman$elm_hex$Hex$toString, bytes))));
	if ((((((((strings.b && strings.b.b) && strings.b.b.b) && strings.b.b.b.b) && strings.b.b.b.b.b) && strings.b.b.b.b.b.b) && strings.b.b.b.b.b.b.b) && strings.b.b.b.b.b.b.b.b) && (!strings.b.b.b.b.b.b.b.b.b)) {
		var a = strings.a;
		var _n2 = strings.b;
		var b = _n2.a;
		var _n3 = _n2.b;
		var c = _n3.a;
		var _n4 = _n3.b;
		var d = _n4.a;
		var _n5 = _n4.b;
		var e = _n5.a;
		var _n6 = _n5.b;
		var f = _n6.a;
		var _n7 = _n6.b;
		var g = _n7.a;
		var _n8 = _n7.b;
		var h = _n8.a;
		return a + (b + ('-' + (c + ('-' + (d + ('-' + (e + ('-' + (f + (g + h))))))))));
	} else {
		return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
	}
};
var TSFoster$elm_uuid$UUID$toString = TSFoster$elm_uuid$UUID$canonical;
var author$project$Devs$Objects$None = {$: 'None'};
var author$project$Devs$Objects$getEmptyRecipe = {
	aikz: 1,
	id: elm$core$Maybe$Nothing,
	image: elm$core$Maybe$Nothing,
	ingredients: _List_Nil,
	name: '',
	number: elm$core$Maybe$Nothing,
	number_comment: elm$core$Maybe$Nothing,
	number_for_display: elm$core$Maybe$Nothing,
	nv_carbohydrates: elm$core$Maybe$Nothing,
	nv_energy: elm$core$Maybe$Nothing,
	nv_fat: elm$core$Maybe$Nothing,
	nv_protein: elm$core$Maybe$Nothing,
	nv_size: elm$core$Maybe$Nothing,
	parts: _List_Nil,
	source: elm$core$Maybe$Nothing,
	source_page: elm$core$Maybe$Nothing,
	tags: _List_Nil,
	todos: _List_Nil,
	translate: elm$core$Maybe$Nothing,
	uuid: TSFoster$elm_uuid$UUID$toString(TSFoster$elm_uuid$UUID$nil)
};
var author$project$Devs$Objects$getEmptySource = {
	id: elm$core$Maybe$Nothing,
	isbn: elm$core$Maybe$Nothing,
	name: '',
	uuid: TSFoster$elm_uuid$UUID$toString(TSFoster$elm_uuid$UUID$nil),
	year: elm$core$Maybe$Nothing
};
var author$project$Devs$Objects$getEmptyTag = {
	id: elm$core$Maybe$Nothing,
	name: '',
	tagType: {
		id: elm$core$Maybe$Nothing,
		name: '',
		uuid: TSFoster$elm_uuid$UUID$toString(TSFoster$elm_uuid$UUID$nil)
	},
	uuid: TSFoster$elm_uuid$UUID$toString(TSFoster$elm_uuid$UUID$nil)
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$False = {$: 'False'};
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$Devs$Ports$fileSelected = _Platform_outgoingPort('fileSelected', elm$json$Json$Encode$string);
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var author$project$Devs$Recipe$addToIngredients = F2(
	function (recipe, newIngre) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{
						ingredients: elm$core$List$concat(
							_List_fromArray(
								[
									rec.ingredients,
									_List_fromArray(
									[newIngre])
								]))
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$addToTags = F2(
	function (recipe, newTag) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{
						tags: elm$core$List$concat(
							_List_fromArray(
								[
									rec.tags,
									_List_fromArray(
									[newTag])
								]))
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$addToTodos = F2(
	function (recipe, newTodo) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{
						todos: elm$core$List$concat(
							_List_fromArray(
								[
									rec.todos,
									_List_fromArray(
									[newTodo])
								]))
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$setAikz = F2(
	function (recipe, newVal) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{aikz: newVal}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$core$String$toFloat = _String_toFloat;
var author$project$Devs$Recipe$setCarbo = F2(
	function (recipe, newVal) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{
						nv_carbohydrates: elm$core$Maybe$Just(
							A2(
								elm$core$Maybe$withDefault,
								0,
								elm$core$String$toFloat(newVal)))
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$setEnergy = F2(
	function (recipe, newVal) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{
						nv_energy: elm$core$Maybe$Just(
							A2(
								elm$core$Maybe$withDefault,
								0,
								elm$core$String$toFloat(newVal)))
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$setFat = F2(
	function (recipe, newVal) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{
						nv_fat: elm$core$Maybe$Just(
							A2(
								elm$core$Maybe$withDefault,
								0,
								elm$core$String$toFloat(newVal)))
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$setImage = F2(
	function (recipe, newVal) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{image: newVal}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$hasIngreWithThisPart = F2(
	function (ingre, pUuid) {
		var _n0 = ingre.part;
		if (_n0.$ === 'Just') {
			var pl = _n0.a;
			return _Utils_eq(pl.uuid, pUuid) ? true : false;
		} else {
			return false;
		}
	});
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var author$project$Devs$Recipe$setIngreToPart = F2(
	function (ingreList, part) {
		return _Utils_update(
			part,
			{
				ingredients: A2(
					elm$core$List$filter,
					function (item) {
						return A2(author$project$Devs$Recipe$hasIngreWithThisPart, item, part.uuid);
					},
					ingreList)
			});
	});
var author$project$Devs$Recipe$setIngredients = F2(
	function (recipe, newIngreList) {
		var rec = function () {
			if (recipe.$ === 'Just') {
				var r = recipe.a;
				return _Utils_update(
					r,
					{ingredients: newIngreList});
			} else {
				return author$project$Devs$Objects$getEmptyRecipe;
			}
		}();
		var newPartList = A2(
			elm$core$List$map,
			author$project$Devs$Recipe$setIngreToPart(rec.ingredients),
			rec.parts);
		return elm$core$Maybe$Just(
			_Utils_update(
				rec,
				{parts: newPartList}));
	});
var author$project$Devs$Recipe$setName = F2(
	function (recipe, newVal) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{name: newVal}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$String$toInt = _String_toInt;
var author$project$Devs$Recipe$setNumber = F2(
	function (recipe, newVal) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{
						number: elm$core$Maybe$Just(
							A2(
								elm$core$Maybe$withDefault,
								0,
								elm$core$String$toInt(newVal)))
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$setNumberComment = F2(
	function (recipe, newVal) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{
						number_comment: elm$core$Maybe$Just(newVal)
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Objects$getPartOfPartLight = function (pl) {
	return {id: pl.id, ingredients: _List_Nil, name: pl.name, uuid: pl.uuid};
};
var author$project$Devs$Recipe$setParts = F2(
	function (recipe, part) {
		var rec = function () {
			if (recipe.$ === 'Just') {
				var r = recipe.a;
				return r;
			} else {
				return author$project$Devs$Objects$getEmptyRecipe;
			}
		}();
		var pl = (elm$core$List$length(
			A2(
				elm$core$List$filter,
				function (item) {
					return A2(author$project$Devs$Recipe$hasIngreWithThisPart, item, part.uuid);
				},
				rec.ingredients)) > 0) ? rec.parts : A2(
			elm$core$List$append,
			rec.parts,
			_List_fromArray(
				[
					author$project$Devs$Objects$getPartOfPartLight(part)
				]));
		return elm$core$Maybe$Just(
			_Utils_update(
				rec,
				{parts: pl}));
	});
var author$project$Devs$Recipe$setProt = F2(
	function (recipe, newVal) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{
						nv_protein: elm$core$Maybe$Just(
							A2(
								elm$core$Maybe$withDefault,
								0,
								elm$core$String$toFloat(newVal)))
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$setSize = F2(
	function (recipe, newVal) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{
						nv_size: elm$core$Maybe$Just(
							A2(
								elm$core$Maybe$withDefault,
								0,
								elm$core$String$toInt(newVal)))
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$setSource = F2(
	function (recipe, newSource) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{
						source: elm$core$Maybe$Just(newSource)
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$setSourceIsbn = F2(
	function (source, newVal) {
		if (source.$ === 'Just') {
			var src = source.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					src,
					{
						isbn: elm$core$Maybe$Just(newVal)
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$setSourceName = F2(
	function (source, newVal) {
		if (source.$ === 'Just') {
			var src = source.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					src,
					{name: newVal}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$setSourcePage = F2(
	function (recipe, newVal) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{
						source_page: elm$core$Maybe$Just(
							A2(
								elm$core$Maybe$withDefault,
								0,
								elm$core$String$toInt(newVal)))
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$setSourceYear = F2(
	function (source, newVal) {
		if (source.$ === 'Just') {
			var src = source.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					src,
					{
						year: elm$core$Maybe$Just(newVal)
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$setTags = F2(
	function (recipe, newTagList) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{tags: newTagList}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$setTodos = F2(
	function (recipe, newTodoList) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{todos: newTodoList}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Devs$Recipe$setTranslate = F2(
	function (recipe, newVal) {
		if (recipe.$ === 'Just') {
			var rec = recipe.a;
			return elm$core$Maybe$Just(
				_Utils_update(
					rec,
					{
						translate: elm$core$Maybe$Just(newVal)
					}));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === 'RBNode_elm_builtin') {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === 'RBNode_elm_builtin') {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === 'RBNode_elm_builtin') {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var elm$http$Http$Timeout_ = {$: 'Timeout_'};
var elm$http$Http$emptyBody = _Http_emptyBody;
var elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var elm$http$Http$header = elm$http$Http$Header;
var elm$http$Http$jsonBody = function (value) {
	return A2(
		_Http_pair,
		'application/json',
		A2(elm$json$Json$Encode$encode, 0, value));
};
var elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var elm$http$Http$init = elm$core$Task$succeed(
	A2(elm$http$Http$State, elm$core$Dict$empty, _List_Nil));
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Process$kill = _Scheduler_kill;
var elm$core$Process$spawn = _Scheduler_spawn;
var elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _n2 = A2(elm$core$Dict$get, tracker, reqs);
					if (_n2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _n2.a;
						return A2(
							elm$core$Task$andThen,
							function (_n3) {
								return A3(
									elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2(elm$core$Dict$remove, tracker, reqs));
							},
							elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						elm$core$Task$andThen,
						function (pid) {
							var _n4 = req.tracker;
							if (_n4.$ === 'Nothing') {
								return A3(elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _n4.a;
								return A3(
									elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3(elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			elm$core$Task$andThen,
			function (reqs) {
				return elm$core$Task$succeed(
					A2(elm$http$Http$State, reqs, subs));
			},
			A3(elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _n0) {
		var actualTracker = _n0.a;
		var toMsg = _n0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? elm$core$Maybe$Just(
			A2(
				elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : elm$core$Maybe$Nothing;
	});
var elm$http$Http$onSelfMsg = F3(
	function (router, _n0, state) {
		var tracker = _n0.a;
		var progress = _n0.b;
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$filterMap,
					A3(elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var elm$http$Http$subMap = F2(
	function (func, _n0) {
		var tracker = _n0.a;
		var toMsg = _n0.b;
		return A2(
			elm$http$Http$MySub,
			tracker,
			A2(elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager(elm$http$Http$init, elm$http$Http$onEffects, elm$http$Http$onSelfMsg, elm$http$Http$cmdMap, elm$http$Http$subMap);
var elm$http$Http$command = _Platform_leaf('Http');
var elm$http$Http$subscription = _Platform_leaf('Http');
var elm$http$Http$request = function (r) {
	return elm$http$Http$command(
		elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var author$project$Devs$BackendApi$myRequest = F5(
	function (method, url, expect, token, content) {
		var header = function () {
			if (token.$ === 'Just') {
				var reqToken = token.a;
				return (elm$core$String$length(reqToken) > 0) ? _List_fromArray(
					[
						A2(elm$http$Http$header, 'token', reqToken)
					]) : _List_Nil;
			} else {
				return _List_Nil;
			}
		}();
		var body = function () {
			if (content.$ === 'Just') {
				var reqBody = content.a;
				return elm$http$Http$jsonBody(reqBody);
			} else {
				return elm$http$Http$emptyBody;
			}
		}();
		return elm$http$Http$request(
			{body: body, expect: expect, headers: header, method: method, timeout: elm$core$Maybe$Nothing, tracker: elm$core$Maybe$Nothing, url: url});
	});
var author$project$Devs$Objects$PartLight = F3(
	function (id, name, uuid) {
		return {id: id, name: name, uuid: uuid};
	});
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Decode$map3 = _Json_map3;
var elm$json$Json$Decode$string = _Json_decodeString;
var author$project$Devs$RecipeDecode$partLightDecoder = A4(
	elm$json$Json$Decode$map3,
	author$project$Devs$Objects$PartLight,
	A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
	A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'uuid', elm$json$Json$Decode$string));
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			elm$core$Basics$identity,
			A2(elm$core$Basics$composeR, toResult, toMsg));
	});
var elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var elm$http$Http$NetworkError = {$: 'NetworkError'};
var elm$http$Http$Timeout = {$: 'Timeout'};
var elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return elm$core$Result$Err(
					elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return elm$core$Result$Err(elm$http$Http$Timeout);
			case 'NetworkError_':
				return elm$core$Result$Err(elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return elm$core$Result$Err(
					elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					elm$core$Result$mapError,
					elm$http$Http$BadBody,
					toResult(body));
		}
	});
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			elm$http$Http$expectStringResponse,
			toMsg,
			elm$http$Http$resolve(
				function (string) {
					return A2(
						elm$core$Result$mapError,
						elm$json$Json$Decode$errorToString,
						A2(elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var elm$json$Json$Decode$list = _Json_decodeList;
var author$project$Devs$BackendApi$getAllParts = F3(
	function (event, token, url) {
		return A5(
			author$project$Devs$BackendApi$myRequest,
			'GET',
			url,
			A2(
				elm$http$Http$expectJson,
				event,
				elm$json$Json$Decode$list(author$project$Devs$RecipeDecode$partLightDecoder)),
			token,
			elm$core$Maybe$Nothing);
	});
var author$project$Devs$TypeObject$SetPartList = function (a) {
	return {$: 'SetPartList', a: a};
};
var author$project$Devs$Utils$getAllParts = function (model) {
	return A3(author$project$Devs$BackendApi$getAllParts, author$project$Devs$TypeObject$SetPartList, model.loginToken, model.sp.serverProtokoll + (model.sp.serverHost + (model.sp.serverUrlPrefix + (model.sp.apiUrlPrefix + '/getAllParts'))));
};
var author$project$Devs$Objects$Source = F5(
	function (id, isbn, name, year, uuid) {
		return {id: id, isbn: isbn, name: name, uuid: uuid, year: year};
	});
var elm$json$Json$Decode$map5 = _Json_map5;
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$oneOf = _Json_oneOf;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$json$Json$Decode$maybe = function (decoder) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, decoder),
				elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing)
			]));
};
var author$project$Devs$RecipeDecode$sourceDecoder = A6(
	elm$json$Json$Decode$map5,
	author$project$Devs$Objects$Source,
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int)),
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'isbn', elm$json$Json$Decode$string)),
	A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'year', elm$json$Json$Decode$string)),
	A2(elm$json$Json$Decode$field, 'uuid', elm$json$Json$Decode$string));
var author$project$Devs$BackendApi$getAllSources = F3(
	function (event, token, url) {
		return A5(
			author$project$Devs$BackendApi$myRequest,
			'GET',
			url,
			A2(
				elm$http$Http$expectJson,
				event,
				elm$json$Json$Decode$list(author$project$Devs$RecipeDecode$sourceDecoder)),
			token,
			elm$core$Maybe$Nothing);
	});
var author$project$Devs$TypeObject$SetSourceList = function (a) {
	return {$: 'SetSourceList', a: a};
};
var author$project$Devs$Utils$getAllSources = function (model) {
	return A3(author$project$Devs$BackendApi$getAllSources, author$project$Devs$TypeObject$SetSourceList, model.loginToken, model.sp.serverProtokoll + (model.sp.serverHost + (model.sp.serverUrlPrefix + (model.sp.apiUrlPrefix + '/getAllSources'))));
};
var author$project$Devs$Objects$Tag = F4(
	function (id, name, tagType, uuid) {
		return {id: id, name: name, tagType: tagType, uuid: uuid};
	});
var author$project$Devs$Objects$TagtypeShort = F3(
	function (id, name, uuid) {
		return {id: id, name: name, uuid: uuid};
	});
var author$project$Devs$RecipeDecode$tagtypeShortDecoder = A4(
	elm$json$Json$Decode$map3,
	author$project$Devs$Objects$TagtypeShort,
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int)),
	A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'uuid', elm$json$Json$Decode$string));
var elm$json$Json$Decode$map4 = _Json_map4;
var author$project$Devs$RecipeDecode$tagDecoder = A5(
	elm$json$Json$Decode$map4,
	author$project$Devs$Objects$Tag,
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int)),
	A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'tagtype', author$project$Devs$RecipeDecode$tagtypeShortDecoder),
	A2(elm$json$Json$Decode$field, 'uuid', elm$json$Json$Decode$string));
var author$project$Devs$BackendApi$getAllTags = F3(
	function (event, token, url) {
		return A5(
			author$project$Devs$BackendApi$myRequest,
			'GET',
			url,
			A2(
				elm$http$Http$expectJson,
				event,
				elm$json$Json$Decode$list(author$project$Devs$RecipeDecode$tagDecoder)),
			token,
			elm$core$Maybe$Nothing);
	});
var author$project$Devs$TypeObject$SetTagList = function (a) {
	return {$: 'SetTagList', a: a};
};
var author$project$Devs$Utils$getAllTags = function (model) {
	return A3(author$project$Devs$BackendApi$getAllTags, author$project$Devs$TypeObject$SetTagList, model.loginToken, model.sp.serverProtokoll + (model.sp.serverHost + (model.sp.serverUrlPrefix + (model.sp.apiUrlPrefix + '/getAllTags'))));
};
var author$project$Devs$Objects$Unit = F4(
	function (id, name, unitCategory, uuid) {
		return {id: id, name: name, unitCategory: unitCategory, uuid: uuid};
	});
var author$project$Devs$Objects$UnitCategory = F3(
	function (id, name, uuid) {
		return {id: id, name: name, uuid: uuid};
	});
var author$project$Devs$RecipeDecode$unitCategoryDecoder = A4(
	elm$json$Json$Decode$map3,
	author$project$Devs$Objects$UnitCategory,
	A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
	A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'uuid', elm$json$Json$Decode$string));
var author$project$Devs$RecipeDecode$unitDecoder = A5(
	elm$json$Json$Decode$map4,
	author$project$Devs$Objects$Unit,
	A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
	A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'unitCategory', author$project$Devs$RecipeDecode$unitCategoryDecoder),
	A2(elm$json$Json$Decode$field, 'uuid', elm$json$Json$Decode$string));
var author$project$Devs$BackendApi$getAllUnits = F3(
	function (event, token, url) {
		return A5(
			author$project$Devs$BackendApi$myRequest,
			'GET',
			url,
			A2(
				elm$http$Http$expectJson,
				event,
				elm$json$Json$Decode$list(author$project$Devs$RecipeDecode$unitDecoder)),
			token,
			elm$core$Maybe$Nothing);
	});
var author$project$Devs$TypeObject$SetUnitList = function (a) {
	return {$: 'SetUnitList', a: a};
};
var author$project$Devs$Utils$getAllUnits = function (model) {
	return A3(author$project$Devs$BackendApi$getAllUnits, author$project$Devs$TypeObject$SetUnitList, model.loginToken, model.sp.serverProtokoll + (model.sp.serverHost + (model.sp.serverUrlPrefix + (model.sp.apiUrlPrefix + '/getAllUnits'))));
};
var author$project$Devs$Objects$getEmptyIngre = F2(
	function (newOrder, newPart) {
		return {
			comment: elm$core$Maybe$Nothing,
			id: elm$core$Maybe$Nothing,
			name: '',
			part: newPart,
			quantity: elm$core$Maybe$Nothing,
			sortorder: newOrder,
			unit: elm$core$Maybe$Nothing,
			uuid: TSFoster$elm_uuid$UUID$toString(TSFoster$elm_uuid$UUID$nil)
		};
	});
var author$project$Devs$Objects$getEmptyPart = {
	id: -2,
	name: 'Sonstige Zutaten',
	uuid: TSFoster$elm_uuid$UUID$toString(TSFoster$elm_uuid$UUID$nil)
};
var elm$core$List$sortBy = _List_sortBy;
var elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var author$project$Devs$Utils$getNewIngre = F2(
	function (model, newUuid) {
		var ingreList = function () {
			var _n2 = model.selectedRecipe;
			if (_n2.$ === 'Just') {
				var rec = _n2.a;
				return A2(
					elm$core$List$sortBy,
					function ($) {
						return $.sortorder;
					},
					rec.ingredients);
			} else {
				return _List_Nil;
			}
		}();
		var newOrder = function () {
			var _n1 = elm_community$list_extra$List$Extra$last(ingreList);
			if (_n1.$ === 'Just') {
				var lastItem = _n1.a;
				return lastItem.sortorder + 1;
			} else {
				return 0;
			}
		}();
		var newPart = function () {
			var _n0 = elm_community$list_extra$List$Extra$last(ingreList);
			if (_n0.$ === 'Just') {
				var lastItem = _n0.a;
				return lastItem.part;
			} else {
				return elm$core$Maybe$Just(author$project$Devs$Objects$getEmptyPart);
			}
		}();
		var newIngre = A2(author$project$Devs$Objects$getEmptyIngre, newOrder, newPart);
		return _Utils_update(
			newIngre,
			{
				uuid: TSFoster$elm_uuid$UUID$toString(newUuid)
			});
	});
var author$project$Devs$Objects$getEmptyTodo = function (newNumber) {
	return {
		id: 0,
		image: elm$core$Maybe$Nothing,
		image_comment: elm$core$Maybe$Nothing,
		number: newNumber,
		text: '',
		uuid: TSFoster$elm_uuid$UUID$toString(TSFoster$elm_uuid$UUID$nil)
	};
};
var author$project$Devs$Utils$getNewTodo = F2(
	function (model, newUuid) {
		var todoList = function () {
			var _n1 = model.selectedRecipe;
			if (_n1.$ === 'Just') {
				var rec = _n1.a;
				return A2(
					elm$core$List$sortBy,
					function ($) {
						return $.number;
					},
					rec.todos);
			} else {
				return _List_Nil;
			}
		}();
		var newNumber = function () {
			var _n0 = elm_community$list_extra$List$Extra$last(todoList);
			if (_n0.$ === 'Just') {
				var lastItem = _n0.a;
				return lastItem.number + 1;
			} else {
				return 0;
			}
		}();
		var newTodo = author$project$Devs$Objects$getEmptyTodo(newNumber);
		return _Utils_update(
			newTodo,
			{
				uuid: TSFoster$elm_uuid$UUID$toString(newUuid)
			});
	});
var author$project$Devs$Objects$Recipe = function (aikz) {
	return function (id) {
		return function (image) {
			return function (ingredients) {
				return function (parts) {
					return function (name) {
						return function (translate) {
							return function (number) {
								return function (number_for_display) {
									return function (number_comment) {
										return function (nv_carbohydrates) {
											return function (nv_energy) {
												return function (nv_fat) {
													return function (nv_protein) {
														return function (nv_size) {
															return function (source) {
																return function (source_page) {
																	return function (tags) {
																		return function (todos) {
																			return function (uuid) {
																				return {aikz: aikz, id: id, image: image, ingredients: ingredients, name: name, number: number, number_comment: number_comment, number_for_display: number_for_display, nv_carbohydrates: nv_carbohydrates, nv_energy: nv_energy, nv_fat: nv_fat, nv_protein: nv_protein, nv_size: nv_size, parts: parts, source: source, source_page: source_page, tags: tags, todos: todos, translate: translate, uuid: uuid};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var author$project$Devs$Objects$Ingredient = F8(
	function (id, name, comment, part, quantity, sortorder, unit, uuid) {
		return {comment: comment, id: id, name: name, part: part, quantity: quantity, sortorder: sortorder, unit: unit, uuid: uuid};
	});
var elm$json$Json$Decode$float = _Json_decodeFloat;
var elm$json$Json$Decode$map8 = _Json_map8;
var author$project$Devs$RecipeDecode$ingrDecoder = A9(
	elm$json$Json$Decode$map8,
	author$project$Devs$Objects$Ingredient,
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int)),
	A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'comment', elm$json$Json$Decode$string)),
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'part', author$project$Devs$RecipeDecode$partLightDecoder)),
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'quantity', elm$json$Json$Decode$float)),
	A2(elm$json$Json$Decode$field, 'sortorder', elm$json$Json$Decode$int),
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'unit', author$project$Devs$RecipeDecode$unitDecoder)),
	A2(elm$json$Json$Decode$field, 'uuid', elm$json$Json$Decode$string));
var author$project$Devs$RecipeDecode$ingrListDecoder = elm$json$Json$Decode$list(author$project$Devs$RecipeDecode$ingrDecoder);
var author$project$Devs$Objects$Part = F4(
	function (id, name, ingredients, uuid) {
		return {id: id, ingredients: ingredients, name: name, uuid: uuid};
	});
var author$project$Devs$RecipeDecode$partDecoder = A5(
	elm$json$Json$Decode$map4,
	author$project$Devs$Objects$Part,
	A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
	A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'ingredients', author$project$Devs$RecipeDecode$ingrListDecoder),
	A2(elm$json$Json$Decode$field, 'uuid', elm$json$Json$Decode$string));
var author$project$Devs$RecipeDecode$partListDecoder = elm$json$Json$Decode$list(author$project$Devs$RecipeDecode$partDecoder);
var author$project$Devs$RecipeDecode$tagListDecoder = elm$json$Json$Decode$list(author$project$Devs$RecipeDecode$tagDecoder);
var author$project$Devs$Objects$Todo = F6(
	function (id, image, image_comment, number, text, uuid) {
		return {id: id, image: image, image_comment: image_comment, number: number, text: text, uuid: uuid};
	});
var elm$json$Json$Decode$map6 = _Json_map6;
var author$project$Devs$RecipeDecode$todoDecoder = A7(
	elm$json$Json$Decode$map6,
	author$project$Devs$Objects$Todo,
	A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'image', elm$json$Json$Decode$string)),
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'image_comment', elm$json$Json$Decode$string)),
	A2(elm$json$Json$Decode$field, 'number', elm$json$Json$Decode$int),
	A2(elm$json$Json$Decode$field, 'text', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'uuid', elm$json$Json$Decode$string));
var author$project$Devs$RecipeDecode$todoListDecoder = elm$json$Json$Decode$list(author$project$Devs$RecipeDecode$todoDecoder);
var elm$json$Json$Decode$map2 = _Json_map2;
var elm_community$json_extra$Json$Decode$Extra$andMap = elm$json$Json$Decode$map2(elm$core$Basics$apR);
var author$project$Devs$RecipeDecode$recipeDecoder = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'uuid', elm$json$Json$Decode$string),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'todos', author$project$Devs$RecipeDecode$todoListDecoder),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'tags', author$project$Devs$RecipeDecode$tagListDecoder),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(
					elm$json$Json$Decode$field,
					'source_page',
					elm$json$Json$Decode$maybe(elm$json$Json$Decode$int)),
				A2(
					elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(
						elm$json$Json$Decode$field,
						'source',
						elm$json$Json$Decode$maybe(author$project$Devs$RecipeDecode$sourceDecoder)),
					A2(
						elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(
							elm$json$Json$Decode$field,
							'nv_size',
							elm$json$Json$Decode$maybe(elm$json$Json$Decode$int)),
						A2(
							elm_community$json_extra$Json$Decode$Extra$andMap,
							A2(
								elm$json$Json$Decode$field,
								'nv_protein',
								elm$json$Json$Decode$maybe(elm$json$Json$Decode$float)),
							A2(
								elm_community$json_extra$Json$Decode$Extra$andMap,
								A2(
									elm$json$Json$Decode$field,
									'nv_fat',
									elm$json$Json$Decode$maybe(elm$json$Json$Decode$float)),
								A2(
									elm_community$json_extra$Json$Decode$Extra$andMap,
									A2(
										elm$json$Json$Decode$field,
										'nv_energy',
										elm$json$Json$Decode$maybe(elm$json$Json$Decode$float)),
									A2(
										elm_community$json_extra$Json$Decode$Extra$andMap,
										A2(
											elm$json$Json$Decode$field,
											'nv_carbohydrates',
											elm$json$Json$Decode$maybe(elm$json$Json$Decode$float)),
										A2(
											elm_community$json_extra$Json$Decode$Extra$andMap,
											A2(
												elm$json$Json$Decode$field,
												'number_comment',
												elm$json$Json$Decode$maybe(elm$json$Json$Decode$string)),
											A2(
												elm_community$json_extra$Json$Decode$Extra$andMap,
												elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing),
												A2(
													elm_community$json_extra$Json$Decode$Extra$andMap,
													A2(
														elm$json$Json$Decode$field,
														'number',
														elm$json$Json$Decode$maybe(elm$json$Json$Decode$int)),
													A2(
														elm_community$json_extra$Json$Decode$Extra$andMap,
														A2(
															elm$json$Json$Decode$field,
															'translate',
															elm$json$Json$Decode$maybe(elm$json$Json$Decode$string)),
														A2(
															elm_community$json_extra$Json$Decode$Extra$andMap,
															A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
															A2(
																elm_community$json_extra$Json$Decode$Extra$andMap,
																A2(elm$json$Json$Decode$field, 'parts', author$project$Devs$RecipeDecode$partListDecoder),
																A2(
																	elm_community$json_extra$Json$Decode$Extra$andMap,
																	A2(elm$json$Json$Decode$field, 'ingredients', author$project$Devs$RecipeDecode$ingrListDecoder),
																	A2(
																		elm_community$json_extra$Json$Decode$Extra$andMap,
																		A2(
																			elm$json$Json$Decode$field,
																			'image',
																			elm$json$Json$Decode$maybe(elm$json$Json$Decode$string)),
																		A2(
																			elm_community$json_extra$Json$Decode$Extra$andMap,
																			A2(
																				elm$json$Json$Decode$field,
																				'id',
																				elm$json$Json$Decode$maybe(elm$json$Json$Decode$int)),
																			A2(
																				elm_community$json_extra$Json$Decode$Extra$andMap,
																				A2(elm$json$Json$Decode$field, 'aikz', elm$json$Json$Decode$int),
																				elm$json$Json$Decode$succeed(author$project$Devs$Objects$Recipe)))))))))))))))))))));
var author$project$Devs$BackendApi$getRecipe = F3(
	function (event, token, url) {
		return A5(
			author$project$Devs$BackendApi$myRequest,
			'GET',
			url,
			A2(elm$http$Http$expectJson, event, author$project$Devs$RecipeDecode$recipeDecoder),
			token,
			elm$core$Maybe$Nothing);
	});
var author$project$Devs$TypeObject$SetRecipe = function (a) {
	return {$: 'SetRecipe', a: a};
};
var author$project$Devs$Utils$getRecipe = F2(
	function (model, rec) {
		return A3(
			author$project$Devs$BackendApi$getRecipe,
			author$project$Devs$TypeObject$SetRecipe,
			model.loginToken,
			model.sp.serverProtokoll + (model.sp.serverHost + (model.sp.serverUrlPrefix + (model.sp.apiUrlPrefix + ('/getRecipeById/?id=' + elm$core$String$fromInt(rec.id))))));
	});
var author$project$Devs$Objects$RecipeLight = F3(
	function (id, name, uuid) {
		return {id: id, name: name, uuid: uuid};
	});
var author$project$Devs$RecipeDecode$recipeLightDecoder = A4(
	elm$json$Json$Decode$map3,
	author$project$Devs$Objects$RecipeLight,
	A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
	A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'uuid', elm$json$Json$Decode$string));
var author$project$Devs$BackendApi$getRecipeListForTag = F3(
	function (event, token, url) {
		return A5(
			author$project$Devs$BackendApi$myRequest,
			'GET',
			url,
			A2(
				elm$http$Http$expectJson,
				event,
				elm$json$Json$Decode$list(author$project$Devs$RecipeDecode$recipeLightDecoder)),
			token,
			elm$core$Maybe$Nothing);
	});
var author$project$Devs$TypeObject$ListRecipesForTag = function (a) {
	return {$: 'ListRecipesForTag', a: a};
};
var author$project$Devs$Utils$getRecipeListForTag = F2(
	function (model, selectedTag) {
		var tagId = function () {
			var _n0 = model.selectedTag;
			if (_n0.$ === 'Just') {
				var tag = _n0.a;
				var _n1 = tag.id;
				if (_n1.$ === 'Just') {
					var id = _n1.a;
					return id;
				} else {
					return -2;
				}
			} else {
				if (selectedTag.$ === 'Just') {
					var tag = selectedTag.a;
					var _n3 = tag.id;
					if (_n3.$ === 'Just') {
						var id = _n3.a;
						return id;
					} else {
						return -3;
					}
				} else {
					return -4;
				}
			}
		}();
		return A3(
			author$project$Devs$BackendApi$getRecipeListForTag,
			author$project$Devs$TypeObject$ListRecipesForTag,
			model.loginToken,
			model.sp.serverProtokoll + (model.sp.serverHost + (model.sp.serverUrlPrefix + (model.sp.apiUrlPrefix + ('/getAllRecipeByTagWithoutMeta/?id=' + elm$core$String$fromInt(tagId))))));
	});
var elm$random$Random$initialSeed = function (x) {
	var _n0 = elm$random$Random$next(
		A2(elm$random$Random$Seed, 0, 1013904223));
	var state1 = _n0.a;
	var incr = _n0.b;
	var state2 = (state1 + x) >>> 0;
	return elm$random$Random$next(
		A2(elm$random$Random$Seed, state2, incr));
};
var author$project$Devs$Utils$getSeed = function (model) {
	var _n0 = model.currentSeed;
	if (_n0.$ === 'Just') {
		var seed = _n0.a;
		return seed;
	} else {
		return elm$random$Random$initialSeed(model.random);
	}
};
var author$project$Devs$Objects$Tagtype = F4(
	function (id, name, tagList, uuid) {
		return {id: id, name: name, tagList: tagList, uuid: uuid};
	});
var author$project$Devs$RecipeDecode$tagtypeDecoder = A5(
	elm$json$Json$Decode$map4,
	author$project$Devs$Objects$Tagtype,
	A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
	A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'tagList', author$project$Devs$RecipeDecode$tagListDecoder),
	A2(elm$json$Json$Decode$field, 'uuid', elm$json$Json$Decode$string));
var author$project$Devs$BackendApi$getTagtypeListForOverview = F3(
	function (event, token, url) {
		return A5(
			author$project$Devs$BackendApi$myRequest,
			'GET',
			url,
			A2(
				elm$http$Http$expectJson,
				event,
				elm$json$Json$Decode$list(author$project$Devs$RecipeDecode$tagtypeDecoder)),
			token,
			elm$core$Maybe$Nothing);
	});
var author$project$Devs$TypeObject$ListTagtypes = function (a) {
	return {$: 'ListTagtypes', a: a};
};
var author$project$Devs$Utils$getTagtypeListForOverview = function (model) {
	return A3(author$project$Devs$BackendApi$getTagtypeListForOverview, author$project$Devs$TypeObject$ListTagtypes, model.loginToken, model.sp.serverProtokoll + (model.sp.serverHost + (model.sp.serverUrlPrefix + (model.sp.apiUrlPrefix + '/getAllTagTypes'))));
};
var author$project$Devs$Utils$httpErrorToMessage = function (error) {
	switch (error.$) {
		case 'NetworkError':
			return 'Is the server running?';
		case 'BadStatus':
			var response = error.a;
			return elm$core$String$fromInt(response);
		case 'BadBody':
			var response = error.a;
			return response;
		case 'BadUrl':
			var url = error.a;
			return 'You defindes a wrong URL! ' + url;
		default:
			return 'The time for request is out!';
	}
};
var elm$http$Http$expectString = function (toMsg) {
	return A2(
		elm$http$Http$expectStringResponse,
		toMsg,
		elm$http$Http$resolve(elm$core$Result$Ok));
};
var elm$http$Http$get = function (r) {
	return elm$http$Http$request(
		{body: elm$http$Http$emptyBody, expect: r.expect, headers: _List_Nil, method: 'GET', timeout: elm$core$Maybe$Nothing, tracker: elm$core$Maybe$Nothing, url: r.url});
};
var author$project$Devs$BackendApi$login = F2(
	function (event, url) {
		return elm$http$Http$get(
			{
				expect: elm$http$Http$expectString(event),
				url: url
			});
	});
var author$project$Devs$TypeObject$HandleLogin = function (a) {
	return {$: 'HandleLogin', a: a};
};
var author$project$Devs$Utils$login = function (model) {
	return A2(author$project$Devs$BackendApi$login, author$project$Devs$TypeObject$HandleLogin, model.sp.serverProtokoll + (model.sp.serverHost + (model.sp.serverUrlPrefix + (model.sp.apiUrlPrefix + ('/login/?username=' + (model.usernameForCheck + ('&password=' + model.passwordForCheck)))))));
};
var elm$json$Json$Encode$float = _Json_wrap;
var elm$json$Json$Encode$null = _Json_encodeNull;
var author$project$Devs$RecipeEncode$encodeFloat = function (str) {
	if (str.$ === 'Just') {
		var val = str.a;
		return elm$json$Json$Encode$float(val);
	} else {
		return elm$json$Json$Encode$null;
	}
};
var elm$json$Json$Encode$int = _Json_wrap;
var author$project$Devs$RecipeEncode$encodeInt = function (str) {
	if (str.$ === 'Just') {
		var val = str.a;
		return elm$json$Json$Encode$int(val);
	} else {
		return elm$json$Json$Encode$null;
	}
};
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var author$project$Devs$RecipeEncode$encodeString = function (str) {
	if (str.$ === 'Just') {
		var val = str.a;
		return elm$core$String$isEmpty(val) ? elm$json$Json$Encode$null : elm$json$Json$Encode$string(val);
	} else {
		return elm$json$Json$Encode$null;
	}
};
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var author$project$Devs$RecipeEncode$partLightEncoder = function (p) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$int(p.id)),
				_Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(p.name)),
				_Utils_Tuple2(
				'uuid',
				elm$json$Json$Encode$string(p.uuid))
			]));
};
var author$project$Devs$RecipeEncode$unitCatEncoder = function (uc) {
	var list = _List_fromArray(
		[
			_Utils_Tuple2(
			'id',
			elm$json$Json$Encode$int(uc.id)),
			_Utils_Tuple2(
			'name',
			elm$json$Json$Encode$string(uc.name)),
			_Utils_Tuple2(
			'uuid',
			elm$json$Json$Encode$string(uc.uuid))
		]);
	return elm$json$Json$Encode$object(list);
};
var author$project$Devs$RecipeEncode$unitEncoder = function (unit) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$int(unit.id)),
				_Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(unit.name)),
				_Utils_Tuple2(
				'unitCategory',
				author$project$Devs$RecipeEncode$unitCatEncoder(unit.unitCategory)),
				_Utils_Tuple2(
				'uuid',
				elm$json$Json$Encode$string(unit.uuid))
			]));
};
var author$project$Devs$RecipeEncode$ingreEncoder = function (ingre) {
	var list = _List_fromArray(
		[
			_Utils_Tuple2(
			'id',
			author$project$Devs$RecipeEncode$encodeInt(ingre.id)),
			_Utils_Tuple2(
			'name',
			elm$json$Json$Encode$string(ingre.name)),
			_Utils_Tuple2(
			'sortorder',
			elm$json$Json$Encode$int(ingre.sortorder)),
			_Utils_Tuple2(
			'comment',
			author$project$Devs$RecipeEncode$encodeString(ingre.comment)),
			_Utils_Tuple2(
			'part',
			function () {
				var _n0 = ingre.part;
				if (_n0.$ === 'Just') {
					var val = _n0.a;
					return author$project$Devs$RecipeEncode$partLightEncoder(val);
				} else {
					return elm$json$Json$Encode$null;
				}
			}()),
			_Utils_Tuple2(
			'quantity',
			author$project$Devs$RecipeEncode$encodeFloat(ingre.quantity)),
			_Utils_Tuple2(
			'unit',
			function () {
				var _n1 = ingre.unit;
				if (_n1.$ === 'Just') {
					var val = _n1.a;
					return author$project$Devs$RecipeEncode$unitEncoder(val);
				} else {
					return elm$json$Json$Encode$null;
				}
			}()),
			_Utils_Tuple2(
			'uuid',
			elm$json$Json$Encode$string(ingre.uuid))
		]);
	return elm$json$Json$Encode$object(list);
};
var author$project$Devs$RecipeEncode$sourceEncoder = function (src) {
	var list = _List_fromArray(
		[
			_Utils_Tuple2(
			'id',
			author$project$Devs$RecipeEncode$encodeInt(src.id)),
			_Utils_Tuple2(
			'name',
			elm$json$Json$Encode$string(src.name)),
			_Utils_Tuple2(
			'isbn',
			author$project$Devs$RecipeEncode$encodeString(src.isbn)),
			_Utils_Tuple2(
			'year',
			author$project$Devs$RecipeEncode$encodeString(src.year)),
			_Utils_Tuple2(
			'uuid',
			elm$json$Json$Encode$string(src.uuid))
		]);
	return elm$json$Json$Encode$object(list);
};
var author$project$Devs$RecipeEncode$tagtypeEncoder = function (tt) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				author$project$Devs$RecipeEncode$encodeInt(tt.id)),
				_Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(tt.name)),
				_Utils_Tuple2(
				'uuid',
				elm$json$Json$Encode$string(tt.uuid))
			]));
};
var author$project$Devs$RecipeEncode$tagEncoder = function (tag) {
	var list = _List_fromArray(
		[
			_Utils_Tuple2(
			'id',
			author$project$Devs$RecipeEncode$encodeInt(tag.id)),
			_Utils_Tuple2(
			'name',
			elm$json$Json$Encode$string(tag.name)),
			_Utils_Tuple2(
			'tagtype',
			author$project$Devs$RecipeEncode$tagtypeEncoder(tag.tagType)),
			_Utils_Tuple2(
			'uuid',
			elm$json$Json$Encode$string(tag.uuid))
		]);
	return elm$json$Json$Encode$object(list);
};
var author$project$Devs$RecipeEncode$todoEncoder = function (td) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$int(td.id)),
				_Utils_Tuple2(
				'number',
				elm$json$Json$Encode$int(td.number)),
				_Utils_Tuple2(
				'text',
				elm$json$Json$Encode$string(td.text)),
				_Utils_Tuple2(
				'image',
				author$project$Devs$RecipeEncode$encodeString(td.image)),
				_Utils_Tuple2(
				'image_comment',
				author$project$Devs$RecipeEncode$encodeString(td.image_comment)),
				_Utils_Tuple2(
				'uuid',
				elm$json$Json$Encode$string(td.uuid))
			]));
};
var elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var author$project$Devs$RecipeEncode$recipeEncoder = function (rec) {
	var list = _List_fromArray(
		[
			_Utils_Tuple2(
			'id',
			function () {
				var _n0 = rec.id;
				if (_n0.$ === 'Just') {
					var val = _n0.a;
					return elm$json$Json$Encode$int(val);
				} else {
					return elm$json$Json$Encode$null;
				}
			}()),
			_Utils_Tuple2(
			'name',
			elm$json$Json$Encode$string(rec.name)),
			_Utils_Tuple2(
			'aikz',
			elm$json$Json$Encode$int(rec.aikz)),
			_Utils_Tuple2(
			'image',
			author$project$Devs$RecipeEncode$encodeString(rec.image)),
			_Utils_Tuple2(
			'translate',
			author$project$Devs$RecipeEncode$encodeString(rec.translate)),
			_Utils_Tuple2(
			'number_comment',
			author$project$Devs$RecipeEncode$encodeString(rec.number_comment)),
			_Utils_Tuple2(
			'number',
			author$project$Devs$RecipeEncode$encodeInt(rec.number)),
			_Utils_Tuple2(
			'nv_size',
			author$project$Devs$RecipeEncode$encodeInt(rec.nv_size)),
			_Utils_Tuple2(
			'source_page',
			author$project$Devs$RecipeEncode$encodeInt(rec.source_page)),
			_Utils_Tuple2(
			'nv_carbohydrates',
			author$project$Devs$RecipeEncode$encodeFloat(rec.nv_carbohydrates)),
			_Utils_Tuple2(
			'nv_energy',
			author$project$Devs$RecipeEncode$encodeFloat(rec.nv_energy)),
			_Utils_Tuple2(
			'nv_fat',
			author$project$Devs$RecipeEncode$encodeFloat(rec.nv_fat)),
			_Utils_Tuple2(
			'nv_protein',
			author$project$Devs$RecipeEncode$encodeFloat(rec.nv_protein)),
			_Utils_Tuple2(
			'source',
			function () {
				var _n1 = rec.source;
				if (_n1.$ === 'Just') {
					var val = _n1.a;
					return author$project$Devs$RecipeEncode$sourceEncoder(val);
				} else {
					return elm$json$Json$Encode$null;
				}
			}()),
			_Utils_Tuple2(
			'ingredients',
			A2(elm$json$Json$Encode$list, author$project$Devs$RecipeEncode$ingreEncoder, rec.ingredients)),
			_Utils_Tuple2(
			'tags',
			A2(elm$json$Json$Encode$list, author$project$Devs$RecipeEncode$tagEncoder, rec.tags)),
			_Utils_Tuple2(
			'todos',
			A2(elm$json$Json$Encode$list, author$project$Devs$RecipeEncode$todoEncoder, rec.todos)),
			_Utils_Tuple2(
			'uuid',
			elm$json$Json$Encode$string(rec.uuid))
		]);
	return elm$json$Json$Encode$object(list);
};
var elm$core$Debug$log = _Debug_log;
var author$project$Devs$BackendApi$saveRecipe = F4(
	function (event, token, url, newRecipe) {
		var jsonValue = author$project$Devs$RecipeEncode$recipeEncoder(newRecipe);
		var logString = A2(elm$json$Json$Encode$encode, 0, jsonValue);
		var _n0 = A2(elm$core$Debug$log, 'newRecipe: ', logString);
		return A5(
			author$project$Devs$BackendApi$myRequest,
			'POST',
			url,
			A2(elm$http$Http$expectJson, event, author$project$Devs$RecipeDecode$recipeDecoder),
			token,
			elm$core$Maybe$Just(jsonValue));
	});
var author$project$Devs$TypeObject$SavedRecipe = function (a) {
	return {$: 'SavedRecipe', a: a};
};
var author$project$Devs$Utils$saveRecipe = F2(
	function (model, newRecipe) {
		return A4(author$project$Devs$BackendApi$saveRecipe, author$project$Devs$TypeObject$SavedRecipe, model.loginToken, model.sp.serverProtokoll + (model.sp.serverHost + (model.sp.serverUrlPrefix + (model.sp.apiUrlPrefix + '/saveRecipe'))), newRecipe);
	});
var author$project$Devs$BackendApi$saveSource = F4(
	function (event, token, url, newSource) {
		var jsonValue = author$project$Devs$RecipeEncode$sourceEncoder(newSource);
		return A5(
			author$project$Devs$BackendApi$myRequest,
			'POST',
			url,
			A2(elm$http$Http$expectJson, event, author$project$Devs$RecipeDecode$sourceDecoder),
			token,
			elm$core$Maybe$Just(jsonValue));
	});
var author$project$Devs$TypeObject$SavedSource = function (a) {
	return {$: 'SavedSource', a: a};
};
var author$project$Devs$Utils$saveSource = F2(
	function (model, newSource) {
		return A4(author$project$Devs$BackendApi$saveSource, author$project$Devs$TypeObject$SavedSource, model.loginToken, model.sp.serverProtokoll + (model.sp.serverHost + (model.sp.serverUrlPrefix + (model.sp.apiUrlPrefix + '/saveSource'))), newSource);
	});
var author$project$Devs$BackendApi$searchRecipe = F3(
	function (event, token, url) {
		return A5(
			author$project$Devs$BackendApi$myRequest,
			'GET',
			url,
			A2(
				elm$http$Http$expectJson,
				event,
				elm$json$Json$Decode$list(author$project$Devs$RecipeDecode$recipeLightDecoder)),
			token,
			elm$core$Maybe$Nothing);
	});
var elm$core$String$trim = _String_trim;
var author$project$Devs$Utils$searchRecipe = function (model) {
	return A3(
		author$project$Devs$BackendApi$searchRecipe,
		author$project$Devs$TypeObject$ListRecipesForTag,
		model.loginToken,
		model.sp.serverProtokoll + (model.sp.serverHost + (model.sp.serverUrlPrefix + (model.sp.apiUrlPrefix + ('/findRecipeByName/?name=' + elm$core$String$trim(model.searchValue))))));
};
var author$project$Devs$Utils$setInitialPart = F2(
	function (keyList, newList) {
		return _Utils_update(
			keyList,
			{
				partList: elm$core$Maybe$Just(newList)
			});
	});
var author$project$Devs$Utils$setInitialSource = F2(
	function (keyList, newList) {
		return _Utils_update(
			keyList,
			{
				sourceList: elm$core$Maybe$Just(newList)
			});
	});
var author$project$Devs$Utils$setInitialTag = F2(
	function (keyList, newList) {
		return _Utils_update(
			keyList,
			{
				tagList: elm$core$Maybe$Just(newList)
			});
	});
var author$project$Devs$Utils$setInitialUnit = F2(
	function (keyList, newList) {
		return _Utils_update(
			keyList,
			{
				unitList: elm$core$Maybe$Just(newList)
			});
	});
var author$project$Devs$RecipeEncode$imageEncoder = function (img) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'contents',
				elm$json$Json$Encode$string(img.contents)),
				_Utils_Tuple2(
				'filename',
				elm$json$Json$Encode$string(img.filename))
			]));
};
var elm$json$Json$Decode$bool = _Json_decodeBool;
var author$project$Devs$BackendApi$uploadImage = F4(
	function (event, token, url, image) {
		var jsonValue = author$project$Devs$RecipeEncode$imageEncoder(image);
		return A5(
			author$project$Devs$BackendApi$myRequest,
			'POST',
			url,
			A2(elm$http$Http$expectJson, event, elm$json$Json$Decode$bool),
			token,
			elm$core$Maybe$Just(jsonValue));
	});
var author$project$Devs$TypeObject$UploadImage = function (a) {
	return {$: 'UploadImage', a: a};
};
var author$project$Devs$Utils$uploadImage = F2(
	function (model, image) {
		return A4(author$project$Devs$BackendApi$uploadImage, author$project$Devs$TypeObject$UploadImage, model.loginToken, model.sp.serverProtokoll + (model.sp.serverHost + (model.sp.serverUrlPrefix + (model.sp.apiUrlPrefix + '/uploadImage'))), image);
	});
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var author$project$Devs$Utils$validateRecipe = function (rec) {
	if (elm$core$String$isEmpty(rec.name)) {
		return elm$core$Maybe$Just('Es muss ein Namen eingegeben werden.');
	} else {
		var _n0 = rec.source;
		if (_n0.$ === 'Just') {
			var src = _n0.a;
			return elm$core$List$isEmpty(rec.ingredients) ? elm$core$Maybe$Just('Es muss mindestens eine Zutat eingegeben werden.') : (elm$core$List$isEmpty(rec.todos) ? elm$core$Maybe$Just('Es muss mindestens eine Anweisung eingegeben werden.') : (elm$core$List$isEmpty(rec.tags) ? elm$core$Maybe$Just('Es muss mindestens ein Tag eingegeben werden.') : elm$core$Maybe$Nothing));
		} else {
			return elm$core$Maybe$Just('Es muss eine Quelle angegeben werden.');
		}
	}
};
var elm$core$Basics$neq = _Utils_notEqual;
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$random$Random$step = F2(
	function (_n0, seed) {
		var generator = _n0.a;
		return generator(seed);
	});
var elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var elm_community$list_extra$List$Extra$updateIf = F3(
	function (predicate, update, list) {
		return A2(
			elm$core$List$map,
			function (item) {
				return predicate(item) ? update(item) : item;
			},
			list);
	});
var author$project$Devs$Update$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'NoOp':
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			case 'Initialize':
				var initData = msg.a;
				var sp = model.sp;
				var newSp = _Utils_update(
					sp,
					{
						serverHost: initData.serverName + (':' + elm$core$String$fromInt(initData.serverPort)),
						serverProtokoll: initData.protocol + '://'
					});
				var newModel = _Utils_update(
					model,
					{random: initData.random, sp: newSp});
				return _Utils_Tuple2(
					newModel,
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								author$project$Devs$Utils$getTagtypeListForOverview(newModel),
								author$project$Devs$Utils$getAllUnits(newModel),
								author$project$Devs$Utils$getAllSources(newModel),
								author$project$Devs$Utils$getAllTags(newModel),
								author$project$Devs$Utils$getAllParts(newModel)
							])));
			case 'ImageSelected':
				return _Utils_Tuple2(
					model,
					author$project$Devs$Ports$fileSelected('recImage'));
			case 'ImageRead':
				var imagePortData = msg.a;
				var newImage = {contents: imagePortData.contents, filename: imagePortData.filename};
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							recImage: elm$core$Maybe$Just(newImage),
							selectedRecipe: A2(
								author$project$Devs$Recipe$setImage,
								model.selectedRecipe,
								elm$core$Maybe$Just(imagePortData.filename))
						}),
					A2(author$project$Devs$Utils$uploadImage, model, newImage));
			case 'GetLoginForm':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							loginToken: elm$core$Maybe$Just('')
						}),
					elm$core$Platform$Cmd$none);
			case 'SetUsernameForCheck':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{usernameForCheck: val}),
					elm$core$Platform$Cmd$none);
			case 'SetPasswortForCheck':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{passwordForCheck: val}),
					elm$core$Platform$Cmd$none);
			case 'Login':
				return elm$core$String$isEmpty(model.passwordForCheck) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							alertMessage: elm$core$Maybe$Just('Bitte gib einen Passwort ein!')
						}),
					elm$core$Platform$Cmd$none) : (elm$core$String$isEmpty(model.usernameForCheck) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							alertMessage: elm$core$Maybe$Just('Bitte gib einen Benutzername ein!')
						}),
					elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					model,
					author$project$Devs$Utils$login(model)));
			case 'HandleLogin':
				if (msg.a.$ === 'Ok') {
					var loginToken = msg.a.a;
					return (elm$core$String$length(loginToken) > 0) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{
								alertMessage: elm$core$Maybe$Nothing,
								loginToken: elm$core$Maybe$Just(loginToken)
							}),
						elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{
								alertMessage: elm$core$Maybe$Just('Mindestens eine der eingegeben Daten ist falsch!')
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								recAlertMessage: elm$core$Maybe$Just(
									author$project$Devs$Utils$httpErrorToMessage(error))
							}),
						elm$core$Platform$Cmd$none);
				}
			case 'ShowOverView':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{selectedRecipe: elm$core$Maybe$Nothing, selectedTag: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
			case 'ToggleEditForm':
				var formEnum = msg.a;
				var fe = _Utils_eq(formEnum, author$project$Devs$Objects$None) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(formEnum);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{showEditForm: fe}),
					elm$core$Platform$Cmd$none);
			case 'ShowRecipe':
				var rec = msg.a;
				var selectedRecipe = function () {
					if (rec.$ === 'Just') {
						var recipe = rec.a;
						return recipe;
					} else {
						return {
							id: -1,
							name: '',
							uuid: TSFoster$elm_uuid$UUID$toString(TSFoster$elm_uuid$UUID$nil)
						};
					}
				}();
				return _Utils_Tuple2(
					model,
					A2(author$project$Devs$Utils$getRecipe, model, selectedRecipe));
			case 'SetNumberForDisplay':
				var nfd = msg.a;
				var selectedRecipe = function () {
					var _n2 = model.selectedRecipe;
					if (_n2.$ === 'Just') {
						var recipe = _n2.a;
						return elm$core$Maybe$Just(
							_Utils_update(
								recipe,
								{
									number_for_display: elm$core$String$toFloat(nfd)
								}));
					} else {
						return elm$core$Maybe$Nothing;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{selectedRecipe: selectedRecipe}),
					elm$core$Platform$Cmd$none);
			case 'EditRecipe':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{selectedRecipe: model.selectedRecipe}),
					elm$core$Platform$Cmd$none);
			case 'InsertRecipe':
				var newRec = author$project$Devs$Objects$getEmptyRecipe;
				var _n3 = A2(
					elm$random$Random$step,
					TSFoster$elm_uuid$UUID$generator,
					author$project$Devs$Utils$getSeed(model));
				var newUuid = _n3.a;
				var newSeed = _n3.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							currentSeed: elm$core$Maybe$Just(newSeed),
							selectedRecipe: elm$core$Maybe$Just(
								_Utils_update(
									newRec,
									{
										uuid: TSFoster$elm_uuid$UUID$toString(newUuid)
									}))
						}),
					elm$core$Platform$Cmd$none);
			case 'SaveRecipe':
				var errorMsg = function () {
					var _n8 = model.selectedRecipe;
					if (_n8.$ === 'Just') {
						var rec = _n8.a;
						return author$project$Devs$Utils$validateRecipe(rec);
					} else {
						return elm$core$Maybe$Nothing;
					}
				}();
				var _n4 = A2(elm$core$Debug$log, 'selectedRecipe: ', model.selectedRecipe);
				var _n5 = A2(elm$core$Debug$log, 'errorMsg: ', errorMsg);
				if (errorMsg.$ === 'Just') {
					var msg1 = errorMsg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								recAlertMessage: elm$core$Maybe$Just(msg1)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var _n7 = model.selectedRecipe;
					if (_n7.$ === 'Just') {
						var newRecipe = _n7.a;
						return _Utils_Tuple2(
							model,
							A2(author$project$Devs$Utils$saveRecipe, model, newRecipe));
					} else {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					}
				}
			case 'SavedRecipe':
				if (msg.a.$ === 'Ok') {
					var savedRecipe = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								recAlertMessage: elm$core$Maybe$Nothing,
								selectedRecipe: elm$core$Maybe$Just(savedRecipe)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					var _n9 = A2(elm$core$Debug$log, 'error: ', error);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								recAlertMessage: elm$core$Maybe$Just(
									author$project$Devs$Utils$httpErrorToMessage(error))
							}),
						elm$core$Platform$Cmd$none);
				}
			case 'DeleteRecipe':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{deleteRecipe: false, newSource: elm$core$Maybe$Nothing, recipesOfSelectedTag: elm$core$Maybe$Nothing, selectedRecipe: elm$core$Maybe$Nothing, selectedTag: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
			case 'CloseRecipeAlert':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{recAlertMessage: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
			case 'SetAikz':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setAikz, model.selectedRecipe, val)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetName':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setName, model.selectedRecipe, val)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetTranslate':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setTranslate, model.selectedRecipe, val)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetNumber':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setNumber, model.selectedRecipe, val)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetNumberComment':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setNumberComment, model.selectedRecipe, val)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetRecImage':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(
								author$project$Devs$Recipe$setImage,
								model.selectedRecipe,
								elm$core$Maybe$Just(val))
						}),
					elm$core$Platform$Cmd$none);
			case 'RemoveImageFromRecipe':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							recImage: elm$core$Maybe$Nothing,
							selectedRecipe: A2(author$project$Devs$Recipe$setImage, model.selectedRecipe, elm$core$Maybe$Nothing)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetCarbo':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setCarbo, model.selectedRecipe, val)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetEnergy':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setEnergy, model.selectedRecipe, val)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetFat':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setFat, model.selectedRecipe, val)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetProt':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setProt, model.selectedRecipe, val)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetSize':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setSize, model.selectedRecipe, val)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetSourcePage':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setSourcePage, model.selectedRecipe, val)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetSource':
				var sUuid = msg.a;
				var sourceList = function () {
					var _n11 = model.kl.sourceList;
					if (_n11.$ === 'Just') {
						var srcList = _n11.a;
						return srcList;
					} else {
						return _List_Nil;
					}
				}();
				var newRec = function () {
					var _n10 = A2(
						elm_community$list_extra$List$Extra$find,
						function (item) {
							return _Utils_eq(item.uuid, sUuid);
						},
						sourceList);
					if (_n10.$ === 'Just') {
						var src = _n10.a;
						return A2(author$project$Devs$Recipe$setSource, model.selectedRecipe, src);
					} else {
						return model.selectedRecipe;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{selectedRecipe: newRec}),
					elm$core$Platform$Cmd$none);
			case 'AddNewSource':
				var _n12 = A2(
					elm$random$Random$step,
					TSFoster$elm_uuid$UUID$generator,
					author$project$Devs$Utils$getSeed(model));
				var newUuid = _n12.a;
				var newSeed = _n12.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							currentSeed: elm$core$Maybe$Just(newSeed),
							newSource: elm$core$Maybe$Just(
								_Utils_update(
									author$project$Devs$Objects$getEmptySource,
									{
										uuid: TSFoster$elm_uuid$UUID$toString(newUuid)
									}))
						}),
					elm$core$Platform$Cmd$none);
			case 'SetSrcName':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							newSource: A2(author$project$Devs$Recipe$setSourceName, model.newSource, val)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetSrcIsbn':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							newSource: A2(author$project$Devs$Recipe$setSourceIsbn, model.newSource, val)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetSrcYear':
				var val = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							newSource: A2(author$project$Devs$Recipe$setSourceYear, model.newSource, val)
						}),
					elm$core$Platform$Cmd$none);
			case 'CancelSourceEdit':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{newSource: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
			case 'SaveNewSource':
				var newSource = function () {
					var _n13 = model.newSource;
					if (_n13.$ === 'Just') {
						var src = _n13.a;
						return src;
					} else {
						return author$project$Devs$Objects$getEmptySource;
					}
				}();
				return elm$core$String$isEmpty(newSource.name) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							alertMessage: elm$core$Maybe$Just('Bitte mindestens einen Namen für die Quelle eingeben.')
						}),
					elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					model,
					A2(author$project$Devs$Utils$saveSource, model, newSource));
			case 'SavedSource':
				if (msg.a.$ === 'Ok') {
					var savedSource = msg.a.a;
					var newSourceList = function () {
						var _n14 = model.kl.sourceList;
						if (_n14.$ === 'Just') {
							var srcList = _n14.a;
							return A2(
								elm$core$List$append,
								srcList,
								_List_fromArray(
									[savedSource]));
						} else {
							return _List_fromArray(
								[savedSource]);
						}
					}();
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								kl: A2(author$project$Devs$Utils$setInitialSource, model.kl, newSourceList),
								newSource: elm$core$Maybe$Nothing
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								alertMessage: elm$core$Maybe$Just(
									author$project$Devs$Utils$httpErrorToMessage(error))
							}),
						elm$core$Platform$Cmd$none);
				}
			case 'ChooseNewTag':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							addTag: elm$core$Maybe$Just(author$project$Devs$Objects$getEmptyTag)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetChoosenTag':
				var tUuid = msg.a;
				var tagList = function () {
					var _n16 = model.kl.tagList;
					if (_n16.$ === 'Just') {
						var tagListTmp = _n16.a;
						return tagListTmp;
					} else {
						return _List_Nil;
					}
				}();
				var newModel = function () {
					var _n15 = A2(
						elm_community$list_extra$List$Extra$find,
						function (item) {
							return _Utils_eq(item.uuid, tUuid);
						},
						tagList);
					if (_n15.$ === 'Just') {
						var item = _n15.a;
						return _Utils_update(
							model,
							{
								addTag: elm$core$Maybe$Just(item)
							});
					} else {
						return model;
					}
				}();
				return _Utils_Tuple2(newModel, elm$core$Platform$Cmd$none);
			case 'RemoveTagFromRec':
				var tUuid = msg.a;
				var newTagList = function () {
					var _n17 = model.selectedRecipe;
					if (_n17.$ === 'Just') {
						var rec = _n17.a;
						return A2(
							elm$core$List$filter,
							function (item) {
								return !_Utils_eq(item.uuid, tUuid);
							},
							rec.tags);
					} else {
						return _List_Nil;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setTags, model.selectedRecipe, newTagList)
						}),
					elm$core$Platform$Cmd$none);
			case 'AddTagToRecipe':
				var _n18 = model.addTag;
				if (_n18.$ === 'Just') {
					var newTag = _n18.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								addTag: elm$core$Maybe$Nothing,
								alertMessage: elm$core$Maybe$Nothing,
								selectedRecipe: A2(author$project$Devs$Recipe$addToTags, model.selectedRecipe, newTag)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								alertMessage: elm$core$Maybe$Just('Bitte einen Tag auswählen.')
							}),
						elm$core$Platform$Cmd$none);
				}
			case 'CancelAddTag':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{addTag: elm$core$Maybe$Nothing, alertMessage: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
			case 'AddIngreToRecipe':
				var _n19 = A2(
					elm$random$Random$step,
					TSFoster$elm_uuid$UUID$generator,
					author$project$Devs$Utils$getSeed(model));
				var newUuid = _n19.a;
				var newSeed = _n19.b;
				var newIngre = A2(author$project$Devs$Utils$getNewIngre, model, newUuid);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							currentSeed: elm$core$Maybe$Just(newSeed),
							selectedRecipe: A2(author$project$Devs$Recipe$addToIngredients, model.selectedRecipe, newIngre)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetIngreOrder':
				var iUuid = msg.a;
				var val = msg.b;
				var newOrder = A2(
					elm$core$Maybe$withDefault,
					0,
					elm$core$String$toInt(val));
				var newIngreList = function () {
					var _n20 = model.selectedRecipe;
					if (_n20.$ === 'Just') {
						var rec = _n20.a;
						return A3(
							elm_community$list_extra$List$Extra$updateIf,
							function (item) {
								return _Utils_eq(item.uuid, iUuid);
							},
							function (item) {
								return _Utils_update(
									item,
									{sortorder: newOrder});
							},
							rec.ingredients);
					} else {
						return _List_Nil;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setIngredients, model.selectedRecipe, newIngreList)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetIngreName':
				var iUuid = msg.a;
				var val = msg.b;
				var newIngreList = function () {
					var _n21 = model.selectedRecipe;
					if (_n21.$ === 'Just') {
						var rec = _n21.a;
						return A3(
							elm_community$list_extra$List$Extra$updateIf,
							function (item) {
								return _Utils_eq(item.uuid, iUuid);
							},
							function (item) {
								return _Utils_update(
									item,
									{name: val});
							},
							rec.ingredients);
					} else {
						return _List_Nil;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setIngredients, model.selectedRecipe, newIngreList)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetIngreComment':
				var iUuid = msg.a;
				var val = msg.b;
				var newIngreList = function () {
					var _n22 = model.selectedRecipe;
					if (_n22.$ === 'Just') {
						var rec = _n22.a;
						return A3(
							elm_community$list_extra$List$Extra$updateIf,
							function (item) {
								return _Utils_eq(item.uuid, iUuid);
							},
							function (item) {
								return _Utils_update(
									item,
									{
										comment: elm$core$Maybe$Just(val)
									});
							},
							rec.ingredients);
					} else {
						return _List_Nil;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setIngredients, model.selectedRecipe, newIngreList)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetIngreQuant':
				var iUuid = msg.a;
				var val = msg.b;
				var newQuant = A2(
					elm$core$Maybe$withDefault,
					0,
					elm$core$String$toFloat(val));
				var newIngreList = function () {
					var _n23 = model.selectedRecipe;
					if (_n23.$ === 'Just') {
						var rec = _n23.a;
						return A3(
							elm_community$list_extra$List$Extra$updateIf,
							function (item) {
								return _Utils_eq(item.uuid, iUuid);
							},
							function (item) {
								return _Utils_update(
									item,
									{
										quantity: elm$core$Maybe$Just(newQuant)
									});
							},
							rec.ingredients);
					} else {
						return _List_Nil;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setIngredients, model.selectedRecipe, newIngreList)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetIngrePart':
				var iUuid = msg.a;
				var pUuid = msg.b;
				var partKeyList = function () {
					var _n26 = model.kl.partList;
					if (_n26.$ === 'Just') {
						var list = _n26.a;
						return list;
					} else {
						return _List_Nil;
					}
				}();
				var newRec = function () {
					var _n24 = A2(
						elm_community$list_extra$List$Extra$find,
						function (part) {
							return _Utils_eq(part.uuid, pUuid);
						},
						partKeyList);
					if (_n24.$ === 'Just') {
						var part = _n24.a;
						var _n25 = A2(author$project$Devs$Recipe$setParts, model.selectedRecipe, part);
						if (_n25.$ === 'Just') {
							var rec = _n25.a;
							return A2(
								author$project$Devs$Recipe$setIngredients,
								elm$core$Maybe$Just(rec),
								A3(
									elm_community$list_extra$List$Extra$updateIf,
									function (item) {
										return _Utils_eq(item.uuid, iUuid);
									},
									function (item) {
										return _Utils_update(
											item,
											{
												part: elm$core$Maybe$Just(part)
											});
									},
									rec.ingredients));
						} else {
							return elm$core$Maybe$Nothing;
						}
					} else {
						return elm$core$Maybe$Nothing;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{selectedRecipe: newRec}),
					elm$core$Platform$Cmd$none);
			case 'SetIngreUnit':
				var iUuid = msg.a;
				var uUuid = msg.b;
				var unitList = function () {
					var _n29 = model.kl.unitList;
					if (_n29.$ === 'Just') {
						var list = _n29.a;
						return list;
					} else {
						return _List_Nil;
					}
				}();
				var newIngreList = function () {
					var _n27 = A2(
						elm_community$list_extra$List$Extra$find,
						function (unit) {
							return _Utils_eq(unit.uuid, uUuid);
						},
						unitList);
					if (_n27.$ === 'Just') {
						var unit = _n27.a;
						var _n28 = model.selectedRecipe;
						if (_n28.$ === 'Just') {
							var rec = _n28.a;
							return A3(
								elm_community$list_extra$List$Extra$updateIf,
								function (item) {
									return _Utils_eq(item.uuid, iUuid);
								},
								function (item) {
									return _Utils_update(
										item,
										{
											unit: elm$core$Maybe$Just(unit)
										});
								},
								rec.ingredients);
						} else {
							return _List_Nil;
						}
					} else {
						return _List_Nil;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setIngredients, model.selectedRecipe, newIngreList)
						}),
					elm$core$Platform$Cmd$none);
			case 'RemoveIngreFromRecipe':
				var iUuid = msg.a;
				var newRec = function () {
					var _n30 = model.selectedRecipe;
					if (_n30.$ === 'Just') {
						var rec = _n30.a;
						return elm$core$Maybe$Just(
							_Utils_update(
								rec,
								{
									ingredients: A2(
										elm$core$List$filter,
										function (item) {
											return !_Utils_eq(item.uuid, iUuid);
										},
										rec.ingredients)
								}));
					} else {
						return model.selectedRecipe;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{selectedRecipe: newRec}),
					elm$core$Platform$Cmd$none);
			case 'AddTodoToRecipe':
				var _n31 = A2(
					elm$random$Random$step,
					TSFoster$elm_uuid$UUID$generator,
					author$project$Devs$Utils$getSeed(model));
				var newUuid = _n31.a;
				var newSeed = _n31.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							currentSeed: elm$core$Maybe$Just(newSeed),
							selectedRecipe: A2(
								author$project$Devs$Recipe$addToTodos,
								model.selectedRecipe,
								A2(author$project$Devs$Utils$getNewTodo, model, newUuid))
						}),
					elm$core$Platform$Cmd$none);
			case 'SetTodoNr':
				var tUuid = msg.a;
				var val = msg.b;
				var newNr = A2(
					elm$core$Maybe$withDefault,
					0,
					elm$core$String$toInt(val));
				var newTodoList = function () {
					var _n32 = model.selectedRecipe;
					if (_n32.$ === 'Just') {
						var rec = _n32.a;
						return A3(
							elm_community$list_extra$List$Extra$updateIf,
							function (item) {
								return _Utils_eq(item.uuid, tUuid);
							},
							function (item) {
								return _Utils_update(
									item,
									{number: newNr});
							},
							rec.todos);
					} else {
						return _List_Nil;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setTodos, model.selectedRecipe, newTodoList)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetTodoText':
				var tUuid = msg.a;
				var val = msg.b;
				var newTodoList = function () {
					var _n33 = model.selectedRecipe;
					if (_n33.$ === 'Just') {
						var rec = _n33.a;
						return A3(
							elm_community$list_extra$List$Extra$updateIf,
							function (item) {
								return _Utils_eq(item.uuid, tUuid);
							},
							function (item) {
								return _Utils_update(
									item,
									{text: val});
							},
							rec.todos);
					} else {
						return _List_Nil;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setTodos, model.selectedRecipe, newTodoList)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetTodoImg':
				var tUuid = msg.a;
				var val = msg.b;
				var newTodoList = function () {
					var _n34 = model.selectedRecipe;
					if (_n34.$ === 'Just') {
						var rec = _n34.a;
						return A3(
							elm_community$list_extra$List$Extra$updateIf,
							function (item) {
								return _Utils_eq(item.uuid, tUuid);
							},
							function (item) {
								return _Utils_update(
									item,
									{
										image: elm$core$Maybe$Just(val)
									});
							},
							rec.todos);
					} else {
						return _List_Nil;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setTodos, model.selectedRecipe, newTodoList)
						}),
					elm$core$Platform$Cmd$none);
			case 'SetTodoImgComment':
				var tUuid = msg.a;
				var val = msg.b;
				var newTodoList = function () {
					var _n35 = model.selectedRecipe;
					if (_n35.$ === 'Just') {
						var rec = _n35.a;
						return A3(
							elm_community$list_extra$List$Extra$updateIf,
							function (item) {
								return _Utils_eq(item.uuid, tUuid);
							},
							function (item) {
								return _Utils_update(
									item,
									{
										image_comment: elm$core$Maybe$Just(val)
									});
							},
							rec.todos);
					} else {
						return _List_Nil;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedRecipe: A2(author$project$Devs$Recipe$setTodos, model.selectedRecipe, newTodoList)
						}),
					elm$core$Platform$Cmd$none);
			case 'RemoveTodoFromRecipe':
				var tUuid = msg.a;
				var newRec = function () {
					var _n36 = model.selectedRecipe;
					if (_n36.$ === 'Just') {
						var rec = _n36.a;
						return elm$core$Maybe$Just(
							_Utils_update(
								rec,
								{
									todos: A2(
										elm$core$List$filter,
										function (item) {
											return !_Utils_eq(item.uuid, tUuid);
										},
										rec.todos)
								}));
					} else {
						return model.selectedRecipe;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{selectedRecipe: newRec}),
					elm$core$Platform$Cmd$none);
			case 'CancelRecipeEdit':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{newSource: elm$core$Maybe$Nothing, recAlertMessage: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
			case 'ConfirmDelete':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{deleteRecipe: true}),
					elm$core$Platform$Cmd$none);
			case 'CancelDelete':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{deleteRecipe: false}),
					elm$core$Platform$Cmd$none);
			case 'CancelLogin':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{alertMessage: elm$core$Maybe$Nothing, loginToken: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
			case 'ShowRecipesOfTag':
				var tag = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{selectedTag: tag}),
					A2(author$project$Devs$Utils$getRecipeListForTag, model, tag));
			case 'RemoveSelectedTag':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{recipesOfSelectedTag: elm$core$Maybe$Nothing, searchValue: '', selectedTag: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
			case 'RemoveSelectedRecipe':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{selectedRecipe: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
			case 'CloseAlert':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{alertMessage: elm$core$Maybe$Nothing, recAlertMessage: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
			case 'CloseLoginAlert':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{alertMessage: elm$core$Maybe$Nothing}),
					elm$core$Platform$Cmd$none);
			case 'ListTagtypes':
				if (msg.a.$ === 'Ok') {
					var tagtypeList = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								tagtypeList: elm$core$Maybe$Just(tagtypeList)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								alertMessage: elm$core$Maybe$Just(
									author$project$Devs$Utils$httpErrorToMessage(error))
							}),
						elm$core$Platform$Cmd$none);
				}
			case 'ListRecipesForTag':
				if (msg.a.$ === 'Ok') {
					var recipeList = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								recipesOfSelectedTag: elm$core$Maybe$Just(recipeList)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								alertMessage: elm$core$Maybe$Just(
									author$project$Devs$Utils$httpErrorToMessage(error))
							}),
						elm$core$Platform$Cmd$none);
				}
			case 'SetSearchInput':
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{searchValue: value}),
					elm$core$Platform$Cmd$none);
			case 'SearchRecipe':
				return elm$core$String$isEmpty(model.searchValue) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							alertMessage: elm$core$Maybe$Just('Bitte gib einen Suchbegriff ein!')
						}),
					elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{recipesOfSelectedTag: elm$core$Maybe$Nothing, selectedRecipe: elm$core$Maybe$Nothing, selectedTag: elm$core$Maybe$Nothing}),
					author$project$Devs$Utils$searchRecipe(model));
			case 'SetRecipe':
				if (msg.a.$ === 'Ok') {
					var recipe = msg.a.a;
					var number_for_display = function () {
						var _n37 = recipe.number;
						if (_n37.$ === 'Just') {
							var n = _n37.a;
							return n;
						} else {
							return 1;
						}
					}();
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								selectedRecipe: elm$core$Maybe$Just(
									_Utils_update(
										recipe,
										{
											number_for_display: elm$core$Maybe$Just(number_for_display)
										}))
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								alertMessage: elm$core$Maybe$Just(
									author$project$Devs$Utils$httpErrorToMessage(error))
							}),
						elm$core$Platform$Cmd$none);
				}
			case 'SetUnitList':
				if (msg.a.$ === 'Ok') {
					var list = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								kl: A2(author$project$Devs$Utils$setInitialUnit, model.kl, list)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								alertMessage: elm$core$Maybe$Just(
									author$project$Devs$Utils$httpErrorToMessage(error))
							}),
						elm$core$Platform$Cmd$none);
				}
			case 'SetSourceList':
				if (msg.a.$ === 'Ok') {
					var list = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								kl: A2(author$project$Devs$Utils$setInitialSource, model.kl, list)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								alertMessage: elm$core$Maybe$Just(
									author$project$Devs$Utils$httpErrorToMessage(error))
							}),
						elm$core$Platform$Cmd$none);
				}
			case 'SetTagList':
				if (msg.a.$ === 'Ok') {
					var list = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								kl: A2(author$project$Devs$Utils$setInitialTag, model.kl, list)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								alertMessage: elm$core$Maybe$Just(
									author$project$Devs$Utils$httpErrorToMessage(error))
							}),
						elm$core$Platform$Cmd$none);
				}
			case 'SetPartList':
				if (msg.a.$ === 'Ok') {
					var list = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								kl: A2(author$project$Devs$Utils$setInitialPart, model.kl, list)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								alertMessage: elm$core$Maybe$Just(
									author$project$Devs$Utils$httpErrorToMessage(error))
							}),
						elm$core$Platform$Cmd$none);
				}
			default:
				if (msg.a.$ === 'Ok') {
					var value = msg.a.a;
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								alertMessage: elm$core$Maybe$Just(
									author$project$Devs$Utils$httpErrorToMessage(error))
							}),
						elm$core$Platform$Cmd$none);
				}
		}
	});
var author$project$Devs$Objects$keyLists = {partList: elm$core$Maybe$Nothing, sourceList: elm$core$Maybe$Nothing, tagList: elm$core$Maybe$Nothing, unitList: elm$core$Maybe$Nothing};
var author$project$Devs$Objects$serverParams = {apiUrlPrefix: '/api/v1', iconPath: 'icons/', imagePath: 'images/', serverHost: 'localhost:8085', serverProtokoll: 'http://', serverUrlPrefix: '/RecipeServer'};
var author$project$Devs$Objects$initialModel = {addTag: elm$core$Maybe$Nothing, alertMessage: elm$core$Maybe$Nothing, currentSeed: elm$core$Maybe$Nothing, deleteRecipe: false, kl: author$project$Devs$Objects$keyLists, loginToken: elm$core$Maybe$Nothing, newSource: elm$core$Maybe$Nothing, passwordForCheck: '', random: 123456789, recAlertMessage: elm$core$Maybe$Nothing, recImage: elm$core$Maybe$Nothing, recipesOfSelectedTag: elm$core$Maybe$Nothing, searchValue: '', selectedRecipe: elm$core$Maybe$Nothing, selectedTag: elm$core$Maybe$Nothing, showEditForm: elm$core$Maybe$Nothing, sp: author$project$Devs$Objects$serverParams, subAlertMessage: elm$core$Maybe$Nothing, tagtypeList: elm$core$Maybe$Nothing, usernameForCheck: ''};
var author$project$RecipeServer$init = _Utils_Tuple2(author$project$Devs$Objects$initialModel, elm$core$Platform$Cmd$none);
var elm$json$Json$Decode$andThen = _Json_andThen;
var author$project$Devs$Ports$fileContentRead = _Platform_incomingPort(
	'fileContentRead',
	A2(
		elm$json$Json$Decode$andThen,
		function (filename) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (contents) {
					return elm$json$Json$Decode$succeed(
						{contents: contents, filename: filename});
				},
				A2(elm$json$Json$Decode$field, 'contents', elm$json$Json$Decode$string));
		},
		A2(elm$json$Json$Decode$field, 'filename', elm$json$Json$Decode$string)));
var author$project$Devs$Ports$initialize = _Platform_incomingPort(
	'initialize',
	A2(
		elm$json$Json$Decode$andThen,
		function (serverPort) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (serverName) {
					return A2(
						elm$json$Json$Decode$andThen,
						function (random) {
							return A2(
								elm$json$Json$Decode$andThen,
								function (protocol) {
									return elm$json$Json$Decode$succeed(
										{protocol: protocol, random: random, serverName: serverName, serverPort: serverPort});
								},
								A2(elm$json$Json$Decode$field, 'protocol', elm$json$Json$Decode$string));
						},
						A2(elm$json$Json$Decode$field, 'random', elm$json$Json$Decode$int));
				},
				A2(elm$json$Json$Decode$field, 'serverName', elm$json$Json$Decode$string));
		},
		A2(elm$json$Json$Decode$field, 'serverPort', elm$json$Json$Decode$int)));
var author$project$Devs$TypeObject$ImageRead = function (a) {
	return {$: 'ImageRead', a: a};
};
var author$project$Devs$TypeObject$Initialize = function (a) {
	return {$: 'Initialize', a: a};
};
var elm$core$Platform$Sub$batch = _Platform_batch;
var author$project$RecipeServer$subscriptions = function (model) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				author$project$Devs$Ports$fileContentRead(author$project$Devs$TypeObject$ImageRead),
				author$project$Devs$Ports$initialize(author$project$Devs$TypeObject$Initialize)
			]));
};
var author$project$Devs$TypeObject$CloseAlert = {$: 'CloseAlert'};
var author$project$Devs$TypeObject$CancelDelete = {$: 'CancelDelete'};
var author$project$Devs$TypeObject$DeleteRecipe = {$: 'DeleteRecipe'};
var author$project$Devs$TypeObject$GetLoginForm = {$: 'GetLoginForm'};
var author$project$Devs$TypeObject$InsertRecipe = {$: 'InsertRecipe'};
var author$project$Devs$TypeObject$SearchRecipe = {$: 'SearchRecipe'};
var author$project$Devs$TypeObject$SetSearchInput = function (a) {
	return {$: 'SetSearchInput', a: a};
};
var author$project$Devs$TypeObject$AddTagToRecipe = {$: 'AddTagToRecipe'};
var author$project$Devs$TypeObject$CancelAddTag = {$: 'CancelAddTag'};
var author$project$Devs$TypeObject$CloseLoginAlert = {$: 'CloseLoginAlert'};
var author$project$Devs$TypeObject$SetChoosenTag = function (a) {
	return {$: 'SetChoosenTag', a: a};
};
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$html$Html$option = _VirtualDom_node('option');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$selected = elm$html$Html$Attributes$boolProperty('selected');
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var author$project$Pages$EditorTabs$Tab2$showTagOption = F2(
	function (tagListValue, tag) {
		var selectedVal = _Utils_eq(tagListValue.uuid, tag.uuid) ? true : false;
		return A2(
			elm$html$Html$option,
			_List_fromArray(
				[
					elm$html$Html$Attributes$value(tag.uuid),
					elm$html$Html$Attributes$selected(selectedVal)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(tag.name + (' (' + (tag.tagType.name + ')')))
				]));
	});
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$img = _VirtualDom_node('img');
var elm$html$Html$span = _VirtualDom_node('span');
var elm$html$Html$Attributes$alt = elm$html$Html$Attributes$stringProperty('alt');
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$html$Html$Attributes$src = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Pages$Utils$alert = F3(
	function (event, alertMsg, model) {
		if (alertMsg.$ === 'Just') {
			var message = alertMsg.a;
			return A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('alert')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$span,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('close'),
								elm$html$Html$Events$onClick(event)
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$img,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('editIcon'),
										elm$html$Html$Attributes$src(model.sp.iconPath + 'close.png'),
										elm$html$Html$Attributes$alt('close message')
									]),
								_List_Nil)
							])),
						elm$html$Html$text(message)
					]));
		} else {
			return elm$html$Html$text('');
		}
	});
var author$project$Pages$Utils$getSelectOption = A2(
	elm$html$Html$option,
	_List_Nil,
	_List_fromArray(
		[
			elm$html$Html$text('Bitte wählen')
		]));
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$select = _VirtualDom_node('select');
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm_community$html_extra$Html$Events$Extra$onChange = function (onChangeAction) {
	return A2(
		elm$html$Html$Events$on,
		'change',
		A2(elm$json$Json$Decode$map, onChangeAction, elm$html$Html$Events$targetValue));
};
var author$project$Pages$EditorView$viewAddTagForm = function (model) {
	var initialTagList = function () {
		var _n0 = model.kl.tagList;
		if (_n0.$ === 'Just') {
			var tags = _n0.a;
			return tags;
		} else {
			return _List_Nil;
		}
	}();
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('srcFormBG')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('srcFormDiv')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('srcFormDivRow')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$select,
										_List_fromArray(
											[
												elm_community$html_extra$Html$Events$Extra$onChange(author$project$Devs$TypeObject$SetChoosenTag)
											]),
										A2(
											elm$core$List$append,
											_List_fromArray(
												[author$project$Pages$Utils$getSelectOption]),
											A2(
												elm$core$List$map,
												author$project$Pages$EditorTabs$Tab2$showTagOption(author$project$Devs$Objects$getEmptyTag),
												A2(
													elm$core$List$sortBy,
													function ($) {
														return $.name;
													},
													initialTagList))))
									]))
							])),
						A3(author$project$Pages$Utils$alert, author$project$Devs$TypeObject$CloseLoginAlert, model.subAlertMessage, model),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('editFormActionDiv')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$button,
								_List_fromArray(
									[
										elm$html$Html$Events$onClick(author$project$Devs$TypeObject$AddTagToRecipe)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('zuordnen')
									])),
								A2(
								elm$html$Html$button,
								_List_fromArray(
									[
										elm$html$Html$Events$onClick(author$project$Devs$TypeObject$CancelAddTag)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('abbrechen')
									]))
							]))
					]))
			]));
};
var author$project$Devs$TypeObject$ToggleEditForm = function (a) {
	return {$: 'ToggleEditForm', a: a};
};
var author$project$Devs$TypeObject$AddNewSource = {$: 'AddNewSource'};
var author$project$Devs$TypeObject$SetName = function (a) {
	return {$: 'SetName', a: a};
};
var author$project$Devs$TypeObject$SetNumber = function (a) {
	return {$: 'SetNumber', a: a};
};
var author$project$Devs$TypeObject$SetNumberComment = function (a) {
	return {$: 'SetNumberComment', a: a};
};
var author$project$Devs$TypeObject$SetSource = function (a) {
	return {$: 'SetSource', a: a};
};
var author$project$Devs$TypeObject$SetSourcePage = function (a) {
	return {$: 'SetSourcePage', a: a};
};
var author$project$Devs$TypeObject$SetTranslate = function (a) {
	return {$: 'SetTranslate', a: a};
};
var author$project$Devs$TypeObject$ImageSelected = {$: 'ImageSelected'};
var author$project$Devs$TypeObject$RemoveImageFromRecipe = {$: 'RemoveImageFromRecipe'};
var elm$html$Html$input = _VirtualDom_node('input');
var elm$html$Html$Attributes$accept = elm$html$Html$Attributes$stringProperty('accept');
var elm$html$Html$Attributes$disabled = elm$html$Html$Attributes$boolProperty('disabled');
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var author$project$Pages$EditorTabs$Tab1$getImageField = F2(
	function (model, rec) {
		var field = function () {
			var _n0 = rec.image;
			if (_n0.$ === 'Just') {
				var imgValue = _n0.a;
				return _List_fromArray(
					[
						A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$type_('text'),
								elm$html$Html$Attributes$id('image'),
								elm$html$Html$Attributes$value(imgValue),
								elm$html$Html$Attributes$disabled(true)
							]),
						_List_Nil),
						A2(
						elm$html$Html$button,
						_List_fromArray(
							[
								elm$html$Html$Events$onClick(author$project$Devs$TypeObject$RemoveImageFromRecipe)
							]),
						_List_fromArray(
							[
								elm$html$Html$text('-')
							]))
					]);
			} else {
				return _List_fromArray(
					[
						A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('fileUploadInput'),
								A2(
								elm$html$Html$Events$on,
								'change',
								elm$json$Json$Decode$succeed(author$project$Devs$TypeObject$ImageSelected)),
								elm$html$Html$Attributes$type_('file'),
								elm$html$Html$Attributes$id('recImage'),
								elm$html$Html$Attributes$accept('image/*')
							]),
						_List_Nil)
					]);
			}
		}();
		return field;
	});
var author$project$Pages$EditorTabs$Tab1$showSourceOption = F2(
	function (selectedValue, src) {
		var src_year = function () {
			var _n0 = src.year;
			if (_n0.$ === 'Just') {
				var year = _n0.a;
				return ' (' + (year + ')');
			} else {
				return '';
			}
		}();
		var selectedVal = _Utils_eq(src.uuid, selectedValue.uuid) ? true : false;
		return A2(
			elm$html$Html$option,
			_List_fromArray(
				[
					elm$html$Html$Attributes$value(src.uuid),
					elm$html$Html$Attributes$selected(selectedVal)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(
					_Utils_ap(src.name, src_year))
				]));
	});
var elm$html$Html$figure = _VirtualDom_node('figure');
var elm$html$Html$Attributes$title = elm$html$Html$Attributes$stringProperty('title');
var author$project$Pages$EditorTabs$Tab1$viewImagePreview = function (image) {
	if (image.$ === 'Just') {
		var img = image.a;
		return A2(
			elm$html$Html$figure,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$img,
					_List_fromArray(
						[
							elm$html$Html$Attributes$src(img.contents),
							elm$html$Html$Attributes$title(img.filename)
						]),
					_List_Nil)
				]));
	} else {
		return elm$html$Html$text('');
	}
};
var elm$html$Html$label = _VirtualDom_node('label');
var elm$html$Html$Attributes$autofocus = elm$html$Html$Attributes$boolProperty('autofocus');
var elm$html$Html$Attributes$for = elm$html$Html$Attributes$stringProperty('htmlFor');
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var author$project$Pages$EditorTabs$Tab1$showTab = function (model) {
	var mod_rec = function () {
		var _n8 = model.selectedRecipe;
		if (_n8.$ === 'Just') {
			var rec = _n8.a;
			return rec;
		} else {
			return author$project$Devs$Objects$getEmptyRecipe;
		}
	}();
	var numberCommentValue = function () {
		var _n7 = mod_rec.number_comment;
		if (_n7.$ === 'Just') {
			var val = _n7.a;
			return val;
		} else {
			return '';
		}
	}();
	var numberValue = function () {
		var _n6 = mod_rec.number;
		if (_n6.$ === 'Just') {
			var val = _n6.a;
			return elm$core$String$fromInt(val);
		} else {
			return '';
		}
	}();
	var sourcePageValue = function () {
		var _n5 = mod_rec.source_page;
		if (_n5.$ === 'Just') {
			var val = _n5.a;
			return elm$core$String$fromInt(val);
		} else {
			return '';
		}
	}();
	var sourceValue = function () {
		var _n4 = mod_rec.source;
		if (_n4.$ === 'Just') {
			var val = _n4.a;
			return val;
		} else {
			return author$project$Devs$Objects$getEmptySource;
		}
	}();
	var translateValue = function () {
		var _n3 = mod_rec.translate;
		if (_n3.$ === 'Just') {
			var val = _n3.a;
			return val;
		} else {
			return '';
		}
	}();
	var initialSrcList = function () {
		var _n2 = model.kl.sourceList;
		if (_n2.$ === 'Just') {
			var src = _n2.a;
			return src;
		} else {
			return _List_Nil;
		}
	}();
	var imgValue = function () {
		var _n1 = mod_rec.image;
		if (_n1.$ === 'Just') {
			var val = _n1.a;
			return val;
		} else {
			return '';
		}
	}();
	var idValue = function () {
		var _n0 = mod_rec.id;
		if (_n0.$ === 'Just') {
			var val = _n0.a;
			return elm$core$String$fromInt(val);
		} else {
			return '';
		}
	}();
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('showTabContent')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						A2(elm$html$Html$Attributes$style, 'float', 'left')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$label,
								_List_fromArray(
									[
										elm$html$Html$Attributes$for('id')
									]),
								_List_fromArray(
									[
										elm$html$Html$text('ID')
									])),
								A2(
								elm$html$Html$input,
								_List_fromArray(
									[
										elm$html$Html$Attributes$type_('text'),
										elm$html$Html$Attributes$id('id'),
										elm$html$Html$Attributes$value(idValue),
										elm$html$Html$Attributes$disabled(true)
									]),
								_List_Nil)
							])),
						A2(
						elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$label,
								_List_fromArray(
									[
										elm$html$Html$Attributes$for('name')
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Name *')
									])),
								A2(
								elm$html$Html$input,
								_List_fromArray(
									[
										elm$html$Html$Attributes$type_('text'),
										elm$html$Html$Attributes$autofocus(true),
										elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetName),
										elm$html$Html$Attributes$id('name'),
										elm$html$Html$Attributes$value(mod_rec.name)
									]),
								_List_Nil)
							])),
						A2(
						elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$label,
								_List_fromArray(
									[
										elm$html$Html$Attributes$for('translate')
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Übersetzung')
									])),
								A2(
								elm$html$Html$input,
								_List_fromArray(
									[
										elm$html$Html$Attributes$type_('text'),
										elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetTranslate),
										elm$html$Html$Attributes$id('translate'),
										elm$html$Html$Attributes$value(translateValue)
									]),
								_List_Nil)
							])),
						A2(
						elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$label,
								_List_fromArray(
									[
										elm$html$Html$Attributes$for('number')
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Portionen')
									])),
								A2(
								elm$html$Html$input,
								_List_fromArray(
									[
										elm$html$Html$Attributes$type_('number'),
										elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetNumber),
										elm$html$Html$Attributes$id('number'),
										elm$html$Html$Attributes$value(numberValue)
									]),
								_List_Nil)
							])),
						A2(
						elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$label,
								_List_fromArray(
									[
										elm$html$Html$Attributes$for('number_comment')
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Port.-Kom.')
									])),
								A2(
								elm$html$Html$input,
								_List_fromArray(
									[
										elm$html$Html$Attributes$type_('text'),
										elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetNumberComment),
										elm$html$Html$Attributes$id('number_comment'),
										elm$html$Html$Attributes$value(numberCommentValue)
									]),
								_List_Nil)
							])),
						A2(
						elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$label,
								_List_fromArray(
									[
										elm$html$Html$Attributes$for('source')
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Quelle *')
									])),
								A2(
								elm$html$Html$select,
								_List_fromArray(
									[
										elm$html$Html$Attributes$id('source'),
										elm_community$html_extra$Html$Events$Extra$onChange(author$project$Devs$TypeObject$SetSource)
									]),
								A2(
									elm$core$List$append,
									_List_fromArray(
										[author$project$Pages$Utils$getSelectOption]),
									A2(
										elm$core$List$map,
										author$project$Pages$EditorTabs$Tab1$showSourceOption(sourceValue),
										A2(
											elm$core$List$sortBy,
											function ($) {
												return $.name;
											},
											initialSrcList)))),
								A2(
								elm$html$Html$button,
								_List_fromArray(
									[
										elm$html$Html$Events$onClick(author$project$Devs$TypeObject$AddNewSource)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('+')
									]))
							])),
						A2(
						elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$label,
								_List_fromArray(
									[
										elm$html$Html$Attributes$for('source_page')
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Seitenangabe')
									])),
								A2(
								elm$html$Html$input,
								_List_fromArray(
									[
										elm$html$Html$Attributes$type_('number'),
										elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetSourcePage),
										elm$html$Html$Attributes$id('source_page'),
										elm$html$Html$Attributes$value(sourcePageValue)
									]),
								_List_Nil)
							])),
						A2(
						elm$html$Html$div,
						_List_Nil,
						A2(
							elm$core$List$append,
							_List_fromArray(
								[
									A2(
									elm$html$Html$label,
									_List_fromArray(
										[
											elm$html$Html$Attributes$for('image')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Bild')
										]))
								]),
							A2(author$project$Pages$EditorTabs$Tab1$getImageField, model, mod_rec)))
					])),
				author$project$Pages$EditorTabs$Tab1$viewImagePreview(model.recImage)
			]));
};
var author$project$Devs$TypeObject$ChooseNewTag = {$: 'ChooseNewTag'};
var author$project$Devs$TypeObject$RemoveTagFromRec = function (a) {
	return {$: 'RemoveTagFromRec', a: a};
};
var elm$html$Html$td = _VirtualDom_node('td');
var elm$html$Html$tr = _VirtualDom_node('tr');
var author$project$Pages$EditorTabs$Tab2$showTagDiv = F2(
	function (initialTagList, tag) {
		return A2(
			elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(tag.name + (' (' + (tag.tagType.name + ')')))
						])),
					A2(
					elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$button,
							_List_fromArray(
								[
									elm$html$Html$Events$onClick(
									author$project$Devs$TypeObject$RemoveTagFromRec(tag.uuid))
								]),
							_List_fromArray(
								[
									elm$html$Html$text('-')
								]))
						]))
				]));
	});
var elm$html$Html$table = _VirtualDom_node('table');
var author$project$Pages$EditorTabs$Tab2$showTab = function (model) {
	var recForEdit = function () {
		var _n1 = model.selectedRecipe;
		if (_n1.$ === 'Just') {
			var rec = _n1.a;
			return rec;
		} else {
			return author$project$Devs$Objects$getEmptyRecipe;
		}
	}();
	var initialTagList = function () {
		var _n0 = model.kl.tagList;
		if (_n0.$ === 'Just') {
			var tags = _n0.a;
			return tags;
		} else {
			return _List_Nil;
		}
	}();
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('showTabContent')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$table,
						_List_Nil,
						A2(
							elm$core$List$map,
							author$project$Pages$EditorTabs$Tab2$showTagDiv(initialTagList),
							A2(
								elm$core$List$sortBy,
								function ($) {
									return $.name;
								},
								recForEdit.tags)))
					])),
				A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$button,
						_List_fromArray(
							[
								elm$html$Html$Events$onClick(author$project$Devs$TypeObject$ChooseNewTag)
							]),
						_List_fromArray(
							[
								elm$html$Html$text('Tag hinzufügen')
							]))
					]))
			]));
};
var author$project$Devs$TypeObject$AddIngreToRecipe = {$: 'AddIngreToRecipe'};
var author$project$Pages$EditorTabs$Tab3$getLabelRow = A2(
	elm$html$Html$div,
	_List_fromArray(
		[
			elm$html$Html$Attributes$class('labelRow')
		]),
	_List_fromArray(
		[
			A2(
			elm$html$Html$label,
			_List_fromArray(
				[
					elm$html$Html$Attributes$for('order'),
					elm$html$Html$Attributes$class('orderLabel')
				]),
			_List_fromArray(
				[
					elm$html$Html$text('Order')
				])),
			A2(
			elm$html$Html$label,
			_List_fromArray(
				[
					elm$html$Html$Attributes$for('ingre'),
					elm$html$Html$Attributes$class('ingrLabel')
				]),
			_List_fromArray(
				[
					elm$html$Html$text('Zutat')
				])),
			A2(
			elm$html$Html$label,
			_List_fromArray(
				[
					elm$html$Html$Attributes$for('quant'),
					elm$html$Html$Attributes$class('quantLabel')
				]),
			_List_fromArray(
				[
					elm$html$Html$text('Menge')
				])),
			A2(
			elm$html$Html$label,
			_List_fromArray(
				[
					elm$html$Html$Attributes$for('unit'),
					elm$html$Html$Attributes$class('unitLabel')
				]),
			_List_fromArray(
				[
					elm$html$Html$text('Einheit')
				])),
			A2(
			elm$html$Html$label,
			_List_fromArray(
				[
					elm$html$Html$Attributes$for('comment'),
					elm$html$Html$Attributes$class('ingrLabel')
				]),
			_List_fromArray(
				[
					elm$html$Html$text('Kommentar')
				])),
			A2(
			elm$html$Html$label,
			_List_fromArray(
				[
					elm$html$Html$Attributes$for('part'),
					elm$html$Html$Attributes$class('partLabel')
				]),
			_List_fromArray(
				[
					elm$html$Html$text('Teil')
				]))
		]));
var author$project$Devs$Objects$getEmptyUnit = {
	id: 0,
	name: '',
	unitCategory: {
		id: 0,
		name: '',
		uuid: TSFoster$elm_uuid$UUID$toString(TSFoster$elm_uuid$UUID$nil)
	},
	uuid: TSFoster$elm_uuid$UUID$toString(TSFoster$elm_uuid$UUID$nil)
};
var author$project$Devs$TypeObject$RemoveIngreFromRecipe = function (a) {
	return {$: 'RemoveIngreFromRecipe', a: a};
};
var author$project$Devs$TypeObject$SetIngreComment = F2(
	function (a, b) {
		return {$: 'SetIngreComment', a: a, b: b};
	});
var author$project$Devs$TypeObject$SetIngreName = F2(
	function (a, b) {
		return {$: 'SetIngreName', a: a, b: b};
	});
var author$project$Devs$TypeObject$SetIngreOrder = F2(
	function (a, b) {
		return {$: 'SetIngreOrder', a: a, b: b};
	});
var author$project$Devs$TypeObject$SetIngrePart = F2(
	function (a, b) {
		return {$: 'SetIngrePart', a: a, b: b};
	});
var author$project$Devs$TypeObject$SetIngreQuant = F2(
	function (a, b) {
		return {$: 'SetIngreQuant', a: a, b: b};
	});
var author$project$Devs$TypeObject$SetIngreUnit = F2(
	function (a, b) {
		return {$: 'SetIngreUnit', a: a, b: b};
	});
var author$project$Pages$EditorTabs$Tab3$showPartOption = F2(
	function (partListValue, part) {
		var selectedVal = _Utils_eq(partListValue.uuid, part.uuid) ? true : false;
		return A2(
			elm$html$Html$option,
			_List_fromArray(
				[
					elm$html$Html$Attributes$value(part.uuid),
					elm$html$Html$Attributes$selected(selectedVal)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(part.name)
				]));
	});
var author$project$Pages$EditorTabs$Tab3$showUnitOption = F2(
	function (unitListValue, unit) {
		var selectedVal = _Utils_eq(unitListValue.uuid, unit.uuid) ? true : false;
		return A2(
			elm$html$Html$option,
			_List_fromArray(
				[
					elm$html$Html$Attributes$value(unit.uuid),
					elm$html$Html$Attributes$selected(selectedVal)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(unit.name + (' (' + (unit.unitCategory.name + ')')))
				]));
	});
var elm$core$String$fromFloat = _String_fromNumber;
var elm$html$Html$Attributes$step = function (n) {
	return A2(elm$html$Html$Attributes$stringProperty, 'step', n);
};
var author$project$Pages$EditorTabs$Tab3$showIngreList = F3(
	function (unitList, partList, ingre) {
		var unit = function () {
			var _n3 = ingre.unit;
			if (_n3.$ === 'Just') {
				var unitTmp = _n3.a;
				return unitTmp;
			} else {
				return author$project$Devs$Objects$getEmptyUnit;
			}
		}();
		var quant = function () {
			var _n2 = ingre.quantity;
			if (_n2.$ === 'Just') {
				var quantTmp = _n2.a;
				return elm$core$String$fromFloat(quantTmp);
			} else {
				return '';
			}
		}();
		var part = function () {
			var _n1 = ingre.part;
			if (_n1.$ === 'Just') {
				var partTmp = _n1.a;
				return partTmp;
			} else {
				return author$project$Devs$Objects$getEmptyPart;
			}
		}();
		var commentVal = function () {
			var _n0 = ingre.comment;
			if (_n0.$ === 'Just') {
				var val = _n0.a;
				return val;
			} else {
				return '';
			}
		}();
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('ingreRow')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$input,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id('order'),
							elm$html$Html$Events$onInput(
							author$project$Devs$TypeObject$SetIngreOrder(ingre.uuid)),
							elm$html$Html$Attributes$type_('number'),
							elm$html$Html$Attributes$class('orderInput'),
							elm$html$Html$Attributes$value(
							elm$core$String$fromInt(ingre.sortorder))
						]),
					_List_Nil),
					A2(
					elm$html$Html$input,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id('ingre'),
							elm$html$Html$Events$onInput(
							author$project$Devs$TypeObject$SetIngreName(ingre.uuid)),
							elm$html$Html$Attributes$class('ingrInput'),
							elm$html$Html$Attributes$value(ingre.name)
						]),
					_List_Nil),
					A2(
					elm$html$Html$input,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id('quant'),
							elm$html$Html$Events$onInput(
							author$project$Devs$TypeObject$SetIngreQuant(ingre.uuid)),
							elm$html$Html$Attributes$type_('number'),
							elm$html$Html$Attributes$step('0.1'),
							elm$html$Html$Attributes$class('quantInput'),
							elm$html$Html$Attributes$value(quant)
						]),
					_List_Nil),
					A2(
					elm$html$Html$select,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id('unit'),
							elm_community$html_extra$Html$Events$Extra$onChange(
							author$project$Devs$TypeObject$SetIngreUnit(ingre.uuid))
						]),
					A2(
						elm$core$List$append,
						_List_fromArray(
							[author$project$Pages$Utils$getSelectOption]),
						A2(
							elm$core$List$map,
							author$project$Pages$EditorTabs$Tab3$showUnitOption(unit),
							unitList))),
					A2(
					elm$html$Html$input,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id('comment'),
							elm$html$Html$Events$onInput(
							author$project$Devs$TypeObject$SetIngreComment(ingre.uuid)),
							elm$html$Html$Attributes$class('ingrInput'),
							elm$html$Html$Attributes$value(commentVal)
						]),
					_List_Nil),
					A2(
					elm$html$Html$select,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id('part'),
							elm_community$html_extra$Html$Events$Extra$onChange(
							author$project$Devs$TypeObject$SetIngrePart(ingre.uuid))
						]),
					A2(
						elm$core$List$append,
						_List_fromArray(
							[author$project$Pages$Utils$getSelectOption]),
						A2(
							elm$core$List$map,
							author$project$Pages$EditorTabs$Tab3$showPartOption(part),
							partList))),
					A2(
					elm$html$Html$button,
					_List_fromArray(
						[
							elm$html$Html$Events$onClick(
							author$project$Devs$TypeObject$RemoveIngreFromRecipe(ingre.uuid))
						]),
					_List_fromArray(
						[
							elm$html$Html$text('-')
						]))
				]));
	});
var author$project$Pages$EditorTabs$Tab3$showTab = function (model) {
	var recForEdit = function () {
		var _n2 = model.selectedRecipe;
		if (_n2.$ === 'Just') {
			var rec = _n2.a;
			return rec;
		} else {
			return author$project$Devs$Objects$getEmptyRecipe;
		}
	}();
	var initialUnitList = function () {
		var _n1 = model.kl.unitList;
		if (_n1.$ === 'Just') {
			var src = _n1.a;
			return src;
		} else {
			return _List_Nil;
		}
	}();
	var initialPartList = function () {
		var _n0 = model.kl.partList;
		if (_n0.$ === 'Just') {
			var src = _n0.a;
			return src;
		} else {
			return _List_Nil;
		}
	}();
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('showTabContent')
			]),
		elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[author$project$Pages$EditorTabs$Tab3$getLabelRow]),
					A2(
					elm$core$List$map,
					A2(author$project$Pages$EditorTabs$Tab3$showIngreList, initialUnitList, initialPartList),
					A2(
						elm$core$List$sortBy,
						function ($) {
							return $.sortorder;
						},
						recForEdit.ingredients)),
					_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$button,
								_List_fromArray(
									[
										elm$html$Html$Events$onClick(author$project$Devs$TypeObject$AddIngreToRecipe)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Zutat hinzufügen')
									]))
							]))
					])
				])));
};
var author$project$Devs$TypeObject$AddTodoToRecipe = {$: 'AddTodoToRecipe'};
var author$project$Pages$EditorTabs$Tab4$getLabelRow = A2(
	elm$html$Html$div,
	_List_fromArray(
		[
			elm$html$Html$Attributes$class('labelRow')
		]),
	_List_fromArray(
		[
			A2(
			elm$html$Html$label,
			_List_fromArray(
				[
					elm$html$Html$Attributes$for('number'),
					elm$html$Html$Attributes$class('numberLabel')
				]),
			_List_fromArray(
				[
					elm$html$Html$text('Nummer')
				])),
			A2(
			elm$html$Html$label,
			_List_fromArray(
				[
					elm$html$Html$Attributes$for('text'),
					elm$html$Html$Attributes$class('textLabel')
				]),
			_List_fromArray(
				[
					elm$html$Html$text('Text')
				])),
			A2(
			elm$html$Html$label,
			_List_fromArray(
				[
					elm$html$Html$Attributes$for('image'),
					elm$html$Html$Attributes$class('imageLabel')
				]),
			_List_fromArray(
				[
					elm$html$Html$text('Bild')
				])),
			A2(
			elm$html$Html$label,
			_List_fromArray(
				[
					elm$html$Html$Attributes$for('comment'),
					elm$html$Html$Attributes$class('imageLabel')
				]),
			_List_fromArray(
				[
					elm$html$Html$text('Kommentar')
				]))
		]));
var author$project$Devs$TypeObject$RemoveTodoFromRecipe = function (a) {
	return {$: 'RemoveTodoFromRecipe', a: a};
};
var author$project$Devs$TypeObject$SetTodoImg = F2(
	function (a, b) {
		return {$: 'SetTodoImg', a: a, b: b};
	});
var author$project$Devs$TypeObject$SetTodoImgComment = F2(
	function (a, b) {
		return {$: 'SetTodoImgComment', a: a, b: b};
	});
var author$project$Devs$TypeObject$SetTodoNr = F2(
	function (a, b) {
		return {$: 'SetTodoNr', a: a, b: b};
	});
var author$project$Devs$TypeObject$SetTodoText = F2(
	function (a, b) {
		return {$: 'SetTodoText', a: a, b: b};
	});
var elm$html$Html$textarea = _VirtualDom_node('textarea');
var elm$html$Html$Attributes$cols = function (n) {
	return A2(
		_VirtualDom_attribute,
		'cols',
		elm$core$String$fromInt(n));
};
var elm$html$Html$Attributes$rows = function (n) {
	return A2(
		_VirtualDom_attribute,
		'rows',
		elm$core$String$fromInt(n));
};
var author$project$Pages$EditorTabs$Tab4$showTodoList = function (todo) {
	var imgValue = function () {
		var _n1 = todo.image;
		if (_n1.$ === 'Just') {
			var val = _n1.a;
			return val;
		} else {
			return '';
		}
	}();
	var commentValue = function () {
		var _n0 = todo.image_comment;
		if (_n0.$ === 'Just') {
			var val = _n0.a;
			return val;
		} else {
			return '';
		}
	}();
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('todoRow')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$input,
				_List_fromArray(
					[
						elm$html$Html$Attributes$id('number'),
						elm$html$Html$Events$onInput(
						author$project$Devs$TypeObject$SetTodoNr(todo.uuid)),
						elm$html$Html$Attributes$type_('number'),
						elm$html$Html$Attributes$class('numberInput'),
						elm$html$Html$Attributes$value(
						elm$core$String$fromInt(todo.number))
					]),
				_List_Nil),
				A2(
				elm$html$Html$textarea,
				_List_fromArray(
					[
						elm$html$Html$Attributes$id('text'),
						elm$html$Html$Events$onInput(
						author$project$Devs$TypeObject$SetTodoText(todo.uuid)),
						elm$html$Html$Attributes$class('textInput'),
						elm$html$Html$Attributes$cols(50),
						elm$html$Html$Attributes$rows(4)
					]),
				_List_fromArray(
					[
						elm$html$Html$text(todo.text)
					])),
				A2(
				elm$html$Html$input,
				_List_fromArray(
					[
						elm$html$Html$Attributes$id('image'),
						elm$html$Html$Events$onInput(
						author$project$Devs$TypeObject$SetTodoImg(todo.uuid)),
						elm$html$Html$Attributes$type_('text'),
						elm$html$Html$Attributes$class('imageInput'),
						elm$html$Html$Attributes$value(imgValue)
					]),
				_List_Nil),
				A2(
				elm$html$Html$input,
				_List_fromArray(
					[
						elm$html$Html$Attributes$id('comment'),
						elm$html$Html$Events$onInput(
						author$project$Devs$TypeObject$SetTodoImgComment(todo.uuid)),
						elm$html$Html$Attributes$type_('text'),
						elm$html$Html$Attributes$class('imageInput'),
						elm$html$Html$Attributes$value(commentValue)
					]),
				_List_Nil),
				A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Events$onClick(
						author$project$Devs$TypeObject$RemoveTodoFromRecipe(todo.uuid))
					]),
				_List_fromArray(
					[
						elm$html$Html$text('-')
					]))
			]));
};
var author$project$Pages$EditorTabs$Tab4$showTab = function (model) {
	var recForEdit = function () {
		var _n0 = model.selectedRecipe;
		if (_n0.$ === 'Just') {
			var rec = _n0.a;
			return rec;
		} else {
			return author$project$Devs$Objects$getEmptyRecipe;
		}
	}();
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('showTabContent')
			]),
		elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[author$project$Pages$EditorTabs$Tab4$getLabelRow]),
					A2(
					elm$core$List$map,
					author$project$Pages$EditorTabs$Tab4$showTodoList,
					A2(
						elm$core$List$sortBy,
						function ($) {
							return $.number;
						},
						recForEdit.todos)),
					_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$button,
								_List_fromArray(
									[
										elm$html$Html$Events$onClick(author$project$Devs$TypeObject$AddTodoToRecipe)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Anweisung hinzufügen')
									]))
							]))
					])
				])));
};
var author$project$Devs$TypeObject$SetCarbo = function (a) {
	return {$: 'SetCarbo', a: a};
};
var author$project$Devs$TypeObject$SetEnergy = function (a) {
	return {$: 'SetEnergy', a: a};
};
var author$project$Devs$TypeObject$SetFat = function (a) {
	return {$: 'SetFat', a: a};
};
var author$project$Devs$TypeObject$SetProt = function (a) {
	return {$: 'SetProt', a: a};
};
var author$project$Devs$TypeObject$SetSize = function (a) {
	return {$: 'SetSize', a: a};
};
var author$project$Pages$EditorTabs$Tab5$showTab = function (model) {
	var recForEdit = function () {
		var _n5 = model.selectedRecipe;
		if (_n5.$ === 'Just') {
			var rec = _n5.a;
			return rec;
		} else {
			return author$project$Devs$Objects$getEmptyRecipe;
		}
	}();
	var sizeValue = function () {
		var _n4 = recForEdit.nv_size;
		if (_n4.$ === 'Just') {
			var val = _n4.a;
			return elm$core$String$fromInt(val);
		} else {
			return '';
		}
	}();
	var protValue = function () {
		var _n3 = recForEdit.nv_protein;
		if (_n3.$ === 'Just') {
			var val = _n3.a;
			return elm$core$String$fromFloat(val);
		} else {
			return '';
		}
	}();
	var fatValue = function () {
		var _n2 = recForEdit.nv_fat;
		if (_n2.$ === 'Just') {
			var val = _n2.a;
			return elm$core$String$fromFloat(val);
		} else {
			return '';
		}
	}();
	var energyValue = function () {
		var _n1 = recForEdit.nv_energy;
		if (_n1.$ === 'Just') {
			var val = _n1.a;
			return elm$core$String$fromFloat(val);
		} else {
			return '';
		}
	}();
	var carboValue = function () {
		var _n0 = recForEdit.nv_carbohydrates;
		if (_n0.$ === 'Just') {
			var val = _n0.a;
			return elm$core$String$fromFloat(val);
		} else {
			return '';
		}
	}();
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('showTabContent')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$label,
						_List_fromArray(
							[
								elm$html$Html$Attributes$for('size')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('Portionsgröße')
							])),
						A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$type_('number'),
								elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetSize),
								elm$html$Html$Attributes$id('size'),
								elm$html$Html$Attributes$value(sizeValue)
							]),
						_List_Nil)
					])),
				A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$label,
						_List_fromArray(
							[
								elm$html$Html$Attributes$for('carbo')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('Kohlenhydrate')
							])),
						A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$type_('number'),
								elm$html$Html$Attributes$step('0.1'),
								elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetCarbo),
								elm$html$Html$Attributes$id('carbo'),
								elm$html$Html$Attributes$value(carboValue)
							]),
						_List_Nil)
					])),
				A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$label,
						_List_fromArray(
							[
								elm$html$Html$Attributes$for('energy')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('Brennwert')
							])),
						A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$type_('number'),
								elm$html$Html$Attributes$step('0.1'),
								elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetEnergy),
								elm$html$Html$Attributes$id('energy'),
								elm$html$Html$Attributes$value(energyValue)
							]),
						_List_Nil)
					])),
				A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$label,
						_List_fromArray(
							[
								elm$html$Html$Attributes$for('fat')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('Fett')
							])),
						A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$type_('number'),
								elm$html$Html$Attributes$step('0.1'),
								elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetFat),
								elm$html$Html$Attributes$id('fat'),
								elm$html$Html$Attributes$value(fatValue)
							]),
						_List_Nil)
					])),
				A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$label,
						_List_fromArray(
							[
								elm$html$Html$Attributes$for('prot')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('Eiweiß')
							])),
						A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$type_('number'),
								elm$html$Html$Attributes$step('0.1'),
								elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetProt),
								elm$html$Html$Attributes$id('prot'),
								elm$html$Html$Attributes$value(protValue)
							]),
						_List_Nil)
					]))
			]));
};
var author$project$Pages$EditorView$viewEditForm = function (model) {
	var recipeForEdit = function () {
		var _n2 = model.selectedRecipe;
		if (_n2.$ === 'Just') {
			var rec = _n2.a;
			return rec;
		} else {
			return author$project$Devs$Objects$getEmptyRecipe;
		}
	}();
	var editForm = function () {
		var _n1 = model.showEditForm;
		if (_n1.$ === 'Just') {
			var ef = _n1.a;
			return ef;
		} else {
			return author$project$Devs$Objects$None;
		}
	}();
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('editFormBG')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('editFormDiv')
					]),
				_List_fromArray(
					[
						function () {
						switch (editForm.$) {
							case 'BasicForm':
								return author$project$Pages$EditorTabs$Tab1$showTab(model);
							case 'TagForm':
								return author$project$Pages$EditorTabs$Tab2$showTab(model);
							case 'IngredientForm':
								return author$project$Pages$EditorTabs$Tab3$showTab(model);
							case 'TodoForm':
								return author$project$Pages$EditorTabs$Tab4$showTab(model);
							case 'FootValueForm':
								return author$project$Pages$EditorTabs$Tab5$showTab(model);
							default:
								return elm$html$Html$text('');
						}
					}(),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('editFormActionDiv')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$button,
								_List_fromArray(
									[
										elm$html$Html$Events$onClick(
										author$project$Devs$TypeObject$ToggleEditForm(author$project$Devs$Objects$None))
									]),
								_List_fromArray(
									[
										elm$html$Html$text('schließen')
									]))
							]))
					]))
			]));
};
var author$project$Devs$TypeObject$CancelSourceEdit = {$: 'CancelSourceEdit'};
var author$project$Devs$TypeObject$SaveNewSource = {$: 'SaveNewSource'};
var author$project$Devs$TypeObject$SetSrcIsbn = function (a) {
	return {$: 'SetSrcIsbn', a: a};
};
var author$project$Devs$TypeObject$SetSrcName = function (a) {
	return {$: 'SetSrcName', a: a};
};
var author$project$Devs$TypeObject$SetSrcYear = function (a) {
	return {$: 'SetSrcYear', a: a};
};
var author$project$Pages$EditorView$viewSourceForm = function (model) {
	var newSrc = function () {
		var _n2 = model.newSource;
		if (_n2.$ === 'Just') {
			var src = _n2.a;
			return src;
		} else {
			return author$project$Devs$Objects$getEmptySource;
		}
	}();
	var yearValue = function () {
		var _n1 = newSrc.year;
		if (_n1.$ === 'Just') {
			var val = _n1.a;
			return val;
		} else {
			return '';
		}
	}();
	var isbnValue = function () {
		var _n0 = newSrc.isbn;
		if (_n0.$ === 'Just') {
			var val = _n0.a;
			return val;
		} else {
			return '';
		}
	}();
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('srcFormBG')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('srcFormDiv')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('srcFormDivRow')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$label,
										_List_fromArray(
											[
												elm$html$Html$Attributes$for('name')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Name *')
											])),
										A2(
										elm$html$Html$input,
										_List_fromArray(
											[
												elm$html$Html$Attributes$type_('text'),
												elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetSrcName),
												elm$html$Html$Attributes$id('name'),
												elm$html$Html$Attributes$value(newSrc.name)
											]),
										_List_Nil)
									])),
								A2(
								elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$label,
										_List_fromArray(
											[
												elm$html$Html$Attributes$for('isbn')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('ISBN')
											])),
										A2(
										elm$html$Html$input,
										_List_fromArray(
											[
												elm$html$Html$Attributes$type_('text'),
												elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetSrcIsbn),
												elm$html$Html$Attributes$id('isbn'),
												elm$html$Html$Attributes$value(isbnValue)
											]),
										_List_Nil)
									])),
								A2(
								elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$label,
										_List_fromArray(
											[
												elm$html$Html$Attributes$for('year')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Jahr')
											])),
										A2(
										elm$html$Html$input,
										_List_fromArray(
											[
												elm$html$Html$Attributes$type_('text'),
												elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetSrcYear),
												elm$html$Html$Attributes$id('year'),
												elm$html$Html$Attributes$value(yearValue)
											]),
										_List_Nil)
									]))
							])),
						A3(author$project$Pages$Utils$alert, author$project$Devs$TypeObject$CloseLoginAlert, model.subAlertMessage, model),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('editFormActionDiv')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$button,
								_List_fromArray(
									[
										elm$html$Html$Events$onClick(author$project$Devs$TypeObject$SaveNewSource)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('speichern')
									])),
								A2(
								elm$html$Html$button,
								_List_fromArray(
									[
										elm$html$Html$Events$onClick(author$project$Devs$TypeObject$CancelSourceEdit)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('abbrechen')
									]))
							]))
					]))
			]));
};
var author$project$Devs$TypeObject$CancelLogin = {$: 'CancelLogin'};
var author$project$Devs$TypeObject$Login = {$: 'Login'};
var author$project$Devs$TypeObject$SetPasswortForCheck = function (a) {
	return {$: 'SetPasswortForCheck', a: a};
};
var author$project$Devs$TypeObject$SetUsernameForCheck = function (a) {
	return {$: 'SetUsernameForCheck', a: a};
};
var elm$html$Html$Events$keyCode = A2(elm$json$Json$Decode$field, 'keyCode', elm$json$Json$Decode$int);
var elm$json$Json$Decode$fail = _Json_fail;
var author$project$Pages$Utils$onEnter = function (msg) {
	var isEnter = function (code) {
		return (code === 13) ? elm$json$Json$Decode$succeed(msg) : elm$json$Json$Decode$fail('not ENTER');
	};
	return A2(
		elm$html$Html$Events$on,
		'keydown',
		A2(elm$json$Json$Decode$andThen, isEnter, elm$html$Html$Events$keyCode));
};
var author$project$Pages$LoginView$getLoginForm = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('editFormBG')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('editFormDiv')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$label,
								_List_fromArray(
									[
										elm$html$Html$Attributes$for('username')
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Benutzername')
									])),
								A2(
								elm$html$Html$input,
								_List_fromArray(
									[
										elm$html$Html$Attributes$id('username'),
										elm$html$Html$Attributes$type_('text'),
										elm$html$Html$Attributes$autofocus(true),
										elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetUsernameForCheck),
										author$project$Pages$Utils$onEnter(author$project$Devs$TypeObject$Login)
									]),
								_List_Nil)
							])),
						A2(
						elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$label,
								_List_fromArray(
									[
										elm$html$Html$Attributes$for('password')
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Passwort')
									])),
								A2(
								elm$html$Html$input,
								_List_fromArray(
									[
										elm$html$Html$Attributes$id('password'),
										elm$html$Html$Attributes$type_('password'),
										elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetPasswortForCheck),
										author$project$Pages$Utils$onEnter(author$project$Devs$TypeObject$Login)
									]),
								_List_Nil)
							])),
						A3(author$project$Pages$Utils$alert, author$project$Devs$TypeObject$CloseLoginAlert, model.subAlertMessage, model),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('editFormActionDiv')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$button,
								_List_fromArray(
									[
										elm$html$Html$Events$onClick(author$project$Devs$TypeObject$Login)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('login')
									])),
								A2(
								elm$html$Html$button,
								_List_fromArray(
									[
										elm$html$Html$Events$onClick(author$project$Devs$TypeObject$CancelLogin)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('abbrechen')
									]))
							]))
					]))
			]));
};
var author$project$Devs$TypeObject$RemoveSelectedTag = {$: 'RemoveSelectedTag'};
var author$project$Devs$TypeObject$ShowRecipe = function (a) {
	return {$: 'ShowRecipe', a: a};
};
var author$project$Pages$RecipeListView$showRecipeView = function (rec) {
	return A2(
		elm$html$Html$button,
		_List_fromArray(
			[
				elm$html$Html$Attributes$id(
				elm$core$String$fromInt(rec.id)),
				elm$html$Html$Attributes$class('tagLink'),
				elm$html$Html$Events$onClick(
				author$project$Devs$TypeObject$ShowRecipe(
					elm$core$Maybe$Just(rec)))
			]),
		_List_fromArray(
			[
				elm$html$Html$text(rec.name)
			]));
};
var elm$html$Html$h3 = _VirtualDom_node('h3');
var author$project$Pages$RecipeListView$showRecipeList = F2(
	function (recipeList, divHeader) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id('contentDiv'),
					elm$html$Html$Attributes$class('cf')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$button,
							_List_fromArray(
								[
									elm$html$Html$Events$onClick(author$project$Devs$TypeObject$RemoveSelectedTag)
								]),
							_List_fromArray(
								[
									elm$html$Html$text('zur Startseite')
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id('categoryTypeDiv'),
							A2(elm$html$Html$Attributes$style, 'width', '99%')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$h3,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(divHeader)
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$id('categoryDiv')
								]),
							A2(elm$core$List$map, author$project$Pages$RecipeListView$showRecipeView, recipeList))
						]))
				]));
	});
var author$project$Pages$RecipeListView$viewRecipesOfTag = function (model) {
	var selectedTagName = function () {
		var _n1 = model.selectedTag;
		if (_n1.$ === 'Just') {
			var tag = _n1.a;
			return tag.name;
		} else {
			return 'Rezepte mit \'' + (elm$core$String$trim(model.searchValue) + '\'');
		}
	}();
	var recipeList = function () {
		var _n0 = model.recipesOfSelectedTag;
		if (_n0.$ === 'Just') {
			var recList = _n0.a;
			return recList;
		} else {
			return _List_Nil;
		}
	}();
	return A2(author$project$Pages$RecipeListView$showRecipeList, recipeList, selectedTagName);
};
var author$project$Devs$Objects$BasicForm = {$: 'BasicForm'};
var author$project$Devs$Objects$IngredientForm = {$: 'IngredientForm'};
var author$project$Devs$Objects$TagForm = {$: 'TagForm'};
var author$project$Devs$Objects$TodoForm = {$: 'TodoForm'};
var author$project$Devs$TypeObject$ConfirmDelete = {$: 'ConfirmDelete'};
var author$project$Devs$TypeObject$EditRecipe = {$: 'EditRecipe'};
var author$project$Devs$TypeObject$NoOp = {$: 'NoOp'};
var author$project$Devs$TypeObject$RemoveSelectedRecipe = {$: 'RemoveSelectedRecipe'};
var author$project$Devs$TypeObject$SaveRecipe = {$: 'SaveRecipe'};
var author$project$Devs$TypeObject$SetNumberForDisplay = function (a) {
	return {$: 'SetNumberForDisplay', a: a};
};
var author$project$Devs$Utils$isLoggedIn = function (loginToken) {
	if (loginToken.$ === 'Just') {
		var log = loginToken.a;
		return (elm$core$String$length(log) > 0) ? true : false;
	} else {
		return false;
	}
};
var author$project$Pages$RecipeView$getTagName = function (tag) {
	return tag.name + (' (' + (tag.tagType.name + ')'));
};
var cuducos$elm_format_number$FormatNumber$Parser$FormattedNumber = F5(
	function (original, integers, decimals, prefix, suffix) {
		return {decimals: decimals, integers: integers, original: original, prefix: prefix, suffix: suffix};
	});
var cuducos$elm_format_number$FormatNumber$Parser$Negative = {$: 'Negative'};
var cuducos$elm_format_number$FormatNumber$Parser$Positive = {$: 'Positive'};
var cuducos$elm_format_number$FormatNumber$Parser$Zero = {$: 'Zero'};
var elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var cuducos$elm_format_number$FormatNumber$Parser$classify = function (formatted) {
	var onlyZeros = A2(
		elm$core$String$all,
		function (_char) {
			return _Utils_eq(
				_char,
				_Utils_chr('0'));
		},
		elm$core$String$concat(
			A2(
				elm$core$List$append,
				formatted.integers,
				elm$core$List$singleton(formatted.decimals))));
	return onlyZeros ? cuducos$elm_format_number$FormatNumber$Parser$Zero : ((formatted.original < 0) ? cuducos$elm_format_number$FormatNumber$Parser$Negative : cuducos$elm_format_number$FormatNumber$Parser$Positive);
};
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var cuducos$elm_format_number$FormatNumber$Parser$addZerosToFit = F2(
	function (desiredLength, value) {
		var length = elm$core$String$length(value);
		var missing = (_Utils_cmp(length, desiredLength) < 0) ? elm$core$Basics$abs(desiredLength - length) : 0;
		return _Utils_ap(
			value,
			A2(elm$core$String$repeat, missing, '0'));
	});
var elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3(elm$core$String$slice, 0, -n, string);
	});
var elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			elm$core$String$slice,
			-n,
			elm$core$String$length(string),
			string);
	});
var cuducos$elm_format_number$FormatNumber$Parser$removeZeros = function (decimals) {
	return (A2(elm$core$String$right, 1, decimals) !== '0') ? decimals : cuducos$elm_format_number$FormatNumber$Parser$removeZeros(
		A2(elm$core$String$dropRight, 1, decimals));
};
var cuducos$elm_format_number$FormatNumber$Parser$getDecimals = F2(
	function (locale, digits) {
		var _n0 = locale.decimals;
		switch (_n0.$) {
			case 'Max':
				return cuducos$elm_format_number$FormatNumber$Parser$removeZeros(digits);
			case 'Exact':
				return digits;
			default:
				var min = _n0.a;
				return A2(cuducos$elm_format_number$FormatNumber$Parser$addZerosToFit, min, digits);
		}
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(xs);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Basics$not = _Basics_not;
var elm$core$Basics$isInfinite = _Basics_isInfinite;
var elm$core$Basics$isNaN = _Basics_isNaN;
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				elm$core$String$repeat,
				n - elm$core$String$length(string),
				elm$core$String$fromChar(_char)));
	});
var elm$core$String$reverse = _String_reverse;
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var myrho$elm_round$Round$addSign = F2(
	function (signed, str) {
		var isNotZero = A2(
			elm$core$List$any,
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr('0'))) && (!_Utils_eq(
					c,
					_Utils_chr('.')));
			},
			elm$core$String$toList(str));
		return _Utils_ap(
			(signed && isNotZero) ? '-' : '',
			str);
	});
var elm$core$Char$fromCode = _Char_fromCode;
var myrho$elm_round$Round$increaseNum = function (_n0) {
	var head = _n0.a;
	var tail = _n0.b;
	if (_Utils_eq(
		head,
		_Utils_chr('9'))) {
		var _n1 = elm$core$String$uncons(tail);
		if (_n1.$ === 'Nothing') {
			return '01';
		} else {
			var headtail = _n1.a;
			return A2(
				elm$core$String$cons,
				_Utils_chr('0'),
				myrho$elm_round$Round$increaseNum(headtail));
		}
	} else {
		var c = elm$core$Char$toCode(head);
		return ((c >= 48) && (c < 57)) ? A2(
			elm$core$String$cons,
			elm$core$Char$fromCode(c + 1),
			tail) : '0';
	}
};
var myrho$elm_round$Round$splitComma = function (str) {
	var _n0 = A2(elm$core$String$split, '.', str);
	if (_n0.b) {
		if (_n0.b.b) {
			var before = _n0.a;
			var _n1 = _n0.b;
			var after = _n1.a;
			return _Utils_Tuple2(before, after);
		} else {
			var before = _n0.a;
			return _Utils_Tuple2(before, '0');
		}
	} else {
		return _Utils_Tuple2('0', '0');
	}
};
var elm$core$String$startsWith = _String_startsWith;
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var myrho$elm_round$Round$toDecimal = function (fl) {
	var _n0 = A2(
		elm$core$String$split,
		'e',
		elm$core$String$fromFloat(
			elm$core$Basics$abs(fl)));
	if (_n0.b) {
		if (_n0.b.b) {
			var num = _n0.a;
			var _n1 = _n0.b;
			var exp = _n1.a;
			var e = A2(
				elm$core$Maybe$withDefault,
				0,
				elm$core$String$toInt(
					A2(elm$core$String$startsWith, '+', exp) ? A2(elm$core$String$dropLeft, 1, exp) : exp));
			var _n2 = myrho$elm_round$Round$splitComma(num);
			var before = _n2.a;
			var after = _n2.b;
			var total = _Utils_ap(before, after);
			var zeroed = (e < 0) ? A2(
				elm$core$Maybe$withDefault,
				'0',
				A2(
					elm$core$Maybe$map,
					function (_n3) {
						var a = _n3.a;
						var b = _n3.b;
						return a + ('.' + b);
					},
					A2(
						elm$core$Maybe$map,
						elm$core$Tuple$mapFirst(elm$core$String$fromChar),
						elm$core$String$uncons(
							_Utils_ap(
								A2(
									elm$core$String$repeat,
									elm$core$Basics$abs(e),
									'0'),
								total))))) : A3(
				elm$core$String$padRight,
				e + 1,
				_Utils_chr('0'),
				total);
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				zeroed);
		} else {
			var num = _n0.a;
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				num);
		}
	} else {
		return '';
	}
};
var myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if (elm$core$Basics$isInfinite(fl) || elm$core$Basics$isNaN(fl)) {
			return elm$core$String$fromFloat(fl);
		} else {
			var signed = fl < 0;
			var _n0 = myrho$elm_round$Round$splitComma(
				myrho$elm_round$Round$toDecimal(
					elm$core$Basics$abs(fl)));
			var before = _n0.a;
			var after = _n0.b;
			var r = elm$core$String$length(before) + s;
			var normalized = _Utils_ap(
				A2(elm$core$String$repeat, (-r) + 1, '0'),
				A3(
					elm$core$String$padRight,
					r,
					_Utils_chr('0'),
					_Utils_ap(before, after)));
			var totalLen = elm$core$String$length(normalized);
			var roundDigitIndex = A2(elm$core$Basics$max, 1, r);
			var increase = A2(
				functor,
				signed,
				A3(elm$core$String$slice, roundDigitIndex, totalLen, normalized));
			var remains = A3(elm$core$String$slice, 0, roundDigitIndex, normalized);
			var num = increase ? elm$core$String$reverse(
				A2(
					elm$core$Maybe$withDefault,
					'1',
					A2(
						elm$core$Maybe$map,
						myrho$elm_round$Round$increaseNum,
						elm$core$String$uncons(
							elm$core$String$reverse(remains))))) : remains;
			var numLen = elm$core$String$length(num);
			var numZeroed = (num === '0') ? num : ((s <= 0) ? _Utils_ap(
				num,
				A2(
					elm$core$String$repeat,
					elm$core$Basics$abs(s),
					'0')) : ((_Utils_cmp(
				s,
				elm$core$String$length(after)) < 0) ? (A3(elm$core$String$slice, 0, numLen - s, num) + ('.' + A3(elm$core$String$slice, numLen - s, numLen, num))) : _Utils_ap(
				before + '.',
				A3(
					elm$core$String$padRight,
					s,
					_Utils_chr('0'),
					after))));
			return A2(myrho$elm_round$Round$addSign, signed, numZeroed);
		}
	});
var myrho$elm_round$Round$round = myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _n0 = elm$core$String$uncons(str);
			if (_n0.$ === 'Nothing') {
				return false;
			} else {
				if ('5' === _n0.a.a.valueOf()) {
					if (_n0.a.b === '') {
						var _n1 = _n0.a;
						return !signed;
					} else {
						var _n2 = _n0.a;
						return true;
					}
				} else {
					var _n3 = _n0.a;
					var _int = _n3.a;
					return function (i) {
						return ((i > 53) && signed) || ((i >= 53) && (!signed));
					}(
						elm$core$Char$toCode(_int));
				}
			}
		}));
var cuducos$elm_format_number$FormatNumber$Parser$splitInParts = F2(
	function (locale, value) {
		var toString = function () {
			var _n1 = locale.decimals;
			switch (_n1.$) {
				case 'Max':
					var max = _n1.a;
					return myrho$elm_round$Round$round(max);
				case 'Min':
					return elm$core$String$fromFloat;
				default:
					var exact = _n1.a;
					return myrho$elm_round$Round$round(exact);
			}
		}();
		var asList = A2(
			elm$core$String$split,
			'.',
			toString(value));
		var decimals = function () {
			var _n0 = elm$core$List$tail(asList);
			if (_n0.$ === 'Just') {
				var values = _n0.a;
				return A2(
					elm$core$Maybe$withDefault,
					'',
					elm$core$List$head(values));
			} else {
				return '';
			}
		}();
		var integers = A2(
			elm$core$Maybe$withDefault,
			'',
			elm$core$List$head(asList));
		return _Utils_Tuple2(integers, decimals);
	});
var cuducos$elm_format_number$FormatNumber$Parser$splitThousands = function (integers) {
	var reversedSplitThousands = function (value) {
		return (elm$core$String$length(value) > 3) ? A2(
			elm$core$List$cons,
			A2(elm$core$String$right, 3, value),
			reversedSplitThousands(
				A2(elm$core$String$dropRight, 3, value))) : _List_fromArray(
			[value]);
	};
	return elm$core$List$reverse(
		reversedSplitThousands(integers));
};
var elm$core$String$filter = _String_filter;
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var cuducos$elm_format_number$FormatNumber$Parser$parse = F2(
	function (locale, original) {
		var parts = A2(cuducos$elm_format_number$FormatNumber$Parser$splitInParts, locale, original);
		var integers = cuducos$elm_format_number$FormatNumber$Parser$splitThousands(
			A2(elm$core$String$filter, elm$core$Char$isDigit, parts.a));
		var decimals = A2(cuducos$elm_format_number$FormatNumber$Parser$getDecimals, locale, parts.b);
		var partial = A5(cuducos$elm_format_number$FormatNumber$Parser$FormattedNumber, original, integers, decimals, '', '');
		var _n0 = cuducos$elm_format_number$FormatNumber$Parser$classify(partial);
		switch (_n0.$) {
			case 'Negative':
				return _Utils_update(
					partial,
					{prefix: locale.negativePrefix, suffix: locale.negativeSuffix});
			case 'Positive':
				return _Utils_update(
					partial,
					{prefix: locale.positivePrefix, suffix: locale.positiveSuffix});
			default:
				return _Utils_update(
					partial,
					{prefix: locale.zeroPrefix, suffix: locale.zeroSuffix});
		}
	});
var cuducos$elm_format_number$FormatNumber$Stringfy$formatDecimals = F2(
	function (locale, decimals) {
		return (decimals === '') ? '' : _Utils_ap(locale.decimalSeparator, decimals);
	});
var cuducos$elm_format_number$FormatNumber$Stringfy$stringfy = F2(
	function (locale, formatted) {
		var stringfyDecimals = cuducos$elm_format_number$FormatNumber$Stringfy$formatDecimals(locale);
		var integers = A2(elm$core$String$join, locale.thousandSeparator, formatted.integers);
		var decimals = stringfyDecimals(formatted.decimals);
		return elm$core$String$concat(
			_List_fromArray(
				[formatted.prefix, integers, decimals, formatted.suffix]));
	});
var cuducos$elm_format_number$FormatNumber$format = F2(
	function (locale, number_) {
		return A2(
			cuducos$elm_format_number$FormatNumber$Stringfy$stringfy,
			locale,
			A2(cuducos$elm_format_number$FormatNumber$Parser$parse, locale, number_));
	});
var cuducos$elm_format_number$FormatNumber$Locales$Max = function (a) {
	return {$: 'Max', a: a};
};
var cuducos$elm_format_number$FormatNumber$Locales$Exact = function (a) {
	return {$: 'Exact', a: a};
};
var cuducos$elm_format_number$FormatNumber$Locales$Min = function (a) {
	return {$: 'Min', a: a};
};
var cuducos$elm_format_number$FormatNumber$Locales$base = {
	decimalSeparator: '.',
	decimals: cuducos$elm_format_number$FormatNumber$Locales$Min(0),
	negativePrefix: '−',
	negativeSuffix: '',
	positivePrefix: '',
	positiveSuffix: '',
	thousandSeparator: '',
	zeroPrefix: '',
	zeroSuffix: ''
};
var cuducos$elm_format_number$FormatNumber$Locales$spanishLocale = _Utils_update(
	cuducos$elm_format_number$FormatNumber$Locales$base,
	{
		decimalSeparator: ',',
		decimals: cuducos$elm_format_number$FormatNumber$Locales$Exact(3),
		thousandSeparator: '.'
	});
var author$project$Pages$RecipeView$showIngrRow = F3(
	function (number, nfd, ingr) {
		var loc = _Utils_update(
			cuducos$elm_format_number$FormatNumber$Locales$spanishLocale,
			{
				decimals: cuducos$elm_format_number$FormatNumber$Locales$Max(2)
			});
		var ingr_unit = function () {
			var _n2 = ingr.unit;
			if (_n2.$ === 'Just') {
				var unit = _n2.a;
				return ' ' + unit.name;
			} else {
				return '';
			}
		}();
		var ingr_quantity = function () {
			var _n1 = ingr.quantity;
			if (_n1.$ === 'Just') {
				var quantity = _n1.a;
				return _Utils_ap(
					A2(cuducos$elm_format_number$FormatNumber$format, loc, (quantity * nfd) / number),
					ingr_unit);
			} else {
				return '';
			}
		}();
		var ingr_comment = function () {
			var _n0 = ingr.comment;
			if (_n0.$ === 'Just') {
				var comment = _n0.a;
				return ', ' + comment;
			} else {
				return '';
			}
		}();
		return A2(
			elm$html$Html$tr,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('incredientsRow')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$td,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('amount')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(ingr_quantity)
						])),
					A2(
					elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(
							_Utils_ap(ingr.name, ingr_comment))
						]))
				]));
	});
var elm$html$Html$tbody = _VirtualDom_node('tbody');
var elm$html$Html$Attributes$colspan = function (n) {
	return A2(
		_VirtualDom_attribute,
		'colspan',
		elm$core$String$fromInt(n));
};
var author$project$Pages$RecipeView$showPartRow = F3(
	function (number, nfd, part) {
		var partRow = A2(
			elm$html$Html$tr,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('partsRow')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$td,
					_List_fromArray(
						[
							elm$html$Html$Attributes$colspan(2)
						]),
					_List_fromArray(
						[
							elm$html$Html$text(part.name)
						]))
				]));
		var ingreRows = A2(
			elm$core$List$map,
			A2(author$project$Pages$RecipeView$showIngrRow, number, nfd),
			A2(
				elm$core$List$sortBy,
				function ($) {
					return $.sortorder;
				},
				part.ingredients));
		return A2(
			elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$table,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$tbody,
									_List_Nil,
									_Utils_ap(
										_List_fromArray(
											[partRow]),
										ingreRows))
								]))
						]))
				]));
	});
var author$project$Pages$RecipeView$showTodoRow = F2(
	function (sp, todo) {
		var image = function () {
			var _n0 = todo.image;
			if (_n0.$ === 'Just') {
				var img = _n0.a;
				return A2(
					elm$html$Html$img,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('todoImg'),
							elm$html$Html$Attributes$src(
							_Utils_ap(sp.imagePath, img))
						]),
					_List_Nil);
			} else {
				return elm$html$Html$text('');
			}
		}();
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id('todo')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('todoNr')
								]),
							_List_fromArray(
								[
									elm$html$Html$text(
									elm$core$String$fromInt(todo.number))
								])),
							A2(
							elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(todo.text)
								]))
						])),
					A2(
					elm$html$Html$figure,
					_List_Nil,
					_List_fromArray(
						[image]))
				]));
	});
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		elm$core$String$fromInt(n));
};
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var elm$html$Html$Attributes$target = elm$html$Html$Attributes$stringProperty('target');
var author$project$Pages$Utils$getEditButton = F6(
	function (sp, isLoggedIn, bntImg, link, event, styles) {
		var showBtn = function () {
			if (isLoggedIn.$ === 'Just') {
				var bool = isLoggedIn.a;
				return bool;
			} else {
				return false;
			}
		}();
		var btn = function () {
			if (link.$ === 'Just') {
				var href = link.a;
				return A2(
					elm$html$Html$a,
					A2(
						elm$core$List$append,
						styles,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('amazonLink'),
								elm$html$Html$Attributes$target('_blank'),
								elm$html$Html$Attributes$href(href)
							])),
					_List_fromArray(
						[
							A2(
							elm$html$Html$img,
							_List_fromArray(
								[
									elm$html$Html$Attributes$src(
									_Utils_ap(sp.iconPath, bntImg)),
									elm$html$Html$Attributes$height(20)
								]),
							_List_Nil)
						]));
			} else {
				return A2(
					elm$html$Html$button,
					A2(
						elm$core$List$append,
						styles,
						_List_fromArray(
							[
								elm$html$Html$Events$onClick(event)
							])),
					_List_fromArray(
						[
							A2(
							elm$html$Html$img,
							_List_fromArray(
								[
									elm$html$Html$Attributes$src(
									_Utils_ap(sp.iconPath, bntImg)),
									elm$html$Html$Attributes$height(20)
								]),
							_List_Nil)
						]));
			}
		}();
		return showBtn ? btn : elm$html$Html$text('');
	});
var author$project$Pages$Utils$getEditHeader = F3(
	function (isLoggedIn, headerTxt, event) {
		return isLoggedIn ? A2(
			elm$html$Html$span,
			_List_fromArray(
				[
					elm$html$Html$Events$onClick(event),
					elm$html$Html$Attributes$class('editHeader')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(headerTxt)
				])) : elm$html$Html$text(headerTxt);
	});
var elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			elm$core$String$join,
			after,
			A2(elm$core$String$split, before, string));
	});
var elm$html$Html$figcaption = _VirtualDom_node('figcaption');
var elm$html$Html$h2 = _VirtualDom_node('h2');
var elm$html$Html$h4 = _VirtualDom_node('h4');
var author$project$Pages$RecipeView$viewRecipe = F3(
	function (loginToken, rec, sp) {
		var sourceYear = function () {
			var _n11 = rec.source;
			if (_n11.$ === 'Just') {
				var source = _n11.a;
				var _n12 = source.year;
				if (_n12.$ === 'Just') {
					var year = _n12.a;
					return '; Veröffentlicht am: ' + year;
				} else {
					return '';
				}
			} else {
				return '';
			}
		}();
		var sourcePage = function () {
			var _n10 = rec.source_page;
			if (_n10.$ === 'Just') {
				var page = _n10.a;
				return '; Seite: ' + elm$core$String$fromInt(page);
			} else {
				return '';
			}
		}();
		var sourceIsbn = function () {
			var _n8 = rec.source;
			if (_n8.$ === 'Just') {
				var source = _n8.a;
				var _n9 = source.isbn;
				if (_n9.$ === 'Just') {
					var isbn = _n9.a;
					return '; ISBN: ' + isbn;
				} else {
					return '';
				}
			} else {
				return '';
			}
		}();
		var rec_source = function () {
			var _n7 = rec.source;
			if (_n7.$ === 'Just') {
				var source = _n7.a;
				return 'Quelle: ' + source.name;
			} else {
				return '';
			}
		}();
		var recImage = function () {
			var _n6 = rec.image;
			if (_n6.$ === 'Just') {
				var img = _n6.a;
				return A2(
					elm$html$Html$img,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('recipeImg'),
							elm$html$Html$Attributes$src('data:image/jpeg;base64,' + img)
						]),
					_List_Nil);
			} else {
				return elm$html$Html$text('');
			}
		}();
		var number_for_display = function () {
			var _n5 = rec.number_for_display;
			if (_n5.$ === 'Just') {
				var n = _n5.a;
				return n;
			} else {
				return 1;
			}
		}();
		var number_comment = function () {
			var _n4 = rec.number_comment;
			if (_n4.$ === 'Just') {
				var comment = _n4.a;
				return comment;
			} else {
				return 'Portionen';
			}
		}();
		var rec_number = A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$input,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id('number_for_display'),
							elm$html$Html$Attributes$type_('number'),
							elm$html$Html$Attributes$class('numberInput'),
							elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetNumberForDisplay),
							elm$html$Html$Attributes$value(
							elm$core$String$fromFloat(number_for_display))
						]),
					_List_Nil),
					A2(
					elm$html$Html$label,
					_List_fromArray(
						[
							elm$html$Html$Attributes$for('number_for_display')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(number_comment)
						]))
				]));
		var number = function () {
			var _n3 = rec.number;
			if (_n3.$ === 'Just') {
				var n = _n3.a;
				return n;
			} else {
				return 1;
			}
		}();
		var header = function () {
			var _n2 = rec.translate;
			if (_n2.$ === 'Just') {
				var translate = _n2.a;
				return rec.name + (' (' + (translate + ')'));
			} else {
				return elm$core$String$isEmpty(rec.name) ? 'Bitte Name eingeben' : rec.name;
			}
		}();
		var amazonUrl = 'https://www.amazon.de/gp/search?index=books&linkCode=qs&keywords=';
		var amazonLink = function () {
			var _n0 = rec.source;
			if (_n0.$ === 'Just') {
				var source = _n0.a;
				var _n1 = source.isbn;
				if (_n1.$ === 'Just') {
					var isbn = _n1.a;
					return A6(
						author$project$Pages$Utils$getEditButton,
						sp,
						elm$core$Maybe$Just(true),
						'amazon.png',
						elm$core$Maybe$Just(
							_Utils_ap(
								amazonUrl,
								A3(elm$core$String$replace, '-', '', isbn))),
						author$project$Devs$TypeObject$NoOp,
						_List_Nil);
				} else {
					return elm$html$Html$text('');
				}
			} else {
				return elm$html$Html$text('');
			}
		}();
		var actionButton = author$project$Devs$Utils$isLoggedIn(loginToken) ? A2(
			elm$html$Html$button,
			_List_fromArray(
				[
					elm$html$Html$Events$onClick(author$project$Devs$TypeObject$EditRecipe)
				]),
			_List_fromArray(
				[
					elm$html$Html$text('bearbeiten')
				])) : A2(elm$html$Html$span, _List_Nil, _List_Nil);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id('contentDiv'),
					elm$html$Html$Attributes$class('cf')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('noprint')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$button,
							_List_fromArray(
								[
									elm$html$Html$Events$onClick(author$project$Devs$TypeObject$RemoveSelectedRecipe)
								]),
							_List_fromArray(
								[
									elm$html$Html$text('zur Liste zurück')
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id('recipeDiv')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$h2,
									_List_fromArray(
										[
											A2(elm$html$Html$Attributes$style, 'float', 'left'),
											A2(elm$html$Html$Attributes$style, 'margin-right', '5px')
										]),
									_List_fromArray(
										[
											A3(
											author$project$Pages$Utils$getEditHeader,
											author$project$Devs$Utils$isLoggedIn(loginToken),
											header,
											author$project$Devs$TypeObject$ToggleEditForm(author$project$Devs$Objects$BasicForm))
										])),
									A6(
									author$project$Pages$Utils$getEditButton,
									sp,
									elm$core$Maybe$Just(
										author$project$Devs$Utils$isLoggedIn(loginToken)),
									'save.png',
									elm$core$Maybe$Nothing,
									author$project$Devs$TypeObject$SaveRecipe,
									_List_fromArray(
										[
											A2(elm$html$Html$Attributes$style, 'margin-top', '10px')
										])),
									A6(
									author$project$Pages$Utils$getEditButton,
									sp,
									elm$core$Maybe$Just(
										author$project$Devs$Utils$isLoggedIn(loginToken)),
									'delete.png',
									elm$core$Maybe$Nothing,
									author$project$Devs$TypeObject$ConfirmDelete,
									_List_fromArray(
										[
											A2(elm$html$Html$Attributes$style, 'margin-top', '10px')
										]))
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$id('recipeSource'),
									A2(elm$html$Html$Attributes$style, 'clear', 'both')
								]),
							_List_fromArray(
								[
									elm$html$Html$text(
									_Utils_ap(
										rec_source,
										_Utils_ap(
											sourcePage,
											_Utils_ap(sourceYear, sourceIsbn)))),
									amazonLink
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$id('recipeTags')
								]),
							_List_fromArray(
								[
									A3(
									author$project$Pages$Utils$getEditHeader,
									author$project$Devs$Utils$isLoggedIn(loginToken),
									'Tags:',
									author$project$Devs$TypeObject$ToggleEditForm(author$project$Devs$Objects$TagForm)),
									elm$html$Html$text(
									' ' + A2(
										elm$core$String$join,
										', ',
										A2(
											elm$core$List$map,
											author$project$Pages$RecipeView$getTagName,
											A2(
												elm$core$List$sortBy,
												function ($) {
													return $.name;
												},
												rec.tags))))
								])),
							A2(
							elm$html$Html$figure,
							_List_Nil,
							_List_fromArray(
								[
									recImage,
									A2(
									elm$html$Html$figcaption,
									_List_Nil,
									_List_fromArray(
										[rec_number]))
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$id('recipe')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$id('ingredientsDiv')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$h4,
											_List_Nil,
											_List_fromArray(
												[
													A3(
													author$project$Pages$Utils$getEditHeader,
													author$project$Devs$Utils$isLoggedIn(loginToken),
													'Zutaten',
													author$project$Devs$TypeObject$ToggleEditForm(author$project$Devs$Objects$IngredientForm))
												])),
											A2(
											elm$html$Html$table,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('incredientsTable')
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$tbody,
													_List_Nil,
													A2(
														elm$core$List$map,
														A2(author$project$Pages$RecipeView$showPartRow, number, number_for_display),
														A2(
															elm$core$List$sortBy,
															function ($) {
																return $.name;
															},
															rec.parts)))
												]))
										])),
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$id('todosDiv')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$h4,
											_List_Nil,
											_List_fromArray(
												[
													A3(
													author$project$Pages$Utils$getEditHeader,
													author$project$Devs$Utils$isLoggedIn(loginToken),
													'Zubereitung',
													author$project$Devs$TypeObject$ToggleEditForm(author$project$Devs$Objects$TodoForm))
												])),
											A2(
											elm$html$Html$div,
											_List_Nil,
											A2(
												elm$core$List$map,
												author$project$Pages$RecipeView$showTodoRow(sp),
												A2(
													elm$core$List$sortBy,
													function ($) {
														return $.number;
													},
													rec.todos)))
										])),
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('clear')
										]),
									_List_Nil)
								]))
						]))
				]));
	});
var author$project$Devs$TypeObject$ShowRecipesOfTag = function (a) {
	return {$: 'ShowRecipesOfTag', a: a};
};
var author$project$Pages$TagtypeView$viewInitialTag = function (tag) {
	var tag_id = function () {
		var _n0 = tag.id;
		if (_n0.$ === 'Just') {
			var id = _n0.a;
			return id;
		} else {
			return -1;
		}
	}();
	return A2(
		elm$html$Html$button,
		_List_fromArray(
			[
				elm$html$Html$Attributes$id(
				elm$core$String$fromInt(tag_id)),
				elm$html$Html$Attributes$class('tagLink'),
				elm$html$Html$Events$onClick(
				author$project$Devs$TypeObject$ShowRecipesOfTag(
					elm$core$Maybe$Just(tag)))
			]),
		_List_fromArray(
			[
				elm$html$Html$text(tag.name)
			]));
};
var author$project$Pages$TagtypeView$viewInitialTagtype = function (tagtype) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$id('categoryTypeDiv')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text(tagtype.name)
					])),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$id('categoryDiv')
					]),
				A2(elm$core$List$map, author$project$Pages$TagtypeView$viewInitialTag, tagtype.tagList))
			]));
};
var author$project$Pages$TagtypeView$listInitialTagtypeList = function (model) {
	var _n0 = model.tagtypeList;
	if (_n0.$ === 'Just') {
		var tagtypeList = _n0.a;
		return A2(
			elm$core$List$map,
			author$project$Pages$TagtypeView$viewInitialTagtype,
			A2(
				elm$core$List$sortBy,
				function ($) {
					return $.name;
				},
				tagtypeList));
	} else {
		return _List_fromArray(
			[
				elm$html$Html$text('')
			]);
	}
};
var author$project$Pages$TagtypeView$viewInitialTagtypeList = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$id('contentDiv'),
				elm$html$Html$Attributes$class('cf')
			]),
		author$project$Pages$TagtypeView$listInitialTagtypeList(model));
};
var author$project$Pages$Utils$getConfirmForm = F4(
	function (yesEvent, noEvent, msg, model) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('editFormBG')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('confirmFormDiv')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('confirmMsgDiv')
								]),
							_List_fromArray(
								[
									elm$html$Html$text(msg)
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('confirmFormActionDiv')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$button,
									_List_fromArray(
										[
											elm$html$Html$Events$onClick(yesEvent)
										]),
									_List_fromArray(
										[
											elm$html$Html$text('ja')
										])),
									A2(
									elm$html$Html$button,
									_List_fromArray(
										[
											elm$html$Html$Events$onClick(noEvent)
										]),
									_List_fromArray(
										[
											elm$html$Html$text('nein')
										]))
								]))
						]))
				]));
	});
var elm$html$Html$h1 = _VirtualDom_node('h1');
var elm$html$Html$Attributes$name = elm$html$Html$Attributes$stringProperty('name');
var elm$html$Html$Attributes$placeholder = elm$html$Html$Attributes$stringProperty('placeholder');
var author$project$Pages$OverViewPage$viewOverview = F2(
	function (model, alertMsg) {
		var tagForm = function () {
			var _n6 = model.addTag;
			if (_n6.$ === 'Just') {
				var tag = _n6.a;
				return author$project$Pages$EditorView$viewAddTagForm(model);
			} else {
				return elm$html$Html$text('');
			}
		}();
		var sourceForm = function () {
			var _n5 = model.newSource;
			if (_n5.$ === 'Just') {
				var src = _n5.a;
				return author$project$Pages$EditorView$viewSourceForm(model);
			} else {
				return elm$html$Html$text('');
			}
		}();
		var printBookLink = model.sp.serverProtokoll + (model.sp.serverHost + (model.sp.serverUrlPrefix + (model.sp.apiUrlPrefix + '/printBookDownload')));
		var loginForm = function () {
			var _n4 = model.loginToken;
			if (_n4.$ === 'Just') {
				var isLoggedInTmp = _n4.a;
				return (!elm$core$String$length(isLoggedInTmp)) ? author$project$Pages$LoginView$getLoginForm(model) : elm$html$Html$text('');
			} else {
				return elm$html$Html$text('');
			}
		}();
		var isLoggedIn = function () {
			var _n3 = model.loginToken;
			if (_n3.$ === 'Just') {
				var log = _n3.a;
				return (elm$core$String$length(log) > 0) ? true : false;
			} else {
				return false;
			}
		}();
		var editForm = function () {
			var _n2 = model.showEditForm;
			if (_n2.$ === 'Just') {
				var rec = _n2.a;
				return author$project$Pages$EditorView$viewEditForm(model);
			} else {
				return elm$html$Html$text('');
			}
		}();
		var content = function () {
			var _n0 = model.selectedRecipe;
			if (_n0.$ === 'Just') {
				var rec = _n0.a;
				return A3(author$project$Pages$RecipeView$viewRecipe, model.loginToken, rec, model.sp);
			} else {
				var _n1 = model.recipesOfSelectedTag;
				if (_n1.$ === 'Just') {
					var recipeList = _n1.a;
					return author$project$Pages$RecipeListView$viewRecipesOfTag(model);
				} else {
					return author$project$Pages$TagtypeView$viewInitialTagtypeList(model);
				}
			}
		}();
		var confirmDeleteForm = model.deleteRecipe ? A4(author$project$Pages$Utils$getConfirmForm, author$project$Devs$TypeObject$DeleteRecipe, author$project$Devs$TypeObject$CancelDelete, 'Soll das Rezept wirklich gelöscht werden?', model) : elm$html$Html$text('');
		var actionButton = isLoggedIn ? A2(
			elm$html$Html$button,
			_List_fromArray(
				[
					elm$html$Html$Events$onClick(author$project$Devs$TypeObject$InsertRecipe)
				]),
			_List_fromArray(
				[
					elm$html$Html$text('hinzufügen')
				])) : A2(
			elm$html$Html$button,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('loginBtn'),
					elm$html$Html$Events$onClick(author$project$Devs$TypeObject$GetLoginForm)
				]),
			_List_fromArray(
				[
					elm$html$Html$text('einloggen')
				]));
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					sourceForm,
					tagForm,
					editForm,
					loginForm,
					confirmDeleteForm,
					A2(
					elm$html$Html$h1,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('noprint')
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Meine Rezeptesammlung')
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id('searchDiv'),
							elm$html$Html$Attributes$class('noprint')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$id('searchForm')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$input,
									_List_fromArray(
										[
											elm$html$Html$Attributes$type_('text'),
											elm$html$Html$Attributes$name('searchField'),
											elm$html$Html$Attributes$class('searchField'),
											elm$html$Html$Attributes$placeholder('Welches Rezept suchst du?'),
											elm$html$Html$Attributes$value(model.searchValue),
											elm$html$Html$Events$onInput(author$project$Devs$TypeObject$SetSearchInput),
											author$project$Pages$Utils$onEnter(author$project$Devs$TypeObject$SearchRecipe)
										]),
									_List_Nil),
									A2(
									elm$html$Html$button,
									_List_fromArray(
										[
											elm$html$Html$Attributes$name('searchButton'),
											elm$html$Html$Attributes$value('search'),
											elm$html$Html$Events$onClick(author$project$Devs$TypeObject$SearchRecipe)
										]),
									_List_fromArray(
										[
											elm$html$Html$text('suche')
										])),
									actionButton,
									A2(
									elm$html$Html$a,
									_List_fromArray(
										[
											elm$html$Html$Attributes$href(printBookLink)
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Buch drucken')
										]))
								]))
						])),
					alertMsg,
					content
				]));
	});
var author$project$RecipeServer$view = function (model) {
	var appHeader = _List_fromArray(
		[
			A2(
			elm$html$Html$h1,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('RecipeServer')
				]))
		]);
	var alertMsg = (!_Utils_eq(model.alertMessage, elm$core$Maybe$Nothing)) ? A3(author$project$Pages$Utils$alert, author$project$Devs$TypeObject$CloseAlert, model.alertMessage, model) : ((!_Utils_eq(model.recAlertMessage, elm$core$Maybe$Nothing)) ? A3(author$project$Pages$Utils$alert, author$project$Devs$TypeObject$CloseAlert, model.recAlertMessage, model) : A2(elm$html$Html$div, _List_Nil, _List_Nil));
	return A2(author$project$Pages$OverViewPage$viewOverview, model, alertMsg);
};
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$element = _Browser_element;
var author$project$RecipeServer$main = elm$browser$Browser$element(
	{
		init: function (_n0) {
			return author$project$RecipeServer$init;
		},
		subscriptions: author$project$RecipeServer$subscriptions,
		update: author$project$Devs$Update$update,
		view: author$project$RecipeServer$view
	});
_Platform_export({'RecipeServer':{'init':author$project$RecipeServer$main(
	elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));