import { useEffect, useState } from 'react';
import { Text } from 'ink';
import cp from 'child_process';

interface Props<T> {
  readonly inputArgs: T[];
}

// TODO

/// Quick Open opens files from a shell.
const QuickOpen = <T,>({ inputArgs }: Props<T>) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cp.exec(`open ${inputArgs[0] || '.'}`.trim(), (stdout) => {
      if (stdout) {
        return setError(stdout.message);
      }

      if (error) {
        setError(null);
      }
    });
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  return null;
};

export default QuickOpen;
