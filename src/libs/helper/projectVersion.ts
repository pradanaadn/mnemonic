import { readFileSync } from 'fs';
import { join, dirname } from 'path';

/**
 * Finds the project root by traversing up the directory tree to locate package.json
 */
const findProjectRoot = (startDir: string = __dirname): string => {
  let currentDir = startDir;

  while (currentDir !== dirname(currentDir)) {
    // More robust than checking '/'
    try {
      readFileSync(join(currentDir, 'package.json'), 'utf8');
      return currentDir;
    } catch {
      currentDir = dirname(currentDir);
    }
  }

  throw new Error('Could not find project root (package.json not found)');
};

/**
 * Safely reads and parses the project version from package.json
 */
const getProjectVersion = (): string => {
  const fallbackVersion = '0.0.0';

  try {
    const projectRoot = findProjectRoot();
    const packageJsonPath = join(projectRoot, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

    return packageJson.version || fallbackVersion;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn(
      `Failed to read project version: ${errorMessage}. Using fallback: ${fallbackVersion}`,
    );

    return fallbackVersion;
  }
};
export const APP_VERSION = getProjectVersion();
