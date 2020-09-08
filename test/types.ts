/* eslint-disable no-unused-expressions */
// import { Asserts } from '../src/mixed';
import { array, string, object, mixed, number, ref } from '../src';
import { AssertsShape, DefaultFromShape, TypeOfShape } from '../src/object';
import { ResolveInput, ResolveOutput } from '../src/util/types';

// let schema = object({
//   str: string().nullable(),
// }).shape({
//   num: number(),
// });

// const fff = mixed().nullable();

mixed().required().nullable();

string().required().nullable();

/** Type utils */
{
  // $ExpectType string | null
  type _i1 = ResolveInput<string, 'nullable' | 'optional', string>;

  // $ExpectType string | undefined
  type _i2 = ResolveInput<string, 'nonnullable' | 'required'>;

  // $ExpectType string
  type _i3 = ResolveInput<string, 'nonnullable', ''>;

  // $ExpectType string
  type _i4 = ResolveInput<string, 'nonnullable', null>;

  // $ExpectType string
  type _i5 = ResolveInput<string, 'nonnullable', null>;

  // $ExpectType string | null | undefined
  type _i6 = ResolveInput<string, 'nullable' | 'required'>;

  // $ExpectType string
  type _o1 = ResolveOutput<string, 'nullable' | 'required'>;

  // $ExpectType string | undefined
  type _o2 = ResolveOutput<string, 'nonnullable' | 'optional'>;

  // $ExpectType string
  type _o3 = ResolveOutput<string, 'nonnullable', ''>;

  // $ExpectType string
  type _o4 = ResolveOutput<string, 'nullable' | 'required', null>;

  // $ExpectType string
  type _o5 = ResolveOutput<string, 'nullable' | 'required', undefined>;

  // $ExpectType string | null | undefined
  type _o6 = ResolveOutput<string, 'nullable' | 'optional', undefined>;

  // $ExpectType string | null
  type _o7 = ResolveOutput<string, 'nullable' | 'optional', ''>;

  // $ExpectError number is not a MaybeString
  type _e1 = ResolveOutput<string, 'nullable' | 'optional', number>;
}
{
  const strRequired = string().required();

  // $ExpectType string | undefined
  strRequired.cast(undefined);

  //
  const strNullableRequired = string().nullable().required();
  // $ExpectType string | null | undefined
  strNullableRequired.cast('');

  // $ExpectType string
  strNullableRequired.validateSync('');

  //
  //
  const strNullable = string().nullable();

  // $ExpectType string | null | undefined
  strNullable.validateSync('');

  const strDefined = string().default('');

  // $ExpectType ""
  const _strDefined = strDefined.default();

  const strDefault = string().nullable().default('');

  // $ExpectType string | null
  strDefault.cast('');

  // $ExpectType string | null
  strDefault.validateSync('');

  //
  //
  const strDefaultRequired = string().nullable().required().default('');

  // $ExpectType string | null
  strDefaultRequired.cast('');

  // $ExpectType string
  strDefaultRequired.validateSync(null);
}

{
  const obj = object({
    string: string().required(),
    number: number().default(1),
    ref: ref('string'),
    nest: object({
      other: string(),
    }),
  });

  // const f = obj.cast({});
  // f!.number;
  // f!.string;
  // type ia = typeof obj['fields']['nest']['__inputType'];

  type _d1 = DefaultFromShape<typeof obj['fields']>;
  // $ExpectType number
  type _i1 = TypeOfShape<typeof obj['fields']>['number'];

  // $ExpectType string | undefined
  type _i2 = TypeOfShape<typeof obj['fields']>['string'];

  // $ExpectType unknown
  type _i3 = TypeOfShape<typeof obj['fields']>['ref'];

  // $ExpectType number
  type _i4 = AssertsShape<typeof obj['fields']>['number'];

  // $ExpectType string
  type _i5 = AssertsShape<typeof obj['fields']>['string'];

  const cast1 = obj.cast({});

  // $ExpectType string | undefined
  cast1!.nest!.other;

  // $ExpectType string | undefined
  cast1!.string;

  // $ExpectType number
  cast1!.number;

  //
  // Object Defaults
  //
  const dflt1 = obj.default();

  // $ExpectType 1
  dflt1.number;

  // $ExpectType undefined
  dflt1.ref;

  // $ExpectType undefined
  dflt1.string;

  // $ExpectType undefined
  dflt1.nest.other;

  const merge = object({
    field: string().required(),
    other: string().default(''),
  }).shape({
    field: number(),
  });

  // $ExpectType number | undefined
  merge.cast({}).field;

  // $ExpectType string
  merge.cast({}).other;
}

{
  // $ExpectType (string | undefined)[] | undefined
  array(string()).cast(null);

  // $ExpectType string[] | undefined
  array(string().required()).validateSync(null);

  // $ExpectType string[]
  array(string().default('')).required().validateSync(null);

  // $ExpectType string[] | undefined
  array(string().default('')).validateSync(null);

  // $ExpectType (string | null)[] | undefined
  array(string().nullable().default('')).validateSync(null);

  // $ExpectType number[]
  array()
    .default([] as number[])
    .default();

  // $ExpectType string[] | (string | null)[] | null
  array(string().nullable().default(''))
    .nullable()
    .default(() => [] as string[])
    .validateSync(null);

  // $ExpectType number[]
  array(number())
    .default<number[]>(() => [])
    .default();

  const a1 = object({
    list: array(number().required()).required(),
    nested: array(
      object({
        name: string().default(''),
      }),
    ),
  })
    .required()
    .validateSync(undefined);

  // $ExpectType number[]
  a1.list;

  // $ExpectType string | undefined
  a1.nested?.[0].name;

  // $ExpectType string
  a1.nested![0].name;
}
// const strPlain = string();

// type fff = typeof strPlain['spec']['hasDefault'];

// // $ExpectType string | undefined
// type _strPlain = Asserts<typeof strPlain>;

// const strRequired = string().required();
// // $ExpectType string
// type _strRequired = Asserts<typeof strRequired>;

// const strDefault = string().nullable().default(undefined);
// const strDefault2 = string().nullable().default('');

// // $ExpectType undefined
// strDefault.default();

// // $ExpectType string
// strDefault2.default();

// // $ExpectType string | null
// strDefault2.cast(undefined);

// // async function foo() {
// //   ff = await str.validate(undefined, {});
// //   ff = await str2.validate(null, {});
// // }

// let objWithDefault = object({
//   str: string().nullable().default(''),
//   num: number().default(3),
//   num2: number(),
// });