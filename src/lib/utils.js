export const generateSlug = (text) => {
    let slug = text.toLowerCase();
    slug = slug.replace(/\s+/g, "-");
    slug = slug.replace(/[^a-z-]/g, "");
    slug = slug.replace(/-+/g, "-");
    slug = slug.replace(/^-|-$/g, "");
    return slug;
};

export const serverResponseFormat = (data, isError = false, error = null) => {
    return { isError, data, error };
};
