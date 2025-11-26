import { StackSelectionInput } from '../config/stacks';

export interface ParsedNewCommand {
  projectName: string;
  stackInput: StackSelectionInput;
}

/**
 * Parse arguments for: stackspark new <project-name> [options]
 *
 * Supported options we care about (MVP design, not used yet):
 *   --template monolith
 *   --frontend react
 *   --backend express
 *   --database sqlite
 *   --saas           (boolean flag, no value)
 */
export function parseNewArgs(args: string[]): ParsedNewCommand {
  const [projectName, ...rest] = args;

  if (!projectName) {
    throw new Error('missing-project-name');
  }

  const stackInput: StackSelectionInput = {};

  // We'll fill this out later
  // For now, ignore all flags and just return the projectName
  // and an empty stackInput, which means "use defaults".
  return { projectName, stackInput };
}