(() => {
  "use strict";
  const t = [
      { icon: "😊", name: "Smiling Face" },
      { icon: "🚀", name: "Rocket" },
      { icon: "🍕", name: "Pizza" },
      { icon: "🐱", name: "Cat" },
      { icon: "🌈", name: "Rainbow" },
      { icon: "🎸", name: "Guitar" },
    ],
    e = {
      lessThanXSeconds: {
        one: "less than a second",
        other: "less than {{count}} seconds",
      },
      xSeconds: { one: "1 second", other: "{{count}} seconds" },
      halfAMinute: "half a minute",
      lessThanXMinutes: {
        one: "less than a minute",
        other: "less than {{count}} minutes",
      },
      xMinutes: { one: "1 minute", other: "{{count}} minutes" },
      aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
      xHours: { one: "1 hour", other: "{{count}} hours" },
      xDays: { one: "1 day", other: "{{count}} days" },
      aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
      xWeeks: { one: "1 week", other: "{{count}} weeks" },
      aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
      xMonths: { one: "1 month", other: "{{count}} months" },
      aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
      xYears: { one: "1 year", other: "{{count}} years" },
      overXYears: { one: "over 1 year", other: "over {{count}} years" },
      almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
    };
  function n(t) {
    return (e = {}) => {
      const n = e.width ? String(e.width) : t.defaultWidth;
      return t.formats[n] || t.formats[t.defaultWidth];
    };
  }
  const a = {
      date: n({
        formats: {
          full: "EEEE, MMMM do, y",
          long: "MMMM do, y",
          medium: "MMM d, y",
          short: "MM/dd/yyyy",
        },
        defaultWidth: "full",
      }),
      time: n({
        formats: {
          full: "h:mm:ss a zzzz",
          long: "h:mm:ss a z",
          medium: "h:mm:ss a",
          short: "h:mm a",
        },
        defaultWidth: "full",
      }),
      dateTime: n({
        formats: {
          full: "{{date}} 'at' {{time}}",
          long: "{{date}} 'at' {{time}}",
          medium: "{{date}}, {{time}}",
          short: "{{date}}, {{time}}",
        },
        defaultWidth: "full",
      }),
    },
    r = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P",
    };
  function o(t) {
    return (e, n) => {
      let a;
      if (
        "formatting" === (n?.context ? String(n.context) : "standalone") &&
        t.formattingValues
      ) {
        const e = t.defaultFormattingWidth || t.defaultWidth,
          r = n?.width ? String(n.width) : e;
        a = t.formattingValues[r] || t.formattingValues[e];
      } else {
        const e = t.defaultWidth,
          r = n?.width ? String(n.width) : t.defaultWidth;
        a = t.values[r] || t.values[e];
      }
      return a[t.argumentCallback ? t.argumentCallback(e) : e];
    };
  }
  function i(t) {
    return (e, n = {}) => {
      const a = n.width,
        r = (a && t.matchPatterns[a]) || t.matchPatterns[t.defaultMatchWidth],
        o = e.match(r);
      if (!o) return null;
      const i = o[0],
        u = (a && t.parsePatterns[a]) || t.parsePatterns[t.defaultParseWidth],
        s = Array.isArray(u)
          ? (function (t) {
              for (let e = 0; e < t.length; e++) if (t[e].test(i)) return e;
            })(u)
          : (function (t) {
              for (const e in t)
                if (Object.prototype.hasOwnProperty.call(t, e) && t[e].test(i))
                  return e;
            })(u);
      let c;
      return (
        (c = t.valueCallback ? t.valueCallback(s) : s),
        (c = n.valueCallback ? n.valueCallback(c) : c),
        { value: c, rest: e.slice(i.length) }
      );
    };
  }
  var u;
  const s = {
    code: "en-US",
    formatDistance: (t, n, a) => {
      let r;
      const o = e[t];
      return (
        (r =
          "string" == typeof o
            ? o
            : 1 === n
            ? o.one
            : o.other.replace("{{count}}", n.toString())),
        a?.addSuffix
          ? a.comparison && a.comparison > 0
            ? "in " + r
            : r + " ago"
          : r
      );
    },
    formatLong: a,
    formatRelative: (t, e, n, a) => r[t],
    localize: {
      ordinalNumber: (t, e) => {
        const n = Number(t),
          a = n % 100;
        if (a > 20 || a < 10)
          switch (a % 10) {
            case 1:
              return n + "st";
            case 2:
              return n + "nd";
            case 3:
              return n + "rd";
          }
        return n + "th";
      },
      era: o({
        values: {
          narrow: ["B", "A"],
          abbreviated: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        defaultWidth: "wide",
      }),
      quarter: o({
        values: {
          narrow: ["1", "2", "3", "4"],
          abbreviated: ["Q1", "Q2", "Q3", "Q4"],
          wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
        },
        defaultWidth: "wide",
        argumentCallback: (t) => t - 1,
      }),
      month: o({
        values: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbreviated: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        defaultWidth: "wide",
      }),
      day: o({
        values: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        defaultWidth: "wide",
      }),
      dayPeriod: o({
        values: {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
        },
        defaultWidth: "wide",
        formattingValues: {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
        },
        defaultFormattingWidth: "wide",
      }),
    },
    match: {
      ordinalNumber:
        ((u = {
          matchPattern: /^(\d+)(th|st|nd|rd)?/i,
          parsePattern: /\d+/i,
          valueCallback: (t) => parseInt(t, 10),
        }),
        (t, e = {}) => {
          const n = t.match(u.matchPattern);
          if (!n) return null;
          const a = n[0],
            r = t.match(u.parsePattern);
          if (!r) return null;
          let o = u.valueCallback ? u.valueCallback(r[0]) : r[0];
          return (
            (o = e.valueCallback ? e.valueCallback(o) : o),
            { value: o, rest: t.slice(a.length) }
          );
        }),
      era: i({
        matchPatterns: {
          narrow: /^(b|a)/i,
          abbreviated:
            /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
          wide: /^(before christ|before common era|anno domini|common era)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: { any: [/^b/i, /^(a|c)/i] },
        defaultParseWidth: "any",
      }),
      quarter: i({
        matchPatterns: {
          narrow: /^[1234]/i,
          abbreviated: /^q[1234]/i,
          wide: /^[1234](th|st|nd|rd)? quarter/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
        defaultParseWidth: "any",
        valueCallback: (t) => t + 1,
      }),
      month: i({
        matchPatterns: {
          narrow: /^[jfmasond]/i,
          abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
          wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          narrow: [
            /^j/i,
            /^f/i,
            /^m/i,
            /^a/i,
            /^m/i,
            /^j/i,
            /^j/i,
            /^a/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
          any: [
            /^ja/i,
            /^f/i,
            /^mar/i,
            /^ap/i,
            /^may/i,
            /^jun/i,
            /^jul/i,
            /^au/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
        },
        defaultParseWidth: "any",
      }),
      day: i({
        matchPatterns: {
          narrow: /^[smtwf]/i,
          short: /^(su|mo|tu|we|th|fr|sa)/i,
          abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
          wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
          any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
        },
        defaultParseWidth: "any",
      }),
      dayPeriod: i({
        matchPatterns: {
          narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
          any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
        },
        defaultMatchWidth: "any",
        parsePatterns: {
          any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i,
          },
        },
        defaultParseWidth: "any",
      }),
    },
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
  };
  let c = {};
  function d() {
    return c;
  }
  Math.pow(10, 8);
  const l = 6048e5,
    h = Symbol.for("constructDateFrom");
  function m(t, e) {
    return "function" == typeof t
      ? t(e)
      : t && "object" == typeof t && h in t
      ? t[h](e)
      : t instanceof Date
      ? new t.constructor(e)
      : new Date(e);
  }
  function f(t, e) {
    return m(e || t, t);
  }
  function g(t) {
    const e = f(t),
      n = new Date(
        Date.UTC(
          e.getFullYear(),
          e.getMonth(),
          e.getDate(),
          e.getHours(),
          e.getMinutes(),
          e.getSeconds(),
          e.getMilliseconds()
        )
      );
    return n.setUTCFullYear(e.getFullYear()), +t - +n;
  }
  function w(t, e) {
    const n = f(t, e?.in);
    return n.setHours(0, 0, 0, 0), n;
  }
  function b(t, e) {
    const n = f(t, e?.in);
    return (
      (function (t, e, n) {
        const [a, r] = (function (t, ...e) {
            const n = m.bind(null, t || e.find((t) => "object" == typeof t));
            return e.map(n);
          })(n?.in, t, e),
          o = w(a),
          i = w(r),
          u = +o - g(o),
          s = +i - g(i);
        return Math.round((u - s) / 864e5);
      })(
        n,
        (function (t, e) {
          const n = f(t, e?.in);
          return (
            n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n
          );
        })(n)
      ) + 1
    );
  }
  function y(t, e) {
    const n = d(),
      a =
        e?.weekStartsOn ??
        e?.locale?.options?.weekStartsOn ??
        n.weekStartsOn ??
        n.locale?.options?.weekStartsOn ??
        0,
      r = f(t, e?.in),
      o = r.getDay(),
      i = (o < a ? 7 : 0) + o - a;
    return r.setDate(r.getDate() - i), r.setHours(0, 0, 0, 0), r;
  }
  function p(t, e) {
    return y(t, { ...e, weekStartsOn: 1 });
  }
  function M(t, e) {
    const n = f(t, e?.in),
      a = n.getFullYear(),
      r = m(n, 0);
    r.setFullYear(a + 1, 0, 4), r.setHours(0, 0, 0, 0);
    const o = p(r),
      i = m(n, 0);
    i.setFullYear(a, 0, 4), i.setHours(0, 0, 0, 0);
    const u = p(i);
    return n.getTime() >= o.getTime()
      ? a + 1
      : n.getTime() >= u.getTime()
      ? a
      : a - 1;
  }
  function v(t, e) {
    const n = f(t, e?.in),
      a =
        +p(n) -
        +(function (t, e) {
          const n = M(t, e),
            a = m(e?.in || t, 0);
          return a.setFullYear(n, 0, 4), a.setHours(0, 0, 0, 0), p(a);
        })(n);
    return Math.round(a / l) + 1;
  }
  function k(t, e) {
    const n = f(t, e?.in),
      a = n.getFullYear(),
      r = d(),
      o =
        e?.firstWeekContainsDate ??
        e?.locale?.options?.firstWeekContainsDate ??
        r.firstWeekContainsDate ??
        r.locale?.options?.firstWeekContainsDate ??
        1,
      i = m(e?.in || t, 0);
    i.setFullYear(a + 1, 0, o), i.setHours(0, 0, 0, 0);
    const u = y(i, e),
      s = m(e?.in || t, 0);
    s.setFullYear(a, 0, o), s.setHours(0, 0, 0, 0);
    const c = y(s, e);
    return +n >= +u ? a + 1 : +n >= +c ? a : a - 1;
  }
  function x(t, e) {
    const n = f(t, e?.in),
      a =
        +y(n, e) -
        +(function (t, e) {
          const n = d(),
            a =
              e?.firstWeekContainsDate ??
              e?.locale?.options?.firstWeekContainsDate ??
              n.firstWeekContainsDate ??
              n.locale?.options?.firstWeekContainsDate ??
              1,
            r = k(t, e),
            o = m(e?.in || t, 0);
          return o.setFullYear(r, 0, a), o.setHours(0, 0, 0, 0), y(o, e);
        })(n, e);
    return Math.round(a / l) + 1;
  }
  function P(t, e) {
    return (t < 0 ? "-" : "") + Math.abs(t).toString().padStart(e, "0");
  }
  const S = {
      y(t, e) {
        const n = t.getFullYear(),
          a = n > 0 ? n : 1 - n;
        return P("yy" === e ? a % 100 : a, e.length);
      },
      M(t, e) {
        const n = t.getMonth();
        return "M" === e ? String(n + 1) : P(n + 1, 2);
      },
      d: (t, e) => P(t.getDate(), e.length),
      a(t, e) {
        const n = t.getHours() / 12 >= 1 ? "pm" : "am";
        switch (e) {
          case "a":
          case "aa":
            return n.toUpperCase();
          case "aaa":
            return n;
          case "aaaaa":
            return n[0];
          default:
            return "am" === n ? "a.m." : "p.m.";
        }
      },
      h: (t, e) => P(t.getHours() % 12 || 12, e.length),
      H: (t, e) => P(t.getHours(), e.length),
      m: (t, e) => P(t.getMinutes(), e.length),
      s: (t, e) => P(t.getSeconds(), e.length),
      S(t, e) {
        const n = e.length,
          a = t.getMilliseconds();
        return P(Math.trunc(a * Math.pow(10, n - 3)), e.length);
      },
    },
    D = {
      G: function (t, e, n) {
        const a = t.getFullYear() > 0 ? 1 : 0;
        switch (e) {
          case "G":
          case "GG":
          case "GGG":
            return n.era(a, { width: "abbreviated" });
          case "GGGGG":
            return n.era(a, { width: "narrow" });
          default:
            return n.era(a, { width: "wide" });
        }
      },
      y: function (t, e, n) {
        if ("yo" === e) {
          const e = t.getFullYear(),
            a = e > 0 ? e : 1 - e;
          return n.ordinalNumber(a, { unit: "year" });
        }
        return S.y(t, e);
      },
      Y: function (t, e, n, a) {
        const r = k(t, a),
          o = r > 0 ? r : 1 - r;
        return "YY" === e
          ? P(o % 100, 2)
          : "Yo" === e
          ? n.ordinalNumber(o, { unit: "year" })
          : P(o, e.length);
      },
      R: function (t, e) {
        return P(M(t), e.length);
      },
      u: function (t, e) {
        return P(t.getFullYear(), e.length);
      },
      Q: function (t, e, n) {
        const a = Math.ceil((t.getMonth() + 1) / 3);
        switch (e) {
          case "Q":
            return String(a);
          case "QQ":
            return P(a, 2);
          case "Qo":
            return n.ordinalNumber(a, { unit: "quarter" });
          case "QQQ":
            return n.quarter(a, {
              width: "abbreviated",
              context: "formatting",
            });
          case "QQQQQ":
            return n.quarter(a, { width: "narrow", context: "formatting" });
          default:
            return n.quarter(a, { width: "wide", context: "formatting" });
        }
      },
      q: function (t, e, n) {
        const a = Math.ceil((t.getMonth() + 1) / 3);
        switch (e) {
          case "q":
            return String(a);
          case "qq":
            return P(a, 2);
          case "qo":
            return n.ordinalNumber(a, { unit: "quarter" });
          case "qqq":
            return n.quarter(a, {
              width: "abbreviated",
              context: "standalone",
            });
          case "qqqqq":
            return n.quarter(a, { width: "narrow", context: "standalone" });
          default:
            return n.quarter(a, { width: "wide", context: "standalone" });
        }
      },
      M: function (t, e, n) {
        const a = t.getMonth();
        switch (e) {
          case "M":
          case "MM":
            return S.M(t, e);
          case "Mo":
            return n.ordinalNumber(a + 1, { unit: "month" });
          case "MMM":
            return n.month(a, { width: "abbreviated", context: "formatting" });
          case "MMMMM":
            return n.month(a, { width: "narrow", context: "formatting" });
          default:
            return n.month(a, { width: "wide", context: "formatting" });
        }
      },
      L: function (t, e, n) {
        const a = t.getMonth();
        switch (e) {
          case "L":
            return String(a + 1);
          case "LL":
            return P(a + 1, 2);
          case "Lo":
            return n.ordinalNumber(a + 1, { unit: "month" });
          case "LLL":
            return n.month(a, { width: "abbreviated", context: "standalone" });
          case "LLLLL":
            return n.month(a, { width: "narrow", context: "standalone" });
          default:
            return n.month(a, { width: "wide", context: "standalone" });
        }
      },
      w: function (t, e, n, a) {
        const r = x(t, a);
        return "wo" === e
          ? n.ordinalNumber(r, { unit: "week" })
          : P(r, e.length);
      },
      I: function (t, e, n) {
        const a = v(t);
        return "Io" === e
          ? n.ordinalNumber(a, { unit: "week" })
          : P(a, e.length);
      },
      d: function (t, e, n) {
        return "do" === e
          ? n.ordinalNumber(t.getDate(), { unit: "date" })
          : S.d(t, e);
      },
      D: function (t, e, n) {
        const a = b(t);
        return "Do" === e
          ? n.ordinalNumber(a, { unit: "dayOfYear" })
          : P(a, e.length);
      },
      E: function (t, e, n) {
        const a = t.getDay();
        switch (e) {
          case "E":
          case "EE":
          case "EEE":
            return n.day(a, { width: "abbreviated", context: "formatting" });
          case "EEEEE":
            return n.day(a, { width: "narrow", context: "formatting" });
          case "EEEEEE":
            return n.day(a, { width: "short", context: "formatting" });
          default:
            return n.day(a, { width: "wide", context: "formatting" });
        }
      },
      e: function (t, e, n, a) {
        const r = t.getDay(),
          o = (r - a.weekStartsOn + 8) % 7 || 7;
        switch (e) {
          case "e":
            return String(o);
          case "ee":
            return P(o, 2);
          case "eo":
            return n.ordinalNumber(o, { unit: "day" });
          case "eee":
            return n.day(r, { width: "abbreviated", context: "formatting" });
          case "eeeee":
            return n.day(r, { width: "narrow", context: "formatting" });
          case "eeeeee":
            return n.day(r, { width: "short", context: "formatting" });
          default:
            return n.day(r, { width: "wide", context: "formatting" });
        }
      },
      c: function (t, e, n, a) {
        const r = t.getDay(),
          o = (r - a.weekStartsOn + 8) % 7 || 7;
        switch (e) {
          case "c":
            return String(o);
          case "cc":
            return P(o, e.length);
          case "co":
            return n.ordinalNumber(o, { unit: "day" });
          case "ccc":
            return n.day(r, { width: "abbreviated", context: "standalone" });
          case "ccccc":
            return n.day(r, { width: "narrow", context: "standalone" });
          case "cccccc":
            return n.day(r, { width: "short", context: "standalone" });
          default:
            return n.day(r, { width: "wide", context: "standalone" });
        }
      },
      i: function (t, e, n) {
        const a = t.getDay(),
          r = 0 === a ? 7 : a;
        switch (e) {
          case "i":
            return String(r);
          case "ii":
            return P(r, e.length);
          case "io":
            return n.ordinalNumber(r, { unit: "day" });
          case "iii":
            return n.day(a, { width: "abbreviated", context: "formatting" });
          case "iiiii":
            return n.day(a, { width: "narrow", context: "formatting" });
          case "iiiiii":
            return n.day(a, { width: "short", context: "formatting" });
          default:
            return n.day(a, { width: "wide", context: "formatting" });
        }
      },
      a: function (t, e, n) {
        const a = t.getHours() / 12 >= 1 ? "pm" : "am";
        switch (e) {
          case "a":
          case "aa":
            return n.dayPeriod(a, {
              width: "abbreviated",
              context: "formatting",
            });
          case "aaa":
            return n
              .dayPeriod(a, { width: "abbreviated", context: "formatting" })
              .toLowerCase();
          case "aaaaa":
            return n.dayPeriod(a, { width: "narrow", context: "formatting" });
          default:
            return n.dayPeriod(a, { width: "wide", context: "formatting" });
        }
      },
      b: function (t, e, n) {
        const a = t.getHours();
        let r;
        switch (
          ((r =
            12 === a
              ? "noon"
              : 0 === a
              ? "midnight"
              : a / 12 >= 1
              ? "pm"
              : "am"),
          e)
        ) {
          case "b":
          case "bb":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting",
            });
          case "bbb":
            return n
              .dayPeriod(r, { width: "abbreviated", context: "formatting" })
              .toLowerCase();
          case "bbbbb":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      B: function (t, e, n) {
        const a = t.getHours();
        let r;
        switch (
          ((r =
            a >= 17
              ? "evening"
              : a >= 12
              ? "afternoon"
              : a >= 4
              ? "morning"
              : "night"),
          e)
        ) {
          case "B":
          case "BB":
          case "BBB":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting",
            });
          case "BBBBB":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      h: function (t, e, n) {
        if ("ho" === e) {
          let e = t.getHours() % 12;
          return 0 === e && (e = 12), n.ordinalNumber(e, { unit: "hour" });
        }
        return S.h(t, e);
      },
      H: function (t, e, n) {
        return "Ho" === e
          ? n.ordinalNumber(t.getHours(), { unit: "hour" })
          : S.H(t, e);
      },
      K: function (t, e, n) {
        const a = t.getHours() % 12;
        return "Ko" === e
          ? n.ordinalNumber(a, { unit: "hour" })
          : P(a, e.length);
      },
      k: function (t, e, n) {
        let a = t.getHours();
        return (
          0 === a && (a = 24),
          "ko" === e ? n.ordinalNumber(a, { unit: "hour" }) : P(a, e.length)
        );
      },
      m: function (t, e, n) {
        return "mo" === e
          ? n.ordinalNumber(t.getMinutes(), { unit: "minute" })
          : S.m(t, e);
      },
      s: function (t, e, n) {
        return "so" === e
          ? n.ordinalNumber(t.getSeconds(), { unit: "second" })
          : S.s(t, e);
      },
      S: function (t, e) {
        return S.S(t, e);
      },
      X: function (t, e, n) {
        const a = t.getTimezoneOffset();
        if (0 === a) return "Z";
        switch (e) {
          case "X":
            return C(a);
          case "XXXX":
          case "XX":
            return T(a);
          default:
            return T(a, ":");
        }
      },
      x: function (t, e, n) {
        const a = t.getTimezoneOffset();
        switch (e) {
          case "x":
            return C(a);
          case "xxxx":
          case "xx":
            return T(a);
          default:
            return T(a, ":");
        }
      },
      O: function (t, e, n) {
        const a = t.getTimezoneOffset();
        switch (e) {
          case "O":
          case "OO":
          case "OOO":
            return "GMT" + W(a, ":");
          default:
            return "GMT" + T(a, ":");
        }
      },
      z: function (t, e, n) {
        const a = t.getTimezoneOffset();
        switch (e) {
          case "z":
          case "zz":
          case "zzz":
            return "GMT" + W(a, ":");
          default:
            return "GMT" + T(a, ":");
        }
      },
      t: function (t, e, n) {
        return P(Math.trunc(+t / 1e3), e.length);
      },
      T: function (t, e, n) {
        return P(+t, e.length);
      },
    };
  function W(t, e = "") {
    const n = t > 0 ? "-" : "+",
      a = Math.abs(t),
      r = Math.trunc(a / 60),
      o = a % 60;
    return 0 === o ? n + String(r) : n + String(r) + e + P(o, 2);
  }
  function C(t, e) {
    return t % 60 == 0 ? (t > 0 ? "-" : "+") + P(Math.abs(t) / 60, 2) : T(t, e);
  }
  function T(t, e = "") {
    const n = t > 0 ? "-" : "+",
      a = Math.abs(t);
    return n + P(Math.trunc(a / 60), 2) + e + P(a % 60, 2);
  }
  const Y = (t, e) => {
      switch (t) {
        case "P":
          return e.date({ width: "short" });
        case "PP":
          return e.date({ width: "medium" });
        case "PPP":
          return e.date({ width: "long" });
        default:
          return e.date({ width: "full" });
      }
    },
    O = (t, e) => {
      switch (t) {
        case "p":
          return e.time({ width: "short" });
        case "pp":
          return e.time({ width: "medium" });
        case "ppp":
          return e.time({ width: "long" });
        default:
          return e.time({ width: "full" });
      }
    },
    q = {
      p: O,
      P: (t, e) => {
        const n = t.match(/(P+)(p+)?/) || [],
          a = n[1],
          r = n[2];
        if (!r) return Y(t, e);
        let o;
        switch (a) {
          case "P":
            o = e.dateTime({ width: "short" });
            break;
          case "PP":
            o = e.dateTime({ width: "medium" });
            break;
          case "PPP":
            o = e.dateTime({ width: "long" });
            break;
          default:
            o = e.dateTime({ width: "full" });
        }
        return o.replace("{{date}}", Y(a, e)).replace("{{time}}", O(r, e));
      },
    },
    E = /^D+$/,
    F = /^Y+$/,
    N = ["D", "DD", "YY", "YYYY"];
  function H(t) {
    return !(
      (!(
        (e = t) instanceof Date ||
        ("object" == typeof e &&
          "[object Date]" === Object.prototype.toString.call(e))
      ) &&
        "number" != typeof t) ||
      isNaN(+f(t))
    );
    var e;
  }
  const j = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    z = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
    L = /^'([^]*?)'?$/,
    B = /''/g,
    Q = /[a-zA-Z]/;
  function A(t) {
    const e = t.match(L);
    return e ? e[1].replace(B, "'") : t;
  }
  document.addEventListener("DOMContentLoaded", function () {
    const e = (function (t, e, n) {
      const a = d(),
        r = n?.locale ?? a.locale ?? s,
        o =
          n?.firstWeekContainsDate ??
          n?.locale?.options?.firstWeekContainsDate ??
          a.firstWeekContainsDate ??
          a.locale?.options?.firstWeekContainsDate ??
          1,
        i =
          n?.weekStartsOn ??
          n?.locale?.options?.weekStartsOn ??
          a.weekStartsOn ??
          a.locale?.options?.weekStartsOn ??
          0,
        u = f(t, n?.in);
      if (!H(u)) throw new RangeError("Invalid time value");
      let c = e
        .match(z)
        .map((t) => {
          const e = t[0];
          return "p" === e || "P" === e ? (0, q[e])(t, r.formatLong) : t;
        })
        .join("")
        .match(j)
        .map((t) => {
          if ("''" === t) return { isToken: !1, value: "'" };
          const e = t[0];
          if ("'" === e) return { isToken: !1, value: A(t) };
          if (D[e]) return { isToken: !0, value: t };
          if (e.match(Q))
            throw new RangeError(
              "Format string contains an unescaped latin alphabet character `" +
                e +
                "`"
            );
          return { isToken: !1, value: t };
        });
      r.localize.preprocessor && (c = r.localize.preprocessor(u, c));
      const l = { firstWeekContainsDate: o, weekStartsOn: i, locale: r };
      return c
        .map((a) => {
          if (!a.isToken) return a.value;
          const o = a.value;
          return (
            ((!n?.useAdditionalWeekYearTokens &&
              (function (t) {
                return F.test(t);
              })(o)) ||
              (!n?.useAdditionalDayOfYearTokens &&
                (function (t) {
                  return E.test(t);
                })(o))) &&
              (function (t, e, n) {
                const a = (function (t, e, n) {
                  const a = "Y" === t[0] ? "years" : "days of the month";
                  return `Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
                })(t, e, n);
                if ((console.warn(a), N.includes(t))) throw new RangeError(a);
              })(o, e, String(t)),
            (0, D[o[0]])(u, o, r.localize, l)
          );
        })
        .join("");
    })(new Date(), "MMMM d, yyyy");
    (document.getElementById("dateDisplay").textContent = e),
      (function () {
        const e = Math.floor(Math.random() * t.length),
          n = t[e];
        (document.getElementById("emojiDisplay").textContent = n.icon),
          (document.getElementById("emojiName").textContent = n.name);
      })();
  });
})();
