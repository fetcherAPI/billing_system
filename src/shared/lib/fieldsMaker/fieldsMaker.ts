type FieldsMakerResult<T> = Array<{
    name: keyof T;
    value: T[keyof T];
}>;

export const fieldsMaker = <T extends object>(
    obj: T,
    needFields?: Array<keyof T | string>
): FieldsMakerResult<T> => {
    const fields: FieldsMakerResult<T> = [];
    try {
        for (const key in obj) {
            const keyForAccess = key as keyof T;
            if (needFields) {
                if (needFields.includes(keyForAccess) || needFields.includes(key)) {
                    fields.push({
                        name: keyForAccess,
                        value: obj[keyForAccess],
                    });
                }
            } else {
                fields.push({
                    name: keyForAccess,
                    value: obj[keyForAccess],
                });
            }
        }
        return fields;
    } catch (error) {
        alert(JSON.stringify(error));
        return fields;
    }
};
