/** Helpers that turn untrusted `req.query` values into well-typed values. */

export const parseString = (value: unknown): string | undefined =>
    typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined;

export const parseOptionalNumber = (value: unknown): number | undefined => {
    const text = parseString(value);
    if (text === undefined) return undefined;

    const parsed = Number(text);
    return Number.isFinite(parsed) ? parsed : undefined;
};

export const parsePositiveInt = (value: unknown, fallback: number, max = Number.MAX_SAFE_INTEGER): number => {
    const parsed = parseOptionalNumber(value);
    return parsed !== undefined && Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, max) : fallback;
};

export const parseEnum = <T extends string>(value: unknown, allowed: readonly T[]): T | undefined => {
    const text = parseString(value);
    return allowed.find((option) => option === text);
};

/** Parses a comma separated list (e.g. `?propertyType=Apartment,Villa Type`), keeping only allowed values. */
export const parseEnumList = <T extends string>(value: unknown, allowed: readonly T[]): T[] => {
    const text = parseString(value);
    if (text === undefined) return [];

    return text
        .split(',')
        .map((item) => parseEnum(item, allowed))
        .filter((item): item is T => item !== undefined);
};
