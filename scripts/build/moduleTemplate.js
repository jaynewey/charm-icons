export default (filename, icon) => `
    const ${filename} = ${JSON.stringify(icon)}

    export default ${filename}
    `;
