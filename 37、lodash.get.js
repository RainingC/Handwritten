function get(source, path, defaultValue = undefined) {
    // a[3].b -> a.3.b -> [a, 3, b]
    const paths = path
        .replace(/\[(\w+)\]/g, ".$1")
        .replace(/\["(\w+)"\]/g, ".$1")
        .replace(/\['(\w+)'\]/g, ".$1")
        .split(".");
    let result = source;
    for (const p of paths) {
        result = result?.[p];
    }
    return result === undefined ? defaultValue : result;
}
