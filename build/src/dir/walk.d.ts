declare type FileHandler = (f: string) => void;
interface FilterRule {
    startsWith?: string;
    endsWith?: string;
    fileOrDir?: string;
    excludes?: string[];
    supressError?: boolean;
}
/**
 * rule = {
 *   startsWith: '',
 *   endsWith: '.js',
 *   fileOrDir: 'file',
 *   excludes: ['node_modules', 'astcache']
 * };
 */
export default function walk(dir: string, rule?: FilterRule, fnHandler?: FileHandler): void;
export {};
