import * as path from 'path';

export function getPath(pathFromRoot: string) {
    return path.resolve(__dirname, '..', ...pathFromRoot.split('/'));
}
