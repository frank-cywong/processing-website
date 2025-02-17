import { titleCase as _titleCase } from 'title-case';

/**
  Array for turning a date.getMonth() index into a date string
**/
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

/**
  Turns < > & into their unicode equivalents
**/
export const escapeHtml = (str) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
  Turns a slug into a title
  Example: this_is_something => This Is Something
**/
export const titleCase = (slug) => _titleCase(slug.replace(/_/g, ' '));

/**
  Turns a title into a slug
  Example: This Is Something => this-is-something
**/
export const slugify = (...titles) =>
  titles
    .join('-')
    .replace(/(\s|_)/g, '-')
    .toLowerCase();

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const map = (n, start1, stop1, start2, stop2) => {
  const prog = Math.min(1, Math.max(0, (n - start1) / (stop1 - start1)));
  return prog * (stop2 - start2) + start2;
};

export const getWin = () => {
  if (typeof window == 'undefined') return [null, null];
  return [window.innerWidth, window.innerHeight];
};

const WIDONT_REGEX = /([^\s])\s+([^\s]+)\s*$/;
const DASH_REGEX = /-/g;
const SPACE = '\u00a0'; //'&nbsp;';
const HYPHEN = '\u2011'; //'&#8209;'

export const widont = (str) => {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(WIDONT_REGEX, (str, lead, word) => {
    if (word.indexOf('-') >= 0) {
      return lead + ' ' + word.replace(DASH_REGEX, HYPHEN);
    }
    return lead + SPACE + word;
  });
};

export const linkParsing = (str) => {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(/\[([^\]]*)\]\(([^)]*)\)/g, '<a href="$2">$1</a>');
};

/**
  Gets sessionStorage if available without failing in the server
**/
export const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : null;

/**
    Gets localStorage if available without failing in the server
  **/
export const localStorage =
  typeof window !== 'undefined' ? window.localStorage : null;

/**
  Returns a copy of the object with the keys sorted based on the array provided.
**/
export const sortObject = (obj, order) => {
  const keys = Object.keys(obj).sort((a, b) => {
    let aidx = order.indexOf(a);
    let bidx = order.indexOf(b);
    // Ensure keys not in order are sorted last
    if (aidx === -1) aidx = 9999;
    if (bidx === -1) bidx = 9999;
    return aidx - bidx;
  });
  const copy = {};
  for (let i = 0; i < keys.length; i++) {
    copy[keys[i]] = obj[keys[i]];
  }
  return copy;
};

/**
  Returns a copy of the array with the items sorted based on the values in the array provided and the key
**/
export const sortArray = (arr, order, key) => {
  return arr.slice().sort((a, b) => {
    let aidx = order.indexOf(a[key]);
    let bidx = order.indexOf(b[key]);
    // Ensure keys not in order are sorted last
    if (aidx === -1) aidx = 9999;
    if (bidx === -1) bidx = 9999;
    return aidx - bidx;
  });
};

// taken from https://www.npmjs.com/package/truncate
export const truncate = (string, maxLength) => {
  const URL_REGEX = /(((ftp|https?):\/\/)[-\w@:%_+.~#?,&//=]+)|((mailto:)?[_.\w-]{1,300}@(.{1,300}\.)[a-zA-Z]{2,3})/g;

  let content = '', // truncated text storage
    matches = true,
    remainingLength = maxLength,
    result,
    index;

  if (!string || string.length === 0) {
    return '';
  }

  matches = true;
  while (matches) {
    URL_REGEX.lastIndex = content.length;
    matches = URL_REGEX.exec(string);

    if (!matches || matches.index - content.length >= remainingLength) {
      content += string.substring(content.length, maxLength);
      break;
    }

    result = matches[0];
    index = matches.index;
    content += string.substring(content.length, index + result.length);
    remainingLength -= index + result.length;

    if (remainingLength <= 0) {
      break;
    }
  }

  return string.length === content.length ? content : content + '…';
};
