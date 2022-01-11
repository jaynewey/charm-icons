import { emptyFile, writeToFile, filenameToModule } from '../helpers';

const TYPES_FILENAME = 'charm-icons.d.ts'

function typeTemplate(filenames) {
    return `\
    declare module 'charm-icons';

    export declare class Icon { 
        name: string;
        paths: string;
        keywords: [string];
    
        constructor(name: string, paths: string, keywords: [string]);
    }
    
    export type Icons = { [key: string]: Icon };
    
    export declare function getAttrs(icon: Icon, attrs?: { [key: string]: string; }): { [key: string]: string; };
    
    export declare function toSvg(icon: Icon, attrs?: { [key: string]: string; }): string;
    
    export declare function toElement(icon: Icon, attrs?: { [key: string]: string; }): HTMLElement;
    
    export declare function replaceElement(
        element: HTMLElement,
        icon: Icon,
        attrs?: { [key: string]: string; },
        replaceAttr?: string
    ): Node;
    
    export interface PlaceIconsOptions {
        icons?: object, attrs?: object, replaceAttr?: string 
    }
    
    export declare function placeIcons(options?: PlaceIconsOptions): void;
    
    export declare const icons: Icons;
    
    // icons
    ${
        filenames.map((filename) => {
            const iconName = filenameToModule(filename);
            return `export declare const ${iconName}: Icon;`
        }).join('\n')
    }
    `;
}

export default function buildTypesFile(outputDir, filenames) {
    emptyFile(outputDir, TYPES_FILENAME);
    writeToFile(outputDir, TYPES_FILENAME, typeTemplate(filenames));
}
